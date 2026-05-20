const paleta_dom = document.getElementById("paleta");
const toast = document.getElementById("toast");
const boton = document.getElementById("botonGenerar");
const botonGuardar = document.getElementById("botonGuardar");
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
  document.querySelectorAll(".tarjetaColor").forEach(function (tarjeta) {
    const codigo = formato === "hex" ? tarjeta.dataset.hex : tarjeta.dataset.hsl;
    tarjeta.querySelector(".etiqueta").textContent = formato.toUpperCase();
    tarjeta.querySelector(".codigo").textContent = codigo;
    tarjeta.querySelector(".btnCopiar").title = "Copiar " + formato.toUpperCase();
    tarjeta.setAttribute("aria-label", "Color " + codigo);
  });
}

function cambiarFormato() {
  actualizarCodigos();
  mostrarToast("Formato cambiado a " + obtenerFormato().toUpperCase());
}

function cambiarComposicion() {
  mostrarToast("Composición escogida: " + obtenerTamano() + " colores");
}

function obtenerBloqueados() {
  return Array.from(document.querySelectorAll(".tarjetaColor.bloqueada")).map(function (t) {
    return { hex: t.dataset.hex, hsl: t.dataset.hsl };
  });
}

const svgAbierto = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>';
const svgCerrado = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
const svgCopiar = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

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
    '<button type="button" class="btnCopiar" aria-label="Copiar color"><span class="tipBtn">Copiar</span>' + svgCopiar + '</button>' +
    '<button type="button" class="btnBloqueo" aria-label="Bloquear color"><span class="tipBtn">Bloquear</span>' + svgAbierto + '</button>' +
    '</span>' +
    '</span>';

  if (bloqueada) {
    tarjeta.classList.add("bloqueada");
    const btn = tarjeta.querySelector(".btnBloqueo");
    const tip = btn.querySelector(".tipBtn");
    btn.innerHTML = svgCerrado;
    btn.insertBefore(tip, btn.firstChild);
    btn.setAttribute("aria-label", "Desbloquear color");
    tip.textContent = "Desbloquear";
  }

  tarjeta.querySelector(".btnBloqueo").addEventListener("click", function (e) {
    e.stopPropagation();
    const estaBloqueada = tarjeta.classList.toggle("bloqueada");
    const tip = this.querySelector(".tipBtn");
    this.innerHTML = estaBloqueada ? svgCerrado : svgAbierto;
    this.insertBefore(tip, this.firstChild);
    this.setAttribute("aria-label", estaBloqueada ? "Desbloquear color" : "Bloquear color");
    tip.textContent = estaBloqueada ? "Desbloquear" : "Bloquear";
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

  paleta_dom.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    let colorHex, colorHsl, esBloqueada;
    if (i < bloqueados.length) {
      colorHex = bloqueados[i].hex;
      colorHsl = bloqueados[i].hsl;
      esBloqueada = true;
    } else {
      colorHex = generarHex();
      colorHsl = convertirHexAHsl(colorHex);
      esBloqueada = false;
    }
    paleta_dom.appendChild(crearTarjeta(colorHex, colorHsl, esBloqueada));
  }

  actualizarCodigos();
  if (mostrarMensaje) mostrarToast("Paleta de " + cantidad + " colores generada");
}

// --- Paletas guardadas ---

function obtenerPaletas() {
  return JSON.parse(localStorage.getItem("paletas") || "[]");
}

function guardarEnStorage(paletas) {
  localStorage.setItem("paletas", JSON.stringify(paletas));
}

function renderizarPaletas() {
  const lista = document.getElementById("listaPaletas");
  const paletas = obtenerPaletas();

  if (paletas.length === 0) {
    lista.innerHTML = "<p class='sinPaletas'>Sin paletas guardadas.</p>";
    return;
  }

  lista.innerHTML = paletas.map(function (p, i) {
    const muestras = p.colores.map(function (c) {
      return '<span class="muestraGuardada" style="background-color:' + c.hex + '"></span>';
    }).join("");

    return '<div class="paletaGuardada">' +
      '<input class="nombrePaleta" value="' + p.nombre + '" data-index="' + i + '" />' +
      '<div class="muestrasGuardadas">' + muestras + '</div>' +
      '<div class="accionesPaleta">' +
      '<button class="btnCargar" data-index="' + i + '">Cargar</button>' +
      '<button class="btnEliminar" data-index="' + i + '">Eliminar</button>' +
      '</div>' +
      '</div>';
  }).join("");

  lista.querySelectorAll(".btnCargar").forEach(function (btn) {
    btn.addEventListener("click", function () { cargarPaleta(Number(this.dataset.index)); });
  });

  lista.querySelectorAll(".btnEliminar").forEach(function (btn) {
    btn.addEventListener("click", function () { eliminarPaleta(Number(this.dataset.index)); });
  });

  lista.querySelectorAll(".nombrePaleta").forEach(function (input) {
    input.addEventListener("change", function () {
      const paletas = obtenerPaletas();
      paletas[Number(this.dataset.index)].nombre = this.value || "Paleta " + (Number(this.dataset.index) + 1);
      guardarEnStorage(paletas);
    });
  });
}

function guardarPaletaActual() {
  const tarjetas = document.querySelectorAll(".tarjetaColor");
  if (tarjetas.length === 0) {
    mostrarToast("Genera una paleta antes de guardar");
    return;
  }
  const colores = Array.from(tarjetas).map(function (t) {
    return { hex: t.dataset.hex, hsl: t.dataset.hsl };
  });
  const clave = colores.map(function (c) { return c.hex; }).join(",");
  const paletas = obtenerPaletas();
  const yaExiste = paletas.some(function (p) {
    return p.colores.map(function (c) { return c.hex; }).join(",") === clave;
  });
  if (yaExiste) {
    mostrarToast("Esta paleta ya está guardada");
    return;
  }
  if (paletas.length >= 10) {
    mostrarToast("Límite de 10 paletas alcanzado. Elimina una para guardar.");
    return;
  }
  paletas.push({ nombre: "Paleta " + (paletas.length + 1), colores: colores });
  guardarEnStorage(paletas);
  renderizarPaletas();
  mostrarToast("Paleta guardada");
}

function cargarPaleta(index) {
  const p = obtenerPaletas()[index];
  if (!p) return;
  paleta_dom.innerHTML = "";
  p.colores.forEach(function (c) {
    paleta_dom.appendChild(crearTarjeta(c.hex, c.hsl, false));
  });
  actualizarCodigos();
  mostrarToast("Paleta cargada");
}

function eliminarPaleta(index) {
  const paletas = obtenerPaletas();
  paletas.splice(index, 1);
  paletas.forEach(function (p, i) { p.nombre = "Paleta " + (i + 1); });
  guardarEnStorage(paletas);
  renderizarPaletas();
  mostrarToast("Paleta eliminada");
}

boton.addEventListener("click", function () { generarPaleta(); });
botonGuardar.addEventListener("click", guardarPaletaActual);

radiosFormato.forEach(function (radio) { radio.addEventListener("change", cambiarFormato); });
radiosComposicion.forEach(function (radio) { radio.addEventListener("change", cambiarComposicion); });

generarPaleta(false);
renderizarPaletas();