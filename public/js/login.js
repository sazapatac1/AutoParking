$(document).ready(function () {
    $('#alert1').hide();

    $("#sendForm").click(function () {
        var email = $("#inputEmail").val();
        var pass = $("#inputPassword").val();

        if (email == '' || pass == '') {
            $('#alert1').html('Completa todos los campos, intenta de nuevo!');
            $('#alert1').show();

        } else {

            var settings = {
                "async": false,
                "crossDomain": true,
                "url": "api/signin",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache"
                },
                "data": JSON.stringify({
                    "email": email,
                    "password": pass
                })
            }

            $.ajax(settings).done(function (data) {
                Cookies.set('token', "Bearer " + data.token);
                Cookies.set('userId', data.userId);
                Cookies.set('userName', data.userName);
                Cookies.set('userEmail', data.userEmail);
                
                window.location.replace('/conductores');

            }).fail(function (data) {
                $('#alert1').html(data.responseJSON.message);
                $('#alert1').show();
            });
        }
    });

});