import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

//Diferentes rutas de las que consta la página:

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',

    component: () => import('../views/About.vue')
  },
  {
    path: '/productos',
    name: 'Productos',

    component: () => import('../views/Productos.vue')
  },
  {
    path: '/clientes',
    name: 'Clientes',

    component: () => import('../views/Clientes.vue')
  },
  {
    path: '/registro',
    name: 'Registro',

    component: () => import('../views/Registro.vue')
  },
  {
    path: '*',
    name: 'Error',

    component: () => import('../views/Error.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
