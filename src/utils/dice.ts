import { DieType, RollMode, DiceRollRequest, DiceRollResult, SingleDieRoll } from '../types';

export const DIE_SIDES_MAP: Record<DieType, number> = {
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20,
  d100: 100,
};

export const AVAILABLE_DICE: DieType[] = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];

/**
 * Generates an unbiased random integer between 1 and sides (inclusive).
 */
export function rollSingleDieValue(sides: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const buffer = new Uint32Array(1);
    // Use rejection sampling to eliminate modulo bias
    const maxUint = 4294967295;
    const limit = maxUint - (maxUint % sides);
    let rand: number;
    do {
      window.crypto.getRandomValues(buffer);
      rand = buffer[0];
    } while (rand >= limit);
    return (rand % sides) + 1;
  }
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Formats a clean human-readable tabletop dice formula string.
 * Examples: "2d6 + 3", "d20 + 4 (Advantage)", "1d100 - 2"
 */
export function formatDiceFormula(
  die: DieType,
  count: number,
  modifier = 0,
  mode: RollMode = 'normal'
): string {
  const countStr = count === 1 && die === 'd20' ? 'd20' : `${count}${die}`;
  let modStr = '';
  if (modifier > 0) {
    modStr = ` + ${modifier}`;
  } else if (modifier < 0) {
    modStr = ` - ${Math.abs(modifier)}`;
  }

  let modeStr = '';
  if (mode === 'advantage') {
    modeStr = ' (Advantage)';
  } else if (mode === 'disadvantage') {
    modeStr = ' (Disadvantage)';
  }

  return `${countStr}${modStr}${modeStr}`;
}

/**
 * Core deterministic dice roller executing dice rolls with support for
 * advantage, disadvantage, modifiers, and critical roll detections.
 */
export function rollDice(request: DiceRollRequest): DiceRollResult {
  const die = request.die;
  const sides = DIE_SIDES_MAP[die] || 20;
  const count = Math.max(1, Math.min(20, Math.floor(request.count || 1)));
  const modifier = Math.floor(request.modifier || 0);
  const mode = request.mode || 'normal';

  const rolls: SingleDieRoll[] = [];
  const keptRolls: number[] = [];

  if (mode === 'normal') {
    for (let i = 0; i < count; i++) {
      const val = rollSingleDieValue(sides);
      rolls.push({ die, value: val, dropped: false });
      keptRolls.push(val);
    }
  } else if (count === 1) {
    // Standard tabletop Advantage/Disadvantage on a single die (roll 2, keep best/worst)
    const rollA = rollSingleDieValue(sides);
    const rollB = rollSingleDieValue(sides);

    if (mode === 'advantage') {
      const kept = Math.max(rollA, rollB);
      const dropped = Math.min(rollA, rollB);
      // Mark the first instance of dropped value as dropped
      if (rollA === dropped && rollA !== rollB) {
        rolls.push({ die, value: rollA, dropped: true });
        rolls.push({ die, value: rollB, dropped: false });
      } else if (rollB === dropped && rollA !== rollB) {
        rolls.push({ die, value: rollA, dropped: false });
        rolls.push({ die, value: rollB, dropped: true });
      } else {
        // Tied
        rolls.push({ die, value: rollA, dropped: false });
        rolls.push({ die, value: rollB, dropped: true });
      }
      keptRolls.push(kept);
    } else {
      // Disadvantage: keep lowest
      const kept = Math.min(rollA, rollB);
      const dropped = Math.max(rollA, rollB);
      if (rollA === dropped && rollA !== rollB) {
        rolls.push({ die, value: rollA, dropped: true });
        rolls.push({ die, value: rollB, dropped: false });
      } else if (rollB === dropped && rollA !== rollB) {
        rolls.push({ die, value: rollA, dropped: false });
        rolls.push({ die, value: rollB, dropped: true });
      } else {
        // Tied
        rolls.push({ die, value: rollA, dropped: false });
        rolls.push({ die, value: rollB, dropped: true });
      }
      keptRolls.push(kept);
    }
  } else {
    // Multi-dice with advantage/disadvantage: roll two parallel sets of 'count' dice
    const setA: number[] = [];
    const setB: number[] = [];
    for (let i = 0; i < count; i++) {
      setA.push(rollSingleDieValue(sides));
      setB.push(rollSingleDieValue(sides));
    }

    const sumA = setA.reduce((a, b) => a + b, 0);
    const sumB = setB.reduce((a, b) => a + b, 0);

    const chooseA = mode === 'advantage' ? sumA >= sumB : sumA <= sumB;

    setA.forEach((val) => {
      rolls.push({ die, value: val, dropped: !chooseA });
      if (chooseA) keptRolls.push(val);
    });
    setB.forEach((val) => {
      rolls.push({ die, value: val, dropped: chooseA });
      if (!chooseA) keptRolls.push(val);
    });
  }

  const diceSubtotal = keptRolls.reduce((sum, v) => sum + v, 0);
  const total = diceSubtotal + modifier;

  // Natural 20 / Natural 1 detection applies to d20 rolls
  const isCriticalSuccess = die === 'd20' && keptRolls.includes(20);
  const isCriticalFailure = die === 'd20' && keptRolls.includes(1);

  const formula = formatDiceFormula(die, count, modifier, mode);

  return {
    id: `roll-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    die,
    sides,
    count,
    modifier,
    mode,
    formula,
    label: request.label,
    rolls,
    keptRolls,
    diceSubtotal,
    total,
    isCriticalSuccess,
    isCriticalFailure,
    timestamp: Date.now(),
  };
}

/**
 * Convenience helper to roll a d20 with optional modifier and mode.
 */
export function rollD20(modifier = 0, mode: RollMode = 'normal', label?: string): DiceRollResult {
  return rollDice({
    die: 'd20',
    count: 1,
    modifier,
    mode,
    label,
  });
}

/**
 * Web Audio synthesizer for tactile dice tumbling sound effects.
 * Synthesizes parchment dice clatter, with a celestial chime on crits and a low thud on fumbles.
 */
export function playDiceAudio(options?: {
  soundEnabled?: boolean;
  isCrit?: boolean;
  isFumble?: boolean;
}) {
  if (options?.soundEnabled === false) return;
  if (typeof window === 'undefined') return;

  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Simulate 3 quick dice clatter impacts
    const clatterTimes = [0, 0.04, 0.09, 0.15];
    clatterTimes.forEach((delay, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800 + idx * 300, now + delay);
      filter.Q.setValueAtTime(3, now + delay);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220 + Math.random() * 200, now + delay);
      osc.frequency.exponentialRampToValueAtTime(120, now + delay + 0.05);

      gain.gain.setValueAtTime(0.08, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.07);
    });

    // Special harmonic flourish on Critical Success (Natural 20)
    if (options?.isCrit) {
      const critFrequencies = [523.25, 659.25, 783.99, 1046.5]; // C Major arpeggio
      critFrequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + 0.18 + idx * 0.06);
        gain.gain.setValueAtTime(0.09, now + 0.18 + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18 + idx * 0.06 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + 0.18 + idx * 0.06);
        osc.stop(now + 0.18 + idx * 0.06 + 0.45);
      });
    }

    // Dull ominous drop on Critical Failure (Natural 1)
    if (options?.isFumble) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.5);
      gain.gain.setValueAtTime(0.08, now + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + 0.18);
      osc.stop(now + 0.52);
    }
  } catch {
    // Graceful fallback if audio context cannot be initialized
  }
}
