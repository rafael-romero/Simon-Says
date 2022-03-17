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
      mostrarElementos("btn-jugar");
    }, MILISEGUNDOS);
    ocultarElementos("nombre-de-usuario");
    mostrarElementos("registro-usuario");
  }
  event.preventDefault();
};
