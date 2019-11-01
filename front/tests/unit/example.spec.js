import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import PokemonTeams from '@/components/PokemonTeams.vue'

describe('PokemonTeams.vue', () => {
  it('title is present', () => {
    const wrapper = shallowMount(PokemonTeams)
    expect(wrapper.text()).to.include('My pokémon teams')
  })

  it('create new team', () => {
    const wrapper = shallowMount(PokemonTeams)
    var input = wrapper.find('input#team_name')
    input.setValue('New team')
    input.trigger('keydown.enter')
    expect(wrapper.text()).to.include('New team has been created')
  })
})
