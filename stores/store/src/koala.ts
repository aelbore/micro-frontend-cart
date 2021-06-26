import { AnyAction, Store } from 'redux'
import { computed, ComputedRef, onMounted, onUnmounted, ref } from 'vue'

import { ComputedGetter } from './types'

export interface KoalaStore<S> {
  dispatch(action: AnyAction): void
  watch<T>(fn: ComputedGetter<S, T>): void
  getter<T>(fn: ComputedGetter<S, T>): ComputedRef<T>
}

export function koala<S>(store: Store<S, AnyAction>) {
  
  function dispatch(action: AnyAction) {
    store.dispatch(action)
  }

  function watch<T>(fn: ComputedGetter<S, T>) {
    getter(fn)
  }

  function getter<T>(fn: ComputedGetter<S, T>) {
    const result = ref<T>()

    const subscribe = store.subscribe(() => {
      const state = store.getState()
      result.value = fn(state as S)
    })
  
    onMounted(() => {
      store.dispatch({ type: 'onInit' })
    })
  
    onUnmounted(() => {
      subscribe()
    })
  
    return computed(() => result.value)
  }

  const result: KoalaStore<S> = { dispatch, getter, watch }

  return result
}
