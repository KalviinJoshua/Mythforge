import { FantasyCharacter, CharacterClassType, LevelUpResult, StatGains } from '../types';

export const MAX_LEVEL = 10;

/**
 * Cumulative XP required to reach each level (index = level).
 * Level 1 starts at 0 XP.
 */
export const LEVEL_XP_THRESHOLDS: number[] = [
  0,     // Level 0 (unused)
  0,     // Level 1: 0 XP
  100,   // Level 2: 100 XP
  250,   // Level 3: 250 XP
  450,   // Level 4: 450 XP
  700,   // Level 5: 700 XP
  1020,  // Level 6: 1,020 XP
  1400,  // Level 7: 1,400 XP
  1850,  // Level 8: 1,850 XP
  2380,  // Level 9: 2,380 XP
  3000,  // Level 10: 3,000 XP (Max Level)
];

/**
 * Calculates standard tabletop proficiency bonus based on character level.
 * Level 1-4: +2
 * Level 5-8: +3
 * Level 9-10: +4
 */
export function getProficiencyBonus(level: number): number {
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
}

/**
 * Returns the cumulative XP required to reach a specific level.
 */
export function getXpForLevel(level: number): number {
  const safeLevel = Math.max(1, Math.min(MAX_LEVEL, level));
  return LEVEL_XP_THRESHOLDS[safeLevel];
}

/**
 * Returns the cumulative XP required for the NEXT level.
 * Returns the max level XP if already at or above max level.
 */
export function getXpForNextLevel(level: number): number {
  if (level >= MAX_LEVEL) {
    return LEVEL_XP_THRESHOLDS[MAX_LEVEL];
  }
  return LEVEL_XP_THRESHOLDS[level + 1];
}

/**
 * Returns progress data for display in XP bars.
 */
export function getXpProgress(level: number, xp: number): {
  currentLevelXp: number;
  neededForNext: number;
  currentProgressInLevel: number;
  totalForThisLevel: number;
  percent: number;
  isMaxLevel: boolean;
} {
  const safeLevel = Math.max(1, Math.min(MAX_LEVEL, level));
  const isMaxLevel = safeLevel >= MAX_LEVEL;

  if (isMaxLevel) {
    return {
      currentLevelXp: xp,
      neededForNext: 0,
      currentProgressInLevel: 100,
      totalForThisLevel: 100,
      percent: 100,
      isMaxLevel: true,
    };
  }

  const floorXp = LEVEL_XP_THRESHOLDS[safeLevel];
  const ceilXp = LEVEL_XP_THRESHOLDS[safeLevel + 1];
  const totalForThisLevel = Math.max(1, ceilXp - floorXp);
  const currentProgressInLevel = Math.max(0, Math.min(totalForThisLevel, xp - floorXp));
  const neededForNext = Math.max(0, ceilXp - xp);
  const percent = Math.min(100, Math.round((currentProgressInLevel / totalForThisLevel) * 100));

  return {
    currentLevelXp: xp,
    neededForNext,
    currentProgressInLevel,
    totalForThisLevel,
    percent,
    isMaxLevel: false,
  };
}

/**
 * Determines level based purely on total accumulated XP.
 */
export function calculateLevelFromXp(xp: number): number {
  let lvl = 1;
  for (let i = 1; i <= MAX_LEVEL; i++) {
    if (xp >= LEVEL_XP_THRESHOLDS[i]) {
      lvl = i;
    } else {
      break;
    }
  }
  return lvl;
}

/**
 * Class-tailored deterministic stat gains per level-up.
 */
export function getClassLevelStatGrowth(className: CharacterClassType): StatGains {
  switch (className) {
    case 'Warrior':
      return { health: 38, mana: 8, strength: 4, intelligence: 1, agility: 2, charisma: 1 };
    case 'Paladin':
      return { health: 32, mana: 22, strength: 3, intelligence: 1, agility: 1, charisma: 3 };
    case 'Mage':
      return { health: 18, mana: 52, strength: 1, intelligence: 4, agility: 2, charisma: 2 };
    case 'Warlock':
      return { health: 22, mana: 48, strength: 1, intelligence: 3, agility: 2, charisma: 4 };
    case 'Rogue':
      return { health: 24, mana: 16, strength: 2, intelligence: 2, agility: 4, charisma: 2 };
    case 'Ranger':
      return { health: 26, mana: 18, strength: 3, intelligence: 2, agility: 4, charisma: 1 };
    case 'Cleric':
      return { health: 28, mana: 38, strength: 2, intelligence: 3, agility: 1, charisma: 3 };
    case 'Druid':
      return { health: 28, mana: 36, strength: 2, intelligence: 3, agility: 2, charisma: 2 };
    case 'Bard':
      return { health: 22, mana: 34, strength: 1, intelligence: 3, agility: 2, charisma: 4 };
    case 'Monk':
      return { health: 30, mana: 20, strength: 3, intelligence: 2, agility: 4, charisma: 1 };
    default:
      return { health: 25, mana: 25, strength: 2, intelligence: 2, agility: 2, charisma: 2 };
  }
}

/**
 * Migrates and sanitizes any character object to ensure level progression fields exist.
 * Safe for legacy localStorage data without overwriting existing traits or stats.
 */
export function ensureCharacterLevelData(character: FantasyCharacter): FantasyCharacter {
  const level = typeof character.level === 'number' && character.level >= 1 ? character.level : 1;
  const xp = typeof character.xp === 'number' && character.xp >= 0 ? character.xp : 0;
  const proficiencyBonus = typeof character.proficiencyBonus === 'number' 
    ? character.proficiencyBonus 
    : getProficiencyBonus(level);

  return {
    ...character,
    level,
    xp,
    proficiencyBonus,
  };
}

/**
 * Deterministically applies experience points to a character,
 * checks for level-up transitions, and applies class stat growths.
 */
export function addExperience(
  character: FantasyCharacter, 
  xpGained: number
): { updatedCharacter: FantasyCharacter; result: LevelUpResult } {
  const safeChar = ensureCharacterLevelData(character);
  const previousLevel = safeChar.level || 1;
  const newTotalXp = (safeChar.xp || 0) + Math.max(0, xpGained);

  const calculatedLevel = calculateLevelFromXp(newTotalXp);
  const newLevel = Math.min(MAX_LEVEL, Math.max(previousLevel, calculatedLevel));
  const levelsGained = newLevel - previousLevel;
  const leveledUp = levelsGained > 0;

  const totalStatGains: StatGains = {
    health: 0,
    mana: 0,
    strength: 0,
    intelligence: 0,
    agility: 0,
    charisma: 0,
  };

  if (leveledUp) {
    const singleLevelGrowth = getClassLevelStatGrowth(safeChar.className);
    totalStatGains.health = singleLevelGrowth.health * levelsGained;
    totalStatGains.mana = singleLevelGrowth.mana * levelsGained;
    totalStatGains.strength = singleLevelGrowth.strength * levelsGained;
    totalStatGains.intelligence = singleLevelGrowth.intelligence * levelsGained;
    totalStatGains.agility = singleLevelGrowth.agility * levelsGained;
    totalStatGains.charisma = singleLevelGrowth.charisma * levelsGained;
  }

  const updatedStats = {
    ...safeChar.stats,
    health: safeChar.stats.health + totalStatGains.health,
    mana: safeChar.stats.mana + totalStatGains.mana,
    strength: safeChar.stats.strength + totalStatGains.strength,
    intelligence: safeChar.stats.intelligence + totalStatGains.intelligence,
    agility: safeChar.stats.agility + totalStatGains.agility,
    charisma: safeChar.stats.charisma + totalStatGains.charisma,
  };

  const newProficiencyBonus = getProficiencyBonus(newLevel);

  const updatedCharacter: FantasyCharacter = {
    ...safeChar,
    level: newLevel,
    xp: newTotalXp,
    proficiencyBonus: newProficiencyBonus,
    stats: updatedStats,
  };

  const result: LevelUpResult = {
    leveledUp,
    previousLevel,
    newLevel,
    levelsGained,
    xpGained,
    statGains: totalStatGains,
    newProficiencyBonus,
  };

  return { updatedCharacter, result };
}
