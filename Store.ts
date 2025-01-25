import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(1)
  const doubleCount = computed(() => count.value * 2)

  const loading = ref(false)
  const error: any = ref(null)
  const data = ref(null)

  function increment() {
    count.value++
  }

  async function fetchData() {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
      data.value = response.data
    } catch (err) {
      error.value = 'Failed to fetch data'
    } finally {
      loading.value = false
    }
  }

  return { count, doubleCount, increment, loading, error, data, fetchData }
})
