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
    
    tarjeta.setAttribute("aria-label", "Color " + codigo);
  });
}

function cambiarFormato() {
  const formato = obtenerFormato().toUpperCase();
  actualizarCodigos();
  mostrarToast("Formato cambiado a " + formato);
}

function cambiarComposicion() {
  mostrarToast("Composición escogida: " + obtenerTamano() + " colores");
}

function obtenerBloqueados() {
  return Array.from(document.querySelectorAll(".tarjetaColor.bloqueada")).map(function (t) {
    return { hex: t.dataset.hex, hsl: t.dataset.hsl };
  });
}

function crearTarjeta(colorHex, colorHsl, bloqueada) {
  const tarjeta = document.createElement("button");

  tarjeta.type = "button";
  tarjeta.className = "tarjetaColor";
  tarjeta.dataset.hex = colorHex;
  tarjeta.dataset.hsl = colorHsl;

  tarjeta.innerHTML =
    '<span class="muestra" style="background-color: ' + colorHex + ';"></span>' +
    '<span class="info-color">' +
    '<span class="infoTexto"><span class="etiqueta"></span><span class="codigo"></span></span>' +
    '<span class="accionesTarjeta">' +
    '<button type="button" class="btnCopiar" aria-label="Copiar color"><span class="tipBtn">Copiar</span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>' +
    '<button type="button" class="btnBloqueo" aria-label="Bloquear color"><span class="tipBtn">Bloquear</span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg></button>' +
    '</span>' +
    '</span>';

  if (bloqueada) {
    const svgCerrado = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
    const btn = tarjeta.querySelector(".btnBloqueo");
    const tip = btn.querySelector(".tipBtn");
    tarjeta.classList.add("bloqueada");
    btn.innerHTML = svgCerrado;
    btn.insertBefore(tip, btn.firstChild);
    btn.setAttribute("aria-label", "Desbloquear color");
    tip.textContent = "Desbloquear";
  }

  tarjeta.querySelector(".btnBloqueo").addEventListener("click", function (e) {
    e.stopPropagation();
    const estaBloqueada = tarjeta.classList.toggle("bloqueada");
    const svgAbierto = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>';
    const svgCerrado = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
    const tip = this.querySelector(".tipBtn");
    this.innerHTML = (estaBloqueada ? svgCerrado : svgAbierto);
    this.insertBefore(tip, this.firstChild);
    this.setAttribute("aria-label", estaBloqueada ? "Desbloquear color" : "Bloquear color");
    this.querySelector(".tipBtn").textContent = estaBloqueada ? "Desbloquear" : "Bloquear";
    if (!estaBloqueada) this.blur();
    mostrarToast(estaBloqueada ? "Color bloqueado" : "Color desbloqueado");
  });

  tarjeta.querySelector(".btnCopiar").addEventListener("click", function (e) {
    e.stopPropagation();
    const formato = obtenerFormato();
    const codigo = formato === "hex" ? colorHex : colorHsl;
    navigator.clipboard.writeText(codigo);
    mostrarToast("Código copiado: " + codigo);
  });

  return tarjeta;
}

function generarPaleta(mostrarMensaje) {
  if (mostrarMensaje === undefined) mostrarMensaje = true;

  const cantidad = obtenerTamano();
  const bloqueados = obtenerBloqueados();

  if (bloqueados.length === cantidad) {
    mostrarToast("Desbloquea al menos un color para generar una nueva paleta");
    return;
  }

  if (bloqueados.length > cantidad) {
    mostrarToast("Tienes " + bloqueados.length + " colores bloqueados pero la composición es de " + cantidad + ". Desbloquea algunos.");
    return;
  }

  paleta.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    let colorHex, colorHsl, bloqueada;

    if (i < bloqueados.length) {
      colorHex = bloqueados[i].hex;
      colorHsl = bloqueados[i].hsl;
      bloqueada = true;
    } else {
      colorHex = generarHex();
      colorHsl = convertirHexAHsl(colorHex);
      bloqueada = false;
    }

    paleta.appendChild(crearTarjeta(colorHex, colorHsl, bloqueada));
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

generarPaleta(false);