/**
 * Spanish (ISO) keyboard layout.
 *
 * Every key declares the characters it produces so the trainer can highlight
 * the physical key (and the modifier) required by the next expected character.
 *
 *   base   -> character typed with no modifier
 *   shift  -> character typed while holding Shift
 *   altgr  -> character typed while holding AltGr
 *   dead   -> true when the key is a dead key (accents, diaeresis)
 */

export const FINGERS = {
  l5: { id: 'l5', name: 'meñique izquierdo', hand: 'left', index: 0 },
  l4: { id: 'l4', name: 'anular izquierdo', hand: 'left', index: 1 },
  l3: { id: 'l3', name: 'corazón izquierdo', hand: 'left', index: 2 },
  l2: { id: 'l2', name: 'índice izquierdo', hand: 'left', index: 3 },
  lt: { id: 'lt', name: 'pulgar izquierdo', hand: 'left', index: 4 },
  rt: { id: 'rt', name: 'pulgar derecho', hand: 'right', index: 4 },
  r2: { id: 'r2', name: 'índice derecho', hand: 'right', index: 3 },
  r3: { id: 'r3', name: 'corazón derecho', hand: 'right', index: 2 },
  r4: { id: 'r4', name: 'anular derecho', hand: 'right', index: 1 },
  r5: { id: 'r5', name: 'meñique derecho', hand: 'right', index: 0 },
};

export const KEYBOARD_ROWS = [
  [
    { code: 'Backquote', base: 'º', shift: 'ª', altgr: '\\', finger: 'l5' },
    { code: 'Digit1', base: '1', shift: '!', altgr: '|', finger: 'l5' },
    { code: 'Digit2', base: '2', shift: '"', altgr: '@', finger: 'l4' },
    { code: 'Digit3', base: '3', shift: '·', altgr: '#', finger: 'l3' },
    { code: 'Digit4', base: '4', shift: '$', altgr: '~', finger: 'l2' },
    { code: 'Digit5', base: '5', shift: '%', altgr: '€', finger: 'l2' },
    { code: 'Digit6', base: '6', shift: '&', altgr: '¬', finger: 'r2' },
    { code: 'Digit7', base: '7', shift: '/', finger: 'r2' },
    { code: 'Digit8', base: '8', shift: '(', finger: 'r3' },
    { code: 'Digit9', base: '9', shift: ')', finger: 'r4' },
    { code: 'Digit0', base: '0', shift: '=', finger: 'r5' },
    { code: 'Minus', base: "'", shift: '?', finger: 'r5' },
    { code: 'Equal', base: '¡', shift: '¿', finger: 'r5' },
    { code: 'Backspace', label: '⌫', finger: 'r5', width: 2 },
  ],
  [
    { code: 'Tab', label: 'Tab', finger: 'l5', width: 1.5 },
    { code: 'KeyQ', base: 'q', shift: 'Q', finger: 'l5' },
    { code: 'KeyW', base: 'w', shift: 'W', finger: 'l4' },
    { code: 'KeyE', base: 'e', shift: 'E', altgr: '€', finger: 'l3' },
    { code: 'KeyR', base: 'r', shift: 'R', finger: 'l2' },
    { code: 'KeyT', base: 't', shift: 'T', finger: 'l2' },
    { code: 'KeyY', base: 'y', shift: 'Y', finger: 'r2' },
    { code: 'KeyU', base: 'u', shift: 'U', finger: 'r2' },
    { code: 'KeyI', base: 'i', shift: 'I', finger: 'r3' },
    { code: 'KeyO', base: 'o', shift: 'O', finger: 'r4' },
    { code: 'KeyP', base: 'p', shift: 'P', finger: 'r5' },
    { code: 'BracketLeft', base: '`', shift: '^', altgr: '[', finger: 'r5', dead: true },
    { code: 'BracketRight', base: '+', shift: '*', altgr: ']', finger: 'r5' },
    { code: 'Enter', label: '⏎', finger: 'r5', width: 1.5, tall: true },
  ],
  [
    { code: 'CapsLock', label: 'Bloq', finger: 'l5', width: 1.75 },
    { code: 'KeyA', base: 'a', shift: 'A', finger: 'l5', home: true },
    { code: 'KeyS', base: 's', shift: 'S', finger: 'l4', home: true },
    { code: 'KeyD', base: 'd', shift: 'D', finger: 'l3', home: true },
    { code: 'KeyF', base: 'f', shift: 'F', finger: 'l2', home: true },
    { code: 'KeyG', base: 'g', shift: 'G', finger: 'l2' },
    { code: 'KeyH', base: 'h', shift: 'H', finger: 'r2' },
    { code: 'KeyJ', base: 'j', shift: 'J', finger: 'r2', home: true },
    { code: 'KeyK', base: 'k', shift: 'K', finger: 'r3', home: true },
    { code: 'KeyL', base: 'l', shift: 'L', finger: 'r4', home: true },
    { code: 'Semicolon', base: 'ñ', shift: 'Ñ', finger: 'r5', home: true },
    { code: 'Quote', base: '´', shift: '¨', altgr: '{', finger: 'r5', dead: true },
    { code: 'Backslash', base: 'ç', shift: 'Ç', altgr: '}', finger: 'r5' },
  ],
  [
    { code: 'ShiftLeft', label: '⇧', finger: 'l5', width: 1.25 },
    { code: 'IntlBackslash', base: '<', shift: '>', finger: 'l5' },
    { code: 'KeyZ', base: 'z', shift: 'Z', finger: 'l5' },
    { code: 'KeyX', base: 'x', shift: 'X', finger: 'l4' },
    { code: 'KeyC', base: 'c', shift: 'C', finger: 'l3' },
    { code: 'KeyV', base: 'v', shift: 'V', finger: 'l2' },
    { code: 'KeyB', base: 'b', shift: 'B', finger: 'l2' },
    { code: 'KeyN', base: 'n', shift: 'N', finger: 'r2' },
    { code: 'KeyM', base: 'm', shift: 'M', finger: 'r2' },
    { code: 'Comma', base: ',', shift: ';', finger: 'r3' },
    { code: 'Period', base: '.', shift: ':', finger: 'r4' },
    { code: 'Slash', base: '-', shift: '_', finger: 'r5' },
    { code: 'ShiftRight', label: '⇧', finger: 'r5', width: 2.75 },
  ],
  [
    { code: 'ControlLeft', label: 'Ctrl', finger: 'l5', width: 1.5 },
    { code: 'MetaLeft', label: 'Cmd', finger: 'l5', width: 1.25 },
    { code: 'AltLeft', label: 'Alt', finger: 'lt', width: 1.25 },
    { code: 'Space', base: ' ', label: 'Espacio', finger: 'rt', width: 6.5 },
    { code: 'AltRight', label: 'AltGr', finger: 'rt', width: 1.25 },
    { code: 'MetaRight', label: 'Cmd', finger: 'r5', width: 1.25 },
    { code: 'ContextMenu', label: '☰', finger: 'r5', width: 1.25 },
    { code: 'ControlRight', label: 'Ctrl', finger: 'r5', width: 1.5 },
  ],
];

/** Dead key + following letter combinations reachable on this layout. */
const DEAD_COMBINATIONS = {
  Quote: {
    base: { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U' },
    shift: { ä: 'a', ë: 'e', ï: 'i', ö: 'o', ü: 'u', Ä: 'A', Ë: 'E', Ï: 'I', Ö: 'O', Ü: 'U' },
  },
  BracketLeft: {
    base: { à: 'a', è: 'e', ì: 'i', ò: 'o', ù: 'u' },
    shift: { â: 'a', ê: 'e', î: 'i', ô: 'o', û: 'u' },
  },
};

/**
 * Maps every producible character to the key press (or press sequence) needed.
 * Values are arrays of steps: { code, modifier } where modifier is
 * 'none' | 'shift' | 'altgr'.
 */
function buildCharMap() {
  const map = new Map();
  const byCode = new Map();

  for (const row of KEYBOARD_ROWS) {
    for (const key of row) {
      byCode.set(key.code, key);
      if (key.dead) continue;
      if (key.base !== undefined) map.set(key.base, [{ code: key.code, modifier: 'none' }]);
      if (key.shift !== undefined) map.set(key.shift, [{ code: key.code, modifier: 'shift' }]);
      if (key.altgr !== undefined && !map.has(key.altgr)) {
        map.set(key.altgr, [{ code: key.code, modifier: 'altgr' }]);
      }
    }
  }

  for (const [deadCode, variants] of Object.entries(DEAD_COMBINATIONS)) {
    for (const [level, combos] of Object.entries(variants)) {
      const modifier = level === 'shift' ? 'shift' : 'none';
      for (const [result, letter] of Object.entries(combos)) {
        const letterKey = [...byCode.values()].find(
          (k) => k.base === letter.toLowerCase() && !k.dead,
        );
        if (!letterKey) continue;
        const isUpper = letter !== letter.toLowerCase();
        map.set(result, [
          { code: deadCode, modifier },
          { code: letterKey.code, modifier: isUpper ? 'shift' : 'none' },
        ]);
      }
    }
  }

  return map;
}

export const CHAR_TO_KEYS = buildCharMap();
export const KEY_BY_CODE = new Map(KEYBOARD_ROWS.flat().map((key) => [key.code, key]));

/** Returns the first key press needed to produce `char`, or null if unknown. */
export function keyStepsFor(char) {
  return CHAR_TO_KEYS.get(char) ?? null;
}

/** Finger id that should press `char`, or null when the character is unknown. */
export function fingerFor(char) {
  const steps = keyStepsFor(char);
  if (!steps) return null;
  return KEY_BY_CODE.get(steps[0].code)?.finger ?? null;
}
