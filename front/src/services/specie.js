import pokeApiService from './poke-api'

const specieService = {}

specieService.get = function (id) {
  return pokeApiService.get(`pokemon/${id}`)
    .then(res => res.data)
}

specieService.search = function (search) {
  const limit = 1000
  return pokeApiService.get('pokemon', { params: { limit } })
    .then(res => res.data.results.filter(p => p.name.includes(search)))
}

export default specieService
