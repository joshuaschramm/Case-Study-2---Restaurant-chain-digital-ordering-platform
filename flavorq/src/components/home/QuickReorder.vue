<script setup>
import { useCartStore } from '../../stores/cartStore'
import ordersData from '../../data/orders.json'
import menuData from '../../data/menu.json'

const cartStore = useCartStore()

// Get the last 3 completed orders
const recentOrders = ordersData
  .filter(o => o.status === 'Completed')
  .slice(0, 3)

function reorder(order) {
  order.items.forEach(orderItem => {
    const menuItem = menuData.find(m => m.name === orderItem.name)
    if (menuItem) {
      for (let i = 0; i < orderItem.quantity; i++) {
        cartStore.addItem(menuItem)
      }
    }
  })
}
</script>

<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-4">Order Again</h2>
    <v-list>
      <v-list-item v-for="order in recentOrders" :key="order.orderId" class="mb-2">
        <v-card variant="outlined" class="pa-4 w-100" rounded="lg">
          <div class="d-flex align-center justify-space-between flex-wrap">
            <div>
              <div class="text-body-2 text-grey mb-1">{{ order.date }}</div>
              <div class="mb-2">
                <v-chip
                  v-for="item in order.items"
                  :key="item.name"
                  size="small"
                  class="mr-1 mb-1"
                  variant="tonal"
                >
                  {{ item.name }} × {{ item.quantity }}
                </v-chip>
              </div>
              <div class="text-subtitle-2 font-weight-bold">${{ order.total.toFixed(2) }}</div>
            </div>
            <v-btn
              variant="outlined"
              color="primary"
              prepend-icon="mdi-replay"
              @click="reorder(order)"
            >
              Reorder
            </v-btn>
          </div>
        </v-card>
      </v-list-item>
    </v-list>
  </div>
</template>
