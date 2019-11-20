import { assert } from 'chai'
import sinon from '../../../node_modules/sinon/pkg/sinon-esm.js'
import teamService from '@/services/teams'
import backendService from '@/services/backend'

describe('teamService', () => {
  beforeEach(function () {
    sinon.replace(backendService, 'post', sinon.fake.resolves({ 'data': {} }))
  })

  afterEach(function () {
    sinon.restore()
  })

  it('post to teams endpoint when create teams', () => {
    teamService.create('New team')

    assert(backendService.post.calledWith('teams/', { name: 'New team' }), 'backen was not called')
  })
})
