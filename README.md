# ⚔️ Fantasy Character Generator & Alchemist's Grimoire

An interactive, high-fantasy hero forge and trading card studio built with React 18, TypeScript, Tailwind CSS, and `motion/react`. Step into an **Ancient Alchemist's Workbench** to transmute legendary adventurers, roll 6-attribute combat stat blocks, inscribe origin lore, export collectible cards, and battle dungeon bosses in a turn-based arena.

---

## 🌟 Comprehensive Feature Highlights

### 1. 🕯️ Ancient Alchemist Workbench Aesthetic
* **Atmospheric Canvas**: Dark textured woodgrain surface with subtle candlelight amber glows and floating alchemical motes.
* **Ornate Player Card Framing**: Authentic trading card borders adorned with gilded filigree corner brackets and arcane glow accents.
* **Cinematic Fantasy Typography**: Paired with `Cinzel Decorative` and `Uncial Antiqua` for hero names, `Cormorant Garamond` for italicized titles, and crisp sans typography for combat readouts.

### 2. 🛡️ Guild Master Profile & Inscriber Registry
* **Inscriber Identity**: Personalize your Guild Master username and heraldic inscriber title (e.g., *Grand Inscriber*, *Arch-Mage*, *Runelord*).
* **Guild Crest Selection**: Choose from 6 heraldic seals — Phoenix, Dragon, Gryphon, Wolf, Crown, or Skull.
* **Alchemical Seal Stamping**: Every hero forged on your workbench is permanently stamped with your Guild seal and username.
* **Alchemist Milestones**: Tracks total hero transmutations and cards currently preserved in your deck grimoire.

### 3. 🧝 Deep RPG Ancestry & Race System
* **10 Diverse Fantasy Races**:
  1. **Human**: Versatile adaptors (+All Stats) with *Versatile Ingenuity*.
  2. **High Elf**: Arcane savants (+MP, +INT) with *Arcane Ancestry*.
  3. **Mountain Dwarf**: Hardy defenders (+HP, +STR) with *Stonecunning*.
  4. **Tiefling**: Fiendish warlocks (+MP, +CHA) with *Hellfire Legacy*.
  5. **Dragonborn**: Draconic champions (+HP, +STR, +CHA) with *Elemental Breath*.
  6. **Wood Elf**: Silent rangers (+AGI, +INT) with *Fleet of Foot*.
  7. **Half-Orc**: Unstoppable brawlers (+HP, +STR) with *Relentless Endurance*.
  8. **Halfling**: Lucky skirmishers (+AGI, +CHA) with *Brave Fortitude*.
  9. **Aasimar**: Celestial heralds (+HP, +CHA, +MP) with *Radiant Soul*.
  10. **Gnome**: Whimsical artificers (+INT, +MP) with *Gnomish Cunning*.
* **Dynamic Ancestry Transmutation**: Switch races on the fly with live delta stat recalculations and racial passive trait badges.

### 4. ⚔️ Full 6-Attribute Combat Stat System
* **Core Attributes**:
  * **Health (HP)**: Vitality gauge scaled to class and race (up to 600 HP).
  * **Mana (MP)**: Mystic pool for spellcasting classes (up to 700 MP).
  * **Strength (STR)**: Physical strike potency and armor bearing (0–100).
  * **Intelligence (INT)**: Arcane aptitude and tactical knowledge (0–100).
  * **Agility (AGI)**: Reflexes, dodge chance, and initiative (0–100).
  * **Charisma (CHA)**: Leadership aura and divine presence (0–100).
* **Visual Gauges**: Color-coded progress meters with percentage readouts and class-scaled stat ranges.

### 5. 💎 Card Rarity Tiers
* Every summoned hero is bestowed a card rarity tier with authentic borders and badges:
  * **Common** (Silver/Zinc)
  * **Uncommon** (Emerald Green)
  * **Rare** (Sapphire Blue)
  * **Epic** (Amethyst Purple)
  * **Legendary** (Radiant Gold)

### 6. 📜 AI Backstory & Quest Hook Generator
* **Hero Backstory Inscription**: A dedicated *"Generate Backstory"* action that pens a unique, 1-to-2 sentence origin tale connecting the adventurer to their sacred homeland and weapon.
* **Adventure Quest Hook Generator**: Roll an ancient quest parchment outlining:
  * **Title**: Epic adventure name (e.g., *The Cursed Crypt of Oakhaven*).
  * **Premise**: Compelling adventure narrative hook.
  * **Objective**: Clear mission goal.
  * **Peril**: High-stakes danger and dungeon threat.
  * **Bounty**: Treasure, artifacts, and gold rewards.

### 7. 🏟️ Turn-Based Boss Duel Arena
* Test your hero's mettle against 4 formidable dungeon bosses:
  * **Gorgon Queen Medusa**
  * **Ancient Cinder Drake**
  * **Shadow Lich Malakor**
  * **Void Abomination Xur'gal**
* **Tactical Turn-Based Combat Options**:
  * **Strike**: Physical weapon attack scaled to Strength and Agility.
  * **Cast Spell**: Devastating magical assault consuming Mana points.
  * **Defensive Guard**: Mitigate 50% of incoming damage on the opponent's counterattack.
  * **Healing Draught**: Limited emergency health potions to recover HP.
* **Combat Feed**: Dynamic combat log tracking damage rolls, critical hits, and duel victories.

### 8. 🖼️ Trading Card PNG & Tabletop Stat Block Exporter
* **High-Resolution PNG Card Download**: HTML5 Canvas renderer that bakes the gold borders, class portrait, rarity gem, 6-stat grid, and backstory into a print-ready collectible card PNG.
* **Markdown D&D Stat Block**: 1-click formatted markdown copyable straight into Notion, Discord, or tabletop campaign notes.
* **VTT JSON Data**: Raw JSON export for integration into Virtual Tabletop platforms (Roll20, Foundry VTT).

### 9. 🖋️ Inscriber's Quill (Character Customizer)
* Fine-tune your adventurer's identity:
  * Rename the hero or customize their sacred title.
  * Change their Homeland Sanctum or favored weapon armament.
  * Edit or hand-craft origin backstory text before sealing the card.

### 10. 🗃️ "My Deck" Grimoire Drawer & Persistence
* **Instant Collection Management**: Save favorites to your permanent deck with duplicate detection.
* **Interactive Slide-Out Drawer**: Search, filter by class or rarity, sort by HP/STR/MP, and inspect saved heroes.
* **Local Persistence**: Preserves your deck and Guild Master profile across browser sessions.

### 11. 🎵 Synthesized Web Audio Experience
* Custom browser-native audio synthesizer generating harmonious chimes for dice transmutations, mystical arpeggios for portrait generation, and parchment whispers for backstory seals (with instant mute control).

---

## 🚀 Technical Stack
* **Framework**: React 18+ with TypeScript & Vite
* **Styling**: Tailwind CSS with custom medieval alchemy color palette and typography
* **Animations**: `motion/react` with fluid transitions and entry fades
* **Icons**: `lucide-react`
* **Canvas Export**: Native HTML5 Canvas API with multi-line text wrapping and gradient borders
* **Audio**: Native Web Audio API Oscillator nodes (no external heavy audio assets)

---

*Crafted on the Ancient Alchemist's Workbench — Forged for tabletop champions and card collectors.*
