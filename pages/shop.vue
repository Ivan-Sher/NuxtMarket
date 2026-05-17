<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import { computed, watch } from 'vue'
  import type { Product } from '~/types/api'
  import { useGetAllProducts } from '~/composables/api/products/useGetAllProducts'
  import { useToast } from '~/composables/useToast'
  import { navigateTo } from '#app'

  const route = useRoute()
  const router = useRouter()

  const { showToast } = useToast()
  const PER_PAGE = 6

  const { data: products, status, error } = useGetAllProducts()

  watch(error, (val) => {
    if (val) showToast(val.message, 'error')
  })

  const currentPage = computed(() => Number(route.query.page) || 1)

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * PER_PAGE
    return products.value?.slice(start, start + PER_PAGE) ?? []
  })

  const totalPages = computed(() => {
    return Math.ceil((products.value?.length ?? 0) / PER_PAGE)
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
      <ProductFilters />
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
