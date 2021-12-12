let login = document.getElementById('login')
let inputs = document.querySelectorAll('input');
let formLogin = document.getElementById('formLogin')
let email = document.getElementById('email')
let password = document.getElementById('password')

let regexEmail = /\S+@\S+\.\S+/;
let regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/;


const newToast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    position: 'top',
})

let arrayCheck = [false, false, false]






email.onblur = function onblurEmail() {
    if (email.value.length == 0) {
        newToast.fire({
            title: "Atención",
            html: 'Debes completar el campo de <b style="color:#ab191f"> Email </b>',
            icon: "error",
            position: 'top',
            timer: 1500
        })
        return arrayCheck[0] = false;
    } else {

        return arrayCheck[0] = true;
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
        return arrayCheck[1] = false;
    } else {
        newToast.fire({
            title: 'Email válido',
            timer: 1500,
            width: '13vw',
            icon: 'success',
        })
        return arrayCheck[1] = true;
    }
}

password.onmouseleave = function onblurPassword(e) {

    if (password.value.length <= 0) {
        newToast.fire({
            title: "Atención",
            html: 'Debes completar el campo de <b style="color:#ab191f"> contraseña </b>',
            icon: "error",
            position: 'top',
            timer: 1500
        })
        return arrayCheck[2] = false;
    } else {
        return arrayCheck[2] = true;
    }
}


login.onmousedown = function (e) {
    e.preventDefault();

   

    if (inputs[1].value.length == 0 || inputs[2].value.length == 0) {
        Swal.fire({
            title: "Error",
            html: 'Debes completar todos los campos',
            icon: "error",
            confirmButtonColor: '#ab191f'
        })
    } else {



        let arrayValidado = true

        for (let i = 0; i < arrayCheck.length; i++) {

            if (arrayCheck[i] == false) {
                arrayValidado = false
            }

        }

        if (arrayValidado == true) {
            form.submit()
        } else if (arrayValidado == false || (inputs[3] == null)) {
            Swal.fire({
                title: "Error",
                text: "Revisa los datos e intenta nuevamente",
                icon: "error",
                confirmButtonColor: '#ab191f',
                confirmButtonText: 'OK',
            })
        }

    }
}