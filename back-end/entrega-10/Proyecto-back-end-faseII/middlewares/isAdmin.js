const { generateError } = require("../helpers");

async function isAdmin(req, res, next) {
  if (req.auth.role === "admin") {
    next();
  } else {
    throw generateError("No tienes privilegios de administración", 403)

  }
}

module.exports = isAdmin;

//Debe ir después de isUser, ya que necesita req.auth.rote, que hemos extraído del token en isUser.
