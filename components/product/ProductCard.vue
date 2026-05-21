<script setup lang="ts">
  import type { Product } from '~/types/api'
  import { ref } from 'vue'

  const props = defineProps<{
    product: Product
  }>()

  const emit = defineEmits<{
    'add-to-cart': [product: Product]
    'click-card': [product: Product]
  }>()

  const isTapped = ref(false)

  function handleCardClick() {
    if (!isTapped.value) {
      isTapped.value = true
    } else {
      emit('click-card', props.product)
    }
  }

  function handleAddToCart() {
    emit('add-to-cart', props.product)
    isTapped.value = false
  }
</script>

<template>
  <div class="product-card" :class="{ 'is-tapped': isTapped }" @click="handleCardClick">
    <div class="product-card__image-wrapper">
      <img :src="product.image" :alt="product.title" />
      <button class="product-card__btn" @click.stop="handleAddToCart">Add to cart</button>
    </div>
    <h3 class="product-card__title">{{ product.title }}</h3>
    <p class="product-card__price">$ {{ product.price }}</p>
  </div>
</template>
<style scoped lang="scss">
  .product-card {
    width: 100%;
    max-width: 300px;
    overflow: hidden;
    cursor: pointer;
    border: none;
  }

  .product-card__image-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
  }

  .product-card img {
    display: block;
    width: 100%;
    max-width: 300px;
    aspect-ratio: 1;
    object-fit: cover;
  }

  .product-card__btn {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: 64px;
    padding: 10px 24px;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    white-space: nowrap;
    cursor: pointer;
    background: #f0f0f0;
    border: none;
    opacity: 0;
    transform: translateX(-50%);
    transition: opacity 0.5s;

    @media (max-width: $bp-sm) {
      font-size: 14px;
    }
  }

  @media (hover: hover) {
    .product-card:hover .product-card__btn {
      opacity: 1;
    }
  }

  .product-card.is-tapped .product-card__btn {
    opacity: 1;
  }

  .product-card h3 {
    @include text(h3);

    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;

    @media (max-width: $bp-md) {
      font-size: 14px;
      line-height: 15px;
    }
  }

  .product-card p {
    @include text(h3);

    font-weight: 500;
    color: #a18a68;

    @media (max-width: $bp-md) {
      font-size: 14px;
    }
  }
</style>
