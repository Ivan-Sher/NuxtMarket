import { ref } from 'vue'
import { defineStore } from 'pinia'
import { $fetch } from 'ofetch'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const username = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Проверка сессии при загрузке страницы (через куку)
  async function checkAuth() {
    try {
      const data = await $fetch<{ username: string }>('/api/auth/me')
      isAuthenticated.value = true
      username.value = data.username
    } catch {
      isAuthenticated.value = false
      username.value = null
    }
  }

  // Вход / Авто-регистрация
  async function login(user: string, pass: string) {
    isLoading.value = true
    error.value = null
    try {
      const data = await $fetch<{ success: boolean; username: string }>('/api/auth/login', {
        method: 'POST',
        body: { username: user, password: pass },
      })
      isAuthenticated.value = true
      username.value = data.username
      return true
    } catch (err: unknown) {
      error.value = (err as { data?: { message?: string } })?.data?.message || 'Ошибка входа'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Выход
  async function logout() {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      isAuthenticated.value = false
      username.value = null
    }
  }

  // Запуск проверки только на клиенте
  if (import.meta.client) {
    checkAuth()
  }

  return {
    isAuthenticated,
    username,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
  }
})
