# Mecanografía

Curso gratuito para aprender a escribir sin mirar el teclado, en español o en
inglés. Empieza por un tutorial que explica postura, fila guía y qué teclas
toca cada dedo sobre el dibujo de tu propio teclado, y sigue con 31 lecciones
progresivas que van de la fila guía a los textos reales. Todo pasa en el
navegador: el progreso se guarda en tu equipo, no hay cuentas ni anuncios.

Se adapta al teclado que tienes delante —cuatro distribuciones y once tipos
físicos—, y esa elección gobierna el temario: en un teclado inglés no se
enseñan lecciones llenas de ñ y tildes que ese teclado no puede escribir. Está
hecho en HTML, CSS y módulos ES nativos, sin compilación ni dependencias, y se
publica en GitHub Pages con una página por idioma.

## Qué incluye

- **Tutorial de iniciación**: postura, fila guía, reparto de dedos con un teclado
  coloreado e interactivo, uso del pulgar, Shift con la mano contraria, rutina de
  práctica y errores frecuentes. Se adapta a la distribución elegida.
- **Bienvenida en la primera visita**: un recorrido de tres pasos que cuenta qué
  es esto, pregunta qué teclado tienes —distribución y tipo se eligen ahí mismo,
  con vista previa, o se **averiguan pulsando teclas**— y explica qué enseña el
  tutorial antes de llevarte a él.
  Aparece una sola vez: la respuesta se guarda en `localStorage`
  (`settings.onboarded`), quien ya tenía progreso no lo ve, y se puede cerrar
  con <kbd>Esc</kbd> o saltar a las lecciones. Espera su turno detrás del aviso
  de cookies: se abre en cuanto se responde, y si para entonces ya se está
  tecleando una lección no interrumpe — vuelve a intentarlo en la siguiente
  visita.
- **Configurador (⚙ en la barra superior)**: idioma de la interfaz, distribución
  del teclado —a mano o con el detector— y tipo de teclado físico, con una vista
  previa en vivo. Todo se recuerda en `localStorage`.
- **Una página por idioma**: español en la raíz e inglés en `/en/`, cada una con
  su `<title>`, su descripción, su Open Graph y su `hreflang`, y las dos
  pregeneradas para que un buscador las lea sin ejecutar JavaScript. El idioma
  es independiente de la distribución: puedes practicar el teclado español con
  la interfaz en inglés o al revés.
- **Detector de distribución**: el botón «Averiguarlo pulsando teclas», en la
  bienvenida y en los ajustes, señala una tecla en el dibujo, mira qué carácter
  manda el navegador al pulsarla y descarta las distribuciones que no encajan. La tecla a la derecha
  de la <kbd>L</kbd> ya separa la española (`ñ`) de las tres inglesas (`;`); dos
  pulsaciones más distinguen US, UK y UK de Apple. Si el teclado no es ninguno de
  los cuatro, lo dice en vez de elegir por elegir.
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
# http://localhost:8000        español
# http://localhost:8000/en/    inglés
```

Después de tocar el marcado de `index.html` o los textos de `js/i18n-copy.js`,
regenera las páginas; y después de tocar el temario o una distribución,
comprueba que los ejercicios se pueden teclear:

```sh
node tools/build-pages.mjs
node tools/check-exercises.mjs
node --test
```

`node --test` cubre `js/engine.js`: el modo estricto, el retroceso, las ppm
netas y brutas, la precisión, las teclas que más fallas y las estrellas. No
necesita instalar nada, es el ejecutor de pruebas de Node.

No hace falta instalar nada: es Node pelado, sin dependencias. El script llena
los elementos con `data-i18n` en los dos idiomas, escribe la cabecera entre los
marcadores `i18n:head`, genera `en/index.html` con las rutas de `css/` y `js/`
ajustadas, y actualiza `sitemap.xml` y `robots.txt`. Es idempotente, así que
correrlo dos veces no cambia nada. El workflow de Pages lo ejecuta también al
desplegar, por si se te olvida.

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub.
2. En **Settings → Pages**, elige **GitHub Actions** como origen. El workflow de
   `.github/workflows/pages.yml` publica la raíz del repositorio en cada push a `main`.

Como alternativa, en **Settings → Pages** puedes elegir *Deploy from a branch*
(`main`, carpeta `/root`): el archivo `.nojekyll` ya está incluido para que Jekyll
no interfiera.

## Idiomas y buscadores

Cada idioma es una URL propia, que es lo que necesitan tanto los buscadores como
quien comparte un enlace:

| URL | Idioma |
| --- | --- |
| `https://dibanez.github.io/mecanografia/` | español (canónica y `x-default`) |
| `https://dibanez.github.io/mecanografia/en/` | inglés |

Las dos se enlazan entre sí con `hreflang` recíprocos, declaran su `canonical` y
aparecen en `sitemap.xml`. Elegir idioma en los ajustes **navega** a la otra
página en lugar de traducir en caliente, para que la dirección nunca mienta
sobre lo que se está viendo, y el enlace de compartir sale ya con el idioma en
uso. Las rutas también están traducidas (`#/lecciones` ↔ `#/lessons`), y cada
página entiende las de todos los idiomas, así que un enlace compartido sigue
abriendo donde debe aunque venga de la otra. El progreso se guarda por origen, así que sobrevive al cambio de idioma.

Quien llega a la raíz con el navegador en otro idioma publicado **no** es
redirigido: se le ofrece un enlace discreto en la barra superior, escrito en ese
idioma. Redirigir por `Accept-Language` es justo lo que Google desaconseja, y
además le impediría indexar la versión española. La única redirección que
existe va de la raíz a `/en/`, y solo si el visitante eligió inglés antes; nunca
en sentido contrario, así que no hay bucles posibles.

## Vista previa del enlace

Cada idioma tiene su propia tarjeta: `og.png` en la raíz y `en/og.png`, y cada
página apunta a la suya. La española lleva la Ñ en la fila guía y la inglesa el
`;`, que es la tecla que ocupa ese sitio en su teclado.

Las etiquetas Open Graph usan **URL absoluta**, que es lo que exigen las redes
sociales. La dirección del sitio está en la constante `SITE` de
`tools/build-pages.mjs`: si mueves el sitio a otro dominio, cámbiala ahí y
regenera.

Los textos de la tarjeta salen del diccionario (claves `og.*`), así que
`node tools/build-pages.mjs` escribe `og.html` y `en/og.html`. Las imágenes se
regeneran a mano: abre cada una a 1200 × 630 y guarda la captura junto a ella
como `og.png`.

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

La bienvenida de la primera visita cierra con su propio evento, que dice por
dónde se salió (`tutorial`, `lessons` o `dismissed` si se cerró con
<kbd>Esc</kbd>) y en qué paso:

```js
{
  event: 'onboarding_done',
  ending: 'tutorial',
  step: 3,
  layout: 'es',
  keyboard_form: 'sixty',
  language: 'es',
}
```

### Consentimiento

El `head` declara el **modo de consentimiento v2** con todo denegado antes de
cargar GTM, así que en la primera visita no se guarda ninguna cookie de
analítica. `js/consent.js` enseña el aviso, recuerda la respuesta en
`localStorage` (`mecanografia:consent`) y envía `consent update` a `dataLayer`;
el enlace «Preferencias de cookies» del pie reabre el aviso para poder cambiar
de opinión.

Al responder, el módulo exporta el estado (`consentAnswered()`) y emite un
evento `consent:answered` en el documento. De ahí cuelga la bienvenida de la
primera visita: el aviso es lo primero que hay que poder leer, así que ningún
diálogo se pone por encima hasta que está contestado.

Para que GA4 lo respete, marca sus etiquetas como que requieren
`analytics_storage` (es lo que hace el modo de consentimiento por defecto) y no
las dispares con activadores que ignoren el estado del consentimiento.

## Estructura

```
index.html                  marcado y página en español (generada)
en/index.html               página en inglés (generada)
sitemap.xml / robots.txt    indexación (generados)
tools/build-pages.mjs       genera una página por idioma, sin dependencias
tools/check-exercises.mjs   comprueba que todo ejercicio se puede teclear
test/engine.test.mjs        pruebas del motor de escritura (node --test)
css/styles.css              estilos y temas claro/oscuro
js/app.js                   enrutado, bucle de práctica, tutorial y progreso
js/engine.js                motor de escritura y cálculo de ppm/precisión
js/keyboard.js              teclado en pantalla y guía de manos
js/i18n.js                  idioma de la interfaz y nombres de teclas
js/i18n-copy.js             textos de la página en español e inglés
js/storage.js               persistencia en localStorage
js/consent.js               aviso de cookies y modo de consentimiento
js/share.js                 compartir en redes sociales
og.html / og.png            tarjeta de vista previa, una por idioma (generadas)
js/data/lessons.js          cursos, búsquedas y generador de ejercicios
js/data/lessons-es.js       temario del teclado español
js/data/lessons-en.js       temario del teclado inglés
js/data/keyboard-layout.js  distribuciones ES/US/UK/UK-Mac: qué carácter da cada tecla
js/data/keyboard-forms.js   formas físicas: sobremesa, portátil, Mac, partidos, ortolineal
```

## Qué temario toca cada teclado

El temario tiene que cumplir dos cosas, y en este orden:

1. **Poder teclearse.** El curso español está lleno de ñ, tildes y `¿¡`, que un
   teclado US o UK no tiene: ofrecerlo ahí sería un callejón sin salida, porque
   el modo estricto no deja avanzar hasta acertar la tecla.
2. **Seguir el idioma de la página**, cuando el teclado da para los dos.

De ahí sale esta tabla, que es lo que hace `preferredCourse()` en `js/app.js`
apoyándose en `courseFitsLayout()`:

| Teclado | Página en español | Página en inglés |
| --- | --- | --- |
| Español (ISO) | temario español | temario inglés |
| English US / UK / UK-Mac | temario inglés | temario inglés |

El teclado manda: en un US no aparece nunca una lección con ñ, da igual el
idioma de la interfaz. En un teclado español, en cambio, caben los dos
temarios, así que decide la página — y el temario inglés se puede practicar
perfectamente en un teclado español.

Un enlace a una lección concreta (`#/practica/a-dieresis`) solo cambia de
teclado si el que hay puesto no puede escribirla; si puede, se respeta el que
eligió el visitante. Lo mismo vale para la práctica libre: si pegas un texto
con teclas que tu distribución no tiene, se dice cuáles son en vez de arrancar
un ejercicio imposible, y el «Texto de ejemplo» sale en el idioma del temario,
no en el de la interfaz.

`node tools/check-exercises.mjs` recorre las ocho combinaciones de teclado e
idioma, genera 60 veces cada lección (los ejercicios son aleatorios) y falla si
alguna pide una tecla que no está. El workflow de Pages lo ejecuta antes de
desplegar.

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
página, incluidas las claves `meta.*` del `<title>` y la descripción), y añade
la clave a los títulos `{ es, en }` de los temarios. El marcado se traduce solo
mediante los atributos `data-i18n`, `data-i18n-html` y `data-i18n-attr` de
`index.html`. Al ejecutar `node tools/build-pages.mjs` aparecen su carpeta
`/<idioma>/`, sus `hreflang` y su entrada en el sitemap sin tocar nada más.
