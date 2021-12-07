let editarUsuario = document.getElementById('editarUsuario')
let formEditarUsuarioForm = document.getElementById('editarUsuarioForm')
let inputs = document.querySelectorAll('input')
let email = document.getElementById('emailEditado')
let foto = document.getElementById('fotoPerfil')

var regexEmail = /\S+@\S+\.\S+/;



editarUsuario.onmousedown = function (e) {
    let length = 0

    for (let i = 3; i < 9; i++) {
        length += inputs[i].value.length

        if (length <= 0) {
            Swal.fire({
                title: 'Error',
                text: 'No estas ingresando ningún dato por lo que no puedes actualizar nada',
                icon: 'error',
                confirmButtonColor: '#ab191f',
            })

        } else {
            if (inputs[3].value.length > 0 && inputs[3].value.length < 2) {
                Swal.fire({
                    title: "Atención",
                    html: 'El nombre debe ser de al menos 2 caracteres',
                    icon: "error",
                    confirmButtonColor: '#ab191f',
                })
            } else if (inputs[4].value.length > 0 && inputs[4].value.length < 2) {
                Swal.fire({
                    title: "Atención",
                    html: 'El apellido debe ser de al menos 2 caracteres',
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
                    text: 'Los campos que no has ingresado mantendrán su información previa',
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