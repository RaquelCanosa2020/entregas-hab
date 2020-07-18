<template>
  <div>
    <!---Elaboramos la estructura para cada elemento y los llamamos con v-for-->
    <input type="search" v-model="search" placeholder="Busca por nombre" />
    <div class="element">
      <section v-for="track in filtered" :key="track.id ">
        <p>🔊</p>
        <ul>
          <li class="name">{{track.name}}</li>
          <li>
            <a :href="track.url">{{track.url}}</a>
          </li>
          <li>{{track.duration}} seconds</li>
          <li>{{track.listeners}} listeners</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  //nombre del módulo y props con el tipo de info a recibir
  name: "TopTracks",
  props: {
    tracks: Array
  },
  data() {
    return {
      search: ""
    };
  },
  computed: {
    filtered() {
      if (!this.search) {
        //si search está vacío, devuelve characters tal cual
        return this.tracks;
      }
      return this.tracks.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
}
h1 {
  padding-bottom: 2.8rem;
  font-size: 3rem;
  color: blue;
}

div.element {
  text-align: center;
  width: 800px;
  margin: auto;
}

input {
  width: 200px;
  margin: auto;
}
section {
  display: flex;
  justify-content: left;
  background-color: red;
  margin-bottom: 1rem;
}
p {
  font-size: 5rem;
}
ul {
  display: flex;
  width: 100 px;
  flex-direction: column;
  justify-content: center;
}
li.name {
  font-size: 2rem;

  font-weight: 600;
}

li {
  color: white;
  font-size: 1rem;
  padding-bottom: 0.8rem;
  text-align: left;
}
li a {
  text-decoration: none;
  color: rgb(159, 211, 207);
}

input {
  width: 20rem;
  height: 2rem;
  margin-bottom: 2rem;
}
</style>