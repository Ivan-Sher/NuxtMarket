<script setup lang="ts">
  import { computed } from 'vue'
  import type { Product } from '~/types/api'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import ProductIcons from './ProductIcons.vue'
  import ArrowRight from '~/components/icons/ArrowRight.vue'
  import Share from '~/components/icons/Share.vue'

  const props = withDefaults(
    defineProps<{
      product: Product
      rating?: number
      reviewCount?: number
      isMobile?: boolean
      showFullDescription?: boolean
      quantity?: number
    }>(),
    {
      isMobile: false,
      showFullDescription: false,
      quantity: 1,
    },
  )

  const emit = defineEmits<{
    'add-to-cart': [quantity: number]
    'update:quantity': [value: number]
    'update:showFullDescription': [value: boolean]
  }>()

  const displayRating = computed(() => props.rating ?? props.product.rating ?? 0)
  const roundedRating = computed(() => Math.round(displayRating.value))

  function increment() {
    emit('update:quantity', props.quantity + 1)
  }

  function decrement() {
    if (props.quantity > 1) {
      emit('update:quantity', props.quantity - 1)
    }
  }

  function toggleDescription() {
    emit('update:showFullDescription', !props.showFullDescription)
  }

  function handleAddToCart() {
    emit('add-to-cart', props.quantity)
  }
</script>
<template>
  <div class="product-info">
    <div class="title-block">
      <h1 class="title">{{ product.title }}</h1>
      <div class="price-row">
        <p class="price">$ {{ product.price }}</p>
        <button class="share-btn">
          <Share />
        </button>
      </div>
    </div>
    <div class="info-block">
      <div class="rating-block">
        <div class="stars">
          <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= roundedRating }"
            >★</span
          >
        </div>
        <span class="rating-value">{{ reviewCount }} customer reviews</span>
      </div>

      <div class="description-wrapper">
        <p
          class="description"
          :class="{ 'description--clamped': isMobile && !showFullDescription }"
        >
          {{ product.description }}
        </p>
        <button v-if="isMobile" class="view-more" @click="toggleDescription">
          {{ showFullDescription ? 'View less' : 'View more' }}
          <ArrowRight v-if="!showFullDescription" />
        </button>
      </div>

      <div class="actions">
        <div class="quantity">
          <button @click="decrement">−</button>
          <span>{{ quantity }}</span>
          <button @click="increment">+</button>
        </div>
        <BaseButton variant="secondary" class="add-to-cart" @click="handleAddToCart"
          >ADD TO CART</BaseButton
        >
      </div>
    </div>
    <div class="meta">
      <ProductIcons />
      <p>
        SKU: <span>{{ product.sku || product.id }}</span>
      </p>
      <p>
        Categories: <span>{{ product.category }}</span>
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .info-block {
    display: flex;
    flex-direction: column;
  }

  .title {
    @include text(h5);

    margin: 0;
  }

  .price {
    font-size: 20px;
    font-weight: 500;
    color: var(--accent);
  }

  .price-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: $bp-sm) {
      .share-btn {
        display: none;
      }
    }
  }

  .share-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    cursor: pointer;
    background: none;
    border: none;
    border-radius: 50%;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  .rating-block {
    display: flex;
    gap: 12px;
    align-items: center;

    @media (max-width: $bp-sm) {
      display: none;
    }
  }

  .stars {
    display: flex;
    gap: 2px;
    font-size: var(--h3-fs);
    color: #ccc;

    @media (max-width: $bp-sm) {
      font-size: 20px;
    }
  }

  .star.filled {
    color: #f5b342;
  }

  .reviews-count {
    font-size: 14px;
    color: #777;
  }

  .description-wrapper {
    display: flex;
    flex-direction: column;

    @media (max-width: $bp-sm) {
      order: 2;
    }
  }

  .description {
    order: 1;
    font-size: var(--body-lg-fs);
    font-weight: 400;
    line-height: var(--body-lg-lh);
    color: var(--dark-gray);

    &--clamped {
      display: -webkit-box;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    @media (max-width: $bp-sm) {
      order: 2;
    }
  }

  .view-more {
    align-self: flex-start;
    padding: 0;
    margin-top: 4px;
    font-size: var(--body-md-fs);
    font-weight: var(--body-md-fw);
    line-height: var(--body-sm-lh);
    color: var(--accent);
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }

    @media (max-width: $bp-sm) {
      order: 3;
    }
  }

  .actions {
    display: flex;
    gap: 20px;
    align-items: center;
    margin: 10px 0;
  }

  .quantity {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 100px;
    height: 50px;
    overflow: hidden;
    background: var(--light-gray);
    border-radius: 4px;

    @media (max-width: $bp-sm) {
      display: none;
    }
  }

  .quantity button {
    padding: 14px 10px;
    font-size: 18px;
    cursor: pointer;
    background: var(--light-gray);
    border: none;
    transition: background 0.2s;
  }

  .quantity button:hover {
    background: #e0e0e0;
  }

  .quantity span {
    max-width: 5px;
    padding: 5px 17px;
    font-size: 18px;
    text-align: center;
  }

  .add-to-cart {
    order: 2;
    width: 100%;
    max-width: 360px;
    height: 50px;
    font-size: var(--body-lg-fs);
    font-weight: var(--body-lg-fw);
    color: var(--black);
    cursor: pointer;
    background: var(--white);
    border: 1px solid var(--black);
    border-radius: 4px;
    transition: background 0.2s;

    @media (max-width: $bp-sm) {
      order: 1;
    }
  }

  .add-to-cart:hover {
    color: var(--white);
    background: var(--black);
  }

  .meta {
    padding-top: 16px;
    font-size: 16px;
    font-weight: 4500;
    line-height: 27px;
    color: var(--black);

    @media (max-width: $bp-sm) {
      display: none;
    }
  }

  .meta p {
    margin: 4px 0;
  }

  .meta span {
    margin-left: 10px;
    color: var(--dark-gray);
  }
</style>
