let agregar = document.getElementById('agregar')
let form = document.getElementById('agregarForm')
let inputs = document.querySelectorAll('input')
let selects = document.querySelectorAll('select')
let textarea = document.querySelector('textarea')
let imagen = document.getElementById('imagen')


let arrayCheck = [false,false,false,false,false,false,false,false,false,false]

let regexNumber = /^[0-9]+$/

const newToast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    position: 'top',
})

inputs[0].onblur = function () { //Nombre
    if (inputs[0].value.length == 0) {
        newToast.fire({
            title: 'Atención',
            position: 'center',
            html: 'Debes completar el campo de <b style="color:#ab191f"> nombre </b>',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
        })
        return arrayCheck[0] = false
    } else {
        return arrayCheck[0] = true
    }
}

inputs[0].onchange = function () { //Nombre
    if (inputs[0].value.length < 5) {
        newToast.fire({
            title: 'Atención',
            html: 'El campo de nombre de producto debe tener al menos 5 caracteres',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
        })
        return arrayCheck[1] = false
    } else {
        newToast.fire({
            toast: true,
            title: 'Nombre de producto válido',
            timer: 1500,
            icon: 'success',
        })
        return arrayCheck[1] = true
    }
}

inputs[1].onblur = function () { //Precio
    if (inputs[1].value.length == 0) {
        Swal.fire({
            toast: true,
            position: top,
            title: 'Atención',
            position: 'center',
            html: 'Debes completar el campo de <b style="color:#ab191f"> precio </b>',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
        })
        return arrayCheck[2] = false
    } else {
        return arrayCheck[2] = true
    }
}

inputs[1].onchange = function () { //Precio
    if (!inputs[1].value.match(regexNumber)) {
        newToast.fire({
            title: 'Error',
            html: 'El precio debe ser un número',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
        })
        return arrayCheck[3] = false
    } else if (inputs[1].value <= 0) {
        newToast.fire({
            title: 'Error',
            html: 'El precio debe ser positivo',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
        })

        return arrayCheck[3] = false
    } else {
        newToast.fire({
            title: 'Precio válido',
            timer: 1500,
            icon: 'success',
            showConfirmButton: false,
        })
        return arrayCheck[3] = true
    }
}

textarea.onblur = function () { //Descrpicion
    if (textarea.value.length == 0) {
        newToast.fire({
            toast: true,
            position: 'center',
            title: 'Error',
            html: 'Debes completar el campo de <b style="color:#ab191f"> descripción </b>',
            icon: 'error',
            showConfirmButton: false,
        })
        return arrayCheck[4] = false
    } else {
        return arrayCheck[4] = true
    }
}


textarea.onchange = function () { //Descrpicion
    if (textarea.value.length < 20) {
        newToast.fire({
            toast: true,
            position: 'top',
            title: 'Error',
            text: 'La descripción debe tener al menos 20 caracteres',
            icon: 'error',
            showConfirmButton: false,
        })
        return arrayCheck[5] = false
    } else {
        newToast.fire({
            title: 'Descripción válida',
            timer: 1500,
            icon: 'success',
            showConfirmButton: false,
        })
        return arrayCheck[5] = true
    }
}

imagen.onchange = function checkFoto(e) { //Imagen

    if (imagen.value.length == 0) {
        newToast.fire({
            title: "Atención",
            html: 'Debes completar el campo de <b style="color:#ab191f"> Imagen </b>',
            icon: "error",
            position: 'top',
            timer: 1500
        })
        return arrayCheck[6] = false;
    } else {
        if (!(/\.(gif|jpe?g|jpg|png)$/i).test(imagen.value) && imagen.value != '' ){
            newToast.fire({
                title: 'La imagen deberá ser de formato JPG, JPEG, PNG o GIF',
                timer: 3000,
                width: '28vw',
                icon: 'warning',
            })
            return arrayCheck[6] = false;
        } else {
            newToast.fire({
                title: 'Imagen válida',
                timer: 1500,
                icon: 'success',
            })
            return arrayCheck[6] = true;
        }
    }
}

selects[0].onblur = function () { //Categoria
    if (selects[0].value == 'Selecciona una opción') {
        newToast.fire({
            title: 'Atención',
            position: 'center',
            html: 'Debes seleccionar una <b style="color:#ab191f"> Categoría </b>',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
        })
        return arrayCheck[7] = false
    } else {
        return arrayCheck[7] = true
    }
}

selects[1].onblur = function () { //Subategoria
    if (selects[1].value == 'Selecciona una opción') {
        newToast.fire({
            title: 'Atención',
            position: 'center',
            html: 'Debes seleccionar una <b style="color:#ab191f"> Subcategoría </b>',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
        })
        return arrayCheck[8] = false
    } else {
        return arrayCheck[8] = true
    }
}

selects[2].onblur = function () { //Marca
    if (selects[2].value == 'Selecciona una opción') {
        newToast.fire({
            title: 'Atención',
            position: 'center',
            html: 'Debes seleccionar una <b style="color:#ab191f"> Marca </b>',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
        })
        return arrayCheck[9] = false
    } else {
        return arrayCheck[9] = true
    }
}

agregar.onmousedown = function (e) {
    for (let i = 0; i < arrayCheck.length; i++) {
        
   
    if ((textarea.value.length == 0 || imagen.value.length == 0 || inputs[0].value.length == 0 || inputs[1].value.length == 0 || inputs[2].value.length == 0) || (selects[0].value == 'Selecciona una opción' || selects[1].value == 'Selecciona una opción' || selects[2].value == 'Selecciona una opción')) {
        Swal.fire({
            title: 'Error',
            text: 'Debes completar los campos requeridos',
            icon: 'error',
            confirmButtonColor: '#ab191f',
        })

    } else if(arrayCheck[i] == true){
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
                form.submit();
            }

        });
    }else if (arrayCheck[i] == false){
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