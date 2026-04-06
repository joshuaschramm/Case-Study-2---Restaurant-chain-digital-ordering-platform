<script setup>
import { ref } from 'vue'
import { useOrderStore } from '../stores/orderStore'
import { useCartStore } from '../stores/cartStore'
import ActiveOrderTracker from '../components/orders/ActiveOrderTracker.vue'
import OrderDetailDialog from '../components/orders/OrderDetailDialog.vue'
import menuData from '../data/menu.json'

const orderStore = useOrderStore()
const cartStore = useCartStore()

const selectedOrder = ref(null)
const dialogOpen = ref(false)

function openDetail(order) {
  selectedOrder.value = order
  dialogOpen.value = true
}

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

function statusColor(status) {
  if (status === 'Completed') return 'success'
  if (status === 'In Progress') return 'warning'
  if (status === 'Cancelled') return 'error'
  return 'grey'
}

const headers = [
  { title: 'Order ID', key: 'orderId', sortable: false },
  { title: 'Date', key: 'date', sortable: true },
  { title: 'Items', key: 'items', sortable: false },
  { title: 'Total', key: 'total', sortable: true },
  { title: 'Status', key: 'status', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
]
</script>

<template>
  <v-container fluid class="pa-4">
    <h1 class="text-h4 font-weight-bold mb-6">My Orders</h1>

    <!-- Active Order Tracker -->
    <ActiveOrderTracker />

    <!-- Order History Table -->
    <v-card variant="flat" rounded="lg">
      <v-data-table
        :headers="headers"
        :items="orderStore.orderHistory"
        item-value="orderId"
        class="elevation-0"
      >
        <template #item.orderId="{ item }">
          <a
            href="#"
            class="text-primary text-decoration-none font-weight-medium"
            @click.prevent="openDetail(item)"
          >
            {{ item.orderId }}
          </a>
        </template>

        <template #item.items="{ item }">
          <span class="text-body-2">
            {{ item.items.map(i => i.name).join(', ') }}
          </span>
        </template>

        <template #item.total="{ item }">
          <span class="font-weight-bold">${{ item.total.toFixed(2) }}</span>
        </template>

        <template #item.status="{ item }">
          <v-chip :color="statusColor(item.status)" size="small" variant="flat">
            {{ item.status }}
          </v-chip>
        </template>

        <template #item.actions="{ item }">
          <v-btn
            v-if="item.status === 'Completed'"
            variant="text"
            color="primary"
            size="small"
            prepend-icon="mdi-replay"
            @click="reorder(item)"
          >
            Reorder
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Order Detail Dialog -->
    <OrderDetailDialog
      v-model="dialogOpen"
      :order="selectedOrder"
    />
  </v-container>
</template>
