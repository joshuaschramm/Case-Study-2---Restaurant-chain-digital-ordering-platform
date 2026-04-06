<script setup>
import { useMemberStore } from '../stores/memberStore'
import { useRewardsStore } from '../stores/rewardsStore'
import PointsActivityChart from '../components/charts/PointsActivityChart.vue'

const memberStore = useMemberStore()
const rewardsStore = useRewardsStore()
</script>

<template>
  <v-container fluid class="pa-4">
    <!-- Rewards Hero Card -->
    <v-card
      class="mb-6 pa-6"
      rounded="xl"
      style="background: linear-gradient(135deg, #111111, #333333)"
      theme="dark"
    >
      <h1 class="text-h4 font-weight-bold mb-2">🔥 FireGrill Rewards</h1>
      <div class="d-flex align-center mb-3">
        <span class="text-body-1 mr-2">Current Tier:</span>
        <v-chip color="warning" prepend-icon="mdi-medal" variant="flat">
          {{ memberStore.member.tier }} Member
        </v-chip>
      </div>
      <div class="text-h3 font-weight-bold mb-3">{{ memberStore.member.points.toLocaleString() }} points</div>
      <v-progress-linear
        :model-value="memberStore.tierProgressPercentage"
        color="accent"
        height="12"
        rounded
        class="mb-2"
      ></v-progress-linear>
      <div class="text-body-2">{{ memberStore.member.pointsToNextTier }} points to Platinum</div>
      <div class="text-body-2 mt-2">Member since: March 2024</div>
    </v-card>

    <!-- Points Activity Chart -->
    <v-card class="mb-6 pa-4" variant="flat" rounded="lg">
      <h2 class="text-h6 font-weight-bold mb-4">Points Earned Over Time</h2>
      <PointsActivityChart :monthly-points="rewardsStore.monthlyPoints" />
    </v-card>

    <!-- Tier Benefits Comparison -->
    <h2 class="text-h5 font-weight-bold mb-4">Tier Benefits</h2>
    <v-row class="mb-6">
      <v-col cols="12" md="4">
        <v-card class="pa-4 h-100" variant="flat" rounded="lg">
          <div class="text-center mb-3">
            <v-icon size="48" color="grey">mdi-medal-outline</v-icon>
            <h3 class="text-h6 mt-2">Silver</h3>
          </div>
          <v-list density="compact">
            <v-list-item prepend-icon="mdi-check" class="text-body-2">Free drink on birthday</v-list-item>
            <v-list-item prepend-icon="mdi-check" class="text-body-2">1x points multiplier</v-list-item>
            <v-list-item prepend-icon="mdi-check" class="text-body-2">Access to member-only deals</v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4 h-100" rounded="lg" border="md" style="border-color: #111111 !important" variant="flat">
          <div class="text-center mb-3">
            <v-icon size="48" color="warning">mdi-medal</v-icon>
            <h3 class="text-h6 mt-2">Gold</h3>
            <v-chip size="x-small" color="warning" class="mt-1">Current Tier</v-chip>
          </div>
          <v-list density="compact">
            <v-list-item prepend-icon="mdi-check" class="text-body-2">All Silver benefits</v-list-item>
            <v-list-item prepend-icon="mdi-check" class="text-body-2">1.5x points multiplier</v-list-item>
            <v-list-item prepend-icon="mdi-check" class="text-body-2">Free side with every 5th order</v-list-item>
            <v-list-item prepend-icon="mdi-check" class="text-body-2">Early access to new menu items</v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4 h-100" variant="flat" rounded="lg">
          <div class="text-center mb-3">
            <v-icon size="48" color="primary">mdi-trophy</v-icon>
            <h3 class="text-h6 mt-2">Platinum</h3>
          </div>
          <v-list density="compact">
            <v-list-item prepend-icon="mdi-check" class="text-body-2">All Gold benefits</v-list-item>
            <v-list-item prepend-icon="mdi-check" class="text-body-2">2x points multiplier</v-list-item>
            <v-list-item prepend-icon="mdi-check" class="text-body-2">Free entrée every month</v-list-item>
            <v-list-item prepend-icon="mdi-check" class="text-body-2">Priority pickup lane</v-list-item>
            <v-list-item prepend-icon="mdi-check" class="text-body-2">Exclusive seasonal tastings</v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Available Rewards -->
    <h2 class="text-h5 font-weight-bold mb-4">Redeem Your Points</h2>
    <v-row class="mb-6">
      <v-col
        v-for="reward in rewardsStore.redeemableRewards"
        :key="reward.name"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card class="pa-4 text-center h-100 d-flex flex-column" variant="flat" rounded="lg">
          <v-icon size="40" color="primary" class="mb-2">{{ reward.icon }}</v-icon>
          <div class="text-subtitle-2 font-weight-bold mb-1">{{ reward.name }}</div>
          <div class="text-caption text-grey mb-2">{{ reward.pointsCost }} pts</div>
          <div class="text-caption text-grey mb-3">{{ reward.description }}</div>
          <div class="mt-auto">
            <v-btn
              v-if="reward.canRedeem"
              color="primary"
              size="small"
              block
            >
              Redeem
            </v-btn>
            <v-btn
              v-else
              disabled
              size="small"
              block
            >
              Need {{ reward.pointsCost - memberStore.member.points }} more pts
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Points Activity -->
    <v-card class="mb-6 pa-4" variant="flat" rounded="lg">
      <h2 class="text-h6 font-weight-bold mb-4">Recent Points Activity</h2>
      <v-timeline side="end" density="compact">
        <v-timeline-item
          v-for="entry in rewardsStore.pointsHistory"
          :key="entry.date + entry.description"
          :dot-color="entry.type === 'earned' ? 'success' : 'error'"
          size="small"
        >
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-body-2 font-weight-medium">{{ entry.description }}</div>
              <div class="text-caption text-grey">{{ entry.date }}</div>
            </div>
            <v-chip
              :color="entry.type === 'earned' ? 'success' : 'error'"
              size="small"
              variant="flat"
              :prepend-icon="entry.type === 'earned' ? 'mdi-plus' : 'mdi-minus'"
            >
              {{ Math.abs(entry.points) }} pts
            </v-chip>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card>
  </v-container>
</template>
