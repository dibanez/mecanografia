/**
 * Checks that no exercise ever asks for a key the keyboard does not have.
 *
 * A Spanish drill of ñ and accents on a US board is not a lesson, it is a dead
 * end: strict mode refuses to advance and the learner cannot get past it. The
 * pairing of course and layout is decided at runtime, so this walks every
 * pairing the application can reach and every exercise it can generate.
 *
 *   node tools/check-exercises.mjs
 */

import { LAYOUT_LIST, getLayout, keyStepsFor } from '../js/data/keyboard-layout.js';
import { COURSES, buildExercise, courseFitsLayout, getCourse } from '../js/data/lessons.js';
import { LANGUAGES, translator } from '../js/i18n.js';

/** Draws per lesson: the generators are random, so one look is not enough. */
const DRAWS = 60;

const untypable = (text, layout) =>
  [...new Set(text)].filter((char) => !keyStepsFor(char, layout));

/** Course the application serves for a keyboard and an interface language. */
function courseFor(layout, language) {
  const wanted = COURSES[language];
  return wanted && courseFitsLayout(wanted, layout) ? wanted : getCourse(layout.course);
}

const failures = [];

for (const layout of LAYOUT_LIST) {
  // Whatever the language, the fallback course of a layout has to be typable.
  if (!courseFitsLayout(getCourse(layout.course), layout)) {
    failures.push(`${layout.id}: its own course ${layout.course} is not typable on it`);
  }

  for (const { id: language } of LANGUAGES) {
    const course = courseFor(layout, language);

    for (const lesson of course.lessons) {
      const missing = new Set();
      for (let draw = 0; draw < DRAWS; draw += 1) {
        for (const char of untypable(buildExercise(lesson), layout)) missing.add(char);
      }
      if (missing.size) {
        failures.push(
          `${layout.id} + ${language} -> ${course.id}/${lesson.id}: no key for ${[...missing].join(' ')}`,
        );
      }
    }

    const sample = untypable(translator(course.language)('free.sampleText'), layout);
    if (sample.length) {
      failures.push(`${layout.id} + ${language}: sample text needs ${sample.join(' ')}`);
    }
  }
}

const pairings = LAYOUT_LIST.length * LANGUAGES.length;
if (failures.length) {
  console.error(`${failures.length} exercises ask for keys that are not there:`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}
console.log(`${pairings} keyboard and language pairings: every exercise is typable`);
