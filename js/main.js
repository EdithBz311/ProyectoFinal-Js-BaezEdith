import { getData } from "./fetch.js"
const irAProductos = document.getElementById("productos")
const cart = document.getElementById("cart")

import {carritocheckout} from "./checkOut.js"
//Exportamos la variable carrito para usarlo en el archivo checkout(lógica del carrito)
export let carrito = []
//declaro variable que retorna fetch
const productosJSON = await getData()
//convertir json del fetch a array
const productosJSONS = await JSON.stringify(productosJSON)
const productos = await JSON.parse(productosJSONS)

//evento para ir a la lista de productos
irAProductos.addEventListener("click", (e) => {
    e.preventDefault()
    cargarProductos(productos)
})
//guardamos en el localstorage el carrito
const guardarCarrito = () => (carrito.length > 0) && localStorage.setItem("CarritoProductos", JSON.stringify(carrito))
//si contiene algo el localstorage, lo traemos y pusheamos al carrito cuando no contenga nada
const recuperarCarrito = () => JSON.parse(localStorage.getItem("CarritoProductos")) || []

  //guardo lo que contiene el carrito en el localStorage si no existe 
if (localStorage.length=== 0) { localStorage.setItem("CarritoProductos", JSON.stringify(carrito)) }
 //recupera lo que contiene el localstoge para pushear al carrito cuando recarga la página
if (carrito.length === 0) {
    carrito.push(...recuperarCarrito())
}
/* CARGAR PRODUCTOS DEL CATALOGO */
const cargarProductos = async (array) => {
    carritocheckout?carrito=JSON.parse(localStorage.getItem("CarritoProductos")):null
    //vacía el contenido del elemento cart(mi lista de carrito)
    cart.innerHTML = ""
    //vacía lista de productos
    listaDeProductos.innerHTML = ""
    //titulo de lista de productos
    listaDeProductos.innerHTML = `<h1 class="tituloh1">Nuestros Productos</h1>`
    //creo el html del input buscador
    listaDeProductos.innerHTML+=`
    
    <div class="input-group mb-3">
  <input type="text"  id="buscador" class="form-control" placeholder="Buscar producto" aria-label="Recipient's username" aria-describedby="button-addon2">
  <button  id="botonBuscar"class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
</div>`

//capturo en una variable el input del buscador
    const inputBusqueda=document.getElementById("buscador")
//capturo en una variable el boton del buscador
    const botonBuscar=document.getElementById("botonBuscar")
    botonBuscar.addEventListener("click", async(e)=>{
        e.preventDefault()
        //array filtrado por lo que se escribió en el input
        const arrayFiltrado= await productos.filter(p=>p.nombre.toLowerCase().includes(inputBusqueda.value.toLowerCase())) 
        /* console.log(inputBusqueda.value) */
        if(arrayFiltrado.length>0){
            cargarProductos(arrayFiltrado)
        }
        else if(inputBusqueda.value===0){
            cargarProductos(productos)
        }
        else{
            cargarProductos(productos)
        }
    })
    //como array(productos) es una simulacion de api, esta funcion es asincronica por lo q debo utilizar await para que espere a que le llegue toda la informacion requerida
    if (await array.length > 0) {
        //recorro el array de productos
        array.forEach(productos => {
            //creo un elemento div
            let div = document.createElement("div")
            //le agrego una clase al elemento div
            div.className = "d-flex justify-content-center col-sm-3 mb-5"
            //agregó más elementos dentro del div
            div.innerHTML = `
    <div class="card"style="width: 15rem;">
    <img src="${productos.imagen}"class="card-img-top"alt="">
    <div class="card-body">
    <h5 class="card-title"> ${productos.nombre}</h5>
    <p class="card-text"> Talles xs-s-m-l-xl-xxl</p> 
    <p class="card-text"> $ ${productos.precio}</p> 
    <button id="agregar${productos.nombre}" type="button" class="btn btn-outline-primary">  Add to cart</button>
    </div>
    </  div> `
            //guardo todos los hijos generados dentro de lista de productos
            listaDeProductos.appendChild(div)
            //creo una variable que contenga el elemento boton que agrega el producto
            let agregar = document.getElementById(`agregar${productos.nombre}`)
            //creo el evento para dicho botón
            agregar.addEventListener("click", (e) => {
                e.preventDefault()
                //paso por parámetro el la propiedad nombre de dicho objeto para usarlo dentro de la función agregarCarrito
                agregarCarrito(productos.nombre)
            })

        })
        const agregarCarrito = async (producto) => {
            //busca si el producto que quiero agregar está dentro de mi carrito
            const productoIgual = carrito.find(p => p.nombre === producto)
            //si está dentro de mi carrito, le modifico nada más la cantidad
            if (productoIgual) {
                //elimino dentro del carrito el elemento que agregué para que no se repita
                carrito = carrito.filter(p => p.nombre !== producto)
                //pusheo al carrito el producto que quiero  agregar y le modifico la cantidad
                carrito.push({ ...productoIgual, cantidad: (productoIgual.cantidad + 1) })
            }
            //si no está en el carrito lo agrego al producto
            else {
                //busco dentro de mi array de productos el producto que quiero agregar
                let resultado = await array.find(p => p.nombre === producto)
                //le modifico a dicho producto la propiedad cantidad a 1
                resultado.cantidad = 1
                //agrego el producto al carrito
                carrito.push(resultado)
            }
            /* GUARDAR CARRITO EN LOCALSTORAGE */
            guardarCarrito()

            /*Mensaje de éxito de carga con toastify */
            Toastify({
                text: `Se ha añadido el producto ${producto} a tu carrito`,
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
            localStorage.setItem("CarritoProductos", JSON.stringify(carrito))
        }
    }
    else {
        //si este no encuentra los productos, se imprimirá en la página el mensaje
        catalogoHTML = "<h2 class= errorCarga > Error al cargar productos del catalogo </h2>"
        article.innerHTML = catalogoHTML
    }
}
//ejecutamos la funcion que retorna la lista de mis productos
cargarProductos(productos)






































