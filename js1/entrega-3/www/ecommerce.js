"use strict";
/*Crear un falso e-commerce. Por un lado tenemos todos los artículos que forman
 el stock de la tienda. Tendremos también un usuario que añade cosas a su carrito,
 que es privado. Los artículos cuando los metemos al carrito los convertimos un tipo de
 dato que guarda las unidades del usuario de dicho artículo. La tienda es la
 encargada de imprimir un ticket por la consola  .
*/

const itemNames = ["Camisa", "Pantalon", "Calcetines"];
const itemPrices = [13, 27, 100];

class Item {
  itemType;
  price;

  constructor(itemType, price) {
    this.itemType = itemType;
    this.price = price;
  }
}

// elaboramos un array con todos los items a la venta y sus precios:

const inventary = itemNames.map((name, index) => {
  return new Item(name, itemPrices[index]);
});

class User {
  #carrito = [];

  addItems(item) {
    let foundItem = this.#carrito.find((element) => {
      return element.itemData.itemType === item.itemType;
    });
    if (foundItem) {
      foundItem.ammount++;
    } else {
      this.#carrito.push({ itemData: item, ammount: 1 });
    }

    // Primero busco si está en el carrito

    // Si no habia, lo meto
    //else {s
    //Si existia le incremento las unidades
    //
  }
  fillCart(inventary, ammount) {
    for (let i = 0; i < ammount; i++) {
      const inventaryIndex = Math.floor(Math.random() * inventary.length);
      this.addItems(inventary[inventaryIndex]);
    }
  }

  leerCarrito() {
    return this.#carrito;
  }
}

const myUser = new User();

myUser.fillCart(inventary, 10);

//console.log(myUser);

class Shop {
  carrito;

  constructor(carrito) {
    this.carrito = carrito.leerCarrito();
  }
  getTicket() {
    this.carrito.map((element) => {
      return (element.precioPorElemento =
        element.ammount * element.itemData.price);
    });
    return this.carrito;
  }

  getTotal() {
    const precioTotal = this.carrito.reduce((total, cadaItem) => {
      return total + cadaItem.precioPorElemento;
    }, 0);
    const unidadesTotal = this.carrito.reduce((total, cadaItem) => {
      return total + cadaItem.ammount;
    }, 0);

    console.log(
      `La factura incluye un total de ${unidadesTotal} unidades y asciende a ${precioTotal} €`
    );
  }
}

const ticket = new Shop(myUser);
//console.log(ticket);

const ticketPrecios = ticket.getTicket();
//console.log(ticketPrecios);

for (const iterator of ticketPrecios) {
  console.log(
    `artículo: ${iterator.itemData.itemType}, precio unidad: ${iterator.itemData.price}, cantidad: ${iterator.ammount}, subtotal: ${iterator.precioPorElemento}`
  );
}
ticket.getTotal();
