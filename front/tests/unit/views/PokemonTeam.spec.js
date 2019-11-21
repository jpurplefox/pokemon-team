import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import PokemonTeam from '@/views/PokemonTeam.vue'

describe('PokemonTeam view', () => {
  const $route = {
    params: { id: '1' }
  }

  it('id is passed in data', () => {
    const wrapper = shallowMount(PokemonTeam, {
      mocks: { $route }
    })

    expect(wrapper.vm.team_id).to.include('1')
  })
})
