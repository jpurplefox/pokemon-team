<template lang="pug">
  #app
    pk-pokemon-team
</template>

<script>
import PkPokemonTeam from './components/PokemonTeam.vue'

export default {
  name: 'app',
  components: { PkPokemonTeam },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
</style>
