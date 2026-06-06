<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import { computed, watch, reactive } from 'vue'
  import type { Product } from '~/types/api'
  import { useGetProductsByCategory } from '~/composables/api/products/useGetProductsByCategory'
  import { useGetCategories } from '~/composables/api/categories/useGetCategories'
  import { useDebouncedRef } from '~/composables/useDebouncedRef'
  import type { FiltersType } from '~/types/filters'
  import { FILTERS_DEFAULTS } from '~/types/filters'
  import { useToast } from '~/composables/useToast'
  import { navigateTo } from '#app'

  const route = useRoute()
  const router = useRouter()

  const { showToast } = useToast()
  const PER_PAGE = 6

  const filters = reactive<FiltersType>({
    ...FILTERS_DEFAULTS,
  })

  const query = route.query

  filters.searchQuery =
    (Array.isArray(query.searchQuery) ? query.searchQuery[0] : query.searchQuery) ||
    FILTERS_DEFAULTS.searchQuery
  filters.category =
    (Array.isArray(query.category) ? query.category[0] : query.category) ||
    FILTERS_DEFAULTS.category

  const sortByRow = (Array.isArray(query.sortBy) ? query.sortBy[0] : query.sortBy) ?? ''
  filters.sortBy = (['price_asc', 'price_desc', 'name', ''] as const).includes(
    sortByRow as typeof filters.sortBy,
  )
    ? (sortByRow as typeof filters.sortBy)
    : FILTERS_DEFAULTS.sortBy

  filters.priceMin =
    Number((Array.isArray(query.priceMin) ? query.priceMin[0] : query.priceMin) ?? 0) ||
    FILTERS_DEFAULTS.priceMin
  filters.priceMax =
    Number((Array.isArray(query.priceMax) ? query.priceMax[0] : query.priceMax) ?? 0) ||
    FILTERS_DEFAULTS.priceMax

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
    {
      deep: true,
    },
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

  const filtredProducts = computed(() => {
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
    return filtredProducts.value?.slice(start, start + PER_PAGE) ?? []
  })

  const totalPages = computed(() => {
    return Math.ceil((filtredProducts.value?.length ?? 0) / PER_PAGE)
  })

  function setPage(page: number) {
    router.push({ query: { page } })
  }

  function handleAddToCart() {
    showToast(`The item was added to your Shopping bag.`)
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
    <div>
      <ProductFilters
        :modelValue="filters"
        :categories="categories ?? []"
        @update:modelValue="Object.assign(filters, $event)"
      />
    </div>
    <div>
      <!-- Загрузка -->
      <div v-if="status === 'pending'" class="skeletons">
        <div v-for="n in 6" :key="n" class="skeleton" />
      </div>

      <!-- Ошибка -->
      <div v-else-if="status === 'error'" class="error">Не удалось загрузить товары</div>

      <!-- Товары -->
      <template v-else>
        <ProductList
          :products="paginatedProducts"
          @add-to-cart="handleAddToCart"
          @click-card="handleCardClick"
        />
        <AppPagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @change="(page) => setPage(page)"
        />
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
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
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

  .wrapper {
    display: flex;
    justify-content: center;
  }

  .products {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    width: 500px;
  }

  .page-title {
    box-sizing: border-box;
    max-width: 1248px;
    margin: 0 auto;

    @media (width <= 1280px) {
      padding: 0 16px;
    }
  }

  .page-title h4 {
    @include text(h4);

    font-weight: 500;

    @media (max-width: $bp-sm) {
      font-size: 20px;
    }
  }

  .page-content {
    box-sizing: border-box;
    display: flex;
    gap: 30px;
    justify-content: center;
    padding: 0 16px;

    @media (max-width: $bp-sm) {
      display: block;
      gap: 0;
    }
  }
</style>
