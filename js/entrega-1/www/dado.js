"use strict";

function tirarDado() {
  return Math.ceil(Math.random() * 6); //uso Math.ceil para que no me elija el 0.
}

let numero; // es el número aleatorio que me va a salir cada vez (del 1 al 6)
let suma = 0; // va a ser la suma acumulada de los numeros. P

/* Para llegar a 50 puntos, en el caso más desfavorable(que siempre me salga un 1)
debo tirar 50 veces */

function jugar() {
  for (let i = 1; i <= 50; i++) {
    numero = tirarDado();
    suma = suma + numero; //a cada numero que sale se le añade la suma anterior
    if (suma >= 50) {
      return (
        numero,
        console.log(
          `¡Enhorabuena, ha salido un ${numero}!¡Has ganado con un total de ${suma} puntos !`
        )
      );
    } else {
      console.log(
        `tirada ${i}.Has sacado un ${numero} y obtenido un total de ${suma} puntos`
      );
    }
  }
}
jugar();
