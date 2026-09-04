import { CharacterClassType, CharacterPortraitData } from '../types';

// Pre-generated high-resolution video-game cartoon portraits
import warriorAsset from '../assets/images/fantasy_portraits_preview_1788510412941.jpg';
import mageAsset from '../assets/images/mage_portrait_cartoon_1788510452341.jpg';
import rogueAsset from '../assets/images/rogue_portrait_cartoon_1788510473507.jpg';
import paladinAsset from '../assets/images/paladin_portrait_cartoon_1788510495257.jpg';

export interface ClassVisualProfile {
  name: string;
  themeColor: string;
  secondaryColor: string;
  accentGlow: string;
  bgGradient: [string, string, string];
  assetUrl?: string;
  variants: Array<{
    styleName: string;
    gearTitle: string;
    paletteTheme: string;
    headgear: string;
    armor: string;
    weaponProp: string;
    expression: string;
    particleType: 'embers' | 'stars' | 'poison' | 'sunlight' | 'leaves' | 'music' | 'souls' | 'petals' | 'sacred';
  }>;
}

export const CLASS_VISUAL_PROFILES: Record<CharacterClassType, ClassVisualProfile> = {
  Warrior: {
    name: 'Warrior',
    themeColor: '#e0533c',
    secondaryColor: '#f97316',
    accentGlow: 'rgba(239, 68, 68, 0.45)',
    bgGradient: ['#2b0d09', '#1a0806', '#0d0403'],
    assetUrl: warriorAsset,
    variants: [
      {
        styleName: 'Crimson Vanguard',
        gearTitle: 'Iron-Forged Greathelm & Molten Pauldrons',
        paletteTheme: 'Deep Crimson & Burnished Steel',
        headgear: 'Winged Iron Barbute',
        armor: 'Lion-Embossed Plate Breastplate',
        weaponProp: 'Colossal Runed Greatsword',
        expression: 'Steely Determination',
        particleType: 'embers',
      },
      {
        styleName: 'Berserker Chieftain',
        gearTitle: 'Horned War Circlet & Fur Shoulder Mantle',
        paletteTheme: 'Oxblood & Bronze',
        headgear: 'Horned Warlord Crest',
        armor: 'Segmented Spiked Cuirass',
        weaponProp: 'Double-Edged Battleaxe',
        expression: 'Fierce Battle Grin',
        particleType: 'embers',
      },
      {
        styleName: 'Champion of the Forge',
        gearTitle: 'Anvil-Tempered Full Visor & Drake Gorget',
        paletteTheme: 'Charcoal & Amber Glow',
        headgear: 'Close Knight Helm with Fiery Plume',
        armor: 'Heavy Engraved Steel Plate',
        weaponProp: 'Flanged Forge Warhammer',
        expression: 'Imposing Stoicism',
        particleType: 'embers',
      },
    ],
  },
  Mage: {
    name: 'Mage',
    themeColor: '#38bdf8',
    secondaryColor: '#818cf8',
    accentGlow: 'rgba(56, 189, 248, 0.45)',
    bgGradient: ['#081e36', '#091326', '#040712'],
    assetUrl: mageAsset,
    variants: [
      {
        styleName: 'Astral Arcanist',
        gearTitle: 'Star-Embroidered Cowl & Floating Runes',
        paletteTheme: 'Cosmic Indigo & Celestial Cyan',
        headgear: 'Pointed Sorcerer Hood with Gold Trim',
        armor: 'High-Collared Enchanted Silk Robe',
        weaponProp: 'Crystal-Headed Mana Staff',
        expression: 'Mystical Contemplation',
        particleType: 'stars',
      },
      {
        styleName: 'Pyromancer Archmage',
        gearTitle: 'Molten Rune Diadem & Velvet Mantle',
        paletteTheme: 'Violet Void & Solar Flare',
        headgear: 'Floating Arcane Crown',
        armor: 'Phoenix Feather Embroidered Stole',
        weaponProp: 'Flaming Spellbook Grimoire',
        expression: 'Intense Arcane Focus',
        particleType: 'stars',
      },
      {
        styleName: 'Chronos Weaver',
        gearTitle: 'Temporal Circlet & Hourglass Talisman',
        paletteTheme: 'Electric Blue & Starlight Silver',
        headgear: 'Moonstone Browband',
        armor: 'Silken Spire Mantle with Constellations',
        weaponProp: 'Hovering Arcane Chrono-Orb',
        expression: 'Enigmatic Gaze',
        particleType: 'stars',
      },
    ],
  },
  Rogue: {
    name: 'Rogue',
    themeColor: '#10b981',
    secondaryColor: '#14b8a6',
    accentGlow: 'rgba(16, 185, 129, 0.45)',
    bgGradient: ['#042116', '#04140e', '#020a07'],
    assetUrl: rogueAsset,
    variants: [
      {
        styleName: 'Shadowblade Infiltrator',
        gearTitle: 'Midnight Leather Cowl & Dual Venom Daggers',
        paletteTheme: 'Obsidian & Toxic Emerald',
        headgear: 'Deep Assassin Hood & Half-Mask',
        armor: 'Studded Midnight Leather Cuirass',
        weaponProp: 'Twin Serrated Poison Daggers',
        expression: 'Cunning Smirk',
        particleType: 'poison',
      },
      {
        styleName: 'Phantom Duelist',
        gearTitle: 'Feathered Shadow Beret & Throwing Sheath',
        paletteTheme: 'Slate Black & Jade Glint',
        headgear: 'Folded Rogue Cap with Raven Quill',
        armor: 'Reinforced Buckled Gambeson',
        weaponProp: 'Ornate Gilded Stiletto',
        expression: 'Sharp Vigilance',
        particleType: 'poison',
      },
      {
        styleName: 'Nightstalker Ghost',
        gearTitle: 'Smokeweaver Wrap & Throwing Bandolier',
        paletteTheme: 'Charcoal & Acid Green',
        headgear: 'Dark Silk Face Wrap',
        armor: 'Silent Stalker Vest with Dagger Straps',
        weaponProp: 'Crossed Hidden Karambits',
        expression: 'Piercing Emerald Eyes',
        particleType: 'poison',
      },
    ],
  },
  Paladin: {
    name: 'Paladin',
    themeColor: '#eab308',
    secondaryColor: '#f59e0b',
    accentGlow: 'rgba(234, 179, 8, 0.45)',
    bgGradient: ['#2e2105', '#1c1504', '#0c0a02'],
    assetUrl: paladinAsset,
    variants: [
      {
        styleName: 'Dawn Sovereign',
        gearTitle: 'Solar Crown & Mirror-Finished Gilded Plate',
        paletteTheme: 'Polished Gold & Sunburst Ivory',
        headgear: 'Radiant Winged Sun Tiara',
        armor: 'Lionhead Pauldrons & Crusader Tabard',
        weaponProp: 'Glowing Sunblade Crossguard',
        expression: 'Noble Righteousness',
        particleType: 'sunlight',
      },
      {
        styleName: 'Crusader of the Silver Aegis',
        gearTitle: 'Close Knight Sallet & Sacred Sun Medallion',
        paletteTheme: 'Platinum & Dawn Gold',
        headgear: 'Gleaming Barbute with Sun Cross',
        armor: 'Consecrated Full Plate Harness',
        weaponProp: 'Blessed Bastard Sword & Reliquary',
        expression: 'Unwavering Devotion',
        particleType: 'sunlight',
      },
      {
        styleName: 'Sentinel of the Golden Ray',
        gearTitle: 'Solar Ray Circlet & Lion-Embossed Gorget',
        paletteTheme: 'Warm Amber & White Silver',
        headgear: 'Golden Laurel Halo',
        armor: 'Hand-Carved Gilded Breastplate',
        weaponProp: 'Dawnforged Broadsword',
        expression: 'Heroic Composure',
        particleType: 'sunlight',
      },
    ],
  },
  Ranger: {
    name: 'Ranger',
    themeColor: '#22c55e',
    secondaryColor: '#84cc16',
    accentGlow: 'rgba(34, 197, 94, 0.45)',
    bgGradient: ['#0b230f', '#061609', '#020a04'],
    variants: [
      {
        styleName: 'Sylvan Pathfinder',
        gearTitle: 'Falconer Cowl & Hawk-Fletched Quiver',
        paletteTheme: 'Forest Green & Autumn Umber',
        headgear: 'Woodsman Hood with Hawk Feather',
        armor: 'Boiled Elk-Leather Jerkin with Leaf Buckles',
        weaponProp: 'Carved Yew Recurve Bow',
        expression: 'Keen Hawkish Stare',
        particleType: 'leaves',
      },
      {
        styleName: 'Moonwood Warden',
        gearTitle: 'Silverleaf Mantle & Camouflage Cloak',
        paletteTheme: 'Deep Moss & Pine Bark',
        headgear: 'Braided Ranger Circlet with Pine Sprig',
        armor: 'Embossed Forest Leather Cuirass',
        weaponProp: 'Composite Longbow & Broadhead Arrow',
        expression: 'Calm Alertness',
        particleType: 'leaves',
      },
      {
        styleName: 'Highland Strider',
        gearTitle: 'Wolf-Fur Shoulder Pelt & Quiver Straps',
        paletteTheme: 'Tundra Olive & Russet Leather',
        headgear: 'Weathered Scout Hood',
        armor: 'Hardened Studded Leather Vest',
        weaponProp: 'Honed Hunting Bow & Side Kukri',
        expression: 'Focused Hunter Gaze',
        particleType: 'leaves',
      },
    ],
  },
  Cleric: {
    name: 'Cleric',
    themeColor: '#f43f5e',
    secondaryColor: '#fb7185',
    accentGlow: 'rgba(244, 63, 94, 0.45)',
    bgGradient: ['#2d0a14', '#1c050c', '#0d0206'],
    variants: [
      {
        styleName: 'High Priest of Dawn',
        gearTitle: 'Silver-Embroidered Mitre & Sacred Sun Disk',
        paletteTheme: 'Sacred Rose & Celestial Silver',
        headgear: 'Silver Diadem with Radiant Cross',
        armor: 'Consecrated Ceremonial Vestments',
        weaponProp: 'Gilded Sun Flail & Prayer Beads',
        expression: 'Graceful Serenity',
        particleType: 'sacred',
      },
      {
        styleName: 'Templar Inquisitor',
        gearTitle: 'Sanctified Steel Gorget & Silver Rosary',
        paletteTheme: 'Alabaster White & Crimson Trim',
        headgear: 'Consecrated White Hood with Silver Clasp',
        armor: 'Silver-Plated Clerical Cuirass',
        weaponProp: 'Incense-Smoking Holy Censer & Mace',
        expression: 'Steadfast Faith',
        particleType: 'sacred',
      },
      {
        styleName: 'Healer of the Silver Font',
        gearTitle: 'Luminous Veil & Blessing Seals',
        paletteTheme: 'Blush Gold & Radiant Pearl',
        headgear: 'Halo of Floating Sacred Glyphs',
        armor: 'Embroidered Prayer Stole & Scapular',
        weaponProp: 'Silver Reliquary Scepter',
        expression: 'Benevolent Warmth',
        particleType: 'sacred',
      },
    ],
  },
  Bard: {
    name: 'Bard',
    themeColor: '#c084fc',
    secondaryColor: '#e879f9',
    accentGlow: 'rgba(192, 132, 252, 0.45)',
    bgGradient: ['#220d31', '#160820', '#0a030f'],
    variants: [
      {
        styleName: 'Virtuoso of the Royal Court',
        gearTitle: 'Feathered Velvet Cavalier & Pearl-Inlaid Lute',
        paletteTheme: 'Royal Violet & Wine Velvet',
        headgear: 'Wide-Brim Cavalier Hat with Peacock Plume',
        armor: 'Frilled Silk Cravat & Gold-Braid Doublet',
        weaponProp: 'Gilded 8-String Concert Lute',
        expression: 'Charming Wink & Smile',
        particleType: 'music',
      },
      {
        styleName: 'Shadow Minstrel',
        gearTitle: 'Dashing Silk Cape & Jeweled Rapier',
        paletteTheme: 'Magenta Plum & Gold Filigree',
        headgear: 'Masked Harlequin Half-Mask & Beret',
        armor: 'Tailored Embroidered Duelist Tunic',
        weaponProp: 'Filigree Rapier Hilt with Rose Pommel',
        expression: 'Playful Mystery',
        particleType: 'music',
      },
      {
        styleName: 'Skald of Ancient Legends',
        gearTitle: 'Fur-Tasseled Tabard & Carved Songhorn',
        paletteTheme: 'Deep Orchid & Amethyst',
        headgear: 'Golden Laurel Wreath over Pompadour',
        armor: 'Velvet Brocade Jerkin with Ribbon Epaulets',
        weaponProp: 'Silver Mandolin & Verse Scroll',
        expression: 'Enthralling Charisma',
        particleType: 'music',
      },
    ],
  },
  Druid: {
    name: 'Druid',
    themeColor: '#14b8a6',
    secondaryColor: '#10b981',
    accentGlow: 'rgba(20, 184, 166, 0.45)',
    bgGradient: ['#04211e', '#031412', '#010a09'],
    variants: [
      {
        styleName: 'Keeper of the Ancient Grove',
        gearTitle: 'Stag Antler Headdress & Living Ivy Vines',
        paletteTheme: 'Teal Flora & Ancient Bark',
        headgear: 'Massive Carved Antler Crown with Moss',
        armor: 'Bear-Fur Mantle & Runic Bone Torc',
        weaponProp: 'Gnarled Briar Staff with Glowing Blossoms',
        expression: 'Primal Wisdom',
        particleType: 'leaves',
      },
      {
        styleName: 'Lunar Shaman',
        gearTitle: 'Wolf-Pelt Cowl & Moonwell Talisman',
        paletteTheme: 'Jade Teal & Moonlight Silver',
        headgear: 'Silver Wolf Headdress with Moon Gem',
        armor: 'Living Bark Shoulder Armor & Vine Wraps',
        weaponProp: 'Sprouting Oak Scepter with Green Flame',
        expression: 'Spiritual Trance',
        particleType: 'leaves',
      },
      {
        styleName: 'Verdant Wildheart',
        gearTitle: 'Floral Blossom Wreath & Leaf Bracers',
        paletteTheme: 'Forest Emerald & Orchid Petals',
        headgear: 'Woven Blossom Garland & Owl Feather',
        armor: 'Braided Willow Harness & Fur Shoulders',
        weaponProp: 'Living Vine Scythe',
        expression: 'Wild Elemental Vitality',
        particleType: 'leaves',
      },
    ],
  },
  Warlock: {
    name: 'Warlock',
    themeColor: '#a855f7',
    secondaryColor: '#7e22ce',
    accentGlow: 'rgba(168, 85, 247, 0.45)',
    bgGradient: ['#1d092d', '#13051e', '#08020d'],
    variants: [
      {
        styleName: 'Nether Rift Summoner',
        gearTitle: 'Curved Demon Horns & Nether-Weave Cowl',
        paletteTheme: 'Abyssal Violet & Nether Flame',
        headgear: 'Obsidian Horned Diadem with Glowing Eye',
        armor: 'Spiked Nether Robes with Creeping Runes',
        weaponProp: 'Floating All-Seeing Occult Eye Orb',
        expression: 'Menacing Eldritch Glare',
        particleType: 'souls',
      },
      {
        styleName: 'Pactbound Soulbinder',
        gearTitle: 'Void-Forged Skull Mask & Spectral Chains',
        paletteTheme: 'Eerie Amethyst & Soulfire Green',
        headgear: 'Deep Shadow Cowl with Horn Plumes',
        armor: 'Chain-Draped Obsidian Pauldrons',
        weaponProp: 'Tethered Soul Lantern with Ghost Fire',
        expression: 'Chilling Smile',
        particleType: 'souls',
      },
      {
        styleName: 'Diabolist of the Black Sun',
        gearTitle: 'Crown of Torment & Bloodstone Collar',
        paletteTheme: 'Midnight Purple & Necrotic Lilac',
        headgear: 'Floating Void Halo of Broken Spikes',
        armor: 'Runed Dark Silk Mantle with Soul Gems',
        weaponProp: 'Bound Eldritch Grimoire on Iron Chain',
        expression: 'Intoxicated by Power',
        particleType: 'souls',
      },
    ],
  },
  Monk: {
    name: 'Monk',
    themeColor: '#f97316',
    secondaryColor: '#eab308',
    accentGlow: 'rgba(249, 115, 22, 0.45)',
    bgGradient: ['#2c1205', '#1a0a03', '#0d0401'],
    variants: [
      {
        styleName: 'Grandmaster of the Lotus',
        gearTitle: 'Saffron Silk Gi & Giant Wood Prayer Beads',
        paletteTheme: 'Sunset Amber & Monastery Saffron',
        headgear: 'Red Meditation Forehead Wrap',
        armor: 'Asymmetrical Martial Wrap & Wrist Tape',
        weaponProp: 'Polished Iron-Banded Bo Staff',
        expression: 'Deep Zen Serenity',
        particleType: 'petals',
      },
      {
        styleName: 'Storm Fist Ascetic',
        gearTitle: 'Bamboo Straw Kasa & Taped Spiked Cuffs',
        paletteTheme: 'Tiger Ochre & Ember Crimson',
        headgear: 'Wide Bamboo Ronin Straw Hat',
        armor: 'Dragon-Embroidered Sleeveless Tunic',
        weaponProp: 'Twin Weighted Nunchaku & Brass Knuckles',
        expression: 'Intense Martial Focus',
        particleType: 'petals',
      },
      {
        styleName: 'Disciple of the Iron Crane',
        gearTitle: 'Monastery Ordination Markings & Chi Talisman',
        paletteTheme: 'Warm Terracotta & Sun Gold',
        headgear: 'Topknot with Jade Pin & Ordination Dots',
        armor: 'Tight Taped Chest Wraps & Bead Bracers',
        weaponProp: 'Spinning Dragon Spear',
        expression: 'Focused Inner Chi',
        particleType: 'petals',
      },
    ],
  },
};

export function generateCharacterPortrait(
  className: CharacterClassType,
  currentVariant?: number
): CharacterPortraitData {
  const profile = CLASS_VISUAL_PROFILES[className] || CLASS_VISUAL_PROFILES.Warrior;
  const totalVariants = profile.variants.length;

  let nextVariant: number;
  if (currentVariant === undefined) {
    nextVariant = Math.floor(Math.random() * totalVariants);
  } else {
    // Pick a different variant on regenerate
    nextVariant = (currentVariant + 1) % totalVariants;
  }

  const chosenVariant = profile.variants[nextVariant];

  return {
    variant: nextVariant,
    styleName: chosenVariant.styleName,
    gearTitle: chosenVariant.gearTitle,
    paletteTheme: chosenVariant.paletteTheme,
    renderedUrl: profile.assetUrl,
    seed: Math.floor(Math.random() * 1000000),
    generatedAt: Date.now(),
  };
}
