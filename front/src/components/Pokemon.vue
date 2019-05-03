<template lang="pug">
  div(v-if="loaded")
    .card
      .card-image
        figure.image.is-square
          img(:src="specie.sprites.front_default")
      .card-content
        .content
          h3.title {{ specie.name }}
          .tags
            .tag(v-for="type in specie.types" :class="[type.type.name, 'type']") {{ type.type.name }}
          p Ability: {{ specie.abilities[0].ability.name }}
          a.button.is-danger.is-outlined(@click="remove(pokemon)")
            span Delete
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

  created () {
    specieService.get(this.pokemon.id)
      .then(specie => {
        this.specie = specie
        this.loaded = true
      })
  },

  methods: {
    remove (pokemon) {
      this.$emit('deletePokemon', pokemon)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-content {
  background-color: #FFF7F7;
}

.type {
  color: #FFFFFF;
}

.normal {
  background-color: #A8A878;
}

.fire {
  background-color: #F08030;
}

.fighting {
  background-color: #C03028;
}

.water {
  background-color: #6890F0;
}

.flying {
  background-color: #A890F0;
}

.grass {
  background-color: #78C850;
}

.poison {
  background-color: #A040A0;
}

.electric {
  background-color: #F8D030;
}

.ground {
  background-color: #E0C068;
}

.psychic {
  background-color: #F85888;
}

.rock {
  background-color: #B8A038;
}

.ice {
  background-color: #98D8D8;
}

.bug {
  background-color: #A8B820;
}

.dragon {
  background-color: #7038F8;
}

.ghost {
  background-color: #705898;
}

.dark {
  background-color: #705848;
}

.steel {
  background-color: #B8B8D0;
}

.fairy {
  background-color: #EE99AC;
}
</style>
