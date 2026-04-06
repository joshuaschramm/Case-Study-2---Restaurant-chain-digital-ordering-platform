<script setup>
import { useOrderStore } from '../../stores/orderStore'

const orderStore = useOrderStore()
</script>

<template>
  <v-card v-if="orderStore.activeOrder" color="primary" variant="tonal" class="mb-6 pa-4" rounded="lg">
    <v-card-title class="text-h6 font-weight-bold">
      Order #{{ orderStore.activeOrder.orderId }} — In Progress
    </v-card-title>
    <v-card-text>
      <v-stepper
        :model-value="2"
        alt-labels
        flat
        bg-color="transparent"
        class="active-order-stepper"
      >
        <v-stepper-header>
          <v-stepper-item
            title="Order Placed"
            icon="mdi-check-circle"
            :value="1"
            :complete="true"
            color="primary"
          ></v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item
            title="Preparing"
            icon="mdi-chef-hat"
            :value="2"
            color="primary"
            class="pulse-step"
          ></v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item
            title="Ready for Pickup"
            icon="mdi-package-variant-closed"
            :value="3"
            color="grey"
          ></v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item
            title="Picked Up"
            icon="mdi-hand-wave"
            :value="4"
            color="grey"
          ></v-stepper-item>
        </v-stepper-header>
      </v-stepper>

      <div class="text-center mt-4">
        <p class="text-body-1">Estimated ready in: <strong>8 minutes</strong></p>
        <p class="text-body-2 text-grey">{{ orderStore.activeOrder.storeName }}</p>
      </div>

      <div class="text-center mt-2">
        <v-btn variant="text" color="error">Cancel Order</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.pulse-step :deep(.v-stepper-item__avatar) {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(17, 17, 17, 0.3); }
  50% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(17, 17, 17, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(17, 17, 17, 0); }
}
</style>
