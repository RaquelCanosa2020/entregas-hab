<template>
  <div>
    <h1 id="title">HACK A MARKET</h1>
    <div id="nav">
      <!---INDICE y links con el nombre dinámico---->
      <router-link :to="{name:'Home'}">Home</router-link>|
      <router-link :to="{name:'About'}">About</router-link>|
      <router-link :to="{name:'Productos'}">Productos</router-link>|
      <router-link :to="{name:'Clientes'}">Clientes</router-link>|
      <router-link :to="{name:'Registro'}">Registar</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuCustom",
};
</script>

<style scoped>
#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #ccafaf;
  font-size: 0.8rem;
}

#nav a.router-link-exact-active {
  color: #900c3f;
}

h1 {
  margin-bottom: 1rem;
  color: #900c3f;
  margin-left: auto;
  margin-right: auto;
}

h1#title {
  font-size: 2rem;
}

@media (min-width: 700px) {
  #nav a {
    font-size: 1.2rem;
    padding: 1rem;
  }
}

@media (min-width: 1000px) {
  h1 {
    margin-bottom: 2rem;
  }

  h1#title {
    font-size: 4rem;
  }
  #nav {
    padding: 40px;
  }
  #nav a {
    padding: 1rem;
    font-size: 1.5rem;
  }
}
</style>