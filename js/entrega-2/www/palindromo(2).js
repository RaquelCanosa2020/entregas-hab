"use strict";

//Usando every. Comparando primera letra con última y así sucesivamente.

let str = prompt("introduce una frase");

function PalindromeTwo(frase) {
  let fraseMinusc = frase.toLowerCase();
  let fraseArray = fraseMinusc.split("");
  let filtered = fraseArray.filter(element => element !== " ");

  const everyElement = filtered.every((element, index) => {
    if (filtered[index] === filtered[filtered.length - (1 + index)]) {
      return true;
    }
  });
  console.log(everyElement);
}
PalindromeTwo(str);
