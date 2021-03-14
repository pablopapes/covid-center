function Pregunta(descripcion, puntos) {
    this.descripcion = descripcion;
    this.puntos = puntos;
}

function Diagnostico() {
    this.sumatoria = 0;
    this.resultado = function () {
        let resultado = "";
        if (this.sumatoria < 8) {
            resultado = "NO tienes sintomas de covid";
        } else {
            resultado = "Puede que tengas sintomas de covid";
        }
        alert(resultado);
    };

    this.sumarPuntos = function (puntos) {
        this.sumatoria = this.sumatoria + puntos;
    };

}

function OrdenarPreguntas(a, b) {

    const preguntaA = a.puntos;
    console.log(preguntaA)
    const preguntaB = b.puntos;
    console.log(preguntaA)

    let comparar = 0;

    if (preguntaA > preguntaB) {
        comparar = -1;
    } else if (preguntaA < preguntaB) {
        comparar = 1;
    }
    return comparar;
}

let arraydePreguntas = [];
let sumatoria = 0;


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


Listadopreguntas.forEach(function (value, index, array) {
    let pregunta = new Pregunta(value.pregunta, value.puntos);
    arraydePreguntas.push(pregunta);

});

arraydePreguntas.sort(OrdenarPreguntas);

diagnostico = new Diagnostico(0);

arraydePreguntas.forEach(function (value, index, array) {

    let respuesta = prompt(value.descripcion);
    if (respuesta.toUpperCase() === "SI") {
        diagnostico.sumarPuntos(value.puntos);
    }
});


diagnostico.resultado();