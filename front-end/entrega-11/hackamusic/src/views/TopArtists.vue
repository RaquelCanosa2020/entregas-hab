<template>
  <div>
    <vue-headful title="Hackamusick | TopArtists" />
    <!---Indicamos al html lo que tiene que mostrar del módulo---->

    <!----<button @click="sweetAlertOn()">BUSCAR</button>--->

    <topartists :artists="artists" />
  </div>
</template>

<script>
//Importamos la api y el módulo a utilizar
import api from "@/api/index.js";
import topartists from "@/components/TopArtistsTable.vue";

export default {
  components: {
    //registramos el componente a utilizar
    topartists
  },
  data() {
    return {
      //definimos donde incluir la info
      artists: []
    };
  },
  created() {
    //llamamos a la función que importa los datos de la API
    api
      .getArtists()
      .then(response => (this.artists = response.data.topartists.artist));
  }
};
</script>


<style scoped>
</style>