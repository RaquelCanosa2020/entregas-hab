"use strict";

/*Accede con fetch a la información de la siguiente API: 
https://api.exchangerate-api.com/v4/latest/EUR. D
ado un valor en euros (EUR), convierte dicha cantidad a dólares (USD). 
Por último convierte el resultado obtenido en dólares a yenes (JPY).*/

const currency = parseInt(prompt(`introduce una cantidad en euros`));

/*En "exchange1" obtendríamos los dos datos en la misma función, no sé si es suficiente así,
pero según el enunciado entiendo que
primero debo obtener los dólares, guardarlos en variable y después a partir
de la misma los yenes*/

async function getDollars(quantity) {
  const requestInfo = await fetch(
    "https://api.exchangerate-api.com/v4/latest/EUR"
  );

  const infoData = await requestInfo.json();

  const rateUSD = infoData.rates.USD;
  const numberUSD = rateUSD * quantity;

  return numberUSD;
}

getDollars(currency).then((valueUSD) => {
  console.log(`${currency} euros son ${valueUSD} dólares US`);
});

async function getYen() {
  const resultDollars = await getDollars(currency).then((valueUSD) => {
    return valueUSD;
  });

  const requestInfo = await fetch(
    "https://api.exchangerate-api.com/v4/latest/EUR"
  );

  const infoData = await requestInfo.json();

  const rateUSD = infoData.rates.USD;
  const rateJPY = infoData.rates.JPY;
  const rateJPY_USD = rateJPY / rateUSD;
  const numberJPY = resultDollars * rateJPY_USD;

  console.log(`${resultDollars} dólares US son ${numberJPY} yenes`);
}

getYen();
