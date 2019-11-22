import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import PokemonTeam from '@/views/PokemonTeam.vue'

describe('PokemonTeam view', () => {
  function mountView () {
    const $route = {
      params: { id: '1' }
    }
    return shallowMount(PokemonTeam, {
      mocks: { $route }
    })
  }

  it('id is passed in data', () => {
    const wrapper = mountView()

    expect(wrapper.vm.team_id).to.include('1')
  })
})
