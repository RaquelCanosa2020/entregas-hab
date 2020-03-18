"use strict";

let frase = "holaoloh";
const fraseArray = frase.split("");
const filtered = fraseArray.filter(element => element !== " ");

function PalindromeTwo() {
  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i] === filtered[filtered.length - 1 - i]);
    {
      return true;
    }
  }
  return false;
}

if (filtered.every(PalindromeTwo())) {
  console.log("es");
} else {
  console.log("no es");
}
