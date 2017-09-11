function compareDates(initialDate, finalDate) {
    var date1 = new Date(
        initialDate.getFullYear(),
        initialDate.getMonth(),
        initialDate.getDate()
      ),
      date2 = new Date(
        finalDate.getFullYear(),
        finalDate.getMonth(),
        finalDate.getDate()
      );

    if (date1.valueOf() < date2.valueOf()) {
      return 'before';
    } else if (date1.valueOf() == date2.valueOf()) {
      return 'equal';
    } else {
      return 'after';
    }
}

$(document).ready(function () {
    /* jQuery validator config
     ---------------------------------------------------------------------------*/
    // Mensajes de error
    jQuery.extend(jQuery.validator.messages, {
        required: "Este campo es obligatorio",
        remote: "Please fix this field",
        email: "Ingresa una dirección de correo válida",
        url: "Ingresa una URL válida",
        date: "Ingresa una fecha válida",
        dateISO: "Ingresa una fecha válida (ISO)",
        number: "Ingresa un número válido",
        digits: "Solo se permiten números dígitos",
        creditcard: "Ingresa un número de tarjeta válido",
        equalTo: "Los valores deben coincidir",
        accept: "Please enter a value with a valid extension",
        maxlength: jQuery.validator.format("No ingreses más de {0} caracteres"),
        minlength: jQuery.validator.format("Ingresa al menos {0} caracteres"),
        rangelength: jQuery.validator.format("El texto debe tener entre {0} y {1} caracteres"),
        range: jQuery.validator.format("Ingresa un valor entre {0} y {1}"),
        max: jQuery.validator.format("Ingresa un valor menor o igual que {0}"),
        min: jQuery.validator.format("Ingresa un valor mayor o igual que {0}")
    });

    jQuery.validator.addMethod("checkDateTime", function (value, element) {
      var date = new Date(),
          actual_time = (date.getHours() * 60) + date.getMinutes(),
          form = $(element).closest('form'),
          selected_day = $(form.find('[data-date]')).datepicker('getDate'),
          hours, minutes, time, total_minutes;

      if ($('#hourInput').length) {
          hours = parseInt($('#hourInput').val());
          minutes = parseInt($('#timeInput').val());
          time = $('#reservation-time-button').val();
      } else {
          hours = parseInt(form.find('.hour-input').val());
          minutes = parseInt(form.find('.minute-input').val());
          time = $('.reservation-time-button').val();
      }

      total_minutes = (hours * 60) + minutes;
      if (time == 'PM') {
        total_minutes += 720;
      }
      // Validamos que este dentro del horario de servicio
      // 9am - 8pm
      if (total_minutes < 540 || total_minutes > 1200) {
        return false; // No esta dentro del horario
      } else if (compareDates(date, selected_day) == 'equal') { // Es el mismo día
        if ((actual_time + 45) < total_minutes) {
          return true;
        } else {
          return false; // No hay suficiente espacio entre la hora actual y la cita
        }
      } else if (compareDates(date, selected_day) == 'before') {
        return true; // El día seleccionado es posterior
      } else {
        return false; // El día seleccionado es anterior
      }
    }, "La hora no es válida");

    jQuery.validator.setDefaults({
        highlight: function (element, errorClass) {
            $(element).removeClass(errorClass);
        },
        submitHandler: function (form) {
            var isAJAX = $(form).attr('data-ajax-form');
            if ($(form).find('.dependency-base')) {
                if (!$(form).find('.dependency-base').is(':checked')) {
                    var siblingFields = $(form).find('.dependency-base')
                        .closest('.input-container')
                        .siblings('.input-container')
                        .find('input, select').toArray();
                    siblingFields.forEach(function (elem) {
                        $(elem).val(null);
                    });
                }
            }
            if ($(form).find('.form-loader').length) {
                $(form).find('.form-loader').show();
            }
            if ($(form).find('.form-alert').length) {
                $(form).find('.form-alert').hide();
            }
            if (typeof isAJAX === typeof undefined || isAJAX === false) {
                form.submit();
            }
        }
    });

    $('#cancel-new-hobbie').click(function () {
        $(this).closest('form')[0].reset();
    });

    $('#cancel-new-hobbie').click(function () {
        $(this).closest('form')[0].reset();
    });

    $('#new-hobbie-form').submit(function () {
        $('#dashboard-hobbies')[0].reset();
    });

    /* Special forms
     ---------------------------------------------------------------------------*/
    $('.dashboard-special-form').toArray().forEach(function (elem, index) {
        var form = $(elem),
            pictures = [],
            pictureContainers = null;

        if (form.find('.form-image').length) {
            pictureContainers = form.find('.form-image');
            pictureContainers.toArray().forEach(function (elem, index) {
                pictures[index] = $(elem).css('background-image');
                $($(elem).find('input[type="file"]')).change(function (e) {
                    $(elem).css('background-image', 'url("' + URL.createObjectURL(e.target.files[0]) + '")');
                });
            });
        }

        form.find('.edit-button').click(function () {
            if (form.attr('id') == 'dashboard-adult-form') {
                form.find('.dashboard-box').css('align-items', 'flex-start');
                form.find('.dashboard-box-title')
                    .removeClass('border')
                    .css('align-items', 'flex-start');
                form.find('.dashboard-box-content').removeClass('margin-top-30');
            }
            $(this).addClass('hide');
            $(this).siblings('.cancel-button').removeClass('hide');
            $(this).siblings('.send-button').removeClass('hide');
            form.find('.input-container .fields-container')
                .removeClass('hide');
            form.find('.input-container .value-container')
                .addClass('hide');
            if (pictureContainers) {
                pictureContainers.find('label')
                    .removeClass('hide');
            }
            form.find('.client-information-container')
                .css('width', '60%');
            form.find('.long-form-auxiliar-button')
                .removeClass('hide');
        });

        form.find('.cancel-button').click(function () {
            if (form.attr('id') == 'dashboard-adult-form') {
                form.find('.dashboard-box').css('align-items', 'center');
                form.find('.dashboard-box-title')
                    .addClass('border')
                    .css('align-items', '');
                form.find('.dashboard-box-content').addClass('margin-top-30');
            }
            $(this).addClass('hide');
            $(this).siblings('.edit-button').removeClass('hide');
            $(this).siblings('.send-button').addClass('hide');
            form[0].reset();
            if ($('.dependency-base').is(':checked')) {
                $('.dependency-base')
                    .closest('.input-container')
                    .siblings('.input-container')
                    .show();
            } else {
                $('.dependency-base')
                    .closest('.input-container')
                    .siblings('.input-container')
                    .hide();
            }
            form.find('.input-container .fields-container')
                .addClass('hide');
            form.find('.input-container .value-container')
                .removeClass('hide');
            if (pictureContainers) {
                pictureContainers.children('label')
                    .addClass('hide');
                pictureContainers.toArray().forEach(function (elem, index) {
                    $(elem).css('background-image', pictures[index]);
                });
            }
            form.find('.client-information-container')
                .css('width', '');
            form.find('.long-form-auxiliar-button')
                .addClass('hide');
        });
    });

    if (!$('.dependency-base').is(':checked')) {
        $('.dependency-base')
            .closest('.input-container')
            .siblings('.input-container')
            .hide();
    }
    $('.dependency-base').change(function () {
        var dependentFields = $(this)
            .closest('.input-container')
            .siblings('.input-container');
        if ($(this).is(':checked')) {
            dependentFields.show();
        } else {
            dependentFields.hide();
        }
    });

    /* Contract Adult Form
     ---------------------------------------------------------------------------*/
    $('#contract-adult-form').validate({
        rules: {
            name: {
                required: true
            },
            last_name: {
                required: true
            },
            birthday: {
                required: true
            },
            description: {
                required: true
            },
            doctor_name: {
                required: true
            },
            doctor_phone: {
                required: true,
                number: true
            },
            doctor_cp: {
                required: true
            }
        }
    });

    /* Contract Location Form
     ---------------------------------------------------------------------------*/
    $('#contract-location-form').validate({
        rules: {
            street: {
                required: true
            },
            num_ext: {
                required: true,
                number: true
            },
            num_int: {
                required: false,
                number: true
            },
            colony: {
                required: true
            },
            delegation: {
                required: true
            },
            cp: {
                required: true,
                number: true
            },
            address_reference: {
                required: true
            },
            day_1: {
                required: true
            },
            day_1_hour: {
                required: true
            },
            start_date: {
                required: true
            },
            start_time: {
                required: true
            }
        }
    });

    /* Contract Form
     ---------------------------------------------------------------------------*/
    $('#contract-form').validate({
        rules: {
            "contract-service-workshop": {
                required: true,
                minlength: 1
            },
            "contract-service": {
                required: true,
                minlength: 1
            }
        },
        messages: {
            "contract-service-workshop": "Selecciona al menos 1 Taller",
            "contract-service": "Selecciona 1 Servicio"
        }
    });

    /* Request Password Form
     ---------------------------------------------------------------------------*/
    $('#passwd-form').validate({
        rules: {
            new_password_1: {
                required: true
            },
            new_password_2: {
                required: true,
                equalTo: "#id_new_password_1"
            }
        }
    });

    /* Request Password Form
     ---------------------------------------------------------------------------*/
    $('#passwd-reset-form').validate({
        rules: {
            new_password1: {
                required: true
            },
            new_password2: {
                required: true,
                equalTo: "#id_new_password1"
            }
        }
    });

    /* Request Password Request Form
     ---------------------------------------------------------------------------*/
    $('#passwd-reset-req-form').validate({
        rules: {
            email: {
                email: true,
                required: true
            }
        }
    });

    /* Signup Form
     ---------------------------------------------------------------------------*/
    $('#signup-form').validate({
        rules: {
            email: {
                email: true,
                required: true
            },
            password_1: {
                required: true
            },
            password_2: {
                required: true,
                equalTo: "#id_password_1"
            },
            name: {
                required: true
            },
            last_name: {
                required: true
            }
        }
    });

    /* Login Form
     ---------------------------------------------------------------------------*/
    $('#login-form').validate({
        rules: {
            username: {
                email: true
            }
        }
    });

    /* Date Form
     ---------------------------------------------------------------------------*/
    $('#dateForm').validate({
        groups: {
            timeGroup: "hour minute"
        },
        rules: {
            hour: {
                number: true,
                maxlength: 12,
                minlength: 1,
                required: true
            },
            minute: {
                checkDateTime: true,
                number: true,
                maxlength: 59,
                minlength: 0,
                required: true
            },
            number: {
                number: true,
                maxlength: 10
            }
        }
    });

    /* Pay Form
     ---------------------------------------------------------------------------*/
    $('#pay-form').validate();

    /* Contact Form
     ---------------------------------------------------------------------------*/
    $('#contactForm').validate({
        errorClass: "errorWhite",
        onkeyup: false,
        onfocusout: false
    });

    /* Join Form
     ---------------------------------------------------------------------------*/
    $('#joinForm').validate({
        rules: {
            age: {
                number: true,
                maxlength: 2
            },
            phone_movile: {
                number: true,
                maxlength: 10
            },
            phone: {
                number: true,
                maxlength: 10
            }
        }
    });

    /* Dashboard User Information Form
     ---------------------------------------------------------------------------*/
    $('#dashboard-user-form').validate({
        rules: {
            email: {
                email: true,
                required: true
            },
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
            contact_number: {
                number: true
            }
        }
    });

    /* Dashboard Password Form
     ---------------------------------------------------------------------------*/
    $('#dashboard-password-form').validate({
        rules: {
            current_password: {
                required: true
            },
            new_password_1: {
                required: true
            },
            new_password_2: {
                required: true,
                equalTo: "#id_new_password_1"
            }
        }
    });

    /* Dashboard Adult Form
     ---------------------------------------------------------------------------*/
    $('#dashboard-adult-form').validate({
        rules: {
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
            birthday: {
                required: true
            },
            street: {
                required: true
            },
            num_ext: {
                required: true,
                number: true
            },
            num_int: {
                required: false,
                number: true
            },
            colony: {
                required: true
            },
            delegation: {
                required: true
            },
            postal_code: {
                required: true,
                number: true
            },
            reference: {
                required: true
            }
        }
    });

    /* Dashboard Preferences Form
     ---------------------------------------------------------------------------*/
    $('#dashboard-preferences-form').validate({
        rules: {
            familiar_structure: {
                required: true
            },
            personality: {
                required: true
            }
        }
    });

    /* Dashboard Medical Form
     ---------------------------------------------------------------------------*/
    $('#dashboard-medical-form-part-1').validate({
        rules: {
            blood_type: {
                required: true
            }
        }
    });

    $('#dashboard-medical-form-part-2').validate({
        rules: {
            emergency_contact_1_full_name: {
                required: true
            },
            emergency_contact_1_relation: {
                required: true
            },
            emergency_contact_1_home_phone: {
                required: true,
                number: true
            },
            emergency_contact_1_cell_phone: {
                required: true,
                number: true
            },
            emergency_contact_2_full_name: {
                required: true
            },
            emergency_contact_2_relation: {
                required: true
            },
            emergency_contact_2_home_phone: {
                required: true,
                number: true
            },
            emergency_contact_2_cell_phone: {
                required: true,
                number: true
            }
        }
    });

    $('#dashboard-medical-form-part-3').validate({
        rules: {
            knows_pda: {
                required: false
            },
            exercise_pda: {
                required: false
            }
        }
    });

    $('#dashboard-medical-form-part-4').validate({
        rules: {
            has_medical_insurance: {
                required: false
            },
            insurance_company: {
                required: '#id_has_medical_insurance:checked'
            },
            policy_number: {
                required: '#id_has_medical_insurance:checked'
            },
            policy_expiration_date: {
                required: '#id_has_medical_insurance:checked'
            }
        }
    });

    $('#dashboard-medical-form-part-5').validate({
        rules: {
            has_social_security: {
                required: false
            },
            social_security_number: {
                required: '#id_has_social_security:checked'
            }
        }
    });

    $('#dashboard-medical-form-part-6').validate({
        rules: {
            doctor_first_name: {
                required: true
            },
            doctor_last_name: {
                required: true
            },
            doctor_home_phone: {
                required: true,
                number: true
            },
            doctor_cell_phone: {
                required: true,
                number: true
            },
            doctor_working_institution: {
                required: true
            },
            doctor_professional_id: {
                required: true
            }
        }
    });

    $('#dashboard-medical-form-part-7').validate({
        rules: {
            diseases: {
                required: true
            },
            current_medications: {
                required: true
            },
            drug_allergy: {
                required: true
            },
            food_allergy: {
                required: true
            }
        }
    });
    /* Cards list
     ---------------------------------------------------------------------------*/
    $('.updatecard-form').validate({
        submitHandler: function (form) {
            $('#addCardLoader').show();
            form.submit();
        }
    });
});