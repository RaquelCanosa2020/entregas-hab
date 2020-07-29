<template>
  <div class="clientes">
    <vue-headful title="Hackamarket | Clientes" />
    <h1>Lista de vinófilos</h1>

    <!--MOSTRANDO LOS CLIENTES --->

    <todoslosclientes
      v-on:datos="mostrarInfoCliente"
      v-on:borrar="sweetAlertBorrar"
      :clientes="clientes"
    />

    <!----MODAL PARA ACTUALIZAR CLIENTE-->
    <div v-show="seeModal" class="modal">
      <div class="modalBox">
        <h3>Actualiza los datos de los clientes</h3>
        <p>ID del cliente: {{idCliente}}</p>
        <input type="text" placeholder="Nombre" v-model="nombreActualizado" />

        <input type="text" placeholder="Usuario" v-model="usuarioActualizado" />

        <input type="email" placeholder="Email" v-model="emailActualizado" />

        <input type="text" placeholder="Contraseña" v-model="passwordActualizada" />

        <input type="text" placeholder="Foto" v-model="fotoActualizada" />

        <button @click="actualizarCliente()">Actualizar</button>

        <button @click="seeModal =! seeModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import todoslosclientes from "@/components/TodosLosClientes.vue";
import Swal from "sweetalert2";

export default {
  name: "Home",
  components: {
    todoslosclientes,
  },
  data() {
    return {
      clientes: [],
      idCliente: "",
      nombreActualizado: "",
      usuarioActualizado: "",
      emailActualizado: "",
      passwordActualizada: "",
      fotoActualizada: "",
      seeModal: false,
    };
  },
  methods: {
    //ALERTA PARA CONFIRMAR EDICIÓN DEL CLIENTE

    //ALERTA PARA CONFIRMAR BORRADO DEL CLIENTE
    sweetAlertBorrar(indiceCliente) {
      Swal.fire({
        title: "Confirma la acción",
        text: "Confirma la eliminación del cliente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        buttonsStyling: false,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Cliente eliminado",
          });
          this.borrandoCliente(indiceCliente);
          //RECARGA DE LA PÁGINA
          setTimeout(() => location.reload(), 2500);
        }
      });
    },

    //Estas funciones "importan" los datos que necesitan del componente
    //datos de cada elemento del html. Estas funciones hay que activarlas arriba.
    //BORRA CLIENTES, SE ACTIVA CON EL BOTÓN DE BORRAR
    borrandoCliente(indiceCliente) {
      // this.sweetAlertBorrar();

      var self = this;
      axios
        .delete("http://localhost:3050/delete/" + indiceCliente)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //EDITA EL CLIENTE, SE ACTIVA CON EL BOTÓN DE ACTUALIZAR DEL MODAL
    actualizarCliente() {
      var self = this;
      axios
        .put("http://localhost:3050/update/" + self.idCliente, {
          nombre: self.nombreActualizado,
          usuario: self.usuarioActualizado,
          email: self.emailActualizado,
          password: self.passwordActualizada,
          foto: self.fotoActualizada
            ? self.fotoActualizada
            : "http://lorempixel.com/200/200/abstract",
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.seeModal = false;
      location.reload();
    },

    //FUNCIÓN PARA MOSTRAR LA INFORMACIÓN DEL CLIENTE DEL EVENTO
    mostrarInfoCliente(datosCliente) {
      this.nombreActualizado = datosCliente.nombre;
      this.usuarioActualizado = datosCliente.usuario;
      this.emailActualizado = datosCliente.email;
      this.passwordActualizada = datosCliente.password;
      this.fotoActualizada = datosCliente.foto;
      this.idCliente = datosCliente.id;
      this.seeModal = true;
    },
    //FUNCIÓN PARA CONSEGUIR LOS CLIENTES
    getClients() {
      var self = this;
      //LLAMADA DE AXIOS A LA API
      axios
        .get("http://localhost:3050/clientes")
        .then(function (response) {
          self.clientes = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getClients();
  },
};
</script>

<style scoped>
div.clientes {
  background-image: url(../assets/gente.jpg);
  background-repeat: cover;
}
h1 {
  font-size: 1.5rem;
  background-color: white;
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
  div.clientes {
    background-image: url(../assets/gente.jpg);
  }
  h1 {
    font-size: 2rem;
  }
}
</style>