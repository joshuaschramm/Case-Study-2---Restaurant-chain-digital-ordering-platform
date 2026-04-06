<script setup>
import { useCartStore } from '../../stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <v-navigation-drawer
    v-model="cartStore.isDrawerOpen"
    location="right"
    temporary
    width="380"
  >
    <div class="pa-4">
      <div class="d-flex align-center justify-space-between mb-4">
        <h3 class="text-h6">Your Cart ({{ cartStore.itemCount }})</h3>
        <v-btn icon variant="text" @click="cartStore.toggleDrawer()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <!-- Store & Fulfillment Selection -->
      <v-card variant="flat" rounded="lg" class="mb-4 pa-3 border" style="border: 1px solid #E0E0E0 !important">
        <div class="text-body-2 font-weight-bold mb-2">Order Type</div>
        <v-btn-toggle
          :model-value="cartStore.fulfillmentType"
          @update:model-value="cartStore.setFulfillmentType($event)"
          mandatory
          color="black"
          rounded="lg"
          density="comfortable"
          class="w-100 mb-4"
        >
          <v-btn value="pickup" class="flex-grow-1">
            <v-icon start size="20">mdi-store</v-icon>
            Pickup
          </v-btn>
          <v-btn value="delivery" class="flex-grow-1">
            <v-icon start size="20">mdi-moped</v-icon>
            Delivery
          </v-btn>
        </v-btn-toggle>

        <div class="text-body-2 font-weight-bold mb-2">Store Location</div>
        <v-select
          :model-value="cartStore.selectedStore"
          @update:model-value="cartStore.setStore($event)"
          :items="cartStore.stores"
          item-title="name"
          item-value="id"
          return-object
          variant="outlined"
          density="comfortable"
          hide-details
          rounded="lg"
        >
          <template #item="{ item, props: itemProps }">
            <v-list-item v-bind="itemProps" :subtitle="item.raw.address + ', ' + item.raw.city">
              <template #append>
                <v-chip
                  :color="item.raw.isOpen ? 'success' : 'error'"
                  size="x-small"
                  variant="flat"
                >
                  {{ item.raw.isOpen ? 'Open' : 'Closed' }}
                </v-chip>
              </template>
            </v-list-item>
          </template>
        </v-select>

        <v-card v-if="cartStore.selectedStore" variant="flat" rounded="lg" class="pa-2 mt-3" style="background-color: #E8F5E9">
          <div class="d-flex align-center">
            <v-icon size="18" color="success" class="mr-2">mdi-map-marker-check</v-icon>
            <div>
              <div class="text-body-2 font-weight-bold" style="color: #1B5E20">{{ cartStore.selectedStore.name }}</div>
              <div class="text-caption" style="color: #555">
                {{ cartStore.selectedStore.address }}, {{ cartStore.selectedStore.city }} · {{ cartStore.selectedStore.distance }}
              </div>
            </div>
          </div>
        </v-card>
      </v-card>

      <!-- Empty State -->
      <div v-if="cartStore.isEmpty" class="text-center py-12">
        <v-icon size="80" color="grey-lighten-1">mdi-shopping-outline</v-icon>
        <p class="text-body-1 text-grey mt-4">Your cart is empty.</p>
        <p class="text-body-2 text-grey">Browse the menu to get started!</p>
        <v-btn color="primary" variant="outlined" class="mt-4" to="/menu" @click="cartStore.toggleDrawer()">
          Browse Menu
        </v-btn>
      </div>

      <!-- Cart Items -->
      <v-list v-else density="comfortable">
        <v-list-item
          v-for="item in cartStore.items"
          :key="item.menuItem.id"
          class="px-0"
        >
          <div class="d-flex align-center w-100">
            <div class="flex-grow-1">
              <div class="text-subtitle-2">{{ item.menuItem.name }}</div>
              <div class="text-body-2 text-primary font-weight-bold">
                ${{ ((item.menuItem.salePrice || item.menuItem.price) * item.quantity).toFixed(2) }}
              </div>
            </div>
            <div class="d-flex align-center">
              <v-btn icon size="x-small" variant="text" @click="cartStore.decrementQuantity(item.menuItem.id)">
                <v-icon size="18">mdi-minus</v-icon>
              </v-btn>
              <span class="mx-2 text-body-2 font-weight-bold">{{ item.quantity }}</span>
              <v-btn icon size="x-small" variant="text" @click="cartStore.incrementQuantity(item.menuItem.id)">
                <v-icon size="18">mdi-plus</v-icon>
              </v-btn>
              <v-btn icon size="x-small" variant="text" color="error" class="ml-1" @click="cartStore.removeItem(item.menuItem.id)">
                <v-icon size="18">mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </div>
        </v-list-item>
      </v-list>

      <!-- Order Summary -->
      <div v-if="!cartStore.isEmpty" class="mt-4">
        <v-divider class="mb-4"></v-divider>

        <!-- Estimated Time -->
        <v-card variant="flat" rounded="lg" class="mb-4 pa-3" style="background-color: #E8F5E9">
          <div class="d-flex align-center">
            <v-icon color="success" class="mr-2">mdi-clock-fast</v-icon>
            <div>
              <div class="text-body-2 font-weight-bold" style="color: #1B5E20">Estimated {{ cartStore.fulfillmentType === 'delivery' ? 'Delivery' : 'Pickup' }} Time</div>
              <div class="text-subtitle-1 font-weight-bold" style="color: #2E7D32">{{ cartStore.estimatedTime }}</div>
            </div>
          </div>
        </v-card>

        <div class="d-flex justify-space-between text-body-2 mb-1">
          <span>Subtotal</span>
          <span>${{ cartStore.subtotal.toFixed(2) }}</span>
        </div>
        <div class="d-flex justify-space-between text-body-2 mb-1">
          <span>Tax (8.5%)</span>
          <span>${{ cartStore.tax.toFixed(2) }}</span>
        </div>
        <div v-if="cartStore.fulfillmentType === 'delivery'" class="d-flex justify-space-between text-body-2 mb-1">
          <span>Delivery Fee</span>
          <span>${{ cartStore.deliveryFee.toFixed(2) }}</span>
        </div>
        <v-divider class="my-2"></v-divider>
        <div class="d-flex justify-space-between text-subtitle-1 font-weight-bold mb-4">
          <span>Estimated Total</span>
          <span>${{ cartStore.total.toFixed(2) }}</span>
        </div>
        <v-btn block color="primary" size="large" prepend-icon="mdi-cash-register" @click="cartStore.openCheckout()">
          Checkout
        </v-btn>
        <v-btn block variant="text" color="error" class="mt-2" @click="cartStore.clearCart()">
          Clear Cart
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>
