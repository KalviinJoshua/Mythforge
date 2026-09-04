import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GuildProfile, GuildCrest } from '../types';
import { GUILD_CRESTS, GuildCrestIcon } from './GuildCrestIcon';
import { 
  X, 
  Check, 
  Award, 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  Feather,
  RotateCcw
} from 'lucide-react';

interface GuildProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: GuildProfile;
  onSaveProfile: (updated: GuildProfile) => void;
  totalSummons: number;
  deckCount: number;
}

export const GUILD_TITLES = [
  'Grand Inscriber',
  'Master Alchemist',
  'Arch-Mage of the Crucible',
  'Keeper of the Grimoire',
  'Rune Weaver',
  'Warden of the Arcane',
  'Apprentice Transmuter',
  'Celestial Cartographer',
];

export function getGuildRank(forgedCount: number): { title: string; tier: string; minNext: number } {
  if (forgedCount < 3) {
    return { title: 'Novice Apprentice', tier: 'Initiate', minNext: 3 };
  } else if (forgedCount < 7) {
    return { title: 'Journeyman Inscriber', tier: 'Adept', minNext: 7 };
  } else if (forgedCount < 15) {
    return { title: 'Master Artificer', tier: 'Master', minNext: 15 };
  } else if (forgedCount < 30) {
    return { title: 'Grand Alchemical Regent', tier: 'Exalted', minNext: 30 };
  } else {
    return { title: 'Arch-Mage of the Crucible', tier: 'Legendary', minNext: 100 };
  }
}

export const GuildProfileModal: React.FC<GuildProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  totalSummons,
  deckCount,
}) => {
  const [username, setUsername] = useState(profile.username);
  const [title, setTitle] = useState(profile.title);
  const [crest, setCrest] = useState<GuildCrest>(profile.crest);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const rankInfo = getGuildRank(profile.totalForged + totalSummons);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = username.trim() || 'Grand Inscriber';
    const cleanTitle = title.trim() || 'Master Alchemist';
    const updated: GuildProfile = {
      ...profile,
      username: cleanName,
      title: cleanTitle,
      crest,
      totalForged: profile.totalForged + totalSummons,
    };
    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleResetToDefault = () => {
    setUsername('Master Vance');
    setTitle('Grand Inscriber');
    setCrest('phoenix');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#151210] border-2 border-[#c9a050]/60 rounded-md shadow-2xl z-10 text-[#d4cfc5] overflow-hidden arcane-card-glow"
          >
            {/* Ornate Filigree Corner Accents */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#eab308] pointer-events-none" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#eab308] pointer-events-none" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#eab308] pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#eab308] pointer-events-none" />

            {/* Header */}
            <div className="p-5 border-b border-[#c9a050]/25 bg-[#1a1714] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xs bg-[#241f1a] border border-[#c9a050]/40 text-[#c9a050]">
                  <GuildCrestIcon crest={crest} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-fantasy-name text-lg text-[#f7f2e8] tracking-wider">
                    Guild Master Registry
                  </h3>
                  <p className="text-[10px] text-[#9b9386] uppercase tracking-widest">
                    Arcanum Official Inscriber Seal
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xs border border-[#c9a050]/25 text-[#c9a050] hover:text-white hover:bg-[#c9a050]/10 transition-colors"
                aria-label="Close Guild Registry"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="p-5 space-y-5">
              {/* Guild Master Credentials Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="guild-username-input"
                    className="block text-[11px] font-bold uppercase tracking-wider text-[#c9a050] mb-1.5"
                  >
                    Inscriber Name / Username
                  </label>
                  <div className="relative">
                    <input
                      id="guild-username-input"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      maxLength={32}
                      placeholder="e.g. Master Vance"
                      required
                      className="w-full bg-[#110f0d] border border-[#c9a050]/40 rounded-xs py-2 px-3 text-sm text-[#f5efe6] font-medium focus:outline-hidden focus:border-[#eab308] focus:ring-1 focus:ring-[#eab308]/40 transition-colors"
                    />
                    <Feather className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-[#c9a050]/50 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="guild-title-select"
                    className="block text-[11px] font-bold uppercase tracking-wider text-[#c9a050] mb-1.5"
                  >
                    Official Guild Title
                  </label>
                  <select
                    id="guild-title-select"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#110f0d] border border-[#c9a050]/40 rounded-xs py-2 px-3 text-sm text-[#f5efe6] font-medium focus:outline-hidden focus:border-[#eab308] transition-colors"
                  >
                    {GUILD_TITLES.map((t) => (
                      <option key={t} value={t} className="bg-[#181512] text-[#e0d9cc]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guild Crest / Sigil Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#c9a050] mb-2">
                  Select Your Order's Crest Sigil
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {GUILD_CRESTS.map((c) => {
                    const isSelected = crest === c.id;
                    const Icon = c.icon;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCrest(c.id)}
                        className={`p-2.5 rounded-xs border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                          isSelected
                            ? 'border-[#eab308] bg-[#241e17] shadow-[0_0_12px_rgba(234,179,8,0.2)]'
                            : 'border-[#c9a050]/20 bg-[#12100e] hover:border-[#c9a050]/50 hover:bg-[#191613]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <Icon className="w-4 h-4" style={{ color: c.color }} />
                          {isSelected && <Check className="w-3 h-3 text-[#eab308]" />}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#f0ebe1] leading-tight">
                            {c.label}
                          </div>
                          <div className="text-[9px] text-[#807a71] truncate italic mt-0.5">
                            {c.motto}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guild Master Seal Preview on Cards */}
              <div className="p-3.5 rounded-xs bg-[#100e0c] border border-[#c9a050]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xs bg-[#1c1814] border border-[#c9a050]/30">
                    <GuildCrestIcon crest={crest} className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#938c7f] block">
                      Card Watermark Preview
                    </span>
                    <span className="text-xs font-bold font-fantasy-name text-[#e5ded2]">
                      Forged by {username || 'Inscriber'} • {title}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-[#eab308] font-bold block">
                    {rankInfo.tier} Tier
                  </span>
                  <span className="text-[11px] text-[#8e877a]">
                    {rankInfo.title}
                  </span>
                </div>
              </div>

              {/* Stats & Career Summary */}
              <div className="grid grid-cols-3 gap-2 text-center p-2.5 rounded-xs bg-[#191512] border border-[#c9a050]/15 text-xs">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#8a8376] block">
                    Total Summons
                  </span>
                  <span className="font-mono text-sm font-bold text-[#e5ded2]">
                    {profile.totalForged + totalSummons}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#8a8376] block">
                    Inscribed Deck
                  </span>
                  <span className="font-mono text-sm font-bold text-[#eab308]">
                    {deckCount} Cards
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#8a8376] block">
                    Guild Status
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400">
                    Active Master
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#8a8376] hover:text-[#e0d9cc] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Default</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-1.5 rounded-xs border border-[#c9a050]/30 hover:bg-[#c9a050]/10 text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-1.5 rounded-xs border border-[#eab308] bg-[#eab308] text-[#0d0c0b] hover:bg-[#facc15] text-xs uppercase tracking-wider font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    {savedSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#0d0c0b]" />
                        <span>Seal Inscribed!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Save Seal</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
