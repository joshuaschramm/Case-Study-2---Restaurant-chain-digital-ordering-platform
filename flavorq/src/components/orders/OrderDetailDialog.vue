<script setup>
const props = defineProps({
  order: Object,
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" max-width="600">
    <v-card v-if="order" rounded="lg">
      <v-card-title class="d-flex align-center justify-space-between bg-primary pa-4">
        <span class="text-h6 text-white">Order #{{ order.orderId }}</span>
        <v-btn icon variant="text" color="white" @click="emit('update:modelValue', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-4">
        <div class="mb-4">
          <div class="text-body-2 text-grey mb-1">Date: {{ order.date }}</div>
          <div class="text-body-2 text-grey mb-1">Store: {{ order.storeName }}</div>
          <div class="text-body-2 text-grey">Payment: {{ order.paymentMethod }}</div>
        </div>

        <v-divider class="mb-4"></v-divider>

        <div class="text-subtitle-2 font-weight-bold mb-2">Items</div>
        <v-table density="compact">
          <thead>
            <tr>
              <th>Item</th>
              <th class="text-center">Qty</th>
              <th class="text-right">Price</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in order.items" :key="index">
              <td>{{ item.name }}</td>
              <td class="text-center">{{ item.quantity }}</td>
              <td class="text-right">${{ item.price.toFixed(2) }}</td>
              <td class="text-right">${{ (item.price * item.quantity).toFixed(2) }}</td>
            </tr>
          </tbody>
        </v-table>

        <v-divider class="my-4"></v-divider>

        <div class="d-flex justify-space-between text-body-2 mb-1">
          <span>Subtotal</span>
          <span>${{ order.subtotal.toFixed(2) }}</span>
        </div>
        <div class="d-flex justify-space-between text-body-2 mb-1">
          <span>Tax</span>
          <span>${{ order.tax.toFixed(2) }}</span>
        </div>
        <div class="d-flex justify-space-between text-body-2 mb-1">
          <span>Tip</span>
          <span>${{ order.tip.toFixed(2) }}</span>
        </div>
        <v-divider class="my-2"></v-divider>
        <div class="d-flex justify-space-between text-subtitle-1 font-weight-bold">
          <span>Grand Total</span>
          <span>${{ order.total.toFixed(2) }}</span>
        </div>

        <div class="mt-4 d-flex align-center">
          <v-icon color="secondary" size="20" class="mr-2">mdi-star-circle</v-icon>
          <span class="text-body-2">Loyalty points earned: <strong>{{ order.pointsEarned }}</strong></span>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
