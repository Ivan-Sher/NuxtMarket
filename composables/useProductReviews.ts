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
  const form = ref({
    name: '',
    email: '',
    rating: 0,
    text: '',
  })
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

  function validateForm() {
    const err: Record<string, string> = {}
    if (!form.value.name.trim()) err.name = 'Name is required'
    if (!form.value.email.trim()) err.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) err.email = 'Invalid email'
    if (!form.value.rating) err.rating = 'Please select a rating'
    if (!form.value.text.trim()) err.text = 'Review text is required'
    errors.value = err
    return Object.keys(err).length === 0
  }

  function submitReview() {
    if (!validateForm()) return false
    const newReview: Review = {
      name: form.value.name.trim(),
      email: form.value.email.trim(),
      rating: form.value.rating,
      text: form.value.text.trim(),
      date: new Date().toLocaleDateString(),
    }
    reviews.value.push(newReview)
    saveReviews()
    successMessage.value = 'Review submitted successfully!'
    form.value = { name: '', email: '', rating: 0, text: '' }
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
    form,
    errors,
    successMessage,
    reviewCount,
    averageRating,
    submitReview,
  }
}
