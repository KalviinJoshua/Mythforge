import { FantasyCharacter } from '../types';

const CLASS_ORIGIN_TEMPLATES: Record<string, Array<(c: FantasyCharacter) => string>> = {
  Warrior: [
    (c) =>
      `Forged in the bloodied snows of ${c.origin}, ${c.name} survived a cataclysmic siege by cleaving an enemy warlord in half with their ${c.primaryWeapon}. Bound by a sacred martial oath, they now traverse the realms as "${c.title}", an unyielding shield against the creeping dark.`,
    (c) =>
      `After an ancient dragon scorched their ancestral halls in ${c.origin}, ${c.name} salvaged their ${c.primaryWeapon} from the smoldering ash and swore vengeance. Known throughout the fractured lands as "${c.title}", their blade thirsts for justice and eternal renown.`,
    (c) =>
      `Raised among the gladiatorial pits of ${c.origin}, ${c.name} shattered their chains with a single strike of their ${c.primaryWeapon}. Now celebrated as "${c.title}", they rally broken kingdoms against ruthless tyrants.`,
  ],
  Mage: [
    (c) =>
      `While deciphering forbidden astral scriptures within ${c.origin}, ${c.name} accidentally awakened an elder star and attuned it to their ${c.primaryWeapon}. Hailed as "${c.title}", they wander the mortal plane unraveling chronal rifts before reality unravels.`,
    (c) =>
      `Cast out of ${c.origin} for channeling a supernova spell that shattered the academy's spire, ${c.name} embraced the wandering arcane life with only their ${c.primaryWeapon}. As "${c.title}", their incantations illuminate the deepest abyssal corridors.`,
    (c) =>
      `Born during a rare harmonic eclipse over ${c.origin}, ${c.name} absorbed primordial mana that now crackles through their ${c.primaryWeapon}. Revering the mysteries of the cosmos as "${c.title}", their spells can mend both shattered minds and ruined kingdoms.`,
  ],
  Rogue: [
    (c) =>
      `A phantom whisper in the labyrinthine alleys of ${c.origin}, ${c.name} pulled off the fabled heist of the Sunless Vault using only their ${c.primaryWeapon}. Now revered as "${c.title}", no locked sanctuary or corrupt monarch can sleep peacefully while they walk the night.`,
    (c) =>
      `Betrayed by their own guild in the misty underbelly of ${c.origin}, ${c.name} vanished into the midnight fog armed with their venomous ${c.primaryWeapon}. Feared as "${c.title}", they eliminate targets with ghostlike grace before disappearing without a footprint.`,
    (c) =>
      `Rescued as a foundling from the rooftops of ${c.origin}, ${c.name} mastered the deadly arts of stealth and silence with their trusted ${c.primaryWeapon}. Known in taverns and royal courts alike as "${c.title}", their loyalty belongs only to the shadows.`,
  ],
  Paladin: [
    (c) =>
      `Touched by the golden beam of a dying seraph in ${c.origin}, ${c.name} consecrated their ${c.primaryWeapon} with celestial fire. Revered by pilgrims as "${c.title}", they march unflinchingly into demon-infested wastes to deliver divine retribution.`,
    (c) =>
      `When dark legions broke the outer gates of ${c.origin}, ${c.name} stood alone on the bridge for three days with their gleaming ${c.primaryWeapon}. Anointed as "${c.title}", their radiant aura banishes fear from the hearts of all who fight beside them.`,
    (c) =>
      `Heir to a fallen solar dynasty from ${c.origin}, ${c.name} took up their ancestor's blessed ${c.primaryWeapon} to restore honor to their lineage. As "${c.title}", their sword strikes like morning thunder against foul heresy.`,
  ],
  Ranger: [
    (c) =>
      `Raised by dire wolves in the untamed canopy of ${c.origin}, ${c.name} learned to loose their ${c.primaryWeapon} with pinpoint lethality in pitch darkness. Walking the wild frontiers as "${c.title}", they protect the sacred ancient groves from civilization's greed.`,
    (c) =>
      `After poachers desecrated the Great Heart-Tree of ${c.origin}, ${c.name} hunted the culprit guild across three continents with their ${c.primaryWeapon}. Known as "${c.title}", their arrows never stray from their mark.`,
    (c) =>
      `A seasoned scout who survived the frozen passes of ${c.origin}, ${c.name} navigates uncharted perils guided by their ${c.primaryWeapon} and animal instincts. Renowned as "${c.title}", they serve as the realm's eyes where mapmakers fear to tread.`,
  ],
  Cleric: [
    (c) =>
      `Hearing the sorrowful hymn of the Silver Font at ${c.origin}, ${c.name} channeled holy miracles through their sanctified ${c.primaryWeapon} to halt a virulent plague. Reaping devotion as "${c.title}", their touch closes mortal wounds and shatters undead curses.`,
    (c) =>
      `In the war-torn catacombs of ${c.origin}, ${c.name} raised their glowing ${c.primaryWeapon} to defend an altar of starving orphans against a vampire horde. Now venerated as "${c.title}", they carry sacred embers to cleanse darkened lands.`,
    (c) =>
      `A highborn initiate from ${c.origin} who renounced courtly decadence, ${c.name} dedicated their life and ${c.primaryWeapon} to the service of the suffering. Anointed as "${c.title}", their prayer chants bring solace to the dying and dread to the wicked.`,
  ],
  Bard: [
    (c) =>
      `Exiled from the grand court of ${c.origin} after composing a satire that triggered an emperor's abdication, ${c.name} armed themselves with wit and their gilded ${c.primaryWeapon}. As "${c.title}", their enchanting melodies can inspire an army to victory or bewitch an enemy into slumber.`,
    (c) =>
      `Having stolen ancient sheet music from the Siren Caves near ${c.origin}, ${c.name} weaves sonic enchantments through their ${c.primaryWeapon}. Revered across taverns and palaces as "${c.title}", their presence turns every battlefield into a legendary ballad.`,
    (c) =>
      `Trained in both high espionage and royal opera in ${c.origin}, ${c.name} strikes harmonious chords with their ${c.primaryWeapon} while unraveling political conspiracies. Celebrated as "${c.title}", their charm is as sharp as any assassin's steel.`,
  ],
  Druid: [
    (c) =>
      `Communing with primordial roots beneath the ancient stones of ${c.origin}, ${c.name} bound their life-force to the land through their living ${c.primaryWeapon}. Feared and revered as "${c.title}", they summon torrential storms and wild beasts to crush those who poison the earth.`,
    (c) =>
      `Awakened from a century-long slumber when corrupted blight seeped into ${c.origin}, ${c.name} took up their briar-grown ${c.primaryWeapon} to restore the world's natural balance. Standing tall as "${c.title}", their skin is as tough as ironbark.`,
    (c) =>
      `A shapeshifting hermit from the moss-cloaked hollows of ${c.origin}, ${c.name} channels the spirits of the wild through their carved ${c.primaryWeapon}. Known as "${c.title}", their fierce growl can scatter even the bravest war-bands.`,
  ],
  Warlock: [
    (c) =>
      `Desperate to avenge their slaughtered bloodline in ${c.origin}, ${c.name} struck a terrifying pact with an elder void-entity and sealed it into their ${c.primaryWeapon}. Whispered of in dread as "${c.title}", they harvest the souls of their foes to fuel otherworldly hexes.`,
    (c) =>
      `Having unearthed an obsidian skull beneath the sunken ruins of ${c.origin}, ${c.name} bound abyssal specters to their ${c.primaryWeapon}. Feared throughout the empires as "${c.title}", their eldritch gaze bends minds to madness.`,
    (c) =>
      `Cast into a nether-rift during an alchemical mishap in ${c.origin}, ${c.name} fought their way back into the mortal world wielding a soul-burning ${c.primaryWeapon}. Infamous as "${c.title}", they command hellish flames that consume all resistance.`,
  ],
  Monk: [
    (c) =>
      `Trained beneath the freezing waterfalls of ${c.origin}, ${c.name} perfected the art of channelled chi through thousands of katas with their ${c.primaryWeapon}. Revered by disciples as "${c.title}", their lightning-fast strikes can shatter granite and deflect incoming volleys.`,
    (c) =>
      `The sole survivor of a mountain monastery raid in ${c.origin}, ${c.name} tempered grief into iron discipline alongside their ${c.primaryWeapon}. Celebrated as "${c.title}", their peaceful demeanor conceals a storm of devastating martial mastery.`,
    (c) =>
      `Guided by ancestral spirits to the sacred summits of ${c.origin}, ${c.name} opened the eight gates of inner spiritual energy with their ${c.primaryWeapon}. As "${c.title}", they glide through warfare untouched, disarming aggressors with effortless precision.`,
  ],
};

export function generateCharacterBackstory(character: FantasyCharacter): string {
  const templates = CLASS_ORIGIN_TEMPLATES[character.className] || CLASS_ORIGIN_TEMPLATES.Warrior;
  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex](character);
}
