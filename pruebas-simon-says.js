function probarValidarNombre(){
    console.assert(
        validarNombre("") === "Debe escribir al menos un caracter",
        "validarNombre no valido que el nombre no sea vacio"
    );
    console.assert(
        validarNombre("aldjkhbfbnsncdjknsikbvdfirbwsejonefwoienfwoienfa") === "Su nombre de usuario debe tener menos de 30 caracteres",
        "validarNombre no valido que el nombre tenga menos de 30 caracteres"
    )
    console.assert(
        validarNombre("asdas1234") === "El campo nombre de usuario solo acepta letras",
        "validarNombre no valido que el nombre solo tenga letras"
    )
    console.assert(
        validarNombre("rafael") === "",
        "validarNombre fallo la validacion con un nombre valido"
    )
}

probarValidarNombre();
