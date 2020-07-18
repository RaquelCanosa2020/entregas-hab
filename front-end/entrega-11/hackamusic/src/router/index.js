import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

//Aquí indicamos las diferentes "rutas" por las que acceder a cada vista

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",

    component: () => import("../views/About.vue"),
  },
  {
    path: "/TopArtists",
    name: "TopArtists",

    component: () => import("../views/TopArtists.vue"),
  },
  {
    path: "/TopTracks",
    name: "TopTracks",

    component: () => import("../views/TopTracks.vue"),
  },
  {
    path: "*",
    name: "Error",

    component: () => import("../views/Error.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
