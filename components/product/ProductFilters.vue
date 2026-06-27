<script setup lang="ts">
  import { useDrawerStore } from '~/stores/drawer'
  import FiltersIcon from '@/components/icons/FiltersIcon.vue'
  import BurgerCloseIcon from '@/components/icons/BurgerCloseIcon.vue'
  import { ref } from 'vue'
  import type { FiltersType } from '~/types/filters'
  import { SortBy } from '~/types/filters'
  import FiltersForm from '@/components/FiltersForm.vue'

  const props = defineProps<{
    modelValue: FiltersType
    categories: string[]
  }>()

  const emit = defineEmits<{
    'update:modelValue': [filters: FiltersType]
  }>()

  const drawer = useDrawerStore()
  const localFilters = ref<FiltersType>({ ...props.modelValue })
  const sliderRef = ref<{ refresh: () => void } | null>(null)

  const sortOptions: { value: SortBy; label: string }[] = [
    { value: SortBy.Default, label: 'Sort by' },
    { value: SortBy.PriceAsc, label: 'Price: low to high' },
    { value: SortBy.PriceDesc, label: 'Price: high to low' },
    { value: SortBy.Name, label: 'Name: A–Z' },
  ]

  function openDrawer() {
    localFilters.value = { ...props.modelValue }
    drawer.toggle('filters')
  }

  function closeDrawer() {
    emit('update:modelValue', { ...localFilters.value })
    drawer.close()
  }
</script>

<template>
  <button class="filters-btn" @click="openDrawer"><FiltersIcon /> Filters</button>

  <div class="filters">
    <FiltersForm
      :model-value="modelValue"
      :categories="categories"
      :sort-options="sortOptions"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>

  <DrawerMenu name="filters" fullscreen>
    <div class="filters-drawer">
      <div class="filters-drawer__header">
        <h2 class="filters-drawer__title">Filters</h2>
        <button class="filters-drawer__close" @click="closeDrawer">
          <BurgerCloseIcon />
        </button>
      </div>

      <div class="filters-drawer__content">
        <FiltersForm
          v-model="localFilters"
          :categories="categories"
          :slider-ref="sliderRef"
          :sort-options="sortOptions"
        />
      </div>
    </div>
  </DrawerMenu>
</template>

<style scoped lang="scss">
  .filters-btn {
    display: none;
    gap: 8px;
    align-items: center;
    padding: 8px 0;
    cursor: pointer;
    background: none;
    border: none;

    @include text('body-md');

    @media (max-width: $bp-sm) {
      display: flex;
    }
  }

  .filters {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    gap: 24px;
    width: 260px;

    @media (max-width: $bp-sm) {
      display: none;
    }
  }

  .filters-drawer {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .filters-drawer__header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    margin-bottom: 30px;
  }

  .filters-drawer__title {
    @include text('h5');
  }

  .filters-drawer__close {
    display: flex;
    padding: 0;
    color: inherit;
    cursor: pointer;
    background: none;
    border: none;

    svg {
      height: 18px;
      padding-top: 3px;
    }
  }

  .filters-drawer__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-bottom: 24px;
    overflow-y: auto;
  }
</style>
