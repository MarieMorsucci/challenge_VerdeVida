import funciones from '../js/modulo.js'

const articulos =  data.map(articulo => articulo)
const container = document.querySelector('#cardsContainer')
const select = document.querySelector('#buscadores select')
const inputText = document.querySelector('#buscadores input')
let input = ''
let categoria = 'todo'

let idsCarrito = []
let lsCarrito = JSON.parse(localStorage.getItem('idsCarrito'))

if (lsCarrito) {
    idsCarrito = lsCarrito
}

console.log(idsCarrito)
funciones.renderCards(articulos, idsCarrito, container)

container.addEventListener('click', event => {
    let productoId = event.target.dataset.id
    if(productoId) {
        if(!idsCarrito.some(obj => obj.id == productoId)) {
            idsCarrito.push({'id':productoId , 'cantidad':0 })
            event.target.parentElement.innerHTML = `<img class ="h-[35px] lg:h-[50px]" data-id = ${productoId} src = "../assets/agregado.png"></img>`
        } else {
            idsCarrito = idsCarrito.filter(obj => obj.id != productoId)
            event.target.parentElement.innerHTML =  `<img data-id = ${productoId} src="../assets/carrito.png" class ="h-[35px] lg:h-[50px]"></img>`
        }
    }
    localStorage.setItem('idsCarrito', JSON.stringify(idsCarrito))
})

inputText.addEventListener('input', event => {
    input = event.target.value.toLowerCase().trim()
    container.innerHTML = ''
    let filteredArticles = funciones.filterArticles(articulos, categoria, input, container)
    console.log(filteredArticles)
    if (filteredArticles.length > 0) {
        funciones.renderCards(filteredArticles, idsCarrito, container)    }
})

select.addEventListener('change', event => {
    categoria = event.target.value
    console.log(categoria)
    container.innerHTML = ''
    let filteredArticles = funciones.filterArticles(articulos, categoria, input, container)
    if(filteredArticles.length > 0) {
        funciones.renderCards(filteredArticles, idsCarrito, container)
    }
})
