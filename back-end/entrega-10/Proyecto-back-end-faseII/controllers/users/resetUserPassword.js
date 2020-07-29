const { getConnection } = require("../../db");
const { generateError } = require("../../helpers");

const { resetUserPasswordSchema } = require("../../validators/userValidators");

//resetear contraseña con el código que se le envió en recoverUserPassword:

async function resetUserPassword(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await resetUserPasswordSchema.validateAsync(req.body);

    const { recoverCode, newPassword } = req.body;

    // Comprobar que existe un usuario con el código de recover en la base de datos
    const [current] = await connection.query(
      `
      SELECT id
      FROM users
      WHERE passwordUpdateCode=?
    `,
      [recoverCode]
    );

    if (current.length === 0) {
      throw generateError(
        "No hay ningún usuario con este código de recuperación de password",
        404
      );
    }

    // Guardar nueva password. Incluimos la fecha de última actualización de autorización
    //para controlar en isUser que sea siempre anterior a la del token,
    //si cambia la contraseña, se tienen que logar de nuevo.

    await connection.query(
      `
      UPDATE users
      SET password=SHA2(?, 512), passwordUpdateCode=NULL, lastUpdate=NOW(), lastAuthUpdate=NOW()
      WHERE passwordUpdateCode=?
    `,
      [newPassword, recoverCode]
    );

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

module.exports = resetUserPassword;
