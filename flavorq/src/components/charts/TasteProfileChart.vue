<script setup>
import { Radar } from 'vue-chartjs'
import { computed } from 'vue'

const props = defineProps({
  memberData: { type: Array, default: () => [85, 60, 70, 75, 40, 90] },
  averageData: { type: Array, default: () => [70, 70, 50, 65, 55, 60] },
})

const chartData = computed(() => ({
  labels: ['Savory', 'Sweet', 'Spicy', 'Salty', 'Sour', 'Umami'],
  datasets: [
    {
      label: 'Your Taste',
      data: props.memberData,
      borderColor: '#111111',
      backgroundColor: 'rgba(17, 17, 17, 0.12)',
      pointBackgroundColor: '#111111',
    },
    {
      label: 'Average Member',
      data: props.averageData,
      borderColor: '#9E9E9E',
      backgroundColor: 'rgba(158, 158, 158, 0.15)',
      pointBackgroundColor: '#9E9E9E',
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: { stepSize: 20 },
    },
  },
}
</script>

<template>
  <div style="height: 320px">
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>
