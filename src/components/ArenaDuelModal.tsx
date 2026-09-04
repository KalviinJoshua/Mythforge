import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FantasyCharacter } from '../types';
import { CharacterIcon } from './CharacterIcon';
import { 
  X, 
  Swords, 
  ShieldAlert, 
  Sparkles, 
  Dices, 
  Trophy, 
  Skull, 
  Heart, 
  Zap, 
  Flame,
  RotateCcw
} from 'lucide-react';

interface ArenaDuelModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerCharacter?: FantasyCharacter | null;
  character?: FantasyCharacter | null;
  deck?: FantasyCharacter[];
  soundEnabled?: boolean;
  onVictory?: (bossName: string) => void;
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
}

const DUNGEON_BOSSES: Combatant[] = [
  {
    name: 'Malakor the Nether Lich',
    className: 'Warlock',
    maxHp: 460,
    currentHp: 460,
    maxMana: 500,
    currentMana: 500,
    strength: 35,
    intelligence: 88,
    agility: 42,
    iconName: 'Skull',
  },
  {
    name: 'Gorgaroth the Ashen Colossus',
    className: 'Warrior',
    maxHp: 580,
    currentHp: 580,
    maxMana: 90,
    currentMana: 90,
    strength: 92,
    intelligence: 20,
    agility: 30,
    iconName: 'Swords',
  },
  {
    name: 'Vespera the Shadow Assassin',
    className: 'Rogue',
    maxHp: 380,
    currentHp: 380,
    maxMana: 260,
    currentMana: 260,
    strength: 65,
    intelligence: 55,
    agility: 95,
    iconName: 'Sparkles',
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

  const resetDuel = (chosenEnemy?: Combatant) => {
    if (!playerCharacter) return;
    setPlayer({
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
    });

    const rival = chosenEnemy || DUNGEON_BOSSES[Math.floor(Math.random() * DUNGEON_BOSSES.length)];
    setEnemy({ ...rival, currentHp: rival.maxHp, currentMana: rival.maxMana });
    setWinner(null);
    setBattleLog([
      { text: `⚔️ The arena gates crash open! ${playerCharacter.name} steps into the crucible against ${rival.name}!`, type: 'system' }
    ]);
  };

  useEffect(() => {
    if (isOpen && playerCharacter) {
      resetDuel();
    }
  }, [isOpen, playerCharacter]);

  const enemyTurn = (updatedPlayerHp: number, updatedEnemy: Combatant) => {
    if (updatedPlayerHp <= 0) {
      setWinner('enemy');
      setBattleLog((prev) => [...prev, { text: `☠️ ${updatedEnemy.name} dealt a fatal blow! You have fallen in combat!`, type: 'enemy' }]);
      setIsActing(false);
      return;
    }

    setTimeout(() => {
      const d20 = Math.floor(Math.random() * 20) + 1;
      let enemyDmg = 0;
      let actionText = '';

      if (updatedEnemy.currentMana >= 60 && Math.random() > 0.4) {
        // Boss spells
        enemyDmg = Math.floor(updatedEnemy.intelligence * 0.75 + d20 * 1.5);
        updatedEnemy.currentMana -= 60;
        actionText = `🔥 ${updatedEnemy.name} chants a dark spell (Roll: ${d20}) dealing ${enemyDmg} magic damage!`;
      } else {
        // Boss physical attack
        enemyDmg = Math.floor(updatedEnemy.strength * 0.65 + d20 * 1.2);
        actionText = `🗡️ ${updatedEnemy.name} strikes with brutal force (Roll: ${d20}) dealing ${enemyDmg} physical damage!`;
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

    const d20 = Math.floor(Math.random() * 20) + 1;
    const isCrit = d20 === 20;
    const dmg = Math.floor((player.strength * 0.7 + d20 * 1.5) * (isCrit ? 1.8 : 1));
    const nextEnemyHp = Math.max(0, enemy.currentHp - dmg);

    setEnemy((prev) => (prev ? { ...prev, currentHp: nextEnemyHp } : null));
    setBattleLog((prev) => [
      ...prev,
      {
        text: `⚔️ ${player.name} unleashes a melee blow (D20: ${d20}${isCrit ? ' CRITICAL HIT!' : ''}) for ${dmg} damage!`,
        type: 'player',
      },
    ]);

    if (nextEnemyHp <= 0) {
      setWinner('player');
      setBattleLog((prev) => [...prev, { text: `🏆 VICTORY! ${enemy.name} has been vanquished in glory!`, type: 'system' }]);
      setIsActing(false);
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

    const d20 = Math.floor(Math.random() * 20) + 1;
    const spellDmg = Math.floor(player.intelligence * 0.9 + d20 * 2);
    const nextEnemyHp = Math.max(0, enemy.currentHp - spellDmg);
    const nextPlayerMana = player.currentMana - 50;

    setPlayer((prev) => (prev ? { ...prev, currentMana: nextPlayerMana } : null));
    setEnemy((prev) => (prev ? { ...prev, currentHp: nextEnemyHp } : null));
    setBattleLog((prev) => [
      ...prev,
      {
        text: `✨ ${player.name} channels Arcane Spellweave (D20: ${d20}) inflicting ${spellDmg} spell damage!`,
        type: 'player',
      },
    ]);

    if (nextEnemyHp <= 0) {
      setWinner('player');
      setBattleLog((prev) => [...prev, { text: `🏆 VICTORY! ${enemy.name} was disintegrated by your spellfire!`, type: 'system' }]);
      setIsActing(false);
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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
                  Live Deck Combat Simulation
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xs border border-[#c9a050]/25 text-[#c9a050] hover:text-white hover:bg-[#c9a050]/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Combatants VS Stage */}
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0d0c0a] border-b border-[#c9a050]/20">
            {/* Player Fighter */}
            <div className="p-3.5 rounded-xs bg-[#161310] border border-[#3b82f6]/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    Challenger (You)
                  </span>
                  <span className="text-xs font-mono text-[#a1998c]">{player.className}</span>
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                    Rival Adversary
                  </span>
                  <span className="text-xs font-mono text-[#a1998c]">{enemy.className}</span>
                </div>
                <h4 className="font-fantasy-name text-base text-[#f5efe6] truncate mt-0.5">
                  {enemy.name}
                </h4>

                {/* HP Bar */}
                <div className="mt-3">
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

          {/* Combat Action Controls */}
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

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => resetDuel()}
                className="px-3 py-1.5 rounded-xs border border-[#c9a050]/40 text-[#c9a050] hover:text-[#fff] text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Rematch Boss</span>
              </button>
            </div>
          </div>

          {/* Battle Event Chronicle Log */}
          <div className="p-4 bg-[#0e0c0a] max-h-44 overflow-y-auto space-y-1.5 text-xs font-mono">
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
  );
};
