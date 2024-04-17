import { renderCardsCart } from "./modulo.js";

let contenedorCards = document.getElementById("conteinerCart");
let botonClear= document.getElementById('botonClear')
let botonSend= document.getElementById('botonSend')
let productosId = [];
let arrayProdComprados = [];
let LS = [];
let arrayCompradosTotal = [];
let idCaptado;
let inputCaptado;
let aux;

console.log(data);

// Render de productos actualizados

LS = JSON.parse(localStorage.getItem("idsCarrito"));

if (LS) {
  productosId = LS;//array de ids
}

console.log(LS);

function arrayActual(arrayProdComprados, productosId) {
  for (const iterator of productosId) {
    aux = data.find((obj) => obj.id == iterator.id);
    if (aux) {
      arrayProdComprados.push(aux);//array de objetos ya parseados
    }
  }
  return arrayProdComprados;
}
console.log(arrayProdComprados);

//renderCardsCart(arrayActual(arrayProdComprados, productosId), contenedorCards);

//CLICKS EN EL CONTENEDOR

contenedorCards.addEventListener("click", (evento) => {
  let stockact = document.querySelector(`p[data-stockact="${idCaptado}"]`);
  let subtotal = document.querySelector(`h4[data-subtotal="${idCaptado}"]`);

  if (evento.target.dataset.menos) {
    idCaptado = evento.target.dataset.menos;
    inputCaptado = document.querySelector(`input[data-idmod="${idCaptado}"]`);
    let auxi = data.find((obj) => obj.id == idCaptado); 

    //posicion en el Array de LS
    let pos = productosId.findIndex((obj) => obj.id == idCaptado);
    console.log(pos);
    aux = productosId.find((obj) => obj.id == idCaptado).cantidad - 1;
    console.log(aux);

    if (aux <= 0) {
      stockact.innerHTML = "Producto eliminado";
      productosId = productosId.filter((producto) => producto.id != idCaptado);
      localStorage.setItem("idsCarrito", JSON.stringify(productosId));
    } else {
      productosId[pos].cantidad--;
      localStorage.setItem("idsCarrito", JSON.stringify(productosId));
      inputCaptado.setAttribute("value", `${aux}`);
      subtotal.innerHTML = `$${aux * auxi.precio_venta}`;
      stockact.innerHTML = `Hay actualmente ${auxi.stock} unidades disponibles`
      console.log(inputCaptado);
    }
  }

  if (evento.target.dataset.mas) {
    idCaptado = evento.target.dataset.mas;
    console.log(idCaptado);
    let inputCaptado = document.querySelector(`input[data-idmod="${idCaptado}"]`);

    subtotal = document.querySelector(`h4[data-subtotal="${idCaptado}"]`);
    stockact = document.querySelector(`p[data-stockact="${idCaptado}"]`);

    console.log(stockact);
    //posicion en el Array de LS
    let pos = productosId.findIndex((obj) => obj.id == idCaptado);
    let auxi = data.find((obj) => obj.id == idCaptado);
    aux = productosId.find((obj) => obj.id == idCaptado).cantidad + 1;//CANTIDAD DEL LS

    //ALERTA DE ULTIMAS UNIDADES
   /*  if (auxi.stock > 0 && auxi.stock <= 5) {
      stockact.className = " text-red-800";
      stockact.innerHTML = `Solo quedan las últimas ${auxi.stock} unidades!! `;
    }else{stockact.innerHTML = `Hay actualmente ${obj.stock} unidades disponibles`}
 */
    //Logica de Subtotal Tarjeta
    if (aux >= 0 && aux <= auxi.stock) {
      productosId[pos].cantidad++;
      localStorage.setItem("idsCarrito", JSON.stringify(productosId));
      inputCaptado.setAttribute("value", `${aux}`);
      subtotal.innerHTML = `$${aux * auxi.precio_venta}`;
      stockact.innerHTML = `Hay actualmente ${auxi.stock} unidades disponibles`
      //Aviso de stock
    } else if (aux > auxi.stock) {
      subtotal.innerHTML = `$${aux * auxi.precio_venta}`;
      stockact.innerHTML = "No tenemos en stock las unidades requeridas.";
    } else {
      subtotal.innerHTML = "$-";
    }
  }
  
  if (evento.target.dataset.ideliminar) {
    let idelim = evento.target.dataset.ideliminar;
    productosId = productosId.filter((producto) => producto.id != idelim);
    localStorage.setItem("idsCarrito", JSON.stringify(productosId));
  }

});

botonSend.addEventListener('click', event=>{

    productosId = productosId.filter((producto) => producto.cantidad == 0);
    console.log(productosId);
    localStorage.setItem("idsCarrito", JSON.stringify(productosId));

    alert('Gracias por tu compra!! \n En breve nos contactaremos para hacerte llegar el paquete')

})



botonClear.addEventListener('click', event=>{
    let confirmar = confirm("Se vaciará el carrito con todos tus productos, deseas continuar?")
   
    if(confirmar){
        localStorage.clear('idsCarrito')
    }
    


})

console.log(productosId.length);
if(productosId.length>0){
    renderCardsCart(arrayActual(arrayProdComprados, productosId), contenedorCards)
}else{ contenedorCards.innerHTML="NO HAY PRODUCTOS EN TU CARRITO"}

//renderCardsCart(arrayActual(arrayProdComprados, productosId),contenedorCards)
