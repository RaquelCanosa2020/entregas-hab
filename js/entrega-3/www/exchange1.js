"use strict";

/*Accede con fetch a la información de la siguiente API: 
https://api.exchangerate-api.com/v4/latest/EUR. D
ado un valor en euros (EUR), convierte dicha cantidad a dólares (USD). 
Por último convierte el resultado obtenido en dólares a yenes (JPY).*/

//const moneda = parseInt(prompt(`introduce una cantidad en  euros`));

const currency = 25;

/*async function getInfo(number) {
  const requestInfo = await fetch(
    "https://api.exchangerate-api.com/v4/latest/EUR"
  );

  const infoData = await requestInfo.json();

  const rateUSD = infoData.rates.USD;
  const numberUSD = rateUSD * number;
  const rateJPY = infoData.rates.JPY;
  const rateJPY_USD = rateJPY / rateUSD;
  const numberJPY = numberUSD * rateJPY_USD;

  console.log(
    `${number} euros son ${numberUSD} dólares.
    ${numberUSD} dólares son ${numberJPY} yenes`
  );
}

getInfo(currency);*/

//primera parte con then (ejercicio aparte)
/*console.log(`cantidad inicial:  ${currency} euros`);

function getDollar(quantity) {
  fetch("https://api.exchangerate-api.com/v4/latest/EUR")
    .then((response) => response.json())
    .then((data) => {
      let dollars = (quantity * data.rates.USD).toFixed(2);
      console.log(`son ${dollars} USD`);
    });
}

getDollar(currency);*/

// para todo el ejercicio, lo hace con async awauit pero utiliza
// dos veces la api, una /EUR, y otra con /USD. Mucho más fácil:

async function exchange(quantity) {
  const requestDollars = await fetch(
    "https://api.exchangerate-api.com/v4/latest/EUR"
  );

  const infoDollars = await requestDollars.json();
  const USD = infoDollars.rates.USD * quantity;

  const requestYenes = await fetch(
    "https://api.exchangerate-api.com/v4/latest/USD"
  );
  const infoYenes = await requestYenes.json();
  const yen = infoYenes.rates.JPY * USD;

  console.log(`${quantity} euros son ${USD} dólares y ${yen} yenes`);
}

exchange(currency);
