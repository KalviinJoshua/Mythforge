import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Palette, Download, Wand2, Shield, Eye } from 'lucide-react';
import { FantasyCharacter, CharacterPortraitData } from '../types';
import { CLASS_VISUAL_PROFILES } from '../utils/portraitGenerator';

interface CharacterPortraitProps {
  character: FantasyCharacter;
  portrait?: CharacterPortraitData;
  onGenerate: () => void;
  onRegenerate: () => void;
  isGenerating?: boolean;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  character,
  portrait,
  onGenerate,
  onRegenerate,
  isGenerating = false,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [viewMode, setViewMode] = useState<'asset' | 'vector'>('asset');

  const profile = CLASS_VISUAL_PROFILES[character.className] || CLASS_VISUAL_PROFILES.Warrior;
  const currentVariant = portrait ? profile.variants[portrait.variant] || profile.variants[0] : null;

  const hasAsset = Boolean(profile.assetUrl);
  // If asset exists and user hasn't explicitly toggled to vector, show asset on variant 0 or when available
  const showAsset = hasAsset && viewMode === 'asset' && portrait?.renderedUrl;

  const handleDownload = () => {
    if (!portrait) return;
    // Download or copy acknowledgment
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    const gradient = ctx.createRadialGradient(300, 300, 50, 300, 300, 300);
    gradient.addColorStop(0, '#1c1c1e');
    gradient.addColorStop(1, '#0c0c0c');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 600);

    // Frame
    ctx.strokeStyle = '#c9a050';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 560, 560);

    // Text
    ctx.fillStyle = '#c9a050';
    ctx.font = 'bold 20px serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${character.className.toUpperCase()} • ${portrait.styleName}`, 300, 60);

    ctx.fillStyle = '#f2efea';
    ctx.font = '32px serif';
    ctx.fillText(character.name, 300, 530);

    ctx.fillStyle = '#8a8782';
    ctx.font = 'italic 16px sans-serif';
    ctx.fillText(`"${character.title}"`, 300, 560);

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${character.name.toLowerCase().replace(/\s+/g, '_')}_portrait.png`;
    link.href = dataUrl;
    link.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  return (
    <div id="character-portrait-section" className="w-full flex flex-col items-center mb-6">
      {/* Portrait Container Frame */}
      <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square rounded-sm border border-[#c9a050]/40 bg-[#121214] shadow-2xl p-2.5 overflow-hidden group">
        {/* Decorative Gold Corner Brackets */}
        <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#c9a050] pointer-events-none z-20" />
        <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#c9a050] pointer-events-none z-20" />
        <div className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#c9a050] pointer-events-none z-20" />
        <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#c9a050] pointer-events-none z-20" />

        {/* Ambient Class Rim Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 blur-xl transition-all duration-700"
          style={{ backgroundColor: profile.themeColor }}
        />

        {/* Inner Frame */}
        <div className="relative w-full h-full rounded-sm overflow-hidden bg-[#0c0c0c] border border-[#c9a050]/20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="generating"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-6 text-center z-10 space-y-3"
              >
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: `${profile.themeColor} transparent transparent transparent` }}
                  />
                  <Wand2 className="w-6 h-6 text-[#c9a050] animate-pulse" />
                </div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#c9a050] font-medium animate-pulse">
                  Forging Visage...
                </p>
                <span className="text-[10px] text-[#8a8782] italic">
                  Summoning {character.className} art
                </span>
              </motion.div>
            ) : portrait ? (
              <motion.div
                key={`${portrait.seed}-${portrait.variant}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative w-full h-full"
              >
                {/* Visual Portrait Rendering */}
                {showAsset ? (
                  <div className="relative w-full h-full">
                    <img
                      src={portrait.renderedUrl}
                      alt={`${character.name} - ${character.className} portrait`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center filter contrast-[1.05]"
                    />
                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/90 via-transparent to-black/20 pointer-events-none" />
                  </div>
                ) : (
                  /* Stylized Vector Video-Game / Cartoon Portrait */
                  <ClassVectorPortrait
                    character={character}
                    profile={profile}
                    variantIndex={portrait.variant}
                  />
                )}

                {/* Inscribed Class Banner at bottom of portrait */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0c0c0c] via-[#121214]/90 to-transparent pt-6 pb-2 px-3 text-center pointer-events-none">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#c9a050] font-semibold block drop-shadow-md">
                    {character.className} • {portrait.styleName}
                  </span>
                  <span className="text-[10px] text-[#d4cfc5] font-serif-hero italic truncate block max-w-full">
                    {portrait.gearTitle}
                  </span>
                </div>

                {/* Subtle Style Tag in top corner */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-sm bg-[#0c0c0c]/80 border border-[#c9a050]/30 backdrop-blur-xs text-[8px] uppercase tracking-wider text-[#c9a050]">
                  Variant {portrait.variant + 1}
                </div>

                {/* Toggle asset/vector if available */}
                {hasAsset && (
                  <button
                    type="button"
                    title={viewMode === 'asset' ? 'Switch to game vector style' : 'Switch to painted game art'}
                    onClick={() => setViewMode(viewMode === 'asset' ? 'vector' : 'asset')}
                    className="absolute top-2 right-2 p-1 rounded-sm bg-[#0c0c0c]/80 border border-[#c9a050]/30 text-[#c9a050] hover:text-[#f2efea] transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                )}
              </motion.div>
            ) : (
              /* Empty state before portrait is summoned */
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center p-6 text-center space-y-3"
              >
                <div className="w-16 h-16 rounded-full border border-[#c9a050]/30 flex items-center justify-center bg-[#161618] text-[#c9a050]">
                  <Palette className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-sm font-serif-hero text-[#e5e1d8] tracking-wide mb-1">
                    No Visage Inscribed
                  </h3>
                  <p className="text-[11px] text-[#8a8782] max-w-[200px] leading-relaxed">
                    Summon a cartoon video-game portrait attuned to the {character.className} class.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Button Controls: "Generate Portrait" and "Regenerate Portrait" */}
      <div className="w-full max-w-[320px] flex flex-col items-center gap-2.5 mt-3.5">
        <div className="w-full grid grid-cols-2 gap-2">
          {/* Button 1: Generate Portrait */}
          <button
            id="btn-generate-portrait"
            type="button"
            disabled={isGenerating}
            onClick={onGenerate}
            title={`Generate cartoon portrait for ${character.name}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-sm border border-[#c9a050] bg-[#c9a050]/15 hover:bg-[#c9a050] text-[#c9a050] hover:text-[#0c0c0c] text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(201,160,80,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wand2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Generate Portrait</span>
          </button>

          {/* Button 2: Regenerate Portrait */}
          <button
            id="btn-regenerate-portrait"
            type="button"
            disabled={isGenerating}
            onClick={onRegenerate}
            title="Roll alternative gear, pose, and style variant"
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-sm border border-[#c9a050]/40 bg-[#161618] hover:border-[#c9a050] hover:bg-[#c9a050]/20 text-[#e5e1d8] hover:text-[#c9a050] text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-3.5 h-3.5 shrink-0 ${isGenerating ? 'animate-spin' : ''}`} />
            <span className="truncate">Regenerate Portrait</span>
          </button>
        </div>

        {/* Supplementary Quick Actions if portrait exists */}
        {portrait && (
          <div className="flex items-center justify-between w-full px-1 text-[10px] text-[#8a8782]">
            <span className="truncate">
              Theme: <span className="text-[#c9a050]">{portrait.paletteTheme}</span>
            </span>

            <button
              id="btn-download-portrait"
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1 text-[#8a8782] hover:text-[#c9a050] transition-colors cursor-pointer"
              title="Download portrait seal"
            >
              <Download className="w-3 h-3" />
              <span>{downloadSuccess ? 'Downloaded' : 'Save'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Distinct Cartoon/Game Vector Renderer for all 10 Classes
interface ClassVectorPortraitProps {
  character: FantasyCharacter;
  profile: typeof CLASS_VISUAL_PROFILES[keyof typeof CLASS_VISUAL_PROFILES];
  variantIndex: number;
}

const ClassVectorPortrait: React.FC<ClassVectorPortraitProps> = ({ character, profile, variantIndex }) => {
  const variant = profile.variants[variantIndex] || profile.variants[0];

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial Atmospheric Background */}
          <radialGradient id={`bgGrad-${character.className}`} cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor={profile.bgGradient[0]} />
            <stop offset="60%" stopColor={profile.bgGradient[1]} />
            <stop offset="100%" stopColor={profile.bgGradient[2]} />
          </radialGradient>

          {/* Theme Gradient for Armor & Elements */}
          <linearGradient id={`themeGrad-${character.className}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={profile.secondaryColor} />
            <stop offset="100%" stopColor={profile.themeColor} />
          </linearGradient>

          {/* Gold Trim Gradient */}
          <linearGradient id="goldTrimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#c9a050" />
            <stop offset="100%" stopColor="#855818" />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Backdrop */}
        <rect width="300" height="300" fill={`url(#bgGrad-${character.className})`} />

        {/* 2. Class Background Ambient Symbols / Runes */}
        <ClassBackdropMotif className={character.className} profile={profile} />

        {/* 3. Character Silhouette & Bust (Cartoon / Video-Game Illustration) */}
        <ClassCharacterBust
          className={character.className}
          variantIndex={variantIndex}
          profile={profile}
          variant={variant}
        />

        {/* 4. Foreground Lighting & Floating Class Particles */}
        <ClassParticleOverlay particleType={variant.particleType} color={profile.themeColor} />
      </svg>
    </div>
  );
};

// Class-specific background motifs
const ClassBackdropMotif: React.FC<{
  className: string;
  profile: typeof CLASS_VISUAL_PROFILES[keyof typeof CLASS_VISUAL_PROFILES];
}> = ({ className, profile }) => {
  switch (className) {
    case 'Warrior':
      return (
        <g opacity="0.3" stroke={profile.themeColor} strokeWidth="2" fill="none">
          <circle cx="150" cy="130" r="85" strokeDasharray="6 8" />
          <path d="M100 80 L200 180 M200 80 L100 180" strokeWidth="3" />
          <polygon points="150,50 165,80 150,75 135,80" fill={profile.themeColor} />
        </g>
      );
    case 'Mage':
      return (
        <g opacity="0.4" stroke={profile.themeColor} strokeWidth="1.5" fill="none">
          <circle cx="150" cy="130" r="90" strokeDasharray="3 6" />
          <polygon points="150,45 225,175 75,175" />
          <polygon points="150,215 225,85 75,85" />
          <circle cx="150" cy="130" r="30" stroke={profile.secondaryColor} />
        </g>
      );
    case 'Rogue':
      return (
        <g opacity="0.3" stroke={profile.themeColor} strokeWidth="2" fill="none">
          <path d="M30 180 Q150 140 270 180" strokeWidth="3" />
          <circle cx="150" cy="110" r="70" strokeDasharray="8 8" />
          <path d="M150 40 L150 180" strokeDasharray="4 4" />
        </g>
      );
    case 'Paladin':
      return (
        <g opacity="0.4" stroke={profile.themeColor} strokeWidth="2" fill="none">
          <circle cx="150" cy="120" r="80" stroke="url(#goldTrimGrad)" strokeWidth="3" />
          <path d="M150 20 L150 220 M50 120 L250 120" stroke="url(#goldTrimGrad)" />
          <circle cx="150" cy="120" r="95" strokeDasharray="4 8" />
        </g>
      );
    case 'Ranger':
      return (
        <g opacity="0.35" stroke={profile.themeColor} strokeWidth="2" fill="none">
          <path d="M60 210 C100 140 120 70 150 40 C180 70 200 140 240 210" />
          <circle cx="150" cy="110" r="65" strokeDasharray="5 7" />
          <path d="M110 110 L190 110 M150 70 L150 150" />
        </g>
      );
    case 'Cleric':
      return (
        <g opacity="0.4" stroke={profile.themeColor} strokeWidth="2" fill="none">
          <circle cx="150" cy="115" r="75" stroke="url(#goldTrimGrad)" />
          <path d="M150 45 L150 185 M105 100 L195 100" strokeWidth="4" stroke="url(#goldTrimGrad)" />
          <circle cx="150" cy="115" r="88" strokeDasharray="3 6" />
        </g>
      );
    case 'Bard':
      return (
        <g opacity="0.35" stroke={profile.themeColor} strokeWidth="2" fill="none">
          <path d="M70 90 C120 50 180 150 230 100" strokeWidth="3" />
          <circle cx="100" cy="120" r="8" fill={profile.secondaryColor} />
          <circle cx="200" cy="100" r="8" fill={profile.secondaryColor} />
          <path d="M108 120 L108 80 M208 100 L208 60 M108 80 L208 60" strokeWidth="3" />
        </g>
      );
    case 'Druid':
      return (
        <g opacity="0.35" stroke={profile.themeColor} strokeWidth="2" fill="none">
          <circle cx="150" cy="120" r="75" strokeDasharray="6 6" />
          <path d="M150 50 C120 90 120 150 150 190 C180 150 180 90 150 50 Z" fill={profile.themeColor} opacity="0.2" />
          <path d="M100 160 Q150 90 200 160" />
        </g>
      );
    case 'Warlock':
      return (
        <g opacity="0.4" stroke={profile.themeColor} strokeWidth="2" fill="none">
          <circle cx="150" cy="120" r="80" strokeDasharray="4 8" />
          <polygon points="150,40 170,105 240,110 185,150 205,215 150,175 95,215 115,150 60,110 130,105" />
          <circle cx="150" cy="120" r="25" fill={profile.secondaryColor} opacity="0.3" />
        </g>
      );
    case 'Monk':
      return (
        <g opacity="0.35" stroke={profile.themeColor} strokeWidth="2" fill="none">
          <circle cx="150" cy="120" r="80" />
          <path d="M150 40 C194 40 194 120 150 120 C106 120 106 200 150 200" strokeWidth="3" />
          <circle cx="150" cy="80" r="8" fill={profile.themeColor} />
          <circle cx="150" cy="160" r="8" fill={profile.secondaryColor} />
        </g>
      );
    default:
      return null;
  }
};

// Detailed Cartoon / Video-Game Character Head & Bust
const ClassCharacterBust: React.FC<{
  className: string;
  variantIndex: number;
  profile: typeof CLASS_VISUAL_PROFILES[keyof typeof CLASS_VISUAL_PROFILES];
  variant: typeof CLASS_VISUAL_PROFILES[keyof typeof CLASS_VISUAL_PROFILES]['variants'][0];
}> = ({ className, variantIndex, profile }) => {
  return (
    <g id="character-bust-group">
      {/* Shoulder Armor & Torso */}
      <ClassTorsoArmor className={className} profile={profile} variantIndex={variantIndex} />

      {/* Neck & Jaw */}
      <path d="M132 155 L132 175 C132 185 168 185 168 175 L168 155 Z" fill="#d4aa88" />

      {/* Face Base */}
      <path
        d="M110 115 C110 80 190 80 190 115 C190 160 168 178 150 178 C132 178 110 160 110 115 Z"
        fill="#e5be9e"
        stroke="#966b4f"
        strokeWidth="1.5"
      />

      {/* Facial Shading / Cel Shadow */}
      <path
        d="M175 105 C175 145 160 172 150 175 C165 170 185 145 185 110 Z"
        fill="#cca385"
        opacity="0.6"
      />

      {/* Ears */}
      <path d="M106 120 C100 115 100 135 108 132 Z" fill="#dcae8e" />
      <path d="M194 120 C200 115 200 135 192 132 Z" fill="#dcae8e" />

      {/* Eyes & Brows */}
      <ClassFaceFeatures className={className} profile={profile} variantIndex={variantIndex} />

      {/* Nose & Mouth */}
      <path d="M148 132 L152 142 L146 144" stroke="#8a5a3a" strokeWidth="1.5" fill="none" />
      <path d="M142 154 Q150 157 158 154" stroke="#75482b" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Headgear & Hair */}
      <ClassHeadgearHair className={className} profile={profile} variantIndex={variantIndex} />

      {/* Weapon peeking over shoulder */}
      <ClassShoulderWeapon className={className} profile={profile} variantIndex={variantIndex} />
    </g>
  );
};

// Torso / Armor Rendering for each class
const ClassTorsoArmor: React.FC<{
  className: string;
  profile: typeof CLASS_VISUAL_PROFILES[keyof typeof CLASS_VISUAL_PROFILES];
  variantIndex: number;
}> = ({ className, profile }) => {
  switch (className) {
    case 'Warrior':
      return (
        <g>
          {/* Heavy Steel Breastplate */}
          <path
            d="M80 230 C80 185 110 170 150 170 C190 170 220 185 220 230 L230 300 L70 300 Z"
            fill="#374151"
            stroke="#1f2937"
            strokeWidth="2"
          />
          {/* Left Pauldron */}
          <path
            d="M60 215 C60 175 105 175 105 210 C105 240 65 245 60 215 Z"
            fill="#4b5563"
            stroke="#9ca3af"
            strokeWidth="2"
          />
          {/* Right Pauldron */}
          <path
            d="M240 215 C240 175 195 175 195 210 C195 240 235 245 240 215 Z"
            fill="#4b5563"
            stroke="#9ca3af"
            strokeWidth="2"
          />
          {/* Lion Crest / Gold Trim */}
          <polygon points="150,190 162,210 150,225 138,210" fill="url(#goldTrimGrad)" />
          <path d="M110 200 L190 200" stroke="#f59e0b" strokeWidth="2" />
        </g>
      );
    case 'Mage':
      return (
        <g>
          {/* Astral High Collar Robe */}
          <path
            d="M75 225 C85 175 115 165 150 165 C185 165 215 175 225 225 L235 300 L65 300 Z"
            fill="#1e1b4b"
            stroke="#4338ca"
            strokeWidth="2"
          />
          {/* High Silk Lapels */}
          <polygon points="110,165 85,210 120,210" fill="#3730a3" stroke="#818cf8" />
          <polygon points="190,165 215,210 180,210" fill="#3730a3" stroke="#818cf8" />
          {/* Glowing Arcane Mana Amulet */}
          <circle cx="150" cy="205" r="10" fill="#38bdf8" filter="url(#softGlow)" />
          <circle cx="150" cy="205" r="6" fill="#ffffff" />
        </g>
      );
    case 'Rogue':
      return (
        <g>
          {/* Studded Shadow Leather */}
          <path
            d="M80 220 C85 175 115 168 150 168 C185 168 215 175 220 220 L230 300 L70 300 Z"
            fill="#18181b"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          {/* Crossed Throwing Dagger Bandolier */}
          <path d="M90 185 L210 260" stroke="#52525b" strokeWidth="7" />
          <rect x="135" y="210" width="8" height="18" fill="#10b981" rx="2" />
          <rect x="155" y="222" width="8" height="18" fill="#10b981" rx="2" />
        </g>
      );
    case 'Paladin':
      return (
        <g>
          {/* Radiant Solar Full Plate */}
          <path
            d="M75 225 C80 175 110 168 150 168 C190 168 220 175 225 225 L235 300 L65 300 Z"
            fill="#d97706"
            stroke="url(#goldTrimGrad)"
            strokeWidth="2.5"
          />
          {/* Winged Solar Pauldrons */}
          <path d="M60 215 C60 170 100 175 105 210 Z" fill="url(#goldTrimGrad)" />
          <path d="M240 215 C240 170 200 175 195 210 Z" fill="url(#goldTrimGrad)" />
          {/* Holy Sun Cross Emblazoned */}
          <path d="M150 185 L150 240 M130 205 L170 205" stroke="#fef08a" strokeWidth="4" />
        </g>
      );
    case 'Ranger':
      return (
        <g>
          {/* Elk-Leather Sylvan Mantle */}
          <path
            d="M80 225 C85 175 115 168 150 168 C185 168 215 175 220 225 L230 300 L70 300 Z"
            fill="#166534"
            stroke="#15803d"
            strokeWidth="2"
          />
          {/* Quiver Strap & Leaf Buckle */}
          <path d="M210 180 L90 270" stroke="#78350f" strokeWidth="6" />
          <circle cx="150" cy="225" r="7" fill="#84cc16" />
        </g>
      );
    case 'Cleric':
      return (
        <g>
          {/* Sacred Vestments & Silver Rosary */}
          <path
            d="M80 225 C85 175 115 165 150 165 C185 165 215 175 220 225 L230 300 L70 300 Z"
            fill="#9f1239"
            stroke="url(#goldTrimGrad)"
            strokeWidth="2"
          />
          {/* Scapular with Silver Cross */}
          <rect x="135" y="180" width="30" height="90" fill="#f43f5e" stroke="url(#goldTrimGrad)" />
          <path d="M150 195 L150 230 M140 208 L160 208" stroke="#ffffff" strokeWidth="3" />
        </g>
      );
    case 'Bard':
      return (
        <g>
          {/* Frilled Cravat & Velvet Doublet */}
          <path
            d="M80 225 C85 175 115 165 150 165 C185 165 215 175 220 225 L230 300 L70 300 Z"
            fill="#581c87"
            stroke="#c084fc"
            strokeWidth="2"
          />
          {/* Frilly White Cravat */}
          <path d="M135 170 C135 205 165 205 165 170 Z" fill="#ffffff" />
          <circle cx="150" cy="195" r="4" fill="#fbbf24" />
        </g>
      );
    case 'Druid':
      return (
        <g>
          {/* Bear Fur & Runic Vine Harness */}
          <path
            d="M75 225 C80 175 110 165 150 165 C190 165 220 175 225 225 L235 300 L65 300 Z"
            fill="#115e59"
            stroke="#0f766e"
            strokeWidth="2"
          />
          {/* Fur Collar */}
          <path d="M70 190 Q150 210 230 190 Q150 230 70 190" fill="#78350f" />
        </g>
      );
    case 'Warlock':
      return (
        <g>
          {/* Nether Robes with Void Horns */}
          <path
            d="M75 225 C80 175 110 165 150 165 C190 165 220 175 225 225 L235 300 L65 300 Z"
            fill="#3b0764"
            stroke="#a855f7"
            strokeWidth="2"
          />
          {/* Spiked Dark Pauldrons */}
          <polygon points="60,200 90,175 100,215" fill="#1e1b4b" stroke="#a855f7" />
          <polygon points="240,200 210,175 200,215" fill="#1e1b4b" stroke="#a855f7" />
        </g>
      );
    case 'Monk':
      return (
        <g>
          {/* Saffron Wrap & Prayer Beads */}
          <path
            d="M80 225 C85 175 115 165 150 165 C185 165 215 175 220 225 L230 300 L70 300 Z"
            fill="#c2410c"
            stroke="#ea580c"
            strokeWidth="2"
          />
          {/* Asymmetrical Shoulder Wrap */}
          <path d="M120 170 L215 250 L200 270 L110 185 Z" fill="#f97316" />
          {/* Big Prayer Beads */}
          <circle cx="120" cy="180" r="5" fill="#78350f" />
          <circle cx="132" cy="195" r="5" fill="#78350f" />
          <circle cx="147" cy="207" r="5" fill="#78350f" />
          <circle cx="163" cy="216" r="5" fill="#78350f" />
        </g>
      );
    default:
      return null;
  }
};

// Expressive Facial Eyes & Features
const ClassFaceFeatures: React.FC<{
  className: string;
  profile: typeof CLASS_VISUAL_PROFILES[keyof typeof CLASS_VISUAL_PROFILES];
  variantIndex: number;
}> = ({ className, profile }) => {
  const isGlowing = ['Mage', 'Warlock', 'Paladin'].includes(className);

  return (
    <g>
      {/* Left Brow */}
      <path d="M122 112 Q132 108 142 113" stroke="#452a1a" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right Brow */}
      <path d="M158 113 Q168 108 178 112" stroke="#452a1a" strokeWidth="2.5" strokeLinecap="round" />

      {/* Left Eye */}
      <ellipse cx="132" cy="122" rx="6" ry="4" fill="#ffffff" stroke="#5a3825" strokeWidth="1" />
      <circle cx="133" cy="122" r="3.2" fill={isGlowing ? profile.themeColor : '#2e1c10'} />
      {isGlowing && <circle cx="133" cy="122" r="1.5" fill="#ffffff" />}

      {/* Right Eye */}
      <ellipse cx="168" cy="122" rx="6" ry="4" fill="#ffffff" stroke="#5a3825" strokeWidth="1" />
      <circle cx="167" cy="122" r="3.2" fill={isGlowing ? profile.themeColor : '#2e1c10'} />
      {isGlowing && <circle cx="167" cy="122" r="1.5" fill="#ffffff" />}

      {/* Class Specific War Paint / Glow Marks */}
      {className === 'Warrior' && (
        <path d="M125 128 L122 142 M175 128 L178 142" stroke="#dc2626" strokeWidth="2" />
      )}
      {className === 'Druid' && (
        <path d="M128 132 Q135 140 128 148 M172 132 Q165 140 172 148" stroke="#10b981" strokeWidth="2" />
      )}
      {className === 'Monk' && (
        <g fill="#ea580c">
          <circle cx="145" cy="100" r="1.5" />
          <circle cx="150" cy="100" r="1.5" />
          <circle cx="155" cy="100" r="1.5" />
        </g>
      )}
    </g>
  );
};

// Class Headgear & Hair
const ClassHeadgearHair: React.FC<{
  className: string;
  profile: typeof CLASS_VISUAL_PROFILES[keyof typeof CLASS_VISUAL_PROFILES];
  variantIndex: number;
}> = ({ className, profile, variantIndex }) => {
  switch (className) {
    case 'Warrior':
      if (variantIndex % 2 === 0) {
        // Winged Knight Barbute
        return (
          <g>
            <path d="M105 105 C105 50 195 50 195 105 L190 120 L110 120 Z" fill="#4b5563" stroke="#9ca3af" strokeWidth="2" />
            <polygon points="150,30 160,65 140,65" fill="#ef4444" />
            {/* Wing Flanges */}
            <path d="M100 80 L75 55 L105 65" fill="url(#goldTrimGrad)" />
            <path d="M200 80 L225 55 L195 65" fill="url(#goldTrimGrad)" />
          </g>
        );
      }
      // Spiky Berserker Crest & Horns
      return (
        <g>
          <path d="M105 90 Q150 40 195 90" stroke="#b91c1c" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M110 80 Q90 50 85 30 M190 80 Q210 50 215 30" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
        </g>
      );
    case 'Mage':
      // Pointed Arcane Wizard Hood
      return (
        <g>
          <path
            d="M95 120 C95 70 120 20 150 10 C180 20 205 70 205 120 C205 120 185 95 150 95 C115 95 95 120 95 120 Z"
            fill="#1e1b4b"
            stroke="#818cf8"
            strokeWidth="2"
          />
          {/* Gold Trim Brow */}
          <path d="M105 105 Q150 95 195 105" stroke="url(#goldTrimGrad)" strokeWidth="3" fill="none" />
          <circle cx="150" cy="98" r="4" fill="#38bdf8" />
        </g>
      );
    case 'Rogue':
      // Assassin Hood & Half Mask
      return (
        <g>
          <path
            d="M100 125 C95 70 125 50 150 50 C175 50 205 70 200 125 C190 100 170 90 150 90 C130 90 110 100 100 125 Z"
            fill="#09090b"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          {/* Shadow Lower Face Mask */}
          <path d="M120 145 C120 175 180 175 180 145 L150 155 Z" fill="#18181b" stroke="#27272a" />
        </g>
      );
    case 'Paladin':
      // Radiant Winged Crown / Solar Halo
      return (
        <g>
          <circle cx="150" cy="115" r="65" stroke="url(#goldTrimGrad)" strokeWidth="3" fill="none" strokeDasharray="6 4" />
          <polygon points="150,60 160,85 175,70 170,95 130,95 125,70 140,85" fill="url(#goldTrimGrad)" stroke="#b45309" />
          {/* Heroic Blonde/Platinum Hair */}
          <path d="M105 100 C105 75 195 75 195 100" stroke="#fef08a" strokeWidth="8" fill="none" />
        </g>
      );
    case 'Ranger':
      // Feathered Sylvan Archer Hood
      return (
        <g>
          <path
            d="M100 120 C100 65 125 55 150 55 C175 55 200 65 200 120 C190 95 170 85 150 85 C130 85 110 95 100 120 Z"
            fill="#14532d"
            stroke="#22c55e"
            strokeWidth="1.5"
          />
          {/* Hawk Feather */}
          <path d="M185 85 Q220 50 230 30" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
          <path d="M185 85 Q218 52 228 32" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case 'Cleric':
      // Consecrated Mitre / Halo
      return (
        <g>
          <polygon points="150,30 185,95 115,95" fill="#e11d48" stroke="url(#goldTrimGrad)" strokeWidth="2" />
          <path d="M150 45 L150 80 M135 60 L165 60" stroke="url(#goldTrimGrad)" strokeWidth="3" />
        </g>
      );
    case 'Bard':
      // Feathered Cavalier Beret
      return (
        <g>
          <path d="M85 95 C85 65 215 65 215 95 C215 110 85 110 85 95 Z" fill="#581c87" stroke="#c084fc" strokeWidth="2" />
          {/* Giant Peacock Plume */}
          <path d="M190 85 Q240 40 235 15" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />
          <circle cx="235" cy="18" r="4" fill="#38bdf8" />
        </g>
      );
    case 'Druid':
      // Stag Antlers
      return (
        <g>
          {/* Left Antler */}
          <path d="M125 80 Q100 40 80 25 M105 55 L85 65 M95 45 L80 40" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          {/* Right Antler */}
          <path d="M175 80 Q200 40 220 25 M195 55 L215 65 M205 45 L220 40" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          {/* Ivy Leaf Crown */}
          <path d="M110 95 Q150 85 190 95" stroke="#22c55e" strokeWidth="4" fill="none" />
        </g>
      );
    case 'Warlock':
      // Curved Nether Horns
      return (
        <g>
          <path d="M115 85 C95 50 65 50 60 70 C75 75 90 80 110 95" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2" />
          <path d="M185 85 C205 50 235 50 240 70 C225 75 210 80 190 95" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2" />
          {/* Floating Occult Diadem */}
          <circle cx="150" cy="85" r="5" fill="#a855f7" filter="url(#softGlow)" />
        </g>
      );
    case 'Monk':
      // Forehead Meditation Band / Topknot
      return (
        <g>
          <circle cx="150" cy="65" r="14" fill="#18181b" />
          <path d="M108 100 Q150 92 192 100" stroke="#ea580c" strokeWidth="5" fill="none" />
        </g>
      );
    default:
      return null;
  }
};

// Signature Shoulder Weapon / Prop
const ClassShoulderWeapon: React.FC<{
  className: string;
  profile: typeof CLASS_VISUAL_PROFILES[keyof typeof CLASS_VISUAL_PROFILES];
  variantIndex: number;
}> = ({ className }) => {
  switch (className) {
    case 'Warrior':
      // Broadsword Crossguard & Hilt
      return (
        <g>
          <path d="M205 160 L260 215" stroke="#9ca3af" strokeWidth="12" strokeLinecap="round" />
          <path d="M200 185 L235 150" stroke="url(#goldTrimGrad)" strokeWidth="6" strokeLinecap="round" />
          <circle cx="195" cy="190" r="5" fill="#ef4444" />
        </g>
      );
    case 'Mage':
      // Glowing Crystal Staff Tip
      return (
        <g>
          <path d="M60 240 L85 140" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
          <polygon points="85,140 75,120 95,115 105,135" fill="#38bdf8" filter="url(#softGlow)" />
          <circle cx="90" cy="125" r="4" fill="#ffffff" />
        </g>
      );
    case 'Rogue':
      // Poison Dagger Pommel
      return (
        <g>
          <path d="M220 180 L250 150" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
          <circle cx="255" cy="145" r="4" fill="#34d399" filter="url(#softGlow)" />
        </g>
      );
    case 'Paladin':
      // Sunblade Hilt
      return (
        <g>
          <path d="M210 170 L260 220" stroke="url(#goldTrimGrad)" strokeWidth="10" strokeLinecap="round" />
          <circle cx="205" cy="165" r="6" fill="#fef08a" filter="url(#softGlow)" />
        </g>
      );
    case 'Ranger':
      // Recurve Bow Limb
      return (
        <g>
          <path d="M65 240 C55 180 75 130 90 90" stroke="#854d0e" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M65 240 L90 90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3 3" />
        </g>
      );
    case 'Cleric':
      // Holy Relic Scepter
      return (
        <g>
          <path d="M215 170 L245 130" stroke="url(#goldTrimGrad)" strokeWidth="6" strokeLinecap="round" />
          <circle cx="250" cy="125" r="8" fill="#f43f5e" />
        </g>
      );
    case 'Bard':
      // Gilded Lute Peghead
      return (
        <g>
          <path d="M65 230 L85 150" stroke="#78350f" strokeWidth="8" strokeLinecap="round" />
          <rect x="75" y="140" width="18" height="12" fill="url(#goldTrimGrad)" rx="2" />
        </g>
      );
    case 'Druid':
      // Living Briar Staff
      return (
        <g>
          <path d="M215 240 Q230 170 225 120" stroke="#713f12" strokeWidth="6" fill="none" strokeLinecap="round" />
          <circle cx="225" cy="115" r="5" fill="#22c55e" filter="url(#softGlow)" />
        </g>
      );
    case 'Warlock':
      // Floating Occult Nether Orb
      return (
        <g>
          <circle cx="75" cy="140" r="10" fill="#a855f7" filter="url(#softGlow)" />
          <circle cx="75" cy="140" r="5" fill="#fbcfe8" />
        </g>
      );
    case 'Monk':
      // Bo Staff
      return (
        <g>
          <path d="M60 250 L95 110" stroke="#92400e" strokeWidth="6" strokeLinecap="round" />
          <circle cx="95" cy="110" r="4" fill="url(#goldTrimGrad)" />
        </g>
      );
    default:
      return null;
  }
};

// Atmospheric particle overlays
const ClassParticleOverlay: React.FC<{
  particleType: string;
  color: string;
}> = ({ color }) => {
  return (
    <g opacity="0.6">
      <circle cx="60" cy="80" r="2" fill={color} filter="url(#softGlow)" />
      <circle cx="230" cy="110" r="2.5" fill={color} filter="url(#softGlow)" />
      <circle cx="90" cy="220" r="1.8" fill={color} />
      <circle cx="210" cy="230" r="2.2" fill={color} />
      <circle cx="150" cy="40" r="1.5" fill="#fef08a" />
    </g>
  );
};
