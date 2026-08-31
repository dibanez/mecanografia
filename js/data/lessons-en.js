/**
 * Lesson plan for the English keyboard (US ANSI and UK ISO share it: their
 * letter block and finger assignment are identical).
 *
 * Titles carry both interface languages; the exercise text is always English
 * so it matches the layout being practised. Every exercise avoids characters
 * that differ between US and UK (£, ¬, ¦).
 */

const HOME_ROW = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

export const LESSONS_EN = [
  // Block 1 — home row
  { id: 'en-h-fj', block: 1, title: { es: 'F y J', en: 'F and J' }, subtitle: { es: 'las teclas guía', en: 'the guide keys' }, type: 'drill', keys: ['f', 'j'], review: [], target: 15 },
  { id: 'en-h-dk', block: 1, title: { es: 'D y K', en: 'D and K' }, type: 'drill', keys: ['d', 'k'], review: ['f', 'j'], target: 15 },
  { id: 'en-h-sl', block: 1, title: { es: 'S y L', en: 'S and L' }, type: 'drill', keys: ['s', 'l'], review: ['f', 'j', 'd', 'k'], target: 16 },
  { id: 'en-h-as', block: 1, title: { es: 'A y ;', en: 'A and ;' }, subtitle: { es: 'los meñiques', en: 'the little fingers' }, type: 'drill', keys: ['a', ';'], review: ['f', 'j', 'd', 'k', 's', 'l'], target: 16 },
  { id: 'en-h-gh', block: 1, title: { es: 'G y H', en: 'G and H' }, subtitle: { es: 'estiramiento del índice', en: 'index finger stretch' }, type: 'drill', keys: ['g', 'h'], review: HOME_ROW, target: 18 },
  {
    id: 'en-h-words', block: 1, title: { es: 'Palabras de la fila guía', en: 'Home row words' }, type: 'words', target: 20,
    words: ['add', 'ads', 'alas', 'all', 'ask', 'dad', 'fad', 'fall', 'flag', 'flash', 'flask', 'gala', 'gash', 'glad', 'glass', 'had', 'half', 'hall', 'has', 'lad', 'lag', 'lash', 'salad', 'sash', 'slag', 'shall'],
  },

  // Block 2 — top row
  { id: 'en-t-ei', block: 2, title: { es: 'E e I', en: 'E and I' }, type: 'drill', keys: ['e', 'i'], review: HOME_ROW, target: 18 },
  { id: 'en-t-ru', block: 2, title: { es: 'R y U', en: 'R and U' }, type: 'drill', keys: ['r', 'u'], review: [...HOME_ROW, 'e', 'i'], target: 18 },
  { id: 'en-t-ty', block: 2, title: { es: 'T e Y', en: 'T and Y' }, type: 'drill', keys: ['t', 'y'], review: [...HOME_ROW, 'e', 'i', 'r', 'u'], target: 20 },
  { id: 'en-t-wo', block: 2, title: { es: 'W y O', en: 'W and O' }, type: 'drill', keys: ['w', 'o'], review: [...HOME_ROW, 'e', 'i', 'r', 'u', 't'], target: 20 },
  { id: 'en-t-qp', block: 2, title: { es: 'Q y P', en: 'Q and P' }, type: 'drill', keys: ['q', 'p'], review: [...HOME_ROW, 'e', 'i', 'r', 'u', 't', 'o'], target: 20 },
  {
    id: 'en-t-words', block: 2, title: { es: 'Palabras con dos filas', en: 'Two-row words' }, type: 'words', target: 24,
    words: ['after', 'their', 'quiet', 'rather', 'reply', 'trail', 'street', 'people', 'result', 'suppose', 'together', 'thought', 'toilet', 'litre', 'guitar', 'holiday', 'quality', 'seaside', 'shelter', 'article', 'partial', 'juggle'],
  },

  // Block 3 — bottom row
  { id: 'en-b-vn', block: 3, title: { es: 'V y N', en: 'V and N' }, type: 'drill', keys: ['v', 'n'], review: [...HOME_ROW, 'e', 'i', 'o', 'r', 'u', 't'], target: 20 },
  { id: 'en-b-cm', block: 3, title: { es: 'C y M', en: 'C and M' }, type: 'drill', keys: ['c', 'm'], review: [...HOME_ROW, 'e', 'i', 'o', 'v', 'n'], target: 20 },
  { id: 'en-b-xz', block: 3, title: { es: 'X, Z y B', en: 'X, Z and B' }, type: 'drill', keys: ['x', 'z', 'b'], review: [...HOME_ROW, 'e', 'i', 'o', 'c', 'm', 'n'], target: 22 },
  {
    id: 'en-b-words', block: 3, title: { es: 'Todas las letras', en: 'Every letter' }, type: 'words', target: 26,
    words: ['number', 'become', 'except', 'zebra', 'machine', 'vacuum', 'between', 'company', 'example', 'combine', 'vertical', 'climb', 'nozzle', 'jacket', 'mixture', 'convex', 'blanket', 'movement', 'quickly', 'objective'],
  },

  // Block 4 — rhythm on the most frequent English patterns
  {
    id: 'en-w-common', block: 4, title: { es: 'Palabras frecuentes', en: 'Common words' }, subtitle: { es: 'las 40 más usadas', en: 'the 40 most used' }, type: 'words', target: 26,
    words: ['the', 'be', 'to', 'of', 'and', 'in', 'that', 'have', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up'],
  },
  {
    id: 'en-w-clusters', block: 4, title: { es: 'Combinaciones frecuentes', en: 'Common letter clusters' }, subtitle: { es: 'th, ch, ing, ion…', en: 'th, ch, ing, ion…' }, type: 'words', target: 26,
    words: ['th', 'he', 'in', 'er', 'an', 're', 'nd', 'on', 'en', 'at', 'ou', 'ed', 'ha', 'ing', 'ion', 'tio', 'ent', 'ch', 'sh', 'gh', 'wh', 'ck', 'qu', 'ght', 'tion', 'ough', 'ness', 'ment'],
  },
  { id: 'en-w-text', block: 4, title: { es: 'Primer texto seguido', en: 'First running text' }, type: 'text', target: 28,
    text: 'the quiet morning light came through the window and the whole house began to wake up. she thought about the letter on the table and about the long walk that would follow.' },

  // Block 5 — capitals and punctuation
  { id: 'en-p-shift', block: 5, title: { es: 'Mayúsculas', en: 'Capitals' }, subtitle: { es: 'Shift con la mano contraria', en: 'Shift with the opposite hand' }, type: 'words', target: 24,
    words: ['London', 'Sarah', 'Monday', 'April', 'James', 'Oxford', 'Boston', 'Emily', 'Wales', 'Peter', 'Nairobi', 'Zurich', 'Quebec', 'Victoria', 'Kingston', 'Yorkshire'] },
  { id: 'en-p-comma', block: 5, title: { es: 'Coma, punto y guion', en: 'Comma, full stop and hyphen' }, type: 'drill', keys: [',', '.', '-'], review: ['a', 's', 'd', 'f', 'j', 'k', 'l', 'e', 'n', 'o', 'r'], target: 24 },
  { id: 'en-p-apostrophe', block: 5, title: { es: 'Apóstrofos y comillas', en: 'Apostrophes and quotes' }, subtitle: { es: "la tecla '", en: "the ' key" }, type: 'text', target: 26,
    text: "it's late and I'm tired, but we can't stop now. don't worry, she said, they'll wait for us. \"we're almost there,\" he answered, \"it won't take long.\"" },
  { id: 'en-p-mixed', block: 5, title: { es: 'Puntuación mixta', en: 'Mixed punctuation' }, type: 'text', target: 28,
    text: 'The list is short: bread, milk, eggs and coffee. If you arrive early, call me; if not, I will wait. "It is never too late," she said, "if the news is good."' },

  // Block 6 — numbers and symbols
  { id: 'en-n-home', block: 6, title: { es: 'Números 4 5 6 7', en: 'Digits 4 5 6 7' }, type: 'drill', keys: ['4', '5', '6', '7'], review: ['f', 'j', 'd', 'k'], target: 18 },
  { id: 'en-n-outer', block: 6, title: { es: 'Números 3 8 2 9 1 0', en: 'Digits 3 8 2 9 1 0' }, type: 'drill', keys: ['3', '8', '2', '9', '1', '0'], review: ['4', '5', '6', '7'], target: 18 },
  { id: 'en-n-mixed', block: 6, title: { es: 'Cifras y fechas', en: 'Figures and dates' }, type: 'text', target: 24,
    text: 'On 12 October 1492 three ships set sail. In 2024 the figure grew by 15.4% to 8,750 units, compared with 6,320 the year before.' },
  { id: 'en-s-symbols', block: 6, title: { es: 'Símbolos frecuentes', en: 'Common symbols' }, type: 'drill', keys: ['@', '/', '(', ')', '-', '_', '+'], review: ['a', 'e', 'i', 'o', 'u', 's', 'n'], target: 20 },
  { id: 'en-s-code', block: 6, title: { es: 'Correo y direcciones', en: 'Email and addresses' }, type: 'text', target: 24,
    text: 'Write to support@example.com or go to https://www.example.com/help (section 4.2). The order code is AB-2024_17/C.' },

  // Block 7 — real texts
  { id: 'en-x-alice', block: 7, title: { es: 'Alice in Wonderland', en: 'Alice in Wonderland' }, type: 'text', target: 32,
    text: 'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading.' },
  { id: 'en-x-moby', block: 7, title: { es: 'Moby-Dick', en: 'Moby-Dick' }, type: 'text', target: 32,
    text: 'Call me Ishmael. Some years ago, never mind how long precisely, having little or no money in my purse, I thought I would sail about a little and see the watery part of the world.' },
  { id: 'en-x-pangram', block: 7, title: { es: 'Prueba final', en: 'Final test' }, subtitle: { es: 'todo el teclado', en: 'the whole keyboard' }, type: 'text', target: 34,
    text: 'The quick brown fox jumps over the lazy dog while five wizards vex the judge; pack my box with 6 dozen liquor jugs. Ready? Only 3 lines to go!' },
];

export const BLOCKS_EN = [
  {
    id: 1,
    title: { es: 'Fila guía', en: 'Home row' },
    description: {
      es: 'Las ocho teclas base (A S D F · J K L ;) y el estiramiento del índice.',
      en: 'The eight base keys (A S D F · J K L ;) and the index finger stretch.',
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
    title: { es: 'Ritmo en inglés', en: 'English rhythm' },
    description: {
      es: 'Las palabras y combinaciones de letras más frecuentes.',
      en: 'The most frequent words and letter clusters.',
    },
  },
  {
    id: 5,
    title: { es: 'Mayúsculas y puntuación', en: 'Capitals and punctuation' },
    description: {
      es: 'Shift con la mano contraria, apóstrofos y signos.',
      en: 'Shift with the opposite hand, apostrophes and marks.',
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
