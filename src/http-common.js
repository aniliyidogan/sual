import axios from 'axios'
const URL = 'API_URL'

export const HTTP = axios.create({
  baseURL: URL,
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
})
