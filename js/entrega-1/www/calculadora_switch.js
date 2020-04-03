"use strict";

let N1 = parseInt(prompt("Introduce el primer número"));
console.log(`N1 = ${N1}`);

let N2 = parseInt(prompt("Introduce el segundo número"));
console.log(`N2 = ${N2}`);

let operacion = prompt(`Introduce la operación. 
Operaciones posibles: 
suma, 
resta1(resta N1 - N2), 
resta2(resta N2 - N1), 
multiplicacion, 
division1(divide N1 / N2), 
division2(divide N2 / N1), 
potencia(N1 elevado a N2)`);

console.log(operacion);

function operate(a, b) {
  let resultado;
  switch (operacion) {
    case "suma":
      resultado = a + b;

      break;

    case "resta1":
      resultado = a - b;

      break;

    case "resta2":
      resultado = b - a;

      break;

    case "multiplicacion":
      resultado = a * b;

      break;

    case "division1":
      resultado = a / b;

      break;

    case "division2":
      resultado = b / a;

      break;

    case "potencia":
      resultado = a ** b;

      break;

    default:
      resultado = "operación no permitida";
  }
  return resultado;
}

console.log(`resultado: ${operate(N1, N2)}`);
