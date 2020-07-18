//IMPORTAMOS la apliKey del archivo config y obtenemos las diferentes rutas de las
//que obtener los datos:
import config from "./config.js";
const apiKey = config.apiKey;
const BASE_URL = "https://ws.audioscrobbler.com/";
const URL_GEO =
  "2.0/?method=geo.gettopartists&country=spain&api_key=" +
  apiKey +
  "&format=json";

const URL_TRACKS =
  "2.0/?method=geo.gettoptracks&country=spain&api_key=" +
  apiKey +
  "&format=json";

const URL_TAGS =
  "/2.0/?method=chart.gettoptags&api_key=" + apiKey + "&format=json";

// Llamamos a axios para conectarnos a la API

const axios = require("axios").default;

//Hacemos la función asíncrona para obtener los datos de los artistas.

async function getArtists() {
  try {
    const response = await axios.get(`${BASE_URL}${URL_GEO}`);
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

//Hacemos la función asíncrona para obtener los datos de los tracks.

async function getTopTracks() {
  try {
    const response = await axios.get(`${BASE_URL}${URL_TRACKS}`);
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

//Hacemos la función asíncrona para obtener los datos de los tags.

async function getTopTags() {
  try {
    const response = await axios.get(`${BASE_URL}${URL_TAGS}`);
    console.log(response.data.tags);
    return response;
  } catch (error) {
    console.log(error);
  }
}

function getPhotos(element) {
  for (i = 0; i < element.length; i++) {

  }
}

//exportamos las funciones para poder usarlas en las vistas

export default {
  getArtists,
  getTopTracks,
  getTopTags,
};
