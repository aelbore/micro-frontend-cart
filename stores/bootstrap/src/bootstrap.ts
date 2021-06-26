import { createStore, Action, Store, Reducer } from 'koala-store'
import type { RouteRecordRaw } from 'vue-router'

export interface Menu {
  text?: string
  link?: string
}

export interface BootstrapState {
  routes?: RouteRecordRaw[], 
  menus?: Menu[]
  completed?: boolean 
  stores?: Array<Store<{}>>
}

class BootstrapAction implements Action {

  readonly type: string = 'onInit'

} 

const reducer: Reducer<BootstrapState> = (
  state: BootstrapState, 
  action: BootstrapAction
) => {
  const actions = {
    async [action.type]() {
      const response = await fetch('/routes.json')
      const packages = await response.json()
    
      await Promise.all(packages.stores.map(async moduleStore => {
        const store = await import(/* @vite-ignore */  moduleStore.module).then(c => c.default)
        state.stores.push(store)
      }))

      const routes: RouteRecordRaw[] = packages?.routes?.map(pkg => {
        const route: RouteRecordRaw = {
          path: pkg.path,
          component: () =>  import(/* @vite-ignore */ pkg.component)
        }
        return route
      })

      state.routes = routes
      state.completed = !state.completed

      return state
    }
  }
  return actions[action.type] ? actions[action.type](): state
}

export default createStore<BootstrapState>({
  key: 'bootstrap',
  reducer,
  state: {
    routes: [],
    completed: false,
    stores: []
  }
})