<template>
  <div class="home">
    <PokemonTeams/>
  </div>
</template>

<script>
// @ is an alias to /src
import PokemonTeams from '@/components/PokemonTeams.vue'

export default {
  name: 'home',
  components: {
    PokemonTeams
  }
}
</script>
