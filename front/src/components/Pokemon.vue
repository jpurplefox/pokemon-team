<template lang="pug">
  div(v-if="loaded")
    img(:src="specie.sprites.front_default")
    h3 {{ specie.name }}
</template>

<script>
import specieService from '../services/specie'

export default {
  props: [ 'pokemon' ],
  data () {
    return {
      loaded: false,
      specie: {}
    }
  },

  mounted () {
    specieService.get(this.pokemon.id)
      .then(specie => {
        this.specie = specie
        this.loaded = true
      })
  }
}
</script>
