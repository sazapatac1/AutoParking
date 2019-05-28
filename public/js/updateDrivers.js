$(document).ready(function () {


    infoUser = Cookies.get('driverSelected');
    console.log(Cookies.get('driverSelected'));
    
    if (Cookies.get('driverSelected') != undefined) {
        infoUser = JSON.parse(infoUser);
        

        fillInputsDriver(infoUser);
        requestAddress(infoUser.id_addressF);
        //requestCar(infoUser.id);


        //requestCar()
    }

    $('#cardForm1').show();
    $('#cardForm2').hide();
    $('#cardForm3').hide();

    $('#alert1').hide();
    $('#alert2').hide();


    if (Cookies.get('token') == undefined) {
        $('#alertError').show();
        $('#cardForm1').hide();
    } else {
        $('#alertError').hide();
    }


    $("#btnLogout").click(function () {
        Cookies.remove('token');
        Cookies.remove('userId');
        Cookies.remove('userName');
        Cookies.remove('userEmail');
        Cookies.remove('driverSelected');

        window.location.replace('/login');
    });

    $('#backForm1').click(function () {
        $('#cardForm1').show();
        $('#cardForm2').hide();
        $('#cardForm3').hide();
    });

    $('#backForm2').click(function () {
        $('#cardForm1').hide();
        $('#cardForm2').show();
        $('#cardForm3').hide();
    });


    $('#btnForm1').click(function () {
        $('#cardForm1').hide();
        $('#cardForm2').show();
        $('#cardForm3').hide();
    });

    $('#btnForm2').click(function () {
        $('#cardForm1').hide();
        $('#cardForm2').hide();
        $('#cardForm3').show();
    });

    $('#btnForm3').click(function () {

        var gender = $("input[name='genero']:checked").val();
        var status = $("input[name='status']:checked").val();

        var dataSet = {
            name1: $('#name1').val(),
            name2: $('#name2').val(),
            last_name1: $('#last_name1').val(),
            last_name2: $('#last_name2').val(),
            date: $('#date').val(),
            email: $('#email').val(),
            gender: gender,
            status: (status == "true"),
            id_carnet: $('#id_carnet').val(),
            id_internalCarnet: $('#id_internalCarnet').val(),
            city: $('#city').val(),
            add1: $('#add1').val(),
            add2: $('#add2').val(),
            add3: $('#add3').val(),
            add4: $('#add4').val(),
            car_plate: $('#car_plate').val(),
            model: $('#model').val(),
            color: $('#color').val(),
            gas: $('#gas').val()
        }

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/api/registerDriver",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "authorization": Cookies.get('token'),
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(dataSet)
        }

        $.ajax(settings).done(function (data) {
            $('#alert1').show();
            $('#cardForm3').hide();
        }).fail(function () {
            $('#alert2').show();
        });
    });


    function fillInputsDriver(userData) {
        console.log(userData.date);

        if(userData.gender == 'M'){
            $('#rd_male').prop('checked', true);
        }else{
            $('#rd_female').prop('checked', true);
        }

        if(userData.status == true){
            $('#rd_statusTrue').prop('checked', true);
        }else{
            $('#rd_statusFalse').prop('checked', true);
        }
            

        $('#name1').val(userData.name1);
        $('#name2').val(userData.name2);
        $('#last_name1').val(userData.last_name1);
        $('#last_name2').val(userData.last_name2);
        $('#date').val(userData.date);
        $('#email').val(userData.email);
        $('#id_carnet').val(userData.id_carnet);
        $('#id_internalCarnet').val(userData.id_internalCarnet);
    }

    function fillInputsAddress(userAddress) {
        console.log(userAddress);

        if(userAddress.city == "Sabaneta")
            $('city').val('sabaneta');
        else if(userAddress.city == "Medellín"){
            $('city').val('medellin');
        }else if(userAddress.city == "Bello"){
            $('city').val('bello');
        }

        $('#add2').val(userAddress.add2);
        $('#add3').val(userAddress.add3);
        $('#add4').val(userAddress.add4);
    }

    function fillInputsCar(userCar) {
        /**"car_plate": "ABC123",
        "model": 2005,
        "color": "Plateado",
        "gas": "Corriente",
*/



    }



    function requestAddress(id_address) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/api/getAddress",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify({
                "address_id": id_address
            })
        }

        $.ajax(settings).done(function (response) {
            fillInputsAddress(response.address);
        }).fail(function () {
            alert("ERROR, alertar al administrador");
        });
    }

    function requestCar(id_user) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/api/getCar",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
            },
            "processData": false,
            "data": JSON.stringify({
                "driver_id": id_user
            })
        }

        $.ajax(settings).done(function (response) {
            fillInputsCar(response.car);
        }).fail(function(){
            alert("ERROR, CONTACTAR AL ADMINISTRADOR");
        })

    }
});