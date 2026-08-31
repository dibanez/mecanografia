/**
 * Lesson plan for the Spanish (ISO) keyboard, ordered from the home row
 * outwards. See lessons.js for the lesson types.
 */

const HOME_ROW = ['a', 's', 'd', 'f', 'j', 'k', 'l', 'ñ'];

export const LESSONS_ES = [
  // Block 1 — home row
  { id: 'h-fj', block: 1, title: { es: 'F y J', en: 'F and J' }, subtitle: { es: 'las teclas guía', en: 'the guide keys' }, type: 'drill', keys: ['f', 'j'], review: [], target: 15 },
  { id: 'h-dk', block: 1, title: { es: 'D y K', en: 'D and K' }, type: 'drill', keys: ['d', 'k'], review: ['f', 'j'], target: 15 },
  { id: 'h-sl', block: 1, title: { es: 'S y L', en: 'S and L' }, type: 'drill', keys: ['s', 'l'], review: ['f', 'j', 'd', 'k'], target: 16 },
  { id: 'h-an', block: 1, title: { es: 'A y Ñ', en: 'A and Ñ' }, type: 'drill', keys: ['a', 'ñ'], review: ['f', 'j', 'd', 'k', 's', 'l'], target: 16 },
  { id: 'h-gh', block: 1, title: { es: 'G y H', en: 'G and H' }, subtitle: { es: 'estiramiento del índice', en: 'index finger stretch' }, type: 'drill', keys: ['g', 'h'], review: HOME_ROW, target: 18 },
  {
    id: 'h-words', block: 1, title: { es: 'Palabras de la fila guía', en: 'Home row words' }, type: 'words', target: 20,
    words: ['ala', 'sal', 'las', 'dad', 'gala', 'hada', 'jefa', 'lada', 'sala', 'falda', 'halda', 'ajad', 'dalas', 'salda', 'haga', 'lag', 'kaki', 'flash', 'gafas', 'gasas'],
  },

  // Block 2 — top row
  { id: 't-ei', block: 2, title: { es: 'E e I', en: 'E and I' }, type: 'drill', keys: ['e', 'i'], review: HOME_ROW, target: 18 },
  { id: 't-ru', block: 2, title: { es: 'R y U', en: 'R and U' }, type: 'drill', keys: ['r', 'u'], review: [...HOME_ROW, 'e', 'i'], target: 18 },
  { id: 't-ty', block: 2, title: { es: 'T e Y', en: 'T and Y' }, type: 'drill', keys: ['t', 'y'], review: [...HOME_ROW, 'e', 'i', 'r', 'u'], target: 20 },
  { id: 't-wo', block: 2, title: { es: 'W y O', en: 'W and O' }, type: 'drill', keys: ['w', 'o'], review: [...HOME_ROW, 'e', 'i', 'r', 'u', 't'], target: 20 },
  { id: 't-qp', block: 2, title: { es: 'Q y P', en: 'Q and P' }, type: 'drill', keys: ['q', 'p'], review: [...HOME_ROW, 'e', 'i', 'r', 'u', 't', 'o'], target: 20 },
  {
    id: 't-words', block: 2, title: { es: 'Palabras con dos filas', en: 'Two-row words' }, type: 'words', target: 24,
    words: ['puerta', 'quiere', 'salida', 'trigo', 'realidad', 'poder', 'querella', 'higuera', 'ruta', 'tejado', 'juega', 'litera', 'partida', 'oreja', 'aquel', 'pareja', 'sortija', 'trapo', 'delirio', 'lagarto', 'guitarra', 'historia'],
  },

  // Block 3 — bottom row
  { id: 'b-vn', block: 3, title: { es: 'V y N', en: 'V and N' }, type: 'drill', keys: ['v', 'n'], review: [...HOME_ROW, 'e', 'i', 'o', 'r', 'u', 't'], target: 20 },
  { id: 'b-cm', block: 3, title: { es: 'C y M', en: 'C and M' }, type: 'drill', keys: ['c', 'm'], review: [...HOME_ROW, 'e', 'i', 'o', 'v', 'n'], target: 20 },
  { id: 'b-xz', block: 3, title: { es: 'X, Z y B', en: 'X, Z and B' }, type: 'drill', keys: ['x', 'z', 'b'], review: [...HOME_ROW, 'e', 'i', 'o', 'c', 'm', 'n'], target: 22 },
  {
    id: 'b-words', block: 3, title: { es: 'Todas las letras', en: 'Every letter' }, type: 'words', target: 26,
    words: ['ventana', 'cambio', 'zapato', 'exacto', 'nombre', 'bosque', 'muñeca', 'vecino', 'brazo', 'columna', 'campana', 'mezcla', 'cabeza', 'extremo', 'examen', 'banco', 'noche', 'invierno', 'cerveza', 'vaca'],
  },

  // Block 4 — accents and diaeresis
  { id: 'a-acute', block: 4, title: { es: 'Tildes', en: 'Acute accents' }, subtitle: { es: 'la tecla muerta ´', en: 'the ´ dead key' }, type: 'words', target: 24,
    words: ['café', 'árbol', 'música', 'rápido', 'canción', 'jamás', 'lápiz', 'túnel', 'después', 'según', 'décimo', 'próximo', 'atención', 'línea', 'último', 'periódico'] },
  { id: 'a-dieresis', block: 4, title: { es: 'Diéresis y Ñ', en: 'Diaeresis and Ñ' }, type: 'words', target: 24,
    words: ['pingüino', 'vergüenza', 'lingüista', 'cigüeña', 'antigüedad', 'niño', 'año', 'sueño', 'mañana', 'pequeño', 'compañero', 'montaña', 'señal', 'muñeca'] },
  { id: 'a-text', block: 4, title: { es: 'Texto acentuado', en: 'Accented text' }, type: 'text', target: 28,
    text: 'el pingüino caminó despacio por la montaña helada. después del último día de invierno la cigüeña volvió a su nido y el compañero de siempre la esperaba allí' },

  // Block 5 — capitals and punctuation
  { id: 'p-shift', block: 5, title: { es: 'Mayúsculas', en: 'Capitals' }, subtitle: { es: 'Shift con la mano contraria', en: 'Shift with the opposite hand' }, type: 'words', target: 24,
    words: ['Madrid', 'Ana', 'Sevilla', 'Pedro', 'Bilbao', 'Lucía', 'Toledo', 'Javier', 'Granada', 'Olga', 'Nuria', 'Zamora', 'Cádiz', 'Huesca', 'Íñigo', 'Álvaro'] },
  { id: 'p-comma', block: 5, title: { es: 'Coma, punto y guion', en: 'Comma, full stop and hyphen' }, type: 'drill', keys: [',', '.', '-'], review: ['a', 's', 'd', 'f', 'j', 'k', 'l', 'e', 'n', 'o', 'r'], target: 24 },
  { id: 'p-quotes', block: 5, title: { es: 'Interrogación y exclamación', en: 'Question and exclamation marks' }, type: 'text', target: 26,
    text: '¿Vienes esta tarde? Sí, claro. ¡Qué bien! ¿A qué hora quedamos? A las siete, ¿te parece? ¡Perfecto! ¿Traigo algo? No hace falta, ¡gracias!' },
  { id: 'p-mixed', block: 5, title: { es: 'Puntuación mixta', en: 'Mixed punctuation' }, type: 'text', target: 28,
    text: 'La lista es corta: pan, leche, huevos y café. Si llegas antes, avísame; si no, te espero. "Nunca es tarde", dijo, "si la dicha es buena".' },

  // Block 6 — numbers and symbols
  { id: 'n-home', block: 6, title: { es: 'Números 4 5 6 7', en: 'Digits 4 5 6 7' }, type: 'drill', keys: ['4', '5', '6', '7'], review: ['f', 'j', 'd', 'k'], target: 18 },
  { id: 'n-outer', block: 6, title: { es: 'Números 3 8 2 9 1 0', en: 'Digits 3 8 2 9 1 0' }, type: 'drill', keys: ['3', '8', '2', '9', '1', '0'], review: ['4', '5', '6', '7'], target: 18 },
  { id: 'n-mixed', block: 6, title: { es: 'Cifras y fechas', en: 'Figures and dates' }, type: 'text', target: 24,
    text: 'El 12 de octubre de 1492 zarparon 3 naves. En 2024 la cifra creció un 15,4 % hasta 8.750 unidades, frente a las 6.320 del año anterior.' },
  { id: 's-symbols', block: 6, title: { es: 'Símbolos frecuentes', en: 'Common symbols' }, type: 'drill', keys: ['@', '/', '(', ')', '-', '_', '+'], review: ['a', 'e', 'i', 'o', 'u', 's', 'n'], target: 20 },
  { id: 's-code', block: 6, title: { es: 'Correo y direcciones', en: 'Email and addresses' }, type: 'text', target: 24,
    text: 'Escríbeme a soporte@ejemplo.es o entra en https://www.ejemplo.es/ayuda (sección 4.2). El código de pedido es AB-2024_17/C.' },

  // Block 7 — real texts
  { id: 'x-quijote', block: 7, title: { es: 'El Quijote', en: 'Don Quixote' }, type: 'text', target: 32,
    text: 'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.' },
  { id: 'x-soledad', block: 7, title: { es: 'Cien años de soledad', en: 'One Hundred Years of Solitude' }, type: 'text', target: 32,
    text: 'Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo.' },
  { id: 'x-panagram', block: 7, title: { es: 'Prueba final', en: 'Final test' }, subtitle: { es: 'todo el teclado', en: 'the whole keyboard' }, type: 'text', target: 34,
    text: 'El veloz murciélago hindú comía feliz cardillo y kiwi; la cigüeña tocaba el saxofón detrás del palenque de paja. ¿Preparado? ¡Adelante, que quedan 3 líneas!' },
];

export const BLOCKS_ES = [
  {
    id: 1,
    title: { es: 'Fila guía', en: 'Home row' },
    description: {
      es: 'Las ocho teclas base y el estiramiento del índice.',
      en: 'The eight base keys and the index finger stretch.',
    },
  },
  {
    id: 2,
    title: { es: 'Fila superior', en: 'Top row' },
    description: {
      es: 'De la fila guía hacia arriba, sin mirar el teclado.',
      en: 'From the home row upwards, without looking at the keyboard.',
    },
  },
  {
    id: 3,
    title: { es: 'Fila inferior', en: 'Bottom row' },
    description: { es: 'Las últimas letras del alfabeto.', en: 'The last letters of the alphabet.' },
  },
  {
    id: 4,
    title: { es: 'Tildes y diéresis', en: 'Accents and diaeresis' },
    description: {
      es: 'Teclas muertas, acentos y la ñ en contexto.',
      en: 'Dead keys, accents and ñ in context.',
    },
  },
  {
    id: 5,
    title: { es: 'Mayúsculas y puntuación', en: 'Capitals and punctuation' },
    description: {
      es: 'Shift con la mano contraria, comas y signos.',
      en: 'Shift with the opposite hand, commas and marks.',
    },
  },
  {
    id: 6,
    title: { es: 'Números y símbolos', en: 'Numbers and symbols' },
    description: {
      es: 'La fila superior de cifras y los símbolos del día a día.',
      en: 'The digit row and the symbols of everyday writing.',
    },
  },
  {
    id: 7,
    title: { es: 'Textos reales', en: 'Real texts' },
    description: {
      es: 'Párrafos completos para consolidar la velocidad.',
      en: 'Full paragraphs to consolidate speed.',
    },
  },
];
