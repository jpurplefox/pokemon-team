import { assert, expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import sinon from '../../../node_modules/sinon/pkg/sinon-esm.js'
import PokemonTeams from '@/components/PokemonTeams.vue'
import teamService from '@/services/teams'

var createTeam, createTeamPromise

describe('PokemonTeams.vue', () => {
  beforeEach(function () {
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

  it('title is present', () => {
    const wrapper = shallowMount(PokemonTeams)

    expect(wrapper.text()).to.include('My pokémon teams')
  })

  it('show successful message when create a new team', () => {
    const wrapper = shallowMount(PokemonTeams)
    var input = wrapper.find('input#team_name')
    input.setValue('New team')
    input.trigger('keydown.enter')

    createTeamPromise.then(() => {
      expect(wrapper.text()).to.include('New team has been created')
    })
  })

  it('call the backend endpoint when create a new team', () => {
    const wrapper = shallowMount(PokemonTeams)
    var input = wrapper.find('input#team_name')
    input.setValue('New team')
    input.trigger('keydown.enter')

    assert(teamService.create.calledWith('New team'), 'backend was not called')
  })

  it('show the new team in the list when created', () => {
    const wrapper = shallowMount(PokemonTeams)
    var input = wrapper.find('input#team_name')
    input.setValue('New team')
    input.trigger('keydown.enter')

    return createTeamPromise.then(() => {
      expect(wrapper.find('#team_1').text()).to.include('New team')
    })
  })
})
