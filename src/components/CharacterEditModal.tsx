import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FantasyCharacter } from '../types';
import { 
  X, 
  Edit3, 
  Save, 
  Sparkles, 
  Feather, 
  ShieldCheck, 
  Flame
} from 'lucide-react';

interface CharacterEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: FantasyCharacter | null;
  onSave: (updated: FantasyCharacter) => void;
}

export const CharacterEditModal: React.FC<CharacterEditModalProps> = ({
  isOpen,
  onClose,
  character,
  onSave,
}) => {
  const [name, setName] = useState(character?.name || '');
  const [title, setTitle] = useState(character?.title || '');
  const [primaryWeapon, setPrimaryWeapon] = useState(character?.primaryWeapon || '');
  const [backstory, setBackstory] = useState(character?.backstory || character?.flavor || '');

  React.useEffect(() => {
    if (character) {
      setName(character.name);
      setTitle(character.title);
      setPrimaryWeapon(character.primaryWeapon);
      setBackstory(character.backstory || character.flavor || '');
    }
  }, [character, isOpen]);

  if (!isOpen || !character) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...character,
      name: name.trim() || character.name,
      title: title.trim() || character.title,
      primaryWeapon: primaryWeapon.trim() || character.primaryWeapon,
      backstory: backstory.trim(),
      isCustomBackstory: true,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-[#14120f] border-2 border-[#c9a050] rounded-md shadow-2xl z-10 text-[#ded7cb] overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-[#c9a050]/30 bg-[#1b1713] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xs bg-[#241e17] border border-[#c9a050]/40 text-[#eab308]">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-fantasy-name text-lg text-[#f8f3ea]">
                  Inscriber's Quill (Edit Hero)
                </h3>
                <p className="text-[10px] text-[#938b7d] uppercase tracking-widest">
                  Customize Attributes Before Sealing
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xs border border-[#c9a050]/25 text-[#c9a050] hover:text-white hover:bg-[#c9a050]/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#c9a050] mb-1.5">
                Character Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#1b1713] border border-[#c9a050]/40 rounded-xs text-[#f5efe6] font-fantasy-name text-base focus:border-[#eab308] focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#c9a050] mb-1.5">
                  Epithet Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1b1713] border border-[#c9a050]/40 rounded-xs text-[#ded7cb] text-xs focus:border-[#eab308] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#c9a050] mb-1.5">
                  Primary Armament
                </label>
                <input
                  type="text"
                  value={primaryWeapon}
                  onChange={(e) => setPrimaryWeapon(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1b1713] border border-[#c9a050]/40 rounded-xs text-[#ded7cb] text-xs focus:border-[#eab308] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#c9a050] mb-1.5">
                Chronicled Backstory
              </label>
              <textarea
                rows={4}
                value={backstory}
                onChange={(e) => setBackstory(e.target.value)}
                className="w-full px-3 py-2 bg-[#1b1713] border border-[#c9a050]/40 rounded-xs text-[#ded7cb] text-xs leading-relaxed focus:border-[#eab308] focus:outline-hidden resize-none font-serif"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xs border border-[#c9a050]/30 text-[#9c9486] hover:text-white text-xs uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xs border-2 border-[#eab308] bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Inscription</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
