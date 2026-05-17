<script setup lang="ts">
  import { useDrawerStore } from '~/stores/drawer'
  import FiltersIcon from '@/components/icons/FiltersIcon.vue'
  import BaseButton from '@/components/ui/BaseButton.vue'

  const drawer = useDrawerStore()
</script>

<template>
  <button class="filters-btn" @click="drawer.toggle('filters')"><FiltersIcon /> Filters</button>

  <div class="filters"></div>

  <DrawerMenu name="filters">
    <div class="filters-drawer">
      <BaseButton variant="secondary" class="filters-drawer__close" @click="drawer.close()"
        >✕</BaseButton
      >
      <div class="filters-drawer__content"></div>
    </div>
  </DrawerMenu>
</template>

<style scoped lang="scss">
  .filters-btn {
    display: none;

    @media (max-width: $bp-sm) {
      all: unset;
      display: flex;
      gap: 8px;
      align-items: center;
      padding: 10px 0 20px;
      font-size: 14px;
      cursor: pointer;
      background: #fff;
      border: none;
    }
  }

  .filters {
    width: 266px;
    height: 366px;
    background-color: rgb(204 204 204);

    @media (max-width: $bp-md) {
      width: 200px;
    }

    @media (max-width: $bp-sm) {
      display: none;
    }
  }

  .filters-drawer {
    padding: 20px 0;
  }

  .filters-drawer__close {
    display: block;
    margin-bottom: 20px;
    font-size: 18px;
    cursor: pointer;
    background: none;
    border: none;
  }

  .filters-drawer__content {
    width: 100%;
    height: 366px;
    background-color: rgb(204 204 204);
  }
</style>
