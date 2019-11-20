import { assert, expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import sinon from '../../../node_modules/sinon/pkg/sinon-esm.js'
import PokemonTeams from '@/components/PokemonTeams.vue'
import teamService from '@/services/teams'

describe('PokemonTeams.vue', () => {
  it('title is present', () => {
    const wrapper = shallowMount(PokemonTeams)

    expect(wrapper.text()).to.include('My pokémon teams')
  })

  describe('Create a team', () => {
    var createTeam, createTeamPromise, wrapper

    function doCreateTeam (wrapper, name) {
      var input = wrapper.find('input#team_name')
      input.setValue(name)
      input.trigger('keydown.enter')
    }

    beforeEach(function () {
      wrapper = shallowMount(PokemonTeams)

      createTeam = sinon.stub(teamService, 'create')
      createTeamPromise = Promise.resolve({
        'id': 1,
        'name': 'New team'
      })
      createTeam.withArgs('New team').returns(createTeamPromise)
    })

    afterEach(function () {
      createTeam.restore()
    })

    it('show successful message when create a new team', () => {
      doCreateTeam(wrapper, 'New team')

      createTeamPromise.then(() => {
        expect(wrapper.text()).to.include('New team has been created')
      })
    })

    it('call the backend endpoint when create a new team', () => {
      doCreateTeam(wrapper, 'New team')

      assert(teamService.create.calledWith('New team'), 'backend was not called')
    })

    it('show the new team in the list when created', () => {
      doCreateTeam(wrapper, 'New team')

      return createTeamPromise.then(() => {
        expect(wrapper.find('#team_1').text()).to.include('New team')
      })
    })

    it('clean team name field after create', () => {
      doCreateTeam(wrapper, 'New team')

      return createTeamPromise.then(() => {
        expect(wrapper.find('input#team_name').element.value).to.be.equal('')
      })
    })
  })

  describe('Get created teams', () => {
    var getTeams, getTeamsPromise

    beforeEach(function () {
      getTeams = sinon.stub(teamService, 'get_all')
      getTeamsPromise = Promise.resolve([{ 'id': 1, 'name': 'My first team' }])
      getTeams.withArgs().returns(getTeamsPromise)
    })

    afterEach(function () {
      getTeams.restore()
    })

    it('call the get all endpoint when mounted', () => {
      shallowMount(PokemonTeams)

      assert(teamService.get_all.calledWith(), 'backend was not called')
    })
  })
})
