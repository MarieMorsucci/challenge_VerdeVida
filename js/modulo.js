export function createCard(articulo) {
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
            <button data-id = ${articulo.id}>
                <img  data-id = ${articulo.id} src="../assets/carrito.png" class ="h-[35px] md:h-[50px]">
            </button>
        </div>
    </div>
    </article>`

    return template.innerHTML
}

export function renderCards (articulos, container) {
    let template = document.createElement('template')
    articulos.forEach(articulo => {
      template.innerHTML += createCard(articulo)  
    })
    return container.innerHTML = template.innerHTML
}

export function filterArticles(articulos, categoria, texto, container) {
    
    let filteredArticles = articulos.filter(articulo => ((categoria === 'todo' || articulo.categoria === categoria) && articulo.nombre.toLowerCase().includes(texto)))
    if (filteredArticles.length === 0) {
        container.innerText = 'Lo siento no tenemos artículos que coincidan con su búsqueda.'
    }
    return filteredArticles
}

export default {
    createCard,
    renderCards,
    filterArticles
}