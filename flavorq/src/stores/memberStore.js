import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import memberData from '../data/member.json'

export const useMemberStore = defineStore('member', () => {
  const member = ref({ ...memberData })

  const tierProgressPercentage = computed(() => {
    const total = member.value.points + member.value.pointsToNextTier
    return Math.round((member.value.points / total) * 100)
  })

  const initials = computed(() => {
    const parts = member.value.name.split(' ')
    return parts.map(p => p[0]).join('')
  })

  function canRedeem(pointsCost) {
    return member.value.points >= pointsCost
  }

  function updatePreferences(prefs) {
    Object.assign(member.value, prefs)
  }

  return { member, tierProgressPercentage, initials, canRedeem, updatePreferences }
})
