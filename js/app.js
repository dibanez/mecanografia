/** Application shell: routing, lesson practice loop and progress screens. */

import { BLOCKS, LESSONS, buildExercise, getLesson, lessonsOfBlock } from './data/lessons.js';
import { TypingEngine, ratingFor } from './engine.js';
import { KeyboardView } from './keyboard.js';
import { store } from './storage.js';

const $ = (selector) => document.querySelector(selector);

const SAMPLE_TEXT =
  'La mecanografía se aprende con constancia: pocos minutos cada día valen más que una tarde entera. ' +
  'Coloca los dedos sobre la fila guía, mantén la vista en la pantalla y deja que las manos recuerden el camino.';

const app = {
  lesson: null,
  freeText: '',
  engine: null,
  keyboard: null,
  input: null,
  charEls: [],
  deadPending: false,
  tickId: null,
  settings: store.getSettings(),
};

/* ------------------------------------------------------------- utilities */

function formatTime(ms) {
  const total = Math.floor(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

function starsMarkup(count) {
  return `<span class="stars">${'★'.repeat(count)}<span class="stars--empty">${'★'.repeat(3 - count)}</span></span>`;
}

/* ---------------------------------------------------------------- theme */

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  app.settings = store.saveSettings({ theme });
}

/* -------------------------------------------------------------- routing */

const VIEWS = {
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
}

function route() {
  const hash = location.hash.replace(/^#\/?/, '');
  const [section, param] = hash.split('/');

  stopPractice();

  if (section === 'practica' && param) {
    const lesson = getLesson(param);
    if (lesson) {
      startLesson(lesson);
      return;
    }
  }
  if (section === 'libre') {
    if (param === 'texto' && app.freeText) {
      startFreePractice(app.freeText);
      return;
    }
    showView('free');
    return;
  }
  if (section === 'progreso') {
    renderProgress();
    showView('progress');
    return;
  }
  renderLessons();
  showView('lessons');
}

/* -------------------------------------------------------------- lessons */

function nextPendingLesson() {
  const state = store.getState();
  return LESSONS.find((lesson) => (state.lessons[lesson.id]?.stars ?? 0) < 3) ?? LESSONS[0];
}

function renderLessons() {
  const state = store.getState();
  const done = LESSONS.filter((lesson) => state.lessons[lesson.id]).length;
  const bestWpm = Math.max(0, ...Object.values(state.lessons).map((l) => l.bestWpm));
  const accuracies = Object.values(state.lessons).map((l) => l.bestAccuracy);
  const avgAccuracy = accuracies.length
    ? Math.round((accuracies.reduce((a, b) => a + b, 0) / accuracies.length) * 10) / 10
    : 0;

  $('#hero-stats').innerHTML = `
    <div class="hero__stat"><b>${done}/${LESSONS.length}</b><span>lecciones</span></div>
    <div class="hero__stat"><b>${bestWpm}</b><span>mejor ppm</span></div>
    <div class="hero__stat"><b>${avgAccuracy || '—'}%</b><span>precisión media</span></div>`;

  const container = $('#blocks');
  container.textContent = '';
  for (const block of BLOCKS) {
    const section = document.createElement('section');
    section.className = 'block';
    const lessons = lessonsOfBlock(block.id)
      .map((lesson) => {
        const progress = state.lessons[lesson.id];
        const stars = progress?.stars ?? 0;
        return `
          <button class="lesson-card ${progress ? 'is-done' : ''}" type="button" data-lesson="${lesson.id}">
            <span class="lesson-card__title">${lesson.title}</span>
            <span class="lesson-card__subtitle">${lesson.subtitle ?? typeLabel(lesson)}</span>
            <span class="lesson-card__meta">
              ${starsMarkup(stars)}
              <span>${progress ? `${progress.bestWpm} ppm · ${progress.bestAccuracy}%` : `objetivo ${lesson.target} ppm`}</span>
            </span>
          </button>`;
      })
      .join('');

    section.innerHTML = `
      <div class="block__head">
        <span class="block__number">Bloque ${block.id}</span>
        <span class="block__title">${block.title}</span>
        <span class="block__description">${block.description}</span>
      </div>
      <div class="lesson-grid">${lessons}</div>`;
    container.append(section);
  }

  container.onclick = (event) => {
    const card = event.target.closest('[data-lesson]');
    if (card) location.hash = `#/practica/${card.dataset.lesson}`;
  };
}

function typeLabel(lesson) {
  if (lesson.type === 'text') return 'texto completo';
  if (lesson.type === 'words') return 'palabras sueltas';
  return `teclas ${lesson.keys.join(' ').toUpperCase()}`;
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
    if (event.key.length === 1 || event.key === ' ') app.keyboard.flash(event.code, true);
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

  $('#practice-title').textContent = lesson.title;
  $('#practice-subtitle').textContent = lesson.subtitle
    ? `${lesson.subtitle} · objetivo ${lesson.target} ppm`
    : `Objetivo: ${lesson.target} ppm con 97 % de precisión`;
  $('#next-button').hidden = !nextLessonAfter(lesson.id);
  $('#typing-hint').textContent = 'Empieza a escribir para arrancar el cronómetro';

  showView('practice');
  renderChars();
  updateMetrics();
  ensureInput();
  app.input.value = '';
  app.input.focus();

  clearInterval(app.tickId);
  app.tickId = setInterval(updateMetrics, 200);
}

function startFreePractice(text) {
  startLesson(
    { id: 'free', title: 'Práctica libre', subtitle: 'texto propio', target: 30, custom: true, text },
    text,
  );
}

function stopPractice() {
  clearInterval(app.tickId);
  app.tickId = null;
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
    app.keyboard.clearHighlights();
    return;
  }
  app.keyboard.highlight(expected, app.deadPending);
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
  const position = LESSONS.findIndex((lesson) => lesson.id === lessonId);
  return position >= 0 ? LESSONS[position + 1] ?? null : null;
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
    .map(({ char, count }) => `«${char === ' ' ? 'espacio' : char}» ×${count}`)
    .join(', ');
  $('#result-note').textContent = stats.errors
    ? `Teclas que más se te resistieron: ${worst}.`
    : stars === 3
      ? '¡Sin un solo fallo! Puedes pasar a la siguiente lección.'
      : 'Sin errores. Repite para ganar velocidad.';

  const next = nextLessonAfter(app.lesson.id);
  $('#result-next').hidden = !next || app.lesson.custom;
  $('#result-dialog').showModal();
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
    <div class="metric"><span class="metric__value">${completed}</span><span class="metric__label">lecciones tocadas</span></div>
    <div class="metric"><span class="metric__value">${sessions.length}</span><span class="metric__label">sesiones</span></div>
    <div class="metric"><span class="metric__value">${bestWpm}</span><span class="metric__label">mejor ppm</span></div>
    <div class="metric"><span class="metric__value">${avgAccuracy || '—'}%</span><span class="metric__label">precisión media</span></div>
    <div class="metric"><span class="metric__value">${formatTime(totalMs)}</span><span class="metric__label">tiempo total</span></div>`;

  const recent = sessions.slice(-40);
  const max = Math.max(10, ...recent.map((s) => s.wpm));
  $('#progress-chart').innerHTML = recent.length
    ? recent
        .map(
          (s) =>
            `<div class="chart__bar" style="height:${Math.max(4, (s.wpm / max) * 100)}%" title="${s.wpm} ppm · ${s.accuracy}%"></div>`,
        )
        .join('')
    : '<p class="chart__empty">Todavía no hay sesiones registradas.</p>';

  const counts = new Map();
  for (const session of sessions) {
    for (const { char, count } of session.worstKeys ?? []) {
      counts.set(char, (counts.get(char) ?? 0) + count);
    }
  }
  const weak = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
  $('#weak-keys').innerHTML = weak.length
    ? weak
        .map(([char, count]) => `<span class="chip">${char === ' ' ? 'espacio' : char} <b>${count}</b></span>`)
        .join('')
    : '<p class="chart__empty">Sin errores registrados todavía.</p>';

  const rows = sessions
    .slice(-20)
    .reverse()
    .map((session) => {
      const lesson = getLesson(session.lessonId);
      const date = new Date(session.at);
      return `<tr>
        <td>${lesson?.title ?? session.lessonId}</td>
        <td>${session.wpm}</td>
        <td>${session.accuracy}%</td>
        <td>${session.errors}</td>
        <td>${date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })} ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</td>
      </tr>`;
    })
    .join('');
  $('#history-table').innerHTML = rows
    ? `<thead><tr><th>Lección</th><th>ppm</th><th>precisión</th><th>errores</th><th>fecha</th></tr></thead><tbody>${rows}</tbody>`
    : '<tbody><tr><td>Aún no hay historial.</td></tr></tbody>';
}

/* ------------------------------------------------------------------ init */

function init() {
  applyTheme(app.settings.theme);
  app.keyboard = new KeyboardView($('#keyboard'), $('#hands'));

  $('#theme-toggle').addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  $('#continue-button').addEventListener('click', () => {
    location.hash = `#/practica/${nextPendingLesson().id}`;
  });

  $('#restart-button').addEventListener('click', restartLesson);
  $('#next-button').addEventListener('click', () => {
    const next = nextLessonAfter(app.lesson.id);
    if (next) location.hash = `#/practica/${next.id}`;
  });

  $('#typing').addEventListener('click', () => app.input?.focus());

  $('#result-repeat').addEventListener('click', () => {
    $('#result-dialog').close();
    restartLesson();
  });
  $('#result-next').addEventListener('click', () => {
    $('#result-dialog').close();
    const next = nextLessonAfter(app.lesson.id);
    if (next) location.hash = `#/practica/${next.id}`;
  });
  $('#result-dialog').addEventListener('close', () => app.input?.focus());

  $('#free-sample').addEventListener('click', () => {
    $('#free-text').value = SAMPLE_TEXT;
  });
  $('#free-start').addEventListener('click', () => {
    const text = $('#free-text').value.trim().replace(/\s+/g, ' ');
    if (!text) return;
    app.freeText = text;
    if (location.hash === '#/libre/texto') startFreePractice(text);
    else location.hash = '#/libre/texto';
  });

  $('#clear-progress').addEventListener('click', () => {
    store.clear();
    renderProgress();
    renderLessons();
  });

  window.addEventListener('hashchange', route);
  route();
}

init();
