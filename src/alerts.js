import { createModule, useModule } from './store'

const addAlert = (item) => {
  const alerts = useModule('alerts')
  alerts.items.push(item)

  setTimeout(() => {
    alerts.items.pop()
  }, 5000)
}

const success = (title, text) => {
  addAlert({ title, text, type: 'success' })
}
const error = (title, text) => {
  addAlert({ title, text, type: 'error' })
}

const useAlerts = () => {
  const alerts = useModule('alerts')
  return {
    alerts,
    success,
    error,
  }
}

const createAlerts = () => {
  createModule('alerts', {
    items: [],
  })
  return useAlerts()
}

export { createAlerts, useAlerts, success, error }
