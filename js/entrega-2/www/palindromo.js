"use strict";

//Comparando el string con su "reverse":

let str = prompt("introduce una frase");

function PalindromeTwo(frase) {
  let fraseMinusc = frase.toLowerCase();
  let fraseArray = fraseMinusc.split("");
  let filtered = fraseArray.filter(element => element !== " ");
  let reversed = [...filtered].reverse();

  let filteredString = String(filtered);
  let reversedCopy = String(reversed);

  if (filteredString === reversedCopy) {
    console.log(true);
  } else {
    console.log(false);
  }
}
PalindromeTwo(str);
