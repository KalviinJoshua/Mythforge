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

export type CardRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';

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
}
