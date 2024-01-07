import { createAlerts } from './alerts'
import { createApi } from './api'
import { createAuth } from './auth'
import { createEvents } from './events'
import { createLocal } from './local'
import { createStore, loadState } from './store'

const tenX = {
  install(_, options = {}) {
    // setup
    // core setup

    createLocal(options.id)
    createEvents()
    const { state } = createStore()
    const alerts = createAlerts()

    const api = createApi(options.api)
    createAuth()

    // connect app
    api
      .get('app')
      .then(({ data }) => {
        // for (const k in data) state[k] = data[k]
        loadState(data)
        state.ready = true
      })
      .catch((err) => {
        alerts.error(err.response.data)
      })
  },
}

export { tenX }
export default tenX
export * from './api'
export * from './store'
export * from './auth'
export * from './loaders'
