import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import SearchResults from './components/SearchResults.vue'
import Home from './Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ] satisfies RouteRecordRaw[],
})

export default router
