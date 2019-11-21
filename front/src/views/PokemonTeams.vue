<template>
  <div>
    <h1>My pokémon teams</h1>
    <input id="team_name" v-model="team_name" @keydown.enter="create_team">
    <p>{{ msg }}</p>
    <div v-for="team in teams" :key="team.id" :id="'team_' + team.id">
      {{ team.name }}
    </div>
  </div>
</template>

<script>
import teamService from '../services/teams'

export default {
  data () {
    return {
      teams: [],
      team_name: '',
      msg: ''
    }
  },

  methods: {
    create_team () {
      teamService.create(this.team_name)
        .then(data => {
          this.teams.push(data)
          this.msg = `${this.team_name} has been created`
          this.team_name = ''
        })
    }
  },

  created () {
    teamService.get_all()
      .then(data => {
        this.teams = data
      })
  }
}
</script>
