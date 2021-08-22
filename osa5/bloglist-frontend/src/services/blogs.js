import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`

}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const remove = async blog => {
  const config = {
    headers: { Authorization:token }
  }

  const idUrl= `${baseUrl}/${blog.id}`
  const response = await axios.delete(idUrl, config)
  return response.data
}

const update = async (id,blog) => {
  const config = {
    headers: {  Authorization :token }
  }




  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization:token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll , create, setToken, update, remove }