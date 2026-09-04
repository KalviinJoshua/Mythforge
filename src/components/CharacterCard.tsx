import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FantasyCharacter, GuildProfile, CharacterRaceType, CardRarity } from '../types';
import { ALL_RACES, RACE_PROFILES } from '../data/characterData';
import { CharacterIcon } from './CharacterIcon';
import { CharacterPortrait } from './CharacterPortrait';
import { GuildCrestIcon } from './GuildCrestIcon';
import { 
  Copy, 
  Check, 
  Sparkles, 
  Compass, 
  Shield, 
  Heart, 
  Swords, 
  Scroll, 
  Bookmark, 
  BookmarkCheck, 
  RotateCw,
  Flame,
  Wand2,
  Brain,
  Wind,
  Smile,
  Zap,
  MapPin,
  Download,
  Edit3,
  Dices
} from 'lucide-react';

interface CharacterCardProps {
  character: FantasyCharacter | null;
  isRolling: boolean;
  onGeneratePortrait?: () => void;
  onRegeneratePortrait?: () => void;
  isGeneratingPortrait?: boolean;
  onGenerateBackstory?: () => void;
  isGeneratingBackstory?: boolean;
  onSaveToDeck?: (char: FantasyCharacter) => void;
  isSavedInDeck?: boolean;
  guildProfile?: GuildProfile;
  onChangeRace?: (newRace: CharacterRaceType) => void;
  onGenerateQuestHook?: () => void;
  isGeneratingQuestHook?: boolean;
  onOpenExporter?: () => void;
  onOpenArena?: () => void;
  onOpenEdit?: () => void;
}

const RARITY_STYLES: Record<CardRarity, { border: string; bg: string; text: string }> = {
  Common: { border: 'border-zinc-500/40', bg: 'bg-zinc-800/40', text: 'text-zinc-300' },
  Uncommon: { border: 'border-emerald-500/50', bg: 'bg-emerald-950/40', text: 'text-emerald-300' },
  Rare: { border: 'border-sky-500/50', bg: 'bg-sky-950/40', text: 'text-sky-300' },
  Epic: { border: 'border-purple-500/50', bg: 'bg-purple-950/40', text: 'text-purple-300' },
  Legendary: { border: 'border-amber-500/70', bg: 'bg-amber-950/50', text: 'text-amber-300' },
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isRolling,
  onGeneratePortrait,
  onRegeneratePortrait,
  isGeneratingPortrait,
  onGenerateBackstory,
  isGeneratingBackstory,
  onSaveToDeck,
  isSavedInDeck = false,
  guildProfile,
  onChangeRace,
  onGenerateQuestHook,
  isGeneratingQuestHook,
  onOpenExporter,
  onOpenArena,
  onOpenEdit,
}) => {
  const [copied, setCopied] = useState(false);
  const [isRaceDropdownOpen, setIsRaceDropdownOpen] = useState(false);

  const handleCopy = async () => {
    if (!character) return;
    const backstoryText = character.backstory ? `\nBackstory: ${character.backstory}` : '';
    const questText = character.questHook ? `\nQuest: ${character.questHook.title} - ${character.questHook.premise}` : '';
    const text = `${character.name} - ${character.race} ${character.className} (${character.title})\nRarity: ${character.rarity}\nHP: ${character.stats.health} | MP: ${character.stats.mana} | STR: ${character.stats.strength} | INT: ${character.stats.intelligence} | AGI: ${character.stats.agility} | CHA: ${character.stats.charisma}\nArmament: ${character.primaryWeapon}\nOrigin: ${character.origin}${backstoryText}${questText}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback
    }
  };

  if (!character) {
    return (
      <div
        id="character-empty-state"
        className="w-full max-w-xl mx-auto rounded-sm border-2 border-[#c9a050]/40 bg-[#161412] p-10 text-center relative shadow-2xl arcane-card-glow"
      >
        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#c9a050] pointer-events-none" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#c9a050] pointer-events-none" />
        <div className="w-18 h-18 mx-auto mb-5 rounded-full border border-[#c9a050]/30 flex items-center justify-center bg-[#1e1b18] text-[#c9a050]">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="font-fantasy-name text-3xl font-light text-[#f0ebe1] mb-2 tracking-wide">
          The Alchemist's Transmutation Seal
        </h2>
        <div className="w-20 h-[1px] bg-[#c9a050]/40 mx-auto my-4" />
        <p className="text-[#a1998c] text-sm max-w-md mx-auto leading-relaxed">
          Invoke a new adventurer to inscribe their celestial name, player card attributes, Health, Mana, Strength, and sacred origin story.
        </p>
      </div>
    );
  }

  // Calculate percentage ratios for visual bars
  const maxHp = 600;
  const maxMp = 700;
  const maxStr = 100;
  const maxInt = 100;
  const maxAgi = 100;
  const maxCha = 100;

  const hpPercent = Math.min(100, Math.round((character.stats.health / maxHp) * 100));
  const mpPercent = Math.min(100, Math.round((character.stats.mana / maxMp) * 100));
  const strPercent = Math.min(100, Math.round((character.stats.strength / maxStr) * 100));
  const intPercent = Math.min(100, Math.round((character.stats.intelligence / maxInt) * 100));
  const agiPercent = Math.min(100, Math.round((character.stats.agility / maxAgi) * 100));
  const chaPercent = Math.min(100, Math.round((character.stats.charisma / maxCha) * 100));

  const rarityInfo = RARITY_STYLES[character.rarity || 'Legendary'];

  return (
    <div className="w-full max-w-xl mx-auto relative group">
      <AnimatePresence mode="wait">
        <motion.div
          key={character.id}
          id="character-card-container"
          initial={{ opacity: 0, y: 16, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.985 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-md border-2 border-[#c9a050]/70 bg-[#161412] shadow-[0_12px_45px_rgba(0,0,0,0.85)] p-5 sm:p-7 arcane-card-glow"
        >
          {/* Ornate Gold Filigree Corner Brackets */}
          <div className="absolute -top-3.5 -left-3.5 w-7 h-7 border-t-2 border-l-2 border-[#eab308] pointer-events-none" />
          <div className="absolute -top-3.5 -right-3.5 w-7 h-7 border-t-2 border-r-2 border-[#eab308] pointer-events-none" />
          <div className="absolute -bottom-3.5 -left-3.5 w-7 h-7 border-b-2 border-l-2 border-[#eab308] pointer-events-none" />
          <div className="absolute -bottom-3.5 -right-3.5 w-7 h-7 border-b-2 border-r-2 border-[#eab308] pointer-events-none" />

          {/* Card Frame Inner Inset Line */}
          <div className="absolute inset-1.5 rounded-xs border border-[#c9a050]/20 pointer-events-none" />

          {/* Top Player Card Header Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#c9a050]/25">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs border text-[10px] font-bold uppercase tracking-[0.2em] ${rarityInfo.bg} ${rarityInfo.border} ${rarityInfo.text}`}>
                <Flame className="w-3 h-3 text-[#f59e0b]" /> {character.rarity} Card
              </span>

              {/* Edit Hero Button */}
              {onOpenEdit && (
                <button
                  type="button"
                  onClick={onOpenEdit}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs border border-[#c9a050]/30 text-[#c9a050] hover:text-[#fff] text-[10px] uppercase font-bold tracking-wider hover:bg-[#c9a050]/15 transition-colors cursor-pointer"
                  title="Inscribe & Customize Hero details"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {/* Quick Actions: Save to Deck, Export, Arena, Copy */}
            <div className="flex items-center gap-1.5">
              {/* Arena Battle Button */}
              {onOpenArena && (
                <button
                  type="button"
                  onClick={onOpenArena}
                  title="Test hero in the Turn-Based Duel Arena"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs border border-rose-500/50 bg-rose-950/30 text-rose-300 hover:bg-rose-900/50 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
                >
                  <Swords className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">Duel</span>
                </button>
              )}

              {/* Export Button */}
              {onOpenExporter && (
                <button
                  type="button"
                  onClick={onOpenExporter}
                  title="Export Trading Card PNG & D&D Stat Block"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs border border-[#c9a050]/40 bg-[#1d1a16] text-[#c9a050] hover:bg-[#c9a050]/20 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#eab308]" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              )}

              {onSaveToDeck && (
                <button
                  id="btn-save-to-deck-header"
                  data-testid="save-to-deck-button"
                  onClick={() => onSaveToDeck(character)}
                  type="button"
                  title="Save hero to My Deck"
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xs border text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    isSavedInDeck
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                      : 'border-[#c9a050]/50 bg-[#221d17] text-[#c9a050] hover:bg-[#c9a050] hover:text-[#0c0c0c]'
                  }`}
                >
                  {isSavedInDeck ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Save to Deck</span>
                      <span className="text-[10px] text-amber-300 font-normal">✓</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save to Deck</span>
                    </>
                  )}
                </button>
              )}

              <button
                id="btn-copy-character"
                onClick={handleCopy}
                type="button"
                title="Copy character stats and details"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs border border-[#c9a050]/30 bg-[#1d1a16] text-[#c9a050] hover:bg-[#c9a050]/15 text-xs uppercase tracking-wider font-medium transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Character Identity: Class, Race, Name, Title */}
          <div className="relative z-10 flex flex-col items-center text-center mb-4">
            {/* Race & Class Dual Badges with Race Selection Dropdown */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
              {/* Class Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201c18] border border-[#c9a050]/40 text-[#c9a050] text-xs font-semibold uppercase tracking-[0.2em] shadow-xs">
                <CharacterIcon iconName={character.iconName} className="w-3.5 h-3.5 text-[#eab308]" />
                <span id="character-class-badge">{character.className}</span>
              </div>

              {/* Race Selector Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsRaceDropdownOpen(!isRaceDropdownOpen)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1915] border border-[#eab308]/60 text-[#f5efe6] text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#28221b] transition-all cursor-pointer group/race"
                  title="Click to select or modify character race"
                >
                  <Sparkles className="w-3 h-3 text-[#eab308]" />
                  <span>{character.race}</span>
                  <span className="text-[10px] text-[#c9a050] group-hover/race:translate-y-0.5 transition-transform">▼</span>
                </button>

                {/* Race Dropdown Menu */}
                {isRaceDropdownOpen && (
                  <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 w-64 bg-[#14120f] border border-[#c9a050] rounded-xs shadow-2xl p-2 z-30 text-left">
                    <div className="text-[9px] uppercase font-bold text-[#c9a050] tracking-wider px-2 py-1 border-b border-[#c9a050]/20 mb-1">
                      Select Ancestry / Race
                    </div>
                    <div className="max-h-56 overflow-y-auto space-y-1">
                      {ALL_RACES.map((race) => {
                        const prof = RACE_PROFILES[race];
                        const isSelected = character.race === race;
                        return (
                          <button
                            key={race}
                            type="button"
                            onClick={() => {
                              if (onChangeRace) onChangeRace(race);
                              setIsRaceDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2 py-1.5 rounded-xs text-xs transition-colors flex flex-col ${
                              isSelected
                                ? 'bg-amber-500/20 text-amber-300 font-bold'
                                : 'text-[#ded7cb] hover:bg-[#221c17]'
                            }`}
                          >
                            <span className="flex items-center justify-between">
                              <span>{race}</span>
                              {isSelected && <span className="text-[10px] text-amber-400">✓</span>}
                            </span>
                            <span className="text-[9px] text-[#8e877a] font-normal leading-tight">
                              {prof.statBonusText}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Racial Trait Description Banner */}
            {character.raceTrait && (
              <div className="text-[11px] text-[#c9a050]/90 bg-[#1c1915]/60 border border-[#c9a050]/20 px-3 py-1 rounded-xs mb-3 max-w-md">
                <span className="font-bold text-[#eab308]">{character.raceTrait.name}:</span>{' '}
                <span className="text-[#a8a194]">{character.raceTrait.description}</span>
              </div>
            )}

            {/* Character Name in Fantasy Font */}
            <h2
              id="character-name-display"
              className="font-fantasy-name text-2xl sm:text-4xl lg:text-5xl font-bold text-[#fbf7ee] tracking-wide mb-1.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            >
              {character.name}
            </h2>

            {/* Character Title */}
            <p
              id="character-title-display"
              className="text-[#baa481] italic text-sm sm:text-base font-medium mb-3 tracking-wide font-serif-hero"
            >
              "{character.title}"
            </p>

            {/* Character Portrait */}
            <CharacterPortrait
              character={character}
              portrait={character.portrait}
              onGenerate={onGeneratePortrait || (() => {})}
              onRegenerate={onRegeneratePortrait || (() => {})}
              isGenerating={isGeneratingPortrait}
            />

            {/* Gold Filigree Divider */}
            <div className="flex items-center justify-center gap-2 w-full my-4 opacity-70">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#c9a050] to-transparent flex-1 max-w-[120px]" />
              <div className="w-2 h-2 rotate-45 border border-[#c9a050] bg-[#161412]" />
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#c9a050] to-transparent flex-1 max-w-[120px]" />
            </div>

            {/* Short Flavor Description */}
            <p
              id="character-lore-section"
              className="text-[#9e968a] text-xs sm:text-sm leading-relaxed max-w-lg mb-1"
            >
              {character.flavor}
            </p>
          </div>

          {/* =========================================================================
              EXPANDED 6-STAT ATTRIBUTES SECTION: HP, MP, STR, INT, AGI, CHA
             ========================================================================= */}
          <div
            id="player-card-combat-stats"
            className="relative z-10 mb-5 p-4 rounded-sm bg-[#12100e] border border-[#c9a050]/30 shadow-inner"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#c9a050] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#c9a050]" />
                Full 6-Attribute Stat System
              </span>
              <span className="text-[10px] text-[#736e65] uppercase tracking-wider">
                Class & Racial Scaled
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* HEALTH STAT */}
              <div
                id="stat-box-health"
                className="p-2.5 rounded-xs bg-[#191512] border border-red-900/40 flex flex-col justify-between group/stat hover:border-red-600/60 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1 text-red-400">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/20" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Health</span>
                  </div>
                  <span className="text-sm font-bold text-red-200 font-mono">
                    {character.stats.health}
                  </span>
                </div>
                <div className="w-full bg-[#2a1717] h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-gradient-to-r from-red-600 to-rose-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${hpPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[8px] text-[#827870] mt-1">
                  <span>HP Gauge</span>
                  <span>{hpPercent}%</span>
                </div>
              </div>

              {/* MANA STAT */}
              <div
                id="stat-box-mana"
                className="p-2.5 rounded-xs bg-[#191512] border border-cyan-900/40 flex flex-col justify-between group/stat hover:border-cyan-500/60 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1 text-cyan-400">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Mana</span>
                  </div>
                  <span className="text-sm font-bold text-cyan-200 font-mono">
                    {character.stats.mana}
                  </span>
                </div>
                <div className="w-full bg-[#12222d] h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-gradient-to-r from-cyan-600 to-sky-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${mpPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[8px] text-[#827870] mt-1">
                  <span>MP Pool</span>
                  <span>{mpPercent}%</span>
                </div>
              </div>

              {/* STRENGTH STAT */}
              <div
                id="stat-box-strength"
                className="p-2.5 rounded-xs bg-[#191512] border border-amber-900/40 flex flex-col justify-between group/stat hover:border-amber-500/60 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Swords className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Strength</span>
                  </div>
                  <span className="text-sm font-bold text-amber-200 font-mono">
                    {character.stats.strength}
                  </span>
                </div>
                <div className="w-full bg-[#2a2215] h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-gradient-to-r from-amber-600 to-yellow-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${strPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[8px] text-[#827870] mt-1">
                  <span>STR Power</span>
                  <span>{character.stats.strength}/100</span>
                </div>
              </div>

              {/* INTELLIGENCE STAT */}
              <div
                id="stat-box-intelligence"
                className="p-2.5 rounded-xs bg-[#191512] border border-purple-900/40 flex flex-col justify-between group/stat hover:border-purple-500/60 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1 text-purple-400">
                    <Brain className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Intelligence</span>
                  </div>
                  <span className="text-sm font-bold text-purple-200 font-mono">
                    {character.stats.intelligence}
                  </span>
                </div>
                <div className="w-full bg-[#21122a] h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-violet-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${intPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[8px] text-[#827870] mt-1">
                  <span>INT Lore</span>
                  <span>{character.stats.intelligence}/100</span>
                </div>
              </div>

              {/* AGILITY STAT */}
              <div
                id="stat-box-agility"
                className="p-2.5 rounded-xs bg-[#191512] border border-emerald-900/40 flex flex-col justify-between group/stat hover:border-emerald-500/60 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <Wind className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Agility</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-200 font-mono">
                    {character.stats.agility}
                  </span>
                </div>
                <div className="w-full bg-[#12261b] h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${agiPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[8px] text-[#827870] mt-1">
                  <span>AGI Reflex</span>
                  <span>{character.stats.agility}/100</span>
                </div>
              </div>

              {/* CHARISMA STAT */}
              <div
                id="stat-box-charisma"
                className="p-2.5 rounded-xs bg-[#191512] border border-rose-900/40 flex flex-col justify-between group/stat hover:border-rose-500/60 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1 text-rose-400">
                    <Smile className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Charisma</span>
                  </div>
                  <span className="text-sm font-bold text-rose-200 font-mono">
                    {character.stats.charisma}
                  </span>
                </div>
                <div className="w-full bg-[#2a131b] h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-gradient-to-r from-rose-600 to-pink-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${chaPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[8px] text-[#827870] mt-1">
                  <span>CHA Aura</span>
                  <span>{character.stats.charisma}/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Armament & Origin Badges */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <div className="rounded-xs border border-[#c9a050]/20 bg-[#141210] p-3 flex items-start gap-2.5">
              <div className="p-1.5 rounded-xs bg-[#1f1b17] border border-[#c9a050]/30 text-[#c9a050] shrink-0">
                <Wand2 className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9px] font-bold text-[#c9a050] uppercase tracking-wider">
                  Favored Armament
                </span>
                <span className="text-xs font-medium text-[#e8e2d8] truncate block">
                  {character.primaryWeapon}
                </span>
              </div>
            </div>

            <div className="rounded-xs border border-[#c9a050]/20 bg-[#141210] p-3 flex items-start gap-2.5">
              <div className="p-1.5 rounded-xs bg-[#1f1b17] border border-[#c9a050]/30 text-[#c9a050] shrink-0">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9px] font-bold text-[#c9a050] uppercase tracking-wider">
                  Homeland Sanctum
                </span>
                <span className="text-xs font-medium text-[#e8e2d8] truncate block">
                  {character.origin}
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              GENERATE BACKSTORY & QUEST HOOK SECTION
             ========================================================================= */}
          <div
            id="character-backstory-section"
            className="relative z-10 p-4 rounded-sm bg-[#181512] border border-[#c9a050]/35 mb-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-[#c9a050]">
                <Scroll className="w-4 h-4 text-[#eab308]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Hero Backstory & Origin
                </span>
              </div>

              {/* Action Buttons: Generate Backstory & Generate Quest Hook */}
              <div className="flex items-center gap-1.5">
                {onGenerateBackstory && (
                  <button
                    id="btn-generate-backstory"
                    data-testid="generate-backstory"
                    aria-label="Generate Backstory"
                    type="button"
                    onClick={onGenerateBackstory}
                    disabled={isGeneratingBackstory}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs border border-[#c9a050]/40 bg-[#241f19] hover:bg-[#c9a050] hover:text-[#0c0c0c] text-[#c9a050] text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer disabled:opacity-50"
                  >
                    <RotateCw className={`w-3 h-3 ${isGeneratingBackstory ? 'animate-spin' : ''}`} />
                    <span>Generate Backstory</span>
                  </button>
                )}

                {onGenerateQuestHook && (
                  <button
                    id="btn-generate-quest-hook"
                    type="button"
                    onClick={onGenerateQuestHook}
                    disabled={isGeneratingQuestHook}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs border border-amber-500/60 bg-amber-500/20 hover:bg-amber-500 hover:text-black text-amber-300 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer disabled:opacity-50"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>Quest Hook</span>
                  </button>
                )}
              </div>
            </div>

            {/* Backstory Display Box */}
            {character.backstory ? (
              <motion.div
                id="character-backstory-content"
                data-testid="character-backstory"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 p-3 rounded-xs bg-[#110f0d] border-l-2 border-[#eab308] text-xs sm:text-sm text-[#e0d8cc] leading-relaxed italic"
              >
                "{character.backstory}"
              </motion.div>
            ) : (
              <p id="character-backstory-placeholder" className="text-xs text-[#878074] italic mt-1 leading-relaxed">
                No origin tale recorded yet. Click <span className="text-[#c9a050] font-medium">"Generate Backstory"</span> to inscribe a unique one-to-two-sentence legend for {character.name}.
              </p>
            )}

            {/* Quest Hook Parchment Display (if generated) */}
            {character.questHook && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3.5 rounded-xs bg-[#1f1a14] border border-[#c9a050]/50 text-xs text-[#eedec8]"
              >
                <div className="flex items-center gap-1.5 text-[#eab308] font-bold uppercase tracking-wider mb-1 font-fantasy-name text-sm">
                  <MapPin className="w-4 h-4 text-[#eab308]" />
                  <span>Adventure: {character.questHook.title}</span>
                </div>
                <p className="text-[#d8cdbd] mb-2 leading-relaxed italic">
                  "{character.questHook.premise}"
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-2 border-t border-[#c9a050]/20 font-mono">
                  <div>
                    <span className="text-[#eab308] block uppercase">Objective:</span>
                    <span className="text-[#b5ab9d]">{character.questHook.objective}</span>
                  </div>
                  <div>
                    <span className="text-red-400 block uppercase">Peril:</span>
                    <span className="text-[#b5ab9d]">{character.questHook.danger}</span>
                  </div>
                  <div>
                    <span className="text-emerald-400 block uppercase">Bounty:</span>
                    <span className="text-[#b5ab9d]">{character.questHook.reward}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Card Action Footer */}
          <div className="relative z-10 pt-3 border-t border-[#c9a050]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[10px] text-[#736e65] uppercase tracking-widest text-center sm:text-left flex flex-col gap-0.5">
              <div>
                Inscribed Card ID: <span className="font-mono text-[#a1998c]">{character.id.slice(0, 14)}</span>
              </div>
              {(character.forgedBy || guildProfile?.username) && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[#c9a050]/80">
                  <GuildCrestIcon crest={character.guildCrest || guildProfile?.crest || 'phoenix'} className="w-3 h-3 inline shrink-0" />
                  <span className="truncate">Seal: {character.forgedBy || `${guildProfile?.username} (${guildProfile?.title})`}</span>
                </div>
              )}
            </div>

            {onSaveToDeck && (
              <button
                id="btn-save-to-deck-footer"
                data-testid="save-to-deck"
                aria-label="Save to Deck"
                type="button"
                onClick={() => onSaveToDeck(character)}
                className={`w-full sm:w-auto px-5 py-2 rounded-xs border text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  isSavedInDeck
                    ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50'
                    : 'border-[#c9a050] bg-[#221c15] text-[#c9a050] hover:bg-[#c9a050] hover:text-[#0c0c0c]'
                }`}
              >
                {isSavedInDeck ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                    <span>Save to Deck</span>
                    <span className="text-[10px] text-emerald-400 font-normal">✓ Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save to Deck</span>
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
