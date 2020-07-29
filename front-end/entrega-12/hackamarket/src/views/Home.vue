<template>
  <div class="home">
    <vue-headful title="Hackamarket | Home" />

    <h1>HACK A VINO</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style scoped>
div.home {
  height: 80vh;
  background-image: url(../assets/local.jpeg);
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
h1 {
  width: 100%;
  font-size: 1.3rem;
  color: #ccafaf;
  background-color: rgb(51, 48, 48);
}

@media (min-width: 700px) {
  h1 {
    font-size: 1.8rem;
  }
}

@media (min-width: 1000px) {
  h1 {
    font-size: 4rem;
  }
}
</style>
