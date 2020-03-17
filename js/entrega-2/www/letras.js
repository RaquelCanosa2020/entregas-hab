"use strict";

let frase = prompt("introduce una frase");

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
  return (
    resultado,
    posicion,
    console.log(
      `la primera palabra más larga de tu frase es "${fraseArray[posicion]}", con ${resultado} letras`
    )
  );
}

devolverPalabra(frase);
