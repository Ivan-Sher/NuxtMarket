<script setup lang="ts">
  import type { Product } from '~/types/api'

  defineProps<{
    products: Product[]
  }>()

  defineEmits<{
    'add-to-cart': [product: Product]
    'click-card': [product: Product]
  }>()
</script>

<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="$emit('add-to-cart', $event)"
      @click-card="$emit('click-card', $event)"
    />
  </div>
</template>
<style scoped lang="scss">
  .product-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media (max-width: $bp-md) {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
  }
</style>
