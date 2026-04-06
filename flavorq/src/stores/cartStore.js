import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isDrawerOpen = ref(false)

  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)
  )

  const tax = computed(() => subtotal.value * 0.085)

  const total = computed(() => subtotal.value + tax.value)

  const isEmpty = computed(() => items.value.length === 0)

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

  return {
    items, isDrawerOpen, itemCount, subtotal, tax, total, isEmpty,
    addItem, removeItem, incrementQuantity, decrementQuantity, clearCart, toggleDrawer
  }
})
