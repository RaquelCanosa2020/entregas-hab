const { getConnection } = require("../../db");
const { deleteUpload, generateError } = require("../../helpers");

async function deleteUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    // Compruebo que existe el usuario
    const [current] = await connection.query(
      `
      SELECT id, image
      FROM users
      WHERE id=?
    `,
      [id]
    );

    if (current.length === 0) {
      generateError(
        `No existe ningún usuario con id ${id} en la base de datos`, 404);
    }

    if (current[0].image) {
      await deleteUpload(current[0].image);
    }

    await connection.query(
      `
      DELETE FROM users
      WHERE id=?
    `,
      [id]
    );

    res.send({
      status: "ok",
      message: `El usuario con id ${id} fue borrado`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = deleteUser;
