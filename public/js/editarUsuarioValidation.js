let editarUsuario = document.getElementById('editarUsuario')
let formEditarUsuarioForm = document.getElementById('editarUsuarioForm')
let inputs = document.querySelectorAll('input')
let nombre = document.getElementById('nombreEditado')
let apellido = document.getElementById('apellidoEditado')
let usuario = document.getElementById('usuarioEditado')
let domicilio = document.getElementById('domicilioEditado')
let email = document.getElementById('emailEditado')
let foto = document.getElementById('fotoPerfil')

var regexEmail = /\S+@\S+\.\S+/;
var regexName = /^[A-Z]+$/i

document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
    }
    
});



editarUsuario.onmousedown = function (e) {
    let length = 0
    let validate = true
    for (let i = 3; i < 8; i++) {
        length += inputs[i].value.length
        if(inputs[i].value.length == 0){
            validate = false
        }
        if (validate == false) {
            Swal.fire({
                title: 'Error',
                text: 'Al editar tus datos, todos los campos deben estar llenos',
                icon: 'error',
                confirmButtonColor: '#ab191f',
            })

        } else {
            if (nombre.value.length > 0 && regexName.test(nombre.value) == false) {
                Swal.fire({
                    title: "Atención",
                    html: 'El nombre debe contener solo letras, no números',
                    icon: "error",
                    confirmButtonColor: '#ab191f',
                })
            } else if (nombre.value.length > 0 && nombre.value.length < 2) {
                Swal.fire({
                    title: "Atención",
                    html: 'El nombre debe tener al menos 2 caracteres',
                    icon: "error",
                    confirmButtonColor: '#ab191f',
                })
            } else if (apellido.value.length > 0 && regexName.test(apellido.value) == false) {
                Swal.fire({
                    title: "Atención",
                    html: 'El apellido debe contener solo letras, no números',
                    icon: "error",
                    confirmButtonColor: '#ab191f',
                })
            } else if (apellido.value.length > 0 && apellido.value.length < 2) {
                Swal.fire({
                    title: "Atención",
                    html: 'El apellido debe tener al menos 2 caracteres',
                    icon: "error",
                    confirmButtonColor: '#ab191f',
                })
            } else if (regexEmail.test(email.value) == false && email.value.length > 0) {
                Swal.fire({
                    title: "Atención",
                    html: 'Debes completar el campo con un email válido',
                    icon: "error",
                    confirmButtonColor: '#ab191f',
                })
            } else if (!(/\.(gif|jpe?g|jpg|png)$/i).test(foto.value) && foto.value != '') {
                Swal.fire({
                    title: "Atención",
                    text: 'Para editar la imagen, esta debe ser de formato JPG, JPEG, PNG o GIF',
                    icon: "error",
                    confirmButtonColor: '#ab191f',
                })
            } else if (length > 0) {
                Swal.fire({
                    title: 'Confirmar datos',
                    icon: 'info',
                    cancelButtonText: 'Cancelar',
                    cancelButtonColor: 'black',
                    confirmButtonColor: '#ab191f',
                    confirmButtonText: 'Continuar',
                    showCancelButton: true,
                }).then(function (result) {

                    if (result.isConfirmed) {
                        formEditarUsuarioForm.submit();

                    }

                });
            }

        }
    }
}