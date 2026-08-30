/**
 * Lesson plan for the Spanish (ISO) keyboard, ordered from the home row
 * outwards. See lessons.js for the lesson types.
 */

const HOME_ROW = ['a', 's', 'd', 'f', 'j', 'k', 'l', 'ñ'];

export const LESSONS_ES = [
  // Block 1 — home row
  { id: 'h-fj', block: 1, title: 'F y J', subtitle: 'las teclas guía', type: 'drill', keys: ['f', 'j'], review: [], target: 15 },
  { id: 'h-dk', block: 1, title: 'D y K', type: 'drill', keys: ['d', 'k'], review: ['f', 'j'], target: 15 },
  { id: 'h-sl', block: 1, title: 'S y L', type: 'drill', keys: ['s', 'l'], review: ['f', 'j', 'd', 'k'], target: 16 },
  { id: 'h-an', block: 1, title: 'A y Ñ', type: 'drill', keys: ['a', 'ñ'], review: ['f', 'j', 'd', 'k', 's', 'l'], target: 16 },
  { id: 'h-gh', block: 1, title: 'G y H', subtitle: 'estiramiento del índice', type: 'drill', keys: ['g', 'h'], review: HOME_ROW, target: 18 },
  {
    id: 'h-words', block: 1, title: 'Palabras de la fila guía', type: 'words', target: 20,
    words: ['ala', 'sal', 'las', 'dad', 'gala', 'hada', 'jefa', 'lada', 'sala', 'falda', 'halda', 'ajad', 'dalas', 'salda', 'haga', 'lag', 'kaki', 'flash', 'gafas', 'gasas'],
  },

  // Block 2 — top row
  { id: 't-ei', block: 2, title: 'E e I', type: 'drill', keys: ['e', 'i'], review: HOME_ROW, target: 18 },
  { id: 't-ru', block: 2, title: 'R y U', type: 'drill', keys: ['r', 'u'], review: [...HOME_ROW, 'e', 'i'], target: 18 },
  { id: 't-ty', block: 2, title: 'T e Y', type: 'drill', keys: ['t', 'y'], review: [...HOME_ROW, 'e', 'i', 'r', 'u'], target: 20 },
  { id: 't-wo', block: 2, title: 'W y O', type: 'drill', keys: ['w', 'o'], review: [...HOME_ROW, 'e', 'i', 'r', 'u', 't'], target: 20 },
  { id: 't-qp', block: 2, title: 'Q y P', type: 'drill', keys: ['q', 'p'], review: [...HOME_ROW, 'e', 'i', 'r', 'u', 't', 'o'], target: 20 },
  {
    id: 't-words', block: 2, title: 'Palabras con dos filas', type: 'words', target: 24,
    words: ['puerta', 'quiere', 'salida', 'trigo', 'realidad', 'poder', 'querella', 'higuera', 'ruta', 'tejado', 'juega', 'litera', 'partida', 'oreja', 'aquel', 'pareja', 'sortija', 'trapo', 'delirio', 'lagarto', 'guitarra', 'historia'],
  },

  // Block 3 — bottom row
  { id: 'b-vn', block: 3, title: 'V y N', type: 'drill', keys: ['v', 'n'], review: [...HOME_ROW, 'e', 'i', 'o', 'r', 'u', 't'], target: 20 },
  { id: 'b-cm', block: 3, title: 'C y M', type: 'drill', keys: ['c', 'm'], review: [...HOME_ROW, 'e', 'i', 'o', 'v', 'n'], target: 20 },
  { id: 'b-xz', block: 3, title: 'X, Z y B', type: 'drill', keys: ['x', 'z', 'b'], review: [...HOME_ROW, 'e', 'i', 'o', 'c', 'm', 'n'], target: 22 },
  {
    id: 'b-words', block: 3, title: 'Todas las letras', type: 'words', target: 26,
    words: ['ventana', 'cambio', 'zapato', 'exacto', 'nombre', 'bosque', 'muñeca', 'vecino', 'brazo', 'columna', 'campana', 'mezcla', 'cabeza', 'extremo', 'examen', 'banco', 'noche', 'invierno', 'cerveza', 'vaca'],
  },

  // Block 4 — accents and diaeresis
  { id: 'a-acute', block: 4, title: 'Tildes', subtitle: 'la tecla muerta ´', type: 'words', target: 24,
    words: ['café', 'árbol', 'música', 'rápido', 'canción', 'jamás', 'lápiz', 'túnel', 'después', 'según', 'décimo', 'próximo', 'atención', 'línea', 'último', 'periódico'] },
  { id: 'a-dieresis', block: 4, title: 'Diéresis y Ñ', type: 'words', target: 24,
    words: ['pingüino', 'vergüenza', 'lingüista', 'cigüeña', 'antigüedad', 'niño', 'año', 'sueño', 'mañana', 'pequeño', 'compañero', 'montaña', 'señal', 'muñeca'] },
  { id: 'a-text', block: 4, title: 'Texto acentuado', type: 'text', target: 28,
    text: 'el pingüino caminó despacio por la montaña helada. después del último día de invierno la cigüeña volvió a su nido y el compañero de siempre la esperaba allí' },

  // Block 5 — capitals and punctuation
  { id: 'p-shift', block: 5, title: 'Mayúsculas', subtitle: 'Shift con la mano contraria', type: 'words', target: 24,
    words: ['Madrid', 'Ana', 'Sevilla', 'Pedro', 'Bilbao', 'Lucía', 'Toledo', 'Javier', 'Granada', 'Olga', 'Nuria', 'Zamora', 'Cádiz', 'Huesca', 'Íñigo', 'Álvaro'] },
  { id: 'p-comma', block: 5, title: 'Coma, punto y guion', type: 'drill', keys: [',', '.', '-'], review: ['a', 's', 'd', 'f', 'j', 'k', 'l', 'e', 'n', 'o', 'r'], target: 24 },
  { id: 'p-quotes', block: 5, title: 'Interrogación y exclamación', type: 'text', target: 26,
    text: '¿Vienes esta tarde? Sí, claro. ¡Qué bien! ¿A qué hora quedamos? A las siete, ¿te parece? ¡Perfecto! ¿Traigo algo? No hace falta, ¡gracias!' },
  { id: 'p-mixed', block: 5, title: 'Puntuación mixta', type: 'text', target: 28,
    text: 'La lista es corta: pan, leche, huevos y café. Si llegas antes, avísame; si no, te espero. "Nunca es tarde", dijo, "si la dicha es buena".' },

  // Block 6 — numbers and symbols
  { id: 'n-home', block: 6, title: 'Números 4 5 6 7', type: 'drill', keys: ['4', '5', '6', '7'], review: ['f', 'j', 'd', 'k'], target: 18 },
  { id: 'n-outer', block: 6, title: 'Números 3 8 2 9 1 0', type: 'drill', keys: ['3', '8', '2', '9', '1', '0'], review: ['4', '5', '6', '7'], target: 18 },
  { id: 'n-mixed', block: 6, title: 'Cifras y fechas', type: 'text', target: 24,
    text: 'El 12 de octubre de 1492 zarparon 3 naves. En 2024 la cifra creció un 15,4 % hasta 8.750 unidades, frente a las 6.320 del año anterior.' },
  { id: 's-symbols', block: 6, title: 'Símbolos frecuentes', type: 'drill', keys: ['@', '/', '(', ')', '-', '_', '+'], review: ['a', 'e', 'i', 'o', 'u', 's', 'n'], target: 20 },
  { id: 's-code', block: 6, title: 'Correo y direcciones', type: 'text', target: 24,
    text: 'Escríbeme a soporte@ejemplo.es o entra en https://www.ejemplo.es/ayuda (sección 4.2). El código de pedido es AB-2024_17/C.' },

  // Block 7 — real texts
  { id: 'x-quijote', block: 7, title: 'El Quijote', type: 'text', target: 32,
    text: 'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.' },
  { id: 'x-soledad', block: 7, title: 'Cien años de soledad', type: 'text', target: 32,
    text: 'Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo.' },
  { id: 'x-panagram', block: 7, title: 'Prueba final', subtitle: 'todo el teclado', type: 'text', target: 34,
    text: 'El veloz murciélago hindú comía feliz cardillo y kiwi; la cigüeña tocaba el saxofón detrás del palenque de paja. ¿Preparado? ¡Adelante, que quedan 3 líneas!' },
];

export const BLOCKS_ES = [
  { id: 1, title: 'Fila guía', description: 'Las ocho teclas base y el estiramiento del índice.' },
  { id: 2, title: 'Fila superior', description: 'De la fila guía hacia arriba, sin mirar el teclado.' },
  { id: 3, title: 'Fila inferior', description: 'Las últimas letras del alfabeto.' },
  { id: 4, title: 'Tildes y diéresis', description: 'Teclas muertas, acentos y la ñ en contexto.' },
  { id: 5, title: 'Mayúsculas y puntuación', description: 'Shift con la mano contraria, comas y signos.' },
  { id: 6, title: 'Números y símbolos', description: 'La fila superior de cifras y los símbolos del día a día.' },
  { id: 7, title: 'Textos reales', description: 'Párrafos completos para consolidar la velocidad.' },
];
