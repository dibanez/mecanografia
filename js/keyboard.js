/** Renders the on-screen keyboard and the hand guide, and highlights keys. */

import { KEYBOARD_ROWS, KEY_BY_CODE, keyStepsFor } from './data/keyboard-layout.js';

const FINGER_ORDER = {
  left: [
    { id: 'l5', length: '1' },
    { id: 'l4', length: '4' },
    { id: 'l3', length: '3' },
    { id: 'l2', length: '2' },
    { id: 'lt', length: 'thumb' },
  ],
  right: [
    { id: 'r5', length: '1' },
    { id: 'r4', length: '4' },
    { id: 'r3', length: '3' },
    { id: 'r2', length: '2' },
    { id: 'rt', length: 'thumb' },
  ],
};

function keyLabel(key) {
  if (key.label) return key.label;
  if (key.shift && key.shift !== key.base?.toUpperCase()) return `${key.shift}\n${key.base}`;
  return key.base ?? '';
}

export class KeyboardView {
  constructor(keyboardEl, handsEl) {
    this.keyboardEl = keyboardEl;
    this.handsEl = handsEl;
    this.keyEls = new Map();
    this.fingerEls = new Map();
    this.render();
  }

  render() {
    this.keyboardEl.textContent = '';
    for (const row of KEYBOARD_ROWS) {
      const rowEl = document.createElement('div');
      rowEl.className = 'keyboard__row';
      for (const key of row) {
        const el = document.createElement('div');
        el.className = 'key';
        if (key.home) el.classList.add('key--home');
        el.dataset.code = key.code;
        el.dataset.finger = key.finger;
        el.style.setProperty('--w', String(key.width ?? 1));
        el.textContent = keyLabel(key);
        rowEl.append(el);
        this.keyEls.set(key.code, el);
      }
      this.keyboardEl.append(rowEl);
    }

    this.handsEl.textContent = '';
    for (const [hand, fingers] of Object.entries(FINGER_ORDER)) {
      const handEl = document.createElement('div');
      handEl.className = `hand hand--${hand}`;
      const fingersEl = document.createElement('div');
      fingersEl.className = 'hand__fingers';
      for (const finger of fingers) {
        const el = document.createElement('div');
        el.className = 'finger';
        el.dataset.finger = finger.id;
        el.dataset.length = finger.length;
        fingersEl.append(el);
        this.fingerEls.set(finger.id, el);
      }
      const palm = document.createElement('div');
      palm.className = 'hand__palm';
      const label = document.createElement('span');
      label.className = 'hand__label';
      label.textContent = hand === 'left' ? 'izquierda' : 'derecha';
      handEl.append(fingersEl, palm, label);
      this.handsEl.append(handEl);
    }
  }

  clearHighlights() {
    for (const el of this.keyEls.values()) el.classList.remove('is-next', 'is-modifier');
    for (const el of this.fingerEls.values()) el.classList.remove('is-active');
  }

  /**
   * Highlights the key (and modifier) needed for `char`, plus the finger.
   * `deadPending` skips the dead key step once it has already been typed.
   */
  highlight(char, deadPending = false) {
    this.clearHighlights();
    const steps = keyStepsFor(char);
    if (!steps) return;

    const step = deadPending && steps.length > 1 ? steps[1] : steps[0];
    const keyEl = this.keyEls.get(step.code);
    const key = KEY_BY_CODE.get(step.code);
    if (keyEl) keyEl.classList.add('is-next');
    if (key) this.fingerEls.get(key.finger)?.classList.add('is-active');

    if (step.modifier === 'shift') {
      // Shift is pressed with the hand opposite to the key.
      const shiftCode = key?.finger.startsWith('l') ? 'ShiftRight' : 'ShiftLeft';
      this.keyEls.get(shiftCode)?.classList.add('is-modifier');
      this.fingerEls.get(shiftCode === 'ShiftRight' ? 'r5' : 'l5')?.classList.add('is-active');
    } else if (step.modifier === 'altgr') {
      this.keyEls.get('AltRight')?.classList.add('is-modifier');
      this.fingerEls.get('rt')?.classList.add('is-active');
    }
  }

  flash(code, ok = true) {
    const el = this.keyEls.get(code);
    if (!el) return;
    const className = ok ? 'is-pressed' : 'is-error';
    el.classList.add(className);
    setTimeout(() => el.classList.remove(className), 110);
  }
}
