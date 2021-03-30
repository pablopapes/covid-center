class DiagnosticoStorage {
    constructor(obj) {
        this.texto = obj.texto;
        this.diagnostico = obj.diagnostico.toUpperCase();
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
    let diagnosticos_div = document.getElementById("diagnosticos");

    var diagnostico_texto = document.createElement('div');


    const listaDiagnosticos = JSON.parse(localStorage.getItem("datos"));
    let arrayDiagnosticos = [];

    if (listaDiagnosticos != null) {


        for (const obj of listaDiagnosticos) {
            arrayDiagnosticos.push(new DiagnosticoStorage(obj));
        }
        let indice = 0;
        for (const diag of arrayDiagnosticos) {
            indice++;

            var diagnostico_texto = document.createElement('div');

            if (diag.diagnostico === "NEGATIVO") {
                diagnostico_texto.innerHTML =
                    '<div class="card text-white bg-success mb-3" style="margin: 5px">\n' +
                    '  <div class="card-header">Diagnostico Nº ' + indice + '</div>\n' +
                    '  <div class="card-body">\n' +
                    '    <h5 class="card-title">' + diag.diagnostico + '</h5>\n' +
                    '    <p class="card-text">' + diag.texto + '</p>\n' +
                    '  </div>\n' +
                    '</div>';
            } else {
                diagnostico_texto.innerHTML =
                    '<div class="card text-white bg-danger mb-3" style="margin: 5px">\n' +
                    '  <div class="card-header">Diagnostico Nº ' + indice + '</div>\n' +
                    '  <div class="card-body">\n' +
                    '    <h5 class="card-title">' + diag.diagnostico + '</h5>\n' +
                    '    <p class="card-text">' + diag.texto + '</p>\n' +
                    '  </div>\n' +
                    '</div>';
            }

            diagnosticos_div.appendChild(diagnostico_texto);
        }
    }

}

function setDiagnostico(texto, diagnostico, indice) {

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
    let diagnosticos_div = document.getElementById("diagnosticos");
    while (diagnosticos_div.firstChild) {
        diagnosticos_div.removeChild(diagnosticos_div.firstChild);
    }
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
    let pregunta_div = document.getElementById("pregunta_texto");

    pregunta_div.removeChild(pregunta_div.firstChild);

    var pregunta_texto = document.createElement('H1');

    pregunta_texto.innerHTML = arraydePreguntas[indice_pregunta].descripcion;

    pregunta_div.appendChild(pregunta_texto)


    if (indice_pregunta < arraydePreguntas.length - 1) {
        indice_pregunta = indice_pregunta + 1;
    } else {
        diagnostico.resultado();
        indice_pregunta = 0;
        document.getElementById("pregunta_boton_no").disabled = true;
        comenzarTest();
    }
}

function comenzarTest() {
    let pregunta_div = document.getElementById("pregunta_texto");

    pregunta_div.removeChild(pregunta_div.firstChild);

    var pregunta_texto = document.createElement('H1');

    pregunta_texto.innerHTML = "¿ Comenzar el Test ?"

    pregunta_div.appendChild(pregunta_texto)
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

    Listadopreguntas.forEach(function (value, index, array) {
        let pregunta = new Pregunta(value.pregunta, value.puntos);
        arraydePreguntas.push(pregunta);

    });

    arraydePreguntas.sort(OrdenarPreguntas);


});

$("#pregunta_boton_si").click((e) => {

    if (document.getElementById("pregunta_boton_no").disabled) {
        diagnostico = new Diagnostico();
        document.getElementById("pregunta_boton_no").disabled = false;
        CambiarPregunta();
    } else {
        CambiarPregunta();
        diagnostico.sumarPuntos(arraydePreguntas[indice_pregunta].puntos);
    }

});

$("#pregunta_boton_no").click((e) => {

    CambiarPregunta();

});

