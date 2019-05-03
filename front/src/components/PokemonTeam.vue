<template lang="pug">
  div
    h2.title Este es un gran equipo
    .container
      .columns
        .column.is-2(v-for="p in pokemons" :key="p.id")
          pk-pokemon(:pokemon="p" @deletePokemon="deletePokemon")
        .column.is-2(v-show="pokemons.length < 6")
          pk-add-pokemon(@choosePokemon="addPokemon")
</template>

<script>
import PkPokemon from './Pokemon.vue'
import PkAddPokemon from './AddPokemon.vue'
const pokemons_test = new Array(6).fill(0).map(n => ({ id: Math.floor(Math.random() * 807 + 1) }))

export default {
  components: { PkPokemon, PkAddPokemon },
  data () {
    return {
      pokemons: []//pokemons_test
    }
  },

  methods: {
    deletePokemon (pokemon) {
      const index = this.pokemons.indexOf(pokemon)
      this.pokemons.splice(index, 1)
    },
    addPokemon (pokemon) {
      this.pokemons.push(pokemon)
    }
  }
}
</script>
