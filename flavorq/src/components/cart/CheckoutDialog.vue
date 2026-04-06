<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../../stores/cartStore'

const cartStore = useCartStore()

// Payment form
const paymentMethod = ref('card')
const cardNumber = ref('')
const cardExpiry = ref('')
const cardCvc = ref('')
const cardName = ref('Alex R.')

// Delivery address
const deliveryAddress = ref('')
const deliveryApt = ref('')
const deliveryInstructions = ref('')

// Tip
const tipPercent = ref(15)
const tipOptions = [0, 10, 15, 20, 25]

const tipAmount = computed(() => cartStore.subtotal * (tipPercent.value / 100))
const grandTotal = computed(() => cartStore.total + tipAmount.value)

const canProceedStep2 = computed(() => {
  if (cartStore.fulfillmentType === 'delivery' && !deliveryAddress.value.trim()) return false
  return true
})

const canProceedStep3 = computed(() => {
  if (paymentMethod.value === 'card') {
    return cardNumber.value.length >= 15 && cardExpiry.value.length >= 4 && cardCvc.value.length >= 3
  }
  return true
})

function handlePlaceOrder() {
  cartStore.placeOrder()
}
</script>

<template>
  <v-dialog
    v-model="cartStore.isCheckoutOpen"
    max-width="640"
    scrollable
  >
    <v-card rounded="xl" class="checkout-card">
      <!-- Header -->
      <v-card-title class="d-flex align-center justify-space-between pa-4 pb-0">
        <span v-if="!cartStore.orderConfirmed" class="text-h6 font-weight-bold">Checkout</span>
        <span v-else class="text-h6 font-weight-bold">Order Confirmed!</span>
        <v-btn v-if="!cartStore.orderConfirmed" icon variant="text" size="small" @click="cartStore.closeCheckout()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Step indicators -->
      <div v-if="!cartStore.orderConfirmed" class="d-flex align-center justify-center ga-2 px-4 pt-3 pb-1">
        <div v-for="(step, i) in ['Review', 'Details', 'Payment']" :key="step" class="d-flex align-center">
          <div class="d-flex align-center ga-2">
            <v-avatar
              :color="cartStore.checkoutStep > i + 1 ? 'black' : cartStore.checkoutStep === i + 1 ? 'black' : 'grey-lighten-2'"
              size="28"
            >
              <v-icon v-if="cartStore.checkoutStep > i + 1" size="16" color="white">mdi-check</v-icon>
              <span v-else class="text-caption font-weight-bold" :style="{ color: cartStore.checkoutStep === i + 1 ? 'white' : '#999' }">{{ i + 1 }}</span>
            </v-avatar>
            <span class="text-caption font-weight-bold" :style="{ color: cartStore.checkoutStep >= i + 1 ? '#111' : '#999' }">{{ step }}</span>
          </div>
          <v-divider v-if="i < 2" class="mx-2" style="max-width: 32px"></v-divider>
        </div>
      </div>

      <v-card-text class="pa-4">
        <!-- Step 1: Review Order -->
        <div v-if="cartStore.checkoutStep === 1">
          <!-- Fulfillment summary -->
          <v-card variant="tonal" color="grey-lighten-4" rounded="lg" class="mb-4 pa-3">
            <div class="d-flex align-center mb-1">
              <v-icon size="20" class="mr-2" color="#1B5E20">{{ cartStore.fulfillmentType === 'delivery' ? 'mdi-moped' : 'mdi-store' }}</v-icon>
              <span class="text-subtitle-2 font-weight-bold text-capitalize" style="color:#1B5E20">{{ cartStore.fulfillmentType }}</span>
              <v-chip size="x-small" class="ml-2" color="success" variant="flat" style="color:#1B5E20;background:#C8E6C9;">{{ cartStore.estimatedTime }}</v-chip>
            </div>
            <div class="text-body-2 font-weight-bold" style="color:#111">{{ cartStore.selectedStore?.name }} · {{ cartStore.selectedStore?.address }}</div>
          </v-card>

          <!-- Items -->
          <div class="text-subtitle-2 font-weight-bold mb-2">Items ({{ cartStore.itemCount }})</div>
          <v-list density="compact" class="mb-4">
            <v-list-item v-for="item in cartStore.items" :key="item.menuItem.id" class="px-0">
              <div class="d-flex align-center w-100">
                <v-avatar size="40" rounded="lg" class="mr-3">
                  <v-img :src="item.menuItem.image" :alt="item.menuItem.name" cover></v-img>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="text-body-2 font-weight-bold">{{ item.menuItem.name }}</div>
                  <div class="text-caption text-grey">Qty: {{ item.quantity }}</div>
                </div>
                <div class="text-body-2 font-weight-bold">
                  ${{ ((item.menuItem.salePrice || item.menuItem.price) * item.quantity).toFixed(2) }}
                </div>
              </div>
            </v-list-item>
          </v-list>

          <!-- Totals -->
          <v-divider class="mb-3"></v-divider>
          <div class="d-flex justify-space-between text-body-2 mb-1">
            <span>Subtotal</span>
            <span>${{ cartStore.subtotal.toFixed(2) }}</span>
          </div>
          <div class="d-flex justify-space-between text-body-2 mb-1">
            <span>Tax</span>
            <span>${{ cartStore.tax.toFixed(2) }}</span>
          </div>
          <div v-if="cartStore.fulfillmentType === 'delivery'" class="d-flex justify-space-between text-body-2 mb-1">
            <span>Delivery Fee</span>
            <span>${{ cartStore.deliveryFee.toFixed(2) }}</span>
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="d-flex justify-space-between text-subtitle-1 font-weight-bold">
            <span>Total</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Step 2: Delivery/Pickup Details -->
        <div v-if="cartStore.checkoutStep === 2">
          <div v-if="cartStore.fulfillmentType === 'delivery'">
            <div class="text-subtitle-2 font-weight-bold mb-3">Delivery Address</div>
            <v-text-field
              v-model="deliveryAddress"
              label="Street Address"
              variant="outlined"
              density="compact"
              prepend-inner-icon="mdi-map-marker"
              class="mb-2"
            ></v-text-field>
            <v-text-field
              v-model="deliveryApt"
              label="Apt / Suite / Floor (optional)"
              variant="outlined"
              density="compact"
              class="mb-2"
            ></v-text-field>
            <v-textarea
              v-model="deliveryInstructions"
              label="Delivery Instructions (optional)"
              variant="outlined"
              density="compact"
              rows="2"
              placeholder="e.g., Leave at the door, ring doorbell"
            ></v-textarea>
          </div>

          <div v-else>
            <div class="text-subtitle-2 font-weight-bold mb-3">Pickup Details</div>
            <v-card variant="tonal" color="grey-lighten-4" rounded="lg" class="pa-4 mb-4">
              <div class="d-flex align-center mb-2">
                <v-icon color="#1B5E20" class="mr-2">mdi-store-check</v-icon>
                <div>
                  <div class="text-subtitle-2 font-weight-bold" style="color:#1B5E20">{{ cartStore.selectedStore?.name }}</div>
                  <div class="text-caption font-weight-bold" style="color:#111">{{ cartStore.selectedStore?.address }}, {{ cartStore.selectedStore?.city }} {{ cartStore.selectedStore?.zip }}</div>
                </div>
              </div>
              <div class="d-flex align-center text-body-2 font-weight-bold" style="color:#2E7D32">
                <v-icon size="16" class="mr-1" color="#2E7D32">mdi-clock-outline</v-icon>
                {{ cartStore.selectedStore?.hours }}
              </div>
              <div class="d-flex align-center text-body-2 font-weight-bold mt-1" style="color:#2E7D32">
                <v-icon size="16" class="mr-1" color="#2E7D32">mdi-phone</v-icon>
                {{ cartStore.selectedStore?.phone }}
              </div>
            </v-card>
            <v-card variant="tonal" color="green-lighten-5" rounded="lg" class="pa-3">
              <div class="d-flex align-center">
                <v-icon color="#1B5E20" class="mr-2">mdi-clock-fast</v-icon>
                <div>
                  <div class="text-body-2 font-weight-bold" style="color:#1B5E20">Estimated Ready Time</div>
                  <div class="text-subtitle-1 font-weight-bold" style="color:#2E7D32">{{ cartStore.estimatedTime }}</div>
                </div>
              </div>
            </v-card>
          </div>

          <!-- Tip -->
          <div class="mt-6">
            <div class="text-subtitle-2 font-weight-bold mb-2">Add a Tip</div>
            <v-btn-toggle
              v-model="tipPercent"
              mandatory
              color="black"
              rounded="lg"
              density="compact"
              class="w-100"
            >
              <v-btn v-for="t in tipOptions" :key="t" :value="t" class="flex-grow-1" size="small">
                {{ t === 0 ? 'None' : t + '%' }}
              </v-btn>
            </v-btn-toggle>
            <div v-if="tipPercent > 0" class="text-caption text-grey mt-1">
              <span style="color:#1B5E20">Tip: ${{ tipAmount.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Step 3: Payment -->
        <div v-if="cartStore.checkoutStep === 3">
          <div class="text-subtitle-2 font-weight-bold mb-3">Payment Method</div>
          <v-btn-toggle
            v-model="paymentMethod"
            mandatory
            color="black"
            rounded="lg"
            density="compact"
            class="w-100 mb-4"
          >
            <v-btn value="card" class="flex-grow-1" size="small">
              <v-icon start size="18" :color="paymentMethod === 'card' ? 'white' : '#1B5E20'">mdi-credit-card</v-icon>
              <span :style="{ color: paymentMethod === 'card' ? 'white' : '#1B5E20' }">Card</span>
            </v-btn>
            <v-btn value="apple" class="flex-grow-1" size="small">
              <v-icon start size="18" :color="paymentMethod === 'apple' ? 'white' : '#111'">mdi-apple</v-icon>
              <span :style="{ color: paymentMethod === 'apple' ? 'white' : '#111' }">Apple Pay</span>
            </v-btn>
            <v-btn value="google" class="flex-grow-1" size="small">
              <v-icon start size="18" :color="paymentMethod === 'google' ? 'white' : '#111'">mdi-google</v-icon>
              <span :style="{ color: paymentMethod === 'google' ? 'white' : '#111' }">Google Pay</span>
            </v-btn>
          </v-btn-toggle>

          <div v-if="paymentMethod === 'card'">
            <v-text-field
              v-model="cardName"
              label="Name on Card"
              variant="outlined"
              density="compact"
              prepend-inner-icon="mdi-account"
              class="mb-2"
            ></v-text-field>
            <v-text-field
              v-model="cardNumber"
              label="Card Number"
              variant="outlined"
              density="compact"
              prepend-inner-icon="mdi-credit-card-outline"
              placeholder="4242 4242 4242 4242"
              class="mb-2"
            ></v-text-field>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="cardExpiry"
                  label="Expiry"
                  variant="outlined"
                  density="compact"
                  placeholder="MM/YY"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="cardCvc"
                  label="CVC"
                  variant="outlined"
                  density="compact"
                  placeholder="123"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <div v-else class="text-center pa-6">
            <v-icon size="48" color="#111">{{ paymentMethod === 'apple' ? 'mdi-apple' : 'mdi-google' }}</v-icon>
            <p class="text-body-2 font-weight-bold mt-2" style="color:#111">You'll be prompted to confirm with {{ paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay' }} when you place your order.</p>
          </div>

          <!-- Final totals -->
          <v-divider class="mb-3"></v-divider>
          <div class="d-flex justify-space-between text-body-2 mb-1">
            <span>Subtotal</span>
            <span>${{ cartStore.subtotal.toFixed(2) }}</span>
          </div>
          <div class="d-flex justify-space-between text-body-2 mb-1">
            <span>Tax</span>
            <span>${{ cartStore.tax.toFixed(2) }}</span>
          </div>
          <div v-if="cartStore.fulfillmentType === 'delivery'" class="d-flex justify-space-between text-body-2 mb-1">
            <span>Delivery Fee</span>
            <span>${{ cartStore.deliveryFee.toFixed(2) }}</span>
          </div>
          <div v-if="tipPercent > 0" class="d-flex justify-space-between text-body-2 mb-1">
            <span>Tip</span>
            <span>${{ tipAmount.toFixed(2) }}</span>
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="d-flex justify-space-between text-h6 font-weight-bold">
            <span>Total</span>
            <span>${{ grandTotal.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Step 4: Confirmation -->
        <div v-if="cartStore.checkoutStep === 4" class="text-center py-6">
          <v-icon size="80" color="success" class="mb-4">mdi-check-circle</v-icon>
          <h2 class="text-h5 font-weight-bold mb-2">Order Placed!</h2>
          <p class="text-body-1 text-grey mb-4">Your order number is</p>
          <v-chip size="large" color="black" text-color="white" variant="flat" class="text-h6 font-weight-bold px-6 mb-4">
            {{ cartStore.confirmedOrderNumber }}
          </v-chip>

          <v-card variant="tonal" color="green-lighten-5" rounded="lg" class="pa-4 mb-4 mx-auto" max-width="320">
            <div class="d-flex align-center justify-center">
              <v-icon color="#1B5E20" class="mr-2">mdi-clock-fast</v-icon>
              <div class="text-left">
                <div class="text-body-2 font-weight-bold" style="color:#1B5E20">Estimated {{ cartStore.fulfillmentType === 'delivery' ? 'Delivery' : 'Pickup' }}</div>
                <div class="text-h6 font-weight-bold" style="color:#2E7D32">{{ cartStore.estimatedTime }}</div>
              </div>
            </div>
          </v-card>

          <v-card variant="tonal" color="grey-lighten-4" rounded="lg" class="pa-3 mb-4 mx-auto" max-width="320">
            <div class="d-flex align-center justify-center">
              <v-icon size="20" class="mr-2" color="#1B5E20">{{ cartStore.fulfillmentType === 'delivery' ? 'mdi-moped' : 'mdi-store' }}</v-icon>
              <div class="text-left">
                <div class="text-caption font-weight-bold text-capitalize" style="color:#1B5E20">{{ cartStore.fulfillmentType }} from</div>
                <div class="text-body-2 font-weight-bold" style="color:#111">{{ cartStore.selectedStore?.name }}</div>
              </div>
            </div>
          </v-card>

          <p class="text-body-2 text-grey mb-2">You'll receive a notification when your order is ready.</p>
          <div class="d-flex justify-space-between text-subtitle-1 font-weight-bold mb-2">
            <span>Total Charged</span>
            <span>${{ grandTotal.toFixed(2) }}</span>
          </div>
        </div>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions class="pa-4 pt-0">
        <v-btn
          v-if="cartStore.checkoutStep > 1 && !cartStore.orderConfirmed"
          variant="text"
          @click="cartStore.checkoutStep--"
        >
          Back
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn
          v-if="cartStore.checkoutStep === 1"
          color="black"
          variant="flat"
          rounded="lg"
          @click="cartStore.checkoutStep = 2"
        >
          Continue
        </v-btn>

        <v-btn
          v-if="cartStore.checkoutStep === 2"
          color="black"
          variant="flat"
          rounded="lg"
          :disabled="!canProceedStep2"
          @click="cartStore.checkoutStep = 3"
        >
          Continue to Payment
        </v-btn>

        <v-btn
          v-if="cartStore.checkoutStep === 3"
          color="black"
          variant="flat"
          rounded="lg"
          size="large"
          :disabled="paymentMethod === 'card' && !canProceedStep3"
          @click="handlePlaceOrder"
          prepend-icon="mdi-check-circle"
        >
          Place Order · ${{ grandTotal.toFixed(2) }}
        </v-btn>

        <v-btn
          v-if="cartStore.orderConfirmed"
          color="black"
          variant="flat"
          rounded="lg"
          size="large"
          block
          @click="cartStore.finishOrder()"
        >
          Done
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.checkout-card,
.checkout-card:hover {
  transform: none !important;
}
</style>
