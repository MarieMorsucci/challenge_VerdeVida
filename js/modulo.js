export function createCard(articulo, listaCompra) {
  let template = document.createElement("template");
  template.innerHTML = `<article class ="flex gap-4 min-h-[140px]  md:w-[827px] pr-4 h-[200px] md:min-h-[160px] bg-neutral-400 bg-opacity-70 rounded-lg">
    <img src=${articulo.imagen} alt = ${articulo.nombre} class ="h-[200px] w-[120px] md:w-[200px] md:h-full object-cover md:h-[160px]">
    <div class ="text-sm md:text-base w-[80%] h-[120px] flex flex-col gap-3 pt-5">
        <h2 class ="text-lg font-bold text-lime-900 py-1">${articulo.nombre}</h2>
        <p class="italic">${articulo.descripcion}</p>
        <div class ="flex justify-between">
            <div class=" flex flex-col gap-3">
                <p class="  text-black">Stock: ${articulo.stock}</p>
                <p class ="text-lg text-lime-900 font-semibold">Precio: $${articulo.precio_venta}</p>
            </div>    
            <button data-id="${articulo.id}" class=" "></button>
        </div>
    </div>
    </article>`;
  let button = template.content.querySelector("button");

  if (listaCompra.some((obj) => obj.id == `${articulo.id}`)) {
    button.innerHTML = `<img class ="h-[40px] w-[40px] lg:h-[50px] " data-id = ${articulo.id} src = "../assets/agregado.png"></img>`;
  } else {
    button.innerHTML = `<img data-id = ${articulo.id} src="../assets/carrito.png" class ="h-[35px] lg:h-[50px]"></img>`;
  }
  return template.innerHTML;
}

export function createCardCarrito(obj) {
  let template = document.createElement("template");
  template.innerHTML = ` <article class="min-h-[100px] min-w-[347px] md:w-[827px] md-[178px] bg-neutral-400 rounded-lg bg-opacity-70 p-1 flex ">
<img class="h-[170px] w-[170px] object-cover p-1" src="${obj.imagen}" alt="${obj.nombre}">
<div class="p-1 w-[65%] flex flex-column flex-wrap justify-between">
    <h2 class="font-bold w-full p-1 text-2xl text-lime-900">${obj.nombre}</h2>
    <p class=" text-white w-[90%] text-sm p-1 ">Precio por Unidad</p>
    <p class="font-bold text-white w-[90%] text-2xl p-1 ">$${obj.precio_venta}</p>
    
    <div class=" w-full flex flex-wrap justify-center">
        <div class="h-[30px] w-full text-center flex justify-center gap-2 p-1">


        <button data-menos='${obj.id}' type="button" class="w-[20px] h-[25px] bg-white text-center border-solid border-black font-bold text-[20px] text-lime-900">-</button>
        <input data-idmod='${obj.id}'  type="text" value="0" class="w-[150px] h-[25px] p-2 text-sm" >
        <button data-mas='${obj.id}' type="button" class="w-[20px] h-[25px] bg-white text-center border-solid border-black font-bold text-[20px] text-lime-900">+</button>

    </div>
        <p data-stockact="${obj.id}" class="w-full text-sm italic text-center text-lime-900">Hay actualmente ${obj.stock} unidades disponibles</p>
    </div>
</div>
    <div class="w-[20%] flex justify-end flex-wrap content-between">
    <div class="w-full ">

<p class="w-full sombraTexto text-black text-sm p-1 text-center ">Subtotal</p>   
<h4  data-subtotal="${obj.id}" class="sombraTexto  font-bold text-bg-neutral-500 text-center text-2xl p-2 ">$${obj.precio_venta}</h4>

</div>
<svg data-idEliminar='${obj.id}' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"   class="w-full h-12 ">
<path data-idEliminar='${obj.id}' class="w-full h-10 fill-[#b3d491] rounded-lg" stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</div>
</article>`;
  return template.innerHTML;
}

export function renderCardsCart(array, container) {
  container.innerHTML = "";
  let template = "";
  for (const iterator of array) {
    template += createCardCarrito(iterator);
  }
  return (container.innerHTML = template);
}

export function renderCards(articulos, listaCompra, container) {
  let template = document.createElement("template");
  articulos.forEach((articulo) => {
    template.innerHTML += createCard(articulo, listaCompra);
  });
  return (container.innerHTML = template.innerHTML);
}

export function filterArticles(articulos, categoria, texto, container) {
  let filteredArticles = articulos.filter(
    (articulo) =>
      (categoria === "todo" || articulo.categoria === categoria) &&
      articulo.nombre.toLowerCase().includes(texto)
  );
  if (filteredArticles.length === 0) {
    container.innerText =
      "Lo siento no tenemos artículos que coincidan con su búsqueda.";
  }
  console.log(filteredArticles);
  return filteredArticles;
}

export default {
  createCard,
  renderCards,
  filterArticles,
  createCardCarrito,
  renderCardsCart,
};
