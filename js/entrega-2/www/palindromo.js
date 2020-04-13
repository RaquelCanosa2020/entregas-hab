"use strict";

/*Haz que la función PalindromeTwo(str) tome el parámetro str que se le pasa y devuelva true si el parámetro es un palíndromo, (la cadena se lee igual hacia adelante que hacia atrás) de lo contrario devuelve false. 
Por ejemplo: Arriba la birra debería devolver true, se lee igual del derecho que del revés.*/

//Comparando el miString con su "reverse":

let str = prompt("introduce una frase");

function quitarAcentos(miString) {
  for (let i = 0; i < miString.length; i++) {
    (miString = miString.replace("á", "a")),
      (miString = miString.replace("é", "e"));
    miString = miString.replace("í", "i");
    miString = miString.replace("ó", "o");
    miString = miString.replace("ú", "u");
  }

  return miString;
}

function quitarEspaciosyPuntuacion(miString) {
  for (let i = 0; i < miString.length; i++) {
    (miString = miString.replace(" ", "")),
      (miString = miString.replace(",", ""));
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

function PalindromeTwo(frase) {
  let fraseMinusc = frase.toLowerCase();
  let fraseSinAcentos = quitarAcentos(fraseMinusc);
  let fraseSinEspaciosPuntuacion = quitarEspaciosyPuntuacion(fraseSinAcentos);
  let fraseArray = fraseSinEspaciosPuntuacion.split("");

  let reversed = [...fraseArray].reverse();

  let fraseString = fraseArray.join();
  let reversedCopy = reversed.join();

  if (fraseString === reversedCopy) {
    console.log(true);
  } else {
    console.log(false);
  }
}

PalindromeTwo(str);
