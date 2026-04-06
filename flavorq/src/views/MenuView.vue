<script setup>
import { useMenuStore } from '../stores/menuStore'
import MenuItemCard from '../components/menu/MenuItemCard.vue'

const menuStore = useMenuStore()

const categoryIcons = {
  All: 'mdi-silverware-variant',
  Burgers: 'mdi-hamburger',
  Chicken: 'mdi-food-drumstick',
  Sides: 'mdi-french-fries',
  Drinks: 'mdi-cup',
  Desserts: 'mdi-ice-cream',
}

const filterChips = ['Under 500 Cal', 'Spicy 🌶️', 'Vegetarian 🌱', 'Gluten-Free']
const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Calories: Low to High']
</script>

<template>
  <v-container fluid class="pa-4">
    <!-- Category Tabs -->
    <v-tabs v-model="menuStore.activeCategory" color="primary" class="mb-4" show-arrows>
      <v-tab
        v-for="cat in menuStore.categories"
        :key="cat"
        :value="cat"
        :prepend-icon="categoryIcons[cat]"
      >
        {{ cat }}
      </v-tab>
    </v-tabs>

    <!-- Search & Filter Bar -->
    <v-row class="mb-4" align="center">
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="menuStore.searchQuery"
          label="Search the menu..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          hide-details
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="5">
        <v-chip-group v-model="menuStore.dietaryFilters" multiple filter>
          <v-chip
            v-for="chip in filterChips"
            :key="chip"
            :value="chip"
            variant="outlined"
            filter
          >
            {{ chip }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          v-model="menuStore.sortBy"
          :items="sortOptions"
          label="Sort By"
          variant="outlined"
          density="compact"
          hide-details
        ></v-select>
      </v-col>
    </v-row>

    <!-- Menu Grid -->
    <v-row>
      <v-col
        v-for="item in menuStore.filteredItems"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <MenuItemCard :item="item" />
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-card v-if="menuStore.filteredItems.length === 0" class="pa-8 text-center" variant="flat">
      <v-icon size="60" color="grey-lighten-1">mdi-food-off</v-icon>
      <p class="text-body-1 text-grey mt-4">No items match your filters. Try adjusting your search.</p>
    </v-card>
  </v-container>
</template>
