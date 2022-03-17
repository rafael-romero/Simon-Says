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

function generarSecuenciaPC(colores) {
  const numeroAleatorio = Math.floor(Math.random() * colores.length);
  arregloJugadasPc.push(colores[numeroAleatorio]);
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
const colores = ["verde", "rojo", "amarillo", "azul"];


function desarrollarJuego() {
  cantidadDeRondas++;
  document.querySelector("#cantidad-rondas").textContent =
    String(cantidadDeRondas);
  generarSecuenciaPC(colores);
  mostrarSecuenciaPC(arregloJugadasPc);
  arregloJugadasUsuario = [];
  const tiempoRetrasadoUsuario = (arregloJugadasPc.length + 1) * MILISEGUNDOS;
  setTimeout(function () {
    document.querySelector("#mensajes-de-turno").textContent = "Es su turno de jugar!!!";
    activarBotones();
  }, tiempoRetrasadoUsuario + 200);
}
 

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

document.querySelectorAll(".botones-colores").forEach(function(botonColor){
  botonColor.onclick = function(){
    const idNombreColor = botonColor.id;
    const nombreColor = idNombreColor.slice(6);
    const $sonidoBoton = document.querySelector(`#sonido-btn-${nombreColor}`)
    
    arregloJugadasUsuario.push(nombreColor); 
    animarBoton(botonColor, $sonidoBoton);
    compararSecuencias(arregloJugadasPc, arregloJugadasUsuario);  
  };
});
