"use strict";

let N1 = 7;
let N2 = 5;
let operacion = "otro";

/* Operaciones posibles:
"suma"
"resta1" (resta N1-N2)
"resta2" (resta N2-N1)
"multiplicacion"
"division1" (divide N1/N2)
"division2" (divide N2/N1)
"potencia" (N1 elevado a N2)
*/

if (operacion === "suma") {
  console.log(N1 + N2);
} else if (operacion === "resta1") {
  console.log(N1 - N2);
} else if (operacion === "resta2") {
  console.log(N2 - N1);
} else if (operacion === "multiplicacion") {
  console.log(N2 * N1);
} else if (operacion === "division1") {
  console.log(N1 / N2);
} else if (operacion === "division2") {
  console.log(N2 / N1);
} else if (operacion === "potencia") {
  console.log(N1 ** N2);
} else {
  console.log("operación no permitida");
}
