import type { RouteRecordRaw } from 'vue-router'
import type { AnyAction, Store } from 'redux'

export interface Menu {
  text?: string
  link?: string
}

export interface Stores {
  key?: string
  store?: Store<{}, AnyAction>
}

export interface BootstrapState {
  routes?: RouteRecordRaw[], 
  menus?: Menu[]
  stores?: Stores[]
  completed?: boolean
}