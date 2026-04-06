import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import storesData from '../data/stores.json'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isDrawerOpen = ref(false)
  const selectedStore = ref(storesData[0])
  const fulfillmentType = ref('pickup') // 'pickup' or 'delivery'
  const stores = ref(storesData)

  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + (item.menuItem.salePrice || item.menuItem.price) * item.quantity, 0)
  )

  const deliveryFee = computed(() => fulfillmentType.value === 'delivery' ? 4.99 : 0)

  const tax = computed(() => subtotal.value * 0.085)

  const total = computed(() => subtotal.value + tax.value + deliveryFee.value)

  const isEmpty = computed(() => items.value.length === 0)

  const estimatedTime = computed(() => {
    const baseMinutes = fulfillmentType.value === 'delivery' ? 30 : 15
    const extraMinutes = Math.floor(itemCount.value / 3) * 5
    const total = baseMinutes + extraMinutes
    return `${total}–${total + 10} min`
  })

  function addItem(menuItem) {
    const existing = items.value.find(i => i.menuItem.id === menuItem.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ menuItem, quantity: 1 })
    }
    isDrawerOpen.value = true
  }

  function removeItem(menuItemId) {
    items.value = items.value.filter(i => i.menuItem.id !== menuItemId)
  }

  function incrementQuantity(menuItemId) {
    const item = items.value.find(i => i.menuItem.id === menuItemId)
    if (item) item.quantity++
  }

  function decrementQuantity(menuItemId) {
    const item = items.value.find(i => i.menuItem.id === menuItemId)
    if (item) {
      item.quantity--
      if (item.quantity <= 0) {
        removeItem(menuItemId)
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  function setStore(store) {
    selectedStore.value = store
  }

  function setFulfillmentType(type) {
    fulfillmentType.value = type
  }

  const isCheckoutOpen = ref(false)
  const checkoutStep = ref(1)
  const orderConfirmed = ref(false)
  const confirmedOrderNumber = ref(null)

  function openCheckout() {
    checkoutStep.value = 1
    orderConfirmed.value = false
    confirmedOrderNumber.value = null
    isCheckoutOpen.value = true
    isDrawerOpen.value = false
  }

  function closeCheckout() {
    isCheckoutOpen.value = false
  }

  function placeOrder() {
    confirmedOrderNumber.value = 'FQ-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    orderConfirmed.value = true
    checkoutStep.value = 4
  }

  function finishOrder() {
    items.value = []
    isCheckoutOpen.value = false
    orderConfirmed.value = false
    checkoutStep.value = 1
  }

  return {
    items, isDrawerOpen, itemCount, subtotal, tax, total, isEmpty,
    selectedStore, fulfillmentType, stores, deliveryFee, estimatedTime,
    isCheckoutOpen, checkoutStep, orderConfirmed, confirmedOrderNumber,
    addItem, removeItem, incrementQuantity, decrementQuantity, clearCart, toggleDrawer,
    setStore, setFulfillmentType, openCheckout, closeCheckout, placeOrder, finishOrder
  }
})
