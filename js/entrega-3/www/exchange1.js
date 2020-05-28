"use strict";

const currency = 25;

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
