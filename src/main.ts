import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import bootstrap, { BootstrapState } from 'bootstrap'

(async function () {
  bootstrap.dispatch({ type: 'onInit' })
  bootstrap.subscribe((state: BootstrapState) => {
    (state?.completed && state.stores.length)
      && createApp(App)
            .use(router(state.routes))
            .mount('#app')
  })
})()