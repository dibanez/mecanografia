/**
 * Logical keyboard layouts: which character every physical key produces.
 *
 * This module knows nothing about the shape of the keyboard. A split, an
 * ortholinear or a full-size board all report the same `event.code` for the
 * same character, so the mapping is shared and only the drawing changes;
 * the physical shapes live in keyboard-forms.js.
 *
 *   base   -> character typed with no modifier
 *   shift  -> character typed while holding Shift
 *   altgr  -> character typed while holding AltGr
 *   dead   -> true when the key is a dead key (accents, diaeresis)
 */

export const FINGERS = {
  l5: { id: 'l5', hand: 'left', index: 0 },
  l4: { id: 'l4', hand: 'left', index: 1 },
  l3: { id: 'l3', hand: 'left', index: 2 },
  l2: { id: 'l2', hand: 'left', index: 3 },
  lt: { id: 'lt', hand: 'left', index: 4 },
  rt: { id: 'rt', hand: 'right', index: 4 },
  r2: { id: 'r2', hand: 'right', index: 3 },
  r3: { id: 'r3', hand: 'right', index: 2 },
  r4: { id: 'r4', hand: 'right', index: 1 },
  r5: { id: 'r5', hand: 'right', index: 0 },
};

/**
 * Touch-typing finger assignment by physical key code. Row-staggered boards
 * all share it; the columnar and ortholinear shapes override part of it.
 */
export const FINGER_BY_CODE = {
  Escape: 'l5', F1: 'l5', F2: 'l4', F3: 'l3', F4: 'l2', F5: 'l2', F6: 'r2',
  F7: 'r2', F8: 'r3', F9: 'r4', F10: 'r5', F11: 'r5', F12: 'r5',
  PrintScreen: 'r5', ScrollLock: 'r5', Pause: 'r5',

  Backquote: 'l5', Digit1: 'l5', Digit2: 'l4', Digit3: 'l3', Digit4: 'l2',
  Digit5: 'l2', Digit6: 'r2', Digit7: 'r2', Digit8: 'r3', Digit9: 'r4',
  Digit0: 'r5', Minus: 'r5', Equal: 'r5', Backspace: 'r5',

  Tab: 'l5', KeyQ: 'l5', KeyW: 'l4', KeyE: 'l3', KeyR: 'l2', KeyT: 'l2',
  KeyY: 'r2', KeyU: 'r2', KeyI: 'r3', KeyO: 'r4', KeyP: 'r5',
  BracketLeft: 'r5', BracketRight: 'r5', Backslash: 'r5',

  CapsLock: 'l5', KeyA: 'l5', KeyS: 'l4', KeyD: 'l3', KeyF: 'l2', KeyG: 'l2',
  KeyH: 'r2', KeyJ: 'r2', KeyK: 'r3', KeyL: 'r4', Semicolon: 'r5',
  Quote: 'r5', Enter: 'r5',

  ShiftLeft: 'l5', IntlBackslash: 'l5', KeyZ: 'l5', KeyX: 'l4', KeyC: 'l3',
  KeyV: 'l2', KeyB: 'l2', KeyN: 'r2', KeyM: 'r2', Comma: 'r3', Period: 'r4',
  Slash: 'r5', ShiftRight: 'r5',

  ControlLeft: 'l5', MetaLeft: 'l5', AltLeft: 'lt', Space: 'rt',
  AltRight: 'rt', MetaRight: 'r5', ContextMenu: 'r5', ControlRight: 'r5',
  Fn: 'l5', Layer: 'lt', LayerRight: 'rt',

  Insert: 'r2', Home: 'r3', PageUp: 'r4', Delete: 'r2', End: 'r3',
  PageDown: 'r4', ArrowLeft: 'r2', ArrowDown: 'r3', ArrowUp: 'r3', ArrowRight: 'r4',

  NumLock: 'r2', NumpadDivide: 'r3', NumpadMultiply: 'r4', NumpadSubtract: 'r5',
  Numpad7: 'r2', Numpad8: 'r3', Numpad9: 'r4', NumpadAdd: 'r5',
  Numpad4: 'r2', Numpad5: 'r3', Numpad6: 'r4',
  Numpad1: 'r2', Numpad2: 'r3', Numpad3: 'r4', NumpadEnter: 'r5',
  Numpad0: 'rt', NumpadDecimal: 'r4',
};

/** Resting position: identical on the three layouts, ñ replacing ; on ES. */
export const HOME_CODES = new Set([
  'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon',
]);

/** Letter block, shared by every Latin layout. */
const LETTERS = {
  KeyQ: { base: 'q', shift: 'Q' }, KeyW: { base: 'w', shift: 'W' },
  KeyE: { base: 'e', shift: 'E' }, KeyR: { base: 'r', shift: 'R' },
  KeyT: { base: 't', shift: 'T' }, KeyY: { base: 'y', shift: 'Y' },
  KeyU: { base: 'u', shift: 'U' }, KeyI: { base: 'i', shift: 'I' },
  KeyO: { base: 'o', shift: 'O' }, KeyP: { base: 'p', shift: 'P' },
  KeyA: { base: 'a', shift: 'A' }, KeyS: { base: 's', shift: 'S' },
  KeyD: { base: 'd', shift: 'D' }, KeyF: { base: 'f', shift: 'F' },
  KeyG: { base: 'g', shift: 'G' }, KeyH: { base: 'h', shift: 'H' },
  KeyJ: { base: 'j', shift: 'J' }, KeyK: { base: 'k', shift: 'K' },
  KeyL: { base: 'l', shift: 'L' }, KeyZ: { base: 'z', shift: 'Z' },
  KeyX: { base: 'x', shift: 'X' }, KeyC: { base: 'c', shift: 'C' },
  KeyV: { base: 'v', shift: 'V' }, KeyB: { base: 'b', shift: 'B' },
  KeyN: { base: 'n', shift: 'N' }, KeyM: { base: 'm', shift: 'M' },
};

/** Digits and the space bar, identical everywhere. */
const DIGITS = {
  Digit1: { base: '1' }, Digit2: { base: '2' }, Digit3: { base: '3' },
  Digit4: { base: '4' }, Digit5: { base: '5' }, Digit6: { base: '6' },
  Digit7: { base: '7' }, Digit8: { base: '8' }, Digit9: { base: '9' },
  Digit0: { base: '0' },
};

const SPACE = { Space: { base: ' ' } };

const ES_KEYS = {
  ...LETTERS,
  ...DIGITS,
  ...SPACE,
  Backquote: { base: 'º', shift: 'ª', altgr: '\\' },
  Digit1: { base: '1', shift: '!', altgr: '|' },
  Digit2: { base: '2', shift: '"', altgr: '@' },
  Digit3: { base: '3', shift: '·', altgr: '#' },
  Digit4: { base: '4', shift: '$', altgr: '~' },
  Digit5: { base: '5', shift: '%', altgr: '€' },
  Digit6: { base: '6', shift: '&', altgr: '¬' },
  Digit7: { base: '7', shift: '/' },
  Digit8: { base: '8', shift: '(' },
  Digit9: { base: '9', shift: ')' },
  Digit0: { base: '0', shift: '=' },
  Minus: { base: "'", shift: '?' },
  Equal: { base: '¡', shift: '¿' },
  BracketLeft: { base: '`', shift: '^', altgr: '[', dead: true },
  BracketRight: { base: '+', shift: '*', altgr: ']' },
  Semicolon: { base: 'ñ', shift: 'Ñ' },
  Quote: { base: '´', shift: '¨', altgr: '{', dead: true },
  Backslash: { base: 'ç', shift: 'Ç', altgr: '}' },
  IntlBackslash: { base: '<', shift: '>' },
  Comma: { base: ',', shift: ';' },
  Period: { base: '.', shift: ':' },
  Slash: { base: '-', shift: '_' },
};

const US_KEYS = {
  ...LETTERS,
  ...DIGITS,
  ...SPACE,
  Backquote: { base: '`', shift: '~' },
  Digit1: { base: '1', shift: '!' },
  Digit2: { base: '2', shift: '@' },
  Digit3: { base: '3', shift: '#' },
  Digit4: { base: '4', shift: '$' },
  Digit5: { base: '5', shift: '%' },
  Digit6: { base: '6', shift: '^' },
  Digit7: { base: '7', shift: '&' },
  Digit8: { base: '8', shift: '*' },
  Digit9: { base: '9', shift: '(' },
  Digit0: { base: '0', shift: ')' },
  Minus: { base: '-', shift: '_' },
  Equal: { base: '=', shift: '+' },
  BracketLeft: { base: '[', shift: '{' },
  BracketRight: { base: ']', shift: '}' },
  Backslash: { base: '\\', shift: '|' },
  Semicolon: { base: ';', shift: ':' },
  Quote: { base: "'", shift: '"' },
  Comma: { base: ',', shift: '<' },
  Period: { base: '.', shift: '>' },
  Slash: { base: '/', shift: '?' },
};

const UK_KEYS = {
  ...US_KEYS,
  Backquote: { base: '`', shift: '¬', altgr: '¦' },
  Digit2: { base: '2', shift: '"' },
  Digit3: { base: '3', shift: '£' },
  Digit4: { base: '4', shift: '$', altgr: '€' },
  Quote: { base: "'", shift: '@' },
  Backslash: { base: '#', shift: '~' },
  IntlBackslash: { base: '\\', shift: '|' },
};

/** Dead key + following letter combinations reachable on the Spanish layout. */
const SPANISH_DEAD = {
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
 * Available layouts. `course` selects the lesson plan: the English layouts
 * share one course because their letter block is identical. `physical` tells
 * the shapes whether the board has the extra ISO key and the tall Enter.
 */
export const LAYOUTS = {
  es: {
    id: 'es', name: 'Español (ISO)', short: 'ES', course: 'es',
    physical: 'iso', keys: ES_KEYS, dead: SPANISH_DEAD,
  },
  us: {
    id: 'us', name: 'English (US)', short: 'US', course: 'en',
    physical: 'ansi', keys: US_KEYS, dead: {},
  },
  uk: {
    id: 'uk', name: 'English (UK)', short: 'UK', course: 'en',
    physical: 'iso', keys: UK_KEYS, dead: {},
  },
};

export const LAYOUT_LIST = Object.values(LAYOUTS);
export const DEFAULT_LAYOUT_ID = 'es';

export function getLayout(id) {
  return LAYOUTS[id] ?? LAYOUTS[DEFAULT_LAYOUT_ID];
}

/** First layout that teaches `courseId`, used when a link needs a switch. */
export function defaultLayoutForCourse(courseId) {
  return LAYOUT_LIST.find((layout) => layout.course === courseId) ?? LAYOUTS[DEFAULT_LAYOUT_ID];
}

/**
 * Map from every producible character to the key press (or press sequence)
 * that types it: an array of { code, modifier } steps, where modifier is
 * 'none' | 'shift' | 'altgr'.
 */
function buildIndex(layout) {
  const charMap = new Map();

  for (const [code, key] of Object.entries(layout.keys)) {
    if (key.dead) continue;
    if (key.base !== undefined) charMap.set(key.base, [{ code, modifier: 'none' }]);
    if (key.shift !== undefined) charMap.set(key.shift, [{ code, modifier: 'shift' }]);
    if (key.altgr !== undefined && !charMap.has(key.altgr)) {
      charMap.set(key.altgr, [{ code, modifier: 'altgr' }]);
    }
  }

  for (const [deadCode, variants] of Object.entries(layout.dead)) {
    for (const [level, combos] of Object.entries(variants)) {
      const modifier = level === 'shift' ? 'shift' : 'none';
      for (const [result, letter] of Object.entries(combos)) {
        const letterCode = Object.keys(layout.keys).find(
          (code) => layout.keys[code].base === letter.toLowerCase() && !layout.keys[code].dead,
        );
        if (!letterCode) continue;
        const isUpper = letter !== letter.toLowerCase();
        charMap.set(result, [
          { code: deadCode, modifier },
          { code: letterCode, modifier: isUpper ? 'shift' : 'none' },
        ]);
      }
    }
  }

  return charMap;
}

const indexes = new Map();

function indexOf(layout) {
  let index = indexes.get(layout.id);
  if (!index) {
    index = buildIndex(layout);
    indexes.set(layout.id, index);
  }
  return index;
}

/** Returns the key presses needed to produce `char`, or null if unknown. */
export function keyStepsFor(char, layout) {
  return indexOf(layout).get(char) ?? null;
}

/** Characters a key produces, as { base, shift, altgr, dead }. */
export function mappingOf(code, layout) {
  return layout.keys[code] ?? null;
}

/** Finger that owns a physical key on a row-staggered board. */
export function fingerOf(code) {
  return FINGER_BY_CODE[code] ?? null;
}

/** Finger that should press `char`, or null when the character is unknown. */
export function fingerFor(char, layout) {
  const steps = keyStepsFor(char, layout);
  return steps ? fingerOf(steps[0].code) : null;
}
