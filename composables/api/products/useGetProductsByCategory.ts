import type { Ref } from 'vue'
import { computed } from 'vue'
import type { Product } from '~/types/api'
import { useApiFetch } from '~/composables/api/useApiFetch'

export const useGetProductsByCategory = (category: Ref<string>) => {
  return useApiFetch<Product[]>('/products', {
    params: computed(() => (category.value ? { category: category.value } : {})),
  })
}
