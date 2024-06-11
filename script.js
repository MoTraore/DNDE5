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
    const tiposDados = Array.from(document.getElementById('tiposDados').selectedOptions).map(option => option.value);
    const cantidadDados = parseInt(document.getElementById('cantidadDados').value);

    // Validación de tipos de dados seleccionados
    if (tiposDados.length !== new Set(tiposDados).size) {
        alert('No puedes seleccionar varios dados del mismo tipo.');
        return;
    }

    let resultadoTotal = 0;
    let detalleLanzamientos = '';
    const fechaActual = new Date();
    const fechaFormateada = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()} - ${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;

    for (let i = 0; i < cantidadDados; i++) {
        for (const tipoDado of tiposDados) {
            let tirada;

            switch (tipoDado) {
                case 'd4':
                    tirada = Math.floor(Math.random() * 4) + 1;
                    break;
                case 'd6':
                    tirada = Math.floor(Math.random() * 6) + 1;
                    break;
                case 'd8':
                    tirada = Math.floor(Math.random() * 8) + 1;
                    break;
                case 'd10':
                    tirada = Math.floor(Math.random() * 10) + 1;
                    break;
                case 'd12':
                    tirada = Math.floor(Math.random() * 12) + 1;
                    break;
                case 'd20':
                    tirada = Math.floor(Math.random() * 20) + 1;
                    break;
                case 'd3':
                    tirada = Math.floor(Math.random() * 3) + 1;
                    break;
                case 'd100':
                    const d10Tirada1 = Math.floor(Math.random() * 10) + 1;
                    const d10Tirada2 = Math.floor(Math.random() * 10) + 1;
                    tirada = d10Tirada1 * 10 + d10Tirada2;
                    break;
                default:
                    tirada = 0;
                    break;
            }

            resultadoTotal += tirada;
            detalleLanzamientos += `Dado ${tipoDado} (${i + 1}): ${tirada}\n`;
        }
    }

    const nuevoHistorial = document.getElementById('historialDados').value;
    const historialActualizado = `${fechaFormateada} - Lanzamiento: ${tiposDados.join(',')} x ${cantidadDados}\nResultado: ${resultadoTotal}\nDetalle:\n${detalleLanzamientos}\n\n${nuevoHistorial}`;
    document.getElementById('historialDados').value = historialActualizado;

    
}
