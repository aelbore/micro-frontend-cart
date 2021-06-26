import { AnyAction, Store } from 'redux'
import { computed, ref } from 'vue'

import { ComputedGetter, KoalaStore } from './types'


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

  const result: KoalaStore<S> = { dispatch, getter, watch }

  return result
}
