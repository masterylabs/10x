import axios from 'axios'
let api = null

const createApi = (baseURL) => {
  api = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return api
}

const setAuthToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const useApi = (baseURL = false) => {
  if (baseURL) {
    return {
      get: async (url = '', args) => {
        if (url && url.indexOf('/') !== 0) {
          url = `/${url}`
        }

        return api.get(`${baseURL}${url}`, args)
      },
      post: async (url, args) => {
        if (url && url.indexOf('/') !== 0) {
          url = `/${url}`
        }
        return api.post(`${baseURL}${url}`, args)
      },
    }
  }
  return api
}

export { createApi, useApi, setAuthToken }
