import axios from 'axios'

const backendService = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

export default backendService
