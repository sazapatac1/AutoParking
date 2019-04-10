$(document).ready(function () {
    console.log("melo");


    $('#sig').click(function () {

        console.log("ando por aca??");
        var name1 = $("#pnombre").val();
        var name2 = $("#snombre").val();
        var last_name1 = $("#papell").val();
        var last_name2 = $("#sapell").val();
        var email = $("#correo").val();
        var gender = $("#genero").val();
        var state = $("#estado").val();
        var id_internalCarnet = $("#codfis").val();
        var id_carnet = $("#cod").val();

        var data = {
            "name1": name1,
            "name2": name2,
            "last_name1": last_name1,
            "last_name2": last_name2,
            "email": email,
            "gender": gender,
            "state": state,
            "id_internalCarnet": id_internalCarnet,
            "id_carnet": id_carnet
        }

        if (name1 == '' || last_name1 == '' || email == '' || id_carnet == '' || id_internalCarnet == '') {
            console.log("Campos malos, completelos nuevamente");
        } else {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://autoparkingeafit.herokuapp.com/api/registerDriver",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "400a153e-2435-400e-816b-cfc89dd1d439"
                },
                "processData": false,
                "data": JSON.stringify(data)
            }

            $.ajax(settings).done(function (data) {
                console.log("Usuario creado");

            }).fail(function (data) {
                console.log("Fallo en la peticion");
            });
        }
    });
});
