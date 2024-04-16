import { renderCardsCart } from "./modulo.js";

let contenedorCards = document.getElementById("conteinerCart");
let productosId = [];
let arrayProdComprados = [];
let LS = [];
let arrayCompradosTotal=[];


console.log(data);
//borrar LS
//localStorage.clear('idsCarrito')

// Render de productos actualizados
LS = JSON.parse(localStorage.getItem("idsCarrito"));
if (LS) {
  productosId = LS;
}

function arrayActual(arrayProdComprados, productosId) {
  for (const iterator of productosId) {
    let aux = data.find((obj) => obj.id == iterator);
    if (aux) {
      arrayProdComprados.push(aux);
    }
  }
  return arrayProdComprados;
}

//renderCardsCart(arrayActual(arrayProdComprados,productosId), contenedorCards);

console.log(arrayProdComprados);

//Ingreso de Inputs en las tarjetas

contenedorCards.addEventListener("keyup", (evento) => {
  console.log(evento);

  if (evento.target.dataset.idmod) {
    let inputCaptado = evento.target.value;
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




  }

});

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

renderCardsCart(arrayActual(arrayProdComprados, productosId), contenedorCards);
