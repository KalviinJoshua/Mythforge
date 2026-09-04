import React from 'react';
import {
  Swords,
  Wand2,
  Zap,
  ShieldCheck,
  Compass,
  Sparkles,
  Music,
  Leaf,
  Flame,
  Target,
  Shield
} from 'lucide-react';

interface CharacterIconProps {
  iconName: string;
  className?: string;
}

export const CharacterIcon: React.FC<CharacterIconProps> = ({ iconName, className = 'w-6 h-6' }) => {
  switch (iconName) {
    case 'Swords':
      return <Swords className={className} />;
    case 'Wand2':
      return <Wand2 className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Music':
      return <Music className={className} />;
    case 'Leaf':
      return <Leaf className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'Target':
      return <Target className={className} />;
    default:
      return <Shield className={className} />;
  }
};
