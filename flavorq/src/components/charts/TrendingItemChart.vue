<script setup>
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'

const props = defineProps({
  itemName: String,
  hourlyOrders: Array,
})

const chartData = computed(() => ({
  labels: ['10am', '11am', '12pm', '1pm', '2pm', '3pm'],
  datasets: [
    {
      label: 'Orders',
      backgroundColor: '#111111',
      data: props.hourlyOrders,
      borderRadius: 4,
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
    y: {
      beginAtZero: true,
      ticks: { stepSize: 10 },
    },
  },
}
</script>

<template>
  <div style="height: 120px">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
