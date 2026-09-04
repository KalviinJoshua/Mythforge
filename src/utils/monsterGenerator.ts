import { 
  GeneratedMonster, 
  MonsterArchetype, 
  MonsterDifficulty, 
  MonsterAttack, 
  BestiaryEntry, 
  CardRarity 
} from '../types';
import { 
  MONSTER_ARCHETYPES, 
  DIFFICULTY_CONFIG, 
  MonsterArchetypeConfig 
} from '../data/monsterData';

export interface MonsterGenerationOptions {
  heroLevel?: number;
  archetype?: MonsterArchetype;
  difficulty?: MonsterDifficulty;
}

const ALL_ARCHETYPES: MonsterArchetype[] = [
  'Goblin',
  'Orc',
  'Skeleton',
  'Zombie',
  'Wolf',
  'Troll',
  'Ogre',
  'Vampire',
  'Dragon',
  'Demon',
];

/**
 * Selects an archetype appropriately weighted for the hero's current level.
 */
function pickArchetypeForLevel(heroLevel: number): MonsterArchetype {
  const safeLevel = Math.max(1, Math.min(10, heroLevel));
  
  // Filter eligible archetypes where minLevel is within reach of hero
  const eligible = ALL_ARCHETYPES.filter((arch) => {
    const config = MONSTER_ARCHETYPES[arch];
    return config.minLevel <= safeLevel + 1;
  });

  if (eligible.length === 0) return 'Goblin';
  return eligible[Math.floor(Math.random() * eligible.length)];
}

/**
 * Generates a realistic tabletop challenge rating tag.
 */
function calculateChallengeRating(level: number, diff: MonsterDifficulty): string {
  if (level <= 1 && diff === 'Minion') return 'CR 1/4';
  if (level <= 1 && diff === 'Standard') return 'CR 1/2';
  if (diff === 'Minion') return `CR ${Math.max(1, level - 1)}`;
  if (diff === 'Elite') return `CR ${level + 1}`;
  if (diff === 'Boss') return `CR ${level + 2}`;
  if (diff === 'Apex') return `CR ${level + 3}`;
  return `CR ${level}`;
}

/**
 * Derives appropriate loot tier based on monster difficulty and level.
 */
function deriveMonsterLootTier(level: number, diff: MonsterDifficulty, baseTier: CardRarity): CardRarity {
  if (diff === 'Apex') {
    return level >= 8 ? 'Mythic' : 'Legendary';
  }
  if (diff === 'Boss') {
    return level >= 6 ? 'Legendary' : 'Epic';
  }
  if (diff === 'Elite') {
    return level >= 5 ? 'Epic' : 'Rare';
  }
  if (diff === 'Standard') {
    return level >= 6 ? 'Rare' : level >= 3 ? 'Uncommon' : baseTier;
  }
  return 'Common';
}

/**
 * Core procedural monster generator engine.
 * Applies predictable mathematical level scaling to base archetype templates.
 */
export function generateProceduralMonster(options: MonsterGenerationOptions = {}): GeneratedMonster {
  const heroLevel = Math.max(1, Math.min(10, Math.floor(options.heroLevel || 1)));
  
  // Select Archetype
  const archetype: MonsterArchetype = options.archetype || pickArchetypeForLevel(heroLevel);
  const archConfig: MonsterArchetypeConfig = MONSTER_ARCHETYPES[archetype];

  // Select Difficulty
  let difficulty: MonsterDifficulty = options.difficulty || 'Standard';
  if (!options.difficulty) {
    const roll = Math.random() * 100;
    if (roll < 20) difficulty = 'Minion';
    else if (roll < 65) difficulty = 'Standard';
    else if (roll < 85) difficulty = 'Elite';
    else if (roll < 96) difficulty = 'Boss';
    else difficulty = 'Apex';
  }

  const diffConfig = DIFFICULTY_CONFIG[difficulty];

  // Calculate monster level relative to hero level and difficulty offset
  const level = Math.max(1, Math.min(10, heroLevel + diffConfig.levelOffset));
  const challengeRating = calculateChallengeRating(level, difficulty);

  // Scaled stats
  const levelScale = 1 + (level - 1) * 0.16; // Moderate +16% per level growth
  const maxHp = Math.round(archConfig.baseHp * levelScale * diffConfig.hpMultiplier);
  const maxMana = Math.round(archConfig.baseMana * levelScale * diffConfig.statMultiplier);
  const strength = Math.round(archConfig.baseStr * levelScale * diffConfig.statMultiplier);
  const intelligence = Math.round(archConfig.baseInt * levelScale * diffConfig.statMultiplier);
  const agility = Math.round(archConfig.baseAgi * levelScale * diffConfig.statMultiplier);
  
  // AC and Initiative
  const armorClass = Math.min(20, Math.max(10, Math.round(archConfig.baseAc + Math.floor((level - 1) / 3))));
  const initiative = Math.floor((agility - 10) / 4);
  const proficiencyBonus = level >= 9 ? 4 : level >= 5 ? 3 : 2;

  // Name construction: Prefix + Archetype + Suffix
  const prefix = archConfig.prefixes[Math.floor(Math.random() * archConfig.prefixes.length)];
  const suffix = archConfig.suffixes[Math.floor(Math.random() * archConfig.suffixes.length)];
  const name = `${prefix} ${archetype} ${suffix}`;

  // Attacks formatted with level-scaled damage bonus
  const attacks: MonsterAttack[] = archConfig.attacks.map((att) => {
    const mainStat = att.type === 'spell' ? intelligence : att.type === 'ranged' ? agility : strength;
    const statMod = Math.max(1, Math.floor((mainStat - 10) / 10));
    const damageBonus = proficiencyBonus + statMod;
    return {
      name: att.name,
      type: att.type,
      damageDice: `${att.dieCount}d${att.dieSides} + ${damageBonus}`,
      damageBonus,
      description: att.description,
    };
  });

  // Pick special ability
  const specialAbility = archConfig.abilities[Math.floor(Math.random() * archConfig.abilities.length)];

  // Description
  const flavor = archConfig.flavorTemplates[Math.floor(Math.random() * archConfig.flavorTemplates.length)];
  const description = `${flavor} Classified as a ${difficulty} threat (${challengeRating}) in the arena scrolls.`;

  // XP & Gold rewards
  const xpReward = Math.round((55 + level * 20) * diffConfig.xpMultiplier);
  const goldReward = Math.round((20 + level * 14) * diffConfig.goldMultiplier);
  const lootTier = deriveMonsterLootTier(level, difficulty, archConfig.defaultLootTier);

  return {
    id: `monster-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name,
    archetype,
    difficulty,
    level,
    challengeRating,
    maxHp,
    currentHp: maxHp,
    maxMana,
    currentMana: maxMana,
    armorClass,
    initiative,
    strength,
    intelligence,
    agility,
    proficiencyBonus,
    attacks,
    specialAbility,
    weakness: archConfig.weakness,
    resistance: archConfig.resistance,
    description,
    lootTier,
    xpReward,
    goldReward,
    iconName: archConfig.iconName,
  };
}

// ----------------------------------------------------------------------
// Bestiary Discovery Tracker (localStorage)
// ----------------------------------------------------------------------

const BESTIARY_STORAGE_KEY = 'mythforge_discovered_bestiary';

/**
 * Retrieves the simple list of encountered monsters from localStorage.
 */
export function getDiscoveredBestiary(): BestiaryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BESTIARY_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Records an encounter in the Bestiary.
 */
export function recordMonsterEncounter(monster: GeneratedMonster): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getDiscoveredBestiary();
    const existingIndex = list.findIndex((e) => e.archetype === monster.archetype);

    if (existingIndex >= 0) {
      // Update entry with highest level seen
      list[existingIndex] = {
        ...list[existingIndex],
        name: monster.name,
        level: Math.max(list[existingIndex].level, monster.level),
        difficulty: monster.difficulty,
        weakness: monster.weakness,
        resistance: monster.resistance,
      };
    } else {
      list.push({
        id: `bestiary-${monster.archetype.toLowerCase()}`,
        name: monster.name,
        archetype: monster.archetype,
        level: monster.level,
        difficulty: monster.difficulty,
        weakness: monster.weakness,
        resistance: monster.resistance,
        firstEncountered: Date.now(),
        defeatCount: 0,
      });
    }

    localStorage.setItem(BESTIARY_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Gracefully handle storage quota
  }
}

/**
 * Records a victory against a monster archetype in the Bestiary.
 */
export function recordMonsterDefeat(archetype: MonsterArchetype): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getDiscoveredBestiary();
    const existingIndex = list.findIndex((e) => e.archetype === archetype);
    if (existingIndex >= 0) {
      list[existingIndex].defeatCount = (list[existingIndex].defeatCount || 0) + 1;
      localStorage.setItem(BESTIARY_STORAGE_KEY, JSON.stringify(list));
    }
  } catch {
    // Gracefully handle storage quota
  }
}
