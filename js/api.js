$(document).ready(function () {

    var ctx = $("#myChart");
    var myChart = new Chart(ctx, {
        type: 'doughnut', data: {
            labels: ['Contagios', 'Recuperados', 'Muertes'], datasets: []
        }
    });

    var ctx2 = $("#myChart2");
    var myChart2 = new Chart(ctx2, {
        type: 'bar', data: {
            labels: ['Contagios', 'Recuperados', 'Muertes'], datasets: []
        }
    });

    var paises = $("#paises");

    paises.append('<option value="0">Seleccione un pais</option>');

    $.ajax({
        url: 'https://corona.lmao.ninja/v2/countries',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            $(response).each(function (i, v) {
                paises.append('<option value="' + v.country + '">' + v.country + '</option>');
            })
        }
    });

    $("#paises").change(function () {

        moment.locale('es');

        var paises = $("#paises");

        if ($(this).val() !== '') {
            $.ajax({
                url: 'https://corona.lmao.ninja/v2/countries/' + paises.val(),
                type: 'GET',
                dataType: 'json',
                success: function (r) {
                    $(r).each(function (i, v) { // indice, valor
                        $("#contagiados").text(v.cases.toLocaleString());
                        $("#muertes").text(v.deaths.toLocaleString());
                        $("#recuperados").text(v.recovered.toLocaleString());
                        $("#casosporpersonas").text(v.oneCasePerPeople.toLocaleString());

                        let date = new Date(v.updated);
                        $("#fecha").text(moment(date).calendar());

                        let dataset = [{
                            label: 'Estadisticas ' + v.country,
                            data: [v.cases, v.recovered, v.deaths],
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(0, 230, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(0, 230, 64, 1)',
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 1
                        }]

                        myChart.data.datasets = dataset;
                        myChart2.data.datasets = dataset;

                        myChart.update();
                        myChart2.update();

                    })
                }
            });
        }
    })


});