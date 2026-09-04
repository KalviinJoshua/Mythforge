import { FantasyCharacter, InventoryItem, ItemCategory, CardRarity, CharacterClassType } from '../types';

/**
 * Checks whether an item category can be equipped to a hero slot.
 */
export function canEquipItem(item: InventoryItem): boolean {
  return item.category === 'weapon' || item.category === 'armor' || item.category === 'accessory' || item.category === 'artifact';
}

/**
 * Calculates total carry weight of an inventory list in lbs.
 */
export function calculateCarryWeight(inventory: InventoryItem[] = []): number {
  return Math.round(
    inventory.reduce((sum, item) => sum + (item.weight || 0) * (item.quantity || 1), 0) * 10
  ) / 10;
}

/**
 * Max carry capacity based on strength stat (Standard RPG formula: Strength * 8 lbs for reasonable limits)
 */
export function calculateMaxCarryCapacity(strength: number = 10): number {
  return Math.max(60, Math.round(strength * 7.5));
}

/**
 * Calculates total gold value of all items in inventory.
 */
export function calculateInventoryGoldValue(inventory: InventoryItem[] = []): number {
  return inventory.reduce((sum, item) => sum + (item.value || 0) * (item.quantity || 1), 0);
}

/**
 * Adds an item to the inventory.
 * Stacks consumables or identical non-equipment items by quantity.
 */
export function addItemToInventory(
  inventory: InventoryItem[] = [],
  newItem: InventoryItem
): InventoryItem[] {
  const isStackable = newItem.category === 'consumable';
  
  if (isStackable) {
    const existingIndex = inventory.findIndex(
      (item) => item.name.toLowerCase() === newItem.name.toLowerCase() && item.category === newItem.category
    );

    if (existingIndex >= 0) {
      const updated = [...inventory];
      const existing = updated[existingIndex];
      updated[existingIndex] = {
        ...existing,
        quantity: existing.quantity + (newItem.quantity || 1),
      };
      return updated;
    }
  }

  // Ensure unique ID
  const itemToAdd: InventoryItem = {
    ...newItem,
    id: newItem.id || `item_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    quantity: Math.max(1, newItem.quantity || 1),
    equipped: !!newItem.equipped,
  };

  return [itemToAdd, ...inventory];
}

/**
 * Removes or reduces quantity of an item from inventory.
 */
export function removeItemFromInventory(
  inventory: InventoryItem[] = [],
  itemId: string,
  amountToRemove: number = 1
): InventoryItem[] {
  const target = inventory.find((i) => i.id === itemId);
  if (!target) return inventory;

  if (target.quantity > amountToRemove) {
    return inventory.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity - amountToRemove } : item
    );
  }

  return inventory.filter((item) => item.id !== itemId);
}

/**
 * Updates quantity of an item. Removes if <= 0.
 */
export function setItemQuantity(
  inventory: InventoryItem[] = [],
  itemId: string,
  newQuantity: number
): InventoryItem[] {
  if (newQuantity <= 0) {
    return inventory.filter((item) => item.id !== itemId);
  }

  return inventory.map((item) =>
    item.id === itemId ? { ...item, quantity: Math.floor(newQuantity) } : item
  );
}

/**
 * Equips or unequips an item.
 * Enforces single-weapon and single-armor rules, plus max 2 accessories.
 */
export function toggleEquipItem(
  inventory: InventoryItem[] = [],
  itemId: string
): InventoryItem[] {
  const target = inventory.find((i) => i.id === itemId);
  if (!target || !canEquipItem(target)) {
    return inventory;
  }

  const willBeEquipped = !target.equipped;

  if (!willBeEquipped) {
    // Simply unequip
    return inventory.map((item) =>
      item.id === itemId ? { ...item, equipped: false } : item
    );
  }

  // Equipping rules
  if (target.category === 'weapon') {
    // Unequip any other weapon
    return inventory.map((item) => {
      if (item.id === itemId) {
        return { ...item, equipped: true };
      }
      if (item.category === 'weapon') {
        return { ...item, equipped: false };
      }
      return item;
    });
  }

  if (target.category === 'armor') {
    // Unequip any other armor
    return inventory.map((item) => {
      if (item.id === itemId) {
        return { ...item, equipped: true };
      }
      if (item.category === 'armor') {
        return { ...item, equipped: false };
      }
      return item;
    });
  }

  if (target.category === 'accessory') {
    // Max 2 accessories equipped at once
    const currentlyEquippedAccessories = inventory.filter(
      (item) => item.category === 'accessory' && item.equipped && item.id !== itemId
    );

    if (currentlyEquippedAccessories.length >= 2) {
      // Unequip the oldest equipped accessory
      const accessoryToUnequip = currentlyEquippedAccessories[0];
      return inventory.map((item) => {
        if (item.id === itemId) return { ...item, equipped: true };
        if (item.id === accessoryToUnequip.id) return { ...item, equipped: false };
        return item;
      });
    }

    return inventory.map((item) =>
      item.id === itemId ? { ...item, equipped: true } : item
    );
  }

  if (target.category === 'artifact') {
    // Unequip any other equipped artifact
    return inventory.map((item) => {
      if (item.id === itemId) {
        return { ...item, equipped: true };
      }
      if (item.category === 'artifact') {
        return { ...item, equipped: false };
      }
      return item;
    });
  }

  return inventory;
}

/**
 * Creates authentic starting gear tailored to hero's class and primary weapon.
 */
export function generateClassStartingGear(
  className: CharacterClassType,
  primaryWeaponName?: string
): { items: InventoryItem[]; startingGold: number } {
  const weaponName = primaryWeaponName || `${className} Armament`;

  // Determine starting weapon
  const weaponItem: InventoryItem = {
    id: `item_wpn_${Math.random().toString(36).slice(2, 8)}`,
    name: weaponName,
    category: 'weapon',
    rarity: 'Uncommon',
    description: `A finely balanced ${weaponName.toLowerCase()}, attuned to the battle style of a ${className}.`,
    quantity: 1,
    equipped: true,
    value: 45,
    weight: 4.5,
    statModifiers: {
      strength: className === 'Warrior' || className === 'Paladin' ? 2 : 1,
      intelligence: className === 'Mage' || className === 'Warlock' ? 3 : 0,
    },
    iconName: 'Swords',
  };

  // Determine starting armor
  let armorName = 'Studded Leather Cuirass';
  let armorRarity: CardRarity = 'Common';
  let armorWeight = 8;
  let armorValue = 35;

  if (className === 'Warrior' || className === 'Paladin') {
    armorName = 'Forged Iron Plate Mail';
    armorRarity = 'Uncommon';
    armorWeight = 22;
    armorValue = 75;
  } else if (className === 'Mage' || className === 'Warlock') {
    armorName = 'Arcane Embroidered Vestments';
    armorRarity = 'Uncommon';
    armorWeight = 3;
    armorValue = 50;
  } else if (className === 'Rogue' || className === 'Ranger') {
    armorName = 'Shadow-Tanned Leather Jerkin';
    armorWeight = 6;
    armorValue = 40;
  } else if (className === 'Cleric' || className === 'Druid') {
    armorName = 'Blessed Chain Hauberk';
    armorWeight = 14;
    armorValue = 60;
  }

  const armorItem: InventoryItem = {
    id: `item_arm_${Math.random().toString(36).slice(2, 8)}`,
    name: armorName,
    category: 'armor',
    rarity: armorRarity,
    description: `Protective gear providing defensive warding against martial and elemental strikes.`,
    quantity: 1,
    equipped: true,
    value: armorValue,
    weight: armorWeight,
    statModifiers: {
      health: 20,
    },
    iconName: 'Shield',
  };

  // Class accessory
  let accessoryName = 'Band of Tenacity';
  let accessoryDesc = 'A carved ring etched with protective runes.';
  if (className === 'Mage' || className === 'Warlock' || className === 'Druid') {
    accessoryName = 'Amulet of the Leyline';
    accessoryDesc = 'Channels latent magical currents into the wearer’s spell focus.';
  } else if (className === 'Rogue' || className === 'Ranger') {
    accessoryName = 'Featherfoot Talisman';
    accessoryDesc = 'Muffles the sound of quiet footsteps and sharpens reflexes.';
  } else if (className === 'Paladin' || className === 'Cleric') {
    accessoryName = 'Radiant Sun Sigil';
    accessoryDesc = 'Consecrated pendant carrying the gentle warmth of the dawn.';
  }

  const accessoryItem: InventoryItem = {
    id: `item_acc_${Math.random().toString(36).slice(2, 8)}`,
    name: accessoryName,
    category: 'accessory',
    rarity: 'Uncommon',
    description: accessoryDesc,
    quantity: 1,
    equipped: true,
    value: 60,
    weight: 0.5,
    statModifiers: {
      mana: 15,
      agility: 1,
    },
    iconName: 'Sparkles',
  };

  // Consumables
  const potionItem: InventoryItem = {
    id: `item_pot_hp_${Math.random().toString(36).slice(2, 8)}`,
    name: 'Elixir of Mending',
    category: 'consumable',
    rarity: 'Common',
    description: 'A crimson draught that restores 45 health upon consumption.',
    quantity: 2,
    equipped: false,
    value: 18,
    weight: 0.8,
    iconName: 'Heart',
  };

  const manaPotionItem: InventoryItem = {
    id: `item_pot_mp_${Math.random().toString(36).slice(2, 8)}`,
    name: 'Vial of Starlight Mana',
    category: 'consumable',
    rarity: 'Common',
    description: 'An effervescent azure elixir replenishing 35 arcane mana.',
    quantity: 2,
    equipped: false,
    value: 20,
    weight: 0.8,
    iconName: 'Zap',
  };

  return {
    items: [weaponItem, armorItem, accessoryItem, potionItem, manaPotionItem],
    startingGold: Math.floor(Math.random() * 45) + 65, // 65-110 gold pieces
  };
}

/**
 * Migration sanitizer ensuring any loaded hero has a valid inventory array and gold pouch.
 * Safe for legacy localStorage data without overwriting existing data.
 */
export function ensureCharacterInventoryData(character: FantasyCharacter): FantasyCharacter {
  const hasValidInventory = Array.isArray(character.inventory);
  const gold = typeof character.gold === 'number' && !isNaN(character.gold) && character.gold >= 0 
    ? character.gold 
    : 80;

  if (hasValidInventory) {
    return {
      ...character,
      inventory: character.inventory,
      gold,
    };
  }

  // If character has no inventory, generate initial starting equipment based on their class
  const starter = generateClassStartingGear(character.className, character.primaryWeapon);

  return {
    ...character,
    inventory: starter.items,
    gold,
  };
}
