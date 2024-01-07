let events = null

const createEvents = () => {
  events = {
    installed: false,
    _events: {},
    // install(app) {
    //   app.config.globalProperties.$events = this
    //   this.installed = true
    // },
    on(name, cb, options = {}) {
      if (!this._events[name]) {
        this._events[name] = []
      }
      // callCount = 0
      if (!isNaN(options)) {
        options = {
          limit: options,
        }
      }

      this._events[name].push({ cb, options, callCount: 0 })
    },
    once(name, cb, options = {}) {
      options.once = true
      this.on(name, cb, options)
    },

    call(name, data = null) {
      // check if exists
      if (!this._events[name] || !this._events[name].length) {
        return
      }

      let removeEvents = false

      this._events[name].forEach((event) => {
        event.cb(data)
        event.callCount++
        if (event.options.once) {
          event.remove = true
          removeEvents = true
        } else if (
          event.options.limit &&
          event.options.limit === event.callCount
        ) {
          event.remove = true
          removeEvents = true
        }
      })

      if (removeEvents) {
        this._events[name] = this._events[name].filter((a) => !a.remove)
      }
    },
  }
}

const useEvents = () => {
  return events
}
export { createEvents, useEvents }
