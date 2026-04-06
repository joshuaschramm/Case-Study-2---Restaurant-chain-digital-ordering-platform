import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import OrdersView from '../views/OrdersView.vue'
import RewardsView from '../views/RewardsView.vue'
import StoreLocatorView from '../views/StoreLocatorView.vue'
import PreferencesView from '../views/PreferencesView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/menu', name: 'Menu', component: MenuView },
  { path: '/orders', name: 'Orders', component: OrdersView },
  { path: '/rewards', name: 'Rewards', component: RewardsView },
  { path: '/stores', name: 'Stores', component: StoreLocatorView },
  { path: '/preferences', name: 'Preferences', component: PreferencesView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
