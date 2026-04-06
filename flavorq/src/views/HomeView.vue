<script setup>
import PersonalizedPicks from '../components/home/PersonalizedPicks.vue'
import QuickReorder from '../components/home/QuickReorder.vue'
import TrendingItemChart from '../components/charts/TrendingItemChart.vue'
import trendingData from '../data/trending.json'
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

    <!-- Trending Now -->
    <div class="mb-6">
      <h2 class="text-h5 font-weight-bold mb-4">Trending at Your Store 📈</h2>
      <v-row>
        <v-col v-for="item in trendingData" :key="item.name" cols="12" md="4">
          <v-card class="pa-4" variant="flat" rounded="lg">
            <div class="text-subtitle-1 font-weight-bold mb-1">{{ item.name }}</div>
            <div class="text-caption text-grey mb-3">Ordered {{ item.ordersToday }} times today</div>
            <TrendingItemChart :item-name="item.name" :hourly-orders="item.hourlyOrders" />
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Quick Reorder -->
    <div class="mb-6">
      <QuickReorder />
    </div>
  </v-container>
</template>
