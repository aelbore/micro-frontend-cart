import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { useStore } from 'bootstrap'

(async function () {
  const { watch, dispatch } = useStore()

  dispatch({ type: 'GET_CONFIG' })
  watch(state => {
    (state?.completed)
      && createApp(App)
            .use(router(state.routes))
            .mount('#app')
  })
})()