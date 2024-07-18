import axios from 'axios'
import { BACKEND_URI } from '../config'

const baseUrl = `${BACKEND_URI}/blogs`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const post = async (object, userToken) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `bearer ${userToken}`,
  }
  const response = await axios.post(baseUrl, object, { headers })
  return response.data
}

const update = async (id, updatedObject, userToken) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `bearer ${userToken}`,
  }
  await axios.put(`${baseUrl}/${id}`, updatedObject, {
    headers,
  })
  return updatedObject
}

const postComment = async (blogId, text, userToken) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `bearer ${userToken}`,
  }
  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    { text },
    { headers },
  )
  return response.data
}

const remove = async (id, userToken) => {
  const headers = { Authorization: `bearer ${userToken}` }
  const response = await axios.delete(`${baseUrl}/${id}`, { headers })
  return response.data
}

export default { getAll, getById, post, update, postComment, remove }
