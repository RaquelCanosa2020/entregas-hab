<template>
  <div>
    <h1 id="title">🎧 HACK A MUSIC 🎧</h1>
    <div id="nav">
      <!---INDICE y links---->
      <router-link to="/">🏠 Home</router-link>|
      <router-link to="/TopArtists">🎤 TopArtists</router-link>|
      <router-link to="/TopTracks">🎶 TopTracks</router-link>|
      <router-link to="/about">👩 About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuCustom"
};
</script>

<style scoped>
#footer {
  font-weight: bold;
  color: red;
}
/**con scoped sólo afecta a esta página*/
</style>