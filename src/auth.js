import { createModule, useModule } from './store'
import { useLocal } from './local'
import { useApi, setAuthToken } from './api'

const login = async (email, password) => {
  const local = useLocal()
  const auth = useModule('auth')
  const api = useApi()

  auth.loading = true

  try {
    const { data } = await api.post('/auth/login', { email, password })
    setAuthToken(data.token)
    local.setItem('authToken', data.token)

    auth.user = data.user
    auth.authenticated = true

    auth.loading = false
  } catch (error) {
    auth.loading = false
    return false
  }
  //
}
const logout = async () => {
  const api = useApi()
  const local = useLocal()
  const auth = useModule('auth')

  auth.loading = true

  try {
    await api.post('/auth/logout')
    local.removeItem('authToken')
    auth.authenticated = false
    auth.user = null
    auth.loading = false
  } catch (err) {
    auth.loading = false
    //
  }
}

const authenticate = async (token) => {
  const auth = useModule('auth')
  const api = useApi()
  setAuthToken(token)
  try {
    const { data } = await api.get('/auth/me')
    auth.user = data.user
    auth.authenticated = true
    return true
  } catch (error) {
    return false
  }
}

const useAuth = () => {
  const auth = useModule('auth')
  return {
    auth,
    login,
    logout,
    authenticate,
  }
}

const createAuth = async () => {
  const local = useLocal()

  createModule('auth', {
    ready: false,
    loading: false,
    authenticated: false,
    user: null,
  })

  const token = await local.getItem('authToken')
  if (token) {
    const ok = await authenticate(token)
    if (!ok) local.removeItem('authToken')
  }

  useModule('auth').ready = true
}

export { createAuth, useAuth, login, logout }
