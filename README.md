# Mecanografía

Aplicación web para aprender mecanografía en teclado español (ISO), pensada para
publicarse en GitHub Pages. No necesita compilación ni dependencias: es HTML, CSS
y JavaScript con módulos ES nativos.

## Qué incluye

- **31 lecciones progresivas** repartidas en 7 bloques: fila guía → fila superior →
  fila inferior → tildes y diéresis → mayúsculas y puntuación → números y símbolos →
  textos reales.
- **Teclado en pantalla** que resalta la siguiente tecla, el modificador necesario
  (Shift de la mano contraria, AltGr) y **guía de manos** con un color por dedo.
- **Teclas muertas**: las tildes (´) y la diéresis (¨) se enseñan en dos pasos —
  primero el acento, después la vocal.
- **Modo estricto**: el cursor no avanza hasta que la tecla es correcta, que es la
  forma de que el dedo aprenda la posición.
- **Estadísticas en vivo**: ppm netas, precisión, errores y tiempo.
- **Progreso local**: mejor marca y estrellas por lección, historial de sesiones,
  gráfica de velocidad y las teclas que más se resisten. Todo en `localStorage`,
  sin servidor ni cuentas.
- **Práctica libre** con cualquier texto propio y **tema claro/oscuro**.

## Cómo se usa

Escribe el texto que aparece en pantalla sin mirar el teclado. Atajos:

| Tecla | Acción |
| --- | --- |
| `Esc` | reiniciar la lección |
| `Retroceso` | corregir el último carácter |

Las estrellas se otorgan según la precisión y el objetivo de ppm de cada lección:
3 estrellas con ≥ 97 % de precisión alcanzando el objetivo, 2 con ≥ 92 %.

## Desarrollo local

Al usar módulos ES hace falta servirlo por HTTP (abrir el `index.html` con
`file://` no funciona):

```sh
python3 -m http.server 8000
# http://localhost:8000
```

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub.
2. En **Settings → Pages**, elige **GitHub Actions** como origen. El workflow de
   `.github/workflows/pages.yml` publica la raíz del repositorio en cada push a `main`.

Como alternativa, en **Settings → Pages** puedes elegir *Deploy from a branch*
(`main`, carpeta `/root`): el archivo `.nojekyll` ya está incluido para que Jekyll
no interfiera.

## Estructura

```
index.html                  vistas: lecciones, práctica, práctica libre, progreso
css/styles.css              estilos y temas claro/oscuro
js/app.js                   enrutado, bucle de práctica y pantallas de progreso
js/engine.js                motor de escritura y cálculo de ppm/precisión
js/keyboard.js              teclado en pantalla y guía de manos
js/storage.js               persistencia en localStorage
js/data/lessons.js          plan de lecciones y generador de ejercicios
js/data/keyboard-layout.js  distribución ISO española y asignación de dedos
```

## Personalizar las lecciones

Todo el temario vive en `js/data/lessons.js`. Cada lección es un objeto con un
`type`:

- `drill`: grupos aleatorios a partir de `keys` (teclas nuevas) y `review` (repaso).
- `words`: se sortean palabras de la lista `words`.
- `text`: se escribe el `text` tal cual.

Añadir una lección es añadir un objeto al array `LESSONS` con su `block` y su
`target` de ppm.
