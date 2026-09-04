export type CharacterClassType =
  | 'Warrior'
  | 'Mage'
  | 'Rogue'
  | 'Paladin'
  | 'Ranger'
  | 'Cleric'
  | 'Bard'
  | 'Druid'
  | 'Warlock'
  | 'Monk';

export type CharacterRaceType =
  | 'Human'
  | 'High Elf'
  | 'Mountain Dwarf'
  | 'Tiefling'
  | 'Dragonborn'
  | 'Wood Elf'
  | 'Half-Orc'
  | 'Halfling'
  | 'Aasimar'
  | 'Gnome';

export interface RaceProfile {
  name: CharacterRaceType;
  traitName: string;
  traitDescription: string;
  statBonusText: string;
  bonus: {
    health: number;
    mana: number;
    strength: number;
    intelligence: number;
    agility: number;
    charisma: number;
  };
}

export interface CharacterStats {
  health: number;
  mana: number;
  strength: number;
  intelligence: number;
  agility: number;
  charisma: number;
  might?: number;
  intellect?: number;
  spirit?: number;
}

export interface StatGains {
  health: number;
  mana: number;
  strength: number;
  intelligence: number;
  agility: number;
  charisma: number;
}

export interface LevelUpResult {
  leveledUp: boolean;
  previousLevel: number;
  newLevel: number;
  levelsGained: number;
  xpGained: number;
  statGains: StatGains;
  newProficiencyBonus: number;
}

export type CardRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export type ItemCategory = 'weapon' | 'armor' | 'accessory' | 'consumable' | 'artifact';

export interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  rarity: CardRarity;
  description: string;
  quantity: number;
  equipped: boolean;
  value: number; // in gold pieces
  weight: number; // in lbs
  statModifiers?: Partial<StatGains>;
  specialEffect?: string;
  slot?: string;
  iconName?: string;
}

export interface CharacterPortraitData {
  variant: number;
  styleName: string;
  gearTitle: string;
  paletteTheme: string;
  renderedUrl?: string;
  seed: number;
  generatedAt: number;
}

export type GuildCrest = 'phoenix' | 'dragon' | 'wolf' | 'raven' | 'serpent' | 'eye';

export interface GuildProfile {
  username: string;
  title: string;
  crest: GuildCrest;
  level: number;
  totalForged: number;
  joinedAt: number;
}

export interface QuestHook {
  title: string;
  premise: string;
  objective: string;
  danger: string;
  reward: string;
}

export interface FantasyCharacter {
  id: string;
  name: string;
  className: CharacterClassType;
  race: CharacterRaceType;
  raceTrait?: {
    name: string;
    description: string;
  };
  title: string;
  flavor: string;
  primaryWeapon: string;
  origin: string;
  rarity: CardRarity;
  badgeColor: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    glow: string;
  };
  iconName: string;
  stats: CharacterStats;
  portrait?: CharacterPortraitData;
  backstory?: string;
  isCustomBackstory?: boolean;
  questHook?: QuestHook;
  forgedBy?: string;
  guildCrest?: GuildCrest;
  generatedAt: number;
  level?: number;
  xp?: number;
  proficiencyBonus?: number;
  inventory?: InventoryItem[];
  gold?: number;
}

// -------------------------------------------------------------
// Advanced Dice System Types
// -------------------------------------------------------------

export type DieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export type RollMode = 'normal' | 'advantage' | 'disadvantage';

export interface DiceRollRequest {
  die: DieType;
  count: number; // e.g. 1, 2, 3...
  modifier?: number; // e.g. +3, -1
  mode?: RollMode; // default 'normal'
  label?: string; // e.g. "Stealth Check", "Melee Attack", "Fireball Damage"
}

export interface SingleDieRoll {
  die: DieType;
  value: number;
  dropped?: boolean; // used when dropped in advantage/disadvantage
}

export interface DiceRollResult {
  id: string;
  die: DieType;
  sides: number;
  count: number;
  modifier: number;
  mode: RollMode;
  formula: string; // e.g. "2d6 + 3", "d20 + 4 (Advantage)"
  label?: string;
  rolls: SingleDieRoll[]; // all rolled dice including dropped
  keptRolls: number[]; // the rolls that count toward the total
  diceSubtotal: number;
  total: number;
  isCriticalSuccess: boolean; // Natural 20 on d20
  isCriticalFailure: boolean; // Natural 1 on d20
  timestamp: number;
}

// -------------------------------------------------------------
// Monster Generator & Bestiary System Types
// -------------------------------------------------------------

export type MonsterArchetype =
  | 'Goblin'
  | 'Orc'
  | 'Skeleton'
  | 'Zombie'
  | 'Wolf'
  | 'Troll'
  | 'Ogre'
  | 'Vampire'
  | 'Dragon'
  | 'Demon';

export type MonsterDifficulty = 'Minion' | 'Standard' | 'Elite' | 'Boss' | 'Apex';

export interface MonsterAttack {
  name: string;
  type: 'melee' | 'ranged' | 'spell';
  damageDice: string; // e.g. "1d8 + 3"
  damageBonus: number;
  description: string;
}

export interface MonsterAbility {
  name: string;
  description: string;
  effectType: 'buff' | 'debuff' | 'damage' | 'heal' | 'drain';
}

export interface GeneratedMonster {
  id: string;
  name: string;
  archetype: MonsterArchetype;
  difficulty: MonsterDifficulty;
  level: number;
  challengeRating: string; // e.g. "CR 3"
  maxHp: number;
  currentHp: number;
  maxMana: number;
  currentMana: number;
  armorClass: number;
  initiative: number;
  strength: number;
  intelligence: number;
  agility: number;
  proficiencyBonus: number;
  attacks: MonsterAttack[];
  specialAbility: MonsterAbility;
  weakness: string;
  resistance: string;
  description: string;
  lootTier: CardRarity;
  xpReward: number;
  goldReward: number;
  iconName: string;
}

export interface BestiaryEntry {
  id: string;
  name: string;
  archetype: MonsterArchetype;
  level: number;
  difficulty: MonsterDifficulty;
  weakness: string;
  resistance: string;
  firstEncountered: number;
  defeatCount: number;
}

