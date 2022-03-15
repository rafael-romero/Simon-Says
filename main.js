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
    setTimeout(function () {
      alert(`Bienvenidx Estimadx ${$nombre}...jugamos???`);
      mostrarElementos("btn-jugar");
    }, miniPausa);
    ocultarElementos("nombre-de-usuario");
    mostrarElementos("registro-usuario");
  }
  event.preventDefault();
};
    }
    event.preventDefault();
}
function reiniciarContadorDeRondas(){
    return document.querySelector("#cantidad-rondas").textContent = "0";
}

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
}

function reproducirSonido(sonido) {
  sonido.play();
}

function animarBoton(boton) {
  boton.style.opacity = 0.5;
  setTimeout(function () {
    boton.style.opacity = 1;
  }, 500);
  boton.style.transform = "scale(1.3)";
  setTimeout(function () {
    boton.style.transform = "scale(1)";
  }, 500);
}

function mostrarSecuenciaPC(arreglo) {
  arreglo.forEach(function (color, index) {
    const tiempoRetrasadoPC = (index + 1) * MILISEGUNDOS;
    const $sonido = document.querySelector(`#sonido-btn-${color}`);
    const $botonColor = document.querySelector(`#boton-${color}`);
    setTimeout(animarBoton, tiempoRetrasadoPC, $botonColor);
    setTimeout(reproducirSonido, tiempoRetrasadoPC, $sonido);
  });
}

function generarSecuenciaPC() {
  const CANTIDAD_DE_COLORES = 4;
  const numeroAleatorio = Math.floor(Math.random() * CANTIDAD_DE_COLORES) + 1;
  arregloJugadasPc.push(colores[numeroAleatorio]);
  mostrarSecuenciaPC(arregloJugadasPc);
}

function compararSecuencias(arregloPc, arregloUsuario){
    for(let i = 0; i < arregloUsuario.length; i++){
        if(arregloPc[i] !== arregloUsuario[i]){
            //return terminoJuego = true;
            desactivarBotones();
            finalizarJuego();
        }
    }
    if(arregloPc.length === arregloUsuario.length){
        desactivarBotones();
        desarrollarJuego();
    }
}

function mostrarUOcultarElementos(elemento){
    document.querySelector(`#${elemento}`).classList.toggle("oculto");
}


const $botonNO = document.querySelector("#btn-no");
$botonNO.onclick = function(){
    alert("Gracias, esperamos el juego haya sido de su agrado!!!");
    return false;
}

const $botonSi = document.querySelector("#btn-si");
$botonSi.onclick = function(){
    mostrarUOcultarElementos("finalizado-juego");
    mostrarUOcultarElementos("conjunto-botones");
    mostrarUOcultarElementos("btn-jugar");
    // document.querySelector("#finalizado-juego").classList.add("oculto");
    // document.querySelector("#conjunto-botones").classList.remove("oculto");
    // document.querySelector("#btn-jugar").classList.remove("oculto");
    return false;
}

function mostrarFinalizadoJuego(){
    document.querySelector("#n-rondas").textContent = String(cantidadDeRondas - 1); 
    mostrarUOcultarElementos("finalizado-juego");
    //document.querySelector("#finalizado-juego").classList.remove("oculto");
}

function finalizarJuego(){
    const $sonidoFinalizadoJuego = document.querySelector("#audio-finalizado");
    $sonidoFinalizadoJuego.play();
    mostrarFinalizadoJuego()
    mostrarUOcultarElementos("conjunto-botones");    
    //document.querySelector("#conjunto-botones").classList.add("oculto");
}

let arregloJugadasPc = [];
let arregloJugadasUsuario = [];
let cantidadDeRondas = 0;
//let terminoJuego = false;

function desarrollarJuego(){
    //while(terminoJuego !== true){
        cantidadDeRondas++;
        document.querySelector("#cantidad-rondas").textContent = String(cantidadDeRondas);
        generarSecuenciaPC();
        alert("Es su turno de jugar!!!")
        arregloJugadasUsuario = [];
        activarBotones();
        //terminoJuego = compararSecuencias(arregloJugadasPc, arregloJugadasUsuario);
    //}
}

const colores = {
    1: "green",
    2: "red",
    3: "yellow",
    4: "blue"
}

const coloresHover = {
    green: "rgb(0, 179, 0)",
    red: "rgb(255, 51, 51)",
    yellow: "rgb(255, 255, 102)",
    blue: "rgb(51, 51, 255)"
}

const $botonJugar = document.querySelector("#btn-jugar");
$botonJugar.onclick = function(){
    arregloJugadasPc = [];
    mostrarUOcultarElementos("btn-jugar");
    //document.querySelector("#btn-jugar").classList.add("oculto");
    reiniciarContadorDeRondas();
    mostrarUOcultarElementos("rondas");
    //document.querySelector("#rondas").classList.remove("oculto");
    desarrollarJuego();
    return false;
}

const $botongreen = document.querySelector("#boton-green");
const $sonidoBtngreen = document.querySelector("#sonido-btn-green");
$botongreen.onclick = function () {
  $sonidoBtngreen.play();
  arregloJugadasUsuario.push("green");
  animarBoton($botongreen);
  compararSecuencias(arregloJugadasPc, arregloJugadasUsuario);
};

const $botonred = document.querySelector("#boton-red");
const $sonidoBtnred = document.querySelector("#sonido-btn-red");
$botonred.onclick = function () {
  $sonidoBtnred.play();
  arregloJugadasUsuario.push("red");
  animarBoton($botonred);
  compararSecuencias(arregloJugadasPc, arregloJugadasUsuario);
};

const $botonyellow = document.querySelector("#boton-yellow");
const $sonidoBtnyellow = document.querySelector("#sonido-btn-yellow");
$botonyellow.onclick = function () {
  $sonidoBtnyellow.play();
  arregloJugadasUsuario.push("yellow");
  animarBoton($botonyellow);
  compararSecuencias(arregloJugadasPc, arregloJugadasUsuario);
};

const $botonblue = document.querySelector("#boton-blue");
const $sonidoBtnblue = document.querySelector("#sonido-btn-blue");
$botonblue.onclick = function () {
  $sonidoBtnblue.play();
  arregloJugadasUsuario.push("blue");
  animarBoton($botonblue);
  compararSecuencias(arregloJugadasPc, arregloJugadasUsuario);
};
