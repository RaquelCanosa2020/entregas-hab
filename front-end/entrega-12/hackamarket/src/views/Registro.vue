<template>
  <div class="registro">
    <vue-headful title="Hackamarket | Registro" />
    <section>
      <h1>Registrando nuevo vinófilo</h1>
      <!--INPUTS PARA RECOGER DATOS NUEVO CLIENTE-->

      <p>
        <input type="text" v-model="nombre" placeholder="Nombre" />
      </p>

      <p>
        <input type="text" v-model="usuario" placeholder="Usuario" />
      </p>

      <p>
        <input type="email" v-model="email" placeholder="Email" />
      </p>

      <p>
        <input type="text" v-model="password" placeholder="Contraseña" />
      </p>

      <p>
        <input type="text" v-model="foto" placeholder="Fotografía (URL)" />
      </p>

      <p v-show="errorMsg">Tienes campos vacíos</p>

      <button @click="validatingData()">Añadir cliente</button>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Register",
  data() {
    return {
      nombre: "",
      usuario: "",
      email: "",
      password: "",
      foto: "",
      createClient: false,
      errorMsg: false,
    };
  },
  methods: {
    //ALERTA CLIENTE CREADO OK
    sweetAlertOKcliente() {
      Swal.fire({
        title: "Nuevo Cliente",
        text: "Cliente creado con éxito",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "OK",
      });
    },
    //ALERTA FALLO EN CREACION CLIENTE
    sweetAlertFallocliente() {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        buttonsStyling: false,
        text: "Todos los campos son obligatorios, excepto fotografía",
      });
    },
    //FUNCIÓN PARA COMPROBAR QUE SE HAN INTRODUCIDO DATOS NECESARIOS. SE ACTIVA
    //CON EL BOTÓN DE AÑADIR NUEVO CLIENTE
    validatingData() {
      if (
        this.nombre === "" ||
        this.usuario === "" ||
        this.password === "" ||
        this.email === ""
      ) {
        //alert("no puedes dejar campos vacíos");
        this.errorMsg = true;
        this.createClient = false;
        this.sweetAlertFallocliente();
      } else {
        this.errorMsg = false;
        this.createClient = true;
        this.addNewClient();
      }
    },
    //FUNCIÓN PARA INCLUIR EL CLIENTE. SE ACTIVA AL FINALIZAR VALIDATINGDATA
    addNewClient() {
      if (this.createClient === true) {
        var self = this;
        axios
          .post("http://localhost:3050/add", {
            nombre: self.nombre,
            usuario: self.usuario,
            password: self.password,
            email: self.email,
            foto: self.foto
              ? self.foto
              : "http://lorempixel.com/200/200/abstract",
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        this.createClient = false;
        this.nombre = "";
        this.usuario = "";
        this.password = "";
        this.email = "";
        this.foto = "";
        this.sweetAlertOKcliente();
        setTimeout(() => location.reload(), 2500);
      } else {
        console.log("yo no debería estar aquí");
      }
    },
  },
};
</script>

<style scoped>
div.registro {
  height: 80vh;
  background-image: url(../assets/local.jpeg);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
section {
  background-color: white;
  width: 50%;

  padding: 1rem;
}
h1 {
  font-size: 1rem;
}
@media (min-width: 700px) {
  section {
    width: 50%;

    padding: 2rem;
  }
  h1 {
    font-size: 2rem;
  }
}
</style>