/**
 * Physical keyboard shapes.
 *
 * A shape says which keys are drawn, where, and which finger owns them; the
 * characters they type come from the layout (keyboard-layout.js). Splitting
 * both concerns is what lets the same Spanish layout be practised on a
 * full-size board, on a split ergonomic one or on an ortholinear grid.
 *
 * A shape is a list of sections laid out side by side. Each section is drawn
 * either as rows (row-staggered boards) or as columns with a vertical offset
 * per column (columnar boards), plus an optional thumb cluster.
 */

import { FINGER_BY_CODE, HOME_CODES, mappingOf } from './keyboard-layout.js';

/** A drawn key: the code plus whatever the layout types with it. */
function key(code, layout, extra = {}) {
  const mapping = mappingOf(code, layout) ?? {};
  return {
    code,
    ...mapping,
    finger: extra.finger ?? FINGER_BY_CODE[code] ?? 'r5',
    home: HOME_CODES.has(code),
    ...extra,
  };
}

/** Arrow cluster, drawn with its glyph instead of the code name. */
const ARROWS = {
  up: { code: 'ArrowUp', label: '↑' },
  down: { code: 'ArrowDown', label: '↓' },
  left: { code: 'ArrowLeft', label: '←' },
  right: { code: 'ArrowRight', label: '→' },
};

/** Numeric keypad key: it repeats a character the main block already types. */
function pad(code, label, w = 1) {
  return { code, label, w };
}

/** Empty cell used to keep sections aligned with each other. */
function gap(w = 1) {
  return { spacer: true, w };
}

/** Two half-height keys sharing one slot, as laptops stack ↑ and ↓. */
function stack(top, bottom) {
  return { stack: [top, bottom] };
}

function cell(entry, layout) {
  if (entry === null) return gap();
  if (entry.spacer) return entry;
  if (entry.stack) return { stack: entry.stack.map((item) => cell(item, layout)) };
  return typeof entry === 'string' ? key(entry, layout) : key(entry.code, layout, entry);
}

function row(codes, layout) {
  return { keys: codes.map((entry) => cell(entry, layout)) };
}

/* ------------------------------------------------------- row-staggered rows */

function functionRow(layout) {
  return row(
    [
      'Escape', gap(0.5),
      'F1', 'F2', 'F3', 'F4', gap(0.5),
      'F5', 'F6', 'F7', 'F8', gap(0.5),
      'F9', 'F10', 'F11', 'F12',
    ],
    layout,
  );
}

function mainRows(layout) {
  const iso = layout.physical === 'iso';
  return [
    row(
      [
        'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6',
        'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal',
        { code: 'Backspace', w: 2 },
      ],
      layout,
    ),
    row(
      [
        { code: 'Tab', w: 1.5 },
        'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP',
        'BracketLeft', 'BracketRight',
        iso ? { code: 'Enter', w: 1.5, tall: true } : { code: 'Backslash', w: 1.5 },
      ],
      layout,
    ),
    row(
      [
        { code: 'CapsLock', w: 1.75 },
        'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL',
        'Semicolon', 'Quote',
        iso ? 'Backslash' : { code: 'Enter', w: 2.25 },
      ],
      layout,
    ),
    row(
      [
        iso ? { code: 'ShiftLeft', w: 1.25 } : { code: 'ShiftLeft', w: 2.25 },
        ...(iso ? ['IntlBackslash'] : []),
        'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash',
        { code: 'ShiftRight', w: 2.75 },
      ],
      layout,
    ),
    row(
      [
        { code: 'ControlLeft', w: 1.5 },
        { code: 'MetaLeft', w: 1.25 },
        { code: 'AltLeft', w: 1.25 },
        { code: 'Space', w: 6.5 },
        { code: 'AltRight', w: 1.25 },
        { code: 'MetaRight', w: 1.25 },
        { code: 'ContextMenu', w: 1.25 },
        { code: 'ControlRight', w: 1.5 },
      ],
      layout,
    ),
  ];
}

/** Main block with the arrow cluster folded into the bottom row (75 %). */
function compactMainRows(layout) {
  const rows = mainRows(layout);
  rows[4] = row(
    [
      { code: 'ControlLeft', w: 1.25 },
      { code: 'MetaLeft', w: 1.25 },
      { code: 'AltLeft', w: 1.25 },
      { code: 'Space', w: 5.5 },
      { code: 'AltRight', w: 1.25 },
      { code: 'Fn', w: 1.25 },
      ARROWS.left, ARROWS.down, ARROWS.up, ARROWS.right,
    ],
    layout,
  );
  return rows;
}

function navSection(layout) {
  return {
    id: 'nav',
    orientation: 'rows',
    lines: [
      row(['PrintScreen', 'ScrollLock', 'Pause'], layout),
      row(['Insert', 'Home', 'PageUp'], layout),
      row(['Delete', 'End', 'PageDown'], layout),
      { keys: [gap(3)] },
      row([gap(), ARROWS.up, gap()], layout),
      row([ARROWS.left, ARROWS.down, ARROWS.right], layout),
    ],
  };
}

/** Single column of editing keys, the one a 75 % board keeps. */
function editColumn(layout) {
  return {
    id: 'edit',
    orientation: 'rows',
    lines: [
      row(['Delete'], layout),
      row(['Home'], layout),
      row(['End'], layout),
      row(['PageUp'], layout),
      row(['PageDown'], layout),
      { keys: [gap(1)] },
    ],
  };
}

function numpadSection(layout) {
  return {
    id: 'numpad',
    orientation: 'rows',
    lines: [
      { keys: [gap(4)] },
      row(['NumLock', pad('NumpadDivide', '/'), pad('NumpadMultiply', '*'), pad('NumpadSubtract', '-')], layout),
      row([pad('Numpad7', '7'), pad('Numpad8', '8'), pad('Numpad9', '9'), pad('NumpadAdd', '+')], layout),
      row([pad('Numpad4', '4'), pad('Numpad5', '5'), pad('Numpad6', '6'), gap()], layout),
      row([pad('Numpad1', '1'), pad('Numpad2', '2'), pad('Numpad3', '3'), 'NumpadEnter'], layout),
      row([pad('Numpad0', '0', 2), pad('NumpadDecimal', '.'), gap()], layout),
    ],
  };
}

function mainSection(layout, { fRow = false, compact = false } = {}) {
  const rows = compact ? compactMainRows(layout) : mainRows(layout);
  return {
    id: 'main',
    orientation: 'rows',
    lines: fRow ? [functionRow(layout), ...rows] : rows,
  };
}

/* ------------------------------------------------------------ laptop rows */

/** Function row without the gaps a desktop board has, plus Delete at the end. */
function laptopFunctionRow(layout) {
  return row(
    ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Delete', gap()],
    layout,
  );
}

/** Bottom row of a PC laptop: the arrows squeeze in, ↑ and ↓ sharing a slot. */
function laptopBottomRow(layout) {
  return row(
    [
      { code: 'ControlLeft', w: 1.25 },
      'Fn',
      'MetaLeft',
      { code: 'AltLeft', w: 1.25 },
      { code: 'Space', w: 5.25 },
      { code: 'AltRight', w: 1.25 },
      'ControlRight',
      ARROWS.left,
      stack(ARROWS.up, ARROWS.down),
      ARROWS.right,
    ],
    layout,
  );
}

function laptopSection(layout) {
  const rows = mainRows(layout);
  rows[4] = laptopBottomRow(layout);
  return { id: 'main', orientation: 'rows', lines: [laptopFunctionRow(layout), ...rows] };
}

/* --------------------------------------------------------------- Mac rows */

/**
 * Apple legends. The codes are the ones the browser reports on a Mac:
 * command arrives as Meta and option as Alt, so the third level (option)
 * keeps working through the same AltRight the layouts already use.
 */
const MAC_KEYS = {
  Tab: { code: 'Tab', label: '⇥', w: 1.5 },
  CapsLock: { code: 'CapsLock', label: '⇪', w: 1.75 },
  Backspace: { code: 'Backspace', label: '⌫', w: 2 },
  Fn: { code: 'Fn', label: 'fn' },
  ControlLeft: { code: 'ControlLeft', label: '⌃', finger: 'l5' },
  AltLeft: { code: 'AltLeft', label: '⌥', finger: 'lt' },
  MetaLeft: { code: 'MetaLeft', label: '⌘', w: 1.25, finger: 'lt' },
  MetaRight: { code: 'MetaRight', label: '⌘', w: 1.25, finger: 'rt' },
  AltRight: { code: 'AltRight', label: '⌥', finger: 'rt' },
};

function macFunctionRow(layout) {
  return row(
    ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', gap(2)],
    layout,
  );
}

/** Apple boards have no menu key and no right control; option flanks command. */
function macBottomRow(layout) {
  return row(
    [
      MAC_KEYS.Fn,
      MAC_KEYS.ControlLeft,
      MAC_KEYS.AltLeft,
      MAC_KEYS.MetaLeft,
      { code: 'Space', w: 5.5 },
      MAC_KEYS.MetaRight,
      MAC_KEYS.AltRight,
      ARROWS.left,
      stack(ARROWS.up, ARROWS.down),
      ARROWS.right,
    ],
    layout,
  );
}

/**
 * Magic Keyboard / MacBook block: the same staggered rows with Apple legends.
 * Enter is ↩ and Backspace is ⌫ (engraved "delete").
 */
function macSection(layout) {
  const iso = layout.physical === 'iso';
  const enter = iso
    ? { code: 'Enter', label: '↩', w: 1.5, tall: true }
    : { code: 'Enter', label: '↩', w: 2.25 };
  return {
    id: 'main',
    orientation: 'rows',
    lines: [
      macFunctionRow(layout),
      row(
        [
          'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6',
          'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', MAC_KEYS.Backspace,
        ],
        layout,
      ),
      row(
        [
          MAC_KEYS.Tab,
          'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP',
          'BracketLeft', 'BracketRight',
          iso ? enter : { code: 'Backslash', w: 1.5 },
        ],
        layout,
      ),
      row(
        [
          MAC_KEYS.CapsLock,
          'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL',
          'Semicolon', 'Quote',
          iso ? 'Backslash' : enter,
        ],
        layout,
      ),
      row(
        [
          { code: 'ShiftLeft', label: '⇧', w: iso ? 1.25 : 2.25 },
          ...(iso ? ['IntlBackslash'] : []),
          'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash',
          { code: 'ShiftRight', label: '⇧', w: 2.75 },
        ],
        layout,
      ),
      macBottomRow(layout),
    ],
  };
}

/* -------------------------------------------------------------- split rows */

/**
 * Classic split: the same staggered rows cut in two, Microsoft Sculpt or
 * Kinesis Freestyle style. Both halves carry a space bar, as the real boards
 * do; the trainer keeps teaching it as a thumb key.
 */
function splitSections(layout) {
  const iso = layout.physical === 'iso';
  return [
    {
      id: 'left',
      orientation: 'rows',
      lines: [
        row(['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'], layout),
        row([{ code: 'Tab', w: 1.5 }, 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT'], layout),
        row([{ code: 'CapsLock', w: 1.75 }, 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG'], layout),
        row(
          [
            { code: 'ShiftLeft', w: iso ? 1.25 : 2.25 },
            ...(iso ? ['IntlBackslash'] : []),
            'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB',
          ],
          layout,
        ),
        row(
          [
            { code: 'ControlLeft', w: 1.5 },
            { code: 'MetaLeft', w: 1.25 },
            { code: 'AltLeft', w: 1.25 },
            { code: 'Space', w: 2.5, finger: 'rt' },
          ],
          layout,
        ),
      ],
    },
    {
      id: 'right',
      orientation: 'rows',
      lines: [
        row(
          [
            'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal',
            { code: 'Backspace', w: 2 },
          ],
          layout,
        ),
        row(
          [
            'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight',
            iso ? { code: 'Enter', w: 1.5, tall: true } : { code: 'Backslash', w: 1.5 },
          ],
          layout,
        ),
        row(
          [
            'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote',
            iso ? 'Backslash' : { code: 'Enter', w: 2.25 },
          ],
          layout,
        ),
        row(
          ['KeyN', 'KeyM', 'Comma', 'Period', 'Slash', { code: 'ShiftRight', w: 2.75 }],
          layout,
        ),
        row(
          [
            { code: 'Space', w: 2.5 },
            { code: 'AltRight', w: 1.25 },
            { code: 'MetaRight', w: 1.25 },
            { code: 'ControlRight', w: 1.5 },
          ],
          layout,
        ),
      ],
    },
  ];
}

/* ----------------------------------------------------------- columnar split */

/** Column offsets in key units: how much lower each column sits. */
const LEFT_OFFSETS = [0.3, 0.25, 0.1, -0.1, 0, 0.2];
const RIGHT_OFFSETS = [0.2, 0, -0.1, 0.1, 0.25, 0.3];

function column(codes, layout, finger, offset) {
  return {
    offset,
    keys: codes.map((code) =>
      typeof code === 'string' ? key(code, layout, { finger }) : key(code.code, layout, { finger, ...code }),
    ),
  };
}

/**
 * Columnar split, ErgoDox / Moonlander / Corne style: straight columns, a
 * stagger per finger length and a thumb cluster per hand. Digits and part of
 * the punctuation live on a layer, which the trainer highlights as such.
 */
function columnarSections(layout) {
  const left = [
    column(['Tab', 'ControlLeft', 'ShiftLeft'], layout, 'l5', LEFT_OFFSETS[0]),
    column(['KeyQ', 'KeyA', 'KeyZ'], layout, 'l5', LEFT_OFFSETS[1]),
    column(['KeyW', 'KeyS', 'KeyX'], layout, 'l4', LEFT_OFFSETS[2]),
    column(['KeyE', 'KeyD', 'KeyC'], layout, 'l3', LEFT_OFFSETS[3]),
    column(['KeyR', 'KeyF', 'KeyV'], layout, 'l2', LEFT_OFFSETS[4]),
    column(['KeyT', 'KeyG', 'KeyB'], layout, 'l2', LEFT_OFFSETS[5]),
  ];
  const right = [
    column(['KeyY', 'KeyH', 'KeyN'], layout, 'r2', RIGHT_OFFSETS[0]),
    column(['KeyU', 'KeyJ', 'KeyM'], layout, 'r2', RIGHT_OFFSETS[1]),
    column(['KeyI', 'KeyK', 'Comma'], layout, 'r3', RIGHT_OFFSETS[2]),
    column(['KeyO', 'KeyL', 'Period'], layout, 'r4', RIGHT_OFFSETS[3]),
    column(['KeyP', 'Semicolon', 'Slash'], layout, 'r5', RIGHT_OFFSETS[4]),
    column(['Backspace', 'Quote', 'ShiftRight'], layout, 'r5', RIGHT_OFFSETS[5]),
  ];

  return [
    {
      id: 'left',
      orientation: 'columns',
      lines: left,
      thumbs: [
        key('MetaLeft', layout, { finger: 'lt' }),
        key('Layer', layout, { finger: 'lt', role: 'layer' }),
        key('Space', layout, { finger: 'lt', w: 1.25 }),
      ],
    },
    {
      id: 'right',
      orientation: 'columns',
      lines: right,
      thumbs: [
        key('Enter', layout, { finger: 'rt', w: 1.25 }),
        key('LayerRight', layout, { finger: 'rt', role: 'layer' }),
        key('AltRight', layout, { finger: 'rt' }),
      ],
    },
  ];
}

/* -------------------------------------------------------------- ortholinear */

const ORTHO_FINGERS = ['l5', 'l5', 'l4', 'l3', 'l2', 'l2', 'r2', 'r2', 'r3', 'r4', 'r5', 'r5'];

function orthoRow(codes, layout) {
  return {
    keys: codes.map((code, index) => key(code, layout, { finger: ORTHO_FINGERS[index] })),
  };
}

/** One-piece grid, Planck / Preonic style: no stagger, thumbs on the bottom row. */
function orthoSections(layout) {
  return [
    {
      id: 'main',
      orientation: 'rows',
      lines: [
        orthoRow(
          [
            'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6',
            'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Backspace',
          ],
          layout,
        ),
        orthoRow(
          [
            'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI',
            'KeyO', 'KeyP', 'BracketLeft',
          ],
          layout,
        ),
        orthoRow(
          [
            'Escape', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK',
            'KeyL', 'Semicolon', 'Quote',
          ],
          layout,
        ),
        orthoRow(
          [
            'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM',
            'Comma', 'Period', 'Slash', 'Enter',
          ],
          layout,
        ),
        row(
          [
            { code: 'ControlLeft', finger: 'l5' },
            { code: 'MetaLeft', finger: 'l4' },
            { code: 'AltLeft', finger: 'l3' },
            { code: 'Minus', finger: 'lt' },
            { code: 'Layer', finger: 'lt', role: 'layer' },
            { code: 'Space', w: 2, finger: 'rt' },
            { code: 'Equal', finger: 'rt' },
            { code: 'BracketRight', finger: 'rt' },
            { code: 'Backslash', finger: 'r3' },
            { code: 'AltRight', finger: 'r4' },
            { code: 'ControlRight', finger: 'r5' },
          ],
          layout,
        ),
      ],
    },
  ];
}

/* -------------------------------------------------------------------- forms */

export const FORMS = {
  full: { id: 'full', sections: (layout) => [mainSection(layout, { fRow: true }), navSection(layout), numpadSection(layout)] },
  tkl: { id: 'tkl', sections: (layout) => [mainSection(layout, { fRow: true }), navSection(layout)] },
  compact: { id: 'compact', sections: (layout) => [mainSection(layout, { fRow: true, compact: true }), editColumn(layout)] },
  sixty: { id: 'sixty', sections: (layout) => [mainSection(layout)] },
  laptop: { id: 'laptop', sections: (layout) => [laptopSection(layout)] },
  laptopNumpad: {
    id: 'laptopNumpad',
    sections: (layout) => [laptopSection(layout), numpadSection(layout)],
  },
  mac: { id: 'mac', apple: true, sections: (layout) => [macSection(layout)] },
  macNumpad: {
    id: 'macNumpad',
    apple: true,
    sections: (layout) => [macSection(layout), numpadSection(layout)],
  },
  split: { id: 'split', split: true, sections: splitSections },
  columnar: { id: 'columnar', split: true, layered: true, sections: columnarSections },
  ortho: { id: 'ortho', sections: orthoSections },
};

export const FORM_LIST = Object.values(FORMS);
export const DEFAULT_FORM_ID = 'sixty';

export function getForm(id) {
  return FORMS[id] ?? FORMS[DEFAULT_FORM_ID];
}

/**
 * Builds the drawable keyboard for a layout on a shape. `keys` keeps one
 * definition per code, preferring the one whose finger matches the standard
 * assignment when a key is drawn twice (both halves of a split have a space).
 */
export function buildKeyboard(layout, formId) {
  const form = getForm(formId);
  const sections = form.sections(layout);
  const keys = new Map();

  const register = (item) => {
    if (item.spacer) return;
    if (item.stack) {
      item.stack.forEach(register);
      return;
    }
    const previous = keys.get(item.code);
    if (!previous || (previous.finger !== FINGER_BY_CODE[item.code] && item.finger === FINGER_BY_CODE[item.code])) {
      keys.set(item.code, item);
    }
  };

  for (const section of sections) {
    for (const line of section.lines) line.keys.forEach(register);
    (section.thumbs ?? []).forEach(register);
  }

  return {
    layout,
    form,
    sections,
    keys,
    has: (code) => keys.has(code),
    fingerOf: (code) => keys.get(code)?.finger ?? FINGER_BY_CODE[code] ?? null,
    layerCodes: [...keys.values()].filter((item) => item.role === 'layer').map((item) => item.code),
  };
}

/** Home row keys of the drawn keyboard, ordered left to right. */
export function homeKeys(keyboard) {
  return [...keyboard.keys.values()].filter((item) => item.home);
}

/**
 * Keys each finger is responsible for, as printable labels, skipping
 * modifiers and everything the learner does not type as a character.
 */
export function keysByFinger(keyboard) {
  const map = new Map();
  for (const item of keyboard.keys.values()) {
    if (item.base === undefined || item.base === ' ') continue;
    if (!map.has(item.finger)) map.set(item.finger, []);
    map.get(item.finger).push(item.base.toUpperCase());
  }
  return map;
}
