import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InventoryItem, CardRarity } from '../types';
import { 
  X, 
  Sparkles, 
  Trophy, 
  Coins, 
  Weight, 
  ShieldCheck, 
  Swords, 
  Shield, 
  Gem, 
  FlaskConical, 
  Zap, 
  Flame, 
  Check, 
  Backpack, 
  PackagePlus,
  Sparkle
} from 'lucide-react';

interface LootRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lootItem: InventoryItem | null;
  bossName?: string;
  onCollect: (item: InventoryItem) => void;
}

const RARITY_THEMES: Record<
  CardRarity, 
  { border: string; bg: string; text: string; glow: string; badgeBg: string; ringColor: string }
> = {
  Common: {
    border: 'border-zinc-500/50',
    bg: 'bg-[#18181b]',
    text: 'text-zinc-200',
    glow: 'shadow-zinc-500/20',
    badgeBg: 'bg-zinc-800 text-zinc-300 border-zinc-600',
    ringColor: 'from-zinc-500/20 to-transparent',
  },
  Uncommon: {
    border: 'border-emerald-500/60',
    bg: 'bg-[#062015]',
    text: 'text-emerald-300',
    glow: 'shadow-emerald-500/30',
    badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50',
    ringColor: 'from-emerald-500/30 to-transparent',
  },
  Rare: {
    border: 'border-sky-500/60',
    bg: 'bg-[#081a2e]',
    text: 'text-sky-300',
    glow: 'shadow-sky-500/30',
    badgeBg: 'bg-sky-950/80 text-sky-300 border-sky-500/50',
    ringColor: 'from-sky-500/30 to-transparent',
  },
  Epic: {
    border: 'border-purple-500/70',
    bg: 'bg-[#1d0e2e]',
    text: 'text-purple-300',
    glow: 'shadow-purple-500/40',
    badgeBg: 'bg-purple-950/80 text-purple-300 border-purple-500/60',
    ringColor: 'from-purple-500/40 to-transparent',
  },
  Legendary: {
    border: 'border-amber-500/80',
    bg: 'bg-[#291705]',
    text: 'text-amber-300',
    glow: 'shadow-amber-500/50',
    badgeBg: 'bg-amber-950/90 text-amber-300 border-amber-500/70',
    ringColor: 'from-amber-500/50 to-transparent',
  },
  Mythic: {
    border: 'border-rose-500',
    bg: 'bg-[#290812]',
    text: 'text-rose-300',
    glow: 'shadow-rose-500/60',
    badgeBg: 'bg-rose-950/90 text-rose-300 border-rose-500/80',
    ringColor: 'from-rose-500/60 to-transparent',
  },
};

export const LootRewardModal: React.FC<LootRewardModalProps> = ({
  isOpen,
  onClose,
  lootItem,
  bossName,
  onCollect,
}) => {
  const [isCollected, setIsCollected] = useState(false);

  // Reset collected state whenever new loot arrives
  React.useEffect(() => {
    setIsCollected(false);
  }, [lootItem?.id, isOpen]);

  if (!isOpen || !lootItem) return null;

  const rarityMeta = RARITY_THEMES[lootItem.rarity || 'Common'];

  const handleCollect = () => {
    if (isCollected) return;
    setIsCollected(true);
    onCollect(lootItem);
  };

  const renderIcon = (name?: string) => {
    switch (name) {
      case 'Swords': return <Swords className="w-8 h-8" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8" />;
      case 'Shield': return <Shield className="w-8 h-8" />;
      case 'Gem': return <Gem className="w-8 h-8" />;
      case 'FlaskConical': return <FlaskConical className="w-8 h-8" />;
      case 'Flame': return <Flame className="w-8 h-8" />;
      case 'Zap': return <Zap className="w-8 h-8" />;
      case 'Trophy': return <Trophy className="w-8 h-8" />;
      default: return <Sparkles className="w-8 h-8" />;
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="loot-reward-modal-backdrop" 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      >
        <motion.div
          id="loot-reward-container"
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-md rounded-sm border-2 ${rarityMeta.border} ${rarityMeta.bg} shadow-2xl ${rarityMeta.glow} overflow-hidden text-[#e8e2d8] font-serif`}
        >
          {/* Top Radial Glow Backdrop */}
          <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gradient-to-b ${rarityMeta.ringColor} blur-2xl pointer-events-none`} />

          {/* Close Header Bar */}
          <div className="relative z-10 px-5 pt-4 pb-2 flex items-center justify-between border-b border-[#c9a050]/20">
            <div className="flex items-center gap-2">
              <Sparkle className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-amber-400">
                Battle Spoils Claimed
              </span>
            </div>
            <button
              id="btn-close-loot"
              type="button"
              onClick={onClose}
              className="p-1 rounded-sm text-[#8e877b] hover:text-[#fff] hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Card Content */}
          <div className="relative z-10 p-6 flex flex-col items-center text-center">
            {bossName && (
              <span className="text-[11px] font-sans text-[#a59a88] uppercase tracking-wider mb-3">
                Looted from the remains of <strong className="text-amber-200">{bossName}</strong>
              </span>
            )}

            {/* Glowing Icon Frame */}
            <div className={`relative mb-4 p-4 rounded-sm border ${rarityMeta.border} bg-[#110e0c]/90 shadow-lg`}>
              <div className={rarityMeta.text}>
                {renderIcon(lootItem.iconName)}
              </div>
              <span className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-sans font-bold uppercase tracking-widest border ${rarityMeta.badgeBg}`}>
                {lootItem.rarity}
              </span>
            </div>

            {/* Item Title & Category */}
            <h3 className={`text-xl font-bold tracking-wide mt-2 mb-1 ${rarityMeta.text}`}>
              {lootItem.name}
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-sans uppercase font-semibold text-[#8e877a] px-2 py-0.5 rounded-xs bg-[#1f1a14] border border-[#c9a050]/25">
                Type: {lootItem.category}
              </span>
              {lootItem.slot && (
                <span className="text-[11px] font-sans uppercase font-semibold text-[#8e877a] px-2 py-0.5 rounded-xs bg-[#1f1a14] border border-[#c9a050]/25">
                  Slot: {lootItem.slot}
                </span>
              )}
            </div>

            {/* Item Lore / Description */}
            <p className="text-xs italic text-[#c8bfae] max-w-sm mb-4 leading-relaxed font-serif">
              "{lootItem.description}"
            </p>

            {/* Stat Modifiers Box */}
            {lootItem.statModifiers && Object.keys(lootItem.statModifiers).length > 0 && (
              <div className="w-full bg-[#120f0c] border border-[#c9a050]/30 rounded-xs p-3 mb-3 text-left">
                <span className="text-[10px] font-sans font-bold text-amber-400 uppercase tracking-wider block mb-1.5">
                  Armament Stat Enhancements
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {Object.entries(lootItem.statModifiers).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between px-2 py-1 rounded-xs bg-[#1a1511] border border-[#c9a050]/15">
                      <span className="text-[#a59a88] uppercase text-[10px]">{key}</span>
                      <span className="text-emerald-400 font-bold">+{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Effect Rune Box */}
            {lootItem.specialEffect && (
              <div className="w-full bg-[#1b1220]/60 border border-purple-500/40 rounded-xs p-2.5 mb-3 text-left">
                <div className="flex items-center gap-1.5 text-purple-300 text-[10px] font-sans font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>Enchanted Property</span>
                </div>
                <p className="text-xs text-purple-200/90 font-sans leading-snug">
                  {lootItem.specialEffect}
                </p>
              </div>
            )}

            {/* Value & Weight Bar */}
            <div className="w-full flex items-center justify-around py-2 px-3 rounded-xs bg-[#14100c] border border-[#c9a050]/20 text-xs font-mono mb-5">
              <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>{lootItem.value} Gold</span>
              </span>
              <span className="h-3 w-px bg-[#c9a050]/30" />
              <span className="flex items-center gap-1.5 text-[#a89f91]">
                <Weight className="w-3.5 h-3.5 text-[#8e877b]" />
                <span>{lootItem.weight} lbs</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex items-center gap-3">
              <button
                id="btn-collect-loot"
                type="button"
                onClick={handleCollect}
                disabled={isCollected}
                className={`w-full py-2.5 px-4 rounded-xs text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  isCollected
                    ? 'bg-emerald-600/30 border border-emerald-500/60 text-emerald-300 cursor-default'
                    : 'bg-amber-500 hover:bg-amber-400 text-black border border-amber-300'
                }`}
              >
                {isCollected ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Transmuted into Vault!</span>
                  </>
                ) : (
                  <>
                    <PackagePlus className="w-4 h-4" />
                    <span>Collect &amp; Store in Vault</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
