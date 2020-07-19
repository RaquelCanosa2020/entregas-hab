<template>
  <div>
    <!---Elaboramos la estructura para cada elemento y los llamamos con v-for-->

    <h1>TOP ARTISTS</h1>

    <input type="search" v-model="search" placeholder="Busca por nombre" />

    <div class="element">
      <section v-for="(artist) in filtered" :key="artist.id ">
        <figure>
          <img :src="url+Math.ceil(Math.random()*10)" />
        </figure>
        <ul>
          <li class="name">{{artist.name}}</li>
          <li>🎧 {{artist.listeners}} oyentes</li>
          <li>
            📱
            <a :href="artist.url">{{artist.url}}</a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  //nombre del módulo y props con el tipo de info a recibir
  name: "TopArtist",
  props: {
    artists: Array
  },
  data() {
    return {
      search: "",
      url: "http://lorempixel.com/200/200/abstract/"
    };
  },

  computed: {
    filtered() {
      if (!this.search) {
        //si search está vacío, devuelve characters tal cual
        return this.artists;
      }
      return this.artists.filter(item =>
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
  width: 600px;
  margin: auto;
}

input {
  width: 200px;
  margin: auto;
}
section {
  display: flex;
  justify-content: left;
}
img {
  width: 200px;
  justify-content: left;
}
ul {
  display: flex;
  width: 100 px;
  flex-direction: column;
  justify-content: center;
}
li.name {
  font-size: 2.5rem;
  color: red;
  font-weight: 600;
}

li {
  font-size: 1.5rem;
  padding-bottom: 0.8rem;
  text-align: left;
}

input {
  width: 20rem;
  height: 2rem;
  margin-bottom: 2rem;
}
li a {
  text-decoration: none;
  color: rebeccapurple;
}
</style>