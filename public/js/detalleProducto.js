let boton = document.getElementById('eliminarProductoButton');


boton.onmousedown = function () {
   Swal.fire({
      title: 'Eliminar producto',
      text: "¿Estas seguro que quieres eliminar este producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'black',
      cancelButtonColor: '#ab191f',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
   }).then((result) => {
      if (result.isConfirmed) {
         document.onkeydown = function (e) {
            return false;
         }
         Swal.fire({
            timer: 3000,
            timerProgressBar: true,
            title: 'El producto se eliminara en 3 segundos',
            text: 'Eliminando...',
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonColor: '#ab191f',
            cancelButtonText: 'Cancelar',
            willClose: () => {

               Swal.fire({
                  title: 'Eliminado!',
                  text: 'Producto eliminado con éxito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                  willClose: () => {
                     boton.click();
                  }

               })
            }
         }).then(result => {
            if (result.dismiss == Swal.DismissReason.cancel) {
               Swal.fire({
                  icon: 'error',
                  title: 'Cancelado',
                  showConfirmButton: false,
                  timer: 700,

               })

            }
         })

      }
   })


};