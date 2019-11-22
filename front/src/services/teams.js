import backendService from './backend'

const teamService = {}

teamService.create = function (name) {
  return backendService.post('teams/', { name })
    .then(res => res.data)
}

teamService.get_all = function () {
  return backendService.get('teams/')
    .then(res => res.data)
}

teamService.get = function (teamId) {
  return backendService.get(`teams/${teamId}/`)
    .then(res => res.data)
}

export default teamService
