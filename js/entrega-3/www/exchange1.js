"use strict";

/*Accede con fetch a la información de la siguiente API: 
https://api.exchangerate-api.com/v4/latest/EUR. D
ado un valor en euros (EUR), convierte dicha cantidad a dólares (USD). 
Por último convierte el resultado obtenido en dólares a yenes (JPY).*/

//const moneda = parseInt(prompt(`introduce una cantidad en  euros`));

const currency = 25;

async function getInfo(number) {
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

getInfo(currency);
