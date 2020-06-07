const h1 = document.querySelector("#hora");
const p = document.querySelector("#mensaje");
const body = document.querySelector("body");
const header = document.querySelector("header");

const info = prompt("hora alarma en formato hh:mm:ss");

let hour;

if (info === "" || info === null) {
  hour = null;
} else {
  hour = info.split(":");
  header.dataset.hour = format(hour[0]);
  header.dataset.minute = format(hour[1]);
  header.dataset.second = format(hour[2]);
}

console.log(header.getAttribute("data-hour"));

function clock() {
  const ahora = new Date();

  h1.textContent = `${format(ahora.getHours())}:${format(
    ahora.getMinutes()
  )}:${format(ahora.getSeconds())}`;

  if (
    ahora.getHours() === Number(header.getAttribute("data-hour")) &&
    ahora.getMinutes() === Number(header.getAttribute("data-minute")) &&
    ahora.getSeconds() === Number(header.getAttribute("data-second"))
  ) {
    clearInterval(interval);
    body.setAttribute("class", "alarm");
  } else {
    if (ahora.getHours() >= 6 && ahora.getHours() < 14) {
      p.textContent = "BUENOS DÍAS";
      body.setAttribute("class", "morning");
    } else if (ahora.getHours() >= 14 && ahora.getHours() < 21) {
      p.textContent = "BUENAS TARDES";
      body.setAttribute("class", "evening");
    } else {
      p.textContent = "BUENAS NOCHES";
      body.setAttribute("class", "night");
    }
  }
}

clock();
const interval = setInterval(clock, 1000);

function format(number) {
  if (number >= 10) {
    return number;
  }
  return "0" + number;
}
