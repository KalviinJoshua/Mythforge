import { CardRarity, InventoryItem, StatGains } from '../types';
import { 
  LOOT_BASE_TEMPLATES, 
  LOOT_PREFIXES, 
  LOOT_SUFFIXES, 
  SPECIAL_EFFECTS_BY_RARITY,
  LootBaseTemplate,
  LootAffix 
} from '../data/lootData';

/**
 * Determines rarity weight table based on hero level and optional boss difficulty tier.
 * Higher level heroes naturally unlock higher chances for Epic, Legendary, and Mythic loot.
 */
export function rollLootRarity(heroLevel: number = 1, bossDifficultyBonus: number = 0): CardRarity {
  const effectiveLevel = Math.max(1, heroLevel) + bossDifficultyBonus;
  const roll = Math.random() * 100;

  if (effectiveLevel >= 18) {
    // Apex tier
    if (roll < 8) return 'Mythic';       // 8%
    if (roll < 32) return 'Legendary';   // 24%
    if (roll < 72) return 'Epic';        // 40%
    if (roll < 95) return 'Rare';        // 23%
    return 'Uncommon';                   // 5%
  } else if (effectiveLevel >= 12) {
    // High tier
    if (roll < 3) return 'Mythic';       // 3%
    if (roll < 16) return 'Legendary';   // 13%
    if (roll < 46) return 'Epic';        // 30%
    if (roll < 80) return 'Rare';        // 34%
    if (roll < 96) return 'Uncommon';    // 16%
    return 'Common';                     // 4%
  } else if (effectiveLevel >= 7) {
    // Mid tier
    if (roll < 1) return 'Mythic';       // 1%
    if (roll < 7) return 'Legendary';    // 6%
    if (roll < 25) return 'Epic';        // 18%
    if (roll < 60) return 'Rare';        // 35%
    if (roll < 88) return 'Uncommon';    // 28%
    return 'Common';                     // 12%
  } else if (effectiveLevel >= 3) {
    // Adventurer tier
    if (roll < 2) return 'Legendary';    // 2%
    if (roll < 10) return 'Epic';        // 8%
    if (roll < 32) return 'Rare';        // 22%
    if (roll < 72) return 'Uncommon';    // 40%
    return 'Common';                     // 28%
  } else {
    // Novice tier (Lv 1-2)
    if (roll < 1) return 'Legendary';    // 1%
    if (roll < 4) return 'Epic';         // 3%
    if (roll < 15) return 'Rare';        // 11%
    if (roll < 45) return 'Uncommon';    // 30%
    return 'Common';                     // 55%
  }
}

const RARITY_MULTIPLIERS: Record<CardRarity, { statMultiplier: number; valueMultiplier: number }> = {
  Common: { statMultiplier: 1.0, valueMultiplier: 1.0 },
  Uncommon: { statMultiplier: 1.3, valueMultiplier: 1.8 },
  Rare: { statMultiplier: 1.7, valueMultiplier: 3.2 },
  Epic: { statMultiplier: 2.3, valueMultiplier: 6.5 },
  Legendary: { statMultiplier: 3.2, valueMultiplier: 14.0 },
  Mythic: { statMultiplier: 4.5, valueMultiplier: 30.0 },
};

const RARITY_ORDER: Record<CardRarity, number> = {
  Common: 1,
  Uncommon: 2,
  Rare: 3,
  Epic: 4,
  Legendary: 5,
  Mythic: 6,
};

/**
 * Procedurally generates a piece of loot tailored to the hero's level, class, and arena context.
 */
export function generateLootReward(
  heroLevel: number = 1,
  bossDifficultyBonus: number = 0,
  preferredCategory?: 'weapon' | 'armor' | 'accessory' | 'consumable' | 'artifact'
): InventoryItem {
  const rarity = rollLootRarity(heroLevel, bossDifficultyBonus);
  const rarityMeta = RARITY_MULTIPLIERS[rarity];

  // Filter templates if preferredCategory specified; otherwise pick any suitable template
  // Artifacts only drop at Rare or above
  let candidates = LOOT_BASE_TEMPLATES.filter((t) => {
    if (t.category === 'artifact' && RARITY_ORDER[rarity] < 3) {
      return false;
    }
    if (preferredCategory && t.category !== preferredCategory) {
      return false;
    }
    return true;
  });

  if (candidates.length === 0) {
    candidates = LOOT_BASE_TEMPLATES;
  }

  const template: LootBaseTemplate = candidates[Math.floor(Math.random() * candidates.length)];

  // Affixes roll based on rarity
  let prefix: LootAffix | null = null;
  let suffix: LootAffix | null = null;

  const eligiblePrefixes = LOOT_PREFIXES.filter(
    (p) => RARITY_ORDER[p.minRarity] <= RARITY_ORDER[rarity]
  );
  const eligibleSuffixes = LOOT_SUFFIXES.filter(
    (s) => RARITY_ORDER[s.minRarity] <= RARITY_ORDER[rarity]
  );

  // Chance of prefix and suffix increases with rarity
  const hasPrefix = rarity !== 'Common' || Math.random() < 0.4;
  const hasSuffix = (rarity !== 'Common' && rarity !== 'Uncommon') || Math.random() < 0.3;

  if (hasPrefix && eligiblePrefixes.length > 0) {
    prefix = eligiblePrefixes[Math.floor(Math.random() * eligiblePrefixes.length)];
  }
  if (hasSuffix && eligibleSuffixes.length > 0) {
    suffix = eligibleSuffixes[Math.floor(Math.random() * eligibleSuffixes.length)];
  }

  // Construct item name
  let generatedName = template.name;
  if (prefix && suffix) {
    generatedName = `${prefix.name} ${template.name} ${suffix.name}`;
  } else if (prefix) {
    generatedName = `${prefix.name} ${template.name}`;
  } else if (suffix) {
    generatedName = `${template.name} ${suffix.name}`;
  }

  // Stat bonus calculations (scaled with hero level and rarity)
  const statModifiers: Partial<StatGains> = {};
  const isEquippable = template.category !== 'consumable';

  if (isEquippable) {
    // Level scaling: each level gives +0.6 base budget, boosted by rarity multiplier
    const levelScale = 1 + (Math.max(1, heroLevel) - 1) * 0.15;
    const baseStatPoints = Math.round(4 * levelScale * rarityMeta.statMultiplier);

    template.statAffinities.forEach((statKey) => {
      const isPrimary = Math.random() > 0.3;
      if (isPrimary) {
        if (statKey === 'health') {
          statModifiers.health = Math.round(baseStatPoints * 8 * (prefix?.statBonus.stat === 'health' ? prefix.statBonus.multiplier : 1));
        } else if (statKey === 'mana') {
          statModifiers.mana = Math.round(baseStatPoints * 6 * (prefix?.statBonus.stat === 'mana' ? prefix.statBonus.multiplier : 1));
        } else {
          statModifiers[statKey] = Math.max(
            1,
            Math.round(baseStatPoints * 0.8 * (prefix?.statBonus.stat === statKey ? prefix.statBonus.multiplier : 1))
          );
        }
      }
    });

    // Ensure at least one primary stat is granted
    if (Object.keys(statModifiers).length === 0 && template.statAffinities[0]) {
      const primary = template.statAffinities[0];
      if (primary === 'health') statModifiers.health = Math.round(baseStatPoints * 7);
      else if (primary === 'mana') statModifiers.mana = Math.round(baseStatPoints * 5);
      else statModifiers[primary] = Math.max(1, Math.round(baseStatPoints * 0.7));
    }
  }

  // Special Effect determination
  let specialEffect: string | undefined = undefined;
  if (suffix?.specialEffect) {
    specialEffect = suffix.specialEffect;
  } else if (RARITY_ORDER[rarity] >= 3) {
    const effectPool = SPECIAL_EFFECTS_BY_RARITY[rarity];
    if (effectPool && effectPool.length > 0) {
      specialEffect = effectPool[Math.floor(Math.random() * effectPool.length)];
    }
  }

  // Gold Value calculation
  const calculatedValue = Math.round(
    template.baseValue * rarityMeta.valueMultiplier * (1 + (heroLevel - 1) * 0.12)
  );

  const itemId = `loot_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  return {
    id: itemId,
    name: generatedName,
    category: template.category,
    rarity,
    description: template.description,
    quantity: 1,
    equipped: false,
    value: calculatedValue,
    weight: template.baseWeight,
    statModifiers: Object.keys(statModifiers).length > 0 ? statModifiers : undefined,
    specialEffect,
    slot: template.slot,
    iconName: template.iconName,
  };
}
