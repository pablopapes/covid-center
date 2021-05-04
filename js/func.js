class DiagnosticoStorage {
    constructor(obj) {
        this.texto = obj.texto;
        this.diagnostico = obj.diagnostico.toUpperCase();
    }
}

class PersonaStorage {
    constructor(obj) {
        this.nombre = obj.nombre;
        this.telefono = obj.telefono;
        this.mail = obj.mail;
    }
}


function Pregunta(descripcion, puntos) {
    this.descripcion = descripcion;
    this.puntos = puntos;
}

function Diagnostico() {
    this.sumatoria = 0;

    this.resultado = function () {
        let resultado = "";
        let diagnostico = ""
        let icono = "";
        if (this.sumatoria < 8) {
            resultado = "NO tienes sintomas de covid";
            diagnostico = "NEGATIVO";
            icono = "success";
        } else {
            resultado = "Puede que tengas sintomas de covid";
            diagnostico = "POSITIVO";
            icono = "error";
        }

        clearDiagnosticoDiv();
        setDiagnostico(resultado, diagnostico);
        getDiagnosticos();

        Swal.fire({
            icon: icono,
            title: 'Diagnostico',
            text: resultado,
        })
    };

    this.sumarPuntos = function (puntos) {
        this.sumatoria = this.sumatoria + puntos;
    };

}


function getDiagnosticos() {

    const listaDiagnosticos = JSON.parse(localStorage.getItem("datos"));
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    let arrayDiagnosticos = [];

    if (listaDiagnosticos != null && usuario != null) {


        for (const obj of listaDiagnosticos) {
            arrayDiagnosticos.push(new DiagnosticoStorage(obj));
        }
        let indice = 0;
        for (const diag of arrayDiagnosticos) {
            indice++;

            var diagnostico_texto = document.createElement('div');

            if (diag.diagnostico === "NEGATIVO") {
                diagnostico_texto.innerHTML =
                    '<div  class="card text-white bg-success mb-3" style="margin: 5px">\n' +
                    '  <div class="card-header">Diagnostico Nº ' + indice + '</div>\n' +
                    '  <div class="card-body">\n' +
                    '    <h5 class="card-title">' + diag.diagnostico + '</h5>\n' +
                    '    <p class="card-text">' + diag.texto + '</p>\n' +
                    '  </div>\n' +
                    '</div>';
            } else {
                diagnostico_texto.innerHTML =
                    '<div  class="card text-white bg-danger mb-3" style="margin: 5px">\n' +
                    '  <div class="card-header">Diagnostico Nº ' + indice + '</div>\n' +
                    '  <div class="card-body">\n' +
                    '    <h5 class="card-title">' + diag.diagnostico + '</h5>\n' +
                    '    <p class="card-text">' + diag.texto + '</p>\n' +
                    '  </div>\n' +
                    '</div>';
            }
            $("#diagnosticos").append(diagnostico_texto);
        }
    }

}

function setDiagnostico(texto, diagnostico) {

    const listaDiagnosticos = JSON.parse(localStorage.getItem("datos"));
    let diagObj = [];

    if (listaDiagnosticos != null) {
        for (const obj of listaDiagnosticos) {
            diagObj.push(new DiagnosticoStorage(obj))
        }
    }

    diagObj.push({texto: texto, diagnostico: diagnostico});

    localStorage.setItem('datos', JSON.stringify(diagObj));
}


function clearDiagnosticoDiv() {
    $("#diagnosticos").empty();
}


function OrdenarPreguntas(a, b) {

    const preguntaA = a.puntos;
    const preguntaB = b.puntos;


    let comparar = 0;

    if (preguntaA > preguntaB) {
        comparar = -1;
    } else if (preguntaA < preguntaB) {
        comparar = 1;
    }
    return comparar;
}

function CambiarPregunta() {

    $("#pregunta_texto").empty();

    $("#pregunta_texto").append("<h1>" + arraydePreguntas[indice_pregunta].descripcion + "</h1>")


    if (indice_pregunta < arraydePreguntas.length - 1) {
        indice_pregunta = indice_pregunta + 1;
    } else {
        diagnostico.resultado();
        indice_pregunta = 0;
        $("#pregunta_boton_no").prop("disabled", true);
        comenzarTest();
    }
}

function comenzarTest() {

    $("#pregunta_texto").empty();

    $("#pregunta_texto").append("<h1>¿ Comenzar el Test ?</h1>")
}

function login() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if ( usuario != null) {

        $("#ingreso").hide();

       let usuario_obj = new PersonaStorage(usuario);

        var usuario_texto = document.createElement('div');

        usuario_texto.innerHTML =
            '<li class="nav-item active badge bg-secondary">\n' +
            '  <a class="nav-link" href="#">Bienvenido , ' + usuario_obj.nombre + ' </a>\n' +
            '</li>';

        $('#login').append(usuario_texto);
    }
}

// VARS
let arraydePreguntas = [];
let indice_pregunta = 0;
var diagnostico = new Diagnostico();

let Listadopreguntas = [
    {
        pregunta: "¿Tenes Tos?",
        puntos: 1
    },
    {
        pregunta: "¿Tenes Frio?",
        puntos: 1
    },
    {
        pregunta: "¿Tenes Diarrea?",
        puntos: 1
    },
    {
        pregunta: "¿Tenes estornudos?",
        puntos: 1
    },
    {
        pregunta: "¿Te duele el cuerpo?",
        puntos: 1
    },
    {
        pregunta: "¿Tenes dolor de cabeza?",
        puntos: 1
    },
    {
        pregunta: "¿Tenes fiebre?",
        puntos: 2
    },
    {
        pregunta: "¿Tenes dificultades para respirar?",
        puntos: 3
    },
    {
        pregunta: "¿Tenes sintomas de fatiga?",
        puntos: 2
    },
    {
        pregunta: "¿Viajaste hace 14 dias?",
        puntos: 4
    },
    {
        pregunta: "¿Tuviste contacto directo con un paciente de Covid-19?",
        puntos: 5
    }
];


$(document).ready(function () {

    getDiagnosticos();
    comenzarTest();
    login();

    Listadopreguntas.forEach(function (value, index, array) {
        let pregunta = new Pregunta(value.pregunta, value.puntos);
        arraydePreguntas.push(pregunta);

    });

    arraydePreguntas.sort(OrdenarPreguntas);

    animacionesCards()


});

function animacionesCards() {
    cardsId = ['manosCard', 'mascarillaCard', 'copaCard', 'distanciaCard', 'estornudoCard', 'casaCard']

    for (const cardId of cardsId) {
        $("#" + cardId).fadeIn(1000);
    }
}

$("#pregunta_boton_si").click((e) => {

    if ($("#pregunta_boton_no").prop('disabled')) {
        diagnostico = new Diagnostico();
        $("#pregunta_boton_no").prop("disabled", false);
        CambiarPregunta();
    } else {
        CambiarPregunta();
        diagnostico.sumarPuntos(arraydePreguntas[indice_pregunta].puntos);
    }

});

$("#pregunta_boton_no").click((e) => {
    CambiarPregunta();
});


$("#ocultar_diagnostico_boton").click((e) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if( usuario != null)
    {
        $("#diagnosticos").toggle(500)
    }
    else {
        Swal.fire({
            icon: "error",
            title: 'Ingresar',
            text: "Para visualizar los resultados debe ingresar sus datos en el sistema",
        })
    }
;
});


$("form#userForm").submit(function (event) {

    var values = {};
    $.each($('#userForm').serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });

    let persona = new PersonaStorage(values);

    localStorage.setItem('usuario', JSON.stringify(persona));

});
