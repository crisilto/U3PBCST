let ciudadano = {
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    direccion: {
        calle: "",
        patio: "",
        puerta: ""
    },
    poblacion: {
        codigoPostal: "",
        nombrePoblacion: ""
    },
    idiomas: [],
    hijos: []
};

ciudadano.nombre = prompt("Introduce el nombre: ");
ciudadano.apellidos = prompt("Introduce los apellidos: ");
ciudadano.fechaNacimiento = prompt("Introduce la fecha de nacimiento con el formato MM/DD/YYYY: ");

// Para la dirección:
let entradaDireccion = prompt("Introduce la dirección con el formato 'Calle XXXXXXXX nº XX Pta XXX': ");
let partesDireccion = entradaDireccion.split(' nº ');
ciudadano.direccion.calle = partesDireccion[0];
let [patio, puerta] = partesDireccion[1].split(' Pta ');
ciudadano.direccion.patio = patio;
ciudadano.direccion.puerta = puerta;

// Para la población:
let entradaPoblacion = prompt("Introduce la población con el formato 'CODIGO POSTAL - POBLACION': ");
let [codigoPostal, nombrePoblacion] = entradaPoblacion.split(' - ');
ciudadano.poblacion.codigoPostal = codigoPostal;
ciudadano.poblacion.nombrePoblacion = nombrePoblacion;

// Para los idiomas, el separado split va marcado por un espacio
ciudadano.idiomas = prompt("Introduce los idiomas hablados (separados por un espacio ): ").split(' ');

// Para los hijos, el separado split va marcado por un guión
let nombresHijosString = prompt("Introduce los nombres de cada hijo (separados por un guión -): ");
ciudadano.hijos = nombresHijosString.split('-');


function calcularEdad(fechaNacimiento) {
    let hoy = new Date();
    let fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    let diferenciaMeses = hoy.getMonth() - fechaNac.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    return edad;
}

function mostrarCiudadano() {
    let tablaHtml = `<table><thead><tr><th colspan="2">Datos del ciudadano</th></tr></thead><tbody>`;

    // Función para agregar un dato a la tabla
    function agregarDato(nombre, valor) {
        tablaHtml += `<tr><td>${nombre}</td><td>${valor}</td></tr>`;
    }

    agregarDato('Nombre', `${ciudadano.apellidos.toUpperCase()}, ${ciudadano.nombre.toUpperCase()}`);
    agregarDato('Edad', `${calcularEdad(ciudadano.fechaNacimiento)} años`);
    agregarDato('Calle', ciudadano.direccion.calle);
    agregarDato('Patio', ciudadano.direccion.patio);
    agregarDato('Puerta', ciudadano.direccion.puerta);
    agregarDato('Código Postal', ciudadano.poblacion.codigoPostal);
    agregarDato('Población', ciudadano.poblacion.nombrePoblacion.toUpperCase());

    // Para los idiomas
    if (ciudadano.idiomas.length > 0) {
        tablaHtml += `<tr><td rowspan="${ciudadano.idiomas.length}">Idiomas</td><td>${ciudadano.idiomas[0].toLowerCase()}</td></tr>`;
        for (let i = 1; i < ciudadano.idiomas.length; i++) {
            tablaHtml += `<tr><td>${ciudadano.idiomas[i].toLowerCase()}</td></tr>`;
        }
    }

    agregarDato('Número de hijos', ciudadano.hijos.length);

    tablaHtml += `</tbody></table>`;
    document.getElementById("ciudadano-el").innerHTML = tablaHtml;
}

mostrarCiudadano();
