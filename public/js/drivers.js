$(document).ready(function () {

    $('#alertError').hide();

    $("#btnLogout").click(function () {
        Cookies.remove('token');
        Cookies.remove('userId');
        Cookies.remove('userName');
        Cookies.remove('userEmail');

        window.location.replace('/login');
    });

    var dataSet;

    var settings = {
        "async": true,
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
        dataSet = data.driverList;
        console.log(data);


    }).fail(function () {

        $('#cardTabla').hide();
        $('#alertError').show();

    });

    /**dataSet = [
        {
            'name1': "hola",
            'name2': "hola",
            'last_name1': "hola",
            'last_name2': "hola",
            'date': "hola",
            'email': "hola",
            'gender': "hola",
            'status': "hola",
            'into': "hola",
            'id_carnet': "hola",
            'id_internalCarnet': "hola",
            'times': "hola"
          
        },
        {
            'name1': "hola",
            'name2': "hola",
            'last_name1': "hola",
            'last_name2': "hola",
            'date': "hola",
            'email': "hola",
            'gender': "hola",
            'status': "hola",
            'into': "hola",
            'id_carnet': "hola",
            'id_internalCarnet': "hola",
            'times': "hola"
            
        }, {
            'name1': "hola",
            'name2': "hola",
            'last_name1': "hola",
            'last_name2': "hola",
            'date': "hola",
            'email': "hola",
            'gender': "hola",
            'status': "hola",
            'into': "hola",
            'id_carnet': "hola",
            'id_internalCarnet': "hola",
            'times': "hola",
            
        }
    ]
    */
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
            { data: 'times' }
        ]

    });


    $('#tabla tbody').on('click', 'tr', function () {
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