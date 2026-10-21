# Contexto del proyecto — Tríptico «Diseñá lo que viene»

Documento de traspaso. Describe qué hay hecho, con qué criterios, cómo se verifica y qué falta.
Última actualización: marzo 2026 · estado: **entregable limpio, en revisión visual**.

---

## 1. Qué es

Tríptico editorial de **6 paneles** para una campaña de comunicación institucional sobre el
Diseño como disciplina que produce conocimiento, profesión y campo de formación.

Se implementa como **una sola página web** (`index.html`) que se ve como mesa de trabajo en
pantalla y se exporta a PDF de **2 páginas A4 apaisado** para imprimir a doble faz.

- Pieza **no oficial todavía**: hay textos marcados como pendientes de verificación (ver §9).
- Redacción en **español rioplatense**, tono institucional, segunda persona singular («usás»,
  «querés»). **No se inventan datos, cifras, citas, casos ni denominaciones institucionales.**

## 2. Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | 234 líneas. Toda la pieza: barra de pantalla + 2 hojas con 3 paneles cada una. |
| `styles.css` | 557 líneas. Sistema gráfico, geometría de pliegue y vista de impresión. |
| `app.js` | 11 líneas. Solo conecta el botón «Imprimir / Guardar PDF» con `window.print()`. |
| `fonts/` | Public Sans variable auto-alojada en 3 archivos `.woff2` (latin, latin-ext, itálica). |

Sin dependencias, sin build, sin servidor: **abrir `index.html` con doble clic funciona**
(incluida la carga de las fuentes; en `file://` no hay que agregar `crossorigin` ni precarga,
porque el navegador la bloquea y ensucia la consola).

## 3. Formato y geometría

La hoja **es** el área de corte: A4 apaisado **297 × 210 mm**, sin sangrado y sin marcas.

| Variable CSS | Valor | Qué significa |
|---|---|---|
| `--ancho-hoja` / `--alto-hoja` | `297mm` / `210mm` | Tamaño de `.hoja` y del `@page`. |
| `--aire` | `5mm` | Aire entre el texto y los bordes de la hoja (los 4 lados, los 6 paneles). |
| `--panel-a` | `100mm` | Panel 1 (portada) / panel 4. `left: 0` |
| `--panel-b` | `100mm` | Panel 3 (contratapa) / panel 5. `left: 100mm` |
| `--panel-c` | `97mm` | Panel 2 (solapa) y panel 6. `left: 200mm` |

De ahí salen las medidas de texto: **90 mm** en las columnas 1 y 2, **87 mm** en la 3, con
**10 mm** de medianil entre columnas contiguas y 5 mm contra los cantos.

Reglas que **no** hay que romper:

1. Los paneles miden exactamente la hoja (`top: 0; height: var(--alto-hoja)`). Si algún panel
   vuelve a sobresalir de la hoja, Chrome deja **los últimos 5 mm sin pintar** al exportar el PDF
   (el fondo se corta antes del canto). Ya pasó una vez; ver §8.
2. Todo elemento posicionado en milímetros (`top`, `bottom`, `right`) se mide **desde la caja del
   panel**, que es la hoja. Si se cambia la geometría de un panel hay que recalcular esos valores.
3. El contenido de cada panel termina como máximo en 201 mm del borde superior; el folio llega a
   205 mm (5 mm del canto inferior). No hay desbordes.

## 4. Tipografía y color

**Public Sans variable** (`font-weight: 300 900`), auto-alojada. En uso: pesos 400 a 900.
Escala declarada en `:root`: `--display 44pt`, `--lockup 36pt`, `--pregunta 27pt`,
`--titulo 21.5pt`, `--destacado 12pt`, `--entrada 10.5pt`, `--cuerpo 9.2pt`,
`--etiqueta 6.8pt`, `--folio 6.5pt`.

Paleta y roles (contrastes medidos sobre el fondo real):

| Variable | Hex | Uso | Contraste con tinta |
|---|---|---|---|
| `--ambar` | `#fbce00` | Acento de portada y formación; fondo de solapa y del bloque de cierre | 9.9:1 |
| `--verde` | `#93ab6a` | Acento y destacado del panel 04 | 5.88:1 |
| `--rosa` | `#d66fa9` | Acento del panel 05 | 4.77:1 |
| `--tinta` | `#1f2449` | Texto; fondo de contratapa y del bloque del panel 05 | 14.68:1 con papel |
| `--papel` | `#fffdf7` | Fondo de hoja y de los paneles claros | — |
| `--mesa` | `#e4e1d8` | Fondo de pantalla (nunca se imprime) | — |

Cada panel declara su acento con `--acento`, que alimenta la barrita de `.etiqueta` y `.titulo::after`.

## 5. Los seis paneles

Orden en el archivo (que es el orden de impresión): **hoja 1** = portada, contratapa, solapa;
**hoja 2** = paneles 04, 05, 06.

| Panel | Clase | Fondo / acento | Contenido |
|---|---|---|---|
| 01 Portada | `.panel--portada` | papel / ámbar | Etiqueta «Campaña de comunicación institucional», título «Diseñá lo que viene», bajada, disco decorativo, regla, espacio de logotipos. Folio `01 / 06`. |
| 03 Contratapa | `.panel--contratapa` | **tinta** / ámbar | Etiqueta, síntesis de la disciplina, reclamo «Diseñá lo que viene», disco, pie con QR + logotipos. Folio `03 / 06`. |
| 02 Solapa | `.panel--solapa` | **ámbar** / tinta | Pregunta dominante «¿Qué hay detrás de lo que ves?», dos párrafos, cierre, disco y bloque decorativos. Folio `02 / 06`. |
| 04 Conocimiento | `.panel--conocimiento` | papel / verde | Título, entrada, 5 pasos numerados, destacado verde, transición. Folio `04 / 06`. |
| 05 Sociedad | `.panel--sociedad` | papel / rosa | Título, entrada, 5 ámbitos, bloque tinta, dimensiones, transición. Folio `05 / 06`. |
| 06 Formación | `.panel--formacion` | papel / ámbar | Título, entrada, 6 competencias, nota de formación universitaria, bloque ámbar con pendiente. Folio `06 / 06`. |

**Orden real de lectura** (dato de diseño, ya no está escrito en la pieza):
portada → al abrir: panel 04 junto a la solapa → al desplegar: 04 · 05 · 06 → al dar vuelta: contratapa.
La solapa se lee junto al primer panel interior, por eso está escrita como pregunta dominante.

**Plegado**: envolvente (C-fold) con paneles **100 | 100 | 97 mm**; la solapa es la angosta y entra
por dentro. En pantalla, los paneles de la hoja 1 se ven en orden de plano (01 · 03 · 02), que es
el orden de imposición, no el de lectura.

## 6. Impresión y exportación

- Dos páginas de **297 × 210 mm**, una cara por página: 1.ª hoja 1, 2.ª hoja 2.
- Doble faz con **borde corto** (*flip on short edge*) para que las caras coincidan.
- Escala **100 %**, márgenes **0**, gráficos de fondo **activados**.
- Desde el navegador: Imprimir → Destino «Guardar como PDF» → papel A4 **apaisado** (el navegador
  ya recibe `@page { size: 297mm 210mm; margin: 0 }`, así que no hay que «ajustar a la página»).
- **Aviso**: la solapa (ámbar) y la contratapa (tinta) son fondos plenos que llegan al canto. Sin
  sangrado, una impresora doméstica que no imprima sin bordes va a dejar un filo blanco de 2–3 mm
  en esos paneles. En imprenta o con opción «sin bordes» sale limpio.

## 7. Qué se quitó del archivo (y por qué)

A pedido, la pieza quedó limpia para entregar:

- Marcas de corte y de pliegue impresas.
- Guías de sangrado, seguridad y zona de pliegue (eran solo pantalla).
- Cabeceras «Cara exterior / interior» y los rótulos de panel con medidas.
- La ficha técnica completa (formato, plegado, orden de lectura, impresión, pendientes).
- Los checkbox de la barra; queda solo el título y el botón de PDF.

**No reintroducir** nada de eso en `index.html` ni en `styles.css` salvo que se pida. Los datos de
producción (plegado, imposición, doble faz) viven en este documento.

## 8. Defecto conocido y su causa

Al convertir la hoja de 303 × 216 mm (con sangrado) a 297 × 210 mm, los paneles todavía
sobresalían 3 mm por lado. Chrome, al paginar el PDF, pintaba los fondos **hasta 205 mm** y dejaba
el último tramo en crema: el ámbar de la solapa y el azul de la contratapa se cortaban antes del
canto. Se corrigió haciendo que cada panel mida exactamente la hoja y compensando 3 mm todos los
elementos posicionados en milímetros.

Posiciones verificadas tras la corrección (en mm desde el borde superior de la hoja, salvo los
`bottom` 1 y 2, que van desde el canto inferior):

`etiqueta portada 6` · `título portada 19` · `disco portada 71` · `regla 91.4` · `bajada 143` ·
`institucional 198` · `disco contratapa 109` · `pie contratapa 201` · `disco solapa 181` ·
`bloque solapa 198` · `folios 205 en los 6 paneles`.

## 9. Contenido pendiente de verificación

Marcado en la pieza con `.pendiente` o con notas «espacio reservado»:

- **URL de la plataforma** de orientación educativa y el **código QR** a generar
  (panel 03, `.qr__marca` es un cuadrado rotulado «QR»; el texto dice «URL por confirmar»).
- **Logotipos oficiales**: portada (`.institucional`) y contratapa (`.logos`).
- **Denominaciones exactas** a confirmar: «Ministerio de Educación de la Nación», «Secretaría de
  Políticas Universitarias», «Red DISUR» (hoy dicen «a verificar»).
- Cualquier **dato numérico, cita o caso** que se quiera sumar: hoy no hay ninguno, deliberadamente.

## 10. Entorno y herramientas de verificación

El proyecto no depende de nada. Las herramientas para revisar viven **fuera del proyecto**, en
`/tmp/opencode/render/` (se pueden perder: son de trabajo, no parte del entregable).

- Playwright + Chromium headless instalados en `~/.cache/ms-playwright` (no hay Chrome del sistema).
- `pdfinfo` y `pdftoppm` (poppler) disponibles para inspeccionar el PDF.
- Scripts:
  - `render.js` — capturas + PDF. **Es el que se usa para exportar**: `node render.js`.
  - `qa.js` — contraste WCAG de la paleta, textos fuera de aire o cruzando pliegues, textos sobre el folio.
  - `bordes.js` | `posiciones.js` | `geo.js` | `medir.js` | `solape.js` · `hojacheck.js` · `bordes.js` → chequeos puntuales de geometría, solapamientos y medición por bloque.
- Salidas en `/tmp/opencode/render/out/`: `triptico.pdf`, `hoja-1.png`, `hoja-2.png`,
  `p1-portada.png` … `p6-formacion.png`, `vista-completa.png`, `vista-impresion.png`.

## 10 bis. Cómo verificar un cambio

```bash
node /tmp/opencode/render/render.js      # reexporta PDF y capturas; imprime medidas y errores
pdfinfo /tmp/opencode/render/out/triptico.pdf | grep -E 'Pages|Page size'
```

Valores esperados del estado actual:

- `Pages: 2` y `Page size: 841.92 x 594.96 pts (A4)`.
- En las 6 entradas de `render.js`: `desbordeVertical: 0` y `errores: []`.
- Aire de 5 mm en los cuatro cantos de las dos hojas (`bordes.js`).
- Contenido idéntico salvo cambios buscados: comparar multiconjunto de palabras del PDF contra el
  anterior (`pdftotext`), que es como se detecta un texto que se corta o se pierde.

## 11. Criterios de trabajo

- **No cambiar copy sin pedido explícito.** La redacción se revisó línea por línea; si hay que
  acortar para que entre, avisar y proponer antes de tocar.
- El texto de cada panel debe entrar entre 5 y ~201 mm de la hoja. Si se agrega contenido, primero
  medir y después editar: se ajusta por cuerpo, interlínea, márgenes internos y, recién al final,
  acortando texto.
- Verificar contraste (mínimo 4.77:1 en la pieza) y que todo texto quede a 5 mm de los pliegues
  (x = 100 y 200 mm) y de los cantos.
- Antes de dar por cerrado un cambio: `render.js` sin errores, PDF de 2 páginas A4 y capturas
  nuevas para revisión visual (el modelo no puede ver imágenes: la revisión estética la hace la
  persona).
