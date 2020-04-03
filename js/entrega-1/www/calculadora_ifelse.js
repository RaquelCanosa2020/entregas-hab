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

function operar(a, b) {
  let result;
  if (operacion === "suma") {
    result = a + b;
  } else if (operacion === "resta1") {
    result = a - b;
  } else if (operacion === "resta2") {
    result = b - a;
  } else if (operacion === "multiplicacion") {
    result = a * b;
  } else if (operacion === "division1") {
    result = a / b;
  } else if (operacion === "division2") {
    result = b / a;
  } else if (operacion === "potencia") {
    result = a ** b;
  } else {
    result = "operación no permitida";
  }
  return result;
}

operar(N1, N2);

console.log(`resultado: ${operar(N1, N2)}`);
