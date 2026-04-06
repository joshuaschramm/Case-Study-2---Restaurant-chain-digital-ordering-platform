<script setup>
import { Line } from 'vue-chartjs'
import { computed } from 'vue'

const props = defineProps({
  monthlyPoints: Array,
})

const chartData = computed(() => ({
  labels: [
    "May '25", "Jun '25", "Jul '25", "Aug '25", "Sep '25", "Oct '25",
    "Nov '25", "Dec '25", "Jan '26", "Feb '26", "Mar '26", "Apr '26",
  ],
  datasets: [
    {
      label: 'Points Earned',
      data: props.monthlyPoints,
      borderColor: '#111111',
      backgroundColor: 'rgba(17, 17, 17, 0.08)',
      fill: true,
      tension: 0.3,
      pointBackgroundColor: '#111111',
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { beginAtZero: true },
  },
}
</script>

<template>
  <div style="height: 280px">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
