import { assert, expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import sinon from '../../node_modules/sinon/pkg/sinon-esm.js'
import PokemonTeams from '@/components/PokemonTeams.vue'
import teamService from '@/services/teams'

describe('PokemonTeams.vue', () => {
  beforeEach(function () {
    sinon.replace(teamService, 'create', sinon.fake())
  })

  afterEach(function () {
    sinon.restore()
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
    expect(wrapper.text()).to.include('New team has been created')
  })

  it('call the backend endpoint when create a new team', () => {
    const wrapper = shallowMount(PokemonTeams)
    var input = wrapper.find('input#team_name')
    input.setValue('New team')
    input.trigger('keydown.enter')
    assert(teamService.create.calledWith('New team'), 'backen was not called')
  })
})
