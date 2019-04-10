$(document).ready(function () {

    // Anpassat objekt för att spåra om ingångar är giltiga eller inte
    let validation = {
        name: false, // name field
        email: false, // Email field
        phone: false, // phone field
        adress: false, // phone field
        list: false
    };


    function vCheck() {

        if (validation.name && validation.email &&
             validation.phone && validation.adress &&
              validation.list) {
            $('#purchase').removeAttr('disabled');
        } else {
            $('#purchase').attr('disabled', true);
        }
    }

    /* Validering för namnet */
    $('#inputname4').on('input', function () {
        let name = $(this).val();


        function message(body) {
            $('#inputname4-error').text(body).show();
        };


        function hide() {
            $('#inputname4-error').hide();
        };


        if (name.length < 1) {
            message('Detta fält är obligatoriskt.');
            validation.name = false;
            vCheck();
        } else {
            hide();
            validation.name = true;
            vCheck();
            let testExp = new RegExp(/^[a-zA-Z ]+$/);

            if (!testExp.test(name)) {
                message('Namnet får inte ha specialtecken');
                validation.name = false;
                vCheck();
            } else {
                hide();
                validation.name = true;
                vCheck();

                if (name.length < 4 || name.length > 20) {
                    message('Namnet måste vara minst 4 tecken men inte mer än 20');
                    validation.name = false;
                    vCheck();
                } else {
                    hide();
                    validation.name = true;
                    vCheck();
                }
            }
        }
    });




    // Validering för e-postinmatning
    $('#inputEmail4').on('input', function () {
        let email = $(this).val();


        function message(body) {
            $('#inputEmail4-error').text(body).show();
        };


        function hide() {
            $('#inputEmail4-error').hide();
        };


        if (email.length < 1) {
            message('Detta fält är obligatoriskt.');
            validation.email = false;
            vCheck();
        } else {
            hide();
            validation.email = true;
            vCheck();
            let testExp = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/);

            if (!testExp.test(email)) {
                message('Måste vara ett giltigt e-postmeddelande');
                validation.email = false;
                vCheck();
            } else {
                hide();
                validation.email = true;
                vCheck();

                if (email.length < 10 || email.length > 40) {
                    message('Måste vara minst 10 tecken men högst 40');
                    validation.email = false;
                    vCheck();
                } else {
                    hide();
                    validation.email = true;
                    vCheck();
                }
            }
        }
    });


    // Validation for Phone Input
    $('#inputPhone4').on('input', function () {
        let phone = $(this).val();


        function message(body) {
            $('#inputPhone4-error').text(body).show();
        };


        function hide() {
            $('#inputPhone4-error').hide();
        };


        if (phone.length < 1) {
            message('Detta fält är obligatoriskt.');
            validation.phone = false;
            vCheck();
        } else {
            hide();
            validation.phone = true;
            vCheck();
            let testExp = new RegExp(/[0-9]/);

            if (!testExp.test(phone)) {
                message('Bara siffror');
                validation.phone = false;
                vCheck();
            } else {
                hide();
                validation.phone = true;
                vCheck();

                if (phone.length < 7 || phone.length > 10) {
                    message('Måste vara minst 7 nummer men högst 10');
                    validation.phone = false;
                    vCheck();
                } else {
                    hide();
                    validation.phone = true;
                    vCheck();
                }
            }
        }
    });



    // Validation for Adress Input
    $('#inputAddress').on('input', function () {
        let adress = $(this).val();


        function message(body) {
            $('#inputAddress-error').text(body).show();
        };


        function hide() {
            $('#inputAddress-error').hide();
        };


        if (adress.length < 1) {
            message('Detta fält är obligatoriskt.');
            validation.adress = false;
            vCheck();
        } else {
            hide();
            validation.adress = true;
            vCheck();
            let testExp = new RegExp(/[^a-h-A-Z-0-9 ]/g);

            if (!testExp.test(adress)) {
                message('Måste vara en giltig adress');
                validation.adress = false;
                vCheck();
            } else {
                hide();
                validation.adress = true;
                vCheck();
                if (adress.length < 7 || adress.length > 30) {
                    message('Måste vara minst 7 tecken men högst 30');
                    validation.adress = false;
                    vCheck();
                } else {
                    hide();
                    validation.adress = true;
                    vCheck();
                }
            }
        }
    });


    let list = $("#orderInfo").children()
    if (list[0] == undefined) {
        validation.list = false;
    } else {
        validation.list = true;
    }
    /* console.log(list); */







}) // Ready