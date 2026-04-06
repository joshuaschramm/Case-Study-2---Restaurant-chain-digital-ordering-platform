<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import storesData from '../data/stores.json'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

const searchQuery = ref('')
const filterServices = ref([])
const selectedStore = ref(storesData[0])
const mapContainer = ref(null)
let map = null
const markers = []

const serviceChips = ['Open Now', 'Drive-Through', 'Dine-In', 'Mobile Pickup']

const filteredStores = computed(() => {
  let result = [...storesData]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.zip.includes(q)
    )
  }

  if (filterServices.value.length > 0) {
    result = result.filter(store => {
      return filterServices.value.every(filter => {
        if (filter === 'Open Now') return store.isOpen
        return store.services.includes(filter)
      })
    })
  }

  return result
})

function selectStore(store) {
  selectedStore.value = store
  if (map) {
    map.flyTo({ center: [store.lng, store.lat], zoom: 14, duration: 800 })
  }
}

function updateMarkers() {
  markers.forEach(m => m.remove())
  markers.length = 0

  filteredStores.value.forEach(store => {
    const el = document.createElement('div')
    el.className = 'store-marker'
    el.innerHTML = `<svg width="32" height="40" viewBox="0 0 32 40" fill="none"><path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 24 16 24s16-12 16-24C32 7.16 24.84 0 16 0z" fill="${selectedStore.value?.id === store.id ? '#cc0505' : '#111111'}"/><circle cx="16" cy="16" r="8" fill="white"/><text x="16" y="20" text-anchor="middle" font-size="11" font-weight="bold" fill="${selectedStore.value?.id === store.id ? '#cc0505' : '#111111'}">${store.id}</text></svg>`
    el.style.cursor = 'pointer'
    el.addEventListener('click', () => selectStore(store))

    const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat([store.lng, store.lat])
      .addTo(map)

    markers.push(marker)
  })
}

onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-89.6501, 39.7817],
    zoom: 11.5,
  })

  map.addControl(new mapboxgl.NavigationControl(), 'top-right')

  map.on('load', () => {
    updateMarkers()
  })
})

watch([filteredStores, selectedStore], () => {
  if (map && map.loaded()) {
    updateMarkers()
  }
})
</script>

<template>
  <v-container fluid class="pa-4">
    <h1 class="text-h4 font-weight-bold mb-6">Store Locator</h1>

    <!-- Search Bar -->
    <v-card class="mb-6 pa-4" variant="flat" rounded="lg">
      <v-row align="center">
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="searchQuery"
            label="Enter zip code or city"
            prepend-inner-icon="mdi-map-search"
            variant="outlined"
            density="compact"
            hide-details
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-chip-group v-model="filterServices" multiple filter>
            <v-chip
              v-for="chip in serviceChips"
              :key="chip"
              :value="chip"
              variant="outlined"
              filter
            >
              {{ chip }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn color="primary" prepend-icon="mdi-magnify" block>
            Find Stores
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Store Results -->
    <v-row>
      <!-- Store List -->
      <v-col cols="12" md="5">
        <v-card variant="flat" rounded="lg" style="max-height: 600px; overflow-y: auto">
          <v-list>
            <v-list-item
              v-for="store in filteredStores"
              :key="store.id"
              :active="selectedStore?.id === store.id"
              color="primary"
              @click="selectStore(store)"
              class="py-3"
            >
              <div>
                <div class="text-subtitle-1 font-weight-bold mb-1">{{ store.name }}</div>
                <div class="d-flex align-center text-body-2 text-grey mb-1">
                  <v-icon size="16" class="mr-1">mdi-map-marker</v-icon>
                  {{ store.address }}, {{ store.city }} {{ store.zip }}
                </div>
                <div class="d-flex align-center text-body-2 text-grey mb-1">
                  <v-icon size="16" class="mr-1">mdi-walk</v-icon>
                  {{ store.distance }}
                  <v-icon size="16" class="ml-3 mr-1">mdi-clock-outline</v-icon>
                  {{ store.hours }}
                </div>
                <div class="mb-2">
                  <v-chip
                    v-for="service in store.services"
                    :key="service"
                    size="x-small"
                    class="mr-1"
                    variant="tonal"
                  >
                    {{ service }}
                  </v-chip>
                  <v-chip
                    :color="store.isOpen ? 'success' : 'error'"
                    size="x-small"
                    variant="flat"
                  >
                    {{ store.isOpen ? 'Open Now' : 'Closed' }}
                  </v-chip>
                </div>
                <div class="d-flex ga-2">
                  <v-btn variant="outlined" color="primary" size="small" to="/menu">
                    Order from Here
                  </v-btn>
                  <v-btn variant="text" color="info" size="small" prepend-icon="mdi-directions">
                    Get Directions
                  </v-btn>
                </div>
              </div>
            </v-list-item>
          </v-list>

          <div v-if="filteredStores.length === 0" class="pa-8 text-center">
            <v-icon size="48" color="grey-lighten-1">mdi-map-marker-off</v-icon>
            <p class="text-body-2 text-grey mt-2">No stores match your search.</p>
          </div>
        </v-card>
      </v-col>

      <!-- Map -->
      <v-col cols="12" md="7">
        <v-card variant="flat" rounded="lg" class="position-relative" style="overflow: hidden">
          <div ref="mapContainer" style="width: 100%; height: 500px"></div>

          <!-- Selected Store Overlay -->
          <v-card
            v-if="selectedStore"
            class="position-absolute pa-4"
            style="bottom: 16px; left: 16px; right: 16px; z-index: 1"
            variant="flat"
            rounded="lg"
          >
            <div class="text-subtitle-1 font-weight-bold">{{ selectedStore.name }}</div>
            <div class="text-body-2 text-grey">{{ selectedStore.address }}, {{ selectedStore.city }} {{ selectedStore.zip }}</div>
            <div class="text-body-2 text-grey">📞 {{ selectedStore.phone }}</div>
            <div class="text-body-2 text-grey mb-2">🕐 {{ selectedStore.hours }}</div>
            <v-btn color="primary" to="/menu">Start Order</v-btn>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.store-marker {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
