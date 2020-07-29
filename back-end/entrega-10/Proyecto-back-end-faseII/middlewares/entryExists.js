//Para ahorrar código, hacemos este middl para comprobar que un determinado registro existe
//haremos referencia en las app que lo necesiten en server.js.

const { getConnection } = require("../db");
const { generateError } = require("../helpers");

async function entryExists(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;

    console.log("comprobando que en la tabla de diary hay una entrada id", id);

    // Comprobar que la entrada que queremos editar exista en la base de datos
    const [current] = await connection.query(
      `
    SELECT id
    FROM diary
    WHERE id=?
  `,
      [id]
    );

    if (current.length === 0) {
      throw generateError(
        `La entrada con id ${id} no existe en la base de datos`,
        404)

    } else {
      next();
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = entryExists;
