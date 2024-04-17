import { renderCardsCart } from "./modulo.js";

let contenedorCards = document.getElementById("conteinerCart");
let productosId = [];
let arrayProdComprados = [];
let LS = [];
let arrayCompradosTotal=[];


console.log(data);

// Render de productos actualizados

LS = JSON.parse(localStorage.getItem("idsCarrito"));


if (LS) {
  productosId = LS;
}

console.log(LS);

function arrayActual(arrayProdComprados, productosId) {

  for (const iterator of productosId) {
    let aux = data.find((obj) => obj.id == iterator.id);
    if (aux) {
      arrayProdComprados.push(aux);
    }
  }
  return arrayProdComprados;
}

console.log(arrayProdComprados);
renderCardsCart(arrayActual(arrayProdComprados,productosId), contenedorCards);




contenedorCards.addEventListener('click', evento=>{
    console.log(evento);
    console.log(evento.target.dataset.menos);
    
     
if(evento.target.dataset.datamenos){
let idCaptado=evento.target.dataset.datamenos
console.log(idCaptado);
}

    //let botonMenos = document.querySelector(`input[data-menos="${idCaptado}"]`)

   





    console.log();
    let inputCaptado = document.querySelector(`input[data-idmod="${idCaptado}"]`)
    console.log(inputCaptado)
    
    if(evento.target.dataset.menos){



    }
    


//let idCaptado = evento.target.dataset.idmod;
  
  




/* 
    if (evento.target.dataset.idmod) {
        let idCaptado = evento.target.dataset.idmod;
        console.log(inputCaptado);
        console.log(idCaptado);
    
        let auxi = arrayActual(arrayProdComprados, productosId).find(
          (obj) => obj.id == idCaptado
        );
        console.log(auxi);
    
        //Unidades del Input
        let stockact = document.querySelector(`p[data-stockact="${idCaptado}"]`);
    
        if (inputCaptado > 0 && inputCaptado <= auxi.stock) {
          stockact.innerHTML = `Hay actualmente ${auxi.stock} unidades disponibles`;
        } else if (inputCaptado > auxi.stock) {
          stockact.innerHTML = "No tenemos las unidades requeridas.";
        } else if (inputCaptado < 0) {
          stockact.innerHTML = `La cantidad ingresada no es válida`;
        } else {
          stockact.innerHTML = `Hay actualmente ${auxi.stock} unidades disponibles`;
        }
    
        //Aviso de stock
        if (auxi.stock > 0 && auxi.stock <= 5) {
          stockact.className = " text-red-800";
          stockact.innerHTML = "Solo quedan las últimas!! ";
        }
    
        //Logica de Subtotal Tarjeta
        if (inputCaptado >= 0 && inputCaptado <= auxi.stock) {
    
          let subtotal = document.querySelector(`h4[data-subtotal="${idCaptado}"]`);
          subtotal.innerHTML = `$${inputCaptado * auxi.precio_venta}`;
    
        } else if (inputCaptado > auxi.stock) {
          subtotal.innerHTML = "$-";
        } else {
          subtotal.innerHTML = "$-";
        }
      
        //LOGICA DE TOTALES DE ABAJO: crear un json para llevarme abajo
      }
 */


})








//Ingreso de Inputs en las tarjetas



//some-->
//*arrayCompradosTotal[arrayCompradosTotal.findIndex(elem=> elem.id == idCaptado)].cantidadProducto


//no 
  for (const iterator of arrayCompradosTotal ) {
    if(!iterator.includes(idCaptado)){//some-->
    //aux=`{'id':'${}', 'cantidad':'${*}'}`
    arrayCompradosTotal.push(aux)
    console.log(arrayCompradosTotal);
    }else{
    iterator.cantidad=`${inputCaptado}`
    }
    
    
    console.log(arrayCompradosTotal);
    
    //'id'=idCaptado
    //inputCaptado
} 



   





contenedorCards.addEventListener("click", (evento) => {

  console.log(evento.target.dataset.ideliminar);
  console.log(productosId);

  if (evento.target.dataset.ideliminar) {
    let idelim = evento.target.dataset.ideliminar;

    if (productosId.includes(idelim)) {
      console.log(idelim);
      productosId = productosId.filter((id) => id != idelim);
      console.log(productosId);
      localStorage.setItem("idsCarrito", JSON.stringify(productosId));
    }
  }
});

//renderCardsCart(arrayActual(arrayProdComprados, productosId), contenedorCards)
