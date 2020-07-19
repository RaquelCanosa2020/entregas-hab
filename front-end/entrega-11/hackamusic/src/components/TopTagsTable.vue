<template>
  <div>
    <h1>TOP TAGS</h1>

    <input type="search" v-model="search" placeholder="Busca por tag" />
    <!---Elaboramos la estructura para cada elemento y los llamamos con v-for-->
    <div class="element">
      <section v-for="tag in filtered" :key="tag.id ">
        <h2>{{tag.name}}</h2>
        <ul>
          <li id="url">
            <a :href="tag.url">{{tag.url}}</a>
          </li>
          <li>Reach: {{tag.reach}}</li>
          <li>streamable: {{tag.streamable}}</li>
          <li>taggings: {{tag.taggings}}</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  //nombre del módulo y props con el tipo de info a recibir
  name: "TopTags",
  props: {
    tags: Array
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
        return this.tags;
      }
      return this.tags.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {}
};
</script>

<style scoped>
h1 {
  padding-bottom: 2.8rem;
  font-size: 3rem;
  color: blue;
}

div.element {
  text-align: center;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, 350px);
  margin: auto;
  padding: 1rem;
  width: 100vw;
}
section {
  text-align: left;
  width: 60 px;
  background-color: rgb(195, 195, 236);
}

section:hover {
  transform: scale(1.2);
  background-color: cornsilk;
}

h2 {
  font-size: 2rem;
  color: red;
  margin-left: 1rem;
}

li {
  font-size: 1.4rem;
  padding-bottom: 0.8rem;
}

li#url {
  font-size: 1rem;
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