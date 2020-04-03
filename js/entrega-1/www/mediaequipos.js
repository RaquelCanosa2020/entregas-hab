"use strict";

const puntuaciones = [
  {
    equipo: "María",
    puntos: [62, 34, 55]
  },
  {
    equipo: "Paula",
    puntos: [35, 60, 59]
  },
  {
    equipo: "Rebeca",
    puntos: [40, 39, 63]
  }
];

puntuaciones.map((equipo, index) => {
  let suma = puntuaciones[index].puntos.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  puntuaciones[index].media = suma / puntuaciones[index].puntos.length;

  return equipo;
});

console.log(puntuaciones);

const ordenado = puntuaciones.sort((a, b) => b.media - a.media);

console.log(
  `el equipo de ${ordenado[0].equipo} tiene la puntuación media más alta: ${ordenado[0].media}`
);
