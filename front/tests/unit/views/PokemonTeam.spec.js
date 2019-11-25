import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import sinon from '../../../node_modules/sinon/pkg/sinon-esm.js'
import PokemonTeam from '@/views/PokemonTeam.vue'
import teamService from '@/services/teams'

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

    expect(wrapper.vm.teamId).to.equal(1)
  })

  describe('Get team', () => {
    var getTeam, getTeamPromise

    beforeEach(function () {
      getTeam = sinon.stub(teamService, 'get')
      getTeamPromise = Promise.resolve({
        'id': 1,
        'name': 'Created team'
      })
      getTeam.withArgs(1).returns(getTeamPromise)
    })

    afterEach(function () {
      getTeam.restore()
    })

    it('get team service is called when view is mounted', () => {
      mountView()

      sinon.assert.calledWith(getTeam, 1)
    })

    it('team is showed when view is mounted', () => {
      const wrapper = mountView()

      return getTeamPromise.then(() => {
        expect(wrapper.html()).to.include('Created team')
      })
    })
  })
})
