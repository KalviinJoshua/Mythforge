import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FantasyCharacter } from '../types';
import { CharacterIcon } from './CharacterIcon';
import { GuildCrestIcon } from './GuildCrestIcon';
import { 
  X, 
  Trash2, 
  ExternalLink, 
  Layers, 
  Heart, 
  Sparkles, 
  Swords, 
  ShieldAlert,
  BookOpen
} from 'lucide-react';

interface MyDeckDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  deck: FantasyCharacter[];
  activeCharacterId?: string;
  onSelectCharacter: (char: FantasyCharacter) => void;
  onRemoveFromDeck: (id: string) => void;
  onClearDeck: () => void;
}

export const MyDeckDrawer: React.FC<MyDeckDrawerProps> = ({
  isOpen,
  onClose,
  deck,
  activeCharacterId,
  onSelectCharacter,
  onRemoveFromDeck,
  onClearDeck,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-out Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative w-full max-w-md h-full bg-[#141210] border-l border-[#c9a050]/30 shadow-2xl flex flex-col z-10 text-[#d4cfc5]"
          >
            {/* Ornate Header */}
            <div className="p-5 border-b border-[#c9a050]/20 bg-[#191714] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-sm bg-[#221e1a] border border-[#c9a050]/30 text-[#c9a050]">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-fantasy-name text-lg text-[#f3ede2] tracking-wider">
                    My Deck
                  </h2>
                  <p className="text-[11px] text-[#9b9487] uppercase tracking-widest">
                    {deck.length} {deck.length === 1 ? 'Inscribed Hero' : 'Inscribed Heroes'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {deck.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearDeck}
                    title="Clear entire deck"
                    className="text-[11px] uppercase tracking-wider text-[#a89f91] hover:text-red-400 px-2 py-1 transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-sm border border-[#c9a050]/20 text-[#c9a050] hover:text-white hover:bg-[#c9a050]/10 transition-colors"
                  aria-label="Close My Deck"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Deck List Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
              {deck.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full border border-dashed border-[#c9a050]/30 flex items-center justify-center bg-[#1c1916] text-[#c9a050]/60">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-fantasy-name text-base text-[#e5e1d8] mb-1">
                      Deck Is Empty
                    </h3>
                    <p className="text-xs text-[#8a8782] leading-relaxed max-w-xs">
                      Forge an adventurer on the alchemist's workbench and click{' '}
                      <span className="text-[#c9a050] font-semibold">"Save to Deck"</span> to preserve their player card here.
                    </p>
                  </div>
                </div>
              ) : (
                deck.map((item) => {
                  const isActive = item.id === activeCharacterId;
                  return (
                    <div
                      key={item.id}
                      className={`relative rounded-sm border p-3.5 transition-all ${
                        isActive
                          ? 'border-[#eab308] bg-[#1e1b17] shadow-[0_0_15px_rgba(234,179,8,0.15)]'
                          : 'border-[#c9a050]/20 bg-[#181613] hover:border-[#c9a050]/40 hover:bg-[#1b1916]'
                      }`}
                    >
                      {/* Top Bar with Class Badge & Remove */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <CharacterIcon iconName={item.iconName} className="w-3.5 h-3.5 text-[#c9a050]" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#c9a050]">
                            {item.className}
                          </span>
                          {isActive && (
                            <span className="text-[9px] uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded-xs ml-1">
                              Active
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveFromDeck(item.id)}
                          className="text-[#7d7870] hover:text-red-400 p-1 transition-colors"
                          title="Remove card from deck"
                          aria-label={`Remove ${item.name} from deck`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Name & Epithet */}
                      <div className="mb-2.5">
                        <h4 className="font-fantasy-name text-base text-[#f5efe6] leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[11px] italic text-[#9e968a] truncate">
                          "{item.title}"
                        </p>
                      </div>

                      {/* Combat Stats: Health, Mana, Strength */}
                      <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xs bg-[#11100e] border border-[#c9a050]/15 mb-2.5 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-red-400 flex items-center gap-0.5">
                            <Heart className="w-2.5 h-2.5" /> HP
                          </span>
                          <span className="text-xs font-semibold text-[#f0ebe1]">
                            {item.stats.health}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-cyan-400 flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> MP
                          </span>
                          <span className="text-xs font-semibold text-[#f0ebe1]">
                            {item.stats.mana}
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-amber-400 flex items-center gap-0.5">
                            <Swords className="w-2.5 h-2.5" /> STR
                          </span>
                          <span className="text-xs font-semibold text-[#f0ebe1]">
                            {item.stats.strength}
                          </span>
                        </div>
                      </div>

                      {/* Backstory Snippet if available */}
                      {item.backstory && (
                        <div className="mb-3 text-[11px] italic text-[#8a8479] bg-[#141210] p-2 rounded-xs border border-[#c9a050]/10 flex items-start gap-1.5">
                          <BookOpen className="w-3 h-3 text-[#c9a050] shrink-0 mt-0.5" />
                          <p className="line-clamp-2 leading-relaxed">
                            {item.backstory}
                          </p>
                        </div>
                      )}

                      {/* Guild Master Inscription Seal */}
                      {item.forgedBy && (
                        <div className="mb-2.5 text-[9px] text-[#8e877a] flex items-center gap-1.5 truncate px-1">
                          <GuildCrestIcon crest={item.guildCrest || 'phoenix'} className="w-2.5 h-2.5 shrink-0" />
                          <span className="truncate">Seal: {item.forgedBy}</span>
                        </div>
                      )}

                      {/* Inspect / Summon to Board Action */}
                      <button
                        type="button"
                        onClick={() => {
                          onSelectCharacter(item);
                          onClose();
                        }}
                        className="w-full py-1.5 px-3 rounded-xs border border-[#c9a050]/30 hover:border-[#c9a050] bg-[#221e1a] hover:bg-[#c9a050] hover:text-[#0c0c0c] text-[#c9a050] text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Inspect in Card Frame</span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#c9a050]/20 bg-[#181613] text-center">
              <p className="text-[10px] text-[#736e65] uppercase tracking-widest">
                Saved cards are stored locally in your Grimoire
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
