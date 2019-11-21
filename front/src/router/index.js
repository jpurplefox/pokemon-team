import Vue from 'vue'
import VueRouter from 'vue-router'
import PokemonTeams from '../views/PokemonTeams.vue'
import PokemonTeam from '../views/PokemonTeam.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'teams',
    component: PokemonTeams
  },
  {
    path: '/teams/:id',
    name: 'team',
    component: PokemonTeam
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
