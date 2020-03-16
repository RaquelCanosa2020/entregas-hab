"use strict";

let frase = "hoy hace un día estupendo y fantástico";

function devolverPalabra(frase) {
  let fraseArray = frase.split(" ");
  let resultado = fraseArray[0].length;
  let posicion;
  for (let i = 0; i < fraseArray.length; i++) {
    if (resultado >= fraseArray[i].length) {
      resultado;
    } else {
      resultado = fraseArray[i].length;
      posicion = i;
    }
  }
  return resultado, posicion, console.log(fraseArray[posicion]);
}

devolverPalabra(frase);
