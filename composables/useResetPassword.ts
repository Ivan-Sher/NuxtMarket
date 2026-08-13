import { ref } from 'vue'
import { useToast } from '@/composables/useToast'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useResetPassword() {
  const { showToast } = useToast()

  const email = ref('')
  const emailError = ref('')

  function validate(): boolean {
    if (!email.value.trim()) {
      showToast('Неверный email', 'error')
      return false
    }

    if (!EMAIL_REGEX.test(email.value.trim())) {
      showToast('Неверный email', 'error')
      return false
    }

    emailError.value = ''
    return true
  }

  function submit() {
    if (!validate()) return

    showToast('Отправили пароль на email', 'success')
    email.value = ''
    emailError.value = ''
  }

  return {
    email,
    emailError,
    submit,
  }
}
