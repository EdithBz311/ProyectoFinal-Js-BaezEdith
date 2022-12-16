//elemento del navegador my Cart
const seccionCarrito = document.getElementById("myCart")
//elemento de lista de productos
const listaDeProductos = document.getElementById("listaDeProductos")
//elemento de cart
const cart = document.getElementById("cart")

//creo un evento click para generar mi carrito
seccionCarrito.addEventListener("click", (e) => {
    e.preventDefault()
    generarCarrito()
})
export let carritocheckout = null
//importacion del carrito desde main.js
import { carrito } from "./main.js"

const generarCarrito = () => {
    //guardo en una variable lo que contiene el localStorage
    carritocheckout = JSON.parse(localStorage.getItem("CarritoProductos"))
    //vacio mi lista de productos
    listaDeProductos.innerHTML = ""
    //vacio mi lista de carrito
    cart.innerHTML = ""
    //genero el carrito
    cart.innerHTML = `<table class="table">
    <thead>
    <tr>
        <th scope="col">Articulo</th>
        <th scope="col">Nombre</th>
        <th scope="col">Precio</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Quitar</th>
    </tr>
    </thead>
    <tbody id="listaDeCarrito">
    </tbody>
    </table>
    <button class="button btn btn-warning" id="btnComprar">COMPRAR</button>
    ${carritocheckout.length > 0 ? `<button class="btn btn-outline-danger" id="botónVaciarCarrito">Vaciar Carrito</button>` : ""}
    `
    //guardo el elemento donde voy a generar mi lista de carrito
    const listaDeCarrito = document.getElementById("listaDeCarrito")
    //recorro todo mi localstorage para generar la lista de carrito
    carritocheckout.forEach(p => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
                    <td><img src=${p.imagen} width="30px"></td>
                    <td>${p.nombre}</td>
                    <td>$${p.precio}</td>
                    <td>${(p.cantidad)}</td>
                    <td><button class="btn btn-outline-danger" id="quitar${p.nombre}">Quitar</button></td>
        `
        //uso appendChild para guardar cada hijo dentro del elemento listaDeCarrito
        listaDeCarrito.appendChild(tr)
        //guardo el elemento para eliminar el producto del carrito
        const quitar = document.getElementById(`quitar${p.nombre}`)
        //creo el evento para eliminar del carrito el producto
        quitar.addEventListener("click", (e) => {
            //preventDefault evita refrescar página
            e.preventDefault()
            //paso por parámetro el objeto que quiero eliminar (p)
            quitarProducto(p)
        })
    })
    //capturo el elemento de compra en el carrito
    const comprar = document.getElementById("btnComprar")
    //creo el evento click para la compra en el carrito
    comprar.addEventListener("click", (e) => {
        e.preventDefault()
        verCarrito()
    })
    const botonVaciarCarrito = document?.getElementById("botónVaciarCarrito")
    botonVaciarCarrito?.addEventListener("click", () => {
        vaciarCarrito()
    })

    const quitarProducto = (producto) => {
        //busco dentro de mi carrito el objeto eliminado
        const productoEliminado = carrito.find(p => p !== producto)
        //modifico la propiedad cantidad a cero para resetear la cantidad
        productoEliminado.cantidad = 0
        //carritocheckout(array del carrito) le digo que ahora contenga todos menos el producto eliminado 
        carritocheckout = carritocheckout.filter(p => p !== producto)
        //actualizo en el localstorage el nuevo carrito
        localStorage.setItem("CarritoProductos", JSON.stringify(carritocheckout))
        generarCarrito()
        //toastify
        Toastify({
            text: `Se ha quitado el producto ${producto.nombre} del carrito`,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    }

    const vaciarCarrito = () => {
        carritocheckout = []
        localStorage.setItem("CarritoProductos", JSON.stringify(carritocheckout))
        generarCarrito()
    }

    /*CHEQUEA CARRITO */
    const verCarrito = () => {
        if (carritocheckout.length > 0) {
            const shopping = new Shop(carritocheckout)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `El costo total es de $ ${shopping.subtotal()}`,
                showConfirmButton: false,
                timer: 1500
            })
            vaciarCarrito()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que tu carrito aún esta vacío!',
            })
        }
    }
}
