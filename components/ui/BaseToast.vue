<script setup lang="ts">
  import { useToast } from '~/composables/useToast'
  import { useDrawerStore } from '~/stores/drawer'
  import ArrowToast from '~/components/icons/ArrowToast.vue'

  const { isVisible, message, type } = useToast()
  const toast = useToast()
  const drawer = useDrawerStore()

  function handleViewCart() {
    toast.hideToast()
    drawer.open('cart')
  }
</script>

<template>
  <Transition name="toast">
    <div v-if="isVisible" class="toast" :class="`toast--${type}`">
      <div class="toast__block-first">
        <span class="toast__icon"><ArrowToast /> </span>
        <span class="toast__message">{{ message }}</span>
      </div>
      <div class="toast__block-second">
        <button class="toast__action" @click="handleViewCart">View Cart</button>
      </div>
    </div>
  </Transition>
</template>
<style scoped lang="scss">
  .toast {
    position: fixed;
    top: 63px;
    left: 50%;
    z-index: 1000;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1248px;
    max-width: 100%;
    height: 68px;
    padding: 0 16px;
    background: #efefef;
    border-top: 2px solid #a18a68;
    transform: translateX(-50%);

    @media (max-width: $bp-md) {
      top: 45px;
    }
  }

  .toast__block-first {
    display: flex;
    gap: 16px;
  }

  .toast--error {
    background: #ff9696;
    border-bottom-color: #e0c0c0;
  }

  .toast__content {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .toast__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    font-size: 11px;
    color: #8a7d6b;
    border: 1.5px solid #8a7d6b;
    border-radius: 50%;
  }

  .toast--error .toast__icon {
    color: #c0392b;
    border-color: #c0392b;
  }

  .toast__message {
    font-size: 14px;
    color: #4a4035;

    @media (max-width: $bp-sm) {
      width: 150px;
    }
  }

  .toast__action {
    padding: 0;
    font-size: 13px;
    font-weight: 700;
    color: #a18a68;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
    background: transparent;
    border: none;
  }

  .toast__action:hover {
    color: #4a4035;
  }

  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }

  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-100%);
  }
</style>
