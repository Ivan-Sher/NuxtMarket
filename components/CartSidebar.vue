<!-- components/CartSidebar.vue -->
<script setup lang="ts">
  import { onMounted, onUnmounted, computed } from 'vue'
  import { useCartStore } from '~/stores/cart'
  import { useDrawerStore } from '~/stores/drawer'

  const cart = useCartStore()
  const drawer = useDrawerStore()
  const DRAWER_NAME = 'cart'

  function formatPrice(price: number): string {
    return `$ ${price.toFixed(2).replace('.', ',')}`
  }

  const totalItems = computed(() => cart.totalItems)
  const subtotal = computed(() => cart.totalPrice)

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && drawer.isOpen(DRAWER_NAME)) {
      drawer.close()
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="drawer.isOpen(DRAWER_NAME)" class="overlay" @click="drawer.close()" />
    </Transition>

    <Transition name="slide">
      <aside v-if="drawer.isOpen(DRAWER_NAME)" class="sidebar">
        <header class="sidebar__header">
          <div class="header__info">
            <h2>Shopping bag</h2>
            <p>{{ totalItems }} items</p>
          </div>
          <button class="sidebar__close" @click="drawer.close()">✕</button>
        </header>

        <div v-if="cart.isEmpty" class="sidebar__empty">Your shopping bag is empty</div>

        <TransitionGroup v-else name="cart-item" tag="ul" class="sidebar__list">
          <li v-for="item in cart.items" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" class="cart-item__image" />
            <div class="cart-item__content">
              <div class="cart-item__top">
                <span class="cart-item__name">{{ item.name ?? item.title }}</span>
                <button class="cart-item__remove" @click="cart.removeItem(item.id)">✕</button>
              </div>

              <span class="cart-item__price">{{ formatPrice(item.price) }}</span>

              <div class="cart-item__quantity">
                <button class="qty-btn" @click="cart.updateQuantity(item.id, item.quantity - 1)">
                  -
                </button>
                <span class="qty-value">{{ item.quantity }}</span>
                <button class="qty-btn" @click="cart.updateQuantity(item.id, item.quantity + 1)">
                  +
                </button>
              </div>
            </div>
          </li>
        </TransitionGroup>

        <footer v-if="!cart.isEmpty" class="sidebar__footer">
          <div class="sidebar__subtotal">
            <span>Subtotal ({{ totalItems }} items)</span>
            <strong>{{ formatPrice(subtotal) }}</strong>
          </div>
          <button class="sidebar__checkout">CHECKOUT</button>
        </footer>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgb(0 0 0 / 50%);
  }

  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1010;
    display: flex;
    flex-direction: column;
    width: 360px;
    max-width: 100%;
    background: #fff;
    box-shadow: -4px 0 24px rgb(0 0 0 / 8%);
  }

  .sidebar__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 72px 36px 0;
  }

  .sidebar__header h2 {
    margin: 0;
    font-size: var(--body-lg-fs);
    font-weight: var(--body-sm-fw);
    color: #111;
  }

  .sidebar__header p {
    font-size: var(--body-sm-fs);
    font-weight: var(--body-sm-fw);
    color: #707070;
  }

  .sidebar__close {
    position: absolute;
    top: 16px;
    left: 300px;
    display: none;
    padding: 4px;
    font-size: 20px;
    color: #666;
    cursor: pointer;
    background: none;
    border: none;

    @media (max-width: $bp-sm) {
      left: 290px;
      display: block;
    }
  }

  .sidebar__empty {
    flex: 1;
    padding: 3rem 1.5rem;
    color: #888;
    text-align: center;
  }

  .sidebar__list {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 24px;
    padding: 0 36px;
    margin: 0;
    overflow-y: auto;
    list-style: none;
    scrollbar-width: none;

    @media (max-width: $bp-sm) {
      padding: 0 16px;
    }
  }

  .cart-item {
    display: flex;
    align-items: flex-start;
    width: 290px;
    height: 140px;
    margin: 0;
  }

  .cart-item__image {
    flex-shrink: 0;
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 4px;
  }

  .cart-item__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0;
    margin-left: 12px;
  }

  .cart-item__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .cart-item__name {
    font-size: var(--body-md-fs);
    font-weight: var(--h4-fw);
    line-height: 1.3;
    color: #111;
  }

  .cart-item__remove {
    flex-shrink: 0;
    padding: 0;
    margin-left: 8px;
    font-size: var(--body-lg-fs);
    line-height: 1;
    color: #888;
    cursor: pointer;
    background: none;
    border: none;
  }

  .cart-item__price {
    margin-top: 2px;
    font-size: var(--body-md-fs);
    color: #444;
  }

  .cart-item__quantity {
    display: flex;
    align-items: center;
    align-self: flex-end;
    justify-content: space-between;
    width: 100px;
    height: 33px;
    margin-top: auto;
    overflow: hidden;
    background: #f5f5f5;
    border-radius: 4px;
  }

  .qty-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33px;
    height: 100%;
    font-size: 1rem;
    color: #333;
    cursor: pointer;
    background: transparent;
    border: none;
    transition: background 0.2s;
  }

  .qty-btn:hover {
    background: #e0e0e0;
  }

  .qty-value {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 33px;
    color: #111;
    text-align: center;
  }

  .sidebar__footer {
    padding: 1.25rem 1.5rem 1.5rem;
    background: #fff;
    border-top: 1px solid #e5e5e5;
  }

  .sidebar__subtotal {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    font-size: 0.95rem;
    color: #111;
  }

  .sidebar__subtotal strong {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .sidebar__checkout {
    width: 100%;
    padding: 0.875rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    background: #fff;
    border: 1px solid #000;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .sidebar__checkout:hover {
    background: #1a1a1a;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }

  .cart-item-enter-active,
  .cart-item-leave-active {
    transition: all 0.3s ease;
  }

  .cart-item-enter-from,
  .cart-item-leave-to {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
  }

  .cart-item-leave-active {
    position: absolute;
  }
</style>
