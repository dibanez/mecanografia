/** Local progress persistence. Everything lives in one localStorage entry. */

import { DEFAULT_LAYOUT_ID } from './data/keyboard-layout.js';
import { DEFAULT_FORM_ID } from './data/keyboard-forms.js';

const STORAGE_KEY = 'mecanografia:v1';

const EMPTY = {
  lessons: {},
  sessions: [],
  settings: {
    theme: 'dark',
    sound: true,
    strict: true,
    layout: DEFAULT_LAYOUT_ID,
    form: DEFAULT_FORM_ID,
    // Null until the visitor chooses: the browser language decides the first time.
    language: null,
    showKeyboard: true,
    showHands: true,
    // False until the welcome tour is dismissed; see the migration in read().
    onboarded: false,
  },
};

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(EMPTY);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(EMPTY),
      ...parsed,
      settings: {
        ...EMPTY.settings,
        // Anyone who already has an entry has been here before, so the welcome
        // tour stays out of their way even though the flag is newer than them.
        onboarded: true,
        ...(parsed.settings ?? {}),
      },
    };
  } catch {
    return structuredClone(EMPTY);
  }
}

function write(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage disabled or full: progress simply is not persisted */
  }
}

export const store = {
  getState: read,

  getSettings() {
    return read().settings;
  },

  saveSettings(patch) {
    const state = read();
    state.settings = { ...state.settings, ...patch };
    write(state);
    return state.settings;
  },

  getLessonProgress(lessonId) {
    return read().lessons[lessonId] ?? null;
  },

  /** Records a finished attempt, keeping the best result per lesson. */
  recordAttempt(lessonId, { wpm, accuracy, errors, stars, durationMs, worstKeys = [] }) {
    const state = read();
    const previous = state.lessons[lessonId] ?? { attempts: 0, bestWpm: 0, bestAccuracy: 0, stars: 0 };
    state.lessons[lessonId] = {
      attempts: previous.attempts + 1,
      bestWpm: Math.max(previous.bestWpm, wpm),
      bestAccuracy: Math.max(previous.bestAccuracy, accuracy),
      stars: Math.max(previous.stars, stars),
      lastAt: new Date().toISOString(),
    };
    state.sessions.push({
      lessonId,
      wpm,
      accuracy,
      errors,
      durationMs,
      worstKeys,
      at: new Date().toISOString(),
    });
    if (state.sessions.length > 200) state.sessions = state.sessions.slice(-200);
    write(state);
    return state.lessons[lessonId];
  },

  clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  },
};
