const temperaturas = [
  {
    city: "A coruña",
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

const section = document.querySelector("section.temp");

const table = document.createElement("table");

const caption = document.createElement("caption");
caption.textContent = "Temperaturas";

const thead = document.createElement("thead");

const thCiudad = document.createElement("th");
const thMinima = document.createElement("th");
const thMaxima = document.createElement("th");

thCiudad.textContent = "Ciudad";
thMinima.textContent = "Minima";
thMaxima.textContent = "Máxima";

thead.append(thCiudad);
thead.append(thMinima);
thead.append(thMaxima);

table.append(caption);
table.append(thead);

for (const element of temperaturas) {
  const tr = document.createElement("tr");

  const tdCiudad = document.createElement("td");
  const tdMin = document.createElement("td");
  const tdMax = document.createElement("td");

  tdCiudad.textContent = element.city;
  tdMin.textContent = element.min;
  tdMax.textContent = element.max;

  tdMin.classList.add(getClassName(element.min));
  tdMax.classList.add(getClassName(element.max));

  console.log(tdMin);

  tr.append(tdCiudad);
  tr.append(tdMin);
  tr.append(tdMax);

  table.append(tr);
}

section.append(table);

function getClassName(temp) {
  if (temp < 20) return "low";
  if (temp < 30) return "medium";
  return "high";
}
