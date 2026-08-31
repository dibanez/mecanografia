/**
 * Tests for the typing engine: the scoring and the strict-mode rules that the
 * whole trainer leans on, and that nothing else would catch if they drifted.
 *
 *   node --test
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { TypingEngine, ratingFor } from '../js/engine.js';

/** Types a whole string, one character at a time. */
function typeAll(engine, text) {
  return [...text].map((char) => engine.type(char));
}

/** Pins the clock so speed can be asserted: the engine reads it on the first key. */
function elapse(engine, ms) {
  engine.startedAt = (engine.finishedAt ?? performance.now()) - ms;
}

describe('typing', () => {
  it('advances over correct characters', () => {
    const engine = new TypingEngine('fj');
    assert.equal(engine.expected, 'f');
    assert.equal(engine.type('f'), 'correct');
    assert.equal(engine.expected, 'j');
    assert.deepEqual(engine.states, ['correct', 'pending']);
  });

  it('refuses to advance past a wrong character in strict mode', () => {
    const engine = new TypingEngine('fj');
    assert.equal(engine.type('d'), 'wrong');
    assert.equal(engine.index, 0, 'the cursor stays on the character it missed');
    assert.equal(engine.expected, 'f');
    assert.deepEqual(engine.states, ['wrong', 'pending']);
  });

  it('marks a corrected character apart from a clean one', () => {
    const engine = new TypingEngine('fj');
    engine.type('d');
    engine.type('f');
    // 'fixed' is what paints it differently: the learner did not get it first time.
    assert.deepEqual(engine.states, ['fixed', 'pending']);
  });

  it('walks past the mistake when strict mode is off', () => {
    const engine = new TypingEngine('fj', { strict: false });
    assert.equal(engine.type('d'), 'wrong');
    assert.equal(engine.index, 1);
    assert.deepEqual(engine.states, ['wrong', 'pending']);
  });

  it('ignores anything typed after the last character', () => {
    const engine = new TypingEngine('f');
    engine.type('f');
    assert.ok(engine.finished);
    assert.equal(engine.type('j'), 'ignored');
    assert.equal(engine.stats().errors, 0);
  });

  it('stops the clock when the exercise ends', () => {
    const engine = new TypingEngine('f');
    engine.type('f');
    const first = engine.elapsedMs;
    assert.equal(engine.elapsedMs, first, 'a finished exercise no longer accrues time');
  });
});

describe('backspace', () => {
  it('clears the pending mistake before moving', () => {
    const engine = new TypingEngine('fj');
    engine.type('d');
    assert.equal(engine.backspace(), true);
    assert.equal(engine.index, 0);
    assert.deepEqual(engine.states, ['pending', 'pending']);
  });

  it('steps back over a character already typed', () => {
    const engine = new TypingEngine('fj');
    engine.type('f');
    assert.equal(engine.backspace(), true);
    assert.equal(engine.index, 0);
    assert.deepEqual(engine.states, ['pending', 'pending']);
  });

  it('does nothing at the start of the exercise', () => {
    assert.equal(new TypingEngine('fj').backspace(), false);
  });
});

describe('statistics', () => {
  it('counts accuracy over every keystroke, not every character', () => {
    const engine = new TypingEngine('fjf');
    typeAll(engine, 'f');
    engine.type('k'); // one miss
    typeAll(engine, 'jf');
    const stats = engine.stats();
    assert.equal(stats.errors, 1);
    assert.equal(stats.accuracy, 75, '3 good keystrokes out of 4');
    assert.equal(stats.typed, 3);
  });

  it('measures net speed on the characters actually got right', () => {
    const engine = new TypingEngine('f'.repeat(25));
    typeAll(engine, 'f'.repeat(25));
    elapse(engine, 60000);
    // 25 characters is 5 words of five keystrokes, typed in one minute.
    assert.equal(engine.stats().wpm, 5);
  });

  it('separates gross speed from net speed', () => {
    const engine = new TypingEngine('f'.repeat(10));
    typeAll(engine, 'ddddd'); // five keystrokes that advance nothing
    typeAll(engine, 'f'.repeat(10));
    elapse(engine, 60000);
    const stats = engine.stats();
    assert.equal(stats.wpm, 2, '10 characters advanced');
    assert.equal(stats.grossWpm, 3, '15 keystrokes pressed');
  });

  it('blames the character that was expected, worst first', () => {
    const engine = new TypingEngine('fj f');
    engine.type('x');
    engine.type('f');
    engine.type('x');
    engine.type('x');
    engine.type('j');
    engine.type('x');
    engine.type(' ');
    const { worstKeys } = engine.stats();
    assert.deepEqual(worstKeys, [
      { char: 'j', count: 2 },
      { char: 'f', count: 1 },
      { char: ' ', count: 1 },
    ]);
  });

  it('reports a full but untouched exercise as perfect and empty', () => {
    const stats = new TypingEngine('fj').stats();
    assert.deepEqual(
      { wpm: stats.wpm, accuracy: stats.accuracy, progress: stats.progress },
      { wpm: 0, accuracy: 100, progress: 0 },
    );
  });

  it('forgets everything on reset', () => {
    const engine = new TypingEngine('fj');
    engine.type('x');
    engine.type('f');
    engine.reset();
    const stats = engine.stats();
    assert.equal(engine.index, 0);
    assert.equal(stats.errors, 0);
    assert.equal(stats.elapsedMs, 0);
    assert.deepEqual(engine.states, ['pending', 'pending']);
  });
});

describe('stars', () => {
  it('gives three only for accuracy and speed together', () => {
    assert.equal(ratingFor({ wpm: 20, accuracy: 97 }, 20), 3);
    assert.equal(ratingFor({ wpm: 19, accuracy: 99 }, 20), 2, 'fast enough is part of it');
    assert.equal(ratingFor({ wpm: 40, accuracy: 96 }, 20), 2, 'so is being accurate');
  });

  it('gives two for a decent run short of the target', () => {
    assert.equal(ratingFor({ wpm: 15, accuracy: 92 }, 20), 2);
    assert.equal(ratingFor({ wpm: 14, accuracy: 92 }, 20), 1, 'below three quarters of it');
    assert.equal(ratingFor({ wpm: 15, accuracy: 91 }, 20), 1);
  });

  it('never rewards speed below 85 % accuracy', () => {
    assert.equal(ratingFor({ wpm: 100, accuracy: 84.9 }, 20), 1);
  });
});
