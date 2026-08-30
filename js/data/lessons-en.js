/**
 * Lesson plan for the English keyboard (US ANSI and UK ISO share it: their
 * letter block and finger assignment are identical).
 *
 * Titles stay in Spanish because the interface is in Spanish; the exercise
 * text is English so it matches the layout being practised. Every exercise
 * avoids characters that differ between US and UK (£, ¬, ¦).
 */

const HOME_ROW = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

export const LESSONS_EN = [
  // Block 1 — home row
  { id: 'en-h-fj', block: 1, title: 'F y J', subtitle: 'las teclas guía', type: 'drill', keys: ['f', 'j'], review: [], target: 15 },
  { id: 'en-h-dk', block: 1, title: 'D y K', type: 'drill', keys: ['d', 'k'], review: ['f', 'j'], target: 15 },
  { id: 'en-h-sl', block: 1, title: 'S y L', type: 'drill', keys: ['s', 'l'], review: ['f', 'j', 'd', 'k'], target: 16 },
  { id: 'en-h-as', block: 1, title: 'A y ;', subtitle: 'los meñiques', type: 'drill', keys: ['a', ';'], review: ['f', 'j', 'd', 'k', 's', 'l'], target: 16 },
  { id: 'en-h-gh', block: 1, title: 'G y H', subtitle: 'estiramiento del índice', type: 'drill', keys: ['g', 'h'], review: HOME_ROW, target: 18 },
  {
    id: 'en-h-words', block: 1, title: 'Palabras de la fila guía', type: 'words', target: 20,
    words: ['add', 'ads', 'alas', 'all', 'ask', 'dad', 'fad', 'fall', 'flag', 'flash', 'flask', 'gala', 'gash', 'glad', 'glass', 'had', 'half', 'hall', 'has', 'lad', 'lag', 'lash', 'salad', 'sash', 'slag', 'shall'],
  },

  // Block 2 — top row
  { id: 'en-t-ei', block: 2, title: 'E e I', type: 'drill', keys: ['e', 'i'], review: HOME_ROW, target: 18 },
  { id: 'en-t-ru', block: 2, title: 'R y U', type: 'drill', keys: ['r', 'u'], review: [...HOME_ROW, 'e', 'i'], target: 18 },
  { id: 'en-t-ty', block: 2, title: 'T e Y', type: 'drill', keys: ['t', 'y'], review: [...HOME_ROW, 'e', 'i', 'r', 'u'], target: 20 },
  { id: 'en-t-wo', block: 2, title: 'W y O', type: 'drill', keys: ['w', 'o'], review: [...HOME_ROW, 'e', 'i', 'r', 'u', 't'], target: 20 },
  { id: 'en-t-qp', block: 2, title: 'Q y P', type: 'drill', keys: ['q', 'p'], review: [...HOME_ROW, 'e', 'i', 'r', 'u', 't', 'o'], target: 20 },
  {
    id: 'en-t-words', block: 2, title: 'Palabras con dos filas', type: 'words', target: 24,
    words: ['after', 'their', 'quiet', 'rather', 'reply', 'trail', 'street', 'people', 'result', 'suppose', 'together', 'thought', 'toilet', 'litre', 'guitar', 'holiday', 'quality', 'seaside', 'shelter', 'article', 'partial', 'juggle'],
  },

  // Block 3 — bottom row
  { id: 'en-b-vn', block: 3, title: 'V y N', type: 'drill', keys: ['v', 'n'], review: [...HOME_ROW, 'e', 'i', 'o', 'r', 'u', 't'], target: 20 },
  { id: 'en-b-cm', block: 3, title: 'C y M', type: 'drill', keys: ['c', 'm'], review: [...HOME_ROW, 'e', 'i', 'o', 'v', 'n'], target: 20 },
  { id: 'en-b-xz', block: 3, title: 'X, Z y B', type: 'drill', keys: ['x', 'z', 'b'], review: [...HOME_ROW, 'e', 'i', 'o', 'c', 'm', 'n'], target: 22 },
  {
    id: 'en-b-words', block: 3, title: 'Todas las letras', type: 'words', target: 26,
    words: ['number', 'become', 'except', 'zebra', 'machine', 'vacuum', 'between', 'company', 'example', 'combine', 'vertical', 'climb', 'nozzle', 'jacket', 'mixture', 'convex', 'blanket', 'movement', 'quickly', 'objective'],
  },

  // Block 4 — rhythm on the most frequent English patterns
  {
    id: 'en-w-common', block: 4, title: 'Palabras frecuentes', subtitle: 'las 40 más usadas', type: 'words', target: 26,
    words: ['the', 'be', 'to', 'of', 'and', 'in', 'that', 'have', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up'],
  },
  {
    id: 'en-w-clusters', block: 4, title: 'Combinaciones frecuentes', subtitle: 'th, ch, ing, ion…', type: 'words', target: 26,
    words: ['th', 'he', 'in', 'er', 'an', 're', 'nd', 'on', 'en', 'at', 'ou', 'ed', 'ha', 'ing', 'ion', 'tio', 'ent', 'ch', 'sh', 'gh', 'wh', 'ck', 'qu', 'ght', 'tion', 'ough', 'ness', 'ment'],
  },
  { id: 'en-w-text', block: 4, title: 'Primer texto seguido', type: 'text', target: 28,
    text: 'the quiet morning light came through the window and the whole house began to wake up. she thought about the letter on the table and about the long walk that would follow.' },

  // Block 5 — capitals and punctuation
  { id: 'en-p-shift', block: 5, title: 'Mayúsculas', subtitle: 'Shift con la mano contraria', type: 'words', target: 24,
    words: ['London', 'Sarah', 'Monday', 'April', 'James', 'Oxford', 'Boston', 'Emily', 'Wales', 'Peter', 'Nairobi', 'Zurich', 'Quebec', 'Victoria', 'Kingston', 'Yorkshire'] },
  { id: 'en-p-comma', block: 5, title: 'Coma, punto y guion', type: 'drill', keys: [',', '.', '-'], review: ['a', 's', 'd', 'f', 'j', 'k', 'l', 'e', 'n', 'o', 'r'], target: 24 },
  { id: 'en-p-apostrophe', block: 5, title: 'Apóstrofos y comillas', subtitle: "la tecla '", type: 'text', target: 26,
    text: "it's late and I'm tired, but we can't stop now. don't worry, she said, they'll wait for us. \"we're almost there,\" he answered, \"it won't take long.\"" },
  { id: 'en-p-mixed', block: 5, title: 'Puntuación mixta', type: 'text', target: 28,
    text: 'The list is short: bread, milk, eggs and coffee. If you arrive early, call me; if not, I will wait. "It is never too late," she said, "if the news is good."' },

  // Block 6 — numbers and symbols
  { id: 'en-n-home', block: 6, title: 'Números 4 5 6 7', type: 'drill', keys: ['4', '5', '6', '7'], review: ['f', 'j', 'd', 'k'], target: 18 },
  { id: 'en-n-outer', block: 6, title: 'Números 3 8 2 9 1 0', type: 'drill', keys: ['3', '8', '2', '9', '1', '0'], review: ['4', '5', '6', '7'], target: 18 },
  { id: 'en-n-mixed', block: 6, title: 'Cifras y fechas', type: 'text', target: 24,
    text: 'On 12 October 1492 three ships set sail. In 2024 the figure grew by 15.4% to 8,750 units, compared with 6,320 the year before.' },
  { id: 'en-s-symbols', block: 6, title: 'Símbolos frecuentes', type: 'drill', keys: ['@', '/', '(', ')', '-', '_', '+'], review: ['a', 'e', 'i', 'o', 'u', 's', 'n'], target: 20 },
  { id: 'en-s-code', block: 6, title: 'Correo y direcciones', type: 'text', target: 24,
    text: 'Write to support@example.com or go to https://www.example.com/help (section 4.2). The order code is AB-2024_17/C.' },

  // Block 7 — real texts
  { id: 'en-x-alice', block: 7, title: 'Alice in Wonderland', type: 'text', target: 32,
    text: 'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading.' },
  { id: 'en-x-moby', block: 7, title: 'Moby-Dick', type: 'text', target: 32,
    text: 'Call me Ishmael. Some years ago, never mind how long precisely, having little or no money in my purse, I thought I would sail about a little and see the watery part of the world.' },
  { id: 'en-x-pangram', block: 7, title: 'Prueba final', subtitle: 'todo el teclado', type: 'text', target: 34,
    text: 'The quick brown fox jumps over the lazy dog while five wizards vex the judge; pack my box with 6 dozen liquor jugs. Ready? Only 3 lines to go!' },
];

export const BLOCKS_EN = [
  { id: 1, title: 'Fila guía', description: 'Las ocho teclas base (A S D F · J K L ;) y el estiramiento del índice.' },
  { id: 2, title: 'Fila superior', description: 'De la fila guía hacia arriba, sin mirar el teclado.' },
  { id: 3, title: 'Fila inferior', description: 'Las últimas letras del alfabeto.' },
  { id: 4, title: 'Ritmo en inglés', description: 'Las palabras y combinaciones de letras más frecuentes.' },
  { id: 5, title: 'Mayúsculas y puntuación', description: 'Shift con la mano contraria, apóstrofos y signos.' },
  { id: 6, title: 'Números y símbolos', description: 'La fila superior de cifras y los símbolos del día a día.' },
  { id: 7, title: 'Textos reales', description: 'Párrafos completos para consolidar la velocidad.' },
];
