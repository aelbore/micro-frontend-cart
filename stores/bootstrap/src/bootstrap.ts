import { addToStore, createStore } from 'koala-store'
import { reactive } from '@vue/reactivity'
import { RouteRecordRaw } from 'vue-router'

export interface Menu {
  text?: string
  link?: string
}

export interface BootstrapState {
  routes?: RouteRecordRaw[], 
  menus?: Menu[]
  completed?: boolean 
}

const id = 'bootstrap'

const bootstrap = createStore<BootstrapState>({
  id,
  state: reactive({
    routes: [],
    menus: [],
    completed: false
  }),
  actions: {
    async bootstrap({ state, dispatch }) {
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
      
      state.routes = routes
      state.menus = packages.menus
      state.completed = !state.completed
    },
  }
})

addToStore(id, bootstrap(id))

export default bootstrap