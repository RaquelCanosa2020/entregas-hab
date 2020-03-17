"use strict";

let binaryNumber = prompt("introduce un número binario");

function binaryConverter(binaryNumber) {
  let Array = binaryNumber.split("");
  let suma = 0;
  for (let i = 0; i < Array.length; i++) {
    suma = suma + Array[i] * 2 ** (Array.length - (i + 1));
  }
  console.log(
    `el número binario ${binaryNumber} se corresponde con el valor decimal de: ${suma}`
  );
}
binaryConverter(binaryNumber);
