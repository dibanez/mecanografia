/**
 * Page copy, per interface language.
 *
 * Keys mirror the sections of index.html. Values ending in `.html` may carry
 * inline markup (<b>, <kbd>, <a>); everything else is plain text.
 */

export const COPY = {
  es: {
    /* ------------------------------------------------------------ tutorial */
    'tutorial.title': 'Cómo empezar a mecanografiar',
    'tutorial.intro':
      'Escribir sin mirar es una habilidad motriz: no se entiende, se entrena. Estos siete pasos ' +
      'son todo lo que necesitas saber antes de la primera lección. Estás practicando con la ' +
      'distribución <b id="tutorial-layout-name">—</b> sobre un teclado <b id="tutorial-form-name">—</b>; ' +
      'puedes cambiar ambas cosas en Ajustes.',

    'tutorial.step1.title': 'Prepara el sitio',
    'tutorial.step1.lead': 'La postura evita lesiones y, de paso, quita errores.',
    'tutorial.step1.item1': 'Espalda apoyada en el respaldo y pies planos en el suelo.',
    'tutorial.step1.item2': 'Codos pegados al cuerpo, formando unos 90°.',
    'tutorial.step1.item3':
      'Muñecas <b>en el aire</b>, rectas: se mueven los dedos, no los brazos.',
    'tutorial.step1.item4':
      'La parte de arriba de la pantalla, a la altura de los ojos y a un brazo de distancia.',
    'tutorial.step1.item5':
      'Teclado plano o con poca inclinación, centrado con la barra espaciadora frente a ti.',

    'tutorial.step2.title': 'Coloca las manos en la fila guía',
    'tutorial.step2.lead':
      'La fila guía es la posición de reposo: los ocho dedos que no son pulgares descansan siempre ' +
      'ahí y vuelven ahí después de cada pulsación.',
    'tutorial.step2.left': 'Mano izquierda',
    'tutorial.step2.right': 'Mano derecha',
    'tutorial.step2.bumps':
      'Busca los dos <b>relieves</b> de las teclas <kbd>F</kbd> y <kbd>J</kbd>: son la señal táctil ' +
      'que te permite recolocar las manos sin mirar. Apoya los índices ahí, deja caer el resto de ' +
      'dedos y los pulgares sobre la barra espaciadora.',

    'tutorial.step3.title': 'Cada dedo tiene su territorio',
    'tutorial.step3.lead':
      'Cada tecla se pulsa siempre con el mismo dedo, y ese dedo vuelve a su tecla guía. Pasa el ' +
      'ratón (o toca) sobre un dedo para ver de qué teclas se ocupa.',
    'tutorial.step3.note':
      'Las teclas de la fila guía llevan una raya debajo. Los índices son los únicos dedos que se ' +
      'estiran a dos columnas: <kbd>G</kbd> y <kbd>H</kbd> son suyas.',

    'tutorial.step4.title': 'Los pulgares solo hacen el espacio',
    'tutorial.step4.body':
      'Nada más. Lo habitual es usar siempre el mismo pulgar (el de tu mano dominante) y dejar el ' +
      'otro apoyado. El espacio es la tecla más frecuente del texto: si la das con un dedo ' +
      'cualquiera, pierdes la posición de las manos en cada palabra.',

    'tutorial.step5.title': 'Mayúsculas: Shift con la mano contraria',
    'tutorial.step5.body':
      'Para una letra de la mano izquierda, mantén <kbd>⇧</kbd> con el meñique <b>derecho</b>, y al ' +
      'revés. Nunca con la misma mano que pulsa la letra: te obliga a torcer la muñeca y a perder la ' +
      'fila guía. <kbd>Bloq Mayús</kbd> no se usa para escribir texto.',
    'tutorial.step5.note':
      'En el teclado en pantalla verás iluminarse a la vez la letra y el Shift que toca.',

    'tutorial.step6.title': 'Cómo practicar',
    'tutorial.step6.item1':
      '<b>No mires las manos.</b> Si hace falta, tápalas con un paño los primeros días.',
    'tutorial.step6.item2':
      '<b>Precisión antes que velocidad.</b> La velocidad llega sola; los errores aprendidos, no se van solos.',
    'tutorial.step6.item3':
      '<b>Ritmo constante.</b> Mejor lento y regular que a ráfagas: el oído te avisa cuando el ritmo se rompe.',
    'tutorial.step6.item4':
      '<b>10-15 minutos al día.</b> Todos los días vale mucho más que dos horas el domingo.',
    'tutorial.step6.item5':
      '<b>Vuelve siempre a la fila guía</b> después de cada pulsación, aunque tardes más.',
    'tutorial.step6.item6': '<b>Repite la lección</b> hasta las tres estrellas antes de pasar a la siguiente.',

    'tutorial.step7.title': 'Errores frecuentes',
    'tutorial.step7.item1':
      'Mirar el teclado en pantalla en vez del texto: úsalo solo cuando te pierdas.',
    'tutorial.step7.item2':
      'Correr antes de dominar la lección: por debajo del 95 % de precisión, frena.',
    'tutorial.step7.item3': 'Golpear las teclas con fuerza; basta con rozarlas.',
    'tutorial.step7.item4': 'Apoyar las muñecas mientras escribes.',
    'tutorial.step7.item5': 'Usar siempre el mismo Shift, o esquivar el meñique con el dedo de al lado.',
    'tutorial.step7.item6': 'Mirar el teclado «solo para los números»: también entran en el temario.',

    'tutorial.speed.title': 'Qué velocidad esperar',
    'tutorial.speed.lead':
      'Las ppm son palabras por minuto, contando cinco pulsaciones por palabra. Escribir a mano son ' +
      'unas 20 ppm; escribir mirando el teclado con dos dedos, entre 25 y 30.',
    'tutorial.speed.col1': 'ppm',
    'tutorial.speed.col2': 'Nivel',
    'tutorial.speed.row1': 'Ya escribes sin mirar. El objetivo de los primeros bloques.',
    'tutorial.speed.row2': 'Soltura: escribes casi al ritmo en que piensas la frase.',
    'tutorial.speed.row3': 'Buen nivel profesional.',
    'tutorial.speed.row4': 'Rápido: a partir de aquí manda la precisión, no los dedos.',
    'tutorial.start': 'Empezar por «{lesson}»',

    /* ------------------------------------------------------------- lessons */
    'lessons.title': 'Aprende a escribir sin mirar el teclado',
    'lessons.continue': 'Continuar donde lo dejé',
    'lessons.stat.done': 'lecciones',
    'lessons.stat.wpm': 'mejor ppm',
    'lessons.stat.accuracy': 'precisión media',
    'lessons.block': 'Bloque {number}',
    'lesson.target': 'objetivo {wpm} ppm',
    'lesson.type.text': 'texto completo',
    'lesson.type.words': 'palabras sueltas',
    'lesson.type.keys': 'teclas {keys}',
    'course.lead.es':
      '{count} lecciones progresivas para teclado español. Empieza por la fila guía y avanza hasta ' +
      'escribir párrafos completos con tildes, signos y números.',
    'course.lead.en':
      '{count} lecciones progresivas para teclado inglés. Empieza por la fila guía y avanza hasta ' +
      'escribir párrafos completos con apóstrofos, signos y números.',

    /* ------------------------------------------------------------ practice */
    'practice.back': '← Lecciones',
    'practice.restart': 'Reiniciar',
    'practice.next': 'Siguiente lección →',
    'practice.hint': 'Empieza a escribir para arrancar el cronómetro',
    'practice.area': 'Área de escritura',
    'practice.subtitle': '{subtitle} · objetivo {wpm} ppm',
    'practice.subtitleAlone': 'Objetivo: {wpm} ppm con 97 % de precisión',
    'metric.wpm': 'ppm',
    'metric.accuracy': 'precisión',
    'metric.errors': 'errores',
    'metric.time': 'tiempo',

    /* ---------------------------------------------------------------- free */
    'free.title': 'Práctica libre',
    'free.lead': 'Pega el texto que quieras practicar y pulsa empezar.',
    'free.placeholder': 'Escribe o pega aquí tu texto…',
    'free.start': 'Empezar',
    'free.sample': 'Texto de ejemplo',
    'free.subtitle': 'texto propio',
    'free.sampleText':
      'La mecanografía se aprende con constancia: pocos minutos cada día valen más que una tarde ' +
      'entera. Coloca los dedos sobre la fila guía, mantén la vista en la pantalla y deja que las ' +
      'manos recuerden el camino.',

    /* ------------------------------------------------------------ progress */
    'progress.title': 'Tu progreso',
    'progress.share': 'Compartir mi progreso',
    'progress.chart': 'Velocidad por sesión',
    'progress.weak': 'Teclas que más se te resisten',
    'progress.history': 'Historial',
    'progress.clear': 'Borrar progreso',
    'progress.stat.lessons': 'lecciones tocadas',
    'progress.stat.sessions': 'sesiones',
    'progress.stat.wpm': 'mejor ppm',
    'progress.stat.accuracy': 'precisión media',
    'progress.stat.time': 'tiempo total',
    'progress.emptyChart': 'Todavía no hay sesiones registradas.',
    'progress.emptyWeak': 'Sin errores registrados todavía.',
    'progress.emptyHistory': 'Aún no hay historial.',
    'progress.col.lesson': 'Lección',
    'progress.col.wpm': 'ppm',
    'progress.col.accuracy': 'precisión',
    'progress.col.errors': 'errores',
    'progress.col.date': 'fecha',
    'common.space': 'espacio',

    /* -------------------------------------------------------------- result */
    'result.title': '¡Lección completada!',
    'result.repeat': 'Repetir',
    'result.next': 'Siguiente lección',
    'result.note.worst': 'Teclas que más se te resistieron: {keys}.',
    'result.note.perfect': '¡Sin un solo fallo! Puedes pasar a la siguiente lección.',
    'result.note.clean': 'Sin errores. Repite para ganar velocidad.',

    /* --------------------------------------------------------------- share */
    'share.title': 'Compartir',
    'share.project': 'Compartir el proyecto',
    'share.progress': 'Compartir mi progreso',
    'share.result': 'Compartir el resultado',
    'share.copy': 'Copiar texto y enlace',
    'share.copied': '¡Copiado!',
    'share.copyFailed': 'No se pudo copiar',
    'share.close': 'Cerrar',
    'share.email': 'Correo',
    'share.text.project':
      'Estoy aprendiendo mecanografía con este curso gratuito: teclado español e inglés, ' +
      '31 lecciones y estadísticas de velocidad. #mecanografía',
    'share.text.result':
      '{stars} He completado la lección «{title}» a {wpm} ppm con {accuracy} % de precisión ' +
      'aprendiendo mecanografía. #mecanografía',
    'share.text.progress':
      'Llevo {done} de {total} lecciones de mecanografía: {wpm} ppm y {accuracy} % de precisión. ' +
      '#mecanografía',

    /* -------------------------------------------------------------- footer */
    'footer.pitch':
      '<b>Mecanografía</b> es un proyecto gratuito y de código abierto: sin cuentas, sin anuncios y ' +
      'con tu progreso guardado solo en tu navegador.',
    'footer.donateLead': 'Si te está sirviendo y te apetece echar una mano, puedes invitarme a un café.',
    'footer.share': 'Compartir',
    'footer.donate': 'Donar con PayPal',
    'footer.consent': 'Preferencias de cookies',

    /* ------------------------------------------------------------- consent */
    'consent.title': 'Cookies de analítica',
    'consent.body':
      'Uso Google Analytics (a través de Tag Manager) solo para saber qué lecciones se usan y ' +
      'mejorar el temario. No hay publicidad ni perfilado, y tu progreso se sigue guardando ' +
      'únicamente en tu navegador. Hasta que decidas, no se guarda ninguna cookie de analítica.',
    'consent.deny': 'Rechazar',
    'consent.accept': 'Aceptar',
    'consent.label': 'Aviso de cookies',
  },

  en: {
    /* ------------------------------------------------------------ tutorial */
    'tutorial.title': 'How to start touch typing',
    'tutorial.intro':
      'Typing without looking is a motor skill: you do not understand it, you train it. These seven ' +
      'steps are everything you need to know before the first lesson. You are practising with the ' +
      '<b id="tutorial-layout-name">—</b> layout on a <b id="tutorial-form-name">—</b> keyboard; you ' +
      'can change both in Settings.',

    'tutorial.step1.title': 'Set up your desk',
    'tutorial.step1.lead': 'Good posture prevents injuries and, along the way, removes mistakes.',
    'tutorial.step1.item1': 'Back against the chair and feet flat on the floor.',
    'tutorial.step1.item2': 'Elbows close to your body, at roughly 90°.',
    'tutorial.step1.item3':
      'Wrists <b>in the air</b> and straight: the fingers move, not the arms.',
    'tutorial.step1.item4': 'Top of the screen at eye level, about an arm away.',
    'tutorial.step1.item5':
      'Keyboard flat or barely tilted, centred with the space bar in front of you.',

    'tutorial.step2.title': 'Put your hands on the home row',
    'tutorial.step2.lead':
      'The home row is the resting position: the eight non-thumb fingers always sit there and come ' +
      'back to it after every keystroke.',
    'tutorial.step2.left': 'Left hand',
    'tutorial.step2.right': 'Right hand',
    'tutorial.step2.bumps':
      'Find the two <b>bumps</b> on the <kbd>F</kbd> and <kbd>J</kbd> keys: they are the tactile ' +
      'signal that lets you place your hands without looking. Rest your index fingers there, let the ' +
      'rest fall into place and keep the thumbs over the space bar.',

    'tutorial.step3.title': 'Every finger owns its territory',
    'tutorial.step3.lead':
      'Each key is always pressed with the same finger, and that finger returns to its home key. ' +
      'Hover (or tap) a finger to see which keys it takes care of.',
    'tutorial.step3.note':
      'Home row keys carry an underline. The index fingers are the only ones that stretch to two ' +
      'columns: <kbd>G</kbd> and <kbd>H</kbd> are theirs.',

    'tutorial.step4.title': 'Thumbs only press the space bar',
    'tutorial.step4.body':
      'Nothing else. The usual advice is to always use the same thumb (the one on your dominant hand) ' +
      'and leave the other resting. Space is the most frequent key in any text: hitting it with a ' +
      'random finger costs you the hand position on every word.',

    'tutorial.step5.title': 'Capitals: Shift with the opposite hand',
    'tutorial.step5.body':
      'For a letter on the left hand, hold <kbd>⇧</kbd> with the <b>right</b> little finger, and the ' +
      'other way round. Never with the same hand that presses the letter: it twists your wrist and ' +
      'costs you the home row. <kbd>Caps Lock</kbd> is not used to write text.',
    'tutorial.step5.note':
      'On the on-screen keyboard the letter and the Shift you need light up together.',

    'tutorial.step6.title': 'How to practise',
    'tutorial.step6.item1':
      '<b>Do not look at your hands.</b> Cover them with a cloth the first few days if you need to.',
    'tutorial.step6.item2':
      '<b>Accuracy before speed.</b> Speed arrives on its own; learnt mistakes do not leave on their own.',
    'tutorial.step6.item3':
      '<b>Steady rhythm.</b> Slow and regular beats bursts: your ear tells you when the rhythm breaks.',
    'tutorial.step6.item4': '<b>10-15 minutes a day.</b> Every day is worth far more than two hours on Sunday.',
    'tutorial.step6.item5':
      '<b>Always return to the home row</b> after every keystroke, even if it takes longer.',
    'tutorial.step6.item6': '<b>Repeat the lesson</b> until three stars before moving on.',

    'tutorial.step7.title': 'Common mistakes',
    'tutorial.step7.item1':
      'Watching the on-screen keyboard instead of the text: use it only when you get lost.',
    'tutorial.step7.item2': 'Rushing before mastering the lesson: below 95% accuracy, slow down.',
    'tutorial.step7.item3': 'Hitting the keys hard; brushing them is enough.',
    'tutorial.step7.item4': 'Resting your wrists while typing.',
    'tutorial.step7.item5':
      'Always using the same Shift, or dodging the little finger with the one next to it.',
    'tutorial.step7.item6':
      'Looking down "only for the numbers": they are part of the course too.',

    'tutorial.speed.title': 'What speed to expect',
    'tutorial.speed.lead':
      'WPM is words per minute, counting five keystrokes per word. Writing by hand is about 20 WPM; ' +
      'hunting and pecking with two fingers, between 25 and 30.',
    'tutorial.speed.col1': 'wpm',
    'tutorial.speed.col2': 'Level',
    'tutorial.speed.row1': 'You already type without looking. The goal of the first blocks.',
    'tutorial.speed.row2': 'Fluency: you type almost as fast as you think the sentence.',
    'tutorial.speed.row3': 'Solid professional level.',
    'tutorial.speed.row4': 'Fast: from here on accuracy rules, not the fingers.',
    'tutorial.start': 'Start with "{lesson}"',

    /* ------------------------------------------------------------- lessons */
    'lessons.title': 'Learn to type without looking at the keyboard',
    'lessons.continue': 'Continue where I left off',
    'lessons.stat.done': 'lessons',
    'lessons.stat.wpm': 'best wpm',
    'lessons.stat.accuracy': 'average accuracy',
    'lessons.block': 'Block {number}',
    'lesson.target': 'target {wpm} wpm',
    'lesson.type.text': 'full text',
    'lesson.type.words': 'single words',
    'lesson.type.keys': 'keys {keys}',
    'course.lead.es':
      '{count} progressive lessons for the Spanish keyboard. Start on the home row and work up to ' +
      'full paragraphs with accents, punctuation and numbers.',
    'course.lead.en':
      '{count} progressive lessons for the English keyboard. Start on the home row and work up to ' +
      'full paragraphs with apostrophes, punctuation and numbers.',

    /* ------------------------------------------------------------ practice */
    'practice.back': '← Lessons',
    'practice.restart': 'Restart',
    'practice.next': 'Next lesson →',
    'practice.hint': 'Start typing to run the clock',
    'practice.area': 'Typing area',
    'practice.subtitle': '{subtitle} · target {wpm} wpm',
    'practice.subtitleAlone': 'Target: {wpm} wpm with 97% accuracy',
    'metric.wpm': 'wpm',
    'metric.accuracy': 'accuracy',
    'metric.errors': 'errors',
    'metric.time': 'time',

    /* ---------------------------------------------------------------- free */
    'free.title': 'Free practice',
    'free.lead': 'Paste whatever text you want to practise and press start.',
    'free.placeholder': 'Type or paste your text here…',
    'free.start': 'Start',
    'free.sample': 'Sample text',
    'free.subtitle': 'your own text',
    'free.sampleText':
      'Touch typing is learnt through consistency: a few minutes every day are worth more than a ' +
      'whole afternoon. Put your fingers on the home row, keep your eyes on the screen and let your ' +
      'hands remember the way.',

    /* ------------------------------------------------------------ progress */
    'progress.title': 'Your progress',
    'progress.share': 'Share my progress',
    'progress.chart': 'Speed per session',
    'progress.weak': 'The keys that fight back',
    'progress.history': 'History',
    'progress.clear': 'Delete progress',
    'progress.stat.lessons': 'lessons touched',
    'progress.stat.sessions': 'sessions',
    'progress.stat.wpm': 'best wpm',
    'progress.stat.accuracy': 'average accuracy',
    'progress.stat.time': 'total time',
    'progress.emptyChart': 'No sessions recorded yet.',
    'progress.emptyWeak': 'No mistakes recorded yet.',
    'progress.emptyHistory': 'No history yet.',
    'progress.col.lesson': 'Lesson',
    'progress.col.wpm': 'wpm',
    'progress.col.accuracy': 'accuracy',
    'progress.col.errors': 'errors',
    'progress.col.date': 'date',
    'common.space': 'space',

    /* -------------------------------------------------------------- result */
    'result.title': 'Lesson completed!',
    'result.repeat': 'Repeat',
    'result.next': 'Next lesson',
    'result.note.worst': 'The keys that fought back the most: {keys}.',
    'result.note.perfect': 'Not a single mistake! You can move on to the next lesson.',
    'result.note.clean': 'No mistakes. Repeat it to gain speed.',

    /* --------------------------------------------------------------- share */
    'share.title': 'Share',
    'share.project': 'Share the project',
    'share.progress': 'Share my progress',
    'share.result': 'Share the result',
    'share.copy': 'Copy text and link',
    'share.copied': 'Copied!',
    'share.copyFailed': 'Could not copy',
    'share.close': 'Close',
    'share.email': 'Email',
    'share.text.project':
      'I am learning to touch type with this free course: Spanish and English keyboards, ' +
      '31 lessons and speed statistics. #touchtyping',
    'share.text.result':
      '{stars} I completed the "{title}" lesson at {wpm} wpm with {accuracy}% accuracy while ' +
      'learning to touch type. #touchtyping',
    'share.text.progress':
      'I am {done} of {total} touch typing lessons in: {wpm} wpm and {accuracy}% accuracy. #touchtyping',

    /* -------------------------------------------------------------- footer */
    'footer.pitch':
      '<b>Mecanografía</b> is a free and open source project: no accounts, no ads, and your progress ' +
      'stored in your browser only.',
    'footer.donateLead': 'If it is helping you and you feel like chipping in, you can buy me a coffee.',
    'footer.share': 'Share',
    'footer.donate': 'Donate with PayPal',
    'footer.consent': 'Cookie preferences',

    /* ------------------------------------------------------------- consent */
    'consent.title': 'Analytics cookies',
    'consent.body':
      'I use Google Analytics (through Tag Manager) only to know which lessons get used and improve ' +
      'the course. There are no ads and no profiling, and your progress is still stored in your ' +
      'browser only. Until you decide, no analytics cookie is written.',
    'consent.deny': 'Reject',
    'consent.accept': 'Accept',
    'consent.label': 'Cookie notice',
  },
};
