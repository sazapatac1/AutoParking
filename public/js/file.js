$(document).ready(function () {

    if (Cookies.get('token') == undefined) {
        $('#alertError').show();
        $('#cardTabla').hide();
    } else {
        $('#alertError').hide();
    }


    $('#alert1').hide();
    $('#alert2').hide();

    $("#btnLogout").click(function () {
        Cookies.remove('token');
        Cookies.remove('userId');
        Cookies.remove('userName');
        Cookies.remove('userEmail');
        Cookies.remove('driverSelected');

        window.location.replace('/login');
    });



    
    $('#upload').click(function () {
        //Reference the FileUpload element.
        var fileUpload = $("#fileUpload")[0];

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            $('#alert1').hide();
            $('#alert2').show();
            $('#alert2').text('Porfavor ingresa un documento Excel');
        }
    });

    function ProcessExcel(data) {
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];

        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

        var array = [];

        //Add the data rows from Excel file.
        for (var i = 0; i < excelRows.length; i++) {
            array[i] = excelRows[i];
        }

        data = {
            'driverList': array
        }

        callRequest(data);

    };

    

    function callRequest(data) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "api/registerDriverExcel",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "authorization": Cookies.get('token'),
                "cache-control": "no-cache"

            },
            "processData": false,
            "data": JSON.stringify(data)
        }

        $.ajax(settings).done(function (response) {

            var dataSet = data;
            console.log(data.driverList);

            dataTable = $('#tabla').DataTable({
                select: {
                    items: 'row'
                },
                data: dataSet.driverList,
                columns: [
                    { data: 'email' },
                    { data: 'id_Carnet'}
                ]
            });

            $('#alert2').hide();
            $('#alert1').show();
            $('#alert1').text('Conductores actualizados.');

        }).fail(function () {
            $('#alert1').hide();
            $('#alert2').show();
            $('#alert2').text('Error al guardar la nueva lista de beneficiarios.');

        });

    };



});