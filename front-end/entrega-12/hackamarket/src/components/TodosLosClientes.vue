<template>
  <!--CREAMOS EL COMPONENENTE PARA MOSTRAR LOS USUARIOS EN LA VISTA-->
  <div>
    <div>
      <section v-for="(cliente, index) in clientes" :key="cliente.id">
        <img :src="cliente.foto" :title="cliente.nombre" :alt="cliente.nombre" />

        <p>Nombre: {{cliente.nombre}}</p>
        <p>Usuario: {{cliente.usuario}}</p>
        <p>Email: {{cliente.email}}</p>
        <p>Contraseña: {{cliente.password}}</p>

        <button id="Ed" @click="enviarDatosCliente(index)">Editar</button>
        <button id="Bo" @click="enviarIndiceCliente(index)">Borrar</button>
      </section>
    </div>
  </div>
</template>


<script>
export default {
  name: "TodosLosClientes",
  props: {
    clientes: Array,
  },
  methods: {
    //estos métodos recogen el índice (tiene que ser aquí, ya que es el componente
    //el que "monta" el html y, por tanto, "sabe" el índice de cada uno)
    //esa info la pasamos a la vista cuando se pincha el botón correspondiente.
    enviarDatosCliente(index) {
      let datosCliente = this.clientes[index];
      this.$emit("datos", datosCliente);
    },
    enviarIndiceCliente(index) {
      let indiceCliente = this.clientes[index].id;
      this.$emit("borrar", indiceCliente);
    },
  },
};
</script>

<style scoped>
div#app {
  height: 100vh;
}
div > div {
  display: flex;
  margin: auto;
  flex-wrap: wrap;
  justify-content: center;
}

section {
  margin: 2rem 2rem;
  text-align: center;
  font-size: 0.7rem;
  width: 150px;
  border: rgba(127, 30, 151, 0.514) 2px dotted;
  border-radius: 2em;
  background-color: whitesmoke;
  height: 300px;
  position: relative;
}

p {
  max-width: 300px;
  word-break: break-word;
}

button#Ed {
  position: absolute;
  bottom: 0px;
  left: 10px;
}

button#Bo {
  position: absolute;
  bottom: 0px;
  right: 10px;
}

img {
  width: 60%;
  border-radius: 50%;
  margin-top: 1rem;
}
@media (min-width: 700px) {
  section {
    font-size: 1.3rem;
    height: 600px;
    width: 300px;
  }
}
</style>