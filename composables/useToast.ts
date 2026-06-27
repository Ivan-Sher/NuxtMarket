import { ref } from 'vue'

const isVisible = ref(false)
const message = ref('')
const type = ref<'success' | 'error'>('success')

const showToast = (text: string, toastType: 'success' | 'error' = 'success') => {
  message.value = text
  type.value = toastType
  isVisible.value = true

  setTimeout(() => {
    isVisible.value = false
  }, 3000)
}

const hideToast = () => {
  isVisible.value = false
}

export const useToast = () => ({ isVisible, message, type, showToast, hideToast })
