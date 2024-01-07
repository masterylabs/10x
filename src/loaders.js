import { ref } from 'vue'
import { useApi, useState } from '.'

const loadView = (url, append = '/view') => {
  const state = useState()
  const api = useApi()

  const view = ref(null)

  state.loading = true

  api.get(url + append).then(({ data }) => {
    view.value = data
    state.loading = false
  })

  return view
}

export { loadView }
