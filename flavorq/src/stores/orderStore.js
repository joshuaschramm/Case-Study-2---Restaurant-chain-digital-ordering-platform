import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import ordersData from '../data/orders.json'

export const useOrderStore = defineStore('orders', () => {
  const orders = ref([...ordersData])

  const activeOrder = computed(() => {
    return orders.value.find(o => o.status === 'In Progress') || null
  })

  const completedOrders = computed(() => {
    return orders.value.filter(o => o.status === 'Completed')
  })

  const orderHistory = computed(() => {
    return orders.value
  })

  return { orders, activeOrder, completedOrders, orderHistory }
})
