<script setup>
import PersonalizedPicks from '../components/home/PersonalizedPicks.vue'
import QuickReorder from '../components/home/QuickReorder.vue'
import trendingData from '../data/trending.json'
import menuData from '../data/menu.json'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const trendingItems = trendingData.map(t => {
  const menuItem = menuData.find(m => m.name === t.name)
  return { ...t, image: menuItem?.image, price: menuItem?.price, calories: menuItem?.calories, menuItem }
})
</script>

<template>
  <v-container fluid class="pa-4">
    <!-- Hero Banner -->
    <v-card
      class="mb-6 pa-8"
      rounded="xl"
      style="background: linear-gradient(135deg, #111111, #333333)"
      theme="dark"
    >
      <h1 class="text-h4 font-weight-bold mb-2">Welcome back, Alex!</h1>
      <p class="text-body-1 text-grey-lighten-2 mb-6">Ready for something delicious? Here's what we think you'll love today.</p>
      <v-btn
        color="white"
        size="x-large"
        prepend-icon="mdi-silverware-fork-knife"
        to="/menu"
        rounded="lg"
        class="text-black"
      >
        Order Now
      </v-btn>
    </v-card>

    <!-- Personalized Picks -->
    <div class="mb-6">
      <PersonalizedPicks />
    </div>

    <!-- Popular Orders -->
    <div class="mb-6">
      <h2 class="text-h5 font-weight-bold mb-1">Popular Orders</h2>
      <p class="text-body-2 text-grey mb-4">What everyone's loving right now</p>
      <div class="popular-scroll">
        <div class="popular-scroll-inner">
          <v-card v-for="item in trendingItems" :key="item.name" class="popular-card" width="200" rounded="lg" variant="flat">
            <v-img
              :src="item.image"
              :alt="item.name"
              height="140"
              cover
              class="rounded-t-lg"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
                  <v-icon size="36" color="grey-lighten-1">mdi-image</v-icon>
                </div>
              </template>
            </v-img>
            <v-card-text class="pa-3">
              <div class="text-subtitle-2 font-weight-bold mb-1">{{ item.name }}</div>
              <v-chip size="x-small" variant="flat" class="mb-2 popular-tag">Ordered {{ item.ordersToday }}x today</v-chip>
              <div class="d-flex justify-space-between align-center mb-2">
                <div>
                  <span v-if="item.menuItem?.salePrice" class="text-body-2 text-grey text-decoration-line-through mr-1">${{ item.price?.toFixed(2) }}</span>
                  <span class="text-body-2 font-weight-bold" :class="{ 'sale-price': item.menuItem?.salePrice }">${{ (item.menuItem?.salePrice || item.price)?.toFixed(2) }}</span>
                </div>
                <span class="text-caption text-grey">{{ item.calories }} cal</span>
              </div>
              <v-btn v-if="item.menuItem" variant="flat" color="black" size="small" block rounded="lg" @click="cartStore.addItem(item.menuItem)">
                Add to Order
              </v-btn>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>

    <!-- Quick Reorder -->
    <div class="mb-6">
      <QuickReorder />
    </div>
  </v-container>
</template>

<style scoped>
.popular-scroll {
  overflow-x: auto;
  overflow-y: visible;
  margin-left: -8px;
  margin-right: -16px;
  padding: 8px 16px 16px 8px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.popular-scroll::-webkit-scrollbar {
  display: none;
}
.popular-scroll-inner {
  display: flex;
  gap: 12px;
  padding-right: 16px;
}
.popular-card {
  flex: 0 0 auto;
}
.popular-tag {
  background-color: rgba(204, 5, 5, 0.1) !important;
  color: #cc0505 !important;
}
.sale-price {
  color: #cc0505 !important;
}
</style>
