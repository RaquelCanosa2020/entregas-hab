"use strict";

const equipoMaria = [62, 34, 55];
const equipoPaula = [35, 60, 59];
const equipoRebeca = [40, 39, 63];

/*
He intentado sumar con un bucle, pero no me sale
let suma = 0;
function sumar(equipo) {
  for (let i = 0; i < 3; i++) {
    suma = suma + equipo[i];
    console.log(suma);
  }
}
console.log(sumar(equipoMaria));*/

function calcularMedia(equipo) {
  return (equipo[0] + equipo[1] + equipo[2]) / equipo.length;
}

console.log(
  `el equipo de María ha obtenido una puntuación media de ${calcularMedia(
    equipoMaria
  )}`
);
console.log(
  `el equipo de Paula ha obtenido una puntuación media de ${calcularMedia(
    equipoPaula
  )}`
);

console.log(
  `el equipo de Rebeca ha obtenido una puntuaciópn media de ${calcularMedia(
    equipoRebeca
  )}`
);

const medias = [
  calcularMedia(equipoMaria),
  calcularMedia(equipoPaula),
  calcularMedia(equipoRebeca)
];

if (medias[0] > medias[1] && medias[0] > medias[2]) {
  console.log(
    `el equipo de María tiene la puntuación media más alta: ${medias[0]}`
  );
} else if (medias[1] > medias[2] && medias[1] > medias[0]) {
  console.log(
    `el equipo de Paula tiene la puntuación media más alta: ${medias[1]}`
  );
} else if (medias[2] > medias[0] && medias[2] > medias[1]) {
  console.log(
    `el equipo de Rebeca tiene la puntuación media más alta: ${medias[2]}`
  );
}
