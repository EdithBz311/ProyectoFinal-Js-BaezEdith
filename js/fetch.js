const API = "js/productos.json";

//funcion asincronica, trae los productos del json
export const getData = async ()=>{
    //creamos el metodo fetch
    const response = await fetch(API);
    // interpreta JSON
    const data= await response.json();
    //retorna lista de productos en json
    return data
}


















//Nota
//async= funcion asincrona, espera a que retorne algo por fuera o dentro de la funcion
// await= espera a que retorne 
