function validarNombre(nombre) {
  if (nombre.length === 0) {
    return "Debe escribir al menos un caracter";
  }
  if (nombre.length > 30) {
    return "Su nombre de usuario debe tener menos de 30 caracteres";
  }
  if (!/^[a-z]+$/i.test(nombre)) {
    return "El campo nombre de usuario solo acepta letras";
  }
  return "";
}

let nombreDeUsuario = "";
const miniPausa = 700;
const $botonOk = document.querySelector("#boton-ok");
$botonOk.onclick = function (event) {
  document.querySelector("#btn-jugar").classList.add("oculto");
  const $nombre = document.querySelector("#nombre-usuario").value;
  const errorNombre = validarNombre($nombre);
  const mensajeError = document.querySelector("#advertencia-nombre");
  if (errorNombre) {
    document.querySelector("#nombre-usuario").classList.add("error");
    mensajeError.textContent = errorNombre;
    mensajeError.classList.remove("oculto");
  } else {
    mensajeError.classList.add("oculto");
    document.querySelector("#nombre-usuario").classList.remove("error");
  }
  nombreDeUsuario = $nombre;
  document.querySelector("#usuario").textContent = nombreDeUsuario;
  document.querySelector("#nombre").textContent = nombreDeUsuario;
  if (!errorNombre) {
    setTimeout(function(){mostrarElementos("btn-jugar")}, MILISEGUNDOS);
    ocultarElementos("nombre-de-usuario");
    mostrarElementos("registro-usuario");
  }
  event.preventDefault();
};

function reiniciarContadorDeRondas() {
  cantidadDeRondas = 0;
  document.querySelector("#cantidad-rondas").textContent = cantidadDeRondas;
}

function activarBotones() {
  document.querySelectorAll(".botones-colores").forEach(function(botonColor){
    botonColor.disabled = false;
  });  
}

function desactivarBotones() {
  document.querySelectorAll(".botones-colores").forEach(function(botonColor){
    botonColor.disabled = true;
  });
};

function animarBoton(boton, sonido){
  boton.style.opacity = 0.5;
  boton.style.transform = "scale(1.3)";
  sonido.play();
  setTimeout(function(){
    boton.style.opacity = 1;
    boton.style.transform = "scale(1)";
  }, (MILISEGUNDOS/2));
};

function mostrarSecuenciaPC(arreglo) {
  arreglo.forEach(function (color, index) {
    const tiempoRetrasadoPC = (index + 1) * MILISEGUNDOS;
    const $sonido = document.querySelector(`#sonido-btn-${color}`);
    const $botonColor = document.querySelector(`#boton-${color}`);
    setTimeout(animarBoton, tiempoRetrasadoPC, $botonColor, $sonido);
  });
}

function generarSecuenciaPC() {
  const CANTIDAD_DE_COLORES = 4;
  const numeroAleatorio = Math.floor(Math.random() * CANTIDAD_DE_COLORES);
  arregloJugadasPc.push(colores[numeroAleatorio]);
  mostrarSecuenciaPC(arregloJugadasPc);
}

function compararSecuencias(arregloPc, arregloUsuario) {
  for (let i = 0; i < arregloUsuario.length; i++) {
    if (arregloPc[i] !== arregloUsuario[i]) {
      desactivarBotones();
      finalizarJuego();
      return;
    }
  }
  if (arregloPc.length === arregloUsuario.length) {
    desactivarBotones();
    setTimeout(function () {
      document.querySelector("#mensajes-de-turno").textContent = "Turno de la pc";
    }, miniPausa * 2);
    setTimeout(desarrollarJuego, miniPausa * 2);
  }
}

function mostrarElementos(elemento) {
  document.querySelector(`#${elemento}`).classList.toggle("oculto");
}

function ocultarElementos(elemento) {
  document.querySelector(`#${elemento}`).classList.toggle("oculto");
}

const $botonNO = document.querySelector("#btn-no");
$botonNO.onclick = function () {
  mostrarElementos("mensaje-despedida");
  ocultarElementos("btn-no");
  ocultarElementos("btn-si");
  ocultarElementos("finalizado-juego");
  return false;
};

const $botonSi = document.querySelector("#btn-si");
$botonSi.onclick = function () {
  ocultarElementos("finalizado-juego");
  mostrarElementos("conjunto-botones");
  mostrarElementos("btn-jugar");
  return false;
};

function mostrarFinalizadoJuego() {
  document.querySelector("#n-rondas").textContent = String(
    cantidadDeRondas - 1
  );
  mostrarElementos("finalizado-juego");
}

function finalizarJuego() {
  const $sonidoFinalizadoJuego = document.querySelector("#audio-finalizado");
  setTimeout(function(){
    $sonidoFinalizadoJuego.play();
  }, MILISEGUNDOS);
  mostrarFinalizadoJuego();
  ocultarElementos("conjunto-botones");
  ocultarElementos("rondas");
}

let arregloJugadasPc = [];
let arregloJugadasUsuario = [];
let cantidadDeRondas = 0;
const MILISEGUNDOS = 1000;

function desarrollarJuego() {
  cantidadDeRondas++;
  document.querySelector("#cantidad-rondas").textContent =
    String(cantidadDeRondas);
  generarSecuenciaPC();
  arregloJugadasUsuario = [];
  const tiempoRetrasadoUsuario = (arregloJugadasPc.length + 1) * MILISEGUNDOS;
  setTimeout(function () {
    document.querySelector("#mensajes-de-turno").textContent = "Es su turno de jugar!!!";
    activarBotones();
  }, tiempoRetrasadoUsuario + 200);
}
 
const colores = ["verde", "rojo", "amarillo", "azul"];

const $botonJugar = document.querySelector("#btn-jugar");
$botonJugar.onclick = function () {
  arregloJugadasPc = [];
  ocultarElementos("btn-jugar");
  reiniciarContadorDeRondas();
  mostrarElementos("rondas");
  if (!document.querySelector("#registro-usuario").classList.contains("oculto")){
    ocultarElementos("registro-usuario");
  };
  desarrollarJuego();
};

const $botonverde = document.querySelector("#boton-verde");
const $sonidoBtnverde = document.querySelector("#sonido-btn-verde");
$botonverde.onclick = function () {
  arregloJugadasUsuario.push("verde");
  animarBoton($botonverde, $sonidoBtnverde);
  compararSecuencias(arregloJugadasPc, arregloJugadasUsuario);
};

const $botonrojo = document.querySelector("#boton-rojo");
const $sonidoBtnrojo = document.querySelector("#sonido-btn-rojo");
$botonrojo.onclick = function () {
  arregloJugadasUsuario.push("rojo");
  animarBoton($botonrojo, $sonidoBtnrojo);
  compararSecuencias(arregloJugadasPc, arregloJugadasUsuario);
};

const $botonamarillo = document.querySelector("#boton-amarillo");
const $sonidoBtnamarillo = document.querySelector("#sonido-btn-amarillo");
$botonamarillo.onclick = function () {
  arregloJugadasUsuario.push("amarillo");
  animarBoton($botonamarillo, $sonidoBtnamarillo);
  compararSecuencias(arregloJugadasPc, arregloJugadasUsuario);
};

const $botonazul = document.querySelector("#boton-azul");
const $sonidoBtnazul = document.querySelector("#sonido-btn-azul");
$botonazul.onclick = function () {
  arregloJugadasUsuario.push("azul");
  animarBoton($botonazul, $sonidoBtnazul);
  compararSecuencias(arregloJugadasPc, arregloJugadasUsuario);
};
