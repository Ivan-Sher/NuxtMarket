import { ref } from 'vue'
import { navigateTo } from '#app'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

export function useLoginForm() {
  const authStore = useAuthStore()
  const { showToast } = useToast()

  const username = ref('')
  const password = ref('')
  const usernameError = ref('')
  const passwordError = ref('')

  function validate(): boolean {
    let isValid = true

    if (!username.value.trim()) {
      showToast('Неверные данные пользователя', 'error')
      isValid = false
    } else {
      usernameError.value = ''
    }

    if (!password.value.trim()) {
      showToast('Неверные данные пользователя', 'error')
      isValid = false
    } else {
      passwordError.value = ''
    }

    return isValid
  }

  async function submit() {
    authStore.error = null
    if (!validate()) return

    await authStore.login(username.value, password.value)
    if (authStore.error) {
      showToast(authStore.error, 'error')
    } else {
      showToast('Login successful', 'success')
      await navigateTo('/')
    }
  }

  return {
    authStore,
    username,
    password,
    usernameError,
    passwordError,
    submit,
  }
}
