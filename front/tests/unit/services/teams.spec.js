import sinon from '../../../node_modules/sinon/pkg/sinon-esm.js'
import teamService from '@/services/teams'
import backendService from '@/services/backend'

describe('teamService', () => {
  describe('endpoint posts', () => {
    var backendPost

    beforeEach(function () {
      backendPost = sinon.stub(backendService, 'post')
    })

    afterEach(function () {
      backendPost.restore()
    })

    it('post to teams endpoint when create teams', () => {
      const backendPromise = Promise.resolve({ 'data': {} })
      backendPost.returns(backendPromise)

      teamService.create('New team')

      sinon.assert.calledWith(backendPost, 'teams/', { name: 'New team' })
    })
  })

  describe('endpoint gets', () => {
    var backendGet

    beforeEach(function () {
      backendGet = sinon.stub(backendService, 'get')
    })

    afterEach(function () {
      backendGet.restore()
    })

    it('get to teams endpoint when get all teams', () => {
      const backendGetPromise = Promise.resolve({ 'data': {} })
      backendGet.returns(backendGetPromise)

      teamService.get_all()

      sinon.assert.calledWith(backendGet, 'teams/')
    })

    it('get to specific team endpoint when get a team', () => {
      const teamId = 1
      const backendGetPromise = Promise.resolve({ 'data': {} })
      backendGet.returns(backendGetPromise)

      teamService.get(teamId)

      sinon.assert.calledWith(backendGet, 'teams/1/')
    })
  })
})
