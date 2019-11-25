<template>
  <div>
    <h1>Pokémon team</h1>
  </div>
</template>

<script>
import teamService from '@/services/teams'

export default {
  data () {
    return {
      teamId: parseInt(this.$route.params.id)
    }
  },

  mounted () {
    teamService.get(this.teamId)
  }
}
</script>
