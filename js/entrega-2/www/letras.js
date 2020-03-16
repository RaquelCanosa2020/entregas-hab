"use strict";

let frase = "hoy hace un día estupendo y fantástico";

function devolverPalabra(frase) {
  let fraseArray = frase.split(" "); //incluyo la frase en un array, cada elemento es una palabra
  let resultado = fraseArray[0].length;
  let posicion;
  for (let i = 0; i < fraseArray.length; i++) { 
    if (resultado >= fraseArray[i].length) {  //>= para que si hay dos palabras de = nº letras escoja la primera.
      resultado;
    } else {
      resultado = fraseArray[i].length;
      posicion = i;
    }
  }
  return resultado, posicion, console.log(fraseArray[posicion]); // me da la longitud mayor, la posición de ese elemento y me lo imprime
}

devolverPalabra(frase);
