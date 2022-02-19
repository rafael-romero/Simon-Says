function validarNombre(nombre){
    if(nombre.length === 0){
        return "Debe escribir al menos un caracter";
    }
    if(nombre.length > 30){
        return "Su nombre de usuario debe tener menos de 30 caracteres"
    }
    if(!/^[a-z]+$/i.test(nombre)){
        return "El campo nombre de usuario solo acepta letras"
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
