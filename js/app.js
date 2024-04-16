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