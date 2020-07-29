const { getConnection } = require("../../db");

async function listEntries(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    // Sacamos las posibles opciones del querystring:
    //  search: para listar solo las entradas que contengan su valor en place o description
    //  order: para ordernar el listado por voteAverage, place o date
    //  direction: para la dirección de la ordenación desc o asc
    const { search, order, direction } = req.query;

    // Proceso la dirección de orden
    const orderDirection =
      (direction && direction.toLowerCase()) === "desc" ? "DESC" : "ASC";

    // Proceso el campo de orden
    let orderBy;
    switch (order) {
      case "voteAverage":
        orderBy = "voteAverage";
        break;
      case "place":
        orderBy = "place";
        break;
      default:
        orderBy = "date";
    }

    // Ejecuto la query en base a si existe querystring de search o no
    let queryResults;

    //queryResult es un [resultados-query, otra info que no nos interesa]
    //podríamos hacer [queryResult] = await....desesctructuramos para que ya nos de solo lo que nos interesa.

    if (search) {
      queryResults = await connection.query(
        `
        SELECT diary.id, diary.date, diary.place, diary.user_id,
        (SELECT AVG(vote) FROM diary_votes WHERE entry_id=diary.id) AS voteAverage
        FROM diary 
        WHERE place LIKE ? OR description LIKE ?
        ORDER BY ${orderBy} ${orderDirection}
        `,
        [`%${search}%`, `%${search}%`] //sustituyen a los dos ? respectivamente.

        //asi se controla que no se metan búsquedas que son código mysql y revienten la BD

        //¡¡¡¡¡📣MUY IMPORTANTE: no incluir directamente inputs en la BD que incluya el usuario directamente📣!!!!!!

        //probamos en postman: key: search, value: lo que queremos buscar.
      );
    } else {
      queryResults = await connection.query(
        `
        SELECT diary.id, diary.date, diary.place, diary.user_id,
        (SELECT AVG(vote) FROM diary_votes WHERE entry_id=diary.id) AS voteAverage
        FROM diary 
        ORDER BY ${orderBy} ${orderDirection}`
      );
    }

    // Extraigo los resultados reales del resultado de la query
    const [result] = queryResults;

    // Mando la respuesta
    res.send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = listEntries;

//En FII hemos incluido en la ref de las tablas diary.user_id.
