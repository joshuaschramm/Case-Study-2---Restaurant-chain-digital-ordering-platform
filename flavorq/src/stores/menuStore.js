import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import menuData from '../data/menu.json'

export const useMenuStore = defineStore('menu', () => {
  const menuItems = ref([...menuData])
  const searchQuery = ref('')
  const activeCategory = ref('All')
  const dietaryFilters = ref([])
  const sortBy = ref('Recommended')

  const categories = computed(() => {
    const cats = [...new Set(menuItems.value.map(item => item.category))]
    return ['All', ...cats]
  })

  const filteredItems = computed(() => {
    let result = [...menuItems.value]

    // Filter by category
    if (activeCategory.value !== 'All') {
      result = result.filter(item => item.category === activeCategory.value)
    }

    // Filter by search query
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(item =>
        item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      )
    }

    // Filter by dietary filters
    if (dietaryFilters.value.length > 0) {
      result = result.filter(item => {
        return dietaryFilters.value.every(filter => {
          if (filter === 'Under 500 Cal') return item.calories < 500
          if (filter === 'Spicy 🌶️') return item.tags.includes('Spicy')
          if (filter === 'Vegetarian 🌱') return item.tags.includes('Vegetarian')
          if (filter === 'Gluten-Free') return item.tags.includes('Gluten-Free')
          return true
        })
      })
    }

    // Sort
    if (sortBy.value === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy.value === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy.value === 'Calories: Low to High') {
      result.sort((a, b) => a.calories - b.calories)
    }

    return result
  })

  return { menuItems, searchQuery, activeCategory, dietaryFilters, sortBy, categories, filteredItems }
})
