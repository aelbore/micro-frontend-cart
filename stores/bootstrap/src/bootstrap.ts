import type { RouteRecordRaw } from 'vue-router'

import { addToStore, Action } from 'koala-store'
import { createStore, Reducer, AnyAction, Store, applyMiddleware } from 'redux'

import { BootstrapState, Stores } from './types'

const reducer: Reducer<BootstrapState> = (
  state: BootstrapState, 
  action: Action
) => {
  switch(action.type) {
    case 'bootstrap':
      const model = action.payload as BootstrapState

      state.routes = model.routes
      state.completed = model.completed
      state.stores = model.stores

      state.stores.forEach(({ key, store }) => {
        addToStore(key, store)
      })
      
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
        const stores: Stores[] = []

        const response = await fetch('/routes.json')
        const packages = await response.json()

        await Promise.all(packages.stores.map(async moduleStore => {
          const store = await import(/* @vite-ignore */  moduleStore.module).then(c => c.default)
          stores.push({ key: moduleStore.id, store })
        }))

        const routes: RouteRecordRaw[] = packages?.routes?.map(pkg => {
          const route: RouteRecordRaw = {
            path: pkg.path,
            component: () =>  import(/* @vite-ignore */ pkg.component)
          }
          return route
        })
  
        store.dispatch({ 
          type: 'bootstrap', 
          payload: { 
            routes, 
            stores,
            completed: (
              packages.stores?.length === stores.length
            )
          }
        })
    }
}

const initialState: BootstrapState = {
  routes: [],
  completed: false
} 

const store = createStore(reducer, initialState, applyMiddleware(service))

export default store