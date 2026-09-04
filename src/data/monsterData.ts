import { MonsterArchetype, MonsterAttack, MonsterAbility, MonsterDifficulty, CardRarity } from '../types';

export interface MonsterArchetypeConfig {
  archetype: MonsterArchetype;
  minLevel: number;
  baseHp: number;
  baseMana: number;
  baseAc: number;
  baseStr: number;
  baseInt: number;
  baseAgi: number;
  iconName: string;
  weakness: string;
  resistance: string;
  defaultLootTier: CardRarity;
  prefixes: string[];
  suffixes: string[];
  attacks: Array<{
    name: string;
    type: 'melee' | 'ranged' | 'spell';
    dieCount: number;
    dieSides: number;
    description: string;
  }>;
  abilities: MonsterAbility[];
  flavorTemplates: string[];
}

export const MONSTER_ARCHETYPES: Record<MonsterArchetype, MonsterArchetypeConfig> = {
  Goblin: {
    archetype: 'Goblin',
    minLevel: 1,
    baseHp: 160,
    baseMana: 80,
    baseAc: 12,
    baseStr: 26,
    baseInt: 28,
    baseAgi: 54,
    iconName: 'Swords',
    weakness: 'Bludgeoning & Heavy Impact',
    resistance: 'Poison & Sneak Traps',
    defaultLootTier: 'Common',
    prefixes: ['Snarltooth', 'Shadow-skulker', 'Rust-dagger', 'Bog-stalker', 'Hex-cackler'],
    suffixes: ['Cutpurse', 'Scavenger', 'Tinkerer', 'Raider', 'Skulker'],
    attacks: [
      { name: 'Jagged Dagger Jab', type: 'melee', dieCount: 1, dieSides: 6, description: 'A rapid low thrust targeting armor seams.' },
      { name: 'Crude Shortbow Shot', type: 'ranged', dieCount: 1, dieSides: 6, description: 'Fires a barbed flint arrow steeped in mire venom.' },
    ],
    abilities: [
      { name: 'Nimble Escape', description: 'Slips through grasp with evasive rolling maneuvers.', effectType: 'buff' },
      { name: 'Pocket Sand', description: 'Flings blinding grime into the challenger’s eyes.', effectType: 'debuff' },
    ],
    flavorTemplates: [
      'A cunning scoundrel dwelling in underground warrens, surviving on stolen scrap and ambush tactics.',
      'Wiry, nervous, and surprisingly quick with a rusty dirk coated in bog sludge.'
    ],
  },
  Skeleton: {
    archetype: 'Skeleton',
    minLevel: 1,
    baseHp: 180,
    baseMana: 60,
    baseAc: 13,
    baseStr: 34,
    baseInt: 18,
    baseAgi: 42,
    iconName: 'Skull',
    weakness: 'Bludgeoning & Holy Radiant',
    resistance: 'Piercing & Necrotic',
    defaultLootTier: 'Common',
    prefixes: ['Grave-bound', 'Crypt-sentinel', 'Rattle-bone', 'Marrow-carver', 'Tomb-guard'],
    suffixes: ['Warden', 'Legionnaire', 'Remnant', 'Archer', 'Husk'],
    attacks: [
      { name: 'Rusted Scimitar Slash', type: 'melee', dieCount: 1, dieSides: 8, description: 'An emotionless sweeping blow from ancient steel.' },
      { name: 'Chilling Bone Arrow', type: 'ranged', dieCount: 1, dieSides: 6, description: 'Fires a shard of petrified bone infused with grave chill.' },
    ],
    abilities: [
      { name: 'Necrotic Stiffening', description: 'Bone lattice locks together to withstand physical blows.', effectType: 'buff' },
      { name: 'Death Rattle', description: 'A hollow resonant shriek shaking the adversary’s resolve.', effectType: 'debuff' },
    ],
    flavorTemplates: [
      'Animated by residual necromantic ley lines, marching silently in service of forgotten tombs.',
      'Bleached calcified warrior bones bound by spectral azure mist.'
    ],
  },
  Zombie: {
    archetype: 'Zombie',
    minLevel: 1,
    baseHp: 240,
    baseMana: 40,
    baseAc: 11,
    baseStr: 46,
    baseInt: 10,
    baseAgi: 20,
    iconName: 'Skull',
    weakness: 'Slashing & Radiant Light',
    resistance: 'Necrotic & Cold Decay',
    defaultLootTier: 'Common',
    prefixes: ['Rot-plagued', 'Carrion-bloat', 'Dusk-shambler', 'Plague-bearer', 'Grave-crawler'],
    suffixes: ['Ghoulish Corpse', 'Shambler', 'Abomination', 'Cadaver', 'Husk'],
    attacks: [
      { name: 'Decaying Maul Slam', type: 'melee', dieCount: 1, dieSides: 8, description: 'A lumbering, bone-crushing blow with rot-infused fists.' },
      { name: 'Bile Vomit', type: 'ranged', dieCount: 1, dieSides: 6, description: 'Regurgitates caustic tomb fluids across the duel grounds.' },
    ],
    abilities: [
      { name: 'Undead Fortitude', description: 'Refuses to collapse, surging with sluggish necrotic vigor.', effectType: 'heal' },
      { name: 'Putrid Miasma', description: 'Exudes sickening spores that weaken nearby muscles.', effectType: 'debuff' },
    ],
    flavorTemplates: [
      'A shambling flesh-puppet driven by hunger and lingering curses, impervious to mortal exhaustion.',
      'Swollen and waterlogged from forgotten crypts, relentless in its sluggish forward march.'
    ],
  },
  Wolf: {
    archetype: 'Wolf',
    minLevel: 2,
    baseHp: 210,
    baseMana: 70,
    baseAc: 13,
    baseStr: 38,
    baseInt: 22,
    baseAgi: 58,
    iconName: 'Swords',
    weakness: 'Fire & Bright Flash',
    resistance: 'Frost & Track Scent',
    defaultLootTier: 'Uncommon',
    prefixes: ['Frost-fur', 'Blood-hounder', 'Gloom-howler', 'Dire-pack', 'Shadow-fang'],
    suffixes: ['Alpha', 'Stalker', 'Predator', 'Hunter', 'Hound'],
    attacks: [
      { name: 'Savage Jaw Clamp', type: 'melee', dieCount: 2, dieSides: 6, description: 'Lethal bite sinking serrated canines into exposed sinew.' },
      { name: 'Tendon Shred Claw', type: 'melee', dieCount: 1, dieSides: 8, description: 'Ripping forward swipe aimed at hamstringing prey.' },
    ],
    abilities: [
      { name: 'Pack Hunter Instinct', description: 'Circumnavigates defensive postures with predatory flank timing.', effectType: 'buff' },
      { name: 'Feral Howl', description: 'A spine-chilling bellow reverberating across the colosseum stones.', effectType: 'debuff' },
    ],
    flavorTemplates: [
      'A massive feral predator from the crags of the howling timberlands, muscular and relentless.',
      'Silver-tipped fur bristling with primordial wilderness fury.'
    ],
  },
  Orc: {
    archetype: 'Orc',
    minLevel: 2,
    baseHp: 270,
    baseMana: 90,
    baseAc: 13,
    baseStr: 58,
    baseInt: 25,
    baseAgi: 36,
    iconName: 'Swords',
    weakness: 'Psychic & Confusion Spells',
    resistance: 'Physical Crushing & Intimidation',
    defaultLootTier: 'Uncommon',
    prefixes: ['Blood-crest', 'Skull-cleaver', 'Iron-jaw', 'War-monger', 'Rage-sworn'],
    suffixes: ['Berserker', 'Warlord', 'Marauder', 'Warmaster', 'Brute'],
    attacks: [
      { name: 'Heavy Greataxe Cleave', type: 'melee', dieCount: 1, dieSides: 12, description: 'A ferocious two-handed downward chop capable of splitting stone shields.' },
      { name: 'Iron-Studded Javelin', type: 'ranged', dieCount: 1, dieSides: 8, description: 'Hurls a crude heavy spear with tremendous shoulder torque.' },
    ],
    abilities: [
      { name: 'Blood Fury Rush', description: 'Surges into reckless frenzy when blood touches the sand.', effectType: 'buff' },
      { name: 'Intimidating Roar', description: 'Bellows a tribal challenge that unnerves lesser souls.', effectType: 'debuff' },
    ],
    flavorTemplates: [
      'Hardened by endless border skirmishes and mountain raids, proud bearer of ritual battle scars.',
      'A towering warrior carrying jagged iron weaponry bathed in furnace soot.'
    ],
  },
  Ogre: {
    archetype: 'Ogre',
    minLevel: 3,
    baseHp: 340,
    baseMana: 80,
    baseAc: 12,
    baseStr: 72,
    baseInt: 16,
    baseAgi: 28,
    iconName: 'Swords',
    weakness: 'Agile Counter-strikes & Blindness',
    resistance: 'Stun & Force Impacts',
    defaultLootTier: 'Rare',
    prefixes: ['Boulder-crusher', 'Hill-glutton', 'Bone-smasher', 'Gore-belly', 'Thunder-foot'],
    suffixes: ['Juggernaut', 'Brute', 'Titan-kin', 'Smasher', 'Behemoth'],
    attacks: [
      { name: 'Tree-Trunk Greatclub', type: 'melee', dieCount: 2, dieSides: 8, description: 'A panoramic swing sweeping through armor and bone alike.' },
      { name: 'Hurled Stone Boulder', type: 'ranged', dieCount: 1, dieSides: 10, description: 'Lobs a jagged boulder plucked directly from the arena floor.' },
    ],
    abilities: [
      { name: 'Colossal Bulk', description: 'Absorbs devastating impacts through sheer subcutaneous mass.', effectType: 'buff' },
      { name: 'Earthquake Stomp', description: 'Shakes the arena flagstones, upsetting the challenger’s balance.', effectType: 'debuff' },
    ],
    flavorTemplates: [
      'An enormous hulking mountain giant with an insatiable appetite and thick leathery hide.',
      'Ten feet of brute muscle, grunting with primal amusement at puny armored challengers.'
    ],
  },
  Troll: {
    archetype: 'Troll',
    minLevel: 4,
    baseHp: 380,
    baseMana: 110,
    baseAc: 14,
    baseStr: 68,
    baseInt: 22,
    baseAgi: 44,
    iconName: 'Flame',
    weakness: 'Fire & Acid Brand',
    resistance: 'Physical Blunt & Cold',
    defaultLootTier: 'Rare',
    prefixes: ['Moss-moss', 'Cave-lurker', 'Flesh-knitter', 'Venom-moss', 'Crag-fiend'],
    suffixes: ['Regenerator', 'Goliath', 'Stalker', 'Horror', 'Terror'],
    attacks: [
      { name: 'Wicked Hook Claws', type: 'melee', dieCount: 2, dieSides: 6, description: 'Rakes barbed emerald claws across the breastplate.' },
      { name: 'Acidic Slime Maw', type: 'melee', dieCount: 1, dieSides: 10, description: 'Snaps with needle-filled jaws dripping corrosive saliva.' },
    ],
    abilities: [
      { name: 'Cellular Regeneration', description: 'Flesh visibly weaves together and stitches wounds closed.', effectType: 'heal' },
      { name: 'Stalwart Vitality', description: 'Harden green skin into petrified bark armor.', effectType: 'buff' },
    ],
    flavorTemplates: [
      'A hulking lanky monster whose flesh rapidly regenerates unless cauterized with flame or caustic acid.',
      'Gnarled green-grey hide covered in subterranean lichen and moss, radiating primordial vigor.'
    ],
  },
  Vampire: {
    archetype: 'Vampire',
    minLevel: 5,
    baseHp: 420,
    baseMana: 260,
    baseAc: 16,
    baseStr: 62,
    baseInt: 76,
    baseAgi: 78,
    iconName: 'Skull',
    weakness: 'Radiant Dawn & Wooden Stake',
    resistance: 'Necrotic & Non-magical Blades',
    defaultLootTier: 'Epic',
    prefixes: ['Crimson-lord', 'Night-stalker', 'Blood-count', 'Sanguine-dusk', 'Shadow-noble'],
    suffixes: ['Aristocrat', 'Sovereign', 'Nightblade', 'Inquisitor', 'Dominator'],
    attacks: [
      { name: 'Blood Drain Bite', type: 'melee', dieCount: 2, dieSides: 8, description: 'Sinks fangs into neck veins, siphoning lifeforce into vitality.' },
      { name: 'Shadow Rapier Flurry', type: 'melee', dieCount: 1, dieSides: 10, description: 'A blur of silver-edged strikes woven with dark glamour.' },
      { name: 'Gloom Lance', type: 'spell', dieCount: 2, dieSides: 6, description: 'Conjures a spire of solidified darkness piercing through ward spells.' },
    ],
    abilities: [
      { name: 'Mist Form Evasion', description: 'Briefly shifts into vaporous mist to disperse incoming spellwork.', effectType: 'buff' },
      { name: 'Hypnotic Gaze', description: 'Enthralling crimson eyes paralyze the challenger’s reflexes.', effectType: 'debuff' },
      { name: 'Sanguine Feast', description: 'Heals wounds in proportion to drained lifeforce.', effectType: 'drain' },
    ],
    flavorTemplates: [
      'An ancient aristocratic creature of the midnight hour, cloaked in fine silks and immortal cunning.',
      'Pale, razor-eyed, and moving with speed that mocks mortal depth perception.'
    ],
  },
  Demon: {
    archetype: 'Demon',
    minLevel: 6,
    baseHp: 470,
    baseMana: 320,
    baseAc: 16,
    baseStr: 78,
    baseInt: 70,
    baseAgi: 62,
    iconName: 'Flame',
    weakness: 'Radiant Smite & Blessed Cold Iron',
    resistance: 'Fire & Hellish Poison',
    defaultLootTier: 'Epic',
    prefixes: ['Abyssal-flame', 'Brimstone-lord', 'Hell-binder', 'Chaos-wrought', 'Fiend-born'],
    suffixes: ['Ravager', 'Inquisitor', 'Overlord', 'Annihilator', 'Warmonger'],
    attacks: [
      { name: 'Brimstone Scythe', type: 'melee', dieCount: 2, dieSides: 10, description: 'Swings an obsidian blade drenched in boiling infernal sulfur.' },
      { name: 'Hellfire Blast', type: 'spell', dieCount: 3, dieSides: 6, description: 'Detonates a searing vortex of abyssal plasma.' },
    ],
    abilities: [
      { name: 'Infernal Cloak', description: 'Surrounds itself with superheated brimstone smoke.', effectType: 'buff' },
      { name: 'Abyssal Corruption', description: 'Infuses the victim’s aura with burning cursed embers.', effectType: 'debuff' },
    ],
    flavorTemplates: [
      'A hulking fiend forged in the boiling crags of the outer abyss, hungry for mortal torment.',
      'Obsidian-scaled skin glowing from internal infernal magma veins.'
    ],
  },
  Dragon: {
    archetype: 'Dragon',
    minLevel: 7,
    baseHp: 540,
    baseMana: 380,
    baseAc: 17,
    baseStr: 88,
    baseInt: 82,
    baseAgi: 58,
    iconName: 'Zap',
    weakness: 'Ice Frost & Heavy Piercing Ballista',
    resistance: 'Fire & Elemental Magic',
    defaultLootTier: 'Legendary',
    prefixes: ['Cinder-drake', 'Storm-wing', 'Wyrm-sovereign', 'Elder-scale', 'Dread-talon'],
    suffixes: ['Ancient', 'Tyrant', 'Wyrm', 'Conqueror', 'Apex'],
    attacks: [
      { name: 'Cataclysmic Breath', type: 'spell', dieCount: 3, dieSides: 8, description: 'Unleashes an incinerating cone of ancient draconic flame.' },
      { name: 'Iron-Talon Rend', type: 'melee', dieCount: 2, dieSides: 10, description: 'Massive razor claws tearing through hardened steel.' },
      { name: 'Tail Lash Quake', type: 'melee', dieCount: 1, dieSides: 12, description: 'A colossal tail swipe flattening battle formations.' },
    ],
    abilities: [
      { name: 'Dragon Scale Ward', description: 'Impenetrable ancient scales turn aside mundane edge and fire.', effectType: 'buff' },
      { name: 'Frightful Presence', description: 'An aura of primeval supremacy that strikes terror into mortal hearts.', effectType: 'debuff' },
    ],
    flavorTemplates: [
      'An apex predator of mythic legend, winged sovereign of ash and sovereign hoards.',
      'Emerald-gold scaled monarch whose heartbeat echoes like subterranean thunder.'
    ],
  },
};

export const DIFFICULTY_CONFIG: Record<MonsterDifficulty, {
  name: MonsterDifficulty;
  statMultiplier: number;
  hpMultiplier: number;
  levelOffset: number;
  xpMultiplier: number;
  goldMultiplier: number;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}> = {
  Minion: {
    name: 'Minion',
    statMultiplier: 0.85,
    hpMultiplier: 0.8,
    levelOffset: -1,
    xpMultiplier: 0.75,
    goldMultiplier: 0.7,
    badgeBg: 'bg-emerald-950/40',
    badgeBorder: 'border-emerald-500/40',
    badgeText: 'text-emerald-300',
  },
  Standard: {
    name: 'Standard',
    statMultiplier: 1.0,
    hpMultiplier: 1.0,
    levelOffset: 0,
    xpMultiplier: 1.0,
    goldMultiplier: 1.0,
    badgeBg: 'bg-blue-950/40',
    badgeBorder: 'border-blue-500/40',
    badgeText: 'text-blue-300',
  },
  Elite: {
    name: 'Elite',
    statMultiplier: 1.18,
    hpMultiplier: 1.25,
    levelOffset: 1,
    xpMultiplier: 1.35,
    goldMultiplier: 1.3,
    badgeBg: 'bg-purple-950/40',
    badgeBorder: 'border-purple-500/40',
    badgeText: 'text-purple-300',
  },
  Boss: {
    name: 'Boss',
    statMultiplier: 1.35,
    hpMultiplier: 1.5,
    levelOffset: 2,
    xpMultiplier: 1.75,
    goldMultiplier: 1.7,
    badgeBg: 'bg-amber-950/40',
    badgeBorder: 'border-amber-500/40',
    badgeText: 'text-amber-300',
  },
  Apex: {
    name: 'Apex',
    statMultiplier: 1.55,
    hpMultiplier: 1.8,
    levelOffset: 3,
    xpMultiplier: 2.2,
    goldMultiplier: 2.0,
    badgeBg: 'bg-rose-950/50',
    badgeBorder: 'border-rose-500/60',
    badgeText: 'text-rose-300',
  },
};
