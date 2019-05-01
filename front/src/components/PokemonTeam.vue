<template lang="pug">
  div
    h2.title Este es un gran equipo
    .container
      .columns
        .column.is-2(v-for="p in pokemons" :key="p.id")
          pk-pokemon(:pokemon="p" @deletePokemon="deletePokemon")
</template>

<script>
import PkPokemon from './Pokemon.vue'
const pokemons_test = new Array(6).fill(0).map(n => ({ id: Math.floor(Math.random() * 807 + 1) }))

export default {
  components: { PkPokemon },
  data () {
    return {
      pokemons: pokemons_test
    }
  },

  methods: {
    deletePokemon (pokemon) {
      console.log(pokemon)
      const index = this.pokemons.indexOf(pokemon)
      console.log(index)
      this.pokemons.splice(index, 1)
    }
  }
}
</script>
