$(document).ready(function () {

    $('#alertError').hide();
    $('#loading').hide();
    $("#button").attr("disabled", true);


    $("#btnLogout").click(function () {
        Cookies.remove('token');
        Cookies.remove('userId');
        Cookies.remove('userName');
        Cookies.remove('userEmail');
        Cookies.remove('driverSelected');

        window.location.replace('/login');
    });

    var dataSet;

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "/api/showDrivers",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "authorization": Cookies.get('token'),
            "cache-control": "no-cache"
        },
        "processData": false
    }

    $.ajax(settings).done(function (data) {
        $('#loading').show();
        dataSet = data.driversList;

    }).fail(function () {
        $('#cardTabla').hide();
        $('#alertError').show();

    });

    $('#loading').hide();


    var table = $('#tabla').DataTable({
        select: true,
        data: dataSet,
        columns: [
            { data: 'name1' },
            { data: 'name2' },
            { data: 'last_name1' },
            { data: 'last_name2' },
            { data: 'date' },
            { data: 'email' },
            { data: 'gender' },
            { data: 'status' },
            { data: 'into' },
            { data: 'id_carnet' },
            { data: 'id_internalCarnet' },
            { data: 'times' },
            { data: 'id'}

        ]
    });


    $('#tabla tbody').on('click', 'tr', function () {
        $("#button").attr("disabled", false);
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $('#button').click(function () {
        console.log(table.row('.selected').data());
        Cookies.set('driverSelected', table.row('.selected').data());
        window.location.replace('/actualizarConductores');

    });


});