<template>
  <div>
    <!--CREAMOS COMPONENTE PARA EL FOOTER-->
    <footer id="footer">copyright. HACK A MARKET. Raquel Canosa Raña. 2020</footer>
  </div>
</template>

<script>
export default {
  name: "FooterCustom",
};
</script>

<style scoped>
#footer {
  font-weight: bold;
  color: rgba(20, 7, 24, 0.514);
  font-size: 0.7rem;
}

@media (min-width: 700px) {
  #footer {
    font-size: 1rem;
  }
}

@media (min-width: 1000px) {
  #footer {
    font-size: 1.5rem;
  }
}
</style>