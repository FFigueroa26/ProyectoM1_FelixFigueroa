# Coloorfly Studio

![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)

Aplicación web para generar paletas de color aleatorias, elegir cantidad de colores (6, 8 o 9), cambiar formato de salida (HEX o HSL) y copiar cada código con un clic.

## Demo

`https://ffigueroa26.github.io/ProyectoM1_FelixFigueroa/`

## Características principales

- Generación de paletas aleatorias.
- Selección de composición: `6`, `8` o `9` colores.
- Cambio de formato visual: `HEX` o `HSL`.
- Copia de código al portapapeles con clic sobre cada tarjeta.
- Notificaciones tipo toast para confirmar acciones.
- Diseño responsive para escritorio y celular.

## Manual de usuario

1. Abre la aplicación en tu navegador.
2. En `Composición`, elige cuántos colores quieres generar (`6`, `8` o `9`).
3. En `Formato`, selecciona `HEX` o `HSL` según tu necesidad.
4. Pulsa el botón `Generar` para crear una nueva paleta.
5. Haz clic en cualquier tarjeta de color para copiar su código.
6. Verás un mensaje en pantalla confirmando el formato activo, la composición elegida o el código copiado.

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
- Guardar paletas favoritas en `localStorage`.
- Exportar paleta a `JSON` o imagen.
- Soporte de más formatos (`RGB`, `CMYK` aproximado).