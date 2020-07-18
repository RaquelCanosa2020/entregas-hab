<template>
  <div>
    <vue-headful title="Hackamusick | TopTracks" />
    <!---Indicamos al html lo que tiene que mostrar del módulo---->
    <h1>TOP TRACKS</h1>
    <toptrackstable :tracks="tracks" />
  </div>
</template>

<script>
//Importamos la api y el módulo a utilizar
import api from "@/api/index.js";
import toptrackstable from "@/components/TopTracksTable.vue";

export default {
  components: {
    //registramos el componente a utilizar
    toptrackstable
  },
  data() {
    return {
      //definimos donde incluir la info
      tracks: []
    };
  },
  created() {
    //llamamos a la función que importa los datos de la API
    api
      .getTopTracks()
      .then(response => (this.tracks = response.data.tracks.track));
  }
};
</script>

<style scoped>
</style>