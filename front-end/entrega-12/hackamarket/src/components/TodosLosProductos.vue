<template>
  <!--CREAMOS EL COMPONENTE PARA MOSTRAR LOS PRODUCTOS EN LA VISTA-->
  <div>
    <div>
      <section v-for="(producto, index) in productos" :key="producto.id">
        <img :src="producto.imagen" :title="producto.nombre" :alt="producto.nombre" />
        <p>Denominación: {{producto.nombre}}</p>
        <p>Stock: {{producto.stock}}</p>
        <p>
          <span>Disponibilidad:</span>
          <!---CLASE DINÁMICA PARA DIFERENTE COLOR SEGÚN DISPONIBILIDAD DEL PRODUCTO---->
          <span
            :class="{green: producto.disponibilidad === 'Disponible', red: producto.disponibilidad === 'No disponible'}"
          >{{producto.disponibilidad}}</span>
        </p>
        <!--USAMOS V-SHOW PARA OCULTAR BOTONES SI NO DISPONIBLE-->
        <button
          v-show="producto.disponibilidad === 'Disponible'"
          @click="enviarNombreComprar(index)"
        >Comprar</button>
        <button
          v-show="producto.disponibilidad === 'Disponible'"
          @click="enviarNombreReservar(index)"
        >Reservar</button>

        <p v-show="producto.disponibilidad === 'No disponible'">Sin fecha de entrada</p>
      </section>
    </div>
  </div>
</template>


<script>
export default {
  name: "TodosLosProductos",

  props: {
    productos: Array,
  },
  methods: {
    //OBTENEMOS EL ÍNDICE DEL PRODUCTO Y LO PASAMOS A LA VISTA MEDIANTE UN EVENTO.
    enviarNombreComprar(index) {
      let nombreProducto = this.productos[index].nombre;
      this.$emit("comprar", nombreProducto);
    },
    enviarNombreReservar(index) {
      let nombreProducto = this.productos[index].nombre;
      this.$emit("reservar", nombreProducto);
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
  background-color: cornsilk;
  border: rgba(232, 189, 243, 0.514) 2px dotted;
  width: 200px;
  word-break: break-word;
}
img {
  width: 200px;
}

.red {
  color: #ccafaf;
}
.green {
  color: rgb(40, 161, 40);
}
@media (min-width: 700px) {
  section {
    font-size: 1.5rem;

    width: 300px;
  }
  img {
    width: 300px;
  }
}
</style>