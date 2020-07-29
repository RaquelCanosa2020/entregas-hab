const { getConnection } = require("../../db");
const { processAndSaveImage, generateError, showDebug } = require("../../helpers");

const { newEntrySchema } = require("../../validators/diaryValidators");

async function newEntry(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    await newEntrySchema.validateAsync(req.body);

    // Sacar de req.body los datos que necesitio
    const { place, description } = req.body;

    // Comprobar que están todos los datos necesarios
    if (!place) {
      const error = new Error(
        "Faltan datos en la petición. El campo place es obligatorio"
      );
      error.httpStatus = 400;
      throw error;
    }


    // Ejecutar la query
    const [result] = await connection.query(
      `
      INSERT INTO diary(date, place, description, image, lastUpdate, user_id)
      VALUES(UTC_TIMESTAMP(),?,?,?,UTC_TIMESTAMP(), ?)
      `,
      [place, description, req.auth.id]
    );
    //req.auth.id lo sacamos de la información del token. Creamos req.auth
    //y le metimos la información en el logging.

    const images = [];

    if (req.files && Object.keys(req.files).length > 0) {
      for (const [imageName, imageData] of Object.entries(req.files).slice(
        0,
        3
      )) {
        try {
          showDebug(imageName);

          const processedImage = await processAndSaveImage(imageData);

          images.push(processedImage);

          await connection.query(
            `
            INSERT INTO diary_images (uploadDate, image, entry_id)
            VALUES(UTC_TIMESTAMP, ?, ?)
          `,
            [processedImage, result.insertId]
          );
        } catch (error) {
          throw generateError(
            "No se pudo procesar la imagen. Inténtalo de nuevo",
            400
          );
        }
      }
    }


    // Devolver el resultado

    res.send({
      status: "ok",
      data: {
        id: result.insertId,
        place,
        description,
        images,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newEntry;

//En FII hemos incluido en la ref de las tablas user_id.
