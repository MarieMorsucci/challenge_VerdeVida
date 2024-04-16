import {renderCardsCart} from "./modulo.js"

console.log(data)
//borrar LS
//localStorage.clear('idsCarrito')


let productosId=[]
let LS=JSON.parse(localStorage.getItem('idsCarrito'))

console.log(LS);

if(LS){
productosId = LS
}

console.log(productosId);
let contenedorCards= document.getElementById('conteinerCart')


let arrayProdComprados=[]

for (const iterator of productosId) {
let aux = data.find( obj => obj.id == parseInt(iterator))
if(aux){
    arrayProdComprados.push(aux)
}     
}


console.log(arrayProdComprados);
renderCardsCart(arrayProdComprados,contenedorCards)