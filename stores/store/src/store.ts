import { ref } from '@vue/reactivity'
import { Action, CallbackFn, ComputedGetter, Reducer, Store, StoreOptions } from './types'

const State = new Map<string, {}>()
const Stores = new Map<string, Store<{}>>()

const generateId = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)

export function createStore<T>(options: StoreOptions<T>) {
  const { key, state, reducer } = options
  return Stores.set(key, defineStore<T>(reducer, state)).get(key) as Store<T>
}

export function useStore<T>(key: string) {
  return Stores.get(key) as Store<T>
}

export function defineStore<T>(reducer: Reducer<T>, initialState: T) {
  const key = generateId()
  const listeners: Array<CallbackFn<T>> = []
  
  State.set(key, initialState)

  const getState = () => State.get(key) as T

  const dispatch = async (action?: Action) => {
    const state = await reducer(getState(), action)
    State.set(key, state)

    listeners.slice().forEach((listener: CallbackFn<T>) => listener(getState()))
  }

  const subscribe = (listener: CallbackFn<T>) => {
    listeners.push(listener)
    return () => listeners.filter(l => l !== listener)
  }

  function useState<S>(getter: ComputedGetter<T, S>){
    const result = ref<S>()

    subscribe((state: T) => {
      result.value = getter(state)
    })
    dispatch()

    return result
  }

  const result: Store<T> = { getState, subscribe, dispatch, useState }

  return result
}