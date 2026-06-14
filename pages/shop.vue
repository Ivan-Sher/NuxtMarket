<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import { computed, watch, reactive } from 'vue'
  import { navigateTo } from '#app'
  import type { Product } from '~/types/api'
  import { useGetProductsByCategory } from '~/composables/api/products/useGetProductsByCategory'
  import { useGetCategories } from '~/composables/api/categories/useGetCategories'
  import { useDebouncedRef } from '~/composables/useDebouncedRef'
  import type { FiltersType } from '~/types/filters'
  import { FILTERS_DEFAULTS } from '~/types/filters'
  import { useToast } from '~/composables/useToast'
  import { useFiltersFromQuery } from '~/composables/useFiltersFromQuery'

  const route = useRoute()
  const router = useRouter()

  const { showToast } = useToast()
  const PER_PAGE = 6

  const filters = reactive<FiltersType>(useFiltersFromQuery(route.query))

  const debouncedSearch = useDebouncedRef(
    computed(() => filters.searchQuery),
    400,
  )
  const debouncedPriceMin = useDebouncedRef(
    computed(() => filters.priceMin),
    300,
  )
  const debouncedPriceMax = useDebouncedRef(
    computed(() => filters.priceMax),
    300,
  )

  watch(
    filters,
    (newFilters) => {
      const cleanQuery: Record<string, string | number | boolean> = {}
      ;(Object.keys(newFilters) as (keyof typeof newFilters)[]).forEach((key) => {
        const value = newFilters[key]
        const defaultValue = FILTERS_DEFAULTS[key]
        if (value !== defaultValue) {
          cleanQuery[key] = value
        }
      })

      router.replace({ query: { ...cleanQuery, page: 1 } })
    },
    { deep: true },
  )

  const {
    data: products,
    status,
    error,
  } = useGetProductsByCategory(computed(() => filters.category))

  const { data: categories } = useGetCategories()

  watch(error, (val) => {
    if (val) showToast(val.message, 'error')
  })

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

    if (filters.sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (filters.sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    }

    return result
  })

  const currentPage = computed(() => Number(route.query.page) || 1)

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * PER_PAGE
    return filteredProducts.value.slice(start, start + PER_PAGE)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / PER_PAGE)
  })

  function setPage(page: number) {
    router.push({ query: { ...route.query, page } })
  }

  function handleAddToCart(product: Product) {
    showToast(`The item "${product.title}" was added to your Shopping bag.`)
  }

  function handleCardClick(product: Product) {
    navigateTo('/products/' + product.id)
  }
</script>

<template>
  <div class="page-title">
    <h4>Shop The Latest</h4>
  </div>

  <div class="page-content">
    <div class="page-filters">
      <ProductFilters
        :model-value="filters"
        :categories="categories ?? []"
        @update:model-value="Object.assign(filters, $event)"
      />
    </div>

    <div>
      <div v-if="status === 'pending'" class="skeletons">
        <div v-for="n in 6" :key="n" class="skeleton" />
      </div>

      <div v-else-if="status === 'error'" class="error">Failed to load products</div>

      <template v-else>
        <ProductList
          :products="paginatedProducts"
          @add-to-cart="handleAddToCart"
          @click-card="handleCardClick"
        />
        <AppPagination :current-page="currentPage" :total-pages="totalPages" @change="setPage" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .skeletons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .skeleton {
    width: 100%;
    aspect-ratio: 1;
    background: linear-gradient(
      90deg,
      var(--light-gray) 25%,
      var(--gray) 50%,
      var(--light-gray) 75%
    );
    background-size: 200% 100%;
    border-radius: 8px;
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }

    100% {
      background-position: -200% 0;
    }
  }

  .page-title {
    box-sizing: border-box;
    max-width: 1248px;
    margin: 0 auto;

    @media (max-width: $bp-xl) {
      padding: 0 16px;
    }
  }

  .page-title h4 {
    @include text(h4);
  }

  .page-content {
    box-sizing: border-box;
    display: flex;
    gap: 30px;
    justify-content: center;
    padding: 0 16px;

    @media (max-width: $bp-sm) {
      display: block;
    }
  }
</style>
