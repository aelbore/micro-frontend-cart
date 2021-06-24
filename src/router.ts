import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export default (routes: RouteRecordRaw[]) => {
  return createRouter({
    history: createWebHistory(),
    routes
  })
}