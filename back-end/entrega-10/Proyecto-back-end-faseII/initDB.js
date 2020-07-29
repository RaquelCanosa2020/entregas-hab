//Este js no depende de express. Lo tenemos para resetear la BD cuando hagamos pruebas
//Ojo, que nos borra las tablas que hayamos metido.

require("dotenv").config(); //llamamos al .env

//const bcrypt = require("bcrypt"); //para encriptar constraseñas. La quitamos usamos mysql SHA2
const faker = require("faker/locale/es"); //para introducir datos de prueba
const { getConnection } = require("./db");
const { formatDateToDB } = require("./helpers");
const { random } = require("lodash");

let connection;

async function main() {
  try {
    // Conseguir conexión a la base de datos
    connection = await getConnection();

    // Borrar las tablas si existen (diary, diary_votes)
    console.log("Borrando tablas");
    await connection.query("DROP TABLE IF EXISTS users");
    await connection.query("DROP TABLE IF EXISTS diary");
    await connection.query("DROP TABLE IF EXISTS diary_votes");
    await connection.query("DROP TABLE IF EXISTS diary_images");

    // Crear las tablas de nuevo
    console.log("Creando tablas");

    await connection.query(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        registrationDate DATETIME NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TINYTEXT NOT NULL,
        role ENUM("normal", "admin") DEFAULT "normal" NOT NULL,
        name TINYTEXT,
        image TINYTEXT,
        active BOOLEAN DEFAULT false,
        registrationCode TINYTEXT,
        passwordUpdateCode TINYTEXT,
        lastUpdate DATETIME NOT NULL,
        lastAuthUpdate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE diary (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        date DATETIME NOT NULL,
        description TEXT,
        place VARCHAR(200) UNIQUE NOT NULL,
        image TINYTEXT,
        user_id INTEGER NOT NULL,
        lastUpdate DATETIME NOT NULL
      );
    `);

    await connection.query(`
      CREATE TABLE diary_votes (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        entry_id INTEGER NOT NULL,
        vote TINYINT NOT NULL,
        date DATETIME NOT NULL,
        user_id INTEGER NOT NULL,
        lastUpdate DATETIME NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE diary_images (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        uploadDate DATETIME NOT NULL,
        image TINYTEXT,
        entry_id INTEGER NOT NULL
      )
    `);



    // Meter datos de prueba en las tablas

    //el usuario addor lo metemos manualmente, sin faker, ya q debemos controlar sus datos
    //y, en especial la contraseña:

    console.log("Creando usuario administrador");

    //const password = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

    //hash tiene dos parámetros, la contraseña, y el nº de veces que se hace encriptado
    //cuantas más veces mejor, 10 suele ser suficiente.

    //cambio: tras hablar con Santi, encriptamos en la propia BD con SHA2.
    //para incluir las operaciones con usuarios, añadimos el campo active, que en el caso del addor siempre debe ser true.

    await connection.query(
      `
      INSERT INTO users(registrationDate, email, password, role, name, active, lastUpdate)
      VALUES(UTC_TIMESTAMP(), "raquel@raquel.com", SHA2("${process.env.DEFAULT_ADMIN_PASSWORD}", 512), "admin", "Raquel", true, UTC_TIMESTAMP())
    `
    );

    console.log("Metiendo datos de prueba en users");
    const users = 10;

    for (let index = 0; index < users; index++) {
      const email = faker.internet.email();
      //const password = await bcrypt.hash(faker.internet.password(), 10);
      const name = faker.name.findName();

      await connection.query(
        `
        INSERT INTO users(registrationDate, email, password, role, name, lastUpdate)
        VALUES(UTC_TIMESTAMP(), "${email}", SHA2("${faker.internet.password()}",512), "normal", "${name}", UTC_TIMESTAMP())
      `
      );
    }

    console.log("Metiendo datos de prueba en diary");

    const diaryEntries = 10;

    for (let index = 0; index < diaryEntries; index++) {
      const date = formatDateToDB(faker.date.recent());

      await connection.query(`
        INSERT INTO diary(date, description, place, lastUpdate, user_id)
        VALUES(
          "${date}", 
          "${faker.lorem.paragraph()}", 
          "${faker.address.city()}", 
          UTC_TIMESTAMP(), 
          "${random(2, users + 1)}")
      `);
    }

    //Añadimos el user_id, referencia al usuario que introduce la entrada. Como número aleatorio entre 2(ya que el 1 es el addor
    //y users+1, si tenemos 10 usuarios en realidad tenemos 11, por la misma razón, el addor es el 1.

    console.log("Metiendo datos de prueba en diary_votes");

    const diaryVotesEntries = 100;

    for (let index = 0; index < diaryVotesEntries; index++) {
      // entry_id, vote, date, ip, lastUpdate
      const date = formatDateToDB(faker.date.recent());

      await connection.query(`
        INSERT INTO diary_votes(entry_id, vote, date, user_id, lastUpdate)
        VALUES (
          "${random(1, diaryEntries)}", 
          "${random(1, 5)}", 
          "${date}", 
          "${random(2, users + 1)}", 
          UTC_TIMESTAMP())
      `);
    }

    //Añadimos user_id igual que lo anterior.
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Todo hecho, liberando conexión");
    if (connection) connection.release();
    process.exit();
  }
}

main();
