"use strict";

let N1 = 2;
let N2 = 5;
let operacion = "potencia";

/* Operaciones posibles:
"suma"
"resta1" (N1-N2)
"resta2" (N2-N1)
"multiplicacion"
"division1" (N1/N2)
"division2" (N2/N1)
"potencia" (N1 elevado a N2)
*/

switch (operacion) {
  case "suma":
    console.log(N1 + N2);

    break;
  case "resta1":
    console.log(N1 - N2);

    break;
  case "resta2":
    console.log(N2 - N1);

    break;
  case "multiplicacion":
    console.log(N1 * N2);

    break;
  case "division1":
    console.log(N1 / N2);

    break;
  case "division2":
    console.log(N2 / N1);

    break;
  case "potencia":
    console.log(N1 ** N2);

    break;

  default:
    console.log("operación no permitida");
}
