import { koala } from 'koala-store'
import { createStore, Reducer, AnyAction, Store, applyMiddleware } from 'redux'
import type { RouteRecordRaw } from 'vue-router'

export type Action = AnyAction & { payload?: any }

export interface Menu {
  text?: string
  link?: string
}

export interface BootstrapState {
  routes?: RouteRecordRaw[], 
  menus?: Menu[]
  completed?: boolean
}

const reducer: Reducer<BootstrapState> = (
  state: BootstrapState, 
  action: Action
) => {
  switch(action.type) {
    case 'bootstrap':
      const model = action.payload as BootstrapState

      state.routes = model.routes
      state.completed = model.completed

      return state      
    
    default:
      return state
  }
}

const service = (store: Store<BootstrapState, AnyAction>) => 
  (next: (action: Action) => void) => 
  async (action: Action) => {

    next(action)

    switch (action.type) {
      case 'GET_CONFIG': 
        const response = await fetch('/routes.json')
        const packages = await response.json()

        const routes: RouteRecordRaw[] = packages?.routes?.map(pkg => {
          const route: RouteRecordRaw = {
            path: pkg.path,
            component: () =>  import(/* @vite-ignore */ pkg.component)
          }
          return route
        })
  
        store.dispatch({ 
          type: 'bootstrap', 
          payload: { routes, completed: true }
        })
    }
}

const initialState: BootstrapState = {
  routes: [],
  completed: false
} 

const store = createStore(reducer, initialState, applyMiddleware(service))

export function useStore() {
  return koala<BootstrapState>(store)
}

export default store