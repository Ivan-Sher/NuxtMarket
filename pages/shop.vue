<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import { computed, watch, reactive } from 'vue'
  import { navigateTo } from '#app'
  import type { Product } from '~/types/api'
  import { useGetProductsByCategory } from '~/composables/api/products/useGetProductsByCategory'
  import { useGetCategories } from '~/composables/api/categories/useGetCategories'
  import { FILTERS_DEFAULTS } from '~/types/filters'
  import type { FiltersType } from '~/types/filters'
  import { useToast } from '~/composables/useToast'
  import { useFiltersFromQuery } from '~/composables/useFiltersFromQuery'
  import { useProductFiltering } from '~/composables/useProductFiltering'

  const route = useRoute()
  const router = useRouter()

  const { showToast } = useToast()

  const filters = reactive<FiltersType>(useFiltersFromQuery(route.query))

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

  const currentPage = computed(() => Number(route.query.page) || 1)

  const { paginatedProducts, totalPages } = useProductFiltering(products, filters, currentPage)

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

    <div class="page-content__products">
      <div v-if="status === 'pending'" class="skeletons">
        <div v-for="n in 6" :key="n" class="skeleton" />
      </div>

      <div v-else-if="status === 'error'" class="error">Failed to load products</div>

      <template v-else>
        <template v-if="paginatedProducts.length > 0">
          <ProductList
            :products="paginatedProducts"
            @add-to-cart="handleAddToCart"
            @click-card="handleCardClick"
          />
          <AppPagination :current-page="currentPage" :total-pages="totalPages" @change="setPage" />
        </template>

        <div v-else class="no-results">No products found</div>
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
    max-width: 1248px;
    padding: 0 16px;
    margin: 0 auto;

    @media (max-width: $bp-sm) {
      display: block;
    }
  }

  .page-content__products {
    flex: 1;
    min-width: 0;
  }

  .no-results {
    width: 100%;
    padding: 60px 0;
    font-size: 14px;
    color: #888;
    text-align: center;
  }
</style>
