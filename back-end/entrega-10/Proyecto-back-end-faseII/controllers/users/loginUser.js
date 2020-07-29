const { getConnection } = require("../../db");
const jsonwebtoken = require("jsonwebtoken");
const { generateError } = require("../../helpers");
const { loginUserSchema } = require("../../validators/userValidators");


async function loginUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    await loginUserSchema.validateAsync(req.body);

    // comprobar que se reciben los datos necesarios
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError(
        "Faltan datos para hacer login es necesario enviar el email y la password", 409);
    }

    // Seleccionar el usuario de la base de datos y comprobar que las passwords coinciden
    const [dbUser] = await connection.query(
      `
      SELECT id, email, role, active
      FROM users
      WHERE email=? AND password=SHA2(?, 512)
    `,
      [email, password]
    );

    if (dbUser.length === 0) {
      throw generateError(
        "No hay ningún usuario registrado activo con ese email o la password incorrecta", 401);
    } else if (!dbUser[0].active) {
      throw generateError(
        "El usuario está registrado pero no activado. Por favor revisa tu email y activalo",
        401
      );
    }
    // Generar token con información del usuario
    const tokenInfo = {
      id: dbUser[0].id,
      role: dbUser[0].role,
    };

    const token = jsonwebtoken.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "30d",
    });

    // Devolver el token
    res.send({
      status: "ok",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = loginUser;
