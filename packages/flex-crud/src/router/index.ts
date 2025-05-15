import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { h } from 'vue'
import RootLayout from '../layout/root-layout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: RootLayout,
  },
  { path: '/login', component: h('div') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
