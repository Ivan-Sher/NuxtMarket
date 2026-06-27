import { ref } from 'vue'
import { useToast } from '~/composables/useToast'

export const useEmailSubscription = () => {
  const { showToast } = useToast()

  const email = ref('')
  const emailError = ref('')

  const validateEmail = (value: string) => {
    if (!value) return 'Введите email'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Некорректный email'
    return ''
  }

  const submitEmail = () => {
    emailError.value = validateEmail(email.value)
    if (emailError.value) return
    localStorage.setItem('subscribedEmail', email.value)
    email.value = ''
    emailError.value = ''
    showToast('Почта Сохранена', 'success')
  }

  return { email, emailError, validateEmail, submitEmail }
}
