import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GeneratedMonster } from '../types';
import { DIFFICULTY_CONFIG } from '../data/monsterData';
import { 
  X, 
  Shield, 
  Heart, 
  Zap, 
  Swords, 
  Sparkles, 
  Eye, 
  Flame, 
  AlertCircle, 
  CheckCircle2, 
  Award,
  Footprints
} from 'lucide-react';

interface MonsterStatBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  monster: GeneratedMonster | null;
  onBeginDuel?: () => void;
}

export const MonsterStatBlockModal: React.FC<MonsterStatBlockModalProps> = ({
  isOpen,
  onClose,
  monster,
  onBeginDuel,
}) => {
  if (!isOpen || !monster) return null;

  const diffStyle = DIFFICULTY_CONFIG[monster.difficulty] || DIFFICULTY_CONFIG.Standard;

  return (
    <AnimatePresence>
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="monster-statblock-title"
        className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xs"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-md border-2 border-[#c9a050] bg-[#14110e] text-[#ded7cb] shadow-[0_16px_50px_rgba(0,0,0,0.9)] overflow-hidden font-fantasy-body"
        >
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-[#c9a050]/30 bg-[#1b1713] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xs bg-[#251f18] border border-[#c9a050]/40 text-[#eab308]">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c9a050]">
                  Arena Scout Grimoire • Bestiary Scroll
                </span>
                <h3 
                  id="monster-statblock-title"
                  className="font-fantasy-name text-lg text-[#f8f3ea] tracking-wide truncate"
                >
                  {monster.name}
                </h3>
              </div>
            </div>

            <button
              id="btn-close-monster-statblock"
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xs border border-[#c9a050]/30 text-[#a89f91] hover:text-[#f8f3ea] hover:bg-[#251f18] transition-colors cursor-pointer"
              aria-label="Close monster inspection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
            
            {/* Top Identity Banner */}
            <div className="p-3 rounded-xs border border-[#c9a050]/20 bg-[#191511] flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase border ${diffStyle.badgeBg} ${diffStyle.badgeBorder} ${diffStyle.badgeText}`}>
                    {monster.difficulty}
                  </span>
                  <span className="text-[11px] font-mono text-[#c9a050] font-bold">
                    {monster.challengeRating}
                  </span>
                  <span className="text-[11px] text-[#9c9486] font-mono">
                    Level {monster.level} {monster.archetype}
                  </span>
                </div>
                <p className="text-xs text-[#b8afa2] mt-1 italic">
                  "{monster.description}"
                </p>
              </div>
            </div>

            {/* Core Defensive & Speed Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xs bg-[#191511] border border-red-500/30">
                <div className="flex items-center justify-center gap-1 text-[11px] text-red-400 font-bold uppercase">
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>Max HP</span>
                </div>
                <div className="text-lg font-mono font-bold text-[#f8f3ea] mt-0.5">
                  {monster.maxHp}
                </div>
              </div>

              <div className="p-2.5 rounded-xs bg-[#191511] border border-blue-500/30">
                <div className="flex items-center justify-center gap-1 text-[11px] text-blue-400 font-bold uppercase">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <span>Armor Class</span>
                </div>
                <div className="text-lg font-mono font-bold text-[#f8f3ea] mt-0.5">
                  {monster.armorClass}
                </div>
              </div>

              <div className="p-2.5 rounded-xs bg-[#191511] border border-amber-500/30">
                <div className="flex items-center justify-center gap-1 text-[11px] text-amber-400 font-bold uppercase">
                  <Footprints className="w-3.5 h-3.5 text-amber-400" />
                  <span>Initiative</span>
                </div>
                <div className="text-lg font-mono font-bold text-[#f8f3ea] mt-0.5">
                  {monster.initiative >= 0 ? `+${monster.initiative}` : monster.initiative}
                </div>
              </div>
            </div>

            {/* Attributes Matrix */}
            <div className="p-2.5 rounded-xs bg-[#161310] border border-[#c9a050]/20 flex items-center justify-around text-xs font-mono text-[#a89f91]">
              <div>
                <span className="text-[#888]">STR: </span>
                <strong className="text-[#f5efe6]">{monster.strength}</strong>
              </div>
              <div className="h-3 w-px bg-[#c9a050]/20" />
              <div>
                <span className="text-[#888]">INT: </span>
                <strong className="text-[#f5efe6]">{monster.intelligence}</strong>
              </div>
              <div className="h-3 w-px bg-[#c9a050]/20" />
              <div>
                <span className="text-[#888]">AGI: </span>
                <strong className="text-[#f5efe6]">{monster.agility}</strong>
              </div>
              <div className="h-3 w-px bg-[#c9a050]/20" />
              <div>
                <span className="text-[#888]">PB: </span>
                <strong className="text-[#eab308]">+{monster.proficiencyBonus}</strong>
              </div>
            </div>

            {/* Attacks Section */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#c9a050] mb-2 flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5" />
                Combat Attacks &amp; Weaponry
              </h4>
              <div className="space-y-2">
                {monster.attacks.map((att, idx) => (
                  <div 
                    key={idx} 
                    className="p-2.5 rounded-xs bg-[#191511] border border-[#c9a050]/25 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#f8f3ea]">
                        {att.name}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-[#241e17] border border-[#c9a050]/30 text-[#eab308] font-semibold">
                        {att.damageDice} ({att.type})
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9c9486] mt-1">
                      {att.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Ability */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#c9a050] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Inherent Special Ability
              </h4>
              <div className="p-2.5 rounded-xs bg-[#191511] border border-amber-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">
                    {monster.specialAbility.name}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-xs bg-amber-950/40 text-amber-200 border border-amber-500/40">
                    {monster.specialAbility.effectType}
                  </span>
                </div>
                <p className="text-[11px] text-[#9c9486] mt-1">
                  {monster.specialAbility.description}
                </p>
              </div>
            </div>

            {/* Weaknesses & Resistances */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xs bg-rose-950/20 border border-rose-500/30">
                <div className="text-[10px] uppercase font-bold text-rose-400 flex items-center gap-1 mb-1">
                  <AlertCircle className="w-3 h-3" />
                  Vulnerable Weakness
                </div>
                <div className="text-xs text-rose-200">
                  {monster.weakness}
                </div>
              </div>

              <div className="p-2.5 rounded-xs bg-emerald-950/20 border border-emerald-500/30">
                <div className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Resistant Defense
                </div>
                <div className="text-xs text-emerald-200">
                  {monster.resistance}
                </div>
              </div>
            </div>

            {/* Anticipated Spoils & XP */}
            <div className="p-2.5 rounded-xs bg-[#17130f] border border-[#c9a050]/20 flex items-center justify-between text-xs font-mono text-[#a89f91]">
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#eab308]" />
                <span>Rewards: +{monster.xpReward} XP / +{monster.goldReward} GP</span>
              </div>
              <div>
                <span>Loot: </span>
                <strong className="text-amber-300">[{monster.lootTier}]</strong>
              </div>
            </div>

          </div>

          {/* Footer Bar */}
          <div className="px-5 py-3 border-t border-[#c9a050]/30 bg-[#171411] flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xs border border-[#c9a050]/40 text-[#a89f91] hover:text-[#f8f3ea] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Grimoire
            </button>
            {onBeginDuel && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBeginDuel();
                }}
                className="px-4 py-1.5 rounded-xs border border-[#eab308] bg-[#92400e] hover:bg-[#b45309] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Swords className="w-3.5 h-3.5" />
                <span>Enter Battle with {monster.archetype}</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
