import { createApp, reactive, watchEffect } from 'vue'
import { addToStore } from 'koala-store'
import { RouteRecordRaw } from 'vue-router'

import App from './App.vue'
import router from './router'

(async function() {  
  const state = reactive({
    routes: [],
    menus: [],
    completed: false
  })

  const response = await fetch('/routes.json')
  const packages = await response.json()

  await Promise.all(packages.stores.map(async moduleStore => {
    const store = await import(/* @vite-ignore */  moduleStore.module).then(c => c.default())
    addToStore(moduleStore.id, store)
  }))

  const routes: RouteRecordRaw[] = packages?.routes?.map(pkg => {
    const route: RouteRecordRaw = {
      path: pkg.path,
      component: () =>  import(/* @vite-ignore */ pkg.component)
    }
    return route
  })

  state.routes = routes;
  state.menus = packages.menus;
  state.completed = !state.completed;

  watchEffect(() => {
    if (state.completed) {
      createApp(App)
        .use(router(state.routes)) 
        .mount('#app')
      state.completed = false
    }
  })
})()