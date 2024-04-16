export function createCard(articulo) {
    let template = document.createElement('template')
    template.innerHTML = `<article class ="flex gap-4 w-full h-[160px] ">
    <img src=${articulo.imagen} alt = ${articulo.nombre} class ="h-[160px] w-[120px] object-cover">
    <div class ="text-sm w-[80%] h-[120px]">
        <h2>${articulo.nombre}</h2>
        <p>${articulo.descripcion}</p>
        <div class ="flex justify-between">
            <div>
                <p>Stock:${articulo.stock}</p>
                <p>Precio:$${articulo.precio_venta}</p>
            </div>    
            <div >
                <img src="../assets/carrito.png" class ="h-[35px]">
            </div>
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
    return template
}

export default {
    createCard,
    renderCards
}