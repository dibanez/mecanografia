# Mecanografía

Aplicación web para aprender mecanografía en teclado español (ISO) o inglés
(US ANSI y UK ISO), pensada para publicarse en GitHub Pages. No necesita
compilación ni dependencias: es HTML, CSS y JavaScript con módulos ES nativos.

## Qué incluye

- **Tutorial de iniciación**: postura, fila guía, reparto de dedos con un teclado
  coloreado e interactivo, uso del pulgar, Shift con la mano contraria, rutina de
  práctica y errores frecuentes. Se adapta a la distribución elegida.
- **Configurador (⚙ en la barra superior)**: idioma de la interfaz, distribución
  del teclado y tipo de teclado físico, con una vista previa en vivo. Todo se
  recuerda en `localStorage`.
- **Interfaz en español e inglés**, independiente de la distribución: puedes
  practicar el teclado español con la interfaz en inglés o al revés. La primera
  visita usa el idioma del navegador.
- **Cuatro distribuciones**: español (ISO), inglés US (ANSI), inglés UK (ISO) e
  inglés UK de Apple. La distribución decide qué carácter da cada tecla y con
  ella el temario. La británica de Apple no es la de Windows: la `@` está en
  ⇧2 y las comillas en ⇧', al revés que en el PC, y la `#` va en ⌥3.
- **Once tipos de teclado físico**: completo con numérico, TKL, 75 %, 60 %,
  portátil, portátil con numérico, Mac (Magic Keyboard), Mac con numérico,
  partido clásico (Sculpt, Freestyle), partido columnar (ErgoDox, Moonlander,
  Corne) y ortolineal (Planck, Preonic). El tipo solo cambia el dibujo y, en los
  columnares y los Mac, qué dedo toca cada tecla: todos mandan los mismos
  códigos de tecla, así que la distribución no varía. En los teclados donde las
  cifras viven en una capa, el entrenador ilumina la tecla de capa.
- En los tipos **Mac** las teclas llevan las serigrafías de Apple (⌘ command,
  ⌥ option, ⌃ control, ⇪, ⇥, ↩, ⌫, fn) y el tercer nivel se pulsa con ⌥ option
  en vez de AltGr: macOS manda `AltRight` para option, así que el resaltado es
  el mismo. Al elegir un tipo Mac, si la distribución activa tiene variante
  Apple los ajustes lo avisan y sugieren cambiarse (campo `appleVariant`).
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
- **Práctica libre** con cualquier texto propio y **tema claro/oscuro**. El
  teclado en pantalla y la guía de manos se pueden ocultar desde los ajustes.
- **Compartir**: el proyecto desde el pie, el resultado de cada lección desde el
  diálogo de fin y el progreso global desde su pantalla. Usa la hoja nativa del
  sistema (`navigator.share`) cuando existe y, si no, un diálogo con WhatsApp,
  Telegram, X, Bluesky, Mastodon, Facebook, LinkedIn, correo y copiar al
  portapapeles.
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
El tipo de teclado es solo cosmético salvo en los partidos columnares, donde
cambia el reparto de dedos; puedes elegir el que más se parezca al tuyo.

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

## Vista previa del enlace

Las etiquetas Open Graph de `index.html` apuntan a `https://dibanez.github.io/mecanografia/`
y a `og.png` con **URL absoluta**, que es lo que exigen las redes sociales: si
mueves el sitio a otro dominio hay que cambiarlas.

La tarjeta `og.png` (1200 × 630) se genera abriendo `og.html` a ese tamaño y
guardando la captura en la raíz del repositorio.

## Analítica

El contenedor de Google Tag Manager `GTM-M7VBLNGF` se carga desde `index.html`
(script en el `head` y `noscript` al principio del `body`). Como el enrutado va
por hash y no recarga la página, `showView()` empuja un evento a `dataLayer`:

```js
{
  event: 'view_change',
  view: 'lessons',
  layout: 'es',
  keyboard_form: 'sixty',
  language: 'es',
  path: '#/lecciones',
}
```

En GTM, dispara las vistas de página virtuales con un activador de tipo
*Evento personalizado* con nombre `view_change` (o con *History Change*, que
también salta al cambiar el hash).

### Consentimiento

El `head` declara el **modo de consentimiento v2** con todo denegado antes de
cargar GTM, así que en la primera visita no se guarda ninguna cookie de
analítica. `js/consent.js` enseña el aviso, recuerda la respuesta en
`localStorage` (`mecanografia:consent`) y envía `consent update` a `dataLayer`;
el enlace «Preferencias de cookies» del pie reabre el aviso para poder cambiar
de opinión.

Para que GA4 lo respete, marca sus etiquetas como que requieren
`analytics_storage` (es lo que hace el modo de consentimiento por defecto) y no
las dispares con activadores que ignoren el estado del consentimiento.

## Estructura

```
index.html                  vistas: tutorial, lecciones, práctica, libre, progreso
css/styles.css              estilos y temas claro/oscuro
js/app.js                   enrutado, bucle de práctica, tutorial y progreso
js/engine.js                motor de escritura y cálculo de ppm/precisión
js/keyboard.js              teclado en pantalla y guía de manos
js/i18n.js                  idioma de la interfaz y nombres de teclas
js/i18n-copy.js             textos de la página en español e inglés
js/storage.js               persistencia en localStorage
js/consent.js               aviso de cookies y modo de consentimiento
js/share.js                 compartir en redes sociales
og.html / og.png            tarjeta de vista previa del enlace
js/data/lessons.js          cursos, búsquedas y generador de ejercicios
js/data/lessons-es.js       temario del teclado español
js/data/lessons-en.js       temario del teclado inglés
js/data/keyboard-layout.js  distribuciones ES/US/UK/UK-Mac: qué carácter da cada tecla
js/data/keyboard-forms.js   formas físicas: sobremesa, portátil, Mac, partidos, ortolineal
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

El mapa lógico y la forma física están separados a propósito, porque un teclado
partido manda los mismos `event.code` que uno normal.

En `js/data/keyboard-layout.js`, añade una entrada a `LAYOUTS` con su objeto
`keys` (por código de tecla: `base`, `shift`, `altgr`, `dead`), su `physical`
(`iso` o `ansi`) y el `course` cuyo temario le corresponde. El bloque `LETTERS`
se reutiliza en cualquier distribución QWERTY, y la asignación de dedos y la fila
guía salen de `FINGER_BY_CODE` y `HOME_CODES`, comunes a todas.

## Añadir un tipo de teclado

En `js/data/keyboard-forms.js`, añade una entrada a `FORMS` con una función
`sections(layout)` que devuelva las secciones a dibujar. Cada sección se pinta
por filas (`orientation: 'rows'`) o por columnas con desplazamiento propio
(`orientation: 'columns'`), y puede llevar un clúster de pulgares. Una celda de
una fila puede ser una tecla, un hueco (`gap`) o un par de teclas a media altura
(`stack`, las flechas ↑ y ↓ de los portátiles), y admite `label` propio para las
serigrafías de cada fabricante. Marca la forma
con `split: true` para separar las mitades y con `layered: true` cuando falten
teclas: los caracteres que no estén dibujados iluminan la tecla con
`role: 'layer'`. Añade también los textos `form.<id>` y `form.<id>.note` a
`js/i18n.js`.

## Añadir un idioma de interfaz

Añade el idioma a `LANGUAGES` en `js/i18n.js`, traduce los diccionarios de
`js/i18n.js` (cromo y nombres de teclas) y `js/i18n-copy.js` (textos de la
página), y añade la clave a los títulos `{ es, en }` de los temarios. El marcado
se traduce solo mediante los atributos `data-i18n`, `data-i18n-html` y
`data-i18n-attr` de `index.html`.
