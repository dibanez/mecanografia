/**
 * Typing engine: owns the exercise state and the live statistics.
 *
 * Strict mode (the default) refuses to advance while the last character is
 * wrong, which is what a learner needs: the finger has to correct itself.
 */

const WORD_LENGTH = 5;

export class TypingEngine {
  constructor(text, { strict = true } = {}) {
    this.chars = [...text];
    this.strict = strict;
    this.reset();
  }

  reset() {
    this.index = 0;
    this.states = new Array(this.chars.length).fill('pending');
    this.wrongAt = null;
    this.keystrokes = 0;
    this.correctKeystrokes = 0;
    this.errors = 0;
    this.errorsByChar = new Map();
    this.startedAt = null;
    this.finishedAt = null;
  }

  get finished() {
    return this.index >= this.chars.length;
  }

  get expected() {
    return this.chars[this.index] ?? null;
  }

  get elapsedMs() {
    if (this.startedAt === null) return 0;
    return (this.finishedAt ?? performance.now()) - this.startedAt;
  }

  /**
   * Registers a typed character.
   * Returns 'correct' | 'wrong' | 'ignored'.
   */
  type(char) {
    if (this.finished) return 'ignored';
    if (this.startedAt === null) this.startedAt = performance.now();

    const expected = this.expected;
    this.keystrokes += 1;

    if (char === expected) {
      this.correctKeystrokes += 1;
      this.states[this.index] = this.wrongAt === this.index ? 'fixed' : 'correct';
      this.wrongAt = null;
      this.index += 1;
      if (this.finished) this.finishedAt = performance.now();
      return 'correct';
    }

    this.errors += 1;
    this.errorsByChar.set(expected, (this.errorsByChar.get(expected) ?? 0) + 1);
    this.states[this.index] = 'wrong';
    this.wrongAt = this.index;
    if (!this.strict) this.index += 1;
    return 'wrong';
  }

  /** Steps back one character (Backspace). */
  backspace() {
    if (this.wrongAt !== null) {
      this.states[this.wrongAt] = 'pending';
      this.wrongAt = null;
      return true;
    }
    if (this.index === 0) return false;
    this.index -= 1;
    this.states[this.index] = 'pending';
    return true;
  }

  stats() {
    const minutes = this.elapsedMs / 60000;
    const grossWpm = minutes > 0 ? this.keystrokes / WORD_LENGTH / minutes : 0;
    const netWpm = minutes > 0 ? this.index / WORD_LENGTH / minutes : 0;
    const accuracy = this.keystrokes > 0 ? this.correctKeystrokes / this.keystrokes : 1;
    return {
      wpm: Math.max(0, Math.round(netWpm)),
      grossWpm: Math.max(0, Math.round(grossWpm)),
      accuracy: Math.round(accuracy * 1000) / 10,
      errors: this.errors,
      elapsedMs: this.elapsedMs,
      progress: this.chars.length ? this.index / this.chars.length : 0,
      typed: this.index,
      total: this.chars.length,
      worstKeys: [...this.errorsByChar.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([char, count]) => ({ char, count })),
    };
  }
}

/** 0-3 stars from accuracy and speed against the lesson target. */
export function ratingFor({ wpm, accuracy }, targetWpm) {
  if (accuracy < 85) return 1;
  if (accuracy >= 97 && wpm >= targetWpm) return 3;
  if (accuracy >= 92 && wpm >= targetWpm * 0.75) return 2;
  return 1;
}
