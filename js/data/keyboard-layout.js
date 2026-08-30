/**
 * Keyboard layouts: Spanish (ISO), English US (ANSI) and English UK (ISO).
 *
 * Every key declares the characters it produces so the trainer can highlight
 * the physical key (and the modifier) required by the next expected character.
 *
 *   base   -> character typed with no modifier
 *   shift  -> character typed while holding Shift
 *   altgr  -> character typed while holding AltGr
 *   dead   -> true when the key is a dead key (accents, diaeresis)
 *   home   -> true when the key belongs to the home row resting position
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

/** Bottom row is identical on the three layouts. */
const MODIFIER_ROW = [
  { code: 'ControlLeft', label: 'Ctrl', finger: 'l5', width: 1.5 },
  { code: 'MetaLeft', label: 'Cmd', finger: 'l5', width: 1.25 },
  { code: 'AltLeft', label: 'Alt', finger: 'lt', width: 1.25 },
  { code: 'Space', base: ' ', label: 'Espacio', finger: 'rt', width: 6.5 },
  { code: 'AltRight', label: 'AltGr', finger: 'rt', width: 1.25 },
  { code: 'MetaRight', label: 'Cmd', finger: 'r5', width: 1.25 },
  { code: 'ContextMenu', label: '☰', finger: 'r5', width: 1.25 },
  { code: 'ControlRight', label: 'Ctrl', finger: 'r5', width: 1.5 },
];

/** Letter block shared by every Latin layout, with its finger assignment. */
const LETTERS_TOP = [
  { code: 'KeyQ', base: 'q', shift: 'Q', finger: 'l5' },
  { code: 'KeyW', base: 'w', shift: 'W', finger: 'l4' },
  { code: 'KeyE', base: 'e', shift: 'E', finger: 'l3' },
  { code: 'KeyR', base: 'r', shift: 'R', finger: 'l2' },
  { code: 'KeyT', base: 't', shift: 'T', finger: 'l2' },
  { code: 'KeyY', base: 'y', shift: 'Y', finger: 'r2' },
  { code: 'KeyU', base: 'u', shift: 'U', finger: 'r2' },
  { code: 'KeyI', base: 'i', shift: 'I', finger: 'r3' },
  { code: 'KeyO', base: 'o', shift: 'O', finger: 'r4' },
  { code: 'KeyP', base: 'p', shift: 'P', finger: 'r5' },
];

const LETTERS_HOME = [
  { code: 'KeyA', base: 'a', shift: 'A', finger: 'l5', home: true },
  { code: 'KeyS', base: 's', shift: 'S', finger: 'l4', home: true },
  { code: 'KeyD', base: 'd', shift: 'D', finger: 'l3', home: true },
  { code: 'KeyF', base: 'f', shift: 'F', finger: 'l2', home: true },
  { code: 'KeyG', base: 'g', shift: 'G', finger: 'l2' },
  { code: 'KeyH', base: 'h', shift: 'H', finger: 'r2' },
  { code: 'KeyJ', base: 'j', shift: 'J', finger: 'r2', home: true },
  { code: 'KeyK', base: 'k', shift: 'K', finger: 'r3', home: true },
  { code: 'KeyL', base: 'l', shift: 'L', finger: 'r4', home: true },
];

const LETTERS_BOTTOM = [
  { code: 'KeyZ', base: 'z', shift: 'Z', finger: 'l5' },
  { code: 'KeyX', base: 'x', shift: 'X', finger: 'l4' },
  { code: 'KeyC', base: 'c', shift: 'C', finger: 'l3' },
  { code: 'KeyV', base: 'v', shift: 'V', finger: 'l2' },
  { code: 'KeyB', base: 'b', shift: 'B', finger: 'l2' },
  { code: 'KeyN', base: 'n', shift: 'N', finger: 'r2' },
  { code: 'KeyM', base: 'm', shift: 'M', finger: 'r2' },
];

/* ------------------------------------------------------ Spanish ISO rows */

const SPANISH_ROWS = [
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
    ...LETTERS_TOP,
    { code: 'BracketLeft', base: '`', shift: '^', altgr: '[', finger: 'r5', dead: true },
    { code: 'BracketRight', base: '+', shift: '*', altgr: ']', finger: 'r5' },
    { code: 'Enter', label: '⏎', finger: 'r5', width: 1.5, tall: true },
  ],
  [
    { code: 'CapsLock', label: 'Bloq', finger: 'l5', width: 1.75 },
    ...LETTERS_HOME,
    { code: 'Semicolon', base: 'ñ', shift: 'Ñ', finger: 'r5', home: true },
    { code: 'Quote', base: '´', shift: '¨', altgr: '{', finger: 'r5', dead: true },
    { code: 'Backslash', base: 'ç', shift: 'Ç', altgr: '}', finger: 'r5' },
  ],
  [
    { code: 'ShiftLeft', label: '⇧', finger: 'l5', width: 1.25 },
    { code: 'IntlBackslash', base: '<', shift: '>', finger: 'l5' },
    ...LETTERS_BOTTOM,
    { code: 'Comma', base: ',', shift: ';', finger: 'r3' },
    { code: 'Period', base: '.', shift: ':', finger: 'r4' },
    { code: 'Slash', base: '-', shift: '_', finger: 'r5' },
    { code: 'ShiftRight', label: '⇧', finger: 'r5', width: 2.75 },
  ],
  MODIFIER_ROW,
];

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

/* --------------------------------------------------- English US ANSI rows */

const US_ROWS = [
  [
    { code: 'Backquote', base: '`', shift: '~', finger: 'l5' },
    { code: 'Digit1', base: '1', shift: '!', finger: 'l5' },
    { code: 'Digit2', base: '2', shift: '@', finger: 'l4' },
    { code: 'Digit3', base: '3', shift: '#', finger: 'l3' },
    { code: 'Digit4', base: '4', shift: '$', finger: 'l2' },
    { code: 'Digit5', base: '5', shift: '%', finger: 'l2' },
    { code: 'Digit6', base: '6', shift: '^', finger: 'r2' },
    { code: 'Digit7', base: '7', shift: '&', finger: 'r2' },
    { code: 'Digit8', base: '8', shift: '*', finger: 'r3' },
    { code: 'Digit9', base: '9', shift: '(', finger: 'r4' },
    { code: 'Digit0', base: '0', shift: ')', finger: 'r5' },
    { code: 'Minus', base: '-', shift: '_', finger: 'r5' },
    { code: 'Equal', base: '=', shift: '+', finger: 'r5' },
    { code: 'Backspace', label: '⌫', finger: 'r5', width: 2 },
  ],
  [
    { code: 'Tab', label: 'Tab', finger: 'l5', width: 1.5 },
    ...LETTERS_TOP,
    { code: 'BracketLeft', base: '[', shift: '{', finger: 'r5' },
    { code: 'BracketRight', base: ']', shift: '}', finger: 'r5' },
    { code: 'Backslash', base: '\\', shift: '|', finger: 'r5', width: 1.5 },
  ],
  [
    { code: 'CapsLock', label: 'Caps', finger: 'l5', width: 1.75 },
    ...LETTERS_HOME,
    { code: 'Semicolon', base: ';', shift: ':', finger: 'r5', home: true },
    { code: 'Quote', base: "'", shift: '"', finger: 'r5' },
    { code: 'Enter', label: '⏎', finger: 'r5', width: 2.25 },
  ],
  [
    { code: 'ShiftLeft', label: '⇧', finger: 'l5', width: 2.25 },
    ...LETTERS_BOTTOM,
    { code: 'Comma', base: ',', shift: '<', finger: 'r3' },
    { code: 'Period', base: '.', shift: '>', finger: 'r4' },
    { code: 'Slash', base: '/', shift: '?', finger: 'r5' },
    { code: 'ShiftRight', label: '⇧', finger: 'r5', width: 2.75 },
  ],
  MODIFIER_ROW,
];

/* --------------------------------------------------- English UK ISO rows */

const UK_ROWS = [
  [
    { code: 'Backquote', base: '`', shift: '¬', altgr: '¦', finger: 'l5' },
    { code: 'Digit1', base: '1', shift: '!', finger: 'l5' },
    { code: 'Digit2', base: '2', shift: '"', finger: 'l4' },
    { code: 'Digit3', base: '3', shift: '£', finger: 'l3' },
    { code: 'Digit4', base: '4', shift: '$', altgr: '€', finger: 'l2' },
    { code: 'Digit5', base: '5', shift: '%', finger: 'l2' },
    { code: 'Digit6', base: '6', shift: '^', finger: 'r2' },
    { code: 'Digit7', base: '7', shift: '&', finger: 'r2' },
    { code: 'Digit8', base: '8', shift: '*', finger: 'r3' },
    { code: 'Digit9', base: '9', shift: '(', finger: 'r4' },
    { code: 'Digit0', base: '0', shift: ')', finger: 'r5' },
    { code: 'Minus', base: '-', shift: '_', finger: 'r5' },
    { code: 'Equal', base: '=', shift: '+', finger: 'r5' },
    { code: 'Backspace', label: '⌫', finger: 'r5', width: 2 },
  ],
  [
    { code: 'Tab', label: 'Tab', finger: 'l5', width: 1.5 },
    ...LETTERS_TOP,
    { code: 'BracketLeft', base: '[', shift: '{', finger: 'r5' },
    { code: 'BracketRight', base: ']', shift: '}', finger: 'r5' },
    { code: 'Enter', label: '⏎', finger: 'r5', width: 1.5, tall: true },
  ],
  [
    { code: 'CapsLock', label: 'Caps', finger: 'l5', width: 1.75 },
    ...LETTERS_HOME,
    { code: 'Semicolon', base: ';', shift: ':', finger: 'r5', home: true },
    { code: 'Quote', base: "'", shift: '@', finger: 'r5' },
    { code: 'Backslash', base: '#', shift: '~', finger: 'r5' },
  ],
  [
    { code: 'ShiftLeft', label: '⇧', finger: 'l5', width: 1.25 },
    { code: 'IntlBackslash', base: '\\', shift: '|', finger: 'l5' },
    ...LETTERS_BOTTOM,
    { code: 'Comma', base: ',', shift: '<', finger: 'r3' },
    { code: 'Period', base: '.', shift: '>', finger: 'r4' },
    { code: 'Slash', base: '/', shift: '?', finger: 'r5' },
    { code: 'ShiftRight', label: '⇧', finger: 'r5', width: 2.75 },
  ],
  MODIFIER_ROW,
];

/**
 * Available layouts. `course` selects the lesson plan: the English layouts
 * share one course because their letter block is identical.
 */
export const LAYOUTS = {
  es: { id: 'es', name: 'Español (ISO)', short: 'ES', course: 'es', rows: SPANISH_ROWS, dead: SPANISH_DEAD },
  us: { id: 'us', name: 'English (US)', short: 'US', course: 'en', rows: US_ROWS, dead: {} },
  uk: { id: 'uk', name: 'English (UK)', short: 'UK', course: 'en', rows: UK_ROWS, dead: {} },
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
 * Builds, per layout, the map from every producible character to the key
 * press (or press sequence) needed. Values are arrays of steps:
 * { code, modifier } where modifier is 'none' | 'shift' | 'altgr'.
 */
function buildIndex(layout) {
  const charMap = new Map();
  const keyByCode = new Map(layout.rows.flat().map((key) => [key.code, key]));

  for (const key of keyByCode.values()) {
    if (key.dead) continue;
    if (key.base !== undefined) charMap.set(key.base, [{ code: key.code, modifier: 'none' }]);
    if (key.shift !== undefined) charMap.set(key.shift, [{ code: key.code, modifier: 'shift' }]);
    if (key.altgr !== undefined && !charMap.has(key.altgr)) {
      charMap.set(key.altgr, [{ code: key.code, modifier: 'altgr' }]);
    }
  }

  for (const [deadCode, variants] of Object.entries(layout.dead)) {
    for (const [level, combos] of Object.entries(variants)) {
      const modifier = level === 'shift' ? 'shift' : 'none';
      for (const [result, letter] of Object.entries(combos)) {
        const letterKey = [...keyByCode.values()].find(
          (k) => k.base === letter.toLowerCase() && !k.dead,
        );
        if (!letterKey) continue;
        const isUpper = letter !== letter.toLowerCase();
        charMap.set(result, [
          { code: deadCode, modifier },
          { code: letterKey.code, modifier: isUpper ? 'shift' : 'none' },
        ]);
      }
    }
  }

  return { charMap, keyByCode };
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
  return indexOf(layout).charMap.get(char) ?? null;
}

/** Looks up a key definition by its physical code. */
export function keyByCode(code, layout) {
  return indexOf(layout).keyByCode.get(code) ?? null;
}

/** Finger id that should press `char`, or null when the character is unknown. */
export function fingerFor(char, layout) {
  const steps = keyStepsFor(char, layout);
  if (!steps) return null;
  return keyByCode(steps[0].code, layout)?.finger ?? null;
}

/** Home row keys, in physical order, for the resting position. */
export function homeKeys(layout) {
  return layout.rows.flat().filter((key) => key.home);
}

/**
 * Keys each finger is responsible for, as printable labels, skipping
 * modifiers and everything the learner does not type as a character.
 */
export function keysByFinger(layout) {
  const map = new Map(Object.keys(FINGERS).map((id) => [id, []]));
  for (const key of layout.rows.flat()) {
    if (key.base === undefined || key.base === ' ') continue;
    map.get(key.finger)?.push(key.base.toUpperCase());
  }
  return map;
}
