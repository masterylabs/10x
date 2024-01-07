import { reactive } from 'vue'
let state = null

const createStore = () => {
  state = reactive({
    lang: {},
  })
  state.modules = {}

  return { state }
}

const useState = () => {
  return state
}

const createModule = (key, value) => {
  state.modules[key] = value
}

const useModule = (key) => {
  return state.modules[key]
}

const loadState = (payload) => {
  for (const k in payload) {
    // preserve reactive on pre-defined objects (e.g. lang)
    if (typeof state[k] === 'object') {
      for (const kk in payload[k]) {
        state[k][kk] = payload[k][kk]
      }
    } else {
      state[k] = payload[k]
    }
  }
}

// Provisional
let lang = null
const useLang = () => {
  if (!lang) {
    lang = new Proxy(state.lang, {
      get(target, prop) {
        return target[prop] || prop
      },
    })
  }
  return lang
}

export { createStore, createModule, useState, useModule, useLang, loadState }
