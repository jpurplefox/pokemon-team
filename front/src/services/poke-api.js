import axios from 'axios'

const pokeApiService = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
})

export default pokeApiService
