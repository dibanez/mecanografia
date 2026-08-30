/** Renders the on-screen keyboard and the hand guide, and highlights keys. */

import { FINGERS, keyByCode, keyStepsFor } from './data/keyboard-layout.js';

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
  /**
   * `tinted` paints every key with the colour of the finger that owns it,
   * which is what the tutorial uses to explain the finger assignment.
   */
  constructor(keyboardEl, handsEl, layout, { tinted = false } = {}) {
    this.keyboardEl = keyboardEl;
    this.handsEl = handsEl;
    this.layout = layout;
    this.tinted = tinted;
    this.keyEls = new Map();
    this.fingerEls = new Map();
    this.render();
  }

  setLayout(layout) {
    this.layout = layout;
    this.render();
  }

  render() {
    this.keyEls.clear();
    this.fingerEls.clear();

    this.keyboardEl.textContent = '';
    this.keyboardEl.classList.toggle('keyboard--tinted', this.tinted);
    for (const row of this.layout.rows) {
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

    if (!this.handsEl) return;
    this.handsEl.textContent = '';
    this.handsEl.classList.toggle('hands--tinted', this.tinted);
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
        el.title = FINGERS[finger.id].name;
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
    const steps = keyStepsFor(char, this.layout);
    if (!steps) return;

    const step = deadPending && steps.length > 1 ? steps[1] : steps[0];
    const keyEl = this.keyEls.get(step.code);
    const key = keyByCode(step.code, this.layout);
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

  /** Dims every key not owned by `fingerId`; pass null to show them all. */
  spotlightFinger(fingerId) {
    for (const [code, el] of this.keyEls) {
      const owner = keyByCode(code, this.layout)?.finger;
      el.classList.toggle('is-dimmed', Boolean(fingerId) && owner !== fingerId);
      el.classList.toggle('is-spotlit', Boolean(fingerId) && owner === fingerId);
    }
    for (const [id, el] of this.fingerEls) {
      el.classList.toggle('is-active', id === fingerId);
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
