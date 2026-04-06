<script setup>
import { computed } from 'vue'
import { useCartStore } from '../../stores/cartStore'
import { useMemberStore } from '../../stores/memberStore'
import menuData from '../../data/menu.json'

const cartStore = useCartStore()
const memberStore = useMemberStore()

const picks = computed(() => {
  const hour = new Date().getHours()
  let items = [...menuData]

  // Context-aware logic
  if (hour >= 11 && hour < 14) {
    // Lunch: favor burgers and chicken
    items.sort((a, b) => {
      const aScore = ['Burgers', 'Chicken'].includes(a.category) ? 1 : 0
      const bScore = ['Burgers', 'Chicken'].includes(b.category) ? 1 : 0
      return bScore - aScore
    })
  } else if (hour >= 14 && hour < 17) {
    // Afternoon: cold drinks and sides
    items.sort((a, b) => {
      const aScore = ['Drinks', 'Sides'].includes(a.category) ? 1 : 0
      const bScore = ['Drinks', 'Sides'].includes(b.category) ? 1 : 0
      return bScore - aScore
    })
  } else if (hour >= 17) {
    // Evening: hearty meals
    items.sort((a, b) => {
      const aScore = ['Burgers', 'Chicken', 'Desserts'].includes(a.category) ? 1 : 0
      const bScore = ['Burgers', 'Chicken', 'Desserts'].includes(b.category) ? 1 : 0
      return bScore - aScore
    })
  } else {
    // Morning: lighter options and drinks
    items.sort((a, b) => {
      const aScore = ['Drinks', 'Sides', 'Desserts'].includes(a.category) ? 1 : 0
      const bScore = ['Drinks', 'Sides', 'Desserts'].includes(b.category) ? 1 : 0
      return bScore - aScore
    })
  }

  // Prioritize favorites
  const favIds = memberStore.member.favoriteItemIds
  items.sort((a, b) => {
    const aFav = favIds.includes(a.id) ? 1 : 0
    const bFav = favIds.includes(b.id) ? 1 : 0
    return bFav - aFav
  })

  return items.slice(0, 6).map(item => {
    let tag = 'Trending'
    if (favIds.includes(item.id)) tag = 'Your Favorite'
    else if (['Drinks'].includes(item.category)) tag = 'Perfect for Sunny Days'
    else if (item.tags.includes('Popular')) tag = 'Trending'
    else tag = 'New'
    return { ...item, pickTag: tag }
  })
})
</script>

<template>
  <div>
    <h2 class="text-h5 font-weight-bold mb-1">Picked For You</h2>
    <p class="text-body-2 text-grey mb-4">Based on your favorites, the weather, and time of day</p>

    <div class="picks-scroll">
      <div class="picks-scroll-inner">
        <v-card v-for="item in picks" :key="item.id" class="picks-card" width="200" rounded="lg" variant="flat">
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
            <v-chip size="x-small" variant="flat" class="mb-2 pick-tag">{{ item.pickTag }}</v-chip>
            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-body-2 font-weight-bold">${{ item.price.toFixed(2) }}</span>
              <span class="text-caption text-grey">{{ item.calories }} cal</span>
            </div>
            <v-btn variant="outlined" color="black" size="small" block rounded="lg" @click="cartStore.addItem(item)">
              Add to Order
            </v-btn>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pick-tag {
  background-color: rgba(204, 5, 5, 0.1) !important;
  color: #cc0505 !important;
}
.picks-scroll {
  overflow-x: auto;
  overflow-y: visible;
  margin-left: -8px;
  margin-right: -16px;
  padding: 8px 16px 16px 8px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.picks-scroll::-webkit-scrollbar {
  display: none;
}
.picks-scroll-inner {
  display: flex;
  gap: 12px;
  padding-right: 16px;
}
.picks-card {
  flex: 0 0 auto;
}
</style>
