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
        let muertes = document.getElementById("muertes");
        let contagiados = document.getElementById("contagiados");
        let recuperados = document.getElementById("recuperados");
        let casosporpersonas = document.getElementById("casosporpersonas");
        let fecha = document.getElementById("fecha");

        if($(this).val() !== '')
        {
            $.ajax({
                url:   'https://corona.lmao.ninja/v2/countries/' + paises.val(),
                type:  'GET',
                dataType: 'json',
                success:  function (r)
                {
                    $(r).each(function(i, v){ // indice, valor
                        contagiados.textContent = v.cases.toLocaleString();
                        muertes.textContent = v.deaths.toLocaleString();
                        recuperados.textContent = v.recovered.toLocaleString();
                        casosporpersonas.textContent = v.oneCasePerPeople.toLocaleString();

                        let date = new Date(v.updated);
                        fecha.textContent =  moment(date).calendar();
                    })
                }
            });
        }
    })
});