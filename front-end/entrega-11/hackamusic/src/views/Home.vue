<template>
  <div class="home">
    <vue-headful title="Hackamusick | Home" />
    <header></header>
    <!---Indicamos al html lo que tiene que mostrar del módulo---->
    <toptags :tags="toptags" />
  </div>
</template>

<script>
//Importamos la api y el módulo a utilizar
import api from "@/api/index.js";
import toptags from "@/components/TopTagsTable.vue";

export default {
  components: {
    //registramos el componente a utilizar
    toptags
  },
  data() {
    return {
      //definimos donde incluir la info
      toptags: []
    };
  },
  created() {
    //llamamos a la función que importa los datos de la API
    api.getTopTags().then(response => (this.toptags = response.data.tags.tag));
  }
};
</script>
<style scoped>
h1 {
  font-size: 2rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
