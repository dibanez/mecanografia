/**
 * Interface translations.
 *
 * The interface language is independent from the keyboard layout: a Spanish
 * speaker may practise on a US board, and the other way round. Lesson content
 * (words and texts) always belongs to the course, which the layout selects.
 *
 * Markup keeps the Spanish copy inline so the page still reads without
 * JavaScript; `applyTranslations` replaces it on load and on every change.
 *   data-i18n       -> textContent
 *   data-i18n-html  -> innerHTML (copy with <b>, <kbd> and the like)
 *   data-i18n-attr  -> "attribute:key" pairs, comma separated
 */

import { COPY } from './i18n-copy.js';

export const LANGUAGES = [
  { id: 'es', name: 'Español' },
  { id: 'en', name: 'English' },
];

export const DEFAULT_LANGUAGE = 'es';

/** Chrome of the application. Page copy lives in i18n-copy.js. */
const CHROME = {
  es: {
    'route.tutorial': '#/tutorial',
    'route.lessons': '#/lecciones',
    'route.practice': '#/practica',
    'route.free': '#/libre',
    'route.freeText': '#/libre/texto',
    'route.progress': '#/progreso',
    'nav.tutorial': 'Tutorial',
    'nav.lessons': 'Lecciones',
    'nav.free': 'Práctica libre',
    'nav.progress': 'Progreso',
    'topbar.settings': 'Ajustes',
    'topbar.theme': 'Cambiar tema',

    'settings.title': 'Ajustes',
    'settings.language': 'Idioma de la interfaz',
    'settings.layout': 'Distribución del teclado',
    'settings.layoutHint':
      'La distribución decide qué carácter da cada tecla y con ella el temario: teclado español o inglés.',
    'settings.appleNote':
      'Este teclado tiene distribución propia en Mac: elige «{name}» para que la @, las comillas ' +
      'y la almohadilla caigan donde de verdad están.',
    'settings.form': 'Tipo de teclado',
    'settings.formHint': 'Solo cambia el dibujo y, en los partidos, qué dedo toca cada tecla.',
    'settings.layerNote':
      'En este teclado los números y algunos signos viven en una capa. Cuando haga falta uno, se ilumina la tecla de capa.',
    'settings.display': 'Durante la práctica',
    'settings.showKeyboard': 'Mostrar el teclado en pantalla',
    'settings.showHands': 'Mostrar la guía de manos',
    'settings.close': 'Cerrar',

    'form.full': 'Completo, con teclado numérico',
    'form.tkl': 'Sin numérico (TKL)',
    'form.compact': 'Compacto 75 %',
    'form.sixty': 'Compacto 60 %',
    'form.laptop': 'Portátil',
    'form.laptopNumpad': 'Portátil con numérico',
    'form.mac': 'Mac (Magic Keyboard)',
    'form.macNumpad': 'Mac con numérico',
    'form.split': 'Partido clásico',
    'form.columnar': 'Partido columnar',
    'form.ortho': 'Ortolineal',
    'form.full.note': 'El teclado de sobremesa de toda la vida: 104 o 105 teclas.',
    'form.tkl.note': 'Igual que el completo pero sin el bloque numérico de la derecha.',
    'form.compact.note': 'Bloque principal con flechas y una columna de teclas de edición.',
    'form.sixty.note': 'Solo el bloque principal, sin fila de funciones ni flechas.',
    'form.laptop.note': 'Fila de funciones y flechas encajadas abajo a la derecha, con ↑ y ↓ a media altura.',
    'form.laptopNumpad.note': 'El de un portátil de 15 pulgadas o más, con bloque numérico a la derecha.',
    'form.mac.note':
      'Teclas de Apple: ⌘ command a los lados del espacio, ⌥ option, ⌃ control y fn. El tercer ' +
      'nivel se pulsa con ⌥ option en vez de AltGr.',
    'form.macNumpad.note': 'El Magic Keyboard largo, con bloque numérico a la derecha.',
    'form.split.note': 'Dos mitades escalonadas, estilo Microsoft Sculpt o Kinesis Freestyle.',
    'form.columnar.note': 'Columnas rectas y pulgares con teclas propias, estilo ErgoDox, Moonlander o Corne.',
    'form.ortho.note': 'Rejilla perfecta de una pieza, estilo Planck o Preonic.',

    'key.Escape': 'Esc',
    'key.Tab': 'Tab',
    'key.CapsLock': 'Bloq',
    'key.ShiftLeft': '⇧',
    'key.ShiftRight': '⇧',
    'key.ControlLeft': 'Ctrl',
    'key.ControlRight': 'Ctrl',
    'key.MetaLeft': 'Cmd',
    'key.MetaRight': 'Cmd',
    'key.AltLeft': 'Alt',
    'key.AltRight': 'AltGr',
    'key.ContextMenu': '☰',
    'key.Backspace': '⌫',
    'key.Enter': '⏎',
    'key.Space': 'Espacio',
    'key.Layer': 'Capa',
    'key.LayerRight': 'Capa',
    'key.Fn': 'Fn',
    'key.Insert': 'Ins',
    'key.Delete': 'Supr',
    'key.Home': 'Inic',
    'key.End': 'Fin',
    'key.PageUp': 'ReP',
    'key.PageDown': 'AvP',
    'key.PrintScreen': 'Impr',
    'key.ScrollLock': 'BloqD',
    'key.Pause': 'Paus',
    'key.NumLock': 'BloqN',
    'key.NumpadEnter': '⏎',

    'hand.left': 'izquierda',
    'hand.right': 'derecha',
    'finger.l5': 'meñique izquierdo',
    'finger.l4': 'anular izquierdo',
    'finger.l3': 'corazón izquierdo',
    'finger.l2': 'índice izquierdo',
    'finger.lt': 'pulgar izquierdo',
    'finger.rt': 'pulgar derecho',
    'finger.r2': 'índice derecho',
    'finger.r3': 'corazón derecho',
    'finger.r4': 'anular derecho',
    'finger.r5': 'meñique derecho',
    'finger.short.left': ' izq.',
    'finger.short.right': ' der.',
  },
  en: {
    'route.tutorial': '#/tutorial',
    'route.lessons': '#/lecciones',
    'route.practice': '#/practica',
    'route.free': '#/libre',
    'route.freeText': '#/libre/texto',
    'route.progress': '#/progreso',
    'route.tutorial': '#/tutorial',
    'route.lessons': '#/lessons',
    'route.practice': '#/practice',
    'route.free': '#/free',
    'route.freeText': '#/free/text',
    'route.progress': '#/progress',
    'nav.tutorial': 'Tutorial',
    'nav.lessons': 'Lessons',
    'nav.free': 'Free practice',
    'nav.progress': 'Progress',
    'topbar.settings': 'Settings',
    'topbar.theme': 'Switch theme',

    'settings.title': 'Settings',
    'settings.language': 'Interface language',
    'settings.layout': 'Keyboard layout',
    'settings.layoutHint':
      'The layout decides which character each key types, and with it the course: Spanish or English keyboard.',
    'settings.appleNote':
      'This keyboard has its own layout on the Mac: pick “{name}” so that @, the quotes and the ' +
      'hash land where they really are.',
    'settings.form': 'Keyboard type',
    'settings.formHint': 'Only changes the drawing and, on split boards, which finger owns each key.',
    'settings.layerNote':
      'On this keyboard the digits and some symbols live on a layer. Whenever one comes up, the layer key lights up.',
    'settings.display': 'While practising',
    'settings.showKeyboard': 'Show the on-screen keyboard',
    'settings.showHands': 'Show the hand guide',
    'settings.close': 'Close',

    'form.full': 'Full size, with numpad',
    'form.tkl': 'Tenkeyless (TKL)',
    'form.compact': '75% compact',
    'form.sixty': '60% compact',
    'form.laptop': 'Laptop',
    'form.laptopNumpad': 'Laptop with numpad',
    'form.mac': 'Mac (Magic Keyboard)',
    'form.macNumpad': 'Mac with numpad',
    'form.split': 'Classic split',
    'form.columnar': 'Columnar split',
    'form.ortho': 'Ortholinear',
    'form.full.note': 'The classic desktop board: 104 or 105 keys.',
    'form.tkl.note': 'Same as full size without the number block on the right.',
    'form.compact.note': 'Main block plus arrows and a column of editing keys.',
    'form.sixty.note': 'Main block only, no function row and no arrows.',
    'form.laptop.note': 'Function row and arrows squeezed bottom right, with ↑ and ↓ at half height.',
    'form.laptopNumpad.note': 'A 15-inch or larger laptop, with the number block on the right.',
    'form.mac.note':
      'Apple keys: ⌘ command flanking the space bar, ⌥ option, ⌃ control and fn. The third level ' +
      'is typed with ⌥ option instead of AltGr.',
    'form.macNumpad.note': 'The long Magic Keyboard, with the number block on the right.',
    'form.split.note': 'Two staggered halves, Microsoft Sculpt or Kinesis Freestyle style.',
    'form.columnar.note': 'Straight columns and dedicated thumb keys, ErgoDox, Moonlander or Corne style.',
    'form.ortho.note': 'A perfect one-piece grid, Planck or Preonic style.',

    'key.Escape': 'Esc',
    'key.Tab': 'Tab',
    'key.CapsLock': 'Caps',
    'key.ShiftLeft': '⇧',
    'key.ShiftRight': '⇧',
    'key.ControlLeft': 'Ctrl',
    'key.ControlRight': 'Ctrl',
    'key.MetaLeft': 'Cmd',
    'key.MetaRight': 'Cmd',
    'key.AltLeft': 'Alt',
    'key.AltRight': 'AltGr',
    'key.ContextMenu': '☰',
    'key.Backspace': '⌫',
    'key.Enter': '⏎',
    'key.Space': 'Space',
    'key.Layer': 'Layer',
    'key.LayerRight': 'Layer',
    'key.Fn': 'Fn',
    'key.Insert': 'Ins',
    'key.Delete': 'Del',
    'key.Home': 'Home',
    'key.End': 'End',
    'key.PageUp': 'PgUp',
    'key.PageDown': 'PgDn',
    'key.PrintScreen': 'PrtSc',
    'key.ScrollLock': 'ScrLk',
    'key.Pause': 'Pause',
    'key.NumLock': 'Num',
    'key.NumpadEnter': '⏎',

    'hand.left': 'left',
    'hand.right': 'right',
    'finger.l5': 'left little finger',
    'finger.l4': 'left ring finger',
    'finger.l3': 'left middle finger',
    'finger.l2': 'left index finger',
    'finger.lt': 'left thumb',
    'finger.rt': 'right thumb',
    'finger.r2': 'right index finger',
    'finger.r3': 'right middle finger',
    'finger.r4': 'right ring finger',
    'finger.r5': 'right little finger',
    'finger.short.left': 'left ',
    'finger.short.right': 'right ',
  },
};

const DICTIONARIES = {
  es: { ...CHROME.es, ...COPY.es },
  en: { ...CHROME.en, ...COPY.en },
};

let current = DEFAULT_LANGUAGE;

/** Replaces {placeholders} in a dictionary value. */
function format(value, params) {
  if (!params) return value;
  return value.replace(/\{(\w+)\}/g, (match, name) => (name in params ? String(params[name]) : match));
}

/** Views the hash router can name, each with a route.* entry per language. */
const ROUTE_VIEWS = ['tutorial', 'lessons', 'practice', 'free', 'progress'];

const sectionOf = (languageId, view) =>
  (DICTIONARIES[languageId][`route.${view}`] ?? '').replace(/^#\//, '').split('/')[0];

/**
 * View a hash section names. Every language is understood everywhere, so a
 * link shared from one page still opens on another.
 */
export function viewOfSection(section) {
  if (!section) return null;
  for (const { id } of LANGUAGES) {
    for (const view of ROUTE_VIEWS) {
      if (sectionOf(id, view) === section) return view;
    }
  }
  return null;
}

/** The same hash written in another language, to keep it across a switch. */
export function translateHash(hash, languageId) {
  const [section, ...rest] = hash.replace(/^#\//, '').split('/');
  const view = viewOfSection(section);
  if (!view) return hash;
  return [`#/${sectionOf(languageId, view)}`, ...rest].join('/');
}

/**
 * Language a published page is written in, taken from its directory: the root
 * is Spanish and every other language lives in a folder of its own (/en/).
 */
export function pageLanguage() {
  const segments = location.pathname.split('/').filter((part) => part && !part.endsWith('.html'));
  const last = segments.pop();
  return last && last in DICTIONARIES ? last : DEFAULT_LANGUAGE;
}

/** URL of this same view in another language. */
export function urlForLanguage(id) {
  let path = location.pathname.replace(/[^/]*\.html$/, '');
  if (pageLanguage() !== DEFAULT_LANGUAGE) path = path.replace(/[^/]+\/$/, '');
  return `${path}${id === DEFAULT_LANGUAGE ? '' : `${id}/`}${translateHash(location.hash, id)}`;
}

export function getLanguage() {
  return current;
}

export function setLanguage(id) {
  current = DICTIONARIES[id] ? id : DEFAULT_LANGUAGE;
  // The page build imports this module without a DOM.
  if (typeof document !== 'undefined') document.documentElement.lang = current;
  return current;
}

/** Language to start with when nothing was stored yet. */
export function detectLanguage() {
  const preferred = navigator.languages ?? [navigator.language ?? ''];
  for (const tag of preferred) {
    const base = String(tag).slice(0, 2).toLowerCase();
    if (DICTIONARIES[base]) return base;
  }
  return DEFAULT_LANGUAGE;
}

/** Translates `key`, replacing {placeholders} with `params`. */
export function t(key, params) {
  return translator(current)(key, params);
}

/** Lookup for a language other than the active one, used to build the pages. */
export function translator(languageId) {
  const dictionary = DICTIONARIES[languageId] ?? DICTIONARIES[DEFAULT_LANGUAGE];
  return (key, params) =>
    format(dictionary[key] ?? DICTIONARIES[DEFAULT_LANGUAGE][key] ?? key, params);
}

/** Whether the dictionary carries `key`, to tell a label from a missing one. */
export function hasTranslation(key) {
  return key in DICTIONARIES[current] || key in DICTIONARIES[DEFAULT_LANGUAGE];
}

/** Picks the current language out of a { es, en } value; strings pass through. */
export function localized(value) {
  if (value == null || typeof value === 'string') return value;
  return value[current] ?? value[DEFAULT_LANGUAGE] ?? '';
}

/** Rewrites every translatable node under `root` (the document by default). */
export function applyTranslations(root = document) {
  for (const el of root.querySelectorAll('[data-i18n]')) {
    el.textContent = t(el.dataset.i18n);
  }
  for (const el of root.querySelectorAll('[data-i18n-html]')) {
    el.innerHTML = t(el.dataset.i18nHtml);
  }
  for (const el of root.querySelectorAll('[data-i18n-attr]')) {
    for (const pair of el.dataset.i18nAttr.split(',')) {
      const [attribute, key] = pair.split(':').map((part) => part.trim());
      if (attribute && key) el.setAttribute(attribute, t(key));
    }
  }
}
