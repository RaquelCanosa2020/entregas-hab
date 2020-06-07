const temperaturas = [
  {
    city: "A Coruña",
    min: 17,
    max: 23,
  },
  {
    city: "Ferrol",
    min: 15,
    max: 27,
  },
  {
    city: "Lugo",
    min: 12,
    max: 31,
  },
  {
    city: "Ourense",
    min: 18,
    max: 35,
  },
  {
    city: "Pontevedra",
    min: 18,
    max: 29,
  },
];

// Temp. menor que 20: fondo verde
// Temp. entre 20 y 30: fondo naranja
// Temp. mayor de 30: fondo rojo

const body = document.body;
const temperaturasUl = document.createElement("ul");

for (const element of temperaturas) {
  const liA = document.createElement("li");
  temperaturasUl.append(liA);

  const ciudad = document.createElement("p");
  ciudad.textContent = element.city;

  liA.append(ciudad);

  const ul = document.createElement("ul");

  const il1 = document.createElement("li");
  il1.textContent = "Mínima: " + element.min + " ºC";
  ul.append(il1);
  setRange(il1, element.min);

  const il2 = document.createElement("li");
  il2.textContent = "Máxima: " + element.max + " ºC";
  ul.append(il2);
  setRange(il2, element.max);

  liA.append(ul);
}

body.append(temperaturasUl);

function setRange(li, temperature) {
  if (temperature > 30) {
    li.classList.add("hot");
  } else if (temperature > 20) {
    li.classList.add("warm");
  } else {
    li.classList.add("cold");
  }
}
