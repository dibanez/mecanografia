# Mecanografía

Aplicación web para aprender mecanografía en teclado español (ISO) o inglés
(US ANSI y UK ISO), pensada para publicarse en GitHub Pages. No necesita
compilación ni dependencias: es HTML, CSS y JavaScript con módulos ES nativos.

## Qué incluye

- **Tutorial de iniciación**: postura, fila guía, reparto de dedos con un teclado
  coloreado e interactivo, uso del pulgar, Shift con la mano contraria, rutina de
  práctica y errores frecuentes. Se adapta a la distribución elegida.
- **Tres distribuciones**: español (ISO), inglés US (ANSI) e inglés UK (ISO). El
  selector está en la barra superior y la elección se recuerda.
- **31 lecciones progresivas por idioma**, repartidas en 7 bloques: fila guía →
  fila superior → fila inferior → tildes y diéresis (o ritmo en inglés: palabras y
  combinaciones frecuentes) → mayúsculas y puntuación → números y símbolos →
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
- **Donaciones**: enlace a PayPal.me en el pie, cambiable en `index.html`
  (`.footer__donate`). Al ser un enlace saliente funciona en GitHub Pages sin
  servidor ni pasarela.

## Cómo se usa

Escribe el texto que aparece en pantalla sin mirar el teclado. Atajos:

| Tecla | Acción |
| --- | --- |
| `Esc` | reiniciar la lección |
| `Retroceso` | corregir el último carácter |

El teclado en pantalla dibuja la distribución seleccionada, no la del sistema
operativo: elige la misma que tengas configurada para que las teclas coincidan.

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

## Analítica

El contenedor de Google Tag Manager `GTM-M7VBLNGF` se carga desde `index.html`
(script en el `head` y `noscript` al principio del `body`). Como el enrutado va
por hash y no recarga la página, `showView()` empuja un evento a `dataLayer`:

```js
{ event: 'view_change', view: 'lessons', layout: 'es', path: '#/lecciones' }
```

En GTM, dispara las vistas de página virtuales con un activador de tipo
*Evento personalizado* con nombre `view_change` (o con *History Change*, que
también salta al cambiar el hash).

Si añades cookies de analítica y el sitio se dirige a la UE, hará falta un aviso
de consentimiento; GA4 admite el modo de consentimiento desde el propio GTM.

## Estructura

```
index.html                  vistas: tutorial, lecciones, práctica, libre, progreso
css/styles.css              estilos y temas claro/oscuro
js/app.js                   enrutado, bucle de práctica, tutorial y progreso
js/engine.js                motor de escritura y cálculo de ppm/precisión
js/keyboard.js              teclado en pantalla y guía de manos
js/storage.js               persistencia en localStorage
js/data/lessons.js          cursos, búsquedas y generador de ejercicios
js/data/lessons-es.js       temario del teclado español
js/data/lessons-en.js       temario del teclado inglés
js/data/keyboard-layout.js  distribuciones ES/US/UK y asignación de dedos
```

## Personalizar las lecciones

El temario vive en `js/data/lessons-es.js` y `js/data/lessons-en.js`; cada
distribución apunta a uno de los dos cursos mediante el campo `course` de
`js/data/keyboard-layout.js`. Cada lección es un objeto con un `type`:

- `drill`: grupos aleatorios a partir de `keys` (teclas nuevas) y `review` (repaso).
- `words`: se sortean palabras de la lista `words`.
- `text`: se escribe el `text` tal cual.

Añadir una lección es añadir un objeto al array del curso con su `block` y su
`target` de ppm. Los identificadores tienen que ser únicos entre cursos (los del
temario inglés van prefijados con `en-`), porque el progreso se guarda por id.

## Añadir una distribución

En `js/data/keyboard-layout.js`, añade una entrada a `LAYOUTS` con sus filas de
teclas (`base`, `shift`, `altgr`, `finger`, `home`) y el `course` cuyo temario le
corresponde. Los bloques de letras `LETTERS_TOP`, `LETTERS_HOME` y
`LETTERS_BOTTOM` se reutilizan en cualquier distribución QWERTY.
