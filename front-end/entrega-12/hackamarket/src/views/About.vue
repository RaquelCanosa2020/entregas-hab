<template>
  <div class="about">
    <vue-headful title="Hackamarket | About" />
    <section class="left">
      <h1>RAQUEL CANOSA RAÑA</h1>

      <p>
        <a class="linkedin" href="https://es.linkedin.com/in/raquelcanosara">Linkedin</a>
        <a class="mail" href="mailto:denebolaleo1@gmail.com">Mail</a>
      </p>

      <h2>Estudiante de programación en Hackaboss</h2>
      <h3>Julio 2020</h3>
    </section>

    <section class="right">
      <p>APIs y librerías utilizadas:</p>

      <ul>
        <li>⏩ Librería AXIOS</li>
        <li>📁 vue-headful</li>
        <li>📣 sweetalert2</li>
        <li>👥 randomuser.me</li>
        <li>🌅 unsplash.com</li>
        <li>🤸 giphy.com</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div.about {
  min-height: 80vh;
  background-image: url(https://media.giphy.com/media/pzGIuR1UeI2oFhyqP1/giphy.gif);
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
}
section.right {
  text-align: left;
  width: 50%;
}
h1 {
  font-size: 1.2rem;
}
h2 {
  font-size: 1rem;
}
h3 {
  font-size: 0.7rem;
}

ul {
  list-style: none;
}
li {
  font-size: 0.8rem;
  margin-left: 0;
  margin-bottom: 1rem;
}

p {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

section.right > p {
  margin-left: 2rem;
}

a {
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 0.3rem;
  font-size: 0;
}

a.linkedin {
  background-image: url("../assets/Linkedin.svg");
  background-size: 20px 20px;
}

a.mail {
  background-image: url("../assets/mail.webp");
  background-size: 20px 20px;
}

@media (min-width: 700px) {
  div.about {
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    background-position-y: 50px;
  }
  h1 {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1rem;
  }
  li {
    font-size: 1rem;
    padding: 1rem 2rem;
    width: 60%;
    margin: auto;
  }

  a {
    width: 40px;
    height: 40px;
  }

  a.linkedin,
  a.mail {
    background-size: 40px 40px;
  }
}

@media (min-width: 1000px) {
  section.left {
    margin-left: 2rem;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.8rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  section.right > p {
    font-size: 1.5rem;
  }
  li {
    font-size: 1.5rem;
  }
}

@media (min-width: 1025px) {
  div.about {
    min-height: 80vh;
    background-position-y: -500px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  a {
    width: 40px;
    height: 40px;
  }

  a.linkedin,
  a.mail {
    background-size: 40px 40px;
  }
  section.right > p {
    font-size: 2rem;
    margin-right: -150px;
  }
  li {
    font-size: 1.8rem;
    width: 50%;
    margin-right: 30px;
  }
}
</style>