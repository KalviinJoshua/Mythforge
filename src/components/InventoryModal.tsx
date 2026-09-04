import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FantasyCharacter, InventoryItem, ItemCategory, CardRarity } from '../types';
import { 
  canEquipItem, 
  calculateCarryWeight, 
  calculateMaxCarryCapacity, 
  calculateInventoryGoldValue 
} from '../utils/inventory';
import { 
  X, 
  Coins, 
  Backpack, 
  Swords, 
  Shield, 
  Sparkles, 
  FlaskConical, 
  Check, 
  Trash2, 
  Plus, 
  Minus, 
  Weight, 
  ShieldCheck, 
  PlusCircle,
  Gem
} from 'lucide-react';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: FantasyCharacter | null;
  onToggleEquip: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
  onChangeQuantity: (itemId: string, newQty: number) => void;
  onUpdateGold: (newGold: number) => void;
  onAddItem: (item: InventoryItem) => void;
}

const RARITY_BADGES: Record<CardRarity, { border: string; bg: string; text: string; glow: string }> = {
  Common: { 
    border: 'border-zinc-500/40', 
    bg: 'bg-zinc-800/40', 
    text: 'text-zinc-300', 
    glow: 'shadow-zinc-500/10' 
  },
  Uncommon: { 
    border: 'border-emerald-500/50', 
    bg: 'bg-emerald-950/40', 
    text: 'text-emerald-300', 
    glow: 'shadow-emerald-500/20' 
  },
  Rare: { 
    border: 'border-sky-500/50', 
    bg: 'bg-sky-950/40', 
    text: 'text-sky-300', 
    glow: 'shadow-sky-500/20' 
  },
  Epic: { 
    border: 'border-purple-500/50', 
    bg: 'bg-purple-950/40', 
    text: 'text-purple-300', 
    glow: 'shadow-purple-500/20' 
  },
  Legendary: { 
    border: 'border-amber-500/70', 
    bg: 'bg-amber-950/50', 
    text: 'text-amber-300', 
    glow: 'shadow-amber-500/30' 
  },
  Mythic: { 
    border: 'border-rose-500/80', 
    bg: 'bg-rose-950/60', 
    text: 'text-rose-300', 
    glow: 'shadow-rose-500/40' 
  },
};

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  character,
  onToggleEquip,
  onRemoveItem,
  onChangeQuantity,
  onUpdateGold,
  onAddItem,
}) => {
  const [activeCategory, setActiveCategory] = useState<ItemCategory | 'all'>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // New item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ItemCategory>('weapon');
  const [newItemRarity, setNewItemRarity] = useState<CardRarity>('Common');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemValue, setNewItemValue] = useState(25);
  const [newItemWeight, setNewItemWeight] = useState(2);

  if (!isOpen || !character) return null;

  const inventory = character.inventory || [];
  const gold = character.gold ?? 0;
  const currentWeight = calculateCarryWeight(inventory);
  const maxCapacity = calculateMaxCarryCapacity(character.stats.strength);
  const totalValue = calculateInventoryGoldValue(inventory);
  const totalItemsCount = inventory.reduce((sum, item) => sum + item.quantity, 0);

  const filteredItems = inventory.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const item: InventoryItem = {
      id: `item_custom_${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      rarity: newItemRarity,
      description: newItemDesc.trim() || 'A forged piece of adventurer equipment.',
      quantity: 1,
      equipped: false,
      value: Math.max(0, newItemValue),
      weight: Math.max(0, newItemWeight),
      iconName: newItemCategory === 'weapon' ? 'Swords' : newItemCategory === 'armor' ? 'Shield' : 'Sparkles',
    };

    onAddItem(item);
    setNewItemName('');
    setNewItemDesc('');
    setShowAddForm(false);
  };

  const getCategoryIcon = (category: ItemCategory) => {
    switch (category) {
      case 'weapon':
        return <Swords className="w-3.5 h-3.5 text-red-400" />;
      case 'armor':
        return <Shield className="w-3.5 h-3.5 text-blue-400" />;
      case 'accessory':
        return <Gem className="w-3.5 h-3.5 text-purple-400" />;
      case 'artifact':
        return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
      case 'consumable':
        return <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xs"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative w-full max-w-4xl bg-[#14120f] border-2 border-[#c9a050]/60 rounded-md shadow-[0_0_50px_rgba(0,0,0,0.85)] z-10 text-[#ded7cb] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Decorative Corner Borders */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#eab308] pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#eab308] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#eab308] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#eab308] pointer-events-none" />

          {/* Header */}
          <div className="p-4 sm:p-5 bg-radial from-[#241c13] to-[#14120f] border-b border-[#c9a050]/30 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-sm bg-[#1e1913] border border-[#eab308]/40 text-[#eab308] shadow-inner">
                <Backpack className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-fantasy-name text-xl sm:text-2xl text-[#f7f2e8] tracking-wide flex items-center gap-2">
                  <span>Adventurer&apos;s Vault</span>
                  <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {character.name}
                  </span>
                </h3>
                <p className="text-xs text-[#9d9282] mt-0.5">
                  Manage arms, protective mail, mystic baubles, and alchemical potions.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(!showAddForm)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-[#c9a050]/50 bg-[#211a12] text-amber-300 hover:bg-[#2b2218] hover:border-amber-400 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Inscribe Item</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xs border border-[#c9a050]/30 text-[#baa481] hover:text-white hover:bg-[#c9a050]/20 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar: Gold, Weight, Total Items, Worth */}
          <div className="px-4 sm:px-5 py-3 bg-[#171410] border-b border-[#c9a050]/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs shrink-0">
            {/* Gold Balance */}
            <div className="p-2 rounded-xs bg-[#110f0c] border border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <Coins className="w-4 h-4 text-[#eab308]" />
                <span>Gold Pouch:</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-mono text-sm font-bold text-amber-300">{gold}</span>
                <span className="text-[10px] text-amber-400/70">GP</span>
                <button
                  type="button"
                  onClick={() => onUpdateGold(gold + 25)}
                  title="Add 25 GP"
                  className="ml-1 text-[10px] px-1 rounded-xs bg-amber-500/20 hover:bg-amber-500/40 text-amber-200 border border-amber-500/30 cursor-pointer"
                >
                  +25
                </button>
              </div>
            </div>

            {/* Carry Weight */}
            <div className="p-2 rounded-xs bg-[#110f0c] border border-[#c9a050]/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#baa481]">
                <Weight className="w-4 h-4 text-[#baa481]" />
                <span>Carry Weight:</span>
              </div>
              <div className="font-mono font-semibold">
                <span className={currentWeight > maxCapacity ? 'text-red-400 font-bold' : 'text-[#f5efe6]'}>
                  {currentWeight}
                </span>
                <span className="text-[#8e8474]"> / {maxCapacity} lbs</span>
              </div>
            </div>

            {/* Total Items */}
            <div className="p-2 rounded-xs bg-[#110f0c] border border-[#c9a050]/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#baa481]">
                <Backpack className="w-4 h-4 text-[#baa481]" />
                <span>Total Items:</span>
              </div>
              <div className="font-mono font-semibold text-[#f5efe6]">
                {totalItemsCount} <span className="text-[10px] text-[#8e8474]">({inventory.length} stacks)</span>
              </div>
            </div>

            {/* Total Vault Value */}
            <div className="p-2 rounded-xs bg-[#110f0c] border border-[#c9a050]/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#baa481]">
                <Sparkles className="w-4 h-4 text-[#eab308]" />
                <span>Vault Value:</span>
              </div>
              <div className="font-mono font-semibold text-amber-300">
                {totalValue} <span className="text-[10px] text-amber-400/70">GP</span>
              </div>
            </div>
          </div>

          {/* Add Item Drawer (Collapsible) */}
          {showAddForm && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleCreateItem}
              className="p-4 bg-[#1a1510] border-b border-[#c9a050]/30 space-y-3 shrink-0"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <PlusCircle className="w-3.5 h-3.5" />
                  Inscribe New Item into Vault
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs text-[#8e8474] hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div>
                  <label className="block text-[#a89d8d] mb-1 font-semibold">Item Name</label>
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="e.g. Moonforged Dagger"
                    className="w-full px-2.5 py-1.5 rounded-xs bg-[#100e0b] border border-[#c9a050]/40 text-[#f5efe6] focus:border-amber-400 outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#a89d8d] mb-1 font-semibold">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as ItemCategory)}
                    className="w-full px-2.5 py-1.5 rounded-xs bg-[#100e0b] border border-[#c9a050]/40 text-[#f5efe6] focus:border-amber-400 outline-hidden"
                  >
                    <option value="weapon">Weapon</option>
                    <option value="armor">Armor</option>
                    <option value="accessory">Accessory</option>
                    <option value="consumable">Consumable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#a89d8d] mb-1 font-semibold">Rarity</label>
                  <select
                    value={newItemRarity}
                    onChange={(e) => setNewItemRarity(e.target.value as CardRarity)}
                    className="w-full px-2.5 py-1.5 rounded-xs bg-[#100e0b] border border-[#c9a050]/40 text-[#f5efe6] focus:border-amber-400 outline-hidden"
                  >
                    <option value="Common">Common</option>
                    <option value="Uncommon">Uncommon</option>
                    <option value="Rare">Rare</option>
                    <option value="Epic">Epic</option>
                    <option value="Legendary">Legendary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-[#a89d8d] mb-1 font-semibold">Description</label>
                  <input
                    type="text"
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    placeholder="Lore or physical appearance..."
                    className="w-full px-2.5 py-1.5 rounded-xs bg-[#100e0b] border border-[#c9a050]/40 text-[#f5efe6] focus:border-amber-400 outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#a89d8d] mb-1 font-semibold">Value (GP)</label>
                    <input
                      type="number"
                      min="0"
                      value={newItemValue}
                      onChange={(e) => setNewItemValue(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-xs bg-[#100e0b] border border-[#c9a050]/40 text-[#f5efe6] font-mono focus:border-amber-400 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[#a89d8d] mb-1 font-semibold">Weight (lbs)</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={newItemWeight}
                      onChange={(e) => setNewItemWeight(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-xs bg-[#100e0b] border border-[#c9a050]/40 text-[#f5efe6] font-mono focus:border-amber-400 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xs bg-[#eab308] hover:bg-[#facc15] text-[#14120f] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Confirm Inscription
                </button>
              </div>
            </motion.form>
          )}

          {/* Category Filter Tabs */}
          <div className="px-4 sm:px-5 py-2.5 bg-[#12100d] border-b border-[#c9a050]/20 flex flex-wrap items-center gap-1.5 shrink-0">
            {(['all', 'weapon', 'armor', 'accessory', 'artifact', 'consumable'] as const).map((cat) => {
              const count = cat === 'all' 
                ? inventory.length 
                : inventory.filter((i) => i.category === cat).length;

              const isSelected = activeCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-xs text-xs font-semibold capitalize tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60 shadow-xs'
                      : 'bg-[#181511] text-[#9a8f7e] border border-transparent hover:border-[#c9a050]/30 hover:text-[#e4dbc9]'
                  }`}
                >
                  {cat !== 'all' && getCategoryIcon(cat)}
                  <span>{cat === 'all' ? 'All Items' : `${cat}s`}</span>
                  <span className="text-[10px] opacity-75 font-mono">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Items Grid (Scrollable) */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3 min-h-[260px]">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-[#8e8474] flex flex-col items-center justify-center space-y-2">
                <Backpack className="w-10 h-10 text-[#4a4237] stroke-[1.5]" />
                <p className="font-fantasy-name text-base text-[#baa481]">No items found in this section</p>
                <p className="text-xs max-w-sm text-[#7e7465]">
                  Your pouches are bare of this category. Inscribe custom equipment or forge new items to fill your vault.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredItems.map((item) => {
                  const rarityStyle = RARITY_BADGES[item.rarity] || RARITY_BADGES.Common;
                  const canEquip = canEquipItem(item);

                  return (
                    <div
                      key={item.id}
                      className={`relative p-3.5 rounded-sm bg-[#181410] border ${
                        item.equipped ? 'border-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.25)]' : rarityStyle.border
                      } flex flex-col justify-between transition-all hover:bg-[#1f1a14]`}
                    >
                      {/* Top Row: Category Icon, Name, Rarity Badge */}
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-xs bg-[#110f0c] border border-[#c9a050]/25">
                              {getCategoryIcon(item.category)}
                            </div>
                            <div>
                              <h4 className="font-fantasy-name text-sm text-[#f7f2e8] font-bold leading-tight">
                                {item.name}
                              </h4>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] uppercase font-bold tracking-wider text-[#9d9282]">
                                  {item.category}
                                </span>
                                <span className="text-[10px] text-[#554d41]">•</span>
                                <span
                                  className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.2 rounded-xs border ${rarityStyle.border} ${rarityStyle.bg} ${rarityStyle.text}`}
                                >
                                  {item.rarity}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Equipped Tag */}
                          {item.equipped && (
                            <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/60 shadow-xs">
                              <ShieldCheck className="w-3 h-3 text-amber-400" />
                              Equipped
                            </span>
                          )}
                        </div>

                        {/* Item Description */}
                        <p className="text-xs text-[#9d9282] italic leading-relaxed my-2">
                          {item.description}
                        </p>

                        {/* Special Effect (if present) */}
                        {item.specialEffect && (
                          <div className="mb-2 p-1.5 rounded-xs bg-[#22172b]/50 border border-purple-500/30 text-[11px] text-purple-300 flex items-start gap-1.5">
                            <Sparkles className="w-3 h-3 text-purple-400 shrink-0 mt-0.5" />
                            <span>{item.specialEffect}</span>
                          </div>
                        )}

                        {/* Stat Modifiers (if any) */}
                        {item.statModifiers && Object.keys(item.statModifiers).length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {Object.entries(item.statModifiers).map(([stat, val]) => (
                              <span
                                key={stat}
                                className="text-[10px] px-1.5 py-0.5 rounded-xs bg-[#110f0c] border border-emerald-500/30 text-emerald-400 font-mono font-semibold"
                              >
                                +{val} {stat.toUpperCase()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Row: Weight, Value, Quantity, Equip/Discard Controls */}
                      <div className="pt-2.5 border-t border-[#c9a050]/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2.5 font-mono text-[11px] text-[#8e8474]">
                          <span title="Item Weight" className="flex items-center gap-0.5">
                            <Weight className="w-3 h-3 text-[#baa481]" />
                            {item.weight} lbs
                          </span>
                          <span title="Gold Value" className="flex items-center gap-0.5 text-amber-400">
                            <Coins className="w-3 h-3 text-amber-400" />
                            {item.value} GP
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5">
                          {/* Quantity adjustments */}
                          <div className="flex items-center bg-[#110f0c] border border-[#c9a050]/25 rounded-xs px-1">
                            <button
                              type="button"
                              onClick={() => onChangeQuantity(item.id, item.quantity - 1)}
                              title="Decrease Quantity"
                              className="p-1 text-[#8e8474] hover:text-white cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-amber-200 px-1.5">
                              x{item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onChangeQuantity(item.id, item.quantity + 1)}
                              title="Increase Quantity"
                              className="p-1 text-[#8e8474] hover:text-white cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Equip / Unequip Toggle */}
                          {canEquip ? (
                            <button
                              type="button"
                              onClick={() => onToggleEquip(item.id)}
                              className={`px-2.5 py-1 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                                item.equipped
                                  ? 'bg-[#2a2216] text-amber-300 border border-amber-500/60 hover:bg-[#382b1a]'
                                  : 'bg-[#1b1713] text-[#cfc5b4] border border-[#c9a050]/35 hover:border-amber-400 hover:text-white'
                              }`}
                            >
                              {item.equipped ? 'Unequip' : 'Equip'}
                            </button>
                          ) : (
                            item.category === 'consumable' && (
                              <button
                                type="button"
                                onClick={() => {
                                  // Consume one item
                                  onRemoveItem(item.id);
                                }}
                                className="px-2 py-1 rounded-xs text-[11px] font-semibold uppercase tracking-wider bg-emerald-950/40 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60 transition-colors cursor-pointer"
                                title="Consume 1 portion"
                              >
                                Use
                              </button>
                            )
                          )}

                          {/* Remove / Discard */}
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            title="Discard Item"
                            className="p-1.5 rounded-xs text-[#7e7465] hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3.5 bg-[#14110e] border-t border-[#c9a050]/30 flex items-center justify-between shrink-0">
            <div className="text-[11px] text-[#8e8474] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Equipped weapons and armor automatically calibrate your hero profile.</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-1.5 rounded-xs bg-[#c9a050] hover:bg-[#dab365] text-[#12100e] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Vault
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
