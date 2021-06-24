import { reactive, computed, ToRefs, toRefs } from '@vue/reactivity'

export type Dispatch = { dispatch(type: string, payload?: any): void }
export type ActionState<T> = { state?: T, dispatch?: (type: string, payload?: any) => void }
export type ActionHandler<T> = (options: ActionState<T>, payload?: any) => void
export type Actions<T> = { [key: string]: ActionHandler<T> }

export interface StoreOptions<T> {
  id?: string
  state?: T
  actions?: Actions<T>
}

export type Store<T> = ToRefs<T> & Dispatch

const stores = new Map<string, Store<{}>>()

export function addToStore<T>(key: string, store: Store<T>) {
  if (!stores.has(key)) {
    stores.set(key, store)
  }
}

export function createStore<T extends {}>(options: StoreOptions<T>) {
  const getters = reactive<T>(
    Object.keys(options.state).reduce((prev, cur) => {
    prev[cur] = computed(() => options.state[cur])
    return prev
  }, {} as T)) as T

  function dispatch(type: string, payload?: any) {
    options.actions[type]({ state: options.state, dispatch }, payload)
  }

  const store: Store<T> = { ...toRefs(getters), dispatch }
  
  const getSetStore = (id?: string) => {
    const key = id ?? options.id 
    if (key && stores.has(key)) return stores.get(key) as Store<T>
    return store as Store<T>
  }
  
  return getSetStore 
}

export function useStore<T>(id: string) {
  return stores.get(id) as Store<T>
}