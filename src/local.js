import localforage from 'localforage'
let local = null

const createLocal = (name = 'app') => {
  local = localforage.createInstance({
    name,
    storeName: name,
  })

  return local
}

const useLocal = () => {
  return local
}

export { createLocal, useLocal }
