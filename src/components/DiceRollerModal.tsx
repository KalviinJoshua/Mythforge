import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DieType, 
  RollMode, 
  DiceRollResult 
} from '../types';
import { 
  AVAILABLE_DICE, 
  DIE_SIDES_MAP, 
  rollDice, 
  playDiceAudio 
} from '../utils/dice';
import { 
  X, 
  Dices, 
  Sparkles, 
  RotateCcw, 
  Plus, 
  Minus, 
  History, 
  Trash2, 
  AlertTriangle,
  Trophy,
  SlidersHorizontal
} from 'lucide-react';

interface DiceRollerModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled?: boolean;
  defaultDie?: DieType;
  defaultModifier?: number;
  initialLabel?: string;
}

export const DiceRollerModal: React.FC<DiceRollerModalProps> = ({
  isOpen,
  onClose,
  soundEnabled = true,
  defaultDie = 'd20',
  defaultModifier = 0,
  initialLabel,
}) => {
  const [selectedDie, setSelectedDie] = useState<DieType>(defaultDie);
  const [diceCount, setDiceCount] = useState<number>(1);
  const [modifier, setModifier] = useState<number>(defaultModifier);
  const [mode, setMode] = useState<RollMode>('normal');
  const [rollLabel, setRollLabel] = useState<string>(initialLabel || '');
  const [currentResult, setCurrentResult] = useState<DiceRollResult | null>(null);
  const [history, setHistory] = useState<DiceRollResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const rollLabelInputId = useId();
  const diceCountInputId = useId();
  const modifierInputId = useId();

  // Execute roll with motion flourish and sound
  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);

    // Roll using our deterministic utility
    const result = rollDice({
      die: selectedDie,
      count: diceCount,
      modifier,
      mode,
      label: rollLabel.trim() || undefined,
    });

    // Audio synthesis
    playDiceAudio({
      soundEnabled,
      isCrit: result.isCriticalSuccess,
      isFumble: result.isCriticalFailure,
    });

    // Brief animation delay for rolling tumbler feel
    setTimeout(() => {
      setCurrentResult(result);
      setHistory((prev) => [result, ...prev.slice(0, 19)]); // Keep up to 20 recent rolls
      setIsRolling(false);
    }, 280);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleQuickD20 = (mod = 0, m: RollMode = 'normal') => {
    setSelectedDie('d20');
    setDiceCount(1);
    setModifier(mod);
    setMode(m);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="dice-roller-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs"
      >
        <motion.div
          id="dice-roller-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-md border-2 border-[#c9a050]/80 bg-[#161412] shadow-[0_16px_50px_rgba(0,0,0,0.9)] overflow-hidden font-fantasy-body text-[#e6ded1]"
        >
          {/* Header Bar */}
          <div className="relative px-5 py-4 border-b border-[#c9a050]/30 bg-[#1a1714] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xs bg-[#241e17] border border-[#c9a050]/40 text-[#eab308]">
                <Dices className="w-5 h-5" />
              </div>
              <div>
                <h2 
                  id="dice-roller-title"
                  className="text-lg sm:text-xl font-bold font-fantasy-name text-[#f5efe6] tracking-wider"
                >
                  Oracle's Polyhedral Dice
                </h2>
                <p className="text-[11px] text-[#a89f91]">
                  Deterministic D&amp;D fate casting with advantage, disadvantage &amp; modifiers
                </p>
              </div>
            </div>

            <button
              id="btn-close-dice-roller"
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xs text-[#a89f91] hover:text-[#f5efe6] hover:bg-[#25201a] border border-transparent hover:border-[#c9a050]/30 transition-colors cursor-pointer"
              title="Close dice roller"
              aria-label="Close dice roller"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Scrollable Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
            
            {/* 1. Die Type Selector Grid */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#c9a050] mb-2">
                1. Select Polyhedral Die
              </label>
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {AVAILABLE_DICE.map((d) => {
                  const isSelected = selectedDie === d;
                  const sides = DIE_SIDES_MAP[d];
                  return (
                    <button
                      key={d}
                      id={`btn-die-select-${d}`}
                      type="button"
                      onClick={() => setSelectedDie(d)}
                      className={`relative py-2 px-1 rounded-xs border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#eab308] bg-[#332717] text-[#fef08a] shadow-[0_0_12px_rgba(234,179,8,0.25)] ring-1 ring-[#eab308]'
                          : 'border-[#c9a050]/30 bg-[#1e1a16] text-[#b8afa2] hover:border-[#c9a050]/70 hover:bg-[#26211c]'
                      }`}
                    >
                      <div className="text-sm font-bold font-mono uppercase">{d}</div>
                      <div className="text-[9px] text-[#8e8577] mt-0.5">{sides}s</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Count & Modifier Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Number of dice */}
              <div className="bg-[#1b1713] p-3 rounded-xs border border-[#c9a050]/25">
                <label 
                  htmlFor={diceCountInputId}
                  className="block text-xs uppercase tracking-wider font-semibold text-[#c9a050] mb-2"
                >
                  Number of Dice ({selectedDie})
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDiceCount((c) => Math.max(1, c - 1))}
                    disabled={diceCount <= 1}
                    className="p-1.5 rounded-xs bg-[#25201a] border border-[#c9a050]/30 text-[#e6ded1] hover:bg-[#322a22] disabled:opacity-40 cursor-pointer"
                    aria-label="Decrease dice count"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    id={diceCountInputId}
                    type="number"
                    min="1"
                    max="20"
                    value={diceCount}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) setDiceCount(Math.max(1, Math.min(20, val)));
                    }}
                    className="flex-1 bg-[#12100d] border border-[#c9a050]/40 rounded-xs py-1 text-center font-mono text-sm font-bold text-white focus:outline-hidden focus:border-[#eab308]"
                  />
                  <button
                    type="button"
                    onClick={() => setDiceCount((c) => Math.min(20, c + 1))}
                    disabled={diceCount >= 20}
                    className="p-1.5 rounded-xs bg-[#25201a] border border-[#c9a050]/30 text-[#e6ded1] hover:bg-[#322a22] disabled:opacity-40 cursor-pointer"
                    aria-label="Increase dice count"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Modifier */}
              <div className="bg-[#1b1713] p-3 rounded-xs border border-[#c9a050]/25">
                <label 
                  htmlFor={modifierInputId}
                  className="block text-xs uppercase tracking-wider font-semibold text-[#c9a050] mb-2"
                >
                  Roll Modifier (PB / Ability)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setModifier((m) => Math.max(-20, m - 1))}
                    className="p-1.5 rounded-xs bg-[#25201a] border border-[#c9a050]/30 text-[#e6ded1] hover:bg-[#322a22] cursor-pointer"
                    aria-label="Decrease modifier"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    id={modifierInputId}
                    type="number"
                    min="-20"
                    max="50"
                    value={modifier}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) setModifier(Math.max(-20, Math.min(50, val)));
                    }}
                    className="flex-1 bg-[#12100d] border border-[#c9a050]/40 rounded-xs py-1 text-center font-mono text-sm font-bold text-white focus:outline-hidden focus:border-[#eab308]"
                  />
                  <button
                    type="button"
                    onClick={() => setModifier((m) => Math.min(50, m + 1))}
                    className="p-1.5 rounded-xs bg-[#25201a] border border-[#c9a050]/30 text-[#e6ded1] hover:bg-[#322a22] cursor-pointer"
                    aria-label="Increase modifier"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Roll Mode (Normal, Advantage, Disadvantage) & Label */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#c9a050] mb-1.5">
                  Roll Condition
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['normal', 'advantage', 'disadvantage'] as const).map((m) => {
                    const isSelected = mode === m;
                    return (
                      <button
                        key={m}
                        id={`btn-mode-${m}`}
                        type="button"
                        onClick={() => setMode(m)}
                        className={`py-1.5 px-2 rounded-xs border text-center text-xs font-bold capitalize transition-all cursor-pointer ${
                          isSelected
                            ? m === 'advantage'
                              ? 'border-emerald-500 bg-emerald-950/50 text-emerald-300 ring-1 ring-emerald-500'
                              : m === 'disadvantage'
                              ? 'border-rose-500 bg-rose-950/50 text-rose-300 ring-1 ring-rose-500'
                              : 'border-[#eab308] bg-[#2e2316] text-amber-300 ring-1 ring-[#eab308]'
                            : 'border-[#c9a050]/20 bg-[#1a1713] text-[#9e9485] hover:border-[#c9a050]/50'
                        }`}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Roll Label / Check Name */}
              <div className="flex items-center gap-2">
                <label htmlFor={rollLabelInputId} className="text-xs text-[#9e9485] shrink-0">
                  Label (opt):
                </label>
                <input
                  id={rollLabelInputId}
                  type="text"
                  placeholder="e.g. Initiative, Stealth, Greatsword"
                  value={rollLabel}
                  onChange={(e) => setRollLabel(e.target.value)}
                  maxLength={30}
                  className="flex-1 bg-[#12100d] border border-[#c9a050]/30 rounded-xs px-2.5 py-1 text-xs text-[#e6ded1] placeholder-[#665e52] focus:outline-hidden focus:border-[#eab308]"
                />
              </div>
            </div>

            {/* 4. Action Roll Button */}
            <div className="pt-1">
              <motion.button
                id="btn-execute-dice-roll"
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRoll}
                disabled={isRolling}
                className="w-full py-3 px-4 rounded-xs border-2 border-[#eab308] bg-gradient-to-r from-[#92400e] via-[#b45309] to-[#d97706] hover:from-[#b45309] hover:to-[#f59e0b] text-white font-fantasy-name font-bold text-base tracking-wider uppercase shadow-[0_4px_16px_rgba(217,119,6,0.35)] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
              >
                <Dices className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
                <span>
                  {isRolling 
                    ? 'Consulting the Runes...' 
                    : `Cast ${diceCount > 1 || selectedDie !== 'd20' ? `${diceCount}${selectedDie}` : 'd20'}${
                        modifier > 0 ? ` + ${modifier}` : modifier < 0 ? ` - ${Math.abs(modifier)}` : ''
                      }${mode === 'advantage' ? ' (Adv)' : mode === 'disadvantage' ? ' (Dis)' : ''}`
                  }
                </span>
              </motion.button>
            </div>

            {/* 5. Result Display Panel */}
            <div className="relative p-4 sm:p-5 rounded-md border-2 border-[#c9a050]/60 bg-[#12100d] shadow-inner">
              {currentResult ? (
                <div>
                  {/* Critical Banners */}
                  {currentResult.isCriticalSuccess && (
                    <div className="mb-3 px-3 py-1.5 rounded-xs bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(234,179,8,0.3)] animate-pulse">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span>NATURAL 20! CRITICAL SUCCESS!</span>
                    </div>
                  )}
                  {currentResult.isCriticalFailure && (
                    <div className="mb-3 px-3 py-1.5 rounded-xs bg-rose-950/60 border border-rose-500 text-rose-300 text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(244,63,94,0.3)]">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>NATURAL 1! CRITICAL FUMBLE!</span>
                    </div>
                  )}

                  {/* Formula and Label */}
                  <div className="flex items-center justify-between text-xs text-[#a89f91] mb-2 border-b border-[#c9a050]/20 pb-1.5">
                    <span className="font-mono font-bold text-[#c9a050]">
                      {currentResult.formula}
                    </span>
                    {currentResult.label && (
                      <span className="text-[#f5efe6] font-semibold italic">
                        "{currentResult.label}"
                      </span>
                    )}
                  </div>

                  {/* Big Total */}
                  <div className="text-center py-2">
                    <div className="text-xs uppercase tracking-widest text-[#9c9486] font-semibold">
                      Final Total
                    </div>
                    <div 
                      className={`text-4xl sm:text-5xl font-black font-mono tracking-tight my-1 ${
                        currentResult.isCriticalSuccess
                          ? 'text-[#fef08a] drop-shadow-[0_0_16px_rgba(234,179,8,0.7)]'
                          : currentResult.isCriticalFailure
                          ? 'text-rose-400 drop-shadow-[0_0_16px_rgba(244,63,94,0.7)]'
                          : 'text-[#f5efe6]'
                      }`}
                    >
                      {currentResult.total}
                    </div>
                  </div>

                  {/* Individual Dice Breakdown */}
                  <div className="mt-3 pt-3 border-t border-[#c9a050]/20">
                    <div className="text-[11px] uppercase tracking-wider text-[#9c9486] mb-1.5 font-semibold">
                      Dice Breakdown
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {currentResult.rolls.map((r, i) => (
                        <div
                          key={`die-roll-${i}`}
                          className={`px-2.5 py-1 rounded-xs border text-xs font-mono font-bold flex items-center gap-1 ${
                            r.dropped
                              ? 'border-gray-700/60 bg-gray-900/40 text-gray-500 line-through opacity-60'
                              : r.value === 20 && r.die === 'd20'
                              ? 'border-amber-400 bg-amber-950/60 text-amber-200 ring-1 ring-amber-400'
                              : r.value === 1 && r.die === 'd20'
                              ? 'border-rose-500 bg-rose-950/60 text-rose-300 ring-1 ring-rose-500'
                              : 'border-[#c9a050]/40 bg-[#1e1a15] text-[#f5efe6]'
                          }`}
                        >
                          <span>{r.value}</span>
                          {r.dropped && <span className="text-[9px] font-normal no-underline">(drop)</span>}
                        </div>
                      ))}

                      {currentResult.modifier !== 0 && (
                        <div className="text-xs font-mono text-[#c9a050] font-bold px-1.5">
                          {currentResult.modifier > 0 ? `+${currentResult.modifier}` : `${currentResult.modifier}`}
                        </div>
                      )}

                      <div className="ml-auto text-xs text-[#9c9486] font-mono">
                        = {currentResult.total}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-[#7d7467]">
                  <Dices className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-xs">Configure your dice above and click Cast to roll.</p>
                </div>
              )}
            </div>

            {/* 6. Recent Roll History */}
            {history.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#c9a050] font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5" />
                    Roll History ({history.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleClearHistory}
                    className="text-[11px] text-[#9c9486] hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear
                  </button>
                </div>

                <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                  {history.map((h) => (
                    <div
                      key={h.id}
                      className="p-2 rounded-xs border border-[#c9a050]/20 bg-[#15120f] flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-[#c9a050] font-bold shrink-0">{h.formula}</span>
                        {h.label && <span className="text-[#a89f91] truncate">[{h.label}]</span>}
                        {h.isCriticalSuccess && (
                          <span className="px-1 py-0.2 rounded-xs bg-amber-500/20 text-amber-300 text-[10px] font-bold shrink-0">
                            CRIT
                          </span>
                        )}
                        {h.isCriticalFailure && (
                          <span className="px-1 py-0.2 rounded-xs bg-rose-950/60 text-rose-300 text-[10px] font-bold shrink-0">
                            FUMBLE
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-[#f5efe6] text-sm shrink-0 ml-2">
                        {h.total}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-5 py-3 border-t border-[#c9a050]/30 bg-[#171411] flex items-center justify-between text-xs text-[#9c9486] shrink-0">
            <div className="flex items-center gap-2">
              <span>Quick D20:</span>
              <button
                type="button"
                onClick={() => handleQuickD20(0, 'normal')}
                className="px-2 py-0.5 rounded-xs border border-[#c9a050]/30 hover:border-[#c9a050] text-[#c9a050] text-[11px] cursor-pointer"
              >
                Flat
              </button>
              <button
                type="button"
                onClick={() => handleQuickD20(0, 'advantage')}
                className="px-2 py-0.5 rounded-xs border border-emerald-500/40 hover:border-emerald-500 text-emerald-300 text-[11px] cursor-pointer"
              >
                +Adv
              </button>
              <button
                type="button"
                onClick={() => handleQuickD20(0, 'disadvantage')}
                className="px-2 py-0.5 rounded-xs border border-rose-500/40 hover:border-rose-500 text-rose-300 text-[11px] cursor-pointer"
              >
                +Dis
              </button>
            </div>
            <button
              id="btn-dice-done"
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded-xs border border-[#c9a050]/50 bg-[#251f18] text-[#e6ded1] hover:bg-[#c9a050] hover:text-[#0c0c0c] font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
