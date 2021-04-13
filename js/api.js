$(document).ready(function () {
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

    $("#paises").change(function(){

        moment.locale('es');

        var paises = $("#paises");

        if($(this).val() !== '')
        {
            $.ajax({
                url:   'https://corona.lmao.ninja/v2/countries/' + paises.val(),
                type:  'GET',
                dataType: 'json',
                success:  function (r)
                {
                    $(r).each(function(i, v){ // indice, valor
                        console.log("holaaa")
                        $("#contagiados").text(v.cases.toLocaleString());
                        $("#muertes").text(v.deaths.toLocaleString());
                        $("#recuperados").text(v.recovered.toLocaleString());
                        $("#casosporpersonas").text(v.oneCasePerPeople.toLocaleString());

                        let date = new Date(v.updated);
                        $("#fecha").text(moment(date).calendar());
                    })
                }
            });
        }
    })
});