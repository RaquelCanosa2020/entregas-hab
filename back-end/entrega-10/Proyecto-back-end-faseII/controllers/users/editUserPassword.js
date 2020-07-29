const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");
const { editUserPasswordSchema } = require("../../validators/userValidators");

async function editUserPassword(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    await editUserPasswordSchema.validateAsync(req.body);

    const { id } = req.params; //Importante: esto va a ser un string
    const { oldPassword, newPassword } = req.body;

    // Comprobar que el usuario que hace la petición es el mismo que quiere cambiar la pass
    if (req.auth.id !== Number(id)) {
      throw generateError("No puedes cambiar la password de otro usuario", 403);
    }
    //comprobar que el usuario exite: isUser.js
    // Comprobar que la password antigua no es igual que la nueva: validator

    // y que la password antigua es la correcta
    const [currentUser] = await connection.query(
      `
      SELECT id
      FROM users
      WHERE id=? AND password=SHA2(?, 512)
    `,
      [id, oldPassword]
    );

    if (currentUser.length === 0) {
      throw generateError("Tu password antigua no es correcta", 401);
    }

    // Guardar nueva password. Incluimos la fecha de última actualización de autorización
    //para controlar en isUser que sea siempre anterior a la del token,
    //si cambia la contraseña, se tienen que logar de nuevo.

    await connection.query(
      `
      UPDATE users
      SET password=SHA2(?, 512), lastUpdate=UTC_TIMESTAMP(), lastAuthUpdate=UTC_TIMESTAMP()
      WHERE id=?
    `,
      [newPassword, id]
    );

    // Dar una respuesta
    res.send({
      status: "ok",
      message: "Password actualizada",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editUserPassword;
