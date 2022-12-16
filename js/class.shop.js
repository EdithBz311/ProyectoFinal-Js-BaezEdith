class Shop {
    constructor(carrito) {
        this.carrito = carrito
    }

    subtotal() {

        if (this.carrito.length > 0) {
            return this.carrito.reduce((acc, productos) => acc + (productos.precio * productos.cantidad), 0).toFixed(2)
        } else {
            return 'Error, vuelve a intentarlo'
        }
    }
    /*  simulador de compra */
    confirmarCompra() {
        if (this.subtotal() !== 'Error, vuelve a intentarlo') {
            return
            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Confirmamos tu pago de $  ${this.subtotal()} .\n  Muchas gracias por tu compra`,
            showConfirmButton: false,
            timer: 1500
            })
        } else {
            return 'Ha ocurrido un error, verifica los datos ingresados y vuelve a intentarlo'
        }
    }

}


