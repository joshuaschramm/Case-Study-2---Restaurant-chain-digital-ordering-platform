<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useCartStore } from './stores/cartStore'
import CartDrawer from './components/cart/CartDrawer.vue'
import logoSvg from './assets/logo.svg'

const route = useRoute()
const cartStore = useCartStore()
const accountMenu = ref(false)
const { mdAndUp } = useDisplay()
const sidebarRail = ref(false)

const navItems = [
  { title: 'Home', icon: 'mdi-home', to: '/', routeName: 'Home' },
  { title: 'Menu', icon: 'mdi-food', to: '/menu', routeName: 'Menu' },
  { title: 'Orders', icon: 'mdi-receipt-text-outline', to: '/orders', routeName: 'Orders' },
  { title: 'Rewards', icon: 'mdi-star-circle-outline', to: '/rewards', routeName: 'Rewards' },
  { title: 'Stores', icon: 'mdi-map-marker-radius', to: '/stores', routeName: 'Stores' },
]

const timeOfDay = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Morning'
  if (hour < 17) return 'Afternoon'
  return 'Evening'
})

const activeTab = computed(() => {
  const idx = navItems.findIndex(i => i.routeName === route.name)
  return idx >= 0 ? idx : 0
})
</script>

<template>
  <v-app>
    <!-- Top App Bar -->
    <v-app-bar color="white" density="compact" elevation="0" class="border-b">
      <v-app-bar-title class="font-weight-bold text-body-1">
        <span class="d-flex align-center">
          <img :src="logoSvg" alt="FlavorQ" style="height: 24px" />
        </span>
      </v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn icon size="small" @click="cartStore.toggleDrawer()">
        <v-badge :content="cartStore.itemCount" :model-value="cartStore.itemCount > 0" color="black" text-color="white">
          <v-icon color="black">mdi-shopping-outline</v-icon>
        </v-badge>
      </v-btn>

      <v-menu v-model="accountMenu" :close-on-content-click="true" location="bottom end">
        <template #activator="{ props }">
          <v-btn icon size="small" class="ml-1" v-bind="props">
            <v-avatar size="30">
              <v-img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Alex R."></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-card min-width="200" rounded="lg" elevation="1">
          <v-card-text class="pa-3">
            <div class="d-flex align-center mb-3">
              <v-avatar size="40" class="mr-3">
                <v-img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Alex R."></v-img>
              </v-avatar>
              <div>
                <div class="text-subtitle-2 font-weight-bold">Alex R.</div>
                <div class="text-caption text-grey">Gold Member</div>
              </div>
            </div>
            <v-divider class="mb-2"></v-divider>
            <v-list density="compact" nav class="pa-0">
              <v-list-item to="/preferences" prepend-icon="mdi-tune-variant" title="Preferences" density="compact"></v-list-item>
              <v-list-item to="/rewards" prepend-icon="mdi-star-circle-outline" title="Rewards" density="compact"></v-list-item>
              <v-list-item prepend-icon="mdi-logout" title="Sign Out" density="compact"></v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>

    <CartDrawer />

    <!-- Desktop Sidebar Navigation -->
    <v-navigation-drawer
      v-if="mdAndUp"
      :rail="sidebarRail"
      permanent
      color="white"
      class="sidebar-nav border-r"
    >
      <v-list nav density="compact" class="mt-2">
        <v-list-item
          v-for="item in navItems"
          :key="item.routeName"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          :active="item.routeName === route.name"
          active-color="red"
          rounded="lg"
          class="mb-1"
        ></v-list-item>
      </v-list>

      <template #append>
        <div class="pa-2 d-flex justify-center">
          <v-btn
            icon
            variant="text"
            size="small"
            @click="sidebarRail = !sidebarRail"
          >
            <v-icon>{{ sidebarRail ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main :class="{ 'pb-16': !mdAndUp }">
      <router-view />
    </v-main>

    <!-- Bottom Navigation (Tablet / Mobile only) -->
    <v-bottom-navigation v-if="!mdAndUp" :model-value="activeTab" grow bg-color="white" elevation="0" class="border-t bottom-nav">
      <v-btn
        v-for="(item, index) in navItems"
        :key="item.routeName"
        :to="item.to"
        :value="index"
        size="small"
        :class="{ 'nav-active': activeTab === index }"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <span class="text-caption">{{ item.title }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<style>
/* Ensure card grids and containers don't clip shadows */
.v-container {
  overflow: visible !important;
}
.v-row {
  overflow: visible !important;
}
.v-col {
  overflow: visible !important;
}

/* Softer shadows globally via Vuetify elevation override */
.v-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 6px rgba(0, 0, 0, 0.03) !important;
  border-radius: 16px !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.v-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05) !important;
}
.v-card[class*="elevation-2"],
.v-card.elevation-2 {
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08), 0 2px 10px rgba(0, 0, 0, 0.04) !important;
}
.v-card[class*="elevation-4"],
.v-card.elevation-4 {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 14px rgba(0, 0, 0, 0.05) !important;
}
.border-t {
  border-top: 1px solid #E0E0E0 !important;
}
.border-b {
  border-bottom: 1px solid #E0E0E0 !important;
}
.border-r {
  border-right: 1px solid #E0E0E0 !important;
}
/* Sidebar navigation styles */
.sidebar-nav .v-list-item--active .v-list-item-title,
.sidebar-nav .v-list-item--active .v-icon {
  color: #cc0505 !important;
}
.sidebar-nav .v-list-item--active {
  background-color: rgba(204, 5, 5, 0.08) !important;
}
.sidebar-nav .v-list-item--active .v-list-item__overlay {
  opacity: 0 !important;
}
.sidebar-nav {
  box-shadow: none !important;
}
.bottom-nav .v-btn--active .v-icon,
.bottom-nav .v-btn--active .text-caption,
.bottom-nav .nav-active .v-icon,
.bottom-nav .nav-active .text-caption {
  color: #cc0505 !important;
}
.bottom-nav .v-btn--active,
.bottom-nav .nav-active {
  background-color: rgba(204, 5, 5, 0.1) !important;
}
.bottom-nav .v-btn--active .v-btn__overlay,
.bottom-nav .nav-active .v-btn__overlay {
  opacity: 0 !important;
}
.bottom-nav .v-btn--active::before,
.bottom-nav .nav-active::before {
  opacity: 0 !important;
}
</style>
