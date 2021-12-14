let agregar = document.getElementById('agregar')
let form = document.getElementById('agregarForm')
let nombre = document.getElementById('nombre')
let precio = document.getElementById('precio')
let descripcion = document.getElementById('descripcion')
let imagen = document.getElementById('imagen')
let categoria = document.getElementById('categoria')
let subcategoria = document.getElementById('subcategoria')
let marca = document.getElementById('marca')





let arrayCheck = [false, false, false, false, false, false, false, false, false, false]

let regexNumber = /^[0-9]+$/

const newToast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    position: 'top',
})

nombre.onblur = function () { //Nombre
    if (nombre.value.length == 0) {
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

nombre.onchange = function () { //Nombre
    if (nombre.value.length < 5) {
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

precio.onblur = function () { //Precio
    if (precio.value.length == 0) {
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

precio.onchange = function () { //Precio
    if (!precio.value.match(regexNumber)) {
        newToast.fire({
            title: 'Error',
            html: 'El precio debe ser un número',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
        })
        return arrayCheck[3] = false
    } else if (precio.value <= 0) {
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

descripcion.onblur = function () { //Descrpicion
    if (descripcion.value.length == 0) {
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


descripcion.onchange = function () { //Descrpicion
    if (descripcion.value.length < 20) {
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
        if (!(/\.(gif|jpe?g|jpg|png)$/i).test(imagen.value) && imagen.value != '') {
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

categoria.onblur = function () { //Categoria
    if (categoria.value == 'Selecciona una opción') {
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

subcategoria.onblur = function () { //Subategoria
    if (subcategoria.value == 'Selecciona una opción') {
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

marca.onblur = function () { //Marca
    if (marca.value == 'Selecciona una opción') {
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

     nombre.blur()
     precio.blur()
     descripcion.blur()
     imagen.blur()
     categoria.blur()
     subcategoria.blur()
     marca.blur()

    let arrayValidado = true

    if ((descripcion.value.length == 0 || imagen.value.length == 0 || nombre.value.length == 0 || precio.value.length == 0) || (categoria.value == 'Selecciona una opción' || subcategoria.value == 'Selecciona una opción' || marca.value == 'Selecciona una opción')) {
        Swal.fire({
            title: 'Error',
            text: 'Debes completar los campos requeridos',
            icon: 'error',
            confirmButtonColor: '#ab191f',
        })

    } else {
        for (let i = 0; i < arrayCheck.length; i++) {

            if (arrayCheck[i] == false) {
                arrayValidado = false
            }

        }
        if (arrayValidado == true) {
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
        } else if (arrayValidado == false) {
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