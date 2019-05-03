<template lang="pug">
  .card
    .card-content
      .field.has-addons
        .control
          input.input(v-model="search", @keyup.enter="searchPokemon")
        .control
          a.button.is-info(@click="searchPokemon", :class="{ 'is-loading': loading }") B
      table.table.is-hoverable
        tbody
          tr(v-for="pokemon in pokemons")
            td(@click="choosePokemon(pokemon.name)") {{ pokemon.name }}
</template>

<script>
import specieService from '../services/specie'

export default {
  data () {
    return {
      search: '',
      loading: false,
      pokemons: []
    }
  },
  methods: {
    searchPokemon () {
      if (this.search.length) {
        this.loading = true
        specieService.search(this.search)
          .then(species => {
            this.pokemons = species
            this.loading = false
          })
      }
    },
    choosePokemon (name) {
      this.$emit('choosePokemon', { id: name })
      this.pokemons = []
      this.search = ''
    }
  }
}
</script>
