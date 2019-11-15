import backendService from './backend'

const teamService = {}

teamService.create = function (name) {
  return backendService.post('teams/', { name })
    .then(res => res.data)
}

export default teamService
