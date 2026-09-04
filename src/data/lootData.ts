import { CardRarity, ItemCategory } from '../types';

export interface LootBaseTemplate {
  name: string;
  category: ItemCategory;
  baseValue: number;
  baseWeight: number;
  slot?: 'weapon' | 'armor' | 'accessory' | 'artifact' | 'inventory';
  iconName: string;
  description: string;
  statAffinities: Array<'health' | 'mana' | 'strength' | 'intelligence' | 'agility' | 'charisma'>;
}

export const LOOT_BASE_TEMPLATES: LootBaseTemplate[] = [
  // Weapons
  {
    name: 'Broadsword',
    category: 'weapon',
    slot: 'weapon',
    baseValue: 40,
    baseWeight: 4.0,
    iconName: 'Swords',
    description: 'A double-edged forged steel blade balanced for swift swings and decisive thrusts.',
    statAffinities: ['strength', 'health'],
  },
  {
    name: 'Runic Stave',
    category: 'weapon',
    slot: 'weapon',
    baseValue: 50,
    baseWeight: 3.0,
    iconName: 'Sparkles',
    description: 'Polished heartwood inlaid with mana-resonant lapis glyphs for spell amplification.',
    statAffinities: ['intelligence', 'mana'],
  },
  {
    name: 'Warhammer',
    category: 'weapon',
    slot: 'weapon',
    baseValue: 45,
    baseWeight: 7.0,
    iconName: 'Hammer',
    description: 'A massive heavy iron warhead designed to shatter thick shields and crush carapace.',
    statAffinities: ['strength', 'health'],
  },
  {
    name: 'Recurve Bow',
    category: 'weapon',
    slot: 'weapon',
    baseValue: 42,
    baseWeight: 2.5,
    iconName: 'Compass',
    description: 'Laminated ash and horn limbs engineered for lethal velocity and rapid draws.',
    statAffinities: ['agility', 'strength'],
  },
  {
    name: 'Shadow Daggers',
    category: 'weapon',
    slot: 'weapon',
    baseValue: 38,
    baseWeight: 1.5,
    iconName: 'Flame',
    description: 'Treated darkened steel blades honed to an atom-thin edge for silent throat-slitting.',
    statAffinities: ['agility', 'charisma'],
  },
  {
    name: 'Sanctified Flail',
    category: 'weapon',
    slot: 'weapon',
    baseValue: 48,
    baseWeight: 5.5,
    iconName: 'Shield',
    description: 'Spiked golden sphere chained to a benediction-inscribed ebony grip.',
    statAffinities: ['strength', 'mana'],
  },

  // Armor
  {
    name: 'Plate Cuirass',
    category: 'armor',
    slot: 'armor',
    baseValue: 65,
    baseWeight: 16.0,
    iconName: 'ShieldCheck',
    description: 'Interlocking tempered steel plates offering supreme deflection against crushing blows.',
    statAffinities: ['health', 'strength'],
  },
  {
    name: 'Shadowcloth Robes',
    category: 'armor',
    slot: 'armor',
    baseValue: 55,
    baseWeight: 3.5,
    iconName: 'Sparkles',
    description: 'Weft of astral silk that bends luminescence and insulates against hexes.',
    statAffinities: ['mana', 'intelligence'],
  },
  {
    name: 'Stalker Leather Jerkin',
    category: 'armor',
    slot: 'armor',
    baseValue: 45,
    baseWeight: 6.0,
    iconName: 'Shield',
    description: 'Supple monster hide reinforced with boiled rivets for silent, unrestricted agility.',
    statAffinities: ['agility', 'health'],
  },
  {
    name: 'Aegis Mail Hauberk',
    category: 'armor',
    slot: 'armor',
    baseValue: 58,
    baseWeight: 12.0,
    iconName: 'ShieldCheck',
    description: 'Fine riveted steel chainmail worn over thick padded gambeson.',
    statAffinities: ['health', 'strength'],
  },

  // Accessories
  {
    name: 'Amulet of the Eclipse',
    category: 'accessory',
    slot: 'accessory',
    baseValue: 60,
    baseWeight: 0.5,
    iconName: 'Gem',
    description: 'An obsidian pendant cradling a captured sliver of twilight aura.',
    statAffinities: ['mana', 'intelligence', 'charisma'],
  },
  {
    name: 'Signet of Valor',
    category: 'accessory',
    slot: 'accessory',
    baseValue: 45,
    baseWeight: 0.2,
    iconName: 'Trophy',
    description: 'A heavy brass guild ring stamped with the ancient insignia of champion knights.',
    statAffinities: ['strength', 'health'],
  },
  {
    name: 'Band of the Zephyr',
    category: 'accessory',
    slot: 'accessory',
    baseValue: 50,
    baseWeight: 0.2,
    iconName: 'Zap',
    description: 'An aerated silver band that gently hums with the rush of mountain gales.',
    statAffinities: ['agility', 'mana'],
  },
  {
    name: 'Talisman of Iron Will',
    category: 'accessory',
    slot: 'accessory',
    baseValue: 55,
    baseWeight: 0.6,
    iconName: 'Shield',
    description: 'A runic stone medallion that fortifies its bearer against psychic disruption.',
    statAffinities: ['health', 'charisma'],
  },

  // Artifacts (Rare, Epic, Legendary, Mythic prime finds)
  {
    name: 'Chrono-Sundial of the Ancients',
    category: 'artifact',
    slot: 'artifact',
    baseValue: 180,
    baseWeight: 2.2,
    iconName: 'Compass',
    description: 'A miniature celestial clockwork sphere that imperceptibly distorts the flow of time around the hero.',
    statAffinities: ['agility', 'intelligence', 'mana'],
  },
  {
    name: 'Emberheart Crucible',
    category: 'artifact',
    slot: 'artifact',
    baseValue: 210,
    baseWeight: 4.5,
    iconName: 'Flame',
    description: 'A floating shard of crystallized magma perpetually radiating an aura of primal fire.',
    statAffinities: ['strength', 'health', 'charisma'],
  },
  {
    name: 'Astral Grimoire of the Void',
    category: 'artifact',
    slot: 'artifact',
    baseValue: 240,
    baseWeight: 3.0,
    iconName: 'Sparkles',
    description: 'Pages forged from cosmic dust that whisper forgotten incantations directly into the bearer’s mind.',
    statAffinities: ['intelligence', 'mana', 'charisma'],
  },
  {
    name: 'Chalice of the First Dawn',
    category: 'artifact',
    slot: 'artifact',
    baseValue: 200,
    baseWeight: 2.8,
    iconName: 'Trophy',
    description: 'An ornate golden relic that sanctifies any liquid poured within into rejuvenating nectar.',
    statAffinities: ['health', 'mana', 'charisma'],
  },

  // Consumables
  {
    name: 'Draught of Supreme Fortitude',
    category: 'consumable',
    slot: 'inventory',
    baseValue: 35,
    baseWeight: 0.8,
    iconName: 'FlaskConical',
    description: 'An emerald viscous elixir brewed with mandrake root and dragon blossom nectar.',
    statAffinities: ['health'],
  },
  {
    name: 'Astral Ether Flask',
    category: 'consumable',
    slot: 'inventory',
    baseValue: 35,
    baseWeight: 0.8,
    iconName: 'FlaskConical',
    description: 'A glowing sapphire tonic that instantly replenishes strained arcane channels.',
    statAffinities: ['mana'],
  },
  {
    name: 'Elixir of Apex Focus',
    category: 'consumable',
    slot: 'inventory',
    baseValue: 40,
    baseWeight: 0.6,
    iconName: 'Zap',
    description: 'A crackling serum distilled from storm clouds, heightening reflexes and strike speed.',
    statAffinities: ['agility', 'strength'],
  },
  {
    name: 'Phial of Dragon Blood',
    category: 'consumable',
    slot: 'inventory',
    baseValue: 60,
    baseWeight: 1.0,
    iconName: 'Flame',
    description: 'Warm crimson ichor that surges through veins with overwhelming destructive fury.',
    statAffinities: ['strength', 'health'],
  },
];

export interface LootAffix {
  name: string;
  statBonus: {
    stat: 'health' | 'mana' | 'strength' | 'intelligence' | 'agility' | 'charisma';
    multiplier: number;
  };
  minRarity: CardRarity;
  specialEffect?: string;
}

export const LOOT_PREFIXES: LootAffix[] = [
  { name: 'Sturdy', statBonus: { stat: 'health', multiplier: 1.0 }, minRarity: 'Common' },
  { name: 'Keen', statBonus: { stat: 'agility', multiplier: 1.0 }, minRarity: 'Common' },
  { name: 'Brutal', statBonus: { stat: 'strength', multiplier: 1.1 }, minRarity: 'Common' },
  { name: 'Gleaming', statBonus: { stat: 'charisma', multiplier: 1.1 }, minRarity: 'Common' },
  { name: 'Arcane', statBonus: { stat: 'intelligence', multiplier: 1.2 }, minRarity: 'Uncommon' },
  { name: 'Vibrant', statBonus: { stat: 'mana', multiplier: 1.2 }, minRarity: 'Uncommon' },
  { name: 'Vanguard\'s', statBonus: { stat: 'health', multiplier: 1.4 }, minRarity: 'Rare' },
  { name: 'Tempestuous', statBonus: { stat: 'agility', multiplier: 1.4 }, minRarity: 'Rare' },
  { name: 'Dreadforged', statBonus: { stat: 'strength', multiplier: 1.5 }, minRarity: 'Epic' },
  { name: 'Celestial', statBonus: { stat: 'intelligence', multiplier: 1.6 }, minRarity: 'Epic' },
  { name: 'Archon\'s', statBonus: { stat: 'charisma', multiplier: 1.8 }, minRarity: 'Legendary' },
  { name: 'Godforged', statBonus: { stat: 'strength', multiplier: 2.2 }, minRarity: 'Mythic' },
  { name: 'Omniscient', statBonus: { stat: 'intelligence', multiplier: 2.2 }, minRarity: 'Mythic' },
];

export const LOOT_SUFFIXES: LootAffix[] = [
  { name: 'of the Bear', statBonus: { stat: 'health', multiplier: 1.0 }, minRarity: 'Common' },
  { name: 'of the Fox', statBonus: { stat: 'agility', multiplier: 1.0 }, minRarity: 'Common' },
  { name: 'of Might', statBonus: { stat: 'strength', multiplier: 1.1 }, minRarity: 'Common' },
  { name: 'of Radiance', statBonus: { stat: 'charisma', multiplier: 1.2 }, minRarity: 'Uncommon' },
  { name: 'of the Mind', statBonus: { stat: 'intelligence', multiplier: 1.3 }, minRarity: 'Uncommon' },
  { name: 'of the Deep Woods', statBonus: { stat: 'agility', multiplier: 1.4 }, minRarity: 'Rare' },
  { name: 'of the Sunken Spire', statBonus: { stat: 'mana', multiplier: 1.5 }, minRarity: 'Rare' },
  { name: 'of the Dragon King', statBonus: { stat: 'strength', multiplier: 1.8 }, minRarity: 'Epic', specialEffect: 'Attacks scorch foes for bonus elemental burn.' },
  { name: 'of the Astral Void', statBonus: { stat: 'intelligence', multiplier: 1.8 }, minRarity: 'Epic', specialEffect: 'Spellcraft incurs 15% reduced mana cost.' },
  { name: 'of Immortality', statBonus: { stat: 'health', multiplier: 2.0 }, minRarity: 'Legendary', specialEffect: 'Regenerates 5% maximum health when dropping under 25% HP.' },
  { name: 'of the World Breaker', statBonus: { stat: 'strength', multiplier: 2.5 }, minRarity: 'Mythic', specialEffect: 'Critical strikes shatter 40% of target armor resistance.' },
  { name: 'of Primordial Eternity', statBonus: { stat: 'mana', multiplier: 2.5 }, minRarity: 'Mythic', specialEffect: 'Mana channel overcharges spells to unleash twin cascades.' },
];

export const SPECIAL_EFFECTS_BY_RARITY: Record<CardRarity, string[]> = {
  Common: [],
  Uncommon: [
    'Grants +5% movement swiftness in dungeon terrain.',
    'Emits a gentle luminescent glow in pitch blackness.',
    'Reduces stamina weariness during prolonged marches.'
  ],
  Rare: [
    'Strikes have a 15% chance to inflict Bleed on foes.',
    'Absorbs 10 points of incoming spell damage per hit.',
    'Grants +2 bonus to passive initiative checks.',
    'Provides +10% bonus gold discovery upon dungeon completion.'
  ],
  Epic: [
    'Critical strikes erupt into an arcane shockwave damaging adjacent foes.',
    'When health falls below 30%, triggers a protective Aegis absorbing 75 damage.',
    'Arcane spells have a 20% chance to refund 50% mana spent.',
    'Increases melee and ranged armor penetration by 25%.'
  ],
  Legendary: [
    'Soul-Bonded: On taking fatal damage, revives the bearer with 35% HP (once per duel).',
    'Converts 20% of all inflicted damage into direct vitality siphon.',
    'Spells call down a radiant celestial meteor dealing burst holy damage.',
    'Attacks inflict Temporal Stutter, lowering target action speed by 30%.'
  ],
  Mythic: [
    'Titan Heritage: Quadruples critical strike damage and permanently nullifies knockback.',
    'Primordial Sovereign: Spells chain infinitely between nearby adversaries.',
    'Aura of Invincibility: All incoming damage reduced by 30% and reflects 15% back as pure fire.'
  ]
};
