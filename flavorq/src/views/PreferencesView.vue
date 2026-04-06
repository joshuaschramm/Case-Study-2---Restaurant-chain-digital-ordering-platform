<script setup>
import { ref } from 'vue'
import { useMemberStore } from '../stores/memberStore'
import TasteProfileChart from '../components/charts/TasteProfileChart.vue'
import menuData from '../data/menu.json'
import storesData from '../data/stores.json'

const memberStore = useMemberStore()

// Dietary preferences
const dietaryOptions = [
  'No Restrictions', 'Vegetarian', 'Vegan', 'Gluten-Free',
  'Dairy-Free', 'Nut-Free', 'Low Carb', 'Keto', 'Halal',
]
const dietaryPrefs = ref([...memberStore.member.dietaryPreferences])

// Spice preference
const spiceLevel = ref(memberStore.member.spiceLevel)
const spiceLabels = ['None', 'Mild', 'Medium', 'Hot 🌶️', 'Extra Hot 🔥🔥']

// Favorites
const favoriteItems = ref(
  memberStore.member.favoriteItemIds
    .map(id => menuData.find(item => item.id === id))
    .filter(Boolean)
)

function removeFavorite(itemId) {
  favoriteItems.value = favoriteItems.value.filter(i => i.id !== itemId)
}

// Order preferences
const defaultOrderType = ref(memberStore.member.defaultOrderType)
const defaultStore = ref(memberStore.member.defaultStore)
const orderTypeOptions = ['Pickup', 'Drive-Through', 'Dine-In']
const storeNames = storesData.map(s => s.name)

const notifications = ref(true)
const personalized = ref(true)
const shareHistory = ref(true)

// Save & snackbar
const snackbar = ref(false)

function savePreferences() {
  memberStore.updatePreferences({
    dietaryPreferences: dietaryPrefs.value,
    spiceLevel: spiceLevel.value,
    favoriteItemIds: favoriteItems.value.map(i => i.id),
    defaultOrderType: defaultOrderType.value,
    defaultStore: defaultStore.value,
  })
  snackbar.value = true
}
</script>

<template>
  <v-container fluid class="pa-4">
    <h1 class="text-h4 font-weight-bold mb-1">My Preferences</h1>
    <p class="text-body-1 text-grey mb-6">Help us personalize your experience</p>

    <!-- Dietary Preferences -->
    <v-card class="mb-6 pa-4" variant="flat" rounded="lg">
      <div class="d-flex align-center mb-3">
        <v-icon class="mr-2" color="primary">mdi-leaf</v-icon>
        <h2 class="text-h6 font-weight-bold">Dietary Preferences</h2>
      </div>
      <v-chip-group v-model="dietaryPrefs" multiple>
        <v-chip
          v-for="opt in dietaryOptions"
          :key="opt"
          :value="opt"
          filter
          variant="outlined"
          color="accent"
        >
          {{ opt }}
        </v-chip>
      </v-chip-group>
    </v-card>

    <!-- Spice Level -->
    <v-card class="mb-6 pa-4" variant="flat" rounded="lg">
      <div class="d-flex align-center mb-3">
        <v-icon class="mr-2" color="primary">mdi-fire</v-icon>
        <h2 class="text-h6 font-weight-bold">Spice Level</h2>
      </div>
      <v-slider
        v-model="spiceLevel"
        :min="0"
        :max="4"
        :step="1"
        :ticks="spiceLabels"
        show-ticks="always"
        tick-size="4"
        color="primary"
        class="px-4"
      >
        <template #append>
          <span class="text-body-2 font-weight-bold">{{ spiceLabels[spiceLevel] }}</span>
        </template>
      </v-slider>
    </v-card>

    <!-- Favorites -->
    <v-card class="mb-6 pa-4" variant="flat" rounded="lg">
      <div class="d-flex align-center mb-3">
        <v-icon class="mr-2" color="primary">mdi-heart</v-icon>
        <h2 class="text-h6 font-weight-bold">Your Favorites</h2>
      </div>
      <v-list>
        <v-list-item v-for="item in favoriteItems" :key="item.id">
          <template #prepend>
            <v-avatar size="40" rounded="lg" class="mr-3">
              <v-img :src="item.image" :alt="item.name" cover></v-img>
            </v-avatar>
          </template>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>
            <v-chip size="x-small" class="mr-1">{{ item.category }}</v-chip>
          </v-list-item-subtitle>
          <template #append>
            <v-btn icon variant="text" color="error" @click="removeFavorite(item.id)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
      <v-btn variant="text" color="primary" to="/menu" class="mt-2">
        Browse Menu to Add More
      </v-btn>
    </v-card>

    <!-- Order Preferences -->
    <v-card class="mb-6 pa-4" variant="flat" rounded="lg">
      <div class="d-flex align-center mb-3">
        <v-icon class="mr-2" color="primary">mdi-cog</v-icon>
        <h2 class="text-h6 font-weight-bold">Order Defaults</h2>
      </div>
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
            v-model="defaultOrderType"
            :items="orderTypeOptions"
            label="Default Order Type"
            variant="outlined"
            density="compact"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="defaultStore"
            :items="storeNames"
            label="Default Store"
            variant="outlined"
            density="compact"
          ></v-select>
        </v-col>
      </v-row>
      <v-switch
        v-model="notifications"
        label="Send me order status notifications"
        color="primary"
        hide-details
        density="compact"
      ></v-switch>
      <v-switch
        v-model="personalized"
        label="Enable personalized recommendations"
        color="primary"
        hide-details
        density="compact"
      ></v-switch>
      <v-switch
        v-model="shareHistory"
        label="Share order history for better suggestions"
        color="primary"
        hide-details
        density="compact"
      ></v-switch>
    </v-card>

    <!-- Taste Profile Chart -->
    <v-card class="mb-6 pa-4" variant="flat" rounded="lg">
      <div class="d-flex align-center mb-3">
        <v-icon class="mr-2" color="primary">mdi-chart-radar-variant</v-icon>
        <h2 class="text-h6 font-weight-bold">Your Taste Profile</h2>
      </div>
      <TasteProfileChart />
    </v-card>

    <!-- Save Button -->
    <v-btn
      block
      color="primary"
      size="large"
      prepend-icon="mdi-content-save"
      @click="savePreferences"
    >
      Save Preferences
    </v-btn>

    <v-snackbar v-model="snackbar" color="success" :timeout="3000">
      Preferences saved! Your experience will be updated.
    </v-snackbar>
  </v-container>
</template>
