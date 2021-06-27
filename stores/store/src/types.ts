import { AnyAction, Store } from 'redux'
import type { ComputedRef } from 'vue'

export interface Action {
  type: symbol | string
  payload?: any
}

export interface Reducer<T> {
  (state: T, action: Action): T | Promise<T>
}

export interface CallbackFn<T> {
  (state?: T): void
}

export interface ComputedGetter<T, S> {
  (state: T): S
}

export interface StoreOptions<T> {
  key: string
  state?: T
  reducer?: Reducer<T>
}

export interface KoalaStore<S> {
  dispatch(action: AnyAction): void
  watch<T>(fn: ComputedGetter<S, T>): void
  getter<T>(fn: ComputedGetter<S, T>): ComputedRef<T>
  store: Store<S, AnyAction>
  subscribe(listener: () => void): void
}