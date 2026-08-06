import { ref, computed } from 'vue'
import { defineStore, skipHydrate } from 'pinia'
import { useToast } from '~/composables/useToast'
import { useAuthApi } from '~/composables/api/useAuthApi'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(null)

  if (import.meta.client) {
    const savedToken = localStorage.getItem('auth_token')
    if (savedToken) {
      token.value = savedToken
    }
  }

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const user = computed(() => ({ token: token.value }))
  const isAuthenticated = computed(() => !!token.value)

  // Actions
  async function login(username: string, password: string) {
    isLoading.value = true
    error.value = null

    try {
      const { login: apiLogin } = useAuthApi()
      const data = await apiLogin({ username, password })
      token.value = data.token
      if (import.meta.client) {
        localStorage.setItem('auth_token', data.token)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      error.value = message
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    token.value = null
    if (import.meta.client) {
      localStorage.removeItem('auth_token')
    }
    const { showToast } = useToast()
    showToast('Logged out', 'success')
  }

  return {
    user,
    token: skipHydrate(token),
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
  }
})
