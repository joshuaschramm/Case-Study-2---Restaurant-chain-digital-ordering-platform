<script setup>
import { useCartStore } from '../../stores/cartStore'
import { useMemberStore } from '../../stores/memberStore'

const props = defineProps({
  item: Object,
})

const cartStore = useCartStore()
const memberStore = useMemberStore()

const isFavorite = memberStore.member.favoriteItemIds.includes(props.item.id)
</script>

<template>
  <v-card class="h-100 d-flex flex-column" rounded="lg" variant="flat">
    <div class="position-relative">
      <v-img
        :src="item.image"
        :alt="item.name"
        height="180"
        cover
        class="rounded-t-lg"
      >
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
            <v-icon size="48" color="grey-lighten-1">mdi-image</v-icon>
          </div>
        </template>
      </v-img>
      <v-btn
        icon
        variant="text"
        size="small"
        class="position-absolute"
        style="top: 8px; right: 8px; background: rgba(255,255,255,0.85); backdrop-filter: blur(4px)"
      >
        <v-icon :color="isFavorite ? 'error' : 'grey'" size="20">
          {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-btn>
    </div>

    <v-card-text class="flex-grow-1 d-flex flex-column pa-3">
      <div class="text-subtitle-1 font-weight-bold mb-1">{{ item.name }}</div>
      <div class="text-caption text-grey mb-2" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
        {{ item.description }}
      </div>
      <div class="mb-2">
        <v-chip
          v-for="tag in item.tags"
          :key="tag"
          size="x-small"
          class="mr-1 mb-1 menu-tag"
          variant="flat"
        >
          {{ tag === 'Spicy' ? 'Spicy 🌶️' : tag === 'Vegetarian' ? 'Vegetarian 🌱' : tag }}
        </v-chip>
      </div>
      <div class="mt-auto">
        <div class="d-flex align-center justify-space-between mb-2">
          <span class="text-subtitle-1 font-weight-bold">${{ item.price.toFixed(2) }}</span>
          <span class="text-caption text-grey">{{ item.calories }} cal</span>
        </div>
        <v-btn color="black" variant="flat" block size="small" rounded="lg" @click="cartStore.addItem(item)">
          Add to Cart
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.menu-tag {
  background-color: rgba(204, 5, 5, 0.1) !important;
  color: #cc0505 !important;
}
</style>
