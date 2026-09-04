import React from 'react';

export const AlchemistWorkbenchBg: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Dark stained aged wood planks effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12100e] via-[#0e0d0c] to-[#070605] opacity-95" />

      {/* Wooden plank separation lines */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_bottom,transparent_0px,#000_1px,transparent_2px,#c9a050_3px,transparent_4px)] bg-[size:100%_120px]" />

      {/* Fine table grain pattern */}
      <div className="absolute inset-0 opacity-15 alchemist-desk-texture" />

      {/* Ancient Inscribed Transmutation Circles (Etched into the workbench) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 opacity-[0.06] pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-[#d4af37] fill-none stroke-[0.75]">
          <circle cx="100" cy="100" r="90" strokeDasharray="3,3" />
          <circle cx="100" cy="100" r="78" />
          <polygon points="100,22 168,139 32,139" />
          <polygon points="100,178 32,61 168,61" />
          <circle cx="100" cy="100" r="45" />
          <circle cx="100" cy="100" r="20" />
          <line x1="10" y1="100" x2="190" y2="100" />
          <line x1="100" y1="10" x2="100" y2="190" />
        </svg>
      </div>

      <div className="absolute -bottom-36 -right-36 w-[480px] h-[480px] opacity-[0.05] pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full stroke-[#d4af37] fill-none stroke-[0.75]">
          <circle cx="100" cy="100" r="95" />
          <circle cx="100" cy="100" r="82" strokeDasharray="4,2" />
          <polygon points="100,18 182,100 100,182 18,100" />
          <circle cx="100" cy="100" r="58" />
          <polygon points="100,42 150,129 50,129" />
          <circle cx="100" cy="100" r="28" />
        </svg>
      </div>

      {/* Ambient Candlelight / Alchemical Flask Glows */}
      {/* Top Left: Warm Candle Glow */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-[radial-gradient(circle,rgba(245,158,11,0.09)_0%,transparent_70%)] filter blur-2xl" />

      {/* Center Workbench Illumination */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-[radial-gradient(ellipse,rgba(217,119,6,0.06)_0%,transparent_70%)] filter blur-3xl" />

      {/* Bottom Right: Mystic Cyan Flask Glow */}
      <div className="absolute bottom-6 right-8 w-80 h-80 bg-[radial-gradient(circle,rgba(14,165,233,0.05)_0%,transparent_70%)] filter blur-2xl" />

      {/* Workbench Edge Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)] pointer-events-none" />
    </div>
  );
};
