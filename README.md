# ⚔️ Mythforge

> **Forge your legend.**

**Mythforge** is an immersive fantasy RPG character and adventure engine built with React and TypeScript. Create unique heroes, develop them through progression, equip them with gear, fight monsters, collect loot, build parties, and unlock achievements — all directly in the browser.

The entire game experience is designed to work **client-side and offline**, with no backend, database, authentication, or external API required at runtime.

---

## ✨ Features

### 🧙 Hero Generation

Create procedurally generated fantasy heroes with:

* Multiple races and classes
* Unique names
* Character statistics
* Class abilities
* Elemental affinities
* Alignment
* Equipment
* Backstory and personality
* Bonds, flaws, and quest hooks
* Dynamic character portraits

Hero generation is deterministic to the game's data and logic and does **not require an AI API call**.

---

### 📈 XP & Level Progression

Develop your heroes through an RPG-style progression system.

* Experience points
* Character levels
* Level-up progression
* Proficiency progression
* XP earned through combat
* Persistent progression through `localStorage`

---

### 🎒 Inventory System

Manage everything your hero collects.

* Weapons
* Armor
* Consumables
* Accessories
* Artifacts
* Item quantities
* Gold
* Equipment states
* Item statistics and effects

Inventory data is persisted locally in the browser.

---

### 💎 Procedural Loot

Defeat enemies and collect randomized rewards.

Loot can include:

* Common items
* Uncommon items
* Rare items
* Epic items
* Legendary items
* Mythic items
* Equipment
* Consumables
* Gold
* Stat bonuses
* Special effects

Loot generation happens locally without external services.

---

### 🎲 Advanced Dice System

A reusable RPG dice engine supporting:

* d4
* d6
* d8
* d10
* d12
* d20
* d100
* Custom dice
* Multiple dice rolls
* Modifiers
* Advantage
* Disadvantage
* Critical success
* Critical failure
* Roll history

The system also integrates with combat mechanics.

---

### 👹 Monster Generator

Generate procedural fantasy enemies based on hero level and difficulty.

Monster system includes:

* Goblins
* Orcs
* Skeletons
* Zombies
* Wolves
* Trolls
* Ogres
* Vampires
* Demons
* Dragons

Difficulty tiers include:

* Minion
* Standard
* Elite
* Boss
* Apex

Generated monsters have their own:

* Stats
* Attacks
* Abilities
* Weaknesses
* Resistances
* Challenge rating
* Loot tier

---

### ⚔️ Boss Arena

Fight enemies in a turn-based combat arena.

Combat includes:

* Initiative
* Attacks
* Spells
* Defense
* Damage calculation
* Dice rolls
* Monster abilities
* Combat logs
* XP rewards
* Gold rewards
* Loot rewards
* Bestiary progression

Classic bosses can also be rematched.

---

### 🧑‍🤝‍🧑 Party Builder

Build RPG parties from your saved heroes.

* Create parties of 2–6 heroes
* Custom party names
* Role distribution
* Total party HP
* Average party level
* Synergy scoring
* Save and load parties
* Edit parties
* Delete parties
* Arena party selection

---

### 📜 Quest & Adventure Systems

Generate fantasy adventure content around your heroes.

Quest hooks and narrative elements include:

* Adventure themes
* Character-driven hooks
* Lore
* Personality
* Bonds
* Flaws
* Fantasy scenarios

---

### 🏆 Achievement System

Track accomplishments across the game.

Achievements cover categories such as:

* Heroes
* Combat
* Ascension
* Vault & Spoils
* Polyhedrals
* Warbands
* Lore & Bestiary

The achievement system tracks progress locally and can award titles for major accomplishments.

---

### 📖 Bestiary

Discover and track monsters encountered during gameplay.

The Bestiary records:

* Encountered monsters
* Defeated monsters
* Monster information
* Discovery progress

---

### 🃏 My Deck

Save your favorite heroes into a persistent collection.

You can:

* Save heroes
* Load heroes
* Compare heroes
* Remove heroes
* Export character cards
* Build parties from saved heroes

---

### 🖼️ Character Card Export

Export generated heroes as visual character cards and tabletop-style summaries.

---

### 🔊 Immersive Audio

Mythforge uses the **Web Audio API** to generate sound effects directly in the browser.

Audio feedback is used for:

* Dice rolls
* Hero summoning
* Parchment interactions
* Achievements
* Combat
* Other UI interactions

No external audio files or audio APIs are required.

---

## 🛠️ Tech Stack

| Technology      | Purpose                                 |
| --------------- | --------------------------------------- |
| React 19        | Frontend UI                             |
| TypeScript      | Type-safe application logic             |
| Vite            | Development and production build system |
| Tailwind CSS v4 | Styling                                 |
| Motion          | UI animations                           |
| Lucide React    | Icons                                   |
| Web Audio API   | Procedural sound effects                |
| localStorage    | Local persistence                       |

---

## 🏗️ Architecture

Mythforge follows a client-side architecture.

```text
                    ┌─────────────────────┐
                    │      Mythforge      │
                    │     React App       │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
       Character Data      Game Systems      UI Components
             │                 │                 │
             │          ┌──────┼──────┐          │
             │          │      │      │          │
             ▼          ▼      ▼      ▼          ▼
          Heroes       XP    Loot   Dice      Modals/Cards
                        │      │      │
                        ▼      ▼      ▼
                     Inventory Combat Monsters
                        │      │      │
                        └──────┼──────┘
                               ▼
                          Achievements
                               │
                               ▼
                          localStorage
```

The project does **not** currently depend on:

* Backend servers
* Firebase
* Supabase
* External REST APIs
* Gemini API calls
* Authentication services
* External databases

---

## 🔌 API & Offline Architecture

Mythforge is designed to run locally.

The current application contains:

* No runtime Gemini API calls
* No `fetch()` requests
* No Axios/HTTP client
* No external REST API
* No API keys
* No Firebase/Supabase runtime
* No external authentication
* No external image generation API
* No external audio API

Character generation, combat, loot, monsters, achievements, inventory, and progression are handled locally by TypeScript game logic.

> **Result:** Once the project dependencies are installed, the application can run without an internet connection.

Google Fonts are optionally loaded for typography, but the application falls back to system fonts if they are unavailable.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm
* Git

installed on your system.

### Clone the Repository

```bash
git clone <your-repository-url>
cd mythforge
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Vite will provide a local development URL, typically:

```text
http://localhost:5173
```

Open the URL in your browser.

---

## 📦 Production Build

Create a production build with:

```bash
npm run build
```

The generated production files will be placed in the `dist` directory.

---

## 🧪 Development Checks

TypeScript and build validation can be performed with:

```bash
npm run build
```

The project is designed to maintain a clean TypeScript build and production bundle.

---

## 💾 Data Persistence

Mythforge uses browser `localStorage` for persistent game data.

Stored systems include:

* Hero Deck
* Guild Master profile
* Inventory
* Parties
* Bestiary
* Achievements
* Progression data

The application uses versioned storage keys for major systems to support safer data migration.

---

## 🎮 Gameplay Loop

```text
Create Hero
     ↓
Customize Hero
     ↓
Save to My Deck
     ↓
Build Inventory
     ↓
Enter Arena
     ↓
Fight Monsters
     ↓
Earn XP + Gold
     ↓
Level Up
     ↓
Collect Loot
     ↓
Improve Hero
     ↓
Discover Monsters
     ↓
Unlock Achievements
     ↓
Build Stronger Parties
     ↓
Forge Your Legend
```

---

## 🎨 Design

Mythforge uses an atmospheric fantasy aesthetic inspired by:

* Ancient alchemy
* RPG character sheets
* Medieval fantasy
* Magical workbenches
* Parchment
* Arcane artifacts
* Dark fantasy interfaces

The interface combines:

* Mystical lighting
* Arcane particle effects
* Animated interactions
* Parchment-style character cards
* Fantasy typography
* Obsidian and metallic UI elements

---

## 📁 Project Structure

A simplified structure:

```text
src/
├── assets/
│   └── images/
│
├── components/
│   ├── AchievementsModal
│   ├── ArenaDuelModal
│   ├── CharacterCard
│   ├── DiceRollerModal
│   ├── MonsterStatBlockModal
│   └── ...
│
├── data/
│   ├── achievementData
│   ├── characterData
│   ├── monsterData
│   └── ...
│
├── utils/
│   ├── achievementTracker
│   ├── backstoryGenerator
│   ├── inventory
│   ├── lootGenerator
│   ├── monsterGenerator
│   ├── dice
│   └── ...
│
├── types.ts
├── App.tsx
└── main.tsx
```

---

## 🔮 Future Improvements

Potential future development areas include:

* More character races and classes
* More monsters and bosses
* Expanded item system
* More quests
* Additional achievements
* Improved party combat
* More character customization
* Advanced campaign systems
* Cloud synchronization
* Multiplayer functionality

These are intentionally kept separate from the current offline-first architecture.

---

## 📜 License

This project is currently intended as a personal/educational game development project.

Add your preferred license here before distributing the project publicly.

---

## 👨‍💻 Project

**Mythforge — Forge your legend.**

A fantasy RPG engine for creating heroes, fighting monsters, collecting loot, building parties, and writing your own legend.
