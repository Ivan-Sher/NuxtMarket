<script setup lang="ts">
  import ProfileIcon from './icons/ProfileIcon.vue'
  import SearchIcon from './icons/SearchIcon.vue'
  import CartIcon from './icons/CartIcon.vue'
  import { useCartStore } from '~/stores/cart'
  import { useDrawerStore } from '~/stores/drawer'

  const cart = useCartStore()
  const drawer = useDrawerStore()

  const iconLinks = [
    { name: 'search', label: 'поиск', icon: SearchIcon },
    { name: 'cart', label: 'корзина', icon: CartIcon },
    { name: 'profile', label: 'профиль', icon: ProfileIcon },
  ]

  function handleIconClick(name: string) {
    if (name === 'cart') {
      drawer.toggle('cart')
    }
  }
</script>

<template>
  <div class="header-inner-content-icons">
    <button
      v-for="icon in iconLinks"
      :key="icon.name"
      :class="[
        'header__icon-btn',
        `header__icon-${icon.name}`,
        { 'has-badge': icon.name === 'cart' && cart.totalItems > 0 },
      ]"
      :aria-label="icon.label"
      @click="handleIconClick(icon.name)"
    >
      <component :is="icon.icon" />
      <!-- Счётчик товаров -->
      <span v-if="icon.name === 'cart' && cart.totalItems > 0" class="cart-badge">
        {{ cart.totalItems }}
      </span>
    </button>
  </div>
</template>
<style scoped lang="scss">
  .header-inner-content-icons {
    display: flex;
    gap: 29px;
    align-items: start;
    justify-content: end;
    color: inherit;
    cursor: pointer;
    background: none;
    border: none;
  }

  .header__icon-btn {
    all: unset;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    color: inherit;
    cursor: pointer;
    background: none;
    border: none;
  }

  .cart-badge {
    position: absolute;
    top: 5px;
    right: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 11px;
    height: 11px;
    padding: 0;
    font-size: 9px;
    font-weight: 600;
    color: rgb(0 0 0);
    background: white;
    border: 1px solid rgb(0 0 0);
    border-radius: 50%;
  }

  .header__icon-search {
    display: block;

    @media (max-width: $bp-md) {
      display: none;
    }
  }

  .header__icon-profile {
    display: block;

    @media (max-width: $bp-md) {
      display: none;
    }
  }
</style>
