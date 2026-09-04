import React, { useMemo } from 'react';

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export const MagicalParticles: React.FC<{ count?: number }> = ({ count = 18 }) => {
  const particles = useMemo<Particle[]>(() => {
    const colors = [
      'rgba(245, 158, 11, 0.75)', // amber
      'rgba(251, 191, 36, 0.85)', // gold
      'rgba(56, 189, 248, 0.65)', // starlight cyan
      'rgba(168, 85, 247, 0.55)', // arcane purple
      'rgba(244, 63, 94, 0.5)',   // mystic ruby
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * (100 / count) + Math.random() * 8) % 96 + 2}%`,
      top: `${(i * 17) % 85 + 10}%`,
      size: Math.random() * 3.5 + 2,
      duration: Math.random() * 5 + 4.5,
      delay: Math.random() * 4,
      color: colors[i % colors.length],
    }));
  }, [count]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full pointer-events-none filter blur-[0.4px]"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2.5}px ${p.color}`,
            animation: `float-sparkle ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
