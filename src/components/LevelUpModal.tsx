import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FantasyCharacter, LevelUpResult } from '../types';
import { CharacterIcon } from './CharacterIcon';
import { 
  Sparkles, 
  Trophy, 
  Heart, 
  Zap, 
  Swords, 
  Brain, 
  Wind, 
  Smile, 
  ShieldCheck, 
  X,
  ChevronRight
} from 'lucide-react';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: FantasyCharacter | null;
  levelUpResult: LevelUpResult | null;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  onClose,
  character,
  levelUpResult,
}) => {
  if (!isOpen || !character || !levelUpResult || !levelUpResult.leveledUp) {
    return null;
  }

  const { newLevel, previousLevel, statGains, newProficiencyBonus, xpGained } = levelUpResult;

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

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 20 }}
          transition={{ type: 'spring', damping: 24, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#14120f] border-2 border-[#eab308] rounded-md shadow-[0_0_60px_rgba(234,179,8,0.35)] z-10 text-[#ded7cb] overflow-hidden arcane-card-glow"
        >
          {/* Corner gold ornaments */}
          <div className="absolute -top-3.5 -left-3.5 w-7 h-7 border-t-2 border-l-2 border-[#eab308] pointer-events-none" />
          <div className="absolute -top-3.5 -right-3.5 w-7 h-7 border-t-2 border-r-2 border-[#eab308] pointer-events-none" />
          <div className="absolute -bottom-3.5 -left-3.5 w-7 h-7 border-b-2 border-l-2 border-[#eab308] pointer-events-none" />
          <div className="absolute -bottom-3.5 -right-3.5 w-7 h-7 border-b-2 border-r-2 border-[#eab308] pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1 rounded-xs border border-[#c9a050]/30 text-[#c9a050] hover:text-white hover:bg-[#c9a050]/20 transition-colors z-20 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Banner */}
          <div className="p-6 text-center bg-radial from-[#382b13] to-[#16130f] border-b border-[#c9a050]/30 relative">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#272115] border-2 border-[#eab308] text-[#eab308] shadow-[0_0_20px_rgba(234,179,8,0.4)] mb-3">
              <Trophy className="w-8 h-8 animate-bounce" />
            </div>

            <div className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#eab308] mb-1">
              Arcane Awakening
            </div>

            <h2 className="font-fantasy-name text-3xl sm:text-4xl text-[#fef9ee] font-bold tracking-wider drop-shadow-md">
              LEVEL UP!
            </h2>

            <p className="text-sm text-[#baa481] mt-1 italic font-serif-hero">
              {character.name} has transcended mortal limits
            </p>

            {/* Level Transition Pill */}
            <div className="inline-flex items-center gap-3 mt-4 px-4 py-1.5 rounded-full bg-[#1c1914] border border-[#eab308]/60 shadow-inner">
              <span className="text-xs font-bold text-[#8c8273] font-mono">
                Level {previousLevel}
              </span>
              <ChevronRight className="w-4 h-4 text-[#eab308]" />
              <span className="text-sm font-black text-[#eab308] font-mono drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
                Level {newLevel}
              </span>
              <span className="text-[10px] text-[#c9a050] uppercase tracking-wider font-semibold border-l border-[#c9a050]/30 pl-2">
                +{xpGained} XP
              </span>
            </div>
          </div>

          {/* Stat Boosts Section */}
          <div className="p-6 space-y-4 bg-[#110f0d]">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#c9a050] pb-2 border-b border-[#c9a050]/20">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#eab308]" />
                Attributes Augmented
              </span>
              <span className="text-[11px] text-amber-300 font-mono">
                Proficiency: +{newProficiencyBonus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* HP Boost */}
              <div className="p-2.5 rounded-xs bg-[#191412] border border-red-900/40 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-red-400 font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-red-500/30 text-red-400" />
                  <span>Max Health</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono">
                  <span className="text-[#9e9486]">{character.stats.health}</span>
                  <span className="text-emerald-400 font-bold">+{statGains.health}</span>
                </div>
              </div>

              {/* Mana Boost */}
              <div className="p-2.5 rounded-xs bg-[#12181d] border border-cyan-900/40 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Max Mana</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono">
                  <span className="text-[#9e9486]">{character.stats.mana}</span>
                  <span className="text-emerald-400 font-bold">+{statGains.mana}</span>
                </div>
              </div>

              {/* Strength Boost */}
              <div className="p-2 rounded-xs bg-[#1a1713] border border-amber-900/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Swords className="w-3.5 h-3.5" />
                  <span>Strength</span>
                </div>
                <span className="text-emerald-400 font-bold font-mono">+{statGains.strength}</span>
              </div>

              {/* Intelligence Boost */}
              <div className="p-2 rounded-xs bg-[#1a141f] border border-purple-900/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-purple-400 font-semibold">
                  <Brain className="w-3.5 h-3.5" />
                  <span>Intelligence</span>
                </div>
                <span className="text-emerald-400 font-bold font-mono">+{statGains.intelligence}</span>
              </div>

              {/* Agility Boost */}
              <div className="p-2 rounded-xs bg-[#131b18] border border-emerald-900/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Agility</span>
                </div>
                <span className="text-emerald-400 font-bold font-mono">+{statGains.agility}</span>
              </div>

              {/* Charisma Boost */}
              <div className="p-2 rounded-xs bg-[#1d161a] border border-pink-900/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-pink-400 font-semibold">
                  <Smile className="w-3.5 h-3.5" />
                  <span>Charisma</span>
                </div>
                <span className="text-emerald-400 font-bold font-mono">+{statGains.charisma}</span>
              </div>
            </div>

            {/* Proficiency Bonus Note */}
            <div className="p-3 rounded-xs bg-[#181511] border border-[#c9a050]/25 flex items-center gap-2.5 text-xs text-[#b8ad9c]">
              <ShieldCheck className="w-4 h-4 text-[#eab308] shrink-0" />
              <span>
                Combat proficiency increased to{' '}
                <strong className="text-amber-300">+{newProficiencyBonus}</strong>. All attack rolls, spells, and saving throws grow stronger.
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 bg-[#181410] border-t border-[#c9a050]/25 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xs border-2 border-[#eab308] bg-[#eab308] text-[#12100e] hover:bg-[#facc15] font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] cursor-pointer"
            >
              Seal Ascension
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
