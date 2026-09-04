import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dices, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Layers, 
  BookmarkCheck, 
  History, 
  BookOpen, 
  Trash2, 
  ShieldCheck, 
  User,
  Swords,
  Download,
  Edit3
} from 'lucide-react';
import { FantasyCharacter, GuildProfile, CharacterRaceType } from './types';
import { generateRandomCharacter, updateCharacterRace, generateQuestHook } from './data/characterData';
import { CharacterCard } from './components/CharacterCard';
import { CharacterIcon } from './components/CharacterIcon';
import { generateCharacterPortrait } from './utils/portraitGenerator';
import { generateCharacterBackstory } from './utils/backstoryGenerator';
import { AlchemistWorkbenchBg } from './components/AlchemistWorkbenchBg';
import { MagicalParticles } from './components/MagicalParticles';
import { MyDeckDrawer } from './components/MyDeckDrawer';
import { GuildProfileModal } from './components/GuildProfileModal';
import { GuildCrestIcon } from './components/GuildCrestIcon';
import { ArenaDuelModal } from './components/ArenaDuelModal';
import { CardExporterModal } from './components/CardExporterModal';
import { CharacterEditModal } from './components/CharacterEditModal';

const DECK_STORAGE_KEY = 'fantasy_character_deck_v1';
const GUILD_STORAGE_KEY = 'fantasy_guild_profile_v1';

const DEFAULT_GUILD_PROFILE: GuildProfile = {
  username: 'Master Vance',
  title: 'Grand Inscriber',
  crest: 'phoenix',
  level: 1,
  totalForged: 0,
  joinedAt: Date.now(),
};

export default function App() {
  const [guildProfile, setGuildProfile] = useState<GuildProfile>(() => {
    try {
      const saved = localStorage.getItem(GUILD_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_GUILD_PROFILE;
    } catch {
      return DEFAULT_GUILD_PROFILE;
    }
  });

  const [character, setCharacter] = useState<FantasyCharacter | null>(() => {
    const initialChar = generateRandomCharacter();
    initialChar.portrait = generateCharacterPortrait(initialChar.className);
    initialChar.forgedBy = `${DEFAULT_GUILD_PROFILE.username} • ${DEFAULT_GUILD_PROFILE.title}`;
    initialChar.guildCrest = DEFAULT_GUILD_PROFILE.crest;
    return initialChar;
  });

  const [history, setHistory] = useState<FantasyCharacter[]>(() => (character ? [character] : []));
  const [deck, setDeck] = useState<FantasyCharacter[]>(() => {
    try {
      const saved = localStorage.getItem(DECK_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [isArenaOpen, setIsArenaOpen] = useState(false);
  const [isExporterOpen, setIsExporterOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
  const [isGeneratingQuestHook, setIsGeneratingQuestHook] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [totalSummons, setTotalSummons] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Sync deck to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
    } catch {
      // Storage quota or restriction fallback
    }
  }, [deck]);

  // Toast notification helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  }, []);

  // Web Audio chime for dice roll
  const playRollSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx) {
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.18); // A5

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(440, now); // A4
        osc2.frequency.exponentialRampToValueAtTime(659.25, now + 0.22); // E5

        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.35);
        osc2.stop(now + 0.35);
      }
    } catch {
      // Safely ignore
    }
  }, [soundEnabled]);

  // Mystical arpeggio for portrait summon
  const playPortraitSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx) {
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.05, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.4);
        });
      }
    } catch {
      // Safely ignore
    }
  }, [soundEnabled]);

  // Gentle parchment whisper chime for backstory generation
  const playBackstorySound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx) {
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const notes = [659.25, 880, 1174.66]; // E5, A5, D6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.04, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.45);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.45);
        });
      }
    } catch {
      // Safely ignore
    }
  }, [soundEnabled]);

  // Primary summon handler
  const handleGenerate = useCallback(() => {
    setIsRolling(true);
    playRollSound();

    setTimeout(() => {
      const newCharacter = generateRandomCharacter();
      newCharacter.portrait = generateCharacterPortrait(newCharacter.className);
      newCharacter.forgedBy = `${guildProfile.username} • ${guildProfile.title}`;
      newCharacter.guildCrest = guildProfile.crest;
      // Leave backstory empty until user clicks "Generate Backstory"
      setCharacter(newCharacter);
      setHistory((prev) => [newCharacter, ...prev.slice(0, 4)]);
      setTotalSummons((count) => count + 1);
      setIsRolling(false);
    }, 150);
  }, [playRollSound, guildProfile]);

  // Handler for "Generate Portrait"
  const handleGeneratePortrait = useCallback(() => {
    if (!character || isGeneratingPortrait) return;
    setIsGeneratingPortrait(true);
    playPortraitSound();

    setTimeout(() => {
      const portrait = generateCharacterPortrait(character.className);
      const updated = { ...character, portrait };
      setCharacter(updated);
      setHistory((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setDeck((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setIsGeneratingPortrait(false);
    }, 280);
  }, [character, isGeneratingPortrait, playPortraitSound]);

  // Handler for "Regenerate Portrait"
  const handleRegeneratePortrait = useCallback(() => {
    if (!character || isGeneratingPortrait) return;
    setIsGeneratingPortrait(true);
    playPortraitSound();

    setTimeout(() => {
      const portrait = generateCharacterPortrait(character.className, character.portrait?.variant);
      const updated = { ...character, portrait };
      setCharacter(updated);
      setHistory((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setDeck((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setIsGeneratingPortrait(false);
    }, 280);
  }, [character, isGeneratingPortrait, playPortraitSound]);

  // Handler for "Generate Backstory"
  const handleGenerateBackstory = useCallback(() => {
    if (!character || isGeneratingBackstory) return;
    setIsGeneratingBackstory(true);
    playBackstorySound();

    setTimeout(() => {
      const backstory = generateCharacterBackstory(character);
      const updated = { ...character, backstory };
      setCharacter(updated);
      setHistory((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setDeck((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setIsGeneratingBackstory(false);
      showToast('New origin backstory inscribed!');
    }, 250);
  }, [character, isGeneratingBackstory, playBackstorySound, showToast]);

  // Handler for Race Modification
  const handleChangeRace = useCallback((newRace: CharacterRaceType) => {
    if (!character) return;
    const updated = updateCharacterRace(character, newRace);
    setCharacter(updated);
    setHistory((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
    setDeck((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
    showToast(`Ancestry transmuted to ${newRace}!`);
  }, [character, showToast]);

  // Handler for "Generate Quest Hook"
  const handleGenerateQuestHook = useCallback(() => {
    if (!character || isGeneratingQuestHook) return;
    setIsGeneratingQuestHook(true);
    playBackstorySound();

    setTimeout(() => {
      const questHook = generateQuestHook(character);
      const updated = { ...character, questHook };
      setCharacter(updated);
      setHistory((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setDeck((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setIsGeneratingQuestHook(false);
      showToast(`Quest hook inscribed: "${questHook.title}"!`);
    }, 250);
  }, [character, isGeneratingQuestHook, playBackstorySound, showToast]);

  // Handler for saving customized character
  const handleSaveEditedCharacter = useCallback((updated: FantasyCharacter) => {
    setCharacter(updated);
    setHistory((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setDeck((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showToast(`Character parchment rewritten for ${updated.name}!`);
  }, [showToast]);

  // Handler for "Save to Deck"
  const handleSaveToDeck = useCallback((charToSave: FantasyCharacter) => {
    setDeck((prev) => {
      const exists = prev.some((c) => c.id === charToSave.id);
      if (exists) {
        showToast(`Updated "${charToSave.name}" in My Deck`);
        return prev.map((c) => (c.id === charToSave.id ? charToSave : c));
      }
      showToast(`Saved "${charToSave.name}" to My Deck!`);
      return [charToSave, ...prev];
    });
  }, [showToast]);

  const handleRemoveFromDeck = useCallback((id: string) => {
    setDeck((prev) => prev.filter((c) => c.id !== id));
    showToast('Hero removed from deck');
  }, [showToast]);

  const handleClearDeck = useCallback(() => {
    if (window.confirm('Are you sure you wish to clear all cards from My Deck?')) {
      setDeck([]);
      showToast('All cards cleared from My Deck');
    }
  }, [showToast]);

  // Guild Master Profile save handler
  const handleSaveProfile = useCallback((updated: GuildProfile) => {
    setGuildProfile(updated);
    try {
      localStorage.setItem(GUILD_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage fallback
    }
    showToast(`Guild seal inscribed for ${updated.username}!`);
  }, [showToast]);

  // Initialize summon counter on mount
  useEffect(() => {
    setTotalSummons((prev) => (prev === 0 ? 1 : prev));
  }, []);

  const isCurrentSaved = character ? deck.some((c) => c.id === character.id) : false;

  return (
    <main
      id="fantasy-app-main"
      className="min-h-screen bg-alchemist-workbench text-[#d4cfc5] flex flex-col justify-between p-4 sm:p-8 md:p-10 relative overflow-x-hidden selection:bg-[#c9a050]/20 selection:text-[#f2efea]"
    >
      {/* Ancient Alchemist's Workbench Textured Canvas & Candlelight */}
      <AlchemistWorkbenchBg />

      {/* Subtle Floating Magical Particles Effect */}
      <MagicalParticles count={22} />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto w-full flex flex-col items-center">
        {/* Top Header & Navigation Bar */}
        <header className="w-full mb-6 sm:mb-8 relative">
          <div className="flex items-center justify-between w-full mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#eab308] animate-pulse" />
              <p className="text-[#c9a050] uppercase tracking-[0.35em] text-xs font-semibold">
                Alchemist's Crucible
              </p>
            </div>

            {/* Top Right Controls: Profile, "My Deck" Button & Sound Toggle */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Guild Master Profile Button */}
              <button
                id="btn-open-guild-profile"
                type="button"
                onClick={() => setIsProfileOpen(true)}
                className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-sm border border-[#c9a050]/40 bg-[#1e1b17] hover:bg-[#28221b] hover:border-[#eab308] text-[#c9a050] text-xs font-bold transition-all shadow-xs cursor-pointer group"
                title="Guild Master Inscriber Profile & Registry"
              >
                <div className="p-0.5 rounded-xs bg-[#100e0c] border border-[#c9a050]/30 text-[#eab308]">
                  <GuildCrestIcon crest={guildProfile.crest} className="w-3.5 h-3.5" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-[11px] font-bold font-fantasy-name text-[#f5efe6] group-hover:text-[#eab308] transition-colors leading-none truncate max-w-[110px]">
                    {guildProfile.username}
                  </div>
                  <div className="text-[8px] text-[#9c9486] uppercase tracking-wider leading-none mt-0.5">
                    {guildProfile.title}
                  </div>
                </div>
                <span className="sm:hidden text-xs">Profile</span>
              </button>

              <button
                id="btn-open-deck"
                type="button"
                onClick={() => setIsDeckOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#c9a050]/40 bg-[#1f1b17] hover:bg-[#c9a050] hover:text-[#0c0c0c] text-[#c9a050] text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                title="View saved heroes in My Deck"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>My Deck</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#c9a050]/20 text-[#eab308] border border-[#c9a050]/40 font-mono">
                  {deck.length}
                </span>
              </button>

              <button
                id="btn-toggle-sound"
                onClick={() => setSoundEnabled((v) => !v)}
                className="p-1.5 rounded-sm border border-[#c9a050]/25 text-[#c9a050] hover:text-[#f2efea] hover:bg-[#c9a050]/10 transition-colors"
                title={soundEnabled ? 'Mute audio' : 'Enable audio'}
                aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="text-center">
            <h1
              id="app-main-title"
              className="text-3xl sm:text-5xl font-bold tracking-wider text-[#f5efe6] font-fantasy-name drop-shadow-md mb-2"
            >
              Character Architect
            </h1>
            <div className="flex items-center justify-center gap-2 max-w-xs mx-auto mb-2 opacity-80">
              <div className="h-[1px] bg-gradient-to-r from-transparent to-[#c9a050] flex-1" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#c9a050]" />
              <div className="h-[1px] bg-gradient-to-l from-transparent to-[#c9a050] flex-1" />
            </div>
            <p className="text-[#968f82] text-xs sm:text-sm tracking-wide max-w-md mx-auto leading-relaxed">
              Transmute random fantasy adventurers onto the alchemical workbench with player cards, custom stats, and unique origin chronicles.
            </p>
          </div>
        </header>

        {/* Re-formatted Bordered Player Card Display */}
        <section className="w-full mb-6">
          <CharacterCard
            character={character}
            isRolling={isRolling}
            onGeneratePortrait={handleGeneratePortrait}
            onRegeneratePortrait={handleRegeneratePortrait}
            isGeneratingPortrait={isGeneratingPortrait}
            onGenerateBackstory={handleGenerateBackstory}
            isGeneratingBackstory={isGeneratingBackstory}
            onSaveToDeck={handleSaveToDeck}
            isSavedInDeck={isCurrentSaved}
            guildProfile={guildProfile}
            onChangeRace={handleChangeRace}
            onGenerateQuestHook={handleGenerateQuestHook}
            isGeneratingQuestHook={isGeneratingQuestHook}
            onOpenExporter={() => setIsExporterOpen(true)}
            onOpenArena={() => setIsArenaOpen(true)}
            onOpenEdit={() => setIsEditOpen(true)}
          />
        </section>

        {/* Primary Action Button: "Invoke New Hero" */}
        <footer className="w-full flex flex-col items-center space-y-4">
          <motion.button
            id="btn-generate-character"
            type="button"
            onClick={handleGenerate}
            disabled={isRolling}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="group relative px-10 sm:px-14 py-4 bg-[#1e1a16] border-2 border-[#eab308] text-[#eab308] uppercase tracking-[0.3em] text-xs font-bold hover:bg-[#eab308] hover:text-[#0d0c0b] transition-all duration-300 rounded-sm cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.45)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
            <span>Transmute New Hero</span>
            <Sparkles className="w-3.5 h-3.5 opacity-80 group-hover:rotate-12 transition-transform" />
          </motion.button>

          <p className="text-[10px] text-[#6d665a] uppercase tracking-widest text-center">
            Forged on the Alchemist's Workbench
            {totalSummons > 0 && ` • ${totalSummons} Transmuted`}
          </p>
        </footer>

        {/* =========================================================================
            "MY DECK" SAVED CHARACTERS LIST SECTION
           ========================================================================= */}
        <section
          id="my-deck"
          data-testid="my-deck"
          aria-label="My Deck"
          className="w-full mt-10 pt-6 border-t border-[#c9a050]/25"
        >
          <div className="flex items-center justify-between mb-3 text-[#c9a050] text-[10px] font-bold tracking-[0.25em] uppercase">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#eab308]" />
              <h2 className="text-sm font-bold tracking-wider text-[#f5efe6] font-fantasy-name">My Deck</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#c9a050]/20 text-[#eab308] border border-[#c9a050]/40 font-mono">
                {deck.length} {deck.length === 1 ? 'Hero' : 'Heroes'}
              </span>
            </div>
            {deck.length > 0 && (
              <button
                type="button"
                onClick={() => setIsDeckOpen(true)}
                className="text-[10px] text-[#c9a050] hover:text-[#f3efea] uppercase tracking-wider underline cursor-pointer"
              >
                Open Grimoire Drawer
              </button>
            )}
          </div>

          {deck.length === 0 ? (
            <div className="p-4 rounded-sm border border-[#c9a050]/20 bg-[#151210] text-center">
              <p className="text-xs text-[#878074] italic">
                Your deck is currently empty. Click <span className="text-[#c9a050] font-medium">"Save to Deck"</span> on any character card above to add them to your <strong className="text-[#eab308]">My Deck</strong> collection.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="my-deck-cards-list">
              {deck.map((hero) => (
                <div
                  key={hero.id}
                  id={`deck-item-${hero.id}`}
                  data-testid="my-deck-item"
                  className={`p-3 rounded-sm border transition-all flex items-center justify-between gap-2.5 ${
                    hero.id === character?.id
                      ? 'border-[#eab308] bg-[#221c15] shadow-sm'
                      : 'border-[#c9a050]/30 bg-[#161411] hover:border-[#c9a050]/60 hover:bg-[#1c1814]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded-sm border border-[#c9a050]/30 bg-[#100e0c] text-[#c9a050] shrink-0">
                      <CharacterIcon iconName={hero.iconName} className="w-4 h-4 text-[#c9a050]" />
                    </div>
                    <div className="min-w-0 truncate">
                      <div className="text-sm font-fantasy-name text-[#f0ebe1] truncate">
                        {hero.name}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-[#8e887e] flex items-center gap-1.5 flex-wrap">
                        <span>{hero.className}</span>
                        <span>•</span>
                        <span className="text-red-400 font-mono">{hero.stats.health} HP</span>
                        <span>•</span>
                        <span className="text-cyan-400 font-mono">{hero.stats.mana} MP</span>
                        <span>•</span>
                        <span className="text-amber-400 font-mono">{hero.stats.strength} STR</span>
                      </div>
                      {hero.forgedBy && (
                        <div className="text-[9px] text-[#8e877a] flex items-center gap-1 mt-0.5 truncate">
                          <GuildCrestIcon crest={hero.guildCrest || 'phoenix'} className="w-2.5 h-2.5 shrink-0" />
                          <span className="truncate">Seal: {hero.forgedBy}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setCharacter(hero)}
                      className="px-2.5 py-1 rounded-xs border border-[#c9a050]/40 bg-[#1f1b16] hover:bg-[#c9a050] hover:text-[#0c0c0c] text-[#c9a050] text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                      title="Inspect hero in player card"
                    >
                      Inspect
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveFromDeck(hero.id)}
                      className="p-1 text-[#837c73] hover:text-red-400 transition-colors cursor-pointer"
                      title="Remove from My Deck"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent Summons (Archived Transmutations) */}
        {history.length > 1 && (
          <section
            id="summon-history-section"
            aria-label="Recent summons"
            className="w-full mt-10 pt-6 border-t border-[#c9a050]/20"
          >
            <div className="flex items-center justify-between mb-3 text-[#c9a050] text-[10px] font-bold tracking-[0.25em] uppercase">
              <div className="flex items-center gap-2">
                <History className="w-3.5 h-3.5 text-[#c9a050]" />
                <span>Recent Workbench Inscriptions</span>
              </div>
              <span className="text-[#7d766b] text-[9px]">Last 4 Summoned</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {history.slice(1).map((item) => (
                <button
                  key={item.id}
                  id={`history-item-${item.id}`}
                  onClick={() => setCharacter(item)}
                  type="button"
                  className="flex items-center justify-between p-3 rounded-sm border border-[#c9a050]/20 bg-[#171412] hover:border-[#c9a050]/50 hover:bg-[#1f1b18] text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="p-1.5 rounded-sm border border-[#c9a050]/30 bg-[#12100e] text-[#c9a050] shrink-0">
                      <CharacterIcon iconName={item.iconName} className="w-3.5 h-3.5 text-[#c9a050]" />
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-fantasy-name text-[#e5e1d8] group-hover:text-[#c9a050] transition-colors truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-[#8a8782] flex items-center gap-1.5">
                        <span>{item.className}</span>
                        <span>•</span>
                        <span className="text-red-400 font-mono">{item.stats.health} HP</span>
                        <span>•</span>
                        <span className="text-cyan-400 font-mono">{item.stats.mana} MP</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#c9a050]/80 group-hover:text-[#c9a050] shrink-0 ml-2">
                    Inspect
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xs border border-[#c9a050] bg-[#1a1714] text-[#e8e2d5] shadow-2xl text-xs font-semibold tracking-wide flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#eab308]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guild Master Profile & Registry Modal */}
      <GuildProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={guildProfile}
        onSaveProfile={handleSaveProfile}
        totalSummons={totalSummons}
        deckCount={deck.length}
      />

      {/* Slide-out "My Deck" Drawer */}
      <MyDeckDrawer
        isOpen={isDeckOpen}
        onClose={() => setIsDeckOpen(false)}
        deck={deck}
        activeCharacterId={character?.id}
        onSelectCharacter={(chosen) => setCharacter(chosen)}
        onRemoveFromDeck={handleRemoveFromDeck}
        onClearDeck={handleClearDeck}
      />

      {/* Turn-Based Arena Boss Duel Modal */}
      <ArenaDuelModal
        isOpen={isArenaOpen}
        onClose={() => setIsArenaOpen(false)}
        character={character}
        soundEnabled={soundEnabled}
        onVictory={(boss) => showToast(`Victory achieved over ${boss}!`)}
      />

      {/* Trading Card PNG & D&D Stat Block Exporter Modal */}
      <CardExporterModal
        isOpen={isExporterOpen}
        onClose={() => setIsExporterOpen(false)}
        character={character}
        guildProfile={guildProfile}
        showToast={showToast}
      />

      {/* Character Inscriber & Customizer Modal */}
      <CharacterEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        character={character}
        onSave={handleSaveEditedCharacter}
      />

      {/* Footer subtext */}
      <footer className="relative z-10 w-full text-center mt-12 pt-6 text-[10px] text-[#554f46] uppercase tracking-[0.25em]">
        The Ancient Alchemist's Workbench • Player Card Grimoire • Transmutation Engine
      </footer>
    </main>
  );
}
