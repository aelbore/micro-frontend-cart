import type { Ref } from '@vue/reactivity'

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

export interface Store<T> {
  getState(): T
  subscribe: (listener: CallbackFn<T>) => () => CallbackFn<T>[]
  dispatch(action: Action): Promise<void>
  useState<S>(getter: ComputedGetter<T, S>): Ref<S>
}

export interface StoreOptions<T> {
  key: string
  state?: T
  reducer?: Reducer<T>
}