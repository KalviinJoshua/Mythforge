import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FantasyCharacter, GuildProfile } from '../types';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  FileText, 
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { downloadCharacterCardPng, exportCharacterToMarkdown } from '../utils/cardExporter';

interface CardExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: FantasyCharacter | null;
  guildProfile?: GuildProfile;
  showToast?: (msg: string) => void;
}

export const CardExporterModal: React.FC<CardExporterModalProps> = ({
  isOpen,
  onClose,
  character,
  guildProfile,
  showToast,
}) => {
  const [copiedType, setCopiedType] = useState<'md' | 'json' | null>(null);

  if (!isOpen || !character) return null;

  const handleDownloadPng = () => {
    downloadCharacterCardPng(character, guildProfile);
    showToast?.(`Downloading ${character.name} Trading Card PNG!`);
  };

  const handleCopyMarkdown = async () => {
    const md = exportCharacterToMarkdown(character, guildProfile);
    try {
      await navigator.clipboard.writeText(md);
      setCopiedType('md');
      showToast?.('Markdown Stat Block copied to clipboard!');
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      showToast?.('Could not access clipboard');
    }
  };

  const handleCopyJson = async () => {
    const jsonStr = JSON.stringify(character, null, 2);
    try {
      await navigator.clipboard.writeText(jsonStr);
      setCopiedType('json');
      showToast?.('Character JSON copied to clipboard!');
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      showToast?.('Could not access clipboard');
    }
  };

  return (
    <AnimatePresence>
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

        {/* Modal Container */}
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
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-fantasy-name text-lg text-[#f8f3ea]">
                  Export Trading Card
                </h3>
                <p className="text-[10px] text-[#938b7d] uppercase tracking-widest">
                  PNG Canvas & Tabletop Stat Blocks
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

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Card Preview Summary */}
            <div className="p-3.5 rounded-xs bg-[#1a1714] border border-[#c9a050]/25 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-[#c9a050] tracking-wider">
                  {character.race} • {character.className} ({character.rarity})
                </div>
                <div className="font-fantasy-name text-lg text-[#f5efe6]">
                  {character.name}
                </div>
                <div className="text-xs text-[#9c9486] italic">
                  "{character.title}"
                </div>
              </div>

              <div className="text-right font-mono text-xs text-[#eab308]">
                <div>HP: {character.stats.health}</div>
                <div>MP: {character.stats.mana}</div>
                <div>STR: {character.stats.strength}</div>
              </div>
            </div>

            {/* Export Actions Grid */}
            <div className="space-y-3 pt-2">
              {/* Option 1: Download High-Res PNG */}
              <button
                type="button"
                onClick={handleDownloadPng}
                className="w-full p-3.5 rounded-xs border-2 border-[#eab308] bg-linear-to-r from-[#2a2216] to-[#1c1813] hover:from-[#362b1b] hover:to-[#241e17] text-[#f8f3ea] flex items-center justify-between transition-all group shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xs bg-[#eab308]/20 border border-[#eab308] text-[#eab308]">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm text-[#f5efe6] group-hover:text-[#eab308] transition-colors">
                      Download Trading Card PNG
                    </div>
                    <div className="text-xs text-[#a39a8c]">
                      High-resolution 800x1100 card image with filigree frame & seal
                    </div>
                  </div>
                </div>
                <Download className="w-5 h-5 text-[#eab308] group-hover:translate-y-0.5 transition-transform" />
              </button>

              {/* Option 2: Copy Markdown / D&D 5e Stat Block */}
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="w-full p-3.5 rounded-xs border border-[#c9a050]/40 bg-[#191512] hover:bg-[#221c17] hover:border-[#c9a050] text-[#ded7cb] flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xs bg-[#2b241c] border border-[#c9a050]/30 text-[#c9a050]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm text-[#f5efe6]">
                      Copy Markdown / D&D Stat Block
                    </div>
                    <div className="text-xs text-[#a39a8c]">
                      Formatted markdown for Notion, Discord, Obsidian, or GM notes
                    </div>
                  </div>
                </div>
                {copiedType === 'md' ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Copy className="w-5 h-5 text-[#c9a050] group-hover:text-white transition-colors" />
                )}
              </button>

              {/* Option 3: Copy JSON */}
              <button
                type="button"
                onClick={handleCopyJson}
                className="w-full p-3.5 rounded-xs border border-[#c9a050]/40 bg-[#191512] hover:bg-[#221c17] hover:border-[#c9a050] text-[#ded7cb] flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xs bg-[#2b241c] border border-[#c9a050]/30 text-[#c9a050]">
                    <FileCode className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm text-[#f5efe6]">
                      Copy Character JSON
                    </div>
                    <div className="text-xs text-[#a39a8c]">
                      Raw data structure for VTT game imports & developer scripts
                    </div>
                  </div>
                </div>
                {copiedType === 'json' ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Copy className="w-5 h-5 text-[#c9a050] group-hover:text-white transition-colors" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
