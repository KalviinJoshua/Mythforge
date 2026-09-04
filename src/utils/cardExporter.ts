import { FantasyCharacter, GuildProfile } from '../types';

export function exportCharacterToMarkdown(character: FantasyCharacter, guild?: GuildProfile): string {
  return `# ${character.name}
**Title:** ${character.title}  
**Class:** ${character.className}  
**Race:** ${character.race} (${character.raceTrait?.name || 'Racial Trait'})  
**Rarity:** ${character.rarity}  
**Origin:** ${character.origin}  
**Primary Weapon:** ${character.primaryWeapon}  

---

### Core Combat Attributes
- **Health (HP):** ${character.stats.health}
- **Mana (MP):** ${character.stats.mana}
- **Strength (STR):** ${character.stats.strength}
- **Intelligence (INT):** ${character.stats.intelligence}
- **Agility (AGI):** ${character.stats.agility}
- **Charisma (CHA):** ${character.stats.charisma}

---

### Lore & Backstory
> "${character.backstory || character.flavor}"

${
  character.questHook
    ? `### Quest Hook: ${character.questHook.title}
- **Premise:** ${character.questHook.premise}
- **Objective:** ${character.questHook.objective}
- **Danger:** ${character.questHook.danger}
- **Reward:** ${character.questHook.reward}`
    : ''
}

---
*Forged by: ${character.forgedBy || guild?.username || 'Grand Inscriber'} • ${character.guildCrest || 'Order of the Phoenix'}*  
*Card ID: ${character.id}*
`;
}

export function downloadCharacterCardPng(character: FantasyCharacter, guildProfile?: GuildProfile) {
  const canvas = document.createElement('canvas');
  const width = 800;
  const height = 1100;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background - Dark aged mahogany / obsidian card stock
  ctx.fillStyle = '#0f0d0b';
  ctx.fillRect(0, 0, width, height);

  // Outer Border (Aged Gold Filigree)
  ctx.strokeStyle = '#c9a050';
  ctx.lineWidth = 14;
  ctx.strokeRect(16, 16, width - 32, height - 32);

  // Inner Inset Line
  ctx.strokeStyle = '#6e5628';
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  // Card Header Banner
  ctx.fillStyle = '#1c1813';
  ctx.fillRect(36, 36, width - 72, 110);
  ctx.strokeStyle = '#917134';
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, width - 72, 110);

  // Rarity Badge
  const rarityColors: Record<string, string> = {
    Common: '#9ca3af',
    Uncommon: '#34d399',
    Rare: '#60a5fa',
    Epic: '#c084fc',
    Legendary: '#fbbf24',
  };
  ctx.fillStyle = rarityColors[character.rarity] || '#fbbf24';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText(`★ ${character.rarity.toUpperCase()} CARD`, 56, 68);

  // Race & Class Pill
  ctx.fillStyle = '#c9a050';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText(`${character.race.toUpperCase()} • ${character.className.toUpperCase()}`, width - 360, 68);

  // Character Name
  ctx.fillStyle = '#f7f2e8';
  ctx.font = 'bold 36px serif';
  ctx.fillText(character.name, 56, 115);

  // Title / Epithet
  ctx.fillStyle = '#c9a050';
  ctx.font = 'italic 20px serif';
  ctx.fillText(character.title, 56, 175);

  // Portrait Container
  const portX = 56;
  const portY = 200;
  const portW = width - 112;
  const portH = 340;

  ctx.fillStyle = '#14110e';
  ctx.fillRect(portX, portY, portW, portH);
  ctx.strokeStyle = '#b89343';
  ctx.lineWidth = 4;
  ctx.strokeRect(portX, portY, portW, portH);

  // Portrait Art Elements
  ctx.fillStyle = '#221a14';
  ctx.beginPath();
  ctx.arc(portX + portW / 2, portY + portH / 2, 120, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#694f23';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Character Class Icon Text
  ctx.fillStyle = '#eab308';
  ctx.font = 'bold 64px serif';
  ctx.textAlign = 'center';
  ctx.fillText(character.className.slice(0, 1), portX + portW / 2, portY + portH / 2 + 22);

  // Weapon & Origin Bar below portrait
  ctx.textAlign = 'left';
  ctx.fillStyle = '#e5ded2';
  ctx.font = '16px sans-serif';
  ctx.fillText(`Armament: ${character.primaryWeapon}`, 56, 575);
  ctx.fillText(`Homeland: ${character.origin}`, 56, 600);

  // Stats Grid (6 Attributes)
  const stats = [
    { label: 'HEALTH (HP)', val: character.stats.health, color: '#f87171' },
    { label: 'MANA (MP)', val: character.stats.mana, color: '#38bdf8' },
    { label: 'STRENGTH (STR)', val: character.stats.strength, color: '#fbbf24' },
    { label: 'INTELLIGENCE (INT)', val: character.stats.intelligence, color: '#a78bfa' },
    { label: 'AGILITY (AGI)', val: character.stats.agility, color: '#34d399' },
    { label: 'CHARISMA (CHA)', val: character.stats.charisma, color: '#f472b6' },
  ];

  const statStartY = 640;
  stats.forEach((st, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const boxX = 56 + col * 350;
    const boxY = statStartY + row * 65;

    ctx.fillStyle = '#181512';
    ctx.fillRect(boxX, boxY, 335, 52);
    ctx.strokeStyle = '#5a4623';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(boxX, boxY, 335, 52);

    ctx.fillStyle = '#9ca3af';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(st.label, boxX + 16, boxY + 22);

    ctx.fillStyle = st.color;
    ctx.font = 'bold 22px monospace';
    ctx.fillText(st.val.toString(), boxX + 16, boxY + 44);
  });

  // Backstory Scroll Block
  const storyY = 855;
  ctx.fillStyle = '#120f0d';
  ctx.fillRect(56, storyY, width - 112, 130);
  ctx.strokeStyle = '#c9a050';
  ctx.lineWidth = 2;
  ctx.strokeRect(56, storyY, width - 112, 130);

  ctx.fillStyle = '#c9a050';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('CHRONICLE & ORIGIN LORE', 74, storyY + 28);

  ctx.fillStyle = '#e2dcce';
  ctx.font = 'italic 16px serif';

  const storyText = character.backstory || character.flavor;
  // Multi-line wrap
  const words = storyText.split(' ');
  let line = '';
  let lineY = storyY + 58;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > width - 160 && n > 0) {
      ctx.fillText(line, 74, lineY);
      line = words[n] + ' ';
      lineY += 24;
      if (lineY > storyY + 115) break;
    } else {
      line = testLine;
    }
  }
  if (lineY <= storyY + 115) {
    ctx.fillText(line, 74, lineY);
  }

  // Footer Watermark & ID
  ctx.fillStyle = '#8c8273';
  ctx.font = '13px monospace';
  ctx.fillText(`Card ID: ${character.id}`, 56, 1030);

  const creator = character.forgedBy || (guildProfile ? `${guildProfile.username} (${guildProfile.title})` : 'Grand Inscriber');
  ctx.textAlign = 'right';
  ctx.fillText(`Seal of ${creator}`, width - 56, 1030);

  // Trigger Download
  const link = document.createElement('a');
  link.download = `${character.name.toLowerCase().replace(/\s+/g, '_')}_card.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
