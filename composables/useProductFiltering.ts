import { computed } from 'vue'
import type { Ref } from 'vue'
import type { Product } from '~/types/api'
import { SortBy } from '~/types/filters'
import type { FiltersType } from '~/types/filters'
import { useDebouncedRef } from '~/composables/useDebouncedRef'

const SEARCH_DEBOUNCE_MS = 400
const PRICE_DEBOUNCE_MS = 300
const PER_PAGE = 6

export const useProductFiltering = (
  products: Ref<Product[] | undefined>,
  filters: FiltersType,
  currentPage: Ref<number>,
) => {
  const debouncedSearch = useDebouncedRef(
    computed(() => filters.searchQuery),
    SEARCH_DEBOUNCE_MS,
  )
  const debouncedPriceMin = useDebouncedRef(
    computed(() => filters.priceMin),
    PRICE_DEBOUNCE_MS,
  )
  const debouncedPriceMax = useDebouncedRef(
    computed(() => filters.priceMax),
    PRICE_DEBOUNCE_MS,
  )

  const filteredProducts = computed(() => {
    const list = products.value?.slice() ?? []
    const search = debouncedSearch.value.toLowerCase().trim()
    const priceMin = debouncedPriceMin.value
    const priceMax = debouncedPriceMax.value

    const result = list.filter((product: Product) => {
      if (search) {
        const inName = product.title.toLowerCase().includes(search)
        const inDescription = product.description?.toLowerCase().includes(search) ?? false
        if (!inName && !inDescription) return false
      }

      if (priceMin > 0 && product.price < priceMin) return false
      if (priceMax > 0 && product.price > priceMax) return false

      return true
    })

    if (filters.sortBy === SortBy.PriceAsc) {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === SortBy.PriceDesc) {
      result.sort((a, b) => b.price - a.price)
    } else if (filters.sortBy === SortBy.Name) {
      result.sort((a, b) => a.title.localeCompare(b.title))
    }

    return result
  })

  const totalPages = computed(() => Math.ceil(filteredProducts.value.length / PER_PAGE))

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * PER_PAGE
    return filteredProducts.value.slice(start, start + PER_PAGE)
  })

  return { filteredProducts, paginatedProducts, totalPages }
}
