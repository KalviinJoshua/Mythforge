import React from 'react';
import { Flame, Shield, Eye, Feather, Skull, Zap } from 'lucide-react';
import { GuildCrest } from '../types';

interface GuildCrestIconProps {
  crest: GuildCrest;
  className?: string;
}

export const GUILD_CRESTS: Array<{
  id: GuildCrest;
  label: string;
  motto: string;
  color: string;
  icon: typeof Flame;
}> = [
  {
    id: 'phoenix',
    label: 'Order of the Phoenix',
    motto: 'From Ash, Reborn into Glory',
    color: '#f59e0b',
    icon: Flame,
  },
  {
    id: 'dragon',
    label: 'Draconic Sovereignty',
    motto: 'Strength Unyielding, Pride Eternal',
    color: '#ef4444',
    icon: Shield,
  },
  {
    id: 'wolf',
    label: 'Lunar Wolfpack',
    motto: 'Vigilant in Darkness, United in Hunt',
    color: '#38bdf8',
    icon: Zap,
  },
  {
    id: 'raven',
    label: 'Corvid Spire',
    motto: 'Whispers of Fate, Secrets of the Arcane',
    color: '#a855f7',
    icon: Feather,
  },
  {
    id: 'serpent',
    label: 'Emerald Ouroboros',
    motto: 'Ancient Wisdom, Endless Transformation',
    color: '#10b981',
    icon: Skull,
  },
  {
    id: 'eye',
    label: 'All-Seeing Crucible',
    motto: 'Truth Piercing the Celestial Veil',
    color: '#eab308',
    icon: Eye,
  },
];

export const GuildCrestIcon: React.FC<GuildCrestIconProps> = ({ crest, className = 'w-4 h-4' }) => {
  const match = GUILD_CRESTS.find((c) => c.id === crest) || GUILD_CRESTS[0];
  const Icon = match.icon;
  return <Icon className={className} style={{ color: match.color }} />;
};
