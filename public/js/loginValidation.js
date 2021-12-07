




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

let arrayCheck = [false, false, false, false]

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

password.onblur = function onblurPassword(e) {
    if (password.value.length == 0) {
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

password.onchange = function onchangePassword(e) {
    if (regexPass.test(password.value) == false || password.value.length < 8) {
        newToast.fire({
            title: 'La contraseña debe ser o tener más de 8 carácteres y al menos un carácter especial, una letra mayúscula y una letra minúscula',
            icon: 'warning',
            timer: 3000,
            width: '32vw',
        })
        return arrayCheck[3] = false;
    } else {
        newToast.fire({
            title: 'Contraseña válida',
            timer: 1500,
            width: '15vw',
            icon: 'success',
        })
        return arrayCheck[3] = true;
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
        }else if(arrayCheck[i]){
            form.submit()
        }else if(arrayCheck[i]){
            e.preventDefault();
            Swal.fire({
                title: "Error",
                text: "Revisa los datos e intenta nuevamente",
                icon: "error",
                confirmButtonColor: '#ab191f',
                confirmButtonText: 'OK',
            })
        }

    
}