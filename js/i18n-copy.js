/**
 * Page copy, per interface language.
 *
 * Keys mirror the sections of index.html. Values ending in `.html` may carry
 * inline markup (<b>, <kbd>, <a>); everything else is plain text.
 */

export const COPY = {
  es: {
    /* ---------------------------------------------------- page and preview */
    'meta.locale': 'es_ES',
    'language.switch': 'Leer en español',
    'meta.title': 'Mecanografía — aprende a escribir sin mirar',
    'meta.description':
      'Curso de mecanografía para teclado español e inglés: tutorial de colocación de dedos, ' +
      '31 lecciones progresivas por distribución, once tipos de teclado en pantalla y ' +
      'estadísticas de velocidad y precisión.',
    'meta.ogDescription':
      'Curso gratuito de mecanografía para teclado español e inglés: tutorial de colocación de ' +
      'dedos, 31 lecciones progresivas, teclado en pantalla y estadísticas de velocidad.',
    'og.pageTitle': 'Mecanografía — tarjeta de vista previa',
    'og.headline': 'Aprende a escribir sin mirar el teclado',
    'og.blurb': 'Curso gratuito con teclado español e inglés, 31 lecciones y estadísticas.',
    'og.homeKey': 'Ñ',
    'og.url': 'dibanez.github.io/mecanografia',
    'og.badges': 'gratis · sin cuentas · sin anuncios',

    /* ------------------------------------------------------------- welcome */
    'welcome.count': 'Paso {current} de {total}',
    'welcome.hello.title': 'Bienvenido a Mecanografía',
    'welcome.hello.body':
      'Aquí se aprende a escribir sin mirar el teclado: un tutorial que explica cómo se coloca ' +
      'cada dedo y 31 lecciones que van de la fila guía a los textos reales.',
    'welcome.hello.item1':
      '<b>Sin cuentas y sin anuncios</b>: tu progreso se guarda solo en este navegador.',
    'welcome.hello.item2':
      '<b>Diez o quince minutos al día</b> valen más que dos horas el domingo.',
    'welcome.hello.item3':
      '<b>Tres estrellas por lección</b>, que se sacan con precisión y no con velocidad.',
    'welcome.keyboard.title': 'Primero, dime qué teclado tienes',
    'welcome.keyboard.body':
      'El teclado en pantalla dibuja la distribución que elijas, no la que tenga puesta tu ' +
      'ordenador. Si no coinciden, te enseñará teclas que no están donde dice.',
    'welcome.keyboard.note':
      'Tiene que ser la distribución que tengas puesta en el sistema operativo, que no siempre es ' +
      'la que viene serigrafiada en las teclas. Todo esto se cambia cuando quieras en el botón ' +
      '<b>⚙</b> de arriba.',
    'detect.start': 'Averiguarlo pulsando teclas',
    'detect.cancel': 'Dejarlo',
    'detect.probe.Semicolon':
      'Pulsa la tecla que tienes <b>a la derecha de la <kbd>L</kbd></b>.',
    'detect.probe.Backquote':
      'Ahora la de arriba del todo a la izquierda, <b>justo a la izquierda del <kbd>1</kbd></b>.',
    'detect.probe.Backslash':
      'Y ahora la que está pegada a la tecla <kbd>Intro</kbd>, encima de ella o a su izquierda.',
    'detect.done': 'Es un teclado <b>{name}</b>. Ya está elegido.',
    'detect.unknown':
      'Eso no es ninguna de las cuatro distribuciones que enseño. Elige a mano la que más se ' +
      'parezca a la tuya.',
    'welcome.tutorial.title': 'Empieza por el tutorial',
    'welcome.tutorial.body':
      'Son ocho pasos que se leen en tres minutos y cuentan lo que ninguna lección enseña por su ' +
      'cuenta:',
    'welcome.tutorial.item1': '<b>La postura</b>: silla, codos, muñecas y altura de la pantalla.',
    'welcome.tutorial.item2':
      '<b>La fila guía</b>: dónde descansan las manos y cómo volver a ellas sin mirar, buscando ' +
      'los relieves de la <kbd>F</kbd> y la <kbd>J</kbd>.',
    'welcome.tutorial.item3':
      '<b>El territorio de cada dedo</b>, sobre tu teclado coloreado y con la guía de manos.',
    'welcome.tutorial.item4':
      '<b>Las mayúsculas con la mano contraria</b> y el pulgar dedicado al espacio.',
    'welcome.tutorial.item5':
      '<b>Cómo practicar</b> y los errores que más se repiten al empezar.',
    'welcome.tutorial.note':
      'Si prefieres teclear ya, ve a las lecciones: el tutorial no se va de la barra de arriba.',
    'welcome.back': 'Atrás',
    'welcome.next': 'Siguiente',
    'welcome.start': 'Ver el tutorial',
    'welcome.skip': 'Ir a las lecciones',

    /* ------------------------------------------------------------ tutorial */
    'tutorial.title': 'Cómo empezar a mecanografiar',
    'tutorial.intro':
      'Escribir sin mirar es una habilidad motriz: no se entiende, se entrena. Estos ocho pasos ' +
      'son todo lo que necesitas saber antes de la primera lección.',

    'tutorial.setup.title': 'Dile qué teclado tienes',
    'tutorial.setup.lead':
      'El teclado en pantalla dibuja la distribución que elijas, no la que tenga puesta tu ' +
      'ordenador. Si no coinciden, te enseñará teclas que no están donde dice. Se configura en el ' +
      'botón <b>⚙</b> de arriba a la derecha y se recuerda en este navegador.',
    'tutorial.setup.layout':
      '<b>Distribución</b>: qué carácter da cada tecla. Tiene que ser la que tengas en el sistema ' +
      'operativo, que no siempre es la que viene serigrafiada. Para salir de dudas, pulsa la tecla ' +
      'a la derecha de la <kbd>L</kbd>: si sale <kbd>ñ</kbd>, es la española.',
    'tutorial.setup.form':
      '<b>Tipo de teclado</b>: solo cambia el dibujo — completo, portátil, Mac, partido, ' +
      'ortolineal… Elige el que se parezca al tuyo. En los partidos por columnas y en los Mac ' +
      'cambia además qué dedo se ocupa de cada tecla.',
    'tutorial.setup.language':
      '<b>Idioma</b>: el de los textos de la página, independiente del teclado. Puedes practicar ' +
      'el teclado español con la web en inglés. Cada idioma tiene su propia dirección, así que el ' +
      'enlace que compartas abre en el idioma en el que estabas.',
    'tutorial.setup.course':
      'Las lecciones salen de las dos cosas, y en este orden: primero de lo que tu teclado puede ' +
      'escribir y después del idioma de la página. En un teclado español caben los dos temarios, ' +
      'así que manda el idioma; en uno inglés sale siempre el temario inglés, porque el español ' +
      'está lleno de ñ y tildes que ese teclado no tiene.',
    'tutorial.setup.state':
      'Ahora mismo: distribución <b>{layout}</b>, dibujada como <b>{form}</b>, y la página en ' +
      '<b>{language}</b>.',
    'tutorial.setup.open': 'Abrir los ajustes',

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
      '{count} lecciones progresivas en español. Empieza por la fila guía y avanza hasta escribir ' +
      'párrafos completos con tildes, la ñ, signos y números.',
    'course.lead.en':
      '{count} lecciones progresivas en inglés. Empieza por la fila guía y avanza hasta escribir ' +
      'párrafos completos con apóstrofos, signos y números.',

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
    'free.unsupported':
      'Tu distribución ({layout}) no tiene tecla para esto: {keys}. Quítalo del texto o cambia de ' +
      'distribución en Ajustes.',
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
    /* ---------------------------------------------------- page and preview */
    'meta.locale': 'en_GB',
    'language.switch': 'Read in English',
    'meta.title': 'Mecanografía — learn to type without looking',
    'meta.description':
      'Touch typing course for the Spanish and English keyboard: finger placement tutorial, ' +
      '31 progressive lessons per layout, eleven on-screen keyboard types and speed and ' +
      'accuracy statistics.',
    'meta.ogDescription':
      'Free touch typing course for the Spanish and English keyboard: finger placement tutorial, ' +
      '31 progressive lessons, on-screen keyboard and speed statistics.',
    'og.pageTitle': 'Mecanografía — link preview card',
    'og.headline': 'Learn to type without looking at the keyboard',
    'og.blurb': 'Free course for the Spanish and English keyboard, 31 lessons and statistics.',
    'og.homeKey': ';',
    'og.url': 'dibanez.github.io/mecanografia/en',
    'og.badges': 'free · no accounts · no ads',

    /* ------------------------------------------------------------- welcome */
    'welcome.count': 'Step {current} of {total}',
    'welcome.hello.title': 'Welcome to Mecanografía',
    'welcome.hello.body':
      'This is where you learn to type without looking: a tutorial explaining where every finger ' +
      'goes and 31 lessons running from the home row to real texts.',
    'welcome.hello.item1':
      '<b>No accounts and no ads</b>: your progress is kept in this browser only.',
    'welcome.hello.item2':
      '<b>Ten or fifteen minutes a day</b> beat two hours on a Sunday.',
    'welcome.hello.item3':
      '<b>Three stars per lesson</b>, earned with accuracy rather than speed.',
    'welcome.keyboard.title': 'First, tell me which keyboard you have',
    'welcome.keyboard.body':
      'The on-screen keyboard draws the layout you pick, not the one your computer is set to. ' +
      'If they disagree, it will teach you keys that are not where it says.',
    'welcome.keyboard.note':
      'It has to be the layout your operating system is set to, which is not always the one ' +
      'printed on the keys. All of this can be changed later from the <b>⚙</b> button up top.',
    'detect.start': 'Work it out by pressing keys',
    'detect.cancel': 'Never mind',
    'detect.probe.Semicolon': 'Press the key <b>to the right of <kbd>L</kbd></b>.',
    'detect.probe.Backquote':
      'Now the one at the very top left, <b>just left of the <kbd>1</kbd></b>.',
    'detect.probe.Backslash':
      'And now the one touching the <kbd>Enter</kbd> key, above it or to its left.',
    'detect.done': 'That is a <b>{name}</b> keyboard. Already selected.',
    'detect.unknown':
      'That is none of the four layouts taught here. Pick the closest one to yours by hand.',
    'welcome.tutorial.title': 'Start with the tutorial',
    'welcome.tutorial.body':
      'Eight steps, three minutes to read, covering what no single lesson teaches on its own:',
    'welcome.tutorial.item1': '<b>Posture</b>: chair, elbows, wrists and screen height.',
    'welcome.tutorial.item2':
      '<b>The home row</b>: where the hands rest and how to find it again without looking, by ' +
      'feeling for the bumps on <kbd>F</kbd> and <kbd>J</kbd>.',
    'welcome.tutorial.item3':
      '<b>Which keys belong to each finger</b>, on your own keyboard in colour, with the hand guide.',
    'welcome.tutorial.item4':
      '<b>Capitals with the opposite hand</b> and one thumb dedicated to the space bar.',
    'welcome.tutorial.item5':
      '<b>How to practise</b> and the mistakes beginners repeat the most.',
    'welcome.tutorial.note':
      'If you would rather type right away, go to the lessons: the tutorial stays in the top bar.',
    'welcome.back': 'Back',
    'welcome.next': 'Next',
    'welcome.start': 'Read the tutorial',
    'welcome.skip': 'Go to the lessons',

    /* ------------------------------------------------------------ tutorial */
    'tutorial.title': 'How to start touch typing',
    'tutorial.intro':
      'Typing without looking is a motor skill: you do not understand it, you train it. These ' +
      'eight steps are everything you need to know before the first lesson.',

    'tutorial.setup.title': 'Tell it which keyboard you have',
    'tutorial.setup.lead':
      'The on-screen keyboard draws the layout you pick, not the one your computer is set to. If ' +
      'they disagree, it will teach you keys that are somewhere else. You set it in the <b>⚙</b> ' +
      'button at the top right, and it is remembered in this browser.',
    'tutorial.setup.layout':
      '<b>Layout</b>: which character each key types. It has to be the one your operating system ' +
      'is set to, which is not always the one printed on the keys. To settle it, press the key to ' +
      'the right of <kbd>L</kbd>: if you get <kbd>ñ</kbd>, it is the Spanish one.',
    'tutorial.setup.form':
      '<b>Keyboard type</b>: only changes the drawing — full size, laptop, Mac, split, ' +
      'ortholinear… Pick the one that looks like yours. On columnar split and Apple boards it ' +
      'also changes which finger owns each key.',
    'tutorial.setup.language':
      '<b>Language</b>: the one the page is written in, independent from the keyboard. You can ' +
      'practise the Spanish keyboard with the site in English. Each language has an address of ' +
      'its own, so a link you share opens in the language you were using.',
    'tutorial.setup.course':
      'The lessons come from both, in this order: first from what your keyboard can type, then ' +
      'from the language of the page. A Spanish keyboard fits both courses, so the language ' +
      'decides; an English one always gets the English course, because the Spanish one is full of ' +
      'ñ and accents that keyboard does not have.',
    'tutorial.setup.state':
      'Right now: the <b>{layout}</b> layout, drawn as <b>{form}</b>, with the page in ' +
      '<b>{language}</b>.',
    'tutorial.setup.open': 'Open the settings',

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
      '{count} progressive lessons in Spanish. Start on the home row and work up to full ' +
      'paragraphs with accents, the ñ, punctuation and numbers.',
    'course.lead.en':
      '{count} progressive lessons in English. Start on the home row and work up to full ' +
      'paragraphs with apostrophes, punctuation and numbers.',

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
    'free.unsupported':
      'Your layout ({layout}) has no key for this: {keys}. Take it out of the text or change the ' +
      'layout in Settings.',
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
