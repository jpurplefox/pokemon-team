<template>
  <div>
    <h1>{{ team.name }}</h1>
  </div>
</template>

<script>
import teamService from '@/services/teams'

export default {
  data () {
    return {
      teamId: parseInt(this.$route.params.id),
      team: {}
    }
  },

  mounted () {
    teamService.get(this.teamId)
      .then(team => {
        this.team = team
      })
  }
}
</script>
