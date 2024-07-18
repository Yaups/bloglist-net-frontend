import axios from 'axios'
import { BACKEND_URI } from '../config'

const baseUrl = `${BACKEND_URI}/users`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }
