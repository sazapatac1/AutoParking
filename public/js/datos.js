$(document).ready(function () {
    console.log("melo");


    $('#sig3').click(function () {

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
console.log(data);
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
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(data)
}
            $.ajax(settings).done(function (data) {

                //aca va cuando la peticion esta correcta, sin errores
		console.log("bien");

            }).fail(function (data) {
                console.log("mal");
            });
}
        
    });
    $('#sig2').click(function () {
	Console.log("ADSfg");
        var mun = $("#mun").val();
        var ca = $("#ca").val();
	var ca1 = $("#ca1").val();
        var no1 = $("#no1").val();
        var no2 = $("#no2").val();
	var data ={
                    "mun": mun,
                    "ca": ca,
                    "ca1": ca1,
                    "no1": no1,
                    "no2": no2
                }
        
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://autoparkingeafit.herokuapp.com/api/",
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

                //aca va cuando la peticion esta correcta, sin errores
		console.log("binen");

            }).fail(function (data) {
                console.log("mal");
            });

        
    });

    /*$('#sig3').click(function () {
	Console.log("ADSfg");
        var placa = $("#placa").val();
        var marca = $("#marca").val();
	var model = $("#model").val();
        var color = $("#color").val();
        var comb = $("#comb").val();

            var settings = {
                "async": false,
                "crossDomain": true,
                "url": "https://autoparkingeafit.herokuapp.com/api/signup",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache"
                },
                "data": JSON.stringify({
                    "placa": placa,
                    "marca": marca,
                    "model": model,
                    "color": color,
                    "comb": comb,
                })
            }

            $.ajax(settings).done(function (data) {

                //aca va cuando la peticion esta correcta, sin errores
		console.log("binen");

            }).fail(function (data) {
                console.log("mal");
            });

        
    });

*/

    $('#env').click(function () {
	console.log("env");
	$.ajax({
	   url:"ejemplo.csv",
	   dataType:"text",
	   success:function(data)
	   {
	    data_data = data.split(/\r?\n|\r/);
	    var celld = data_data[1].split(";");
	    console.log(celld); 
		var name1 = celld[0];
		var name2 = celld[1];
		var last_name1 = celld[2];
		var last_name2 = celld[3];
		var email = celld[4];
		var cod_es = celld[5];

		var data = JSON.stringify({
		            "name1": name1,
		            "name2": name2,
		            "last_name1": last_name1,
		            "last_name2": last_name2,
		            "email": email,
		            "cod_es": cod_es,
                	})

		console.log(JSON.stringify({"driverList":data}));
		var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://autoparkingeafit.herokuapp.com/api/registerDriverExcel",
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
                console.log("bien");
                
            }).fail(function (data) {
                console.log("mal");
            });
	    
	  }
	  });

    });
   


    $('#btnLogin').click(function () {
        window.location.replace('/signin');
    });
});
