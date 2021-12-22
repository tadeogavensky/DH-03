let editar = document.getElementById('editar')
let form = document.getElementById('editarForm')
let inputs = document.querySelectorAll('input')
let selects = document.querySelectorAll('select')
let textarea = document.querySelector('textarea')
let o = document.querySelectorAll('option')
let sub = document.getElementById('subcategoria')

let enableCheckbox = document.getElementById('enableCheckbox')

let regexNumber = /^[0-9]+$/

let stock = inputs[4]
let oferta = inputs[5]

stock.toggleAttribute('disabled', true)
oferta.toggleAttribute('disabled', true)

document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
    }

});



enableCheckbox.onclick = function () {
    if (stock.disabled == true || oferta.disabled == true) {
        stock.toggleAttribute('disabled', false)
        oferta.toggleAttribute('disabled', false)
    } else {
        stock.toggleAttribute('disabled', true)
        oferta.toggleAttribute('disabled', true)
    }
}









editar.onmousedown = function (e) {

    let length = 0
    let lengthText = 0
    let validate = true

    for (let i = 1; i < 3; i++) {
        length += inputs[i].value.length
        lengthText = textarea.value.length


        if (inputs[i].value.length == 0 || (selects[0].value == 'Selecciona una opción' || selects[1].value == 'Selecciona una opción' || selects[2].value == 'Selecciona una opción')) {
            validate = false
        }


        if (validate == false) {
            alert(validate)
            Swal.fire({
                title: 'Error',
                text: 'Al editar tus datos, todos los campos deben estar llenos',
                icon: 'error',
                confirmButtonColor: '#ab191f',
            })
        } else {
            if (inputs[1].value.length > 0 && inputs[1].value.length < 5) {
                Swal.fire({
                    title: 'Atención',
                    text: 'Para editar el nombre es necesario que tenga al menos 5 caracteres',
                    icon: 'error',
                    confirmButtonColor: '#ab191f',
                })
            } else if (inputs[2].value.length > 0 && !inputs[2].value.match(regexNumber)) {
                Swal.fire({
                    title: 'Atención',
                    text: 'Para editar el precio, este debe ser un número',
                    icon: 'error',
                    confirmButtonColor: '#ab191f',
                })
            } else if (inputs[2].value.length > 0 && inputs[2].value <= 0 && inputs[2].value.charAt(0) == 0) {
                Swal.fire({
                    title: 'Atención',
                    text: 'Para editar el precio, este debe ser positivo',
                    icon: 'error',
                    confirmButtonColor: '#ab191f',
                })
            } else if (textarea.value.length > 0 && textarea.value.length < 20) {
                Swal.fire({
                    title: 'Atención',
                    text: 'Para editar la descripción, esta debe tener al menos 20 caracteres',
                    icon: 'error',
                    confirmButtonColor: '#ab191f',
                })
            } else if (!(/\.(gif|jpe?g|jpg|png)$/i).test(inputs[3].value) && inputs[3].value != '') {
                Swal.fire({
                    title: 'Atención',
                    text: 'Para editar la imagen, esta debe ser de formato JPG, JPEG, PNG o GIF',
                    icon: 'error',
                    confirmButtonColor: '#ab191f',
                })
            } else if ((selects[0].value !== 'Selecciona una opción' && selects[1].value === 'Selecciona una opción')) {
                Swal.fire({
                    title: 'Atención',
                    text: 'Para editar una categoría es necesario asignarle una subcategoría',
                    icon: 'error',
                    confirmButtonColor: '#ab191f',
                })


            } else if ((length > 0 || lengthText > 0 || (selects[0].value != 'Selecciona una opción' || selects[1]
                    .value != 'Selecciona una opción' || selects[2].value != 'Selecciona una opción')) && (inputs[4].disabled == true || inputs[5].disabled == true)) {

                Swal.fire({
                    title: 'Atención',
                    text: 'Para editar un dato es necesario actualizar los checkbox',
                    icon: 'error',
                    confirmButtonColor: '#ab191f',
                })

            } else if (length > 0 || lengthText > 0 || (selects[0].value != 'Selecciona una opción' || selects[1]
                    .value != 'Selecciona una opción' || selects[2].value != 'Selecciona una opción') || (inputs[4].disabled == false || inputs[5].disabled == false && inputs[4].checked == false || inputs[4].checked == true || inputs[5].checked == false || inputs[5].checked == true)) {
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
                        form.submit();

                    }

                });
            }
        }
    }
}