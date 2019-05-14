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
        dataSet = data;

        $('#tabla').DataTable({
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
                { data: 'city' },
                { data: 'add1' },
                { data: 'add2' },
                { data: 'add3' },
                { data: 'add4' },
                { data: 'car_plate' },
                { data: 'model' },
                { data: 'color' },
                { data: 'gas' }
            ]

        });

        }).fail(function () {
            
            $('#cardTabla').hide();
            $('#alertError').show();
            
        });



    


});