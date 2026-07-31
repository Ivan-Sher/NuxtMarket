<script setup lang="ts">
  import { useDrawerStore } from '~/stores/drawer'

  import BurgerIcon from '~/components/icons/BurgerIcon.vue'
  import BurgerCloseIcon from '~/components/icons/BurgerCloseIcon.vue'

  const drawer = useDrawerStore()
</script>
<template>
  <button
    class="header-inner-content-burger"
    aria-label="Открыть меню"
    @click="drawer.toggle('menu')"
  >
    <component :is="drawer.isOpen('menu') ? BurgerCloseIcon : BurgerIcon" />
  </button>
</template>
<style scoped lang="scss">
  .header-inner-content-burger {
    display: none;
    color: inherit;
    cursor: pointer;
    background: none;
    border: none;

    @media (max-width: $bp-md) {
      display: flex;
    }
  }

  .header-inner-content-burger svg {
    display: flex;
    height: 18px;
    padding-top: 3px;
  }
</style>
