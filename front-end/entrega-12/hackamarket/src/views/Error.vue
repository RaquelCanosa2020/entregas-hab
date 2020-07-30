<template>
  <!--Página de error-->
  <div class="error">
    <vue-headful title="Error" />
    <h1>Página no encontrada. 404</h1>
  </div>
</template>

<script>
export default {
  name: "Error",
};
</script>

<style scoped>
* {
  height: 100vh;
  background-image: url(https://media.giphy.com/media/l0IykY1Ux3YNrJzby/giphy.gif);
  background-size: cover;
  background-position-y: -500px;
  color: rgb(87, 35, 100);
}
</style>
