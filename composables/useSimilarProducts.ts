import { computed } from 'vue'
import type { Ref } from 'vue'
import { useApiFetch } from '~/composables/api/useApiFetch'
import type { Product } from '~/types/api'

export function useSimilarProducts(product: Ref<Product | undefined>) {
  const similarQuery = computed(() => ({
    category: product.value?.category ?? '',
    limit: 4,
  }))

  const { data: similarProducts, status: similarStatus } = useApiFetch<Product[]>('/products', {
    query: similarQuery,
  })

  const similarItems = computed(() =>
    (similarProducts.value ?? []).filter((p) => p.id !== product.value?.id).slice(0, 3),
  )

  return { similarItems, similarStatus }
}
