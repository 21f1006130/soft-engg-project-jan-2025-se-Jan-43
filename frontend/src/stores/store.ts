import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth-store', () => {
  const isAuthenticated = ref(false)
  const accessToken = ref('')

  return { isAuthenticated, accessToken }
})
