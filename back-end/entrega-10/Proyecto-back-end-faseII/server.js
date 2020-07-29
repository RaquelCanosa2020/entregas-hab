//js principal. En él iremos llamando a los diferentes js de controllers/diary, cada uno de ellos hará
//una tarea. Simplemente por tener el código más ordenado y que este js no sea inmanejable.

//llamamos al .env:
require("dotenv").config();

//llamamos a los diferentes módulos que necesitamos:
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

//llamamos a los diferentes middlewares y funciones que están en otros js:
const entryExists = require("./middlewares/entryExists");
const isUser = require("./middlewares/isUser");
const isAdmin = require("./middlewares/isAdmin");

//Content controllers:

const listEntries = require("./controllers/diary/listEntries");
const getEntry = require("./controllers/diary/getEntry");
const newEntry = require("./controllers/diary/newEntry");
const editEntry = require("./controllers/diary/editEntry");
const deleteEntry = require("./controllers/diary/deleteEntry");
const voteEntry = require("./controllers/diary/voteEntry");
const getEntryVotes = require("./controllers/diary/getEntryVotes");
const deleteEntryImage = require("./controllers/diary/deleteEntryImage");
const uploadEntryImage = require("./controllers/diary/uploadEntryImage");


//User controllers:
const newUser = require("./controllers/users/newUser");
const validateUser = require("./controllers/users/validateUser");
const loginUser = require("./controllers/users/loginUser");
const getUser = require("./controllers/users/getUser");
const editUser = require("./controllers/users/editUser");
const deleteUser = require("./controllers/users/deleteUser");
const editUserPassword = require("./controllers/users/editUserPassword");
const recoverUserPassword = require("./controllers/users/recoverUserPassword");
const resetUserPassword = require("./controllers/users/resetUserPassword");

const app = express();

// Middlewares iniciales

// Log de peticiones a la consola
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// Procesado de body tipo json
app.use(bodyParser.json());

// Procesado de body tipo form-data
app.use(fileUpload());

// API / CRUD / entidades / endpoint

/**ENDPOINT DE CONTENIDOS */

// Listar multiples entradas del diario de viajas
// GET - /entries ✅
// Público
app.get("/entries", listEntries);

// Mostrar una sola entrada del diario
// GET - /entries/:id ✅
// Público
app.get("/entries/:id", entryExists, getEntry);

// Crear una nueva entrada del diario
// POST - /entries ✅
// Sólo usuarios registrados
app.post("/entries", isUser, newEntry);

// Editar una entrada del diario
// PUT - /entries/:id ✅
// Sólo usuario que creara esta entrada o admin
app.put("/entries/:id", isUser, entryExists, editEntry);

// Borrar una entrada del diario
// DELETE - /entries/:id ✅
// Sólo usuario que creara esta entrada o admin
app.delete("/entries/:id", isUser, entryExists, deleteEntry);

app.delete(
  "/entries/:id/images/:imageID",
  isUser,
  entryExists,
  deleteEntryImage
);

// Añadir una imagen a una entrada
// POST /entries/:id/images
// Solo usuario que crear esta entrada o admin
app.post("/entries/:id/images", isUser, entryExists, uploadEntryImage);


// Votar una entrada
// POST - /entries/:id/votes ✅
// Sólo usuarios registrados
app.post("/entries/:id/votes", isUser, entryExists, voteEntry);

// Ver votos de una entrada
// GET - /entries/:id/votes ✅
// Público
app.get("/entries/:id/votes", entryExists, getEntryVotes);

/**ENDPOINT DE USUARIOS */

//Registro de usuario.
//POST -/users ✅
//Público
app.post("/users", newUser);

//Validación de usuarios // se pone en marcha cuando el usuario pincha el enlace
//GET -/users/validate/:code ✅
//Público
app.get("/users/validate/:code", validateUser);

//Login de usuarios
//POST -users/login ✅
//Público
app.post("/users/login", loginUser);

//Ver info de un usuario
//GET - /users/:id ✅
//Sólo para usuarios registrados
//SI es el usuario registrado o admin muestra toda la info
app.get("/users/:id", isUser, getUser);

//Editar datos de usuario
//PUT - users/:id ✅
//Sólo usuario registrado
app.put("/users/:id", isUser, editUser);

// Borrar un usuario
// DELETE- /users/:id ✅
// Sólo el usuario admin
app.delete("/users/:id", isUser, isAdmin, deleteUser);

//Editar password
//POST - users/:id/password
//Sólo usuario registrado
app.post("/users/:id/password", isUser, editUserPassword);

// Enviar código de reset de password
// POST - /users/recover-password
// Público
app.post("/users/recover-password", recoverUserPassword);

// Resetear password de usuario
// POST - /users/reset-password
// Público
app.post("/users/reset-password", resetUserPassword);

// Middlewares finales

// Error middleware
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

// Not found
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`API funcionando en http://localhost:${port} 🙈`);
});
