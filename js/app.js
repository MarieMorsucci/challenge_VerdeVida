import funciones from '../js/modulo.js'

const articulos =  data.map(articulo => articulo)
const container = document.querySelector('#cardsContainer')
const select = document.querySelector('#buscadores select')
const inputText = document.querySelector('#buscadores input')
let input = ''
let categoria = 'todo'

funciones.renderCards(articulos, container)

inputText.addEventListener('input', event => {
    input = event.target.value.toLowerCase().trim()
    container.innerHTML = ''
    let filteredArticles = funciones.filterArticles(articulos, categoria, input, container)
    console.log(filteredArticles)
    if (filteredArticles.length > 0) {
        funciones.renderCards(filteredArticles, container)    }
})

select.addEventListener('change', event => {
    categoria = event.target.value
    container.innerHTML = ''
    let filteredArticles = funciones.filterArticles(articulos, categoria, input, container)
    if(filteredArticles.length > 0) {
        funciones.renderCards(filteredArticles, container)
    }
})

let idsCarrito = []
let lsCarrito = JSON.parse(localStorage.getItem('idsCarrito'))

if (lsCarrito) {
    idsCarrito = lsCarrito
}

container.addEventListener('click', event => {
    let productoId = event.target.dataset.id
    console.log(productoId)
    if(productoId) {
        if(!idsCarrito.includes(productoId)) {
            idsCarrito.push(productoId)
        } else {
            idsCarrito = idsCarrito.filter(id => id != productoId)
        }
    }
    localStorage.setItem('idsCarrito', JSON.stringify(idsCarrito))
})