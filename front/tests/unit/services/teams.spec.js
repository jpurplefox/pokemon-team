import { expect } from 'chai'
import sinon from '../../../node_modules/sinon/pkg/sinon-esm.js'
import teamService from '@/services/teams'
import backendService from '@/services/backend'

describe('teamService', () => {
  var backendServiceMock

  beforeEach(function () {
    backendServiceMock = sinon.mock(backendService)
  })

  afterEach(function () {
    backendServiceMock.restore()
  })

  it('post to teams endpoint when create teams', () => {
    const expectedResponse = { 'id': 1, 'name': 'My first team' }
    backendServiceMock
      .expects('post')
      .once().withArgs('teams/', { name: 'New team' })
      .resolves({ 'data': expectedResponse })

    return teamService.create('New team')
      .then((team) => {
        backendServiceMock.verify()

        expect(team).to.deep.equal(expectedResponse)
      })
  })

  it('get to teams endpoint when get all teams', () => {
    const expectedResponse = [{ 'id': 1, 'name': 'My first team' }]
    backendServiceMock
      .expects('get')
      .once().withArgs('teams/')
      .resolves({ 'data': expectedResponse })

    return teamService.get_all()
      .then((teams) => {
        backendServiceMock.verify()

        expect(teams).to.deep.equal(expectedResponse)
      })
  })

  it('get to specific team endpoint when get a team', () => {
    const teamId = 1
    const expectedResponse = { 'id': 1, 'name': 'My first team' }
    backendServiceMock
      .expects('get')
      .once().withArgs('teams/1/')
      .resolves({ 'data': expectedResponse })

    return teamService.get(teamId)
      .then((team) => {
        backendServiceMock.verify()

        expect(team).to.deep.equal(expectedResponse)
      })
  })
})
