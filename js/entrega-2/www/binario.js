"use strict";

/* Haz que la función BinaryConverter(str) devuelva la forma decimal del valor binario.P
or ejemplo: si se pasa 101 el programa debe retornar un 5, si se pasa 1000 debe retornar un 8,
 etc.*/

let binaryNumber = prompt("introduce un número binario");

function comprobar(numero) {
  //primero compruebo que sea un número binario.
  let arrayNumero = numero.split("");
  let resultado = arrayNumero.every((valor) => valor === "0" || valor === "1");
  return resultado;
}

function binaryConverter(number) {
  let binaryArray = comprobar(number);
  if (binaryArray) {
    let suma = 0;
    for (let i = 0; i < number.length; i++) {
      suma = suma + number[i] * 2 ** (number.length - (i + 1));
    }
    console.log(
      `el número binario ${number} se corresponde con el valor decimal de: ${suma}`
    );
  } else {
    console.log(`${number} NO es un número binario`);
  }
}

binaryConverter(binaryNumber);
