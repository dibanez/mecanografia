/** Renders the on-screen keyboard and the hand guide, and highlights keys. */

import { FINGERS, keyStepsFor } from './data/keyboard-layout.js';
import { hasTranslation, t } from './i18n.js';

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

/**
 * What to print on a key: its own label, the translated name of a key that
 * types no character, or the characters it produces.
 */
function keyLabel(key) {
  if (key.label) return key.label;
  if (hasTranslation(`key.${key.code}`)) return t(`key.${key.code}`);
  if (key.shift && key.base && key.shift !== key.base.toUpperCase()) return `${key.shift}\n${key.base}`;
  return key.base ?? key.code;
}

export class KeyboardView {
  /**
   * `tinted` paints every key with the colour of the finger that owns it,
   * which is what the tutorial uses to explain the finger assignment.
   */
  constructor(keyboardEl, handsEl, keyboard, { tinted = false } = {}) {
    this.keyboardEl = keyboardEl;
    this.handsEl = handsEl;
    this.keyboard = keyboard;
    this.tinted = tinted;
    this.keyEls = new Map();
    this.fingerEls = new Map();
    this.render();
  }

  setKeyboard(keyboard) {
    this.keyboard = keyboard;
    this.render();
  }

  /** One key. A code drawn twice (both halves of a split) keeps both nodes. */
  renderKey(key) {
    if (key.stack) {
      // Two half-height keys in one slot: the ↑/↓ pair of laptop boards.
      const wrapper = document.createElement('div');
      wrapper.className = 'key-stack';
      wrapper.style.setProperty('--w', String(key.stack[0].w ?? 1));
      for (const item of key.stack) wrapper.append(this.renderKey({ ...item, half: true }));
      return wrapper;
    }
    if (key.spacer) {
      const spacer = document.createElement('div');
      spacer.className = 'key key--spacer';
      spacer.style.setProperty('--w', String(key.w ?? 1));
      return spacer;
    }

    const el = document.createElement('div');
    el.className = 'key';
    if (key.half) el.classList.add('key--half');
    if (key.home) el.classList.add('key--home');
    if (key.role) el.classList.add(`key--${key.role}`);
    el.dataset.code = key.code;
    el.dataset.finger = key.finger;
    el.style.setProperty('--w', String(key.w ?? 1));
    const label = keyLabel(key);
    // Symbol legends (⌘ ⇧ ⌫ ↑) come from the UI font, which draws them far
    // better than the monospace one used for characters.
    if ([...label].length === 1 && label.codePointAt(0) > 0x2000) el.classList.add('key--glyph');
    el.textContent = label;

    if (!this.keyEls.has(key.code)) this.keyEls.set(key.code, []);
    this.keyEls.get(key.code).push(el);
    return el;
  }

  renderSection(section) {
    const sectionEl = document.createElement('div');
    sectionEl.className = `keyboard__section keyboard__section--${section.orientation}`;
    sectionEl.dataset.section = section.id;

    const linesEl = document.createElement('div');
    linesEl.className = 'keyboard__lines';
    for (const line of section.lines) {
      const lineEl = document.createElement('div');
      lineEl.className = section.orientation === 'columns' ? 'keyboard__column' : 'keyboard__row';
      if (line.offset) lineEl.style.setProperty('--offset', String(line.offset));
      for (const key of line.keys) lineEl.append(this.renderKey(key));
      linesEl.append(lineEl);
    }
    sectionEl.append(linesEl);

    if (section.thumbs?.length) {
      const thumbsEl = document.createElement('div');
      thumbsEl.className = `keyboard__thumbs keyboard__thumbs--${section.id}`;
      for (const key of section.thumbs) thumbsEl.append(this.renderKey(key));
      sectionEl.append(thumbsEl);
    }
    return sectionEl;
  }

  render() {
    this.keyEls.clear();
    this.fingerEls.clear();

    this.keyboardEl.textContent = '';
    this.keyboardEl.className = `keyboard keyboard--${this.keyboard.form.id}`;
    this.keyboardEl.classList.toggle('keyboard--tinted', this.tinted);
    this.keyboardEl.classList.toggle('keyboard--split', Boolean(this.keyboard.form.split));
    for (const section of this.keyboard.sections) {
      this.keyboardEl.append(this.renderSection(section));
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
        el.title = t(`finger.${finger.id}`);
        fingersEl.append(el);
        this.fingerEls.set(finger.id, el);
      }
      const palm = document.createElement('div');
      palm.className = 'hand__palm';
      const label = document.createElement('span');
      label.className = 'hand__label';
      label.textContent = t(`hand.${hand}`);
      handEl.append(fingersEl, palm, label);
      this.handsEl.append(handEl);
    }
  }

  elementsFor(code) {
    return this.keyEls.get(code) ?? [];
  }

  clearHighlights() {
    for (const els of this.keyEls.values()) {
      for (const el of els) el.classList.remove('is-next', 'is-modifier', 'is-layer');
    }
    for (const el of this.fingerEls.values()) el.classList.remove('is-active');
  }

  /** Marks the layer key when the character is not on a drawn key. */
  markLayer() {
    for (const code of this.keyboard.layerCodes) {
      for (const el of this.elementsFor(code)) el.classList.add('is-layer');
    }
  }

  /**
   * Highlights the key (and modifier) needed for `char`, plus the finger.
   * `deadPending` skips the dead key step once it has already been typed.
   */
  highlight(char, deadPending = false) {
    this.clearHighlights();
    const steps = keyStepsFor(char, this.keyboard.layout);
    if (!steps) return;

    const step = deadPending && steps.length > 1 ? steps[1] : steps[0];
    const targets = this.elementsFor(step.code);
    for (const el of targets) el.classList.add('is-next');
    if (!targets.length) this.markLayer();

    const finger = this.keyboard.fingerOf(step.code);
    if (finger) this.fingerEls.get(finger)?.classList.add('is-active');

    if (step.modifier === 'shift') {
      // Shift is pressed with the hand opposite to the key.
      const shiftCode = finger?.startsWith('l') ? 'ShiftRight' : 'ShiftLeft';
      for (const el of this.elementsFor(shiftCode)) el.classList.add('is-modifier');
      this.fingerEls.get(shiftCode === 'ShiftRight' ? 'r5' : 'l5')?.classList.add('is-active');
    } else if (step.modifier === 'altgr') {
      const altgr = this.elementsFor('AltRight');
      for (const el of altgr) el.classList.add('is-modifier');
      if (!altgr.length) this.markLayer();
      this.fingerEls.get('rt')?.classList.add('is-active');
    }
  }

  /** Dims every key not owned by `fingerId`; pass null to show them all. */
  spotlightFinger(fingerId) {
    for (const [code, els] of this.keyEls) {
      const owner = this.keyboard.fingerOf(code);
      for (const el of els) {
        el.classList.toggle('is-dimmed', Boolean(fingerId) && owner !== fingerId);
        el.classList.toggle('is-spotlit', Boolean(fingerId) && owner === fingerId);
      }
    }
    for (const [id, el] of this.fingerEls) {
      el.classList.toggle('is-active', id === fingerId);
    }
  }

  flash(code, ok = true) {
    const className = ok ? 'is-pressed' : 'is-error';
    for (const el of this.elementsFor(code)) {
      el.classList.add(className);
      setTimeout(() => el.classList.remove(className), 110);
    }
  }
}

export { FINGERS };
