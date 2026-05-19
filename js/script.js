const paleta = document.getElementById("paleta");
const toast = document.getElementById("toast");
const boton = document.getElementById("botonGenerar");
const radiosFormato = document.querySelectorAll('input[name="formato"]');
const radiosComposicion = document.querySelectorAll('input[name="composicion"]');

let timerToast;

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarHex() {
  const numero = numeroAleatorio(0, 16777215);
  return "#" + numero.toString(16).padStart(6, "0");
}

function convertirHexAHsl(hex) {
  let rojo = parseInt(hex.substring(1, 3), 16) / 255;
  let verde = parseInt(hex.substring(3, 5), 16) / 255;
  let azul = parseInt(hex.substring(5, 7), 16) / 255;

  const max = Math.max(rojo, verde, azul);
  const min = Math.min(rojo, verde, azul);
  const luminosidad = (max + min) / 2;

  let tono = 0;
  let saturacion = 0;

  if (max !== min) {
    const diferencia = max - min;
    saturacion = luminosidad > 0.5 ? diferencia / (2 - max - min) : diferencia / (max + min);

    if (max === rojo) {
      tono = (verde - azul) / diferencia + (verde < azul ? 6 : 0);
    } else if (max === verde) {
      tono = (azul - rojo) / diferencia + 2;
    } else {
      tono = (rojo - verde) / diferencia + 4;
    }

    tono = tono * 60;
  }

  return "hsl(" + Math.round(tono) + ", " + Math.round(saturacion * 100) + "%, " + Math.round(luminosidad * 100) + "%)";
}


function mostrarToast(mensaje) {
  toast.textContent = mensaje;
  toast.style.display = "block";

  clearTimeout(timerToast);

  timerToast = setTimeout(function () {
    toast.style.display = "none";
  }, 3000);
}

function obtenerTamano() {
  return Number(document.querySelector('input[name="composicion"]:checked').value);
}

function obtenerFormato() {
  return document.querySelector('input[name="formato"]:checked').value;
}

function actualizarCodigos() {
  const formato = obtenerFormato();
  const tarjetas = document.querySelectorAll(".tarjetaColor");

  tarjetas.forEach(function (tarjeta) {
    const codigo = formato === "hex" ? tarjeta.dataset.hex : tarjeta.dataset.hsl;

    tarjeta.querySelector(".etiqueta").textContent = formato.toUpperCase();
    tarjeta.querySelector(".codigo").textContent = codigo;
    tarjeta.querySelector(".tooltip").textContent = "Clic para copiar " + formato.toUpperCase();
    tarjeta.setAttribute("aria-label", "Copiar color " + codigo);
  });
}

function cambiarFormato() {
  const formato = obtenerFormato().toUpperCase();
  actualizarCodigos();
  mostrarToast("Formato cambiado a " + formato);
}

function cambiarComposicion() {
  mostrarToast("Composicion escogida: " + obtenerTamano() + " colores");
}

function generarPaleta(mostrarMensaje = true) {
  const cantidad = obtenerTamano();
  paleta.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    const colorHex = generarHex();
    const colorHsl = convertirHexAHsl(colorHex);
    const tarjeta = document.createElement("button");

    tarjeta.type = "button";
    tarjeta.className = "tarjetaColor";
    tarjeta.dataset.hex = colorHex;
    tarjeta.dataset.hsl = colorHsl;

    tarjeta.innerHTML =
      '<span class="tooltip">Clic para copiar</span>' +
      '<span class="muestra" style="background-color: ' + colorHex + ';"></span>' +
      '<span class="info-color">' +
      '<span class="etiqueta"></span>' +
      '<span class="codigo"></span>' +
      '</span>';

    tarjeta.addEventListener("click", function () {
      const formato = obtenerFormato();
      const codigo = formato === "hex" ? colorHex : colorHsl;

      navigator.clipboard.writeText(codigo);
      mostrarToast("Codigo copiado: " + codigo);
    });

    paleta.appendChild(tarjeta);
  }

  actualizarCodigos();

  if (mostrarMensaje) {
    mostrarToast("Paleta de " + cantidad + " colores generada");
  }
}

boton.addEventListener("click", function () {
  generarPaleta();
});

radiosFormato.forEach(function (radio) {
  radio.addEventListener("change", cambiarFormato);
});

radiosComposicion.forEach(function (radio) {
  radio.addEventListener("change", cambiarComposicion);
});

// Carga una paleta inicial al abrir la pagina
generarPaleta(false);
