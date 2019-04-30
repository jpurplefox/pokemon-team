import pokeApiService from './poke-api'

const specieService = {}

specieService.get = function (id) {
  return pokeApiService.get(`pokemon/${id}`)
    .then(res => res.data)
}

export default specieService
