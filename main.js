function validarNombre(nombre){
    if(nombre.length === 0){
        return "Debe escribir al menos un caracter";
    }
    if(nombre.length > 30){
        return "Su nombre de usuario debe tener menos de 30 caracteres";
    }
    if(!/^[a-z]+$/i.test(nombre)){
        return "El campo nombre de usuario solo acepta letras";
    }
    return "";
}


const $botonOk = document.querySelector("#boton-ok");
$botonOk.onclick = function(event){
    const $nombre = document.querySelector("#nombre-usuario").value
    const errorNombre = validarNombre($nombre);
    const $labelNombreUsuario = document.querySelector("#nombre-de-usuario");
    const mensajeError = document.createElement("strong");
    if (errorNombre){
        //$labelNombreUsuario.classList.add("error");
        
        
        document.querySelector("#nombre-usuario").classList.add("error");
        
        if(!$labelNombreUsuario.contains(mensajeError)){
            mensajeError.textContent = errorNombre;
            $labelNombreUsuario.appendChild(mensajeError);
        }    
    }else {
        if($labelNombreUsuario.contains(mensajeError)){
           document.querySelector("#nombre-usuario").classList.remove("error");
            $labelNombreUsuario.removeChild(mensajeError);
            //deberia agregar aca el nombre de usuario al localstorage
        }
    }


    event.preventDefault();
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
$botongreen.onclick = function(){
    $sonidoBtngreen.play();
    arregloJugadasUsuario.push("green");
    compararSecuencias(arregloJugadasPc, arregloJugadasUsuario);
}

const $botonred = document.querySelector("#boton-red");
const $sonidoBtnred = document.querySelector("#sonido-btn-red");
$botonred.onclick = function(){
    $sonidoBtnred.play();
    arregloJugadasUsuario.push("red");
    compararSecuencias(arregloJugadasPc, arregloJugadasUsuario);
}

const $botonyellow = document.querySelector("#boton-yellow");
const $sonidoBtnyellow = document.querySelector("#sonido-btn-yellow");
$botonyellow.onclick = function(){
    $sonidoBtnyellow.play();
    arregloJugadasUsuario.push("yellow");
    compararSecuencias(arregloJugadasPc, arregloJugadasUsuario);
}

const $botonblue = document.querySelector("#boton-blue");
const $sonidoBtnblue = document.querySelector("#sonido-btn-blue");
$botonblue.onclick = function(){
    $sonidoBtnblue.play();
    arregloJugadasUsuario.push("blue");
    compararSecuencias(arregloJugadasPc, arregloJugadasUsuario);
}

