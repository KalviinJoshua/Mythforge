import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FantasyCharacter, 
  InventoryItem, 
  GeneratedMonster, 
  MonsterArchetype, 
  MonsterDifficulty, 
  MonsterAttack, 
  MonsterAbility, 
  CardRarity 
} from '../types';
import { CharacterIcon } from './CharacterIcon';
import { generateLootReward } from '../utils/lootGenerator';
import { rollD20, rollDice, playDiceAudio } from '../utils/dice';
import { 
  generateProceduralMonster, 
  recordMonsterEncounter, 
  recordMonsterDefeat 
} from '../utils/monsterGenerator';
import { MonsterStatBlockModal } from './MonsterStatBlockModal';
import { 
  X, 
  Swords, 
  ShieldAlert, 
  Sparkles, 
  Trophy, 
  Skull, 
  Heart, 
  Zap, 
  Flame,
  RotateCcw,
  Eye,
  Shield,
  Footprints,
  Compass,
  AlertCircle
} from 'lucide-react';

interface ArenaDuelModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerCharacter?: FantasyCharacter | null;
  character?: FantasyCharacter | null;
  deck?: FantasyCharacter[];
  soundEnabled?: boolean;
  onVictory?: (bossName: string, xpReward: number, goldReward?: number, lootItem?: InventoryItem) => void;
}

interface Combatant {
  name: string;
  className: string;
  maxHp: number;
  currentHp: number;
  maxMana: number;
  currentMana: number;
  strength: number;
  intelligence: number;
  agility: number;
  iconName: string;
  xpReward?: number;
  goldReward?: number;
  level?: number;
  proficiencyBonus?: number;
  // Feature 5 Monster attributes
  isProcedural?: boolean;
  archetype?: MonsterArchetype;
  difficulty?: MonsterDifficulty;
  challengeRating?: string;
  armorClass?: number;
  initiative?: number;
  attacks?: MonsterAttack[];
  specialAbility?: MonsterAbility;
  weakness?: string;
  resistance?: string;
  description?: string;
  lootTier?: CardRarity;
  rawMonster?: GeneratedMonster;
}

const DUNGEON_BOSSES: Combatant[] = [
  {
    name: 'Malakor the Nether Lich',
    className: 'Warlock Boss',
    maxHp: 460,
    currentHp: 460,
    maxMana: 500,
    currentMana: 500,
    strength: 35,
    intelligence: 88,
    agility: 42,
    iconName: 'Skull',
    xpReward: 95,
    goldReward: 95,
    level: 6,
    proficiencyBonus: 3,
    armorClass: 14,
    initiative: 1,
    weakness: 'Radiant Holy Light & Fire',
    resistance: 'Necrotic & Cold Decay',
    description: 'An ancient dread sorcerer bound by eternal undeath, weaving abyssal hexes.',
    attacks: [
      { name: 'Soul Siphon', type: 'spell', damageDice: '2d8 + 5', damageBonus: 5, description: 'Drains lifeforce from the challenger.' },
      { name: 'Nether Staff Strike', type: 'melee', damageDice: '1d8 + 2', damageBonus: 2, description: 'A blunt blow with petrified ebony wood.' },
    ],
    specialAbility: {
      name: 'Nether Barrier',
      description: 'Absorbs arcane shockwaves with necrotic wards.',
      effectType: 'buff',
    },
  },
  {
    name: 'Gorgaroth the Ashen Colossus',
    className: 'Warrior Boss',
    maxHp: 580,
    currentHp: 580,
    maxMana: 90,
    currentMana: 90,
    strength: 92,
    intelligence: 20,
    agility: 30,
    iconName: 'Swords',
    xpReward: 125,
    goldReward: 120,
    level: 7,
    proficiencyBonus: 3,
    armorClass: 16,
    initiative: 0,
    weakness: 'Agile Flank Attacks & Lightning',
    resistance: 'Blunt Force & Fire',
    description: 'A monolithic juggernaut covered in molten slate armor, wielding volcanic iron.',
    attacks: [
      { name: 'Colossal Slam', type: 'melee', damageDice: '2d10 + 6', damageBonus: 6, description: 'Crushes shields with seismic impact.' },
      { name: 'Molten Backhand', type: 'melee', damageDice: '1d12 + 5', damageBonus: 5, description: 'Sweeps across the arena floor.' },
    ],
    specialAbility: {
      name: 'Ashen Fortitude',
      description: 'Subcutaneous magma turns aside edged weapons.',
      effectType: 'buff',
    },
  },
  {
    name: 'Vespera the Shadow Assassin',
    className: 'Rogue Boss',
    maxHp: 380,
    currentHp: 380,
    maxMana: 260,
    currentMana: 260,
    strength: 65,
    intelligence: 55,
    agility: 95,
    iconName: 'Sparkles',
    xpReward: 85,
    goldReward: 85,
    level: 5,
    proficiencyBonus: 3,
    armorClass: 15,
    initiative: 4,
    weakness: 'Area Concussive Blast & Radiant Flare',
    resistance: 'Poison & Shadow Illusions',
    description: 'A lethal shadowblade who steps between twilight dimensions to assassinate.',
    attacks: [
      { name: 'Twin Shadow Blades', type: 'melee', damageDice: '2d6 + 5', damageBonus: 5, description: 'Rapid dual stabs targeting vital organs.' },
      { name: 'Venom Dart Flurry', type: 'ranged', damageDice: '1d8 + 4', damageBonus: 4, description: 'Throws poisoned obsidian darts.' },
    ],
    specialAbility: {
      name: 'Shadowstep Evasion',
      description: 'Vanishes into gloom to evade incoming strikes.',
      effectType: 'buff',
    },
  },
];

export const ArenaDuelModal: React.FC<ArenaDuelModalProps> = ({
  isOpen,
  onClose,
  playerCharacter: propPlayerCharacter,
  character,
  deck = [],
  soundEnabled = true,
  onVictory,
}) => {
  const playerCharacter = character || propPlayerCharacter;
  const [player, setPlayer] = useState<Combatant | null>(null);
  const [enemy, setEnemy] = useState<Combatant | null>(null);
  const [battleLog, setBattleLog] = useState<Array<{ text: string; type: 'player' | 'enemy' | 'system' }>>([]);
  const [isActing, setIsActing] = useState(false);
  const [winner, setWinner] = useState<'player' | 'enemy' | null>(null);
  const [wonLoot, setWonLoot] = useState<InventoryItem | null>(null);
  const [isInspectOpen, setIsInspectOpen] = useState(false);

  const initPlayerCombatant = (): Combatant | null => {
    if (!playerCharacter) return null;
    return {
      name: playerCharacter.name,
      className: playerCharacter.className,
      maxHp: playerCharacter.stats.health,
      currentHp: playerCharacter.stats.health,
      maxMana: playerCharacter.stats.mana,
      currentMana: playerCharacter.stats.mana,
      strength: playerCharacter.stats.strength,
      intelligence: playerCharacter.stats.intelligence,
      agility: playerCharacter.stats.agility,
      iconName: playerCharacter.iconName,
      level: playerCharacter.level || 1,
      proficiencyBonus: playerCharacter.proficiencyBonus || 2,
    };
  };

  const resetDuel = (chosenBoss?: Combatant) => {
    if (!playerCharacter) return;
    setWonLoot(null);
    setPlayer(initPlayerCombatant());

    const rival = chosenBoss || DUNGEON_BOSSES[Math.floor(Math.random() * DUNGEON_BOSSES.length)];
    setEnemy({ ...rival, currentHp: rival.maxHp, currentMana: rival.maxMana });
    setWinner(null);
    setBattleLog([
      { text: `⚔️ The arena gates crash open! ${playerCharacter.name} (Level ${playerCharacter.level || 1}) steps into the crucible against ${rival.name}!`, type: 'system' }
    ]);
  };

  const summonProceduralMonster = (archetype?: MonsterArchetype, difficulty?: MonsterDifficulty) => {
    if (!playerCharacter) return;
    setWonLoot(null);
    setPlayer(initPlayerCombatant());
    setWinner(null);
    
    const heroLevel = playerCharacter.level || 1;
    const monster = generateProceduralMonster({ heroLevel, archetype, difficulty });
    
    // Record encounter in bestiary
    recordMonsterEncounter(monster);

    const newEnemy: Combatant = {
      name: monster.name,
      className: `${monster.difficulty} ${monster.archetype}`,
      maxHp: monster.maxHp,
      currentHp: monster.maxHp,
      maxMana: monster.maxMana,
      currentMana: monster.maxMana,
      strength: monster.strength,
      intelligence: monster.intelligence,
      agility: monster.agility,
      iconName: monster.iconName,
      xpReward: monster.xpReward,
      goldReward: monster.goldReward,
      level: monster.level,
      proficiencyBonus: monster.proficiencyBonus,
      isProcedural: true,
      archetype: monster.archetype,
      difficulty: monster.difficulty,
      challengeRating: monster.challengeRating,
      armorClass: monster.armorClass,
      initiative: monster.initiative,
      attacks: monster.attacks,
      specialAbility: monster.specialAbility,
      weakness: monster.weakness,
      resistance: monster.resistance,
      description: monster.description,
      lootTier: monster.lootTier,
      rawMonster: monster,
    };

    setEnemy(newEnemy);
    setBattleLog([
      { text: `⚔️ The arena gates crash open! ${playerCharacter.name} (Level ${heroLevel}) challenges ${monster.name}!`, type: 'system' },
      { text: `📜 Scout Report: [${monster.challengeRating} ${monster.difficulty} ${monster.archetype}] • HP: ${monster.maxHp} | AC: ${monster.armorClass} | Weakness: ${monster.weakness}`, type: 'system' },
    ]);
  };

  useEffect(() => {
    if (isOpen && playerCharacter) {
      resetDuel();
    }
  }, [isOpen, playerCharacter]);

  // Construct a GeneratedMonster object for inspecting classic bosses
  const getMonsterForStatBlock = (comb: Combatant): GeneratedMonster => {
    if (comb.rawMonster) return comb.rawMonster;
    return {
      id: `boss-${comb.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: comb.name,
      archetype: (comb.archetype || (comb.name.includes('Lich') ? 'Demon' : comb.name.includes('Colossus') ? 'Ogre' : 'Vampire')) as MonsterArchetype,
      difficulty: comb.difficulty || 'Boss',
      level: comb.level || 6,
      challengeRating: comb.challengeRating || 'CR 7',
      maxHp: comb.maxHp,
      currentHp: comb.currentHp,
      maxMana: comb.maxMana,
      currentMana: comb.currentMana,
      armorClass: comb.armorClass || 15,
      initiative: comb.initiative || 2,
      strength: comb.strength,
      intelligence: comb.intelligence,
      agility: comb.agility,
      proficiencyBonus: comb.proficiencyBonus || 3,
      attacks: comb.attacks || [
        {
          name: 'Crucible Strike',
          type: 'melee',
          damageDice: '2d8 + 4',
          damageBonus: 4,
          description: 'A crushing blow echoing through ancient crypt halls.',
        },
      ],
      specialAbility: comb.specialAbility || {
        name: 'Crucible Tyranny',
        description: 'Reigning arena tyrant channeling primordial battle lust.',
        effectType: 'buff',
      },
      weakness: comb.weakness || 'Radiant Dawn & Heavy Impact',
      resistance: comb.resistance || 'Necrotic & Non-magical Blades',
      description: comb.description || 'One of the legendary reigning tyrants of the Grand Crucible Arena.',
      lootTier: 'Legendary',
      xpReward: comb.xpReward || 110,
      goldReward: comb.goldReward || (Math.floor((comb.xpReward || 110) * 0.75) + 25),
      iconName: comb.iconName,
    };
  };

  const handleVictoryCelebration = (defeatedEnemy: Combatant) => {
    setWinner('player');
    const earnedXp = defeatedEnemy.xpReward || 100;
    const earnedGold = defeatedEnemy.goldReward || (Math.floor(earnedXp * 0.75) + 25);
    const bossBonus = (earnedXp >= 120 || defeatedEnemy.difficulty === 'Boss' || defeatedEnemy.difficulty === 'Apex') ? 2 : 1;
    const loot = generateLootReward(player?.level || 1, bossBonus);
    setWonLoot(loot);

    // If procedural monster, record defeat in Bestiary
    if (defeatedEnemy.isProcedural && defeatedEnemy.archetype) {
      recordMonsterDefeat(defeatedEnemy.archetype);
    }

    setBattleLog((prev) => [
      ...prev, 
      { text: `🏆 VICTORY! ${defeatedEnemy.name} was defeated in glorious battle!`, type: 'system' },
      { text: `✨ Gained +${earnedXp} Experience Points and looted ${earnedGold} Gold Pieces!`, type: 'system' },
      { text: `🎁 Discovered spoils: [${loot.rarity}] ${loot.name}!`, type: 'system' }
    ]);

    if (onVictory) {
      onVictory(defeatedEnemy.name, earnedXp, earnedGold, loot);
    }
    setIsActing(false);
  };

  const enemyTurn = (updatedPlayerHp: number, updatedEnemy: Combatant) => {
    if (updatedPlayerHp <= 0) {
      setWinner('enemy');
      setBattleLog((prev) => [...prev, { text: `☠️ ${updatedEnemy.name} dealt a fatal blow! You have fallen in combat!`, type: 'enemy' }]);
      setIsActing(false);
      return;
    }

    setTimeout(() => {
      const enemyPb = updatedEnemy.proficiencyBonus || 2;
      const enemyRoll = rollD20(enemyPb, 'normal', `${updatedEnemy.name} Attack`);
      const d20 = enemyRoll.total;
      const isCrit = enemyRoll.isCriticalSuccess;
      const isFumble = enemyRoll.isCriticalFailure;
      let enemyDmg = 0;
      let actionText = '';

      // Check for Special Ability trigger if procedural monster
      if (updatedEnemy.isProcedural && updatedEnemy.specialAbility) {
        if (updatedEnemy.specialAbility.effectType === 'heal' && updatedEnemy.currentHp < updatedEnemy.maxHp * 0.45 && Math.random() > 0.4) {
          const healAmount = Math.round(updatedEnemy.maxHp * 0.18);
          const nextEnemyHp = Math.min(updatedEnemy.maxHp, updatedEnemy.currentHp + healAmount);
          updatedEnemy.currentHp = nextEnemyHp;
          actionText = `💚 ${updatedEnemy.name} activates ${updatedEnemy.specialAbility.name}! Recovered +${healAmount} HP!`;
        }
      }

      if (!actionText) {
        if (updatedEnemy.isProcedural && updatedEnemy.attacks && updatedEnemy.attacks.length > 0) {
          // Select attack
          const selectedAttack = updatedEnemy.attacks[Math.floor(Math.random() * updatedEnemy.attacks.length)];
          const baseDmg = selectedAttack.damageBonus + Math.floor((d20 % 8) + 4);
          
          if (isCrit) {
            enemyDmg = Math.round(baseDmg * 1.75);
            actionText = `💥 CRITICAL STRIKE! ${updatedEnemy.name} uses ${selectedAttack.name} (Natural 20! ${enemyRoll.formula}) dealing ${enemyDmg} devastating damage!`;
          } else if (isFumble) {
            enemyDmg = Math.max(3, Math.round(baseDmg * 0.4));
            actionText = `⚠️ FUMBLE! ${updatedEnemy.name} slips while using ${selectedAttack.name} (Natural 1! ${enemyRoll.formula}) grazing for ${enemyDmg} damage!`;
          } else {
            enemyDmg = baseDmg;
            actionText = `⚔️ ${updatedEnemy.name} attacks with ${selectedAttack.name} (${enemyRoll.formula}) dealing ${enemyDmg} damage!`;
          }

          // Vampire lifedrain ability
          if (updatedEnemy.specialAbility?.effectType === 'drain') {
            const leech = Math.round(enemyDmg * 0.35);
            updatedEnemy.currentHp = Math.min(updatedEnemy.maxHp, updatedEnemy.currentHp + leech);
            actionText += ` (Leeched +${leech} HP!)`;
          }
        } else if (updatedEnemy.currentMana >= 60 && Math.random() > 0.4) {
          // Classic boss spell
          enemyDmg = Math.floor(updatedEnemy.intelligence * 0.75 + d20 * 1.5);
          updatedEnemy.currentMana -= 60;
          actionText = `🔥 ${updatedEnemy.name} chants a dark spell (${enemyRoll.formula}) dealing ${enemyDmg} magic damage!`;
        } else {
          // Classic boss physical attack
          enemyDmg = Math.floor(updatedEnemy.strength * 0.65 + d20 * 1.2);
          actionText = `🗡️ ${updatedEnemy.name} strikes with brutal force (${enemyRoll.formula}) dealing ${enemyDmg} physical damage!`;
        }
      }

      const nextPlayerHp = Math.max(0, updatedPlayerHp - enemyDmg);
      setPlayer((prev) => (prev ? { ...prev, currentHp: nextPlayerHp } : null));
      setEnemy({ ...updatedEnemy });
      setBattleLog((prev) => [...prev, { text: actionText, type: 'enemy' }]);

      if (nextPlayerHp <= 0) {
        setWinner('enemy');
        setBattleLog((prev) => [...prev, { text: `☠️ Your warrior has perished! The arena belongs to ${updatedEnemy.name}.`, type: 'system' }]);
      }

      setIsActing(false);
    }, 600);
  };

  const handleMeleeAttack = () => {
    if (!player || !enemy || isActing || winner) return;
    setIsActing(true);

    const pb = player.proficiencyBonus || 2;
    const attackRoll = rollDice({
      die: 'd20',
      count: 1,
      modifier: pb,
      mode: 'normal',
      label: `${player.name} Melee Strike`,
    });

    const d20 = attackRoll.rolls[0].value;
    const isCrit = attackRoll.isCriticalSuccess;
    const isFumble = attackRoll.isCriticalFailure;

    // Web Audio dice clatter & flourish
    playDiceAudio({ soundEnabled, isCrit, isFumble });

    const enemyAc = enemy.armorClass || 13;
    const hitSuccess = isCrit || attackRoll.total >= enemyAc;

    let dmg = 0;
    let hitDescription = '';

    if (isCrit) {
      dmg = Math.floor(((player.strength * 0.7) + (d20 * 1.8) + (pb * 3)) * 1.8);
      hitDescription = `⚔️ CRITICAL HIT! ${player.name} rolls Natural 20! (${attackRoll.formula} = ${attackRoll.total} vs AC ${enemyAc}) inflicting ${dmg} devastating damage!`;
    } else if (isFumble) {
      dmg = Math.max(2, Math.floor(player.strength * 0.2));
      hitDescription = `⚠️ FUMBLE! ${player.name} rolled Natural 1 (${attackRoll.formula}), grazing for only ${dmg} damage!`;
    } else if (hitSuccess) {
      dmg = Math.floor(((player.strength * 0.7) + (d20 * 1.4) + (pb * 2.5)));
      hitDescription = `⚔️ ${player.name} strikes true! (${attackRoll.formula} = ${attackRoll.total} vs AC ${enemyAc}) dealing ${dmg} physical damage!`;
    } else {
      // Glancing blow against armor
      dmg = Math.max(3, Math.floor(((player.strength * 0.4) + pb)));
      hitDescription = `🛡️ ${enemy.name}'s armor (AC ${enemyAc}) deflects the blow! (${attackRoll.formula} = ${attackRoll.total}) Dealing ${dmg} glancing damage!`;
    }

    const nextEnemyHp = Math.max(0, enemy.currentHp - dmg);
    setEnemy((prev) => (prev ? { ...prev, currentHp: nextEnemyHp } : null));
    setBattleLog((prev) => [
      ...prev,
      { text: hitDescription, type: 'player' }
    ]);

    if (nextEnemyHp <= 0) {
      handleVictoryCelebration(enemy);
      return;
    }

    enemyTurn(player.currentHp, { ...enemy, currentHp: nextEnemyHp });
  };

  const handleSpellcast = () => {
    if (!player || !enemy || isActing || winner) return;
    if (player.currentMana < 50) {
      setBattleLog((prev) => [...prev, { text: `⚠️ Insufficient Mana to weave an arcane incantation!`, type: 'system' }]);
      return;
    }
    setIsActing(true);

    const pb = player.proficiencyBonus || 2;
    const spellRoll = rollDice({
      die: 'd20',
      count: 1,
      modifier: pb,
      mode: 'normal',
      label: `${player.name} Arcane Spellweave`,
    });

    const d20 = spellRoll.rolls[0].value;
    const isCrit = spellRoll.isCriticalSuccess;
    const isFumble = spellRoll.isCriticalFailure;

    playDiceAudio({ soundEnabled, isCrit, isFumble });

    let spellDmg = isFumble
      ? Math.max(3, Math.floor(player.intelligence * 0.3))
      : Math.floor(((player.intelligence * 0.9) + (d20 * 2) + (pb * 3)) * (isCrit ? 1.75 : 1));

    // Weakness bonus check
    if (enemy.weakness && (enemy.weakness.toLowerCase().includes('radiant') || enemy.weakness.toLowerCase().includes('fire') || enemy.weakness.toLowerCase().includes('magic'))) {
      spellDmg = Math.round(spellDmg * 1.25);
    }

    const nextEnemyHp = Math.max(0, enemy.currentHp - spellDmg);
    const nextPlayerMana = player.currentMana - 50;

    setPlayer((prev) => (prev ? { ...prev, currentMana: nextPlayerMana } : null));
    setEnemy((prev) => (prev ? { ...prev, currentHp: nextEnemyHp } : null));
    setBattleLog((prev) => [
      ...prev,
      {
        text: isCrit
          ? `✨ ARCANE CRITICAL! ${player.name} channels incandescent spellfire (Natural 20! ${spellRoll.formula} = ${spellRoll.total}) inflicting ${spellDmg} spell damage!`
          : isFumble
          ? `⚠️ ARCANE SURGE MISFIRE! ${player.name} rolls Natural 1 (${spellRoll.formula}), fizzling for ${spellDmg} damage!`
          : `✨ ${player.name} channels Arcane Spellweave (${spellRoll.formula} = ${spellRoll.total}) inflicting ${spellDmg} spell damage!`,
        type: 'player',
      },
    ]);

    if (nextEnemyHp <= 0) {
      handleVictoryCelebration(enemy);
      return;
    }

    enemyTurn(player.currentHp, { ...enemy, currentHp: nextEnemyHp });
  };

  const handleGuard = () => {
    if (!player || !enemy || isActing || winner) return;
    setIsActing(true);

    const heal = Math.floor(player.agility * 0.4 + 25);
    const nextHp = Math.min(player.maxHp, player.currentHp + heal);
    const manaRegen = Math.min(player.maxMana, player.currentMana + 30);

    setPlayer((prev) => (prev ? { ...prev, currentHp: nextHp, currentMana: manaRegen } : null));
    setBattleLog((prev) => [
      ...prev,
      {
        text: `🛡️ ${player.name} takes a defensive stance, recovering ${heal} HP and 30 Mana!`,
        type: 'player',
      },
    ]);

    enemyTurn(nextHp, enemy);
  };

  if (!isOpen || !player || !enemy) return null;

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Arena Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            className="relative w-full max-w-2xl bg-[#14110e] border-2 border-[#eab308]/70 rounded-md shadow-2xl z-10 text-[#ded7cb] overflow-hidden arcane-card-glow"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#c9a050]/30 bg-[#1b1713] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-xs bg-[#241e17] border border-[#c9a050]/40 text-[#eab308]">
                  <Swords className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-fantasy-name text-lg text-[#f8f3ea] tracking-wider">
                    The Grand Crucible Arena
                  </h3>
                  <p className="text-[10px] text-[#938b7d] uppercase tracking-widest">
                    Live Deck Combat &amp; Monster Crucible
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-summon-monster-header"
                  type="button"
                  onClick={() => summonProceduralMonster()}
                  className="px-2.5 py-1 rounded-xs border border-purple-500/50 bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Summon a random procedural monster scaled to your hero level"
                >
                  <Compass className="w-3.5 h-3.5 text-purple-400" />
                  <span>Summon Monster</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-xs border border-[#c9a050]/25 text-[#c9a050] hover:text-white hover:bg-[#c9a050]/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Combatants VS Stage */}
            <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0d0c0a] border-b border-[#c9a050]/20">
              {/* Player Fighter */}
              <div className="p-3.5 rounded-xs bg-[#161310] border border-[#3b82f6]/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                      Challenger (You)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/30">
                        Lvl {player.level || 1} (PB +{player.proficiencyBonus || 2})
                      </span>
                      <span className="text-xs font-mono text-[#a1998c]">{player.className}</span>
                    </div>
                  </div>
                  <h4 className="font-fantasy-name text-base text-[#f5efe6] truncate mt-0.5">
                    {player.name}
                  </h4>

                  {/* HP Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] font-mono text-red-300 mb-1">
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-500 fill-red-500" /> HP</span>
                      <span>{player.currentHp} / {player.maxHp}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#201515] overflow-hidden border border-red-950">
                      <div
                        className="h-full bg-linear-to-r from-red-600 to-amber-500 transition-all duration-300"
                        style={{ width: `${Math.max(0, (player.currentHp / player.maxHp) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Mana Bar */}
                  <div className="mt-2">
                    <div className="flex justify-between text-[11px] font-mono text-cyan-300 mb-1">
                      <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-cyan-400" /> MP</span>
                      <span>{player.currentMana} / {player.maxMana}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#101b22] overflow-hidden border border-cyan-950">
                      <div
                        className="h-full bg-cyan-500 transition-all duration-300"
                        style={{ width: `${Math.max(0, (player.currentMana / player.maxMana) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#c9a050]/15 flex items-center justify-between text-[10px] text-[#8e877b] uppercase font-mono">
                  <span>STR: {player.strength}</span>
                  <span>INT: {player.intelligence}</span>
                  <span>AGI: {player.agility}</span>
                </div>
              </div>

              {/* Enemy Rival */}
              <div className="p-3.5 rounded-xs bg-[#161310] border border-red-600/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                        {enemy.isProcedural ? 'Procedural Monster' : 'Crucible Boss'}
                      </span>
                      {enemy.difficulty && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-xs bg-purple-950/50 text-purple-300 border border-purple-500/30 uppercase font-mono">
                          {enemy.difficulty}
                        </span>
                      )}
                    </div>

                    {/* Inspect Button */}
                    <button
                      id="btn-inspect-adversary"
                      type="button"
                      onClick={() => setIsInspectOpen(true)}
                      className="px-2 py-0.5 rounded-xs border border-[#c9a050]/40 bg-[#1f1b17] hover:bg-[#c9a050] hover:text-[#0c0c0c] text-[#fef08a] text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                      title="Inspect full combat stat block, attacks, and weaknesses"
                    >
                      <Eye className="w-3 h-3 text-[#eab308]" />
                      <span>Inspect</span>
                    </button>
                  </div>

                  <h4 className="font-fantasy-name text-base text-[#f5efe6] truncate mt-0.5">
                    {enemy.name}
                  </h4>

                  {/* Tactical Metrics Chips */}
                  <div className="mt-1 flex items-center gap-2 text-[10px] font-mono text-[#c9a050]">
                    <span className="flex items-center gap-0.5 text-blue-300">
                      <Shield className="w-3 h-3" /> AC {enemy.armorClass || 13}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-amber-300">
                      <Footprints className="w-3 h-3" /> Init {enemy.initiative !== undefined ? (enemy.initiative >= 0 ? `+${enemy.initiative}` : enemy.initiative) : '+0'}
                    </span>
                    {enemy.challengeRating && (
                      <>
                        <span>•</span>
                        <span className="text-purple-300 font-bold">{enemy.challengeRating}</span>
                      </>
                    )}
                  </div>

                  {/* HP Bar */}
                  <div className="mt-2.5">
                    <div className="flex justify-between text-[11px] font-mono text-red-300 mb-1">
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-500 fill-red-500" /> HP</span>
                      <span>{enemy.currentHp} / {enemy.maxHp}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#201515] overflow-hidden border border-red-950">
                      <div
                        className="h-full bg-linear-to-r from-red-600 to-rose-400 transition-all duration-300"
                        style={{ width: `${Math.max(0, (enemy.currentHp / enemy.maxHp) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Mana Bar */}
                  <div className="mt-2">
                    <div className="flex justify-between text-[11px] font-mono text-purple-300 mb-1">
                      <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-purple-400" /> MP</span>
                      <span>{enemy.currentMana} / {enemy.maxMana}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#1b1022] overflow-hidden border border-purple-950">
                      <div
                        className="h-full bg-purple-500 transition-all duration-300"
                        style={{ width: `${Math.max(0, (enemy.currentMana / enemy.maxMana) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#c9a050]/15 flex items-center justify-between text-[10px] text-[#8e877b] uppercase font-mono">
                  <span>STR: {enemy.strength}</span>
                  <span>INT: {enemy.intelligence}</span>
                  <span>AGI: {enemy.agility}</span>
                </div>
              </div>
            </div>

            {/* Victory / Defeat Announcement Banner */}
            {winner && (
              <div
                className={`p-3 text-center border-b font-mono text-xs flex items-center justify-center gap-2 ${
                  winner === 'player'
                    ? 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                    : 'bg-red-950/40 text-red-300 border-red-500/40'
                }`}
              >
                {winner === 'player' ? (
                  <>
                    <Trophy className="w-4 h-4 text-[#eab308]" />
                    <span>
                      <strong>VICTORY ACHIEVED!</strong> Awarded <strong className="text-white font-bold">+{enemy?.xpReward || 100} XP</strong> &amp; <strong className="text-amber-300 font-bold">+{enemy?.goldReward || (Math.floor((enemy?.xpReward || 100) * 0.75) + 25)} GP</strong>!
                      {wonLoot && (
                        <span className="ml-1.5 text-amber-200">
                          Spoils: <strong className="underline decoration-amber-400">{wonLoot.name}</strong> ({wonLoot.rarity})
                        </span>
                      )}
                    </span>
                  </>
                ) : (
                  <span>
                    <strong>DEFEAT:</strong> {player.name} fell in battle against {enemy.name}.
                  </span>
                )}
              </div>
            )}

            {/* Combat Action Controls & Enemy Selectors */}
            <div className="p-4 bg-[#181410] border-b border-[#c9a050]/20 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleMeleeAttack}
                  disabled={isActing || !!winner}
                  className="px-4 py-2 rounded-xs border border-amber-500 bg-amber-500/20 hover:bg-amber-500 hover:text-black text-amber-300 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
                >
                  <Swords className="w-3.5 h-3.5" />
                  <span>Strike (STR)</span>
                </button>

                <button
                  type="button"
                  onClick={handleSpellcast}
                  disabled={isActing || !!winner || player.currentMana < 50}
                  className="px-4 py-2 rounded-xs border border-cyan-500 bg-cyan-500/20 hover:bg-cyan-500 hover:text-black text-cyan-300 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cast (50 MP)</span>
                </button>

                <button
                  type="button"
                  onClick={handleGuard}
                  disabled={isActing || !!winner}
                  className="px-3 py-2 rounded-xs border border-emerald-500 bg-emerald-500/20 hover:bg-emerald-500 hover:text-black text-emerald-300 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Guard</span>
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => summonProceduralMonster()}
                  className="px-3 py-1.5 rounded-xs border border-purple-500/50 bg-purple-950/30 text-purple-200 hover:bg-purple-900/50 text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Summon a fresh monster scaled to your level"
                >
                  <Compass className="w-3 h-3 text-purple-400" />
                  <span>Summon Monster</span>
                </button>

                <button
                  type="button"
                  onClick={() => resetDuel()}
                  className="px-3 py-1.5 rounded-xs border border-[#c9a050]/40 text-[#c9a050] hover:text-[#fff] text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Fight classic dungeon bosses"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Rematch Boss</span>
                </button>
              </div>
            </div>

            {/* Battle Event Chronicle Log */}
            <div className="p-4 bg-[#0e0c0a] max-h-44 overflow-y-auto space-y-1.5 text-xs font-mono custom-scrollbar">
              {battleLog.map((entry, idx) => (
                <div
                  key={idx}
                  className={`py-0.5 px-2 rounded-xs ${
                    entry.type === 'player'
                      ? 'text-cyan-300 bg-cyan-950/20 border-l border-cyan-500'
                      : entry.type === 'enemy'
                      ? 'text-red-300 bg-red-950/20 border-l border-red-500'
                      : 'text-[#eab308] italic'
                  }`}
                >
                  {entry.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Monster Stat Block & Lore Inspection Modal */}
      <MonsterStatBlockModal
        isOpen={isInspectOpen}
        onClose={() => setIsInspectOpen(false)}
        monster={enemy ? getMonsterForStatBlock(enemy) : null}
      />
    </>
  );
};
