<script setup lang="ts">
  import type { Product } from '~/types/api'
  import { ref } from 'vue'
  import { useCartStore } from '~/stores/cart'
  import { useBreakpoint } from '~/composables/useBreakpoint'

  const props = defineProps<{
    product: Product
  }>()

  const emit = defineEmits<{
    'add-to-cart': [product: Product]
    'click-card': [product: Product]
  }>()

  const cart = useCartStore()
  const isTapped = ref(false)
  const { isDesktop } = useBreakpoint()

  function handleCardClick() {
    if (isDesktop.value) {
      emit('click-card', props.product)
      return
    }
    if (!isTapped.value) {
      isTapped.value = true
    } else {
      emit('click-card', props.product)
    }
  }

  function handleAddToCart() {
    cart.addItem({
      id: props.product.id,
      name: props.product.title,
      price: props.product.price,
      image: props.product.image,
    })

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

    @include text(body-lg);

    text-transform: uppercase;
    white-space: nowrap;
    cursor: pointer;
    background: color-mix(in srgb, var(--white) 50%, transparent);
    border: none;
    opacity: 0;
    transform: translateX(-50%);
    transition: opacity 0.5s;

    &:hover {
      opacity: 1;
    }

    @media (max-width: $bp-sm) {
      @include text(body-md);

      height: 50px;
      padding: 8px 16px;
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
    color: var(--accent);

    // Мобильная адаптация
    @media (max-width: $bp-md) {
      font-size: 14px;
    }
  }
</style>
