<template>
  <div id="app">
    <menucustom />
    <router-view />
    <footercustom />
  </div>
</template>

<script>
//1 paso: importar componente

import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";

export default {
  name: "App",
  //2 paso: registrar el componente
  components: {
    menucustom,
    footercustom
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(53, 46, 46);
  background-image: url();
}

#title {
  font-size: 4rem;
  color: red;
}
#nav {
  font-size: 1.5rem;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 2rem;
}

#nav a.router-link-exact-active {
  color: red;
}
li {
  list-style: none;
}
</style>
