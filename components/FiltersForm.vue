<script setup lang="ts">
  import SearchIcon from '@/components/icons/SearchIcon.vue'
  import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue'
  import { FILTERS_DEFAULTS } from '~/types/filters'
  import type { FiltersType } from '~/types/filters'
  import Slider from '@vueform/slider'

  const props = defineProps<{
    modelValue: FiltersType
    categories: string[]
    sliderRef?: { refresh: () => void } | null
  }>()

  const emit = defineEmits<{
    'update:modelValue': [filters: FiltersType]
  }>()

  function update<K extends keyof FiltersType>(key: K, value: FiltersType[K]) {
    emit('update:modelValue', { ...props.modelValue, [key]: value })
  }

  function resetPrice() {
    emit('update:modelValue', {
      ...props.modelValue,
      priceMin: FILTERS_DEFAULTS.priceMin,
      priceMax: FILTERS_DEFAULTS.priceMax,
    })
  }

  const sortOptions: { value: FiltersType['sortBy']; label: string }[] = [
    { value: '', label: 'Sort by' },
    { value: 'price_asc', label: 'Price: low to high' },
    { value: 'price_desc', label: 'Price: high to low' },
    { value: 'name', label: 'Name: A–Z' },
  ]
</script>

<template>
  <div class="filters__group">
    <div class="filters__search-wrap">
      <input
        type="search"
        class="filters__input filters__input--search"
        placeholder="Search..."
        :value="modelValue.searchQuery"
        @input="update('searchQuery', ($event.target as HTMLInputElement).value)"
      />
      <SearchIcon class="filters__search-icon" />
    </div>
  </div>

  <div class="filters__group">
    <div class="filters__select-wrap">
      <select
        class="filters__select"
        :value="modelValue.category"
        @change="update('category', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">All categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <ChevronDownIcon class="filters__select-icon" />
    </div>
  </div>

  <div class="filters__group">
    <div class="filters__select-wrap">
      <select
        class="filters__select"
        :value="modelValue.sortBy"
        @change="
          update('sortBy', ($event.target as HTMLSelectElement).value as FiltersType['sortBy'])
        "
      >
        <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <ChevronDownIcon class="filters__select-icon" />
    </div>
  </div>

  <div class="filters__group">
    <Slider
      :ref="sliderRef"
      :value="[modelValue.priceMin, modelValue.priceMax || 5000]"
      :min="0"
      :max="5000"
      :lazy="true"
      :tooltips="false"
      @change="
        (val: number[]) => {
          update('priceMin', val[0] ?? 0)
          update('priceMax', val[1] ?? 0)
        }
      "
    />
    <div class="filters__price-header">
      <div class="filters__price-left">
        <label class="filters__label">Price</label>
        <span class="filters__price-values">
          ${{ modelValue.priceMin }} – ${{ modelValue.priceMax || '5000' }}
        </span>
      </div>
      <button class="filters__reset-price" @click="resetPrice">Reset price</button>
    </div>
  </div>

  <div class="filters__group">
    <label class="filters__toggle">
      <span class="filters__toggle-label">On sale</span>
      <input
        type="checkbox"
        class="filters__toggle-input"
        :checked="modelValue.onSale"
        @change="update('onSale', ($event.target as HTMLInputElement).checked)"
      />
      <span class="filters__toggle-track"><span class="filters__toggle-thumb" /></span>
    </label>
  </div>

  <div class="filters__group">
    <label class="filters__toggle">
      <span class="filters__toggle-label">In stock</span>
      <input
        type="checkbox"
        class="filters__toggle-input"
        :checked="modelValue.inStock"
        @change="update('inStock', ($event.target as HTMLInputElement).checked)"
      />
      <span class="filters__toggle-track"><span class="filters__toggle-thumb" /></span>
    </label>
  </div>
</template>

<style scoped lang="scss">
  .filters__group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .filters__label {
    font-weight: 500;
    color: var(--dark-gray);
  }

  .filters__input,
  .filters__select {
    box-sizing: border-box;
    width: 100%;
    padding: 8px 12px;
    color: var(--black);
    outline: none;
    background: var(--white);
    border: 1px solid var(--gray);
    border-radius: 4px;
    transition: border-color 0.2s;

    @include text('body-md');
  }

  .filters__select-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .filters__select-icon {
    position: absolute;
    right: 12px;
    color: var(--black);
    pointer-events: none;
  }

  .filters__select {
    height: 53px;
    padding: 0 12px;
    padding-right: 40px;
    appearance: none;
  }

  .filters__input--search {
    height: 35px;
    padding: 0;
    padding-right: 28px;
    padding-bottom: 12px;
    border: none;
    border-bottom: 1px solid var(--gray);
    border-radius: 0;

    &:focus {
      border-bottom-color: var(--black);
    }
  }

  .filters__search-wrap {
    position: relative;
    display: flex;
    align-items: start;
  }

  .filters__search-icon {
    position: absolute;
    right: 0;
    width: 19px;
    height: 19px;
    cursor: pointer;
  }

  .filters__price-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .filters__price-left {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .filters__price-values {
    @include text('body-sm');

    color: var(--dark-gray);
    letter-spacing: 0.02em;
  }

  .filters__reset-price {
    @include text('body-sm');

    align-self: flex-start;
    padding: 0;
    color: var(--accent);
    letter-spacing: 0.02em;
    cursor: pointer;
    background: none;
    border: none;

    &:hover {
      color: var(--black);
    }
  }

  .filters__toggle {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
  }

  .filters__toggle-input {
    display: none;
  }

  .filters__toggle-track {
    position: relative;
    flex-shrink: 0;
    width: 36px;
    height: 20px;
    background: var(--gray);
    border-radius: 999px;
    transition: background 0.2s;

    .filters__toggle-input:checked + & {
      background: var(--black);
    }
  }

  .filters__toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: var(--white);
    border-radius: 50%;
    transition: transform 0.2s;

    .filters__toggle-input:checked + .filters__toggle-track & {
      transform: translateX(16px);
    }
  }

  .filters__toggle-label {
    @include text('body-md');
  }

  :deep(.slider-handle) {
    width: 2px;
    height: 10px;
    margin-top: 2px;
    background: var(--black);
    border-radius: 1px;
    box-shadow: none;
  }

  :deep(.slider-handle-lower) {
    transform: translateX(-8px);
  }

  :deep(.slider-handle-upper) {
    transform: translateX(-8px);
  }

  @media (max-width: $bp-sm) {
    :deep(.slider-handle-lower) {
      transform: translateX(-6px);
    }

    :deep(.slider-handle-upper) {
      transform: translateX(-8px);
    }
  }

  :deep(.slider-horizontal) {
    height: 2px;
  }

  :deep(.slider-connect) {
    background: var(--black);
  }
</style>
