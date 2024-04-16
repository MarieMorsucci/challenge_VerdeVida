export function createCard(articulo, listaCompra) {
    let template = document.createElement('template')
    template.innerHTML = `<article class ="flex gap-4 w-full pr-4 h-[200px] md:h-[160px] bg-neutral-400 bg-opacity-70 rounded-lg">
    <img src=${articulo.imagen} alt = ${articulo.nombre} class ="h-[200px] w-[120px] md:w-[170px] object-cover md:h-[160px]">
    <div class ="text-sm md:text-base w-[80%] h-[120px]">
        <h2 class ="text-lg text-lime-900 py-1">${articulo.nombre}</h2>
        <p>${articulo.descripcion}</p>
        <div class ="flex justify-between">
            <div>
                <p><em>Stock: ${articulo.stock}</em></p>
                <p class ="text-lg text-lime-900">Precio: $${articulo.precio_venta}</p>
            </div>    
            <button data-id="${articulo.id}"></button>
        </div>
    </div>
    </article>`
    let button = template.content.querySelector('button')

    console.log(listaCompra.includes(articulo.id))
    if(listaCompra.includes(`${articulo.id}`)) {
        button.innerHTML = `<img class ="h-[35px] lg:h-[50px]" data-id = ${articulo.id} src = "../assets/agregado.png"></img>`
        } else {
        button.innerHTML = `<img data-id = ${articulo.id} src="../assets/carrito.png" class ="h-[35px] lg:h-[50px]"></img>`
    }
    return template.innerHTML
}


export function createCardCarrito (obj)  
{
    
    let template = document.createElement('template')
  template.innerHTML = ` <article class="min-h-[140px] w-full md:w-3/4 bg-neutral-400 rounded-lg bg-opacity-70 p-1 flex ">
<img class="h-[100%] w-[25%] object-fit" src="${obj.imagen}" alt="${obj.nombre}">
<div class="p-1 w-[65%] flex flex-column flex-wrap justify-between">
    <h2 class="font-bold w-full p-1 text-2xl text-lime-900">${obj.nombre}</h2>
    <p class="font-bold text-white w-[40%] text-2xl p-1 ">$${obj.precio_venta}</p>
    
    <div class=" w-full flex flex-wrap justify-center">
        <div class="h-[30px] w-full text-center flex justify-center gap-2 p-1">
            <input data-idmod='${obj.id}' type="number" class="w-[150px] h-[25px] p-2 text-sm" >
        </div>
        <p data-stockact="${obj.id}" class="w-full text-sm italic text-center">Hay actualmente ${obj.stock} unidades disponibles</p>
    </div>
</div>
<div class="w-[20%] flex justify-end flex-wrap content-between">
    <h4  data-subtotal="${obj.id}" class="  w-full font-bold text-white text-center text-2xl p-2 ">$-</h4>
<svg data-idEliminar='${obj.id}' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"   class="w-8 h-10">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
</div>
</article>`
return template.innerHTML

}


export function renderCardsCart (array, container) {
    
    container.innerHTML=""
    let template = ""
    for (const iterator of array) {
        template += createCardCarrito(iterator)  
    }
    return container.innerHTML = template
}


export function renderCards (articulos, listaCompra, container) {
    let template = document.createElement('template')
    articulos.forEach(articulo => {
      template.innerHTML += createCard(articulo, listaCompra)  
    })
    return container.innerHTML = template.innerHTML
}

export function filterArticles(articulos, categoria, texto, container) {
    
    let filteredArticles = articulos.filter(articulo => ((categoria === 'todo' || articulo.categoria === categoria) && articulo.nombre.toLowerCase().includes(texto)))
    if (filteredArticles.length === 0) {
        container.innerText = 'Lo siento no tenemos artículos que coincidan con su búsqueda.'
    }
    console.log(filteredArticles)
    return filteredArticles
}

export default {
    createCard,
    renderCards,
    filterArticles,
    createCardCarrito,
    renderCardsCart,   
}