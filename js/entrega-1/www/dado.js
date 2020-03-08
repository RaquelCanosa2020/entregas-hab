"use strict";

/* no me sale :(



function tirarDado() {
  return Math.round(Math.random() * 6);
}

function sumarValores(numeroTiradas) {
  for (let i = 1; i <= numeroTiradas; i++) {
    let resultado = tirarDado();
    if ((i = 1)) {
      return resultado;
    } else {
      return resultado + (resultado - 1);
    }
  }
}

function darResultados() {
  let resultado;
  let suma = sumarValores();
  let numeroTiradas;
  if (suma < 50) {
    console.log(`tirada ${jugar(i)}. Has obtenido un total 
    de ${sumarValores(i)} puntos`);
  } else {
    console.log(
      `¡Enhorabuena, ha salido un ${resultado}! 
    ¡Has ganado con un total de ${suma} puntos` + "!"
    );
  }
}
darResultados();
