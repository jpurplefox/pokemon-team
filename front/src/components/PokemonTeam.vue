<template lang="pug">
  div
    h2 Este es un gran equipo
    pk-pokemon(v-for="p in pokemons" :key="p.id" :pokemon="p")
</template>

<script>
import PkPokemon from './Pokemon.vue'

export default {
  components: { PkPokemon },
  data () {
    return {
      pokemons: [{ id: 1 }, { id: 707 }]
    }
  }
}
</script>
