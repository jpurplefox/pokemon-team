<template lang="pug">
  div
    h2 Este es un gran equipo
    ul
      li(v-for="p in pokemons") {{ p.especie }}
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      pokemons: [{ especie: 'Bulbasaur' }, { especie: 'Beedrill' }]
    }
  }
}
</script>
