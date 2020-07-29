<template>
  <div id="app">
    <menucustom />
    <router-view />
    <footercustom />
  </div>
</template>

<script>
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";
export default {
  name: "App",
  //2 paso: registrar el componente
  components: {
    menucustom,
    footercustom,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #900c3f;
}
input {
  background-color: #ffcac2;
  border: 1px solid #ccafaf;
  border-radius: 1em;
  width: 150px;
  height: 20px;
  font-size: 0.5rem;
  text-align: left;
  margin: 0.5rem;
}
input::placeholder {
  color: #900c3f;
}

button {
  width: 50px;
  height: 20px;
  margin: 2rem 1rem;
  border-style: none;
  border-radius: 2em;
  color: #900c3f;
  background-color: #ccafaf;
  font-size: 0.5rem;
}
button:hover {
  border-style: none;
}

@media (min-width: 700px) {
  button {
    width: 100px;
    height: 40px;
    font-size: 1rem;
  }
  input {
    width: 300px;
    height: 50px;
    font-size: 1rem;
    margin: 1rem;
  }
}
@media (min-width: 1000px) {
  input {
    width: 500px;
    height: 50px;
    font-size: 1rem;
  }
}
</style>
