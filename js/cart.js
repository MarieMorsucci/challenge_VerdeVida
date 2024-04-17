import { renderCardsCart } from "./modulo.js";

let contenedorCards = document.getElementById("conteinerCart");
let botonClear= document.getElementById('botonClear')
let botonSend= document.getElementById('botonSend')
let productosId = [];
let arrayProdComprados = [];
let LS = [];
let articulos = data.map(articulo => articulo) 
let total = 0
let idCaptado;
let inputCaptado;
let aux;

LS = JSON.parse(localStorage.getItem("idsCarrito"));

if (LS) {
  productosId = LS;
}

function arrayActual(arrayProdComprados, productosId) {
  for (const iterator of productosId) {
    aux = data.find((obj) => obj.id == iterator.id);
    if (aux) {
      arrayProdComprados.push(aux);
    }
  }
  return arrayProdComprados;
}

function renderizarLista() {
  let listaProductos = document.getElementById('productos')
  let listaPrecios = document.getElementById('precios')

  listaPrecios.innerHTML = ''
  listaProductos.innerHTML = ''
  
  let total = 0

  for (const articulo of arrayProdComprados) {
    listaProductos.innerHTML += `<li>${articulo.nombre}</li>`    
  }

  for (const articulo of arrayProdComprados) {
    let cantidad = productosId.find(item => item.id == articulo.id)?.cantidad || 0
    let subtotal = cantidad * articulo.precio_venta
    total+=subtotal
    listaPrecios.innerHTML += `<li>$ ${subtotal}</li>`
  }
  let textTotal = document.getElementById('totalGral')

  textTotal.innerText = `$ ${total+50}`    
}

renderCardsCart(arrayActual(arrayProdComprados, productosId), contenedorCards)
document.addEventListener('DOMContentLoaded', () => {
  renderizarLista()
})

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
    let stock = data.find((obj) => obj.id == idCaptado).stock;
    aux = productosId.find((obj) => obj.id == idCaptado).cantidad + 1;

    if (auxi.stock > 0 && auxi.stock <= 5) {
      stockact.className = " text-red-800";
      stockact.innerHTML = "Solo quedan las últimas!! ";
    }

    //Logica de Subtotal Tarjeta
    if (aux >= 0 && aux <= auxi.stock) {
      productosId[pos].cantidad++;
      localStorage.setItem("idsCarrito", JSON.stringify(productosId));
      inputCaptado.setAttribute("value", `${aux}`);

      subtotal.innerHTML = `$${aux * auxi.precio_venta}`;
      //Aviso de stock
    } else if (inputCaptado > auxi.stock) {
      subtotal.innerHTML = `$${aux * auxi.precio_venta}`;
      stockact.innerHTML = "No tenemos las unidades requeridas.";
    } else {
      subtotal.innerHTML = "$-";
    }
  }
  
  if (evento.target.dataset.ideliminar) {
    let idelim = evento.target.dataset.ideliminar;
    productosId = productosId.filter((producto) => producto.id != idelim);
    localStorage.setItem("idsCarrito", JSON.stringify(productosId));
  }

  renderizarLista()
});

botonSend.addEventListener('click', event=>
alert('Gracias por tu compra!! \n En breve nos contactaremos para hacerte llegar el paquete'))


botonClear.addEventListener('click', event=>{
  localStorage.clear('idsCarrito')
  alert('Gracias por tu compra!! \n En breve nos contactaremos para hacerte llegar el paquete')
})


// for (const articulo of articulos) {
  //     if (articulo.id === productosId.id) {
    //         arrayProdComprados.push(articulo)
    //     }
    // }
    

  // let botonMenos = document.querySelector(`input[data-menos="${idCaptado}"]`)
  // let idCaptado=evento.target.dataset.datamenos
  // console.log(idCaptado);

  
  
  
  
  
  
  // contenedorCards.addEventListener('click', evento=>{
  
  //   if(evento.target.dataset.operacion && evento.target.dataset.idmod){
  //       let input = document.querySelector(`input[data-idmod="${evento.target.dataset.idmod}"]`)    
  //       let id = evento.target.dataset.idmod
  //       let index = productosId.findIndex(item => item.id === id)
        
  //       if(evento.target.dataset.operacion ==='suma') {
  //         input.value= parseInt(input.value) + 1
  //         if(index != -1) {
  //           productosId[index].cantidad += 1
  //         }
  //       } else if (evento.target.dataset.operacion === 'resta') {
  //         input.value = parseInt(input.value) - 1
  //         if(index != -1 && productosId[index].cantidad > 0) {
  //           productosId[index].cantidad -= 1
  //         }
  //       }
  //     }
  //     localStorage.setItem('idsCarrito', JSON.stringify(productosId))
  //     renderizarLista()
  //   })    
//     console.log();
//     let inputCaptado = document.querySelector(`input[data-idmod="${idCaptado}"]`)
//     console.log(inputCaptado)
    
//     if(evento.target.dataset.menos){



//     }
    


// //let idCaptado = evento.target.dataset.idmod;
  
  




// /* 
//     if (evento.target.dataset.idmod) {
//         let idCaptado = evento.target.dataset.idmod;
//         console.log(inputCaptado);
//         console.log(idCaptado);
    
//         let auxi = arrayActual(arrayProdComprados, productosId).find(
//           (obj) => obj.id == idCaptado
//         );
//         console.log(auxi);
    
//         //Unidades del Input
//         let stockact = document.querySelector(`p[data-stockact="${idCaptado}"]`);
    
//         if (inputCaptado > 0 && inputCaptado <= auxi.stock) {
//           stockact.innerHTML = `Hay actualmente ${auxi.stock} unidades disponibles`;
//         } else if (inputCaptado > auxi.stock) {
//           stockact.innerHTML = "No tenemos las unidades requeridas.";
//         } else if (inputCaptado < 0) {
//           stockact.innerHTML = `La cantidad ingresada no es válida`;
//         } else {
//           stockact.innerHTML = `Hay actualmente ${auxi.stock} unidades disponibles`;
//         }
    
//         //Aviso de stock
//         if (auxi.stock > 0 && auxi.stock <= 5) {
//           stockact.className = " text-red-800";
//           stockact.innerHTML = "Solo quedan las últimas!! ";
//         }
    
//         //Logica de Subtotal Tarjeta
//         if (inputCaptado >= 0 && inputCaptado <= auxi.stock) {
    
//           let subtotal = document.querySelector(`h4[data-subtotal="${idCaptado}"]`);
//           subtotal.innerHTML = `$${inputCaptado * auxi.precio_venta}`;
    
//         } else if (inputCaptado > auxi.stock) {
//           subtotal.innerHTML = "$-";
//         } else {
//           subtotal.innerHTML = "$-";
//         }
      
//         //LOGICA DE TOTALES DE ABAJO: crear un json para llevarme abajo
//       }
//  */


// })








// //Ingreso de Inputs en las tarjetas



// //some-->
// //*arrayCompradosTotal[arrayCompradosTotal.findIndex(elem=> elem.id == idCaptado)].cantidadProducto


// //no 
//   for (const iterator of arrayCompradosTotal ) {
//     if(!iterator.includes(idCaptado)){//some-->
//     //aux=`{'id':'${}', 'cantidad':'${*}'}`
//     arrayCompradosTotal.push(aux)
//     console.log(arrayCompradosTotal);
//     }else{
//     iterator.cantidad=`${inputCaptado}`
//     }
    
    
//     console.log(arrayCompradosTotal);
    
//     //'id'=idCaptado
//     //inputCaptado
// } 


// contenedorCards.addEventListener("click", (evento) => {

//   console.log(evento.target.dataset.ideliminar);
//   console.log(productosId);

//   if (evento.target.dataset.ideliminar) {
//     let idelim = evento.target.dataset.ideliminar;

//     if (productosId.includes(idelim)) {
//       console.log(idelim);
//       productosId = productosId.filter((id) => id != idelim);
//       console.log(productosId);
//       localStorage.setItem("idsCarrito", JSON.stringify(productosId));
//     }
//   }
// });

// //renderCardsCart(arrayActual(arrayProdComprados, productosId), contenedorCards)

