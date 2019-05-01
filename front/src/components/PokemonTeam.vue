<template lang="pug">
  div
    h2.title Este es un gran equipo
    .container
      .columns
        .column.is-2(v-for="p in pokemons" :key="p.id")
          pk-pokemon(:pokemon="p")
</template>

<script>
import PkPokemon from './Pokemon.vue'

export default {
  components: { PkPokemon },
  data () {
    return {
      pokemons: [{ id: 1 }, { id: 707 }, { id: 503 }, { id: 149 }, { id: 230 }, { id: 105 }]
    }
  }
}
</script>
