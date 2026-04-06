import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import rewardsData from '../data/rewards.json'
import { useMemberStore } from './memberStore'

export const useRewardsStore = defineStore('rewards', () => {
  const rewards = ref(rewardsData.redeemableRewards)
  const monthlyPoints = ref(rewardsData.monthlyPoints)
  const pointsHistory = ref(rewardsData.pointsHistory)

  const redeemableRewards = computed(() => {
    const memberStore = useMemberStore()
    return rewards.value.map(reward => ({
      ...reward,
      canRedeem: memberStore.canRedeem(reward.pointsCost),
    }))
  })

  return { rewards, monthlyPoints, pointsHistory, redeemableRewards }
})
