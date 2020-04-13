"use strict";

/*Dada la función LetterCount(str) toma el parámetro str que se está pasando y 
devuelve la primera palabra de mayor longitud.
Por ejemplo: Hoy es un día estupendo y fantástico.
debe devolver fantástico porque es la primera palabra que más letras tiene.*/

let frase = prompt("introduce una frase");

function quitarPuntuacion(miString) {
  for (let i = 0; i < miString.length; i++) {
    miString = miString.replace(",", "");
    miString = miString.replace(";", "");
    miString = miString.replace(".", "");
    miString = miString.replace(":", "");
    miString = miString.replace("¿", "");
    miString = miString.replace("?", "");
    miString = miString.replace("¡", "");
    miString = miString.replace("!", "");
  }

  return miString;
}

function LetterCount(str) {
  let fraseSinPuntuacion = quitarPuntuacion(str);
  let fraseArray = fraseSinPuntuacion.split(" ");
  let resultado = fraseArray[0].length;

  let posicion = 0;
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

LetterCount(frase);
