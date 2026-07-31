import { ref, computed, onMounted } from 'vue'

export interface Review {
  name: string
  email: string
  rating: number
  text: string
  date: string
}

export function useProductReviews(productId: string | number) {
  const STORAGE_KEY = `product-reviews-${productId}`

  const reviews = ref<Review[]>([])
  const errors = ref<Record<string, string>>({})
  const successMessage = ref('')

  function loadReviews() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        reviews.value = JSON.parse(stored)
      } else {
        reviews.value = []
      }
    } catch {
      reviews.value = []
    }
  }

  function saveReviews() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews.value))
  }

  const reviewCount = computed(() => reviews.value.length)

  const averageRating = computed(() => {
    if (reviews.value.length === 0) return 0
    const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0)
    return Math.round((sum / reviews.value.length) * 10) / 10
  })

  function validateForm(data: { name: string; email: string; rating: number; text: string }) {
    const err: Record<string, string> = {}
    if (!data.name.trim()) err.name = 'Name is required'
    if (!data.email.trim()) err.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) err.email = 'Invalid email'
    if (!data.rating) err.rating = 'Please select a rating'
    if (!data.text.trim()) err.text = 'Review text is required'
    errors.value = err
    return Object.keys(err).length === 0
  }

  function submitReview(formData: { name: string; email: string; rating: number; text: string }) {
    if (!validateForm(formData)) return false
    const newReview: Review = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      rating: formData.rating,
      text: formData.text.trim(),
      date: new Date().toLocaleDateString(),
    }
    reviews.value.push(newReview)
    saveReviews()
    successMessage.value = 'Review submitted successfully!'
    errors.value = {}
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    return true
  }

  onMounted(() => {
    loadReviews()
  })

  return {
    reviews,
    errors,
    successMessage,
    reviewCount,
    averageRating,
    submitReview,
  }
}
