/**
 * Courses and exercise generation.
 *
 * A lesson is either:
 *   - type 'drill': random syllable groups built from `keys` + `review`
 *   - type 'words': a curated word list drawn at random
 *   - type 'text' : a fixed paragraph typed verbatim
 *
 * Each keyboard layout points at a course (see `course` in keyboard-layout.js).
 * Lesson ids are unique across courses so progress never collides.
 */

import { BLOCKS_ES, LESSONS_ES } from './lessons-es.js';
import { BLOCKS_EN, LESSONS_EN } from './lessons-en.js';

export const COURSES = {
  es: { id: 'es', language: 'es', lessons: LESSONS_ES, blocks: BLOCKS_ES },
  en: { id: 'en', language: 'en', lessons: LESSONS_EN, blocks: BLOCKS_EN },
};

export const DEFAULT_COURSE_ID = 'es';

export function getCourse(id) {
  return COURSES[id] ?? COURSES[DEFAULT_COURSE_ID];
}

/** Finds a lesson by id in any course, so the history can name old sessions. */
export function getLesson(id) {
  for (const course of Object.values(COURSES)) {
    const lesson = course.lessons.find((item) => item.id === id);
    if (lesson) return lesson;
  }
  return null;
}

/** Course a lesson belongs to, so a shared link can switch the keyboard. */
export function courseOfLesson(id) {
  return Object.values(COURSES).find((course) =>
    course.lessons.some((lesson) => lesson.id === id),
  ) ?? null;
}

export function lessonsOfBlock(course, blockId) {
  return course.lessons.filter((lesson) => lesson.block === blockId);
}

const TARGET_LENGTH = 190;

function pick(items, random) {
  return items[Math.floor(random() * items.length)];
}

function buildDrill(lesson, random) {
  const pool = [...lesson.keys, ...lesson.keys, ...(lesson.review ?? [])];
  const groups = [];
  let length = 0;
  while (length < TARGET_LENGTH) {
    const size = 3 + Math.floor(random() * 2);
    let group = '';
    for (let i = 0; i < size; i += 1) group += pick(pool, random);
    groups.push(group);
    length += group.length + 1;
  }
  return groups.join(' ');
}

function buildWords(lesson, random) {
  const words = [];
  let length = 0;
  let last = '';
  while (length < TARGET_LENGTH) {
    const word = pick(lesson.words, random);
    if (word === last && lesson.words.length > 1) continue;
    last = word;
    words.push(word);
    length += word.length + 1;
  }
  return words.join(' ');
}

/** Builds the exercise text for a lesson. `random` defaults to Math.random. */
export function buildExercise(lesson, random = Math.random) {
  if (lesson.type === 'text') return lesson.text;
  if (lesson.type === 'words') return buildWords(lesson, random);
  return buildDrill(lesson, random);
}
