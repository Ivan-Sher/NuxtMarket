<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRoute, navigateTo } from '#app'
  import { useApiFetch } from '~/composables/api/useApiFetch'
  import type { Product } from '~/types/api'
  import ProductGallery from '~/components/product/ProductGallery.vue'
  import ProductInfo from '~/components/product/ProductInfo.vue'
  import BaseTabs from '~/components/ui/BaseTabs.vue'
  import ProductReviews from '~/components/product/ProductReviews.vue'
  import { MOCK_DESCRIPTION_EXTENDED } from '~/components/constants/productMocks'
  import { useToast } from '~/composables/useToast'
  import { useBreakpoint } from '~/composables/useBreakpoint'
  import { useCartStore } from '~/stores/cart'
  import { useProductReviews } from '~/composables/useProductReviews'
  import { useSimilarProducts } from '~/composables/useSimilarProducts'
  import ProductList from '~/components/product/ProductList.vue'

  const route = useRoute()
  const productId = route.params.id as string

  const { data: product, pending, error, refresh } = useApiFetch<Product>(`/products/${productId}`)

  const { isDesktop } = useBreakpoint()
  const isMobile = computed(() => !isDesktop.value)

  const cart = useCartStore()
  const { showToast } = useToast()

  const { reviews, form, errors, successMessage, reviewCount, averageRating, submitReview } =
    useProductReviews(productId)

  const { similarItems, similarStatus } = useSimilarProducts(product)

  const currentTab = ref(0)
  const expandedTab = ref<number | null>(null)
  const quantity = ref(1)
  const showFullDescription = ref(false)

  const currentRating = computed(() => {
    if (reviewCount.value > 0) return averageRating.value
    return product.value?.rating ?? 0
  })

  const galleryImages = computed(() => {
    if (!product.value) return []
    return Array(4).fill(product.value.image)
  })

  const tabs = computed(() => [
    { title: 'Description', tabClass: 'tab-description' },
    { title: 'Aditional Information', tabClass: 'tab-additional' },
    { title: `Reviews (${reviewCount.value || 0})`, tabClass: 'tab-reviews' },
  ])

  const handleProductAddToCart = (qty: number) => {
    if (!product.value) return
    cart.addItem(
      {
        id: product.value.id,
        price: product.value.price,
        title: product.value.title,
        image: product.value.image,
      },
      qty,
    )
  }

  const handleSimilarAddToCart = (item: Product) => {
    showToast(`The item "${item.title}" was added to your Shopping bag.`)
  }

  const handleSimilarCardClick = (item: Product) => {
    navigateTo('/products/' + item.id)
  }
</script>
<template>
  <div class="product-page">
    <div v-if="pending" class="product-page__loading">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>

    <div v-else-if="error" class="product-page__error">
      <p><strong>Error:</strong> {{ error.message || 'Unknown error' }}</p>
      <p v-if="error.statusCode">Code: {{ error.statusCode }}</p>
      <button @click="() => refresh()">Retry</button>
    </div>

    <div v-else-if="product" class="product-page__content">
      <div class="top-section">
        <ProductGallery :images="galleryImages" />
        <ProductInfo
          :product="product"
          :rating="currentRating"
          :review-count="reviewCount"
          :is-mobile="isMobile"
          :show-full-description="showFullDescription"
          :quantity="quantity"
          @update:quantity="quantity = $event"
          @update:show-full-description="showFullDescription = $event"
          @add-to-cart="handleProductAddToCart"
        />
      </div>

      <div class="bottom-section">
        <BaseTabs
          v-model="currentTab"
          v-model:expanded-accordion="expandedTab"
          :tabs="tabs"
          :is-desktop="isDesktop"
        >
          <template #tab-0>
            <p>{{ product.description }}{{ MOCK_DESCRIPTION_EXTENDED }}</p>
          </template>
          <template #tab-1>
            <ul class="tab-1__ul">
              <li><span>SKU:</span> {{ product.sku || product.id }}</li>
              <li><span>Category:</span> {{ product.category }}</li>
              <li><span>Rating:</span> {{ product.rating?.toFixed(1) || 'N/A' }}</li>
              <li><span>Material:</span> High-quality fabric</li>
            </ul>
          </template>
          <template #tab-2>
            <ProductReviews
              :reviews="reviews"
              :form-name="form.name"
              :form-email="form.email"
              :form-rating="form.rating"
              :form-text="form.text"
              :errors="errors"
              :success-message="successMessage"
              @update:form-name="form.name = $event"
              @update:form-email="form.email = $event"
              @update:form-rating="form.rating = $event"
              @update:form-text="form.text = $event"
              @submit="submitReview()"
            />
          </template>
        </BaseTabs>
      </div>

      <div class="similar-section">
        <h2>Similar Items</h2>

        <div v-if="similarStatus === 'pending'" class="skeletons">
          <div v-for="n in 3" :key="n" class="skeleton" />
        </div>
        <ProductList
          v-else
          :products="similarItems"
          @add-to-cart="handleSimilarAddToCart"
          @click-card="handleSimilarCardClick"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .product-page {
    box-sizing: border-box;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 130px;
  }

  .product-page__content {
    box-sizing: border-box;
    overflow: hidden;
  }

  .top-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 40px;
  }

  .bottom-section {
    margin: 40px 0;
  }

  .tab-1__ul {
    padding: 0 12px;
    list-style: none;
  }

  .tab-1__ul span {
    margin-right: 10px;
    color: var(--black);
  }

  .similar-section {
    margin-top: 40px;
  }

  .similar-section h2 {
    margin-bottom: 24px;

    @include text(h2);
  }

  .similar-section .skeletons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media (max-width: $bp-md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .similar-section .skeleton {
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

  .similar-section :deep(.product-card) {
    max-width: 380px;

    img {
      max-width: 380px;
    }
  }

  .similar-section :deep(.product-list) {
    gap: 50px;
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }

    100% {
      background-position: -200% 0;
    }
  }

  .product-page__loading {
    padding: 40px;
    text-align: center;
  }

  .product-page__error {
    padding: 40px;
    color: #e74c3c;
    text-align: center;
  }

  .product-page__error button {
    padding: 8px 24px;
    margin-top: 12px;
    color: var(--white);
    cursor: pointer;
    background: #3498db;
    border: none;
    border-radius: 4px;
  }

  .spinner {
    width: 50px;
    height: 50px;
    margin: 20px auto;
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @media (width <= 1240px) {
    .product-page {
      padding: 20px;
      margin-top: 50px;
    }
  }

  @media (width <= 1024px) {
    .top-section {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  @media (width <= 425px) {
    .top-section {
      grid-template-columns: 1fr;
      gap: 20px;
      width: 100%;
      max-width: 100%;
    }

    .product-page {
      padding: 20px;
      margin-top: 20px;
    }
  }
</style>
