/** Application shell: routing, lesson practice loop, tutorial and progress. */

import {
  FINGERS,
  LAYOUTS,
  LAYOUT_LIST,
  defaultLayoutForCourse,
  getLayout,
  keyStepsFor,
} from './data/keyboard-layout.js';
import {
  FORM_LIST,
  buildKeyboard,
  getForm,
  homeKeys,
  keysByFinger,
} from './data/keyboard-forms.js';
import {
  COURSES,
  buildExercise,
  courseFitsLayout,
  courseOfLesson,
  getCourse,
  getLesson,
  lessonsOfBlock,
} from './data/lessons.js';
import { consentAnswered } from './consent.js';
import { TypingEngine, ratingFor } from './engine.js';
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  applyTranslations,
  detectLanguage,
  getLanguage,
  localized,
  pageLanguage,
  viewOfSection,
  setLanguage,
  t,
  translator,
  urlForLanguage,
} from './i18n.js';
import { KeyboardView } from './keyboard.js';
import { initShare, openShare } from './share.js';
import { store } from './storage.js';

const $ = (selector) => document.querySelector(selector);

const app = {
  lesson: null,
  lastResult: null,
  freeText: '',
  engine: null,
  keyboard: null,
  view: null,
  tutorialView: null,
  settingsView: null,
  welcomeView: null,
  welcomeStep: 1,
  // Layouts still compatible with what has been typed into the detector.
  detect: null,
  input: null,
  charEls: [],
  deadPending: false,
  tickId: null,
  settings: store.getSettings(),
  layout: null,
  form: null,
  course: null,
};

/* ------------------------------------------------------------- utilities */

function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

function starsMarkup(count) {
  return `<span class="stars">${'★'.repeat(count)}<span class="stars--empty">${'★'.repeat(3 - count)}</span></span>`;
}

function locale() {
  return getLanguage() === 'en' ? 'en-GB' : 'es-ES';
}

function charName(char) {
  return char === ' ' ? t('common.space') : char;
}

/* ---------------------------------------------------------------- theme */

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  app.settings = store.saveSettings({ theme });
}

/* ------------------------------------------------ layout, shape, language */

/**
 * Apple boards do not always type what the Windows layout of the same country
 * types, so point at the matching variant instead of teaching the wrong key.
 */
function updateAppleNote() {
  const variant = app.form.apple ? LAYOUTS[app.layout.appleVariant] : null;
  const note = $('#setting-apple-note');
  note.hidden = !variant;
  if (variant) note.textContent = t('settings.appleNote', { name: variant.name });
}

/** Rebuilds the drawn keyboard shared by practice, tutorial and settings. */
function rebuildKeyboard() {
  app.keyboard = buildKeyboard(app.layout, app.form.id);
  app.view?.setKeyboard(app.keyboard);
  app.tutorialView?.setKeyboard(app.keyboard);
  app.settingsView?.setKeyboard(app.keyboard);
  app.welcomeView?.setKeyboard(app.keyboard);
  $('#setting-layer-note').hidden = !app.keyboard.layerCodes.length || !app.form.layered;
  updateAppleNote();
}

/**
 * Which lessons to teach. The keyboard has the last word — a Spanish drill of
 * ñ and accents cannot be typed on a US board — and, when both courses fit,
 * the exercises follow the language of the page.
 */
function preferredCourse() {
  const wanted = COURSES[getLanguage()];
  return wanted && courseFitsLayout(wanted, app.layout) ? wanted : getCourse(app.layout.course);
}

/** Switches keyboard layout, which may switch the course of lessons with it. */
function applyLayout(layoutId, { rerender = true } = {}) {
  app.layout = getLayout(layoutId);
  app.course = preferredCourse();
  app.settings = store.saveSettings({ layout: app.layout.id });
  // Routing switches the layout too, so no dialog can be left behind.
  $('#setting-layout').value = app.layout.id;
  $('#welcome-layout').value = app.layout.id;
  rebuildKeyboard();
  if (!rerender) return;

  // A lesson from the previous course no longer applies to this keyboard.
  if (app.lesson && !app.lesson.custom) location.hash = t('route.lessons');
  else route();
}

/** Switches the physical shape; the characters and the course stay put. */
function applyForm(formId) {
  app.form = getForm(formId);
  app.settings = store.saveSettings({ form: app.form.id });
  $('#setting-form').value = app.form.id;
  $('#welcome-form').value = app.form.id;
  $('#setting-form-note').textContent = t(`form.${app.form.id}.note`);
  rebuildKeyboard();
}

/**
 * Every language is published as its own page, so switching is a navigation
 * and the address always tells the truth about what is on screen.
 */
function applyLanguage(languageId) {
  app.settings = store.saveSettings({ language: languageId });
  if (languageId === getLanguage()) return;
  location.href = urlForLanguage(languageId);
}

/**
 * The URL decides the language. Only the root sends anyone away, and only to
 * a language they chose themselves: search engines index each page as its own
 * language, and redirecting them by browser settings would fight that.
 */
function redirectToChosenLanguage() {
  if (pageLanguage() !== DEFAULT_LANGUAGE) return false;
  const chosen = app.settings.language;
  if (!chosen || chosen === DEFAULT_LANGUAGE) return false;
  if (!LANGUAGES.some((language) => language.id === chosen)) return false;
  location.replace(urlForLanguage(chosen));
  return true;
}

/** Offers, in its own words, the language the browser asks for. */
function offerBrowserLanguage() {
  const link = $('#language-offer');
  const preferred = detectLanguage();
  const offer = !app.settings.language && preferred !== getLanguage();
  link.hidden = !offer;
  if (!offer) return;

  link.textContent = translator(preferred)('language.switch');
  link.href = urlForLanguage(preferred);
  link.hreflang = preferred;
  link.addEventListener('click', () => store.saveSettings({ language: preferred }));
}

function applyDisplaySettings() {
  $('#keyboard').hidden = !app.settings.showKeyboard;
  $('#hands').hidden = !app.settings.showHands;
}

/* -------------------------------------------------------------- routing */

const VIEWS = {
  tutorial: '#view-tutorial',
  lessons: '#view-lessons',
  practice: '#view-practice',
  free: '#view-free',
  progress: '#view-progress',
};

function showView(name) {
  for (const [key, selector] of Object.entries(VIEWS)) {
    $(selector).hidden = key !== name;
  }
  for (const link of document.querySelectorAll('.nav__link')) {
    link.classList.toggle('is-active', link.dataset.view === name);
  }
  // The hash router never reloads the page, so tell the tag manager about it.
  window.dataLayer?.push({
    event: 'view_change',
    view: name,
    layout: app.layout?.id,
    keyboard_form: app.form?.id,
    language: getLanguage(),
    path: location.hash || '#/lecciones',
  });
}

function route() {
  const hash = location.hash.replace(/^#\/?/, '');
  const [section, param] = hash.split('/');
  // Sections are named in every published language, so a link shared from one
  // page opens the same view on the other.
  const view = viewOfSection(section);

  stopPractice();

  if (view === 'practice' && param) {
    const course = courseOfLesson(param);
    const lesson = course ? getLesson(param) : null;
    if (lesson) {
      // A link to a lesson only drags the keyboard along when the current one
      // cannot type it; otherwise the visitor keeps the board they chose.
      if (!courseFitsLayout(course, app.layout)) {
        applyLayout(defaultLayoutForCourse(course.id).id, { rerender: false });
      }
      app.course = course;
      startLesson(lesson);
      return;
    }
  }
  if (view === 'tutorial') {
    renderTutorial();
    showView('tutorial');
    return;
  }
  if (view === 'free') {
    if (param && app.freeText) {
      startFreePractice(app.freeText);
      return;
    }
    showView('free');
    return;
  }
  if (view === 'progress') {
    renderProgress();
    showView('progress');
    return;
  }
  renderLessons();
  showView('lessons');
}

/* -------------------------------------------------------------- tutorial */

function shortFingerName(id) {
  const name = t(`finger.${id}`);
  return getLanguage() === 'en'
    ? name.replace('left ', 'L. ').replace('right ', 'R. ').replace(' finger', '')
    : name.replace(' izquierdo', ' izq.').replace(' derecho', ' der.');
}

function renderTutorial() {
  $('#tutorial-settings-state').innerHTML = t('tutorial.setup.state', {
    layout: app.layout.name,
    form: t(`form.${app.form.id}`),
    language: LANGUAGES.find(({ id }) => id === getLanguage()).name,
  });

  const home = homeKeys(app.keyboard);
  const render = (hand) =>
    home
      .filter((key) => key.finger.startsWith(hand))
      .map(
        (key) =>
          `<kbd class="homerow__key${key.code === 'KeyF' || key.code === 'KeyJ' ? ' homerow__key--bump' : ''}" style="--finger-color: var(--finger-${key.finger.slice(1)})">${key.base.toUpperCase()}</kbd>`,
      )
      .join('');
  $('#tutorial-home-left').innerHTML = render('l');
  $('#tutorial-home-right').innerHTML = render('r');

  const perFinger = keysByFinger(app.keyboard);
  $('#tutorial-fingers').innerHTML = Object.keys(FINGERS)
    .map((id) => {
      const keys = id.endsWith('t') ? [t('key.Space')] : perFinger.get(id) ?? [];
      return `
        <button class="finger-chip" type="button" data-finger="${id}">
          <span class="finger-chip__name">${shortFingerName(id)}</span>
          <span class="finger-chip__keys">${keys.join(' ') || '—'}</span>
        </button>`;
    })
    .join('');

  $('#tutorial-start').textContent = t('tutorial.start', {
    lesson: localized(app.course.lessons[0].title),
  });
}

function spotlight(fingerId) {
  app.tutorialView.spotlightFinger(fingerId);
  for (const chip of document.querySelectorAll('.finger-chip')) {
    chip.classList.toggle('is-active', chip.dataset.finger === fingerId);
  }
}

function initTutorial() {
  app.tutorialView = new KeyboardView(
    $('#tutorial-keyboard'),
    $('#tutorial-hands'),
    app.keyboard,
    { tinted: true },
  );

  const legend = $('#tutorial-fingers');
  legend.addEventListener('pointerover', (event) => {
    const chip = event.target.closest('.finger-chip');
    if (chip) spotlight(chip.dataset.finger);
  });
  legend.addEventListener('pointerleave', () => spotlight(null));
  legend.addEventListener('focusin', (event) => {
    const chip = event.target.closest('.finger-chip');
    if (chip) spotlight(chip.dataset.finger);
  });
  legend.addEventListener('click', (event) => {
    const chip = event.target.closest('.finger-chip');
    if (chip) spotlight(chip.classList.contains('is-active') ? null : chip.dataset.finger);
  });

  $('#tutorial-start').addEventListener('click', () => {
    location.hash = `${t('route.practice')}/${app.course.lessons[0].id}`;
  });

  // The step that explains the settings opens them, rather than pointing at ⚙.
  $('#tutorial-settings').addEventListener('click', openSettings);
}

/* --------------------------------------------------------------- welcome */

/** Panels of the welcome tour: what this is, which keyboard, the tutorial. */
const WELCOME_STEPS = 3;

function setWelcomeStep(step) {
  stopDetecting();
  app.welcomeStep = Math.min(Math.max(step, 1), WELCOME_STEPS);
  for (const panel of document.querySelectorAll('.welcome__step')) {
    panel.hidden = Number(panel.dataset.step) !== app.welcomeStep;
  }
  document.querySelectorAll('.welcome__dot').forEach((dot, index) => {
    dot.classList.toggle('is-active', index < app.welcomeStep);
  });

  $('#welcome-count').textContent = t('welcome.count', {
    current: app.welcomeStep,
    total: WELCOME_STEPS,
  });
  $('#welcome-back').hidden = app.welcomeStep === 1;
  // The last step is the one that hands the visitor over to the tutorial.
  const last = app.welcomeStep === WELCOME_STEPS;
  $('#welcome-next').textContent = t(last ? 'welcome.start' : 'welcome.next');
}

/** Opens the tour, building its preview keyboard the first time. */
function openWelcome() {
  if (!app.welcomeView) {
    app.welcomeView = new KeyboardView($('#welcome-keyboard'), null, app.keyboard, { tinted: true });
  }
  setWelcomeStep(1);
  $('#welcome-dialog').showModal();
}

function initWelcome() {
  const dialog = $('#welcome-dialog');
  $('#welcome-dots').innerHTML = '<span class="welcome__dot"></span>'.repeat(WELCOME_STEPS);

  // The same two questions as the settings, asked before the first lesson.
  $('#welcome-layout').addEventListener('change', (event) => applyLayout(event.target.value));
  $('#welcome-form').addEventListener('change', (event) => applyForm(event.target.value));

  $('#detect-start').addEventListener('click', () => {
    if (app.detect) stopDetecting();
    else startDetecting();
  });
  dialog.addEventListener('keydown', readDetectKey);

  $('#welcome-back').addEventListener('click', () => setWelcomeStep(app.welcomeStep - 1));
  $('#welcome-next').addEventListener('click', () => {
    if (app.welcomeStep < WELCOME_STEPS) {
      setWelcomeStep(app.welcomeStep + 1);
      return;
    }
    location.hash = t('route.tutorial');
    dialog.close('tutorial');
  });
  $('#welcome-skip').addEventListener('click', () => {
    location.hash = t('route.lessons');
    dialog.close('lessons');
  });

  // However it is closed — a button or Esc — the tour has had its one turn.
  dialog.addEventListener('close', () => {
    app.settings = store.saveSettings({ onboarded: true });
    window.dataLayer?.push({
      event: 'onboarding_done',
      ending: dialog.returnValue || 'dismissed',
      step: app.welcomeStep,
      layout: app.layout.id,
      keyboard_form: app.form.id,
      language: getLanguage(),
    });
    app.input?.focus();
  });
}

/* ----------------------------------------------------- keyboard detection */

/**
 * Reading the layout off the visitor instead of asking them to name it.
 *
 * The browser reports both the physical key (`code`) and the character it
 * produced (`key`), and that pair is exactly what tells the layouts apart: the
 * key right of the L types ñ on the Spanish one and ; on the three English
 * ones. Every press narrows the candidates, so the questions below are only
 * the shortest route — any key the visitor happens to hit counts the same.
 */
const DETECT_PROBES = ['Semicolon', 'Backquote', 'Backslash'];

function setDetectStatus(html) {
  const status = $('#detect-status');
  status.innerHTML = html;
  status.hidden = !html;
}

/** Layouts that could still have produced `typed` on that physical key. */
function narrowLayouts(candidates, code, typed) {
  return candidates.filter((layout) => {
    const key = layout.keys[code];
    // A key the layout says nothing about cannot rule it out either.
    if (!key) return true;
    return [key.base, key.shift, key.altgr].some((char) => char?.toLowerCase() === typed);
  });
}

/** Next question worth asking: the first key the candidates disagree on. */
function nextProbe(candidates) {
  return DETECT_PROBES.find(
    (code) => new Set(candidates.map((layout) => layout.keys[code]?.base)).size > 1,
  );
}

/** Asks for a key, pointing at it on the drawn board so it can be found. */
function askForKey(code) {
  setDetectStatus(t(`detect.probe.${code}`));
  app.welcomeView?.highlightKey(code);
}

function stopDetecting(message = '') {
  app.detect = null;
  app.welcomeView?.clearHighlights();
  $('#detect-start').textContent = t('detect.start');
  setDetectStatus(message);
}

function startDetecting() {
  app.detect = LAYOUT_LIST.slice();
  $('#detect-start').textContent = t('detect.cancel');
  askForKey(nextProbe(app.detect));
}

function readDetectKey(event) {
  if (!app.detect) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    stopDetecting();
    return;
  }
  // While the keyboard is being read, no key belongs to the buttons behind.
  event.preventDefault();
  // Modifiers, function keys and dead keys report a name, not a character.
  if (event.key.length !== 1) return;

  const narrowed = narrowLayouts(app.detect, event.code, event.key.toLowerCase());
  if (narrowed.length === 1) {
    const [layout] = narrowed;
    applyLayout(layout.id);
    stopDetecting(t('detect.done', { name: layout.name }));
    return;
  }

  const probe = narrowed.length ? nextProbe(narrowed) : null;
  if (!probe) {
    // Either nothing matched, or what is left cannot be told apart by asking.
    stopDetecting(t('detect.unknown'));
    return;
  }
  app.detect = narrowed;
  askForKey(probe);
}

/* -------------------------------------------------------------- lessons */

function nextPendingLesson() {
  const state = store.getState();
  return (
    app.course.lessons.find((lesson) => (state.lessons[lesson.id]?.stars ?? 0) < 3) ??
    app.course.lessons[0]
  );
}

function renderLessons() {
  const state = store.getState();
  const { lessons, blocks } = app.course;
  const progressEntries = lessons.map((lesson) => state.lessons[lesson.id]).filter(Boolean);
  const done = progressEntries.length;
  const bestWpm = Math.max(0, ...progressEntries.map((l) => l.bestWpm));
  const accuracies = progressEntries.map((l) => l.bestAccuracy);
  const avgAccuracy = accuracies.length
    ? Math.round((accuracies.reduce((a, b) => a + b, 0) / accuracies.length) * 10) / 10
    : 0;

  $('#hero-lead').textContent = t(`course.lead.${app.course.id}`, { count: lessons.length });
  $('#hero-stats').innerHTML = `
    <div class="hero__stat"><b>${done}/${lessons.length}</b><span>${t('lessons.stat.done')}</span></div>
    <div class="hero__stat"><b>${bestWpm}</b><span>${t('lessons.stat.wpm')}</span></div>
    <div class="hero__stat"><b>${avgAccuracy || '—'}%</b><span>${t('lessons.stat.accuracy')}</span></div>`;

  const container = $('#blocks');
  container.textContent = '';
  for (const block of blocks) {
    const section = document.createElement('section');
    section.className = 'block';
    const cards = lessonsOfBlock(app.course, block.id)
      .map((lesson) => {
        const progress = state.lessons[lesson.id];
        const stars = progress?.stars ?? 0;
        return `
          <button class="lesson-card ${progress ? 'is-done' : ''}" type="button" data-lesson="${lesson.id}">
            <span class="lesson-card__title">${localized(lesson.title)}</span>
            <span class="lesson-card__subtitle">${localized(lesson.subtitle) ?? typeLabel(lesson)}</span>
            <span class="lesson-card__meta">
              ${starsMarkup(stars)}
              <span>${progress ? `${progress.bestWpm} ${t('metric.wpm')} · ${progress.bestAccuracy}%` : t('lesson.target', { wpm: lesson.target })}</span>
            </span>
          </button>`;
      })
      .join('');

    section.innerHTML = `
      <div class="block__head">
        <span class="block__number">${t('lessons.block', { number: block.id })}</span>
        <span class="block__title">${localized(block.title)}</span>
        <span class="block__description">${localized(block.description)}</span>
      </div>
      <div class="lesson-grid">${cards}</div>`;
    container.append(section);
  }

  container.onclick = (event) => {
    const card = event.target.closest('[data-lesson]');
    if (card) location.hash = `${t('route.practice')}/${card.dataset.lesson}`;
  };
}

function typeLabel(lesson) {
  if (lesson.type === 'text') return t('lesson.type.text');
  if (lesson.type === 'words') return t('lesson.type.words');
  return t('lesson.type.keys', { keys: lesson.keys.join(' ').toUpperCase() });
}

/* ------------------------------------------------------------- practice */

function ensureInput() {
  if (app.input) return app.input;
  const input = document.createElement('textarea');
  input.className = 'visually-hidden-input';
  input.setAttribute('aria-hidden', 'true');
  input.autocapitalize = 'off';
  input.autocomplete = 'off';
  input.spellcheck = false;
  Object.assign(input.style, {
    position: 'absolute',
    opacity: '0',
    width: '1px',
    height: '1px',
    pointerEvents: 'none',
  });
  $('#typing').append(input);

  input.addEventListener('input', () => {
    const value = input.value;
    input.value = '';
    for (const char of value) handleChar(char);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Dead') {
      app.deadPending = true;
      refreshHighlight();
      return;
    }
    if (event.key === 'Backspace') {
      event.preventDefault();
      if (app.engine?.backspace()) renderChars();
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      restartLesson();
      return;
    }
    if (event.key === 'Enter' || event.key === 'Tab') event.preventDefault();
    if (event.key.length === 1 || event.key === ' ') app.view.flash(event.code, true);
  });

  input.addEventListener('focus', () => $('#typing').classList.add('is-focused'));
  input.addEventListener('blur', () => $('#typing').classList.remove('is-focused'));

  app.input = input;
  return input;
}

function startLesson(lesson, customText = null) {
  app.lesson = lesson;
  const text = customText ?? buildExercise(lesson);
  app.engine = new TypingEngine(text, { strict: app.settings.strict });
  app.deadPending = false;
  app.charEls = [];
  $('#typing-text').textContent = '';

  const subtitle = localized(lesson.subtitle);
  $('#practice-title').textContent = localized(lesson.title);
  $('#practice-subtitle').textContent = subtitle
    ? t('practice.subtitle', { subtitle, wpm: lesson.target })
    : t('practice.subtitleAlone', { wpm: lesson.target });
  $('#next-button').hidden = !nextLessonAfter(lesson.id);
  $('#typing-hint').textContent = t('practice.hint');

  showView('practice');
  renderChars();
  updateMetrics();
  ensureInput();
  app.input.value = '';
  app.input.focus();

  clearInterval(app.tickId);
  app.tickId = setInterval(updateMetrics, 200);
}

/** Characters the chosen keyboard has no key for, so practice cannot ask them. */
function unsupportedCharacters(text) {
  return [...new Set(text)].filter((char) => !keyStepsFor(char, app.layout));
}

function startFreePractice(text) {
  startLesson(
    {
      id: 'free',
      title: { es: 'Práctica libre', en: 'Free practice' },
      subtitle: { es: 'texto propio', en: 'your own text' },
      target: 30,
      custom: true,
      text,
    },
    text,
  );
}

function stopPractice() {
  clearInterval(app.tickId);
  app.tickId = null;
  app.lesson = null;
  const dialog = $('#result-dialog');
  if (dialog.open) dialog.close();
}

function restartLesson() {
  if (!app.lesson) return;
  startLesson(app.lesson, app.lesson.custom ? app.lesson.text : null);
}

function renderChars() {
  const container = $('#typing-text');
  const { chars, states, index } = app.engine;

  if (app.charEls.length !== chars.length) {
    container.textContent = '';
    // Characters are grouped per word so lines only break at spaces.
    let word = null;
    app.charEls = chars.map((char) => {
      const el = document.createElement('span');
      el.className = char === ' ' ? 'ch ch--space' : 'ch';
      el.textContent = char;
      if (char === ' ') {
        word = null;
        container.append(el);
      } else {
        if (!word) {
          word = document.createElement('span');
          word.className = 'word';
          container.append(word);
        }
        word.append(el);
      }
      return el;
    });
  }

  chars.forEach((_, i) => {
    const el = app.charEls[i];
    el.classList.toggle('is-correct', states[i] === 'correct');
    el.classList.toggle('is-fixed', states[i] === 'fixed');
    el.classList.toggle('is-wrong', states[i] === 'wrong');
    el.classList.toggle('is-current', i === index);
  });

  refreshHighlight();
  app.charEls[index]?.scrollIntoView({ block: 'nearest' });
}

function refreshHighlight() {
  const expected = app.engine?.expected;
  if (!expected) {
    app.view.clearHighlights();
    return;
  }
  app.view.highlight(expected, app.deadPending);
}

function handleChar(char) {
  if (!app.engine || app.engine.finished) return;
  const result = app.engine.type(char);
  app.deadPending = false;

  if (result === 'wrong') {
    const typing = $('#typing');
    typing.classList.add('is-shaking');
    setTimeout(() => typing.classList.remove('is-shaking'), 170);
  }

  renderChars();
  updateMetrics();
  if (app.engine.finished) finishLesson();
}

function updateMetrics() {
  if (!app.engine) return;
  const stats = app.engine.stats();
  $('#metric-wpm').textContent = String(stats.wpm);
  $('#metric-accuracy').textContent = `${stats.accuracy}%`;
  $('#metric-errors').textContent = String(stats.errors);
  $('#metric-time').textContent = formatTime(stats.elapsedMs);
  $('#progress-fill').style.width = `${stats.progress * 100}%`;
}

function nextLessonAfter(lessonId) {
  const position = app.course.lessons.findIndex((lesson) => lesson.id === lessonId);
  return position >= 0 ? app.course.lessons[position + 1] ?? null : null;
}

function finishLesson() {
  clearInterval(app.tickId);
  const stats = app.engine.stats();
  const stars = ratingFor(stats, app.lesson.target);

  if (!app.lesson.custom) {
    store.recordAttempt(app.lesson.id, {
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      errors: stats.errors,
      durationMs: Math.round(stats.elapsedMs),
      worstKeys: stats.worstKeys,
      stars,
    });
  }

  $('#result-stars').innerHTML = starsMarkup(stars);
  $('#result-wpm').textContent = String(stats.wpm);
  $('#result-accuracy').textContent = `${stats.accuracy}%`;
  $('#result-errors').textContent = String(stats.errors);
  $('#result-time').textContent = formatTime(stats.elapsedMs);

  const worst = stats.worstKeys
    .map(({ char, count }) => `«${charName(char)}» ×${count}`)
    .join(', ');
  $('#result-note').textContent = stats.errors
    ? t('result.note.worst', { keys: worst })
    : stars === 3
      ? t('result.note.perfect')
      : t('result.note.clean');

  app.lastResult = {
    title: localized(app.lesson.title),
    wpm: stats.wpm,
    accuracy: stats.accuracy,
    stars,
  };

  const next = nextLessonAfter(app.lesson.id);
  $('#result-next').hidden = !next || app.lesson.custom;

  window.dataLayer?.push({
    event: 'lesson_complete',
    lesson_id: app.lesson.id,
    lesson_title: localized(app.lesson.title),
    mode: app.lesson.custom ? 'free' : 'lesson',
    wpm: stats.wpm,
    accuracy: stats.accuracy,
    errors: stats.errors,
    duration_seconds: Math.round(stats.elapsedMs / 1000),
    language: getLanguage(),
  });

  $('#result-dialog').showModal();
}

/* ----------------------------------------------------------------- share */

function shareResultText() {
  const { title, wpm, accuracy, stars } = app.lastResult;
  return t('share.text.result', { stars: '★'.repeat(stars), title, wpm, accuracy });
}

function shareProgressText() {
  const state = store.getState();
  const done = app.course.lessons.filter((lesson) => state.lessons[lesson.id]).length;
  const sessions = state.sessions;
  const bestWpm = Math.max(0, ...sessions.map((session) => session.wpm));
  const avgAccuracy = sessions.length
    ? Math.round((sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length) * 10) / 10
    : 0;

  if (!sessions.length) return t('share.text.project');
  return t('share.text.progress', {
    done,
    total: app.course.lessons.length,
    wpm: bestWpm,
    accuracy: avgAccuracy,
  });
}

/* -------------------------------------------------------------- progress */

function renderProgress() {
  const state = store.getState();
  const sessions = state.sessions;
  const completed = Object.keys(state.lessons).length;
  const bestWpm = Math.max(0, ...sessions.map((s) => s.wpm));
  const totalMs = sessions.reduce((sum, s) => sum + (s.durationMs ?? 0), 0);
  const avgAccuracy = sessions.length
    ? Math.round((sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length) * 10) / 10
    : 0;

  $('#progress-summary').innerHTML = `
    <div class="metric"><span class="metric__value">${completed}</span><span class="metric__label">${t('progress.stat.lessons')}</span></div>
    <div class="metric"><span class="metric__value">${sessions.length}</span><span class="metric__label">${t('progress.stat.sessions')}</span></div>
    <div class="metric"><span class="metric__value">${bestWpm}</span><span class="metric__label">${t('progress.stat.wpm')}</span></div>
    <div class="metric"><span class="metric__value">${avgAccuracy || '—'}%</span><span class="metric__label">${t('progress.stat.accuracy')}</span></div>
    <div class="metric"><span class="metric__value">${formatTime(totalMs)}</span><span class="metric__label">${t('progress.stat.time')}</span></div>`;

  const recent = sessions.slice(-40);
  const max = Math.max(10, ...recent.map((s) => s.wpm));
  $('#progress-chart').innerHTML = recent.length
    ? recent
        .map(
          (s) =>
            `<div class="chart__bar" style="height:${Math.max(4, (s.wpm / max) * 100)}%" title="${s.wpm} ${t('metric.wpm')} · ${s.accuracy}%"></div>`,
        )
        .join('')
    : `<p class="chart__empty">${t('progress.emptyChart')}</p>`;

  const counts = new Map();
  for (const session of sessions) {
    for (const { char, count } of session.worstKeys ?? []) {
      counts.set(char, (counts.get(char) ?? 0) + count);
    }
  }
  const weak = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
  $('#weak-keys').innerHTML = weak.length
    ? weak
        .map(([char, count]) => `<span class="chip">${charName(char)} <b>${count}</b></span>`)
        .join('')
    : `<p class="chart__empty">${t('progress.emptyWeak')}</p>`;

  const rows = sessions
    .slice(-20)
    .reverse()
    .map((session) => {
      const lesson = getLesson(session.lessonId);
      const date = new Date(session.at);
      return `<tr>
        <td>${localized(lesson?.title) ?? session.lessonId}</td>
        <td>${session.wpm}</td>
        <td>${session.accuracy}%</td>
        <td>${session.errors}</td>
        <td>${date.toLocaleDateString(locale(), { day: '2-digit', month: 'short' })} ${date.toLocaleTimeString(locale(), { hour: '2-digit', minute: '2-digit' })}</td>
      </tr>`;
    })
    .join('');
  $('#history-table').innerHTML = rows
    ? `<thead><tr><th>${t('progress.col.lesson')}</th><th>${t('progress.col.wpm')}</th><th>${t('progress.col.accuracy')}</th><th>${t('progress.col.errors')}</th><th>${t('progress.col.date')}</th></tr></thead><tbody>${rows}</tbody>`
    : `<tbody><tr><td>${t('progress.emptyHistory')}</td></tr></tbody>`;
}

/* ------------------------------------------------------------- settings */

function fillSelects() {
  const options = (items, selected) =>
    items.map(({ id, name }) => `<option value="${id}"${id === selected ? ' selected' : ''}>${name}</option>`).join('');

  $('#setting-language').innerHTML = options(LANGUAGES, getLanguage());
  $('#setting-layout').innerHTML = options(
    LAYOUT_LIST.map(({ id, name }) => ({ id, name })),
    app.layout.id,
  );
  $('#setting-form').innerHTML = options(
    FORM_LIST.map(({ id }) => ({ id, name: t(`form.${id}`) })),
    app.form.id,
  );

  // The welcome tour asks the same two questions before the first lesson.
  $('#welcome-layout').innerHTML = $('#setting-layout').innerHTML;
  $('#welcome-form').innerHTML = $('#setting-form').innerHTML;
}

/** Opens the settings, building the preview keyboard the first time. */
function openSettings() {
  if (!app.settingsView) {
    app.settingsView = new KeyboardView($('#settings-keyboard'), null, app.keyboard, { tinted: true });
  }
  $('#settings-dialog').showModal();
}

function initSettings() {
  const dialog = $('#settings-dialog');
  fillSelects();
  $('#setting-form-note').textContent = t(`form.${app.form.id}.note`);
  $('#setting-keyboard').checked = app.settings.showKeyboard;
  $('#setting-hands').checked = app.settings.showHands;

  $('#settings-open').addEventListener('click', openSettings);
  $('#settings-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => app.input?.focus());

  $('#setting-language').addEventListener('change', (event) => applyLanguage(event.target.value));
  $('#setting-layout').addEventListener('change', (event) => applyLayout(event.target.value));
  $('#setting-form').addEventListener('change', (event) => {
    applyForm(event.target.value);
    if (!$('#view-tutorial').hidden) renderTutorial();
  });

  $('#setting-keyboard').addEventListener('change', (event) => {
    app.settings = store.saveSettings({ showKeyboard: event.target.checked });
    applyDisplaySettings();
  });
  $('#setting-hands').addEventListener('change', (event) => {
    app.settings = store.saveSettings({ showHands: event.target.checked });
    applyDisplaySettings();
  });
}

/* ------------------------------------------------------------------ init */

function init() {
  if (redirectToChosenLanguage()) return;

  applyTheme(app.settings.theme);
  setLanguage(pageLanguage());
  applyTranslations();
  offerBrowserLanguage();

  app.layout = getLayout(app.settings.layout);
  app.form = getForm(app.settings.form);
  app.course = preferredCourse();
  app.keyboard = buildKeyboard(app.layout, app.form.id);

  app.view = new KeyboardView($('#keyboard'), $('#hands'), app.keyboard);
  initTutorial();
  initSettings();
  initWelcome();
  applyDisplaySettings();
  $('#setting-layer-note').hidden = !app.keyboard.layerCodes.length || !app.form.layered;
  updateAppleNote();

  $('#theme-toggle').addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  $('#continue-button').addEventListener('click', () => {
    location.hash = `${t('route.practice')}/${nextPendingLesson().id}`;
  });

  $('#restart-button').addEventListener('click', restartLesson);
  $('#next-button').addEventListener('click', () => {
    const next = nextLessonAfter(app.lesson.id);
    if (next) location.hash = `${t('route.practice')}/${next.id}`;
  });

  $('#typing').addEventListener('click', () => app.input?.focus());

  $('#result-repeat').addEventListener('click', () => {
    $('#result-dialog').close();
    restartLesson();
  });
  $('#result-next').addEventListener('click', () => {
    $('#result-dialog').close();
    const next = nextLessonAfter(app.lesson.id);
    if (next) location.hash = `${t('route.practice')}/${next.id}`;
  });
  $('#result-dialog').addEventListener('close', () => app.input?.focus());

  $('#free-sample').addEventListener('click', () => {
    // The sample belongs to the course, which is what the keyboard can type.
    $('#free-text').value = translator(app.course.language)('free.sampleText');
    $('#free-warning').hidden = true;
  });
  $('#free-start').addEventListener('click', () => {
    const text = $('#free-text').value.trim().replace(/\s+/g, ' ');
    if (!text) return;

    const missing = unsupportedCharacters(text);
    const warning = $('#free-warning');
    warning.hidden = !missing.length;
    if (missing.length) {
      warning.textContent = t('free.unsupported', {
        keys: missing.join(' '),
        layout: app.layout.name,
      });
      return;
    }

    app.freeText = text;
    if (location.hash === t('route.freeText')) startFreePractice(text);
    else location.hash = t('route.freeText');
  });

  initShare();
  $('#share-project').addEventListener('click', () => {
    openShare({ title: t('share.project'), text: t('share.text.project') });
  });
  $('#share-progress').addEventListener('click', () => {
    openShare({ title: t('share.progress'), text: shareProgressText() });
  });
  $('#result-share').addEventListener('click', () => {
    if (app.lastResult) openShare({ title: t('share.result'), text: shareResultText() });
  });

  $('#clear-progress').addEventListener('click', () => {
    store.clear();
    renderProgress();
    renderLessons();
  });

  window.addEventListener('hashchange', route);
  route();

  // A first visit meets the tour, over whichever view the address asked for —
  // but only once the cookie notice has been answered, because a modal over it
  // would ask the visitor to decide on a question they can no longer read.
  if (!app.settings.onboarded) {
    if (consentAnswered()) openWelcome();
    else {
      document.addEventListener(
        'consent:answered',
        // Answering it late, from inside a lesson, must not cut the typing off.
        () => {
          if (!app.lesson) openWelcome();
        },
        { once: true },
      );
    }
  }
}

init();
