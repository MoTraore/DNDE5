const formulario = document.getElementById('formulario');
const listaPersonajes = document.getElementById('listaPersonajes');

let personajes = [];

function agregarPersonaje() {
    const nombre = document.getElementById('nombre').value;
    const modificadorDestreza = parseInt(document.getElementById('modificadorDestreza').value);

    if (nombre && !isNaN(modificadorDestreza)) {
        personajes.push({ nombre, modificadorDestreza });
        mostrarPersonajes();
        limpiarFormulario();
    } else {
        alert('Por favor, ingresa un nombre y un modificador de destreza válidos.');
    }
}

function mostrarPersonajes() {
    listaPersonajes.innerHTML = ''; // Limpiar lista antes de agregar nuevos personajes

    personajes.forEach((personaje, index) => {
        const elementoLista = document.createElement('li');
        elementoLista.className = 'list-group-item'; // Clase Bootstrap para estilo
        elementoLista.textContent = `${index + 1}. ${personaje.nombre} - Iniciativa: ${personaje.totalIniciativa} (Destreza: ${personaje.modificadorDestreza})`;
        listaPersonajes.appendChild(elementoLista);

        // Agregar botón para eliminar personaje
        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'btn btn-danger btn-sm float-end'; // Estilos Bootstrap
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarPersonaje(index);
        elementoLista.appendChild(botonEliminar);

        // Agregar input para modificar modificador de destreza
        const inputModificador = document.createElement('input');
        inputModificador.type = 'number';
        inputModificador.className = 'form-control form-control-sm';
        inputModificador.value = personaje.modificadorDestreza;
        inputModificador.onchange = () => modificarModificadorDestreza(index, parseInt(inputModificador.value));
        elementoLista.appendChild(inputModificador);
    });
}

function eliminarPersonaje(indice) {
    personajes.splice(indice, 1);
    mostrarPersonajes();
}


function modificarModificadorDestreza(indice, nuevoModificador) {
    personajes[indice].modificadorDestreza = nuevoModificador;
    calcularIniciativas(); // Recalcular iniciativas al modificar el modificador
    mostrarPersonajes();
}


function calcularIniciativas() {
    personajes.forEach((personaje) => {
        const tiradaD20 = Math.floor(Math.random() * 20) + 1;
        personaje.totalIniciativa = tiradaD20 + personaje.modificadorDestreza;
    });

    personajes.sort((a, b) => b.totalIniciativa - a.totalIniciativa);
    mostrarPersonajes();
}

function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('modificadorDestreza').value = 0;
}

function lanzarDados() {
    const tipoDado = document.getElementById('tipoDado').value;
    const cantidadDados = parseInt(document.getElementById('cantidadDados').value);

    let resultado = 0;
    let detalleLanzamientos = '';

    for (let i = 0; i < cantidadDados; i++) {
        const tirada = Math.floor(Math.random() * (parseInt(tipoDado.substring(1)) + 1)) + 1;
        resultado += tirada;
        detalleLanzamientos += `Dado ${i + 1}: ${tirada}\n`;
    }

    const nuevoHistorial = document.getElementById('historialDados').value;
    const historialActualizado = nuevoHistorial + `\nLanzamiento: ${tipoDado} x ${cantidadDados}\nResultado: ${resultado}\nDetalle:\n${detalleLanzamientos}\n\n`;
    document.getElementById('historialDados').value = historialActualizado;
}
