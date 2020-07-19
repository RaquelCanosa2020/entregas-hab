<template>
  <div class="about">
    <vue-headful title="Hackamusick | About" />
    <h1>Raquel Canosa Raña</h1>
    <button @click="sweetAlertOn()">Pincha aquí</button>

    <h2>Estudiante de programación en Hackaboss</h2>
    <h3>Julio 2020</h3>

    <p>APIs y librerías utilizadas en el proyecto:</p>

    <ul>
      <li>🎶 API de Last FM: last.fm/api</li>
      <li>⏩ Librería AXIOS</li>
      <li>📁 vue-headful</li>
      <li>📣 sweetalert2</li>
    </ul>
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  methods: {
    sweetAlertOn() {
      Swal.fire({
        title: "¡HOLA!",
        text: "¿Qué tal estás?",
        icon: "success",
        confirmButtonText: "OK"
      });
    }
  }
};
</script>

<style scoped>
div {
  min-height: 100vh;
  font-size: 1.5rem;
}
ul {
  width: 500px;
  margin: auto;
}
li {
  text-align: left;
  padding: 1rem 2rem;
  color: white;
  background-color: red;
  margin-bottom: 1rem;
}

button {
  width: 10rem;
  height: 5rem;
  border-style: none;
  background-color: rgb(211, 190, 231);
  font-size: 1.5rem;
}
</style> 
