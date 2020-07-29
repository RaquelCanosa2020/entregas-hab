require("dotenv").config(); //requerimos el dotenv, ya que en .env tenemos los datos de la BD.

const mysql = require("mysql2/promise"); //requerimos este módulo. es el 2 pq nos permite trabajar con async await

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env; //desestructuramos para obtener las diferentes
//variables que hemos definido en .env como variables de entorno.

//console.log(process.env);

let pool; //esta variable es un conjunto de conexiones a la BD, ya que en web se podrían conectar varios usuarios.

async function getConnection() {
  //esta función establece la conexión con la BD.
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      timezone: "Z",
    });
  }

  return await pool.getConnection();
}

module.exports = {
  getConnection,
};
