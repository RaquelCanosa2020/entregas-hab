//necesitamos formatear la fecha que nos proporcionan los js, para que sea válida para mysql:

const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
const uuid = require("uuid");
const crypto = require("crypto"); //módulo nativo. Para crear códigos únicos y seguros para que el usuario active su cuenta.

const sendgrid = require("@sendgrid/mail"); // instalamos esto para enviar mails a usuarios

const { format, addMinutes } = require("date-fns");

// Definimos directorio de subida de imágenes
const imageUploadPath = path.join(__dirname, process.env.UPLOADS_DIR);

//1. usamos date-fns para dar formato válido a la fecha, Debido al desfase entre horas en 
//js(UTC) y en sql(local) para guardar en la bd en utc debemos añadir la diferencia horaria:

function formatDateToDB(date) {
  let internal_date;

  if (typeof date === "string") {
    internal_date = new Date(date);
  } else {
    internal_date = date;
  }

  const adjusted_date = addMinutes(
    internal_date,
    internal_date.getTimezoneOffset()
  );

  return format(adjusted_date, "yyyy-MM-dd HH:mm:ss");
}

//2. función para procesar y guardar imágenes:

async function processAndSaveImage(uploadedImage) {
  // Creamos el directorio (con recursive: true por si hay subdirectorios y así no da error)
  await fs.mkdir(imageUploadPath, { recursive: true });

  // Leer la imagen que se subio
  const image = sharp(uploadedImage.data); //upl.data es el buffer

  //console.log(uploadedImage);
  //console.log(image);

  // Saco información de la imagen
  const imageInfo = await image.metadata();

  //console.log(imageInfo);

  // Cambiarle el tamaño si es necesario
  if (imageInfo.width > 1000) {
    image.resize(1000);
  }

  // Guardar la imagen en el directorio de subidas
  const imageFileName = `${uuid.v4()}.jpg`; //usamos el módulo uuid para darle identificador único
  await image.toFile(path.join(imageUploadPath, imageFileName));

  // Devolver el nombre con el que fue guardada
  return imageFileName;
}

//3. Función para borrar imágenes (cuando se borran registros de viajes):

async function deleteUpload(uploadedImage) {
  await fs.unlink(path.join(imageUploadPath, uploadedImage));
}

//creamos función para generar códigos aleatorios que enviaremos
//en el correo electrónico para activación de usuarios:

function randomString(length = 20) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

//Nos devuelve un string de 20 caracteres que enviaremos al usuario y dónde deberá pinchar para activar cuenta.

async function sendMail({ email, title, content }) {
  // Configurar api key de sendgrid
  sendgrid.setApiKey(process.env.SENDGRID_KEY);

  // Configurar mensaje
  const message = {
    to: email,
    from: process.env.SENDGRID_FROM,
    subject: title,
    text: content,
    html: `
      <div>
        <h1>${title}</h1>
        <p>${content}</p>
      </div>
    `,
  };

  // Enviar mensaje
  await sendgrid.send(message);
}

function generateError(message, code = 500) {
  const error = new Error(message);
  error.httpStatus = code;
  return error;
}

function showDebug(message) {
  if (process.env.NODE_ENV === "development") {
    console.log(message);
  }
}


module.exports = {
  formatDateToDB,
  processAndSaveImage,
  deleteUpload,
  randomString,
  sendMail,
  generateError,
  showDebug
};
