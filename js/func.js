function Pregunta(descripcion, puntos) {
    this.descripcion = descripcion;
    this.puntos = puntos;
}

function Diagnostico() {
    this.sumatoria = 0;
    this.resultado = function () {
        let resultado = "";
        let icono = "";
        if (this.sumatoria < 8) {
            resultado = "NO tienes sintomas de covid";
            icono = "success";
        } else {
            resultado = "Puede que tengas sintomas de covid";
            icono = "error";
        }
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

    var pregunta_texto= document.createElement('H1');

    pregunta_texto.innerHTML = arraydePreguntas[indice_pregunta].descripcion;

    pregunta_div.appendChild(pregunta_texto)


    if ( indice_pregunta < arraydePreguntas.length - 1) {
        indice_pregunta = indice_pregunta + 1;
    }
    else {
        diagnostico.resultado();
        indice_pregunta = 0;
        document.getElementById("pregunta_boton_no").disabled = true;
        comenzarTest();
    }
}

function comenzarTest() {
    let pregunta_div = document.getElementById("pregunta_texto");

    pregunta_div.removeChild(pregunta_div.firstChild);

    var pregunta_texto= document.createElement('H1');

    pregunta_texto.innerHTML = "¿ Comenzar el Test ?"

    pregunta_div.appendChild(pregunta_texto)
}

// VARS
let arraydePreguntas = [];
let indice_pregunta= 0;


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


$(document).ready(function(){

    comenzarTest();

    Listadopreguntas.forEach(function (value, index, array) {
        let pregunta = new Pregunta(value.pregunta, value.puntos);
        arraydePreguntas.push(pregunta);

    });

    arraydePreguntas.sort(OrdenarPreguntas);

    diagnostico = new Diagnostico();

});

$("#pregunta_boton_si").click((e) => {

    if( document.getElementById("pregunta_boton_no").disabled) {
        document.getElementById("pregunta_boton_no").disabled = false;
        CambiarPregunta();
    }
    else {
        CambiarPregunta();
        diagnostico.sumarPuntos(arraydePreguntas[indice_pregunta].puntos);
    }

});

$("#pregunta_boton_no").click((e) => {

    CambiarPregunta();

});

