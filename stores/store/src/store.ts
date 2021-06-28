import { AnyAction, Store } from 'redux'
import { computed, ref } from 'vue'

import { ComputedGetter, KoalaStore } from './types'

const stores = new Map<string, Store<{}, AnyAction>>()

export function koala<S>(store: Store<S, AnyAction>) {
  
  function dispatch(action: AnyAction) {
    store.dispatch(action)
  }

  function watch<T>(fn: ComputedGetter<S, T>) {
    getter(fn)
  }

  function getter<T>(fn: ComputedGetter<S, T>) {
    const result = ref<T>()

    store.subscribe(() => {
      const state = store.getState()
      result.value = fn(state as S)
    })

    store.dispatch({ type: 'onInit' })
  
    return computed(() => result.value)
  }

  function subscribe(listiner: () => void) {
    store.subscribe(listiner)
  }

  const result: KoalaStore<S> = { subscribe, store, dispatch, getter, watch }

  return result
}

export function useStore<S>(key: string) {
  const store = stores.get(key) as Store<S, AnyAction>
  return koala<S>(store)
}

export function addToStore<S>(key: string, store: Store<S, AnyAction>) {
  return stores.set(key, store).get(key) as Store<S, AnyAction> 
} 