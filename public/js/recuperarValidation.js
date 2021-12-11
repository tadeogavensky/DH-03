let recuperar = document.getElementById('recuperar')
let inputs = document.querySelectorAll('input');
let recuperarForm = document.getElementById('recuperarForm')
let email = document.getElementById('email')
let password = document.getElementById('password')
let passwordConfirmar = document.getElementById('passwordConfirmar')

let regexEmail = /\S+@\S+\.\S+/;
let regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/;

const newToast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    position: 'top',
})

let arrayCheck = [false, false, false, false,false,false]

email.onblur = function onblurEmail() {
    if (email.value.length == 0) {
        newToast.fire({
            title: "Atención",
            html: 'Debes completar el campo de <b style="color:#ab191f"> Email </b>',
            icon: "error",
            position: 'top',
            timer: 1500
        })
        return arrayCheck[0] = false
    } else {

        return arrayCheck[0] = true
    }
}
email.onchange = function onchangeEmail(e) {

    if (regexEmail.test(email.value) == false) {
        newToast.fire({
            title: 'Debes completar el campo con un email válido',
            timer: 1500,
            width: '28vw',
            icon: 'warning',
        })
        return arrayCheck[1] = false
    } else {
        newToast.fire({
            title: 'Email válido',
            timer: 1500,
            width: '13vw',
            icon: 'success',
        })
        return arrayCheck[1] = true
    }
}

password.onblur = function onblurPassword(e) {
    if (password.value.length == 0) {
        newToast.fire({
            title: "Atención",
            html: 'Debes completar el campo de <b style="color:#ab191f"> contraseña </b>',
            icon: "error",
            position: 'top',
            timer: 1500
        })
        return arrayCheck[2] = false
    } else {
        return arrayCheck[2] = true
    }
}


password.onchange = function onchangePassword(e) {

    if (regexPass.test(password.value) == false || password.value.length < 8) {
        newToast.fire({
            title: 'La contraseña debe ser o tener más de 8 carácteres y al menos un carácter especial, una letra mayúscula y una letra minúscula',
            icon: 'warning',
            timer: 3000,
            width: '32vw',
        })
        return arrayCheck[3] = false
    } else {
        newToast.fire({
            title: 'Contraseña válida',
            timer: 1500,
            width: '15vw',
            icon: 'success',
        })
        return arrayCheck[3] = true
    }
}


passwordConfirmar.onblur = function onblurConfirmarPassword(e) {
    if (passwordConfirmar.value.length == 0) {
        newToast.fire({
            title: "Atención",
            html: 'Debes completar el campo de <b style="color:#ab191f"> Repetir contraseña </b>',
            icon: "error",
            position: 'top',
            timer: 1500
        })
        return arrayCheck[4] = false;
    } else {
        return arrayCheck[4] = true;
    }
}

passwordConfirmar.onchange = function onchangeConfirmarPassword(e) {

    if (passwordConfirmar.value != password.value) {
        newToast.fire({
            title: 'Las contraseñas no coinciden',
            icon: 'warning',
            timer: 3000,
            width: '20vw',
        })
        return arrayCheck[5] = false;
    } else {
        newToast.fire({
            title: 'Las contraseñas coinciden',
            icon: 'success',
            timer: 3000,
            width: '20vw',
        })
        return arrayCheck[5] = true;
    }
}




recuperar.onmousedown = function (e) {
    e.preventDefault();


    let arrayValidado = true


    if (inputs[1].value.length == 0 || inputs[2].value.length == 0 || inputs[3].value.length == 0) {
        Swal.fire({
            title: "Error",
            html: 'Debes completar todos los campos',
            icon: "error",
            confirmButtonColor: '#ab191f'
        })
    }


    for (let i = 0; i < arrayCheck.length; i++) {

        if (arrayCheck[i] == false) {
            arrayValidado = false
        }

    }


     if (arrayValidado == true) {
        Swal.fire({
            title: "Confirmar datos",
            icon: "info",
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'black',
            confirmButtonColor: '#ab191f',
            confirmButtonText: 'Continuar',
            showCancelButton: true,
        }).then(function (result) {
            if (result.isConfirmed) {
                recuperarForm.submit();
            }

        })
    } else if(arrayValidado == false) {
        Swal.fire({
            title: "Error",
            text: "Revisa los datos e intenta nuevamente",
            icon: "error",
            confirmButtonColor: '#ab191f',
            confirmButtonText: 'OK',
        })
    }

}