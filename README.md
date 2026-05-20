# Coloorfly Studio

![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)

Aplicación web para generar paletas de color aleatorias, elegir cantidad de colores (6, 8 o 9), cambiar formato de salida (HEX o HSL) y copiar cada código con un clic.

## Demo

`https://ffigueroa26.github.io/ProyectoM1_FelixFigueroa/`

## Características principales

- Generación de paletas aleatorias.
- Selección de composición: `6`, `8` o `9` colores.
- Cambio de formato visual: `HEX` o `HSL`.
- Bloqueo de colores individuales para conservarlos al regenerar la paleta.
- Copia de código al portapapeles con clic en el ícono de cada tarjeta.
- Guardado de paletas en `localStorage` con persistencia al refrescar la página.
- Detección de paletas duplicadas al intentar guardar.
- Renombrado de paletas guardadas directamente desde el panel.
- Eliminación de todas las paletas guardadas con un botón único.
- Notificaciones tipo toast para confirmar acciones.
- Diseño responsive para escritorio y celular.

## Manual de usuario

1. Abre la aplicación en tu navegador.
2. En `Composición`, elige cuántos colores quieres generar (`6`, `8` o `9`).
3. En `Formato`, selecciona `HEX` o `HSL` según tu necesidad.
4. Pulsa el botón `Generar` para crear una nueva paleta.
5. Pasa el mouse sobre una tarjeta para ver los íconos de acción.
6. Haz clic en el ícono de copiar para copiar el código del color.
7. Haz clic en el ícono de candado para bloquear ese color y conservarlo al regenerar.
8. Para desbloquear un color, haz clic nuevamente en el candado.
9. Pulsa `Guardar paleta` en el panel lateral para guardar la paleta actual.
10. Las paletas guardadas persisten aunque recargues la página.
11. Puedes renombrar cualquier paleta guardada haciendo clic en su nombre.
13. Usa el botón `Eliminar todas` para borrar todas las paletas guardadas al mismo tiempo.
14. Verás un mensaje en pantalla confirmando cada acción.

## Manual técnico

### Stack y arquitectura

- Proyecto construido con tecnologías base: `HTML`, `CSS` y `JavaScript` vanilla.
- No usa frameworks ni dependencias externas.
- Estructura de estilos modular:
  - `css/reset.css`: normalización básica.
  - `css/typography.css`: tipografía de encabezado.
  - `css/layout.css`: distribución general.
  - `css/components.css`: controles, tarjetas, toast y animaciones.
  - `css/responsive.css`: ajustes para pantallas pequeñas.
  - `css/styles.css`: punto de entrada con `@import`.

### Lógica de negocio

- La app genera colores en `HEX` usando números aleatorios entre `0` y `16777215` (`#000000` a `#ffffff`).
- Cada color se convierte también a `HSL` con una función propia (`convertirHexAHsl`).
- Se guardan ambos formatos en `data attributes` de cada tarjeta (`data-hex`, `data-hsl`) para alternar formato sin recalcular.
- Las tarjetas son elementos `button` para mejorar interacción y accesibilidad.

### Interacción y experiencia

- Eventos de UI:
  - Cambio de formato (`change` en radios de formato).
  - Cambio de composición (`change` en radios de composición).
  - Generación de paleta (`click` en botón principal).
  - Copia al portapapeles (`click` en cada tarjeta).
- Feedback inmediato con toast (`#toast`) usando `aria-live="polite"`.
- Responsive: en móviles se usa grilla de 2 columnas para mostrar más colores sin scroll excesivo.

### Decisiones técnicas

- Código separado por responsabilidades (estructura, estilos, lógica).
- Reutilización de funciones para evitar duplicación.
- Uso de APIs nativas del navegador (`navigator.clipboard`).
- Base lista para evolucionar a persistencia de paletas o exportación.

## Estructura del proyecto

```text
ProyectoM1_FelixFigueroa/
|- index.html
|- README.md
|- css/
|  |- reset.css
|  |- styles.css
|  |- typography.css
|  |- layout.css
|  |- components.css
|  |- responsive.css
|- js/
   |- script.js
```

## Requisitos

- Navegador moderno (`Chrome`, `Edge`, `Firefox`, `Safari`).
- Git (solo para clonar y versionar localmente).

## Cómo ejecutar en local

1. Clona el repositorio:

```bash
git clone https://github.com/ffigueroa26/ProyectoM1_FelixFigueroa.git
```

2. Entra al proyecto:

```bash
cd ProyectoM1_FelixFigueroa
```

3. Ejecuta la app de una de estas formas:

- **Opción A (rápida):** abre `index.html` directamente en el navegador.
- **Opción B (recomendada):** levanta un servidor local:

```bash
python -m http.server 5500
```

4. Si usaste servidor local, abre:

`http://localhost:5500`

## Cómo desplegar en GitHub Pages

1. Sube tu código a GitHub en la rama principal (`main`).
2. En GitHub, entra al repositorio y abre `Settings`.
3. Ve a `Pages`.
4. En `Build and deployment`, selecciona:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
5. Guarda los cambios.
6. Espera a que GitHub termine el deploy (1 a 3 minutos).
7. Abre la URL publicada por GitHub Pages.

URL esperada para este proyecto:
`https://ffigueroa26.github.io/ProyectoM1_FelixFigueroa/`

## Posibles mejoras futuras

- Botón para copiar toda la paleta.
- ~~Guardar paletas favoritas en `localStorage`.~~ ✓ Implementado.
- Exportar paleta a `JSON` o imagen.
- Soporte de más formatos (`RGB`, `CMYK` aproximado).