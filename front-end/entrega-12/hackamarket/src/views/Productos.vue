<template>
  <div class="productos">
    <vue-headful title="Hackamarket | Productos" />
    <h1>Listado de productos - HACK A VINO</h1>

    <!--LLAMADA AL COMPONENTE Y A L AS FUNCIONES DE SWEETALERT---->

    <todoslosproductos
      v-on:comprar="sweetAlertComprar"
      v-on:reservar="sweetAlertReservar"
      :productos="productos"
    />
  </div>
</template>

<script>
import axios from "axios";
import todoslosproductos from "@/components/TodosLosProductos.vue";
import Swal from "sweetalert2";

export default {
  name: "Home",
  components: {
    todoslosproductos,
  },
  data() {
    return {
      productos: [],
      spinner: false,
    };
  },

  methods: {
    //ALERTA CUANDO SE PINCHA EN COMPRAR

    sweetAlertComprar(nombreProducto) {
      Swal.fire({
        title: "GRACIAS",
        text: `Gracias por comprar nuestro producto ${nombreProducto}`,
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "OK",
      });
    },

    //ALERTA CUANDO SE PINCHA EN RESERVAR
    sweetAlertReservar(nombreProducto) {
      Swal.fire({
        title: "GRACIAS",
        text: `Gracias por reservar nuestro producto ${nombreProducto}`,
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "OK",
      });
    },
    //FUNCIÓN PARA CONSEGUIR LOS PRODUCTOS
    getProducts() {
      var self = this;
      //LLAMADA DE AXIOS A LA API
      axios
        .get("http://localhost:3050/productos")
        .then(function (response) {
          self.productos = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
div.productos {
  background-image: url(../assets/barriles.jpg);
  background-size: cover;
}

h1 {
  background-color: white;
  font-size: 1.5rem;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.modalBox {
  background-color: #fefefe;
  margin: 2% auto;
  padding: 3rem;
  width: 80%;
  border: 1px solid #888;
}

@media (min-width: 700px) {
  h1 {
    font-size: 2rem;
  }
}

@media (min-width: 1000px) {
}
</style>
