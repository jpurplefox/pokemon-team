<template>
  <div>
    <h1>My pokémon teams</h1>
    <input id="team_name" v-model="team_name" @keydown.enter="create_team">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      team_name: '',
      msg: ''
    }
  },

  methods: {
    create_team () {
      this.msg = `${this.team_name} has been created`
    }
  }
}
</script>
