import { CharacterClassType, CharacterRaceType, CardRarity, FantasyCharacter, RaceProfile, QuestHook } from '../types';

export const ALL_RACES: CharacterRaceType[] = [
  'Human',
  'High Elf',
  'Mountain Dwarf',
  'Tiefling',
  'Dragonborn',
  'Wood Elf',
  'Half-Orc',
  'Halfling',
  'Aasimar',
  'Gnome',
];

export const RACE_PROFILES: Record<CharacterRaceType, RaceProfile> = {
  Human: {
    name: 'Human',
    traitName: 'Tenacious Versatility',
    traitDescription: 'Adaptable spirit granting balanced mastery across all martial and mystical disciplines.',
    statBonusText: '+15 HP, +10 Mana, +4 All Attributes',
    bonus: { health: 15, mana: 10, strength: 4, intelligence: 4, agility: 4, charisma: 4 },
  },
  'High Elf': {
    name: 'High Elf',
    traitName: 'Astral Reverie',
    traitDescription: 'Ancient communion with the cosmos granting profound spellweave capacity and keen mind.',
    statBonusText: '+80 Mana, +12 Intelligence, +6 Agility',
    bonus: { health: -10, mana: 80, strength: -2, intelligence: 12, agility: 6, charisma: 5 },
  },
  'Mountain Dwarf': {
    name: 'Mountain Dwarf',
    traitName: 'Forged of Granite',
    traitDescription: 'Dense dwarven physiology immune to staggering blows, hardened through centuries underground.',
    statBonusText: '+75 HP, +14 Strength, -10 Mana',
    bonus: { health: 75, mana: -10, strength: 14, intelligence: 0, agility: -2, charisma: 2 },
  },
  Tiefling: {
    name: 'Tiefling',
    traitName: 'Hellfire Legacy',
    traitDescription: 'Diabolic heritage fueling bewitching charm, scorching brimstone embers, and fiery gaze.',
    statBonusText: '+35 Mana, +12 Charisma, +6 Intelligence',
    bonus: { health: 10, mana: 35, strength: 2, intelligence: 6, agility: 4, charisma: 12 },
  },
  Dragonborn: {
    name: 'Dragonborn',
    traitName: 'Draconic Breath & Scales',
    traitDescription: 'Infused with ancient wyrm lineage, capable of exhaling elemental fury upon foes.',
    statBonusText: '+50 HP, +12 Strength, +8 Charisma',
    bonus: { health: 50, mana: 15, strength: 12, intelligence: 2, agility: 0, charisma: 8 },
  },
  'Wood Elf': {
    name: 'Wood Elf',
    traitName: 'Fleetfoot of the Canopy',
    traitDescription: 'Unmatched reflexes and woodland camouflage making them whisper-silent stalkers.',
    statBonusText: '+15 Agility, +20 HP, +6 Strength',
    bonus: { health: 20, mana: 20, strength: 6, intelligence: 3, agility: 15, charisma: 2 },
  },
  'Half-Orc': {
    name: 'Half-Orc',
    traitName: 'Relentless Ferocity',
    traitDescription: 'Unchecked barbarian fury that surges when cornered, delivering devastating crushing strikes.',
    statBonusText: '+65 HP, +16 Strength, -4 Intelligence',
    bonus: { health: 65, mana: -15, strength: 16, intelligence: -4, agility: 4, charisma: 2 },
  },
  Halfling: {
    name: 'Halfling',
    traitName: 'Brave Fortune',
    traitDescription: 'Incurable luck and small stature allowing them to slip through clutches of titan adversaries.',
    statBonusText: '+14 Agility, +10 Charisma, +20 Mana',
    bonus: { health: -5, mana: 20, strength: -4, intelligence: 5, agility: 14, charisma: 10 },
  },
  Aasimar: {
    name: 'Aasimar',
    traitName: 'Celestial Radiance',
    traitDescription: 'Touched by seraphic light, radiating healing warmth and awe-inspiring presence.',
    statBonusText: '+40 HP, +45 Mana, +14 Charisma',
    bonus: { health: 40, mana: 45, strength: 4, intelligence: 6, agility: 2, charisma: 14 },
  },
  Gnome: {
    name: 'Gnome',
    traitName: 'Artificer Cunning',
    traitDescription: 'Boundless curiosity and inventive intellect that dismantles arcane contraptions effortlessly.',
    statBonusText: '+16 Intelligence, +35 Mana, +6 Agility',
    bonus: { health: -10, mana: 35, strength: -6, intelligence: 16, agility: 6, charisma: 6 },
  },
};

export const FIRST_NAMES = [
  'Alden', 'Aeloria', 'Bram', 'Cassian', 'Darian', 'Elowen', 'Faelan',
  'Garrick', 'Hael', 'Ilyana', 'Jarek', 'Kaelen', 'Lyra', 'Mirela',
  'Nyx', 'Orion', 'Paige', 'Quinn', 'Roland', 'Seraphina', 'Theron',
  'Urien', 'Valeria', 'Wynne', 'Xanthos', 'Yvaine', 'Zephyr', 'Morgrim',
  'Gwyneira', 'Thorgar', 'Astrid', 'Finnian', 'Kaelith', 'Balthazar',
  'Drakos', 'Sable', 'Vesper', 'Branoc', 'Isolde', 'Lorcan', 'Maeve',
  'Cedric', 'Thalia', 'Rory', 'Rowan', 'Torin', 'Kallista', 'Alastor'
];

export const SURNAMES = [
  'Emberveil', 'Silverthorn', 'Shadowstride', 'Ironbreaker', 'Stormcaller',
  'Nightshade', 'Frostfang', 'Deepdelver', 'Starweaver', 'Sunblade',
  'Ravenshade', 'Bloodthorn', 'Mistwhisper', 'Duskbane', 'Oakenheart',
  'Wyrmslayer', 'Gloomveil', 'Runecrest', 'Dawnchaser', 'Stoneguard',
  'Swiftwind', 'Hollowglen', 'Winterborne', 'Flameborne', 'Grimhold',
  'Ashenvale', 'Blackwood', 'Moonshadow', 'Ironfist', 'Goldmane'
];

export const CLASS_PROFILES: Record<
  CharacterClassType,
  {
    titles: string[];
    flavor: string;
    weapons: string[];
    origins: string[];
    badgeColor: {
      bg: string;
      border: string;
      text: string;
      accent: string;
      glow: string;
    };
    iconName: string;
    baseStats: { might: number; agility: number; intellect: number; spirit: number };
  }
> = {
  Warrior: {
    titles: [
      'The Unyielding Bulwark',
      'Blade of the Vanguard',
      'Iron Champion',
      'Colossus of the North',
      'Breaker of Siege-Lines'
    ],
    flavor: 'Tempered in the fires of endless battle, standing as an impenetrable wall between companions and catastrophe.',
    weapons: ['Runed Greathammer', 'Heavy Bastard Sword', 'Forged Tower Shield & Spear', 'Twin Broadaxes'],
    origins: ['The Ashen Bastion', 'Highland Stronghold of Doran', 'Fortress of the Iron March', 'Stormcrag Peaks'],
    badgeColor: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-600/40',
      text: 'text-amber-300',
      accent: 'bg-amber-500',
      glow: 'shadow-amber-500/20'
    },
    iconName: 'Swords',
    baseStats: { might: 18, agility: 12, intellect: 8, spirit: 11 }
  },
  Mage: {
    titles: [
      'Weaver of the Arcane Weave',
      'Master of Starlight',
      'Chronocaster of Oros',
      'Keeper of the Forgotten Grimoire',
      'Scholar of Prismatic Fire'
    ],
    flavor: 'Channels raw cosmic and elemental energies to bend reality, conjure blazing storms, and unravel primordial mysteries.',
    weapons: ['Astral Crystal Staff', 'Tome of Prismatic Seals', 'Spire Spellblade', 'Celestial Orrery Orb'],
    origins: ['The Floating Citadel of Aethel', 'Great Archives of Oros', 'Sunken Observatory', 'Glass Spire of Valis'],
    badgeColor: {
      bg: 'bg-cyan-950/40',
      border: 'border-cyan-500/40',
      text: 'text-cyan-300',
      accent: 'bg-cyan-500',
      glow: 'shadow-cyan-500/20'
    },
    iconName: 'Wand2',
    baseStats: { might: 7, agility: 10, intellect: 19, spirit: 14 }
  },
  Rogue: {
    titles: [
      'Ghost of the Gilded Alley',
      'Shadow of the Obsidian Ring',
      'Silent Blade of Dusk',
      'The Whispering Dagger',
      'Phantom of the High Guild'
    ],
    flavor: 'Moves unseen through the deepest shadows, striking with lethal precision before vanishing into the midnight fog.',
    weapons: ['Serrated Shadowdaggers', 'Concealed Spring-Blades', 'Blackglass Hand-Crossbow', 'Venom-Tipped Stiletto'],
    origins: ['Undercity of Ravenholme', 'Guild of Whispers', 'The Sunless Docks', 'Shrouded Reach'],
    badgeColor: {
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-500/40',
      text: 'text-emerald-300',
      accent: 'bg-emerald-500',
      glow: 'shadow-emerald-500/20'
    },
    iconName: 'Zap',
    baseStats: { might: 11, agility: 19, intellect: 13, spirit: 9 }
  },
  Paladin: {
    titles: [
      'Vindicator of the Silver Flame',
      'Shield of the Radiant Dawn',
      'Hand of Sacred Justice',
      'Oathkeeper of the Sun',
      'Paragon of the High Templars'
    ],
    flavor: 'Bound by sacred unbreakable oaths, smiting creeping darkness with blinding radiance while shielding the innocent.',
    weapons: ['Sunforged Greatsword', 'Blessed Tower Shield & Mace', 'Radiant Halberd', 'Hammer of the Justiciar'],
    origins: ['The Radiant Sanctum', 'Cathedral of the Dawnspire', 'Order of the Silver Chalice', 'Luminous Watch'],
    badgeColor: {
      bg: 'bg-yellow-950/40',
      border: 'border-yellow-500/40',
      text: 'text-yellow-300',
      accent: 'bg-yellow-400',
      glow: 'shadow-yellow-500/20'
    },
    iconName: 'ShieldCheck',
    baseStats: { might: 16, agility: 9, intellect: 11, spirit: 17 }
  },
  Ranger: {
    titles: [
      'Ghost of the Whispering Woods',
      'Warden of the Primal Frontier',
      'Hawkeye of the Crags',
      'The Emerald Stalker',
      'Guardian of the Silent Tracks'
    ],
    flavor: 'At one with the untamed wilderness, tracking quarry over treacherous peaks and unleashing devastating volleys from afar.',
    weapons: ['Yew Longbow of the Canopy', 'Twin Curved Hunting Knives', 'Composite Recurve Bow', 'Fletched Greatbow'],
    origins: ['Deep Sylvan Glade', 'Frostpeak Timberlands', 'Mistwood Expanse', 'Verdant Reach'],
    badgeColor: {
      bg: 'bg-lime-950/40',
      border: 'border-lime-500/40',
      text: 'text-lime-300',
      accent: 'bg-lime-500',
      glow: 'shadow-lime-500/20'
    },
    iconName: 'Compass',
    baseStats: { might: 13, agility: 18, intellect: 11, spirit: 12 }
  },
  Cleric: {
    titles: [
      'Beacon of Sacred Grace',
      'Voice of the High Heavens',
      'Restorer of Broken Spirits',
      'Shepherd of the Lost',
      'Keeper of the Eternal Shrine'
    ],
    flavor: 'A devout conduit of celestial grace, mending mortal wounds and casting out malevolent horrors with consecrated words.',
    weapons: ['Sanctified Warflail', 'Censer of Cleansing Light', 'Silver Reliquary Staff', 'Dawn Anointed Scepter'],
    origins: ['Temple of the Seven Embers', 'The Solitary Cloister', 'Shrine of Eternal Waters', 'Celestial Terrace'],
    badgeColor: {
      bg: 'bg-rose-950/40',
      border: 'border-rose-500/40',
      text: 'text-rose-300',
      accent: 'bg-rose-500',
      glow: 'shadow-rose-500/20'
    },
    iconName: 'Sparkles',
    baseStats: { might: 12, agility: 8, intellect: 14, spirit: 19 }
  },
  Bard: {
    titles: [
      'Maestro of the Gilded Court',
      'Balladeer of the Fallen Kings',
      'Weaver of Whispered Lore',
      'Virtuoso of the Silver String',
      'Jester of the High Thorns'
    ],
    flavor: 'Weaves melody, illusion, and ancient sagas into mesmerizing magic, inspiring courage and disorienting adversaries.',
    weapons: ['Starwood Lute & Rapier', 'Enchanted Flute of Charms', 'Gilded Dueling Foil', 'Bells of Twilight'],
    origins: ['Academy of Lyric Arts', 'Traveling Troupe of Sol', 'Gilded Opera of Mirand', 'The Whispering Tavern'],
    badgeColor: {
      bg: 'bg-purple-950/40',
      border: 'border-purple-500/40',
      text: 'text-purple-300',
      accent: 'bg-purple-500',
      glow: 'shadow-purple-500/20'
    },
    iconName: 'Music',
    baseStats: { might: 9, agility: 15, intellect: 15, spirit: 15 }
  },
  Druid: {
    titles: [
      'Speaker for the Primordial Wilds',
      'Guardian of the Ancient Grove',
      'Warden of the Bloodroot',
      'Spirit of the Great Forest',
      'Keeper of the Moonwell'
    ],
    flavor: 'Attuned to the raw cycle of earth and seasons, commanding roots, lightning, and shapeshifting into apex beasts.',
    weapons: ['Gnarled Ironwood Staff', 'Obsidian Scythe', 'Claws of the Apex Beast', 'Totemic Antler Club'],
    origins: ['Elder Grove of Yggdras', 'Sunken Bog of Elders', 'Whispering Canopy', 'Root of the World'],
    badgeColor: {
      bg: 'bg-teal-950/40',
      border: 'border-teal-500/40',
      text: 'text-teal-300',
      accent: 'bg-teal-500',
      glow: 'shadow-teal-500/20'
    },
    iconName: 'Leaf',
    baseStats: { might: 13, agility: 12, intellect: 14, spirit: 18 }
  },
  Warlock: {
    titles: [
      'Harbinger of the Void Pact',
      'Soulbinder of Nether Realms',
      'Disciple of the Eldritch Deep',
      'The Stygian Occultist',
      'Whisperer of the Outer Gate'
    ],
    flavor: 'Bound by a forbidden bargain with ancient entities of the outer stars, commanding eldritch curses and soulfire.',
    weapons: ['Eldritch Eye Focus', 'Tome of Inverted Seals', 'Spine of the Void Drake', 'Athame of Black Glass'],
    origins: ['Sunken Vault of Xol', 'Chasm of Whispering Stars', 'Ruins of the Abyssal Pact', 'The Black Sanctum'],
    badgeColor: {
      bg: 'bg-indigo-950/40',
      border: 'border-indigo-500/40',
      text: 'text-indigo-300',
      accent: 'bg-indigo-500',
      glow: 'shadow-indigo-500/20'
    },
    iconName: 'Flame',
    baseStats: { might: 8, agility: 11, intellect: 18, spirit: 16 }
  },
  Monk: {
    titles: [
      'Disciple of the Flowing River',
      'Master of the Iron Palm',
      'Windwalker of the High Peaks',
      'Ascetic of the Quiet Mind',
      'Strike of the Crane'
    ],
    flavor: 'Harnesses internal ki through focused contemplation, unleashing lightning flurries and defying gravity with effortless poise.',
    weapons: ['Polished Bo Staff', 'Wrappings of Ascended Ki', 'Twin Iron Nunchaku', 'Bare Fists of the Tiger'],
    origins: ['High Cloud Monastery', 'Valley of the Silent Falls', 'Temple of the Four Winds', 'Serene Summit'],
    badgeColor: {
      bg: 'bg-orange-950/40',
      border: 'border-orange-500/40',
      text: 'text-orange-300',
      accent: 'bg-orange-500',
      glow: 'shadow-orange-500/20'
    },
    iconName: 'Target',
    baseStats: { might: 14, agility: 18, intellect: 11, spirit: 16 }
  }
};

export const ALL_CLASSES: CharacterClassType[] = [
  'Warrior',
  'Mage',
  'Rogue',
  'Paladin',
  'Ranger',
  'Cleric',
  'Bard',
  'Druid',
  'Warlock',
  'Monk'
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomStatVariation(base: number): number {
  const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
  return Math.max(5, Math.min(20, base + delta));
}

export const CLASS_COMBAT_STATS: Record<
  CharacterClassType,
  { 
    health: [number, number]; 
    mana: [number, number]; 
    strength: [number, number];
    intelligence: [number, number];
    agility: [number, number];
    charisma: [number, number];
  }
> = {
  Warrior: { health: [450, 580], mana: [60, 130], strength: [75, 98], intelligence: [20, 45], agility: [40, 65], charisma: [35, 60] },
  Mage: { health: [190, 290], mana: [480, 680], strength: [18, 36], intelligence: [80, 100], agility: [35, 55], charisma: [50, 75] },
  Rogue: { health: [260, 360], mana: [150, 260], strength: [50, 72], intelligence: [45, 70], agility: [82, 100], charisma: [55, 80] },
  Paladin: { health: [420, 540], mana: [240, 380], strength: [70, 92], intelligence: [40, 65], agility: [35, 58], charisma: [70, 92] },
  Ranger: { health: [300, 410], mana: [180, 300], strength: [55, 78], intelligence: [40, 65], agility: [75, 96], charisma: [40, 65] },
  Cleric: { health: [320, 440], mana: [380, 560], strength: [42, 65], intelligence: [60, 85], agility: [30, 52], charisma: [65, 88] },
  Bard: { health: [270, 380], mana: [320, 490], strength: [38, 62], intelligence: [55, 80], agility: [60, 82], charisma: [85, 100] },
  Druid: { health: [340, 460], mana: [340, 520], strength: [52, 74], intelligence: [65, 88], agility: [45, 68], charisma: [45, 70] },
  Warlock: { health: [250, 350], mana: [460, 640], strength: [30, 52], intelligence: [75, 95], agility: [40, 62], charisma: [78, 98] },
  Monk: { health: [350, 470], mana: [220, 350], strength: [66, 88], intelligence: [45, 70], agility: [78, 98], charisma: [40, 65] },
};

export function rollCardRarity(): CardRarity {
  const roll = Math.random() * 100;
  if (roll < 45) return 'Common';
  if (roll < 73) return 'Uncommon';
  if (roll < 88) return 'Rare';
  if (roll < 97) return 'Epic';
  return 'Legendary';
}

export function generateQuestHook(character: FantasyCharacter): QuestHook {
  const questThemes = [
    {
      title: `The Siege of ${character.origin}`,
      premise: `Ancient shadow wardens have broken the ancient wards surrounding ${character.origin}, seeking the primeval catalyst buried beneath the foundation.`,
      objective: `Infiltrate the sunken catacombs with ${character.primaryWeapon} and banish the Nether Gate before the eclipse concludes.`,
      danger: `Abyssal wraiths immune to non-magical strikes and decaying miasma that saps physical vitality.`,
      reward: `5,000 Guild Sovereigns and the legendary Relic of the Sunlit Sanctum.`,
    },
    {
      title: `Curse of the Obsidian Wyrm`,
      premise: `A primordial dragon slumbering beneath the scorched craters has awakened, poisoning water basins and demanding alchemical tribute.`,
      objective: `Ascend the Caldera of Dread, duel the Draconic Vanguard, and shatter the dragon's Heart-Gem.`,
      danger: `Molten breath incinerating armor in seconds and seismic tremors collapsing cave networks.`,
      reward: `Heart-Gem Shards (Legendary Enchantment) and Exalted status in the Grand Arcanum.`,
    },
    {
      title: `The Stolen Arcanum Codex`,
      premise: `A splinter cell of rogue magi raided the Imperial Archives, escaping with an inscriber grimoire detailing forbidden transmutations.`,
      objective: `Track the defectors through the Whisperwood forest and reclaim the codex intact.`,
      danger: `Chrono-stasis traps and animated mercury golems guarding the defectors' redoubt.`,
      reward: `Arcane Inscriber Seal of Mastery and choice of an Epic Spellweave armament.`,
    },
    {
      title: `Whispers from the Sunken Spire`,
      premise: `Drowned bells toll from beneath the mist-shrouded leviathan trench, driving coastal villagers into hallucinatory trances.`,
      objective: `Dive into the sunken temple ruins, extinguish the Void Censer, and liberate the captive sirens.`,
      danger: `Crushing benthic pressure, eldritch tidal horrors, and seductive psychic sirens.`,
      reward: `Crown of the Tides and eternal favor of the Oceanic High Court.`,
    },
  ];

  const match = getRandomItem(questThemes);
  return match;
}

export function generateRandomCharacter(previousId?: string, preferredRace?: CharacterRaceType): FantasyCharacter {
  const firstName = getRandomItem(FIRST_NAMES);
  const surname = getRandomItem(SURNAMES);
  const fullName = `${firstName} ${surname}`;

  const characterClass = getRandomItem(ALL_CLASSES);
  const profile = CLASS_PROFILES[characterClass];

  const raceName = preferredRace || getRandomItem(ALL_RACES);
  const raceProfile = RACE_PROFILES[raceName];

  const title = getRandomItem(profile.titles);
  const weapon = getRandomItem(profile.weapons);
  const origin = getRandomItem(profile.origins);

  const combatRange = CLASS_COMBAT_STATS[characterClass] || {
    health: [300, 450],
    mana: [200, 400],
    strength: [40, 70],
    intelligence: [40, 70],
    agility: [40, 70],
    charisma: [40, 70],
  };

  const baseHealth = Math.floor(Math.random() * (combatRange.health[1] - combatRange.health[0] + 1)) + combatRange.health[0];
  const baseMana = Math.floor(Math.random() * (combatRange.mana[1] - combatRange.mana[0] + 1)) + combatRange.mana[0];
  const baseStrength = Math.floor(Math.random() * (combatRange.strength[1] - combatRange.strength[0] + 1)) + combatRange.strength[0];
  const baseIntellect = Math.floor(Math.random() * (combatRange.intelligence[1] - combatRange.intelligence[0] + 1)) + combatRange.intelligence[0];
  const baseAgility = Math.floor(Math.random() * (combatRange.agility[1] - combatRange.agility[0] + 1)) + combatRange.agility[0];
  const baseCharisma = Math.floor(Math.random() * (combatRange.charisma[1] - combatRange.charisma[0] + 1)) + combatRange.charisma[0];

  const stats = {
    health: Math.max(100, baseHealth + raceProfile.bonus.health),
    mana: Math.max(20, baseMana + raceProfile.bonus.mana),
    strength: Math.max(10, baseStrength + raceProfile.bonus.strength),
    intelligence: Math.max(10, baseIntellect + raceProfile.bonus.intelligence),
    agility: Math.max(10, baseAgility + raceProfile.bonus.agility),
    charisma: Math.max(10, baseCharisma + raceProfile.bonus.charisma),
    might: getRandomStatVariation(profile.baseStats.might),
    intellect: baseIntellect,
    spirit: getRandomStatVariation(profile.baseStats.spirit),
  };

  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    name: fullName,
    className: characterClass,
    race: raceName,
    raceTrait: {
      name: raceProfile.traitName,
      description: raceProfile.traitDescription,
    },
    title,
    flavor: profile.flavor,
    primaryWeapon: weapon,
    origin,
    rarity: rollCardRarity(),
    badgeColor: profile.badgeColor,
    iconName: profile.iconName,
    stats,
    generatedAt: Date.now(),
  };
}

export function updateCharacterRace(character: FantasyCharacter, newRace: CharacterRaceType): FantasyCharacter {
  const currentRaceProfile = RACE_PROFILES[character.race];
  const newRaceProfile = RACE_PROFILES[newRace];

  // Recalculate stats based on delta from previous race to new race
  const stats = {
    ...character.stats,
    health: Math.max(100, character.stats.health - currentRaceProfile.bonus.health + newRaceProfile.bonus.health),
    mana: Math.max(20, character.stats.mana - currentRaceProfile.bonus.mana + newRaceProfile.bonus.mana),
    strength: Math.max(10, character.stats.strength - currentRaceProfile.bonus.strength + newRaceProfile.bonus.strength),
    intelligence: Math.max(10, character.stats.intelligence - currentRaceProfile.bonus.intelligence + newRaceProfile.bonus.intelligence),
    agility: Math.max(10, character.stats.agility - currentRaceProfile.bonus.agility + newRaceProfile.bonus.agility),
    charisma: Math.max(10, character.stats.charisma - currentRaceProfile.bonus.charisma + newRaceProfile.bonus.charisma),
  };

  return {
    ...character,
    race: newRace,
    raceTrait: {
      name: newRaceProfile.traitName,
      description: newRaceProfile.traitDescription,
    },
    stats,
  };
}
