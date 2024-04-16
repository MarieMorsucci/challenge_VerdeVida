import funciones from '..js/modulo.js'

let articulos =  data.map(articulo => articulo)
let container = document.querySelector('#cardsContainer')

container.innerHTML = (funciones.renderCards(articulos, container)).innerHTML