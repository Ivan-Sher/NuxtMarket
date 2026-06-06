<script setup lang="ts">
  import { useDrawerStore } from '~/stores/drawer'
  import FiltersIcon from '@/components/icons/FiltersIcon.vue'
  import BaseButton from '@/components/ui/BaseButton.vue'
  import { FILTERS_DEFAULTS } from '~/types/filters'
  import type { FiltersType } from '~/types/filters'
  import { ref } from 'vue'
  import Slider from '@vueform/slider'

  const props = defineProps<{
    modelValue: FiltersType
    categories: string[]
  }>()

  const emit = defineEmits<{
    'update:modelValue': [filters: FiltersType]
  }>()

  const drawer = useDrawerStore()

  // ─── Десктоп: обновляем сразу ─────────────────────────────────────────────
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

  // ─── Мобайл: локальная копия-черновик ─────────────────────────────────────
  // При открытии drawer копируем текущие filters в localFilters.
  // Пользователь меняет localFilters — props.modelValue не трогаем.
  // При закрытии drawer эмитим localFilters наверх.
  const localFilters = ref<FiltersType>({ ...props.modelValue })

  function openDrawer() {
    // Синхронизируем черновик с актуальным состоянием перед открытием.
    // Например, если на десктопе уже выбрали категорию — drawer должен
    // отображать её, а не устаревшее значение.
    localFilters.value = { ...props.modelValue }
    drawer.toggle('filters')
  }

  function closeDrawer() {
    // Применяем черновик — только здесь данные летят в shop.vue
    emit('update:modelValue', { ...localFilters.value })
    drawer.close()
  }

  function updateLocal<K extends keyof FiltersType>(key: K, value: FiltersType[K]) {
    localFilters.value = { ...localFilters.value, [key]: value }
  }

  function resetLocalPrice() {
    localFilters.value = {
      ...localFilters.value,
      priceMin: FILTERS_DEFAULTS.priceMin,
      priceMax: FILTERS_DEFAULTS.priceMax,
    }
  }

  const sortOptions: { value: FiltersType['sortBy']; label: string }[] = [
    { value: '', label: 'Default' },
    { value: 'price_asc', label: 'Price: low to high' },
    { value: 'price_desc', label: 'Price: high to low' },
    { value: 'name', label: 'Name: A–Z' },
  ]
</script>

<template>
  <button class="filters-btn" @click="openDrawer"><FiltersIcon /> Filters</button>

  <!-- ─── Десктоп ─────────────────────────────────────────────────────────── -->
  <div class="filters">
    <div class="filters__group">
      <label class="filters__label">Search</label>
      <input
        type="search"
        class="filters__input"
        placeholder="Search..."
        :value="modelValue.searchQuery"
        @input="update('searchQuery', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <div class="filters__group">
      <label class="filters__label">Category</label>
      <select
        class="filters__select"
        :value="modelValue.category"
        @change="update('category', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">All categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="filters__group">
      <label class="filters__label">Sort by</label>
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
    </div>

    <div class="filters__group">
      <div class="filters__price-header">
        <label class="filters__label">Price</label>
        <span class="filters__price-values">
          ${{ modelValue.priceMin }} – ${{ modelValue.priceMax || '∞' }}
        </span>
      </div>
      <Slider
        :value="[modelValue.priceMin, modelValue.priceMax || 10000]"
        :min="0"
        :max="10000"
        :lazy="true"
        @change="
          (val: number[]) => {
            update('priceMin', val[0] ?? 0)
            update('priceMax', val[1] ?? 0)
          }
        "
      />
      <button class="filters__reset-price" @click="resetPrice">Reset price</button>
    </div>

    <div class="filters__group">
      <label class="filters__toggle">
        <input
          type="checkbox"
          class="filters__toggle-input"
          :checked="modelValue.onSale"
          @change="update('onSale', ($event.target as HTMLInputElement).checked)"
        />
        <span class="filters__toggle-track"><span class="filters__toggle-thumb" /></span>
        <span class="filters__toggle-label">On sale</span>
      </label>
    </div>

    <div class="filters__group">
      <label class="filters__toggle">
        <input
          type="checkbox"
          class="filters__toggle-input"
          :checked="modelValue.inStock"
          @change="update('inStock', ($event.target as HTMLInputElement).checked)"
        />
        <span class="filters__toggle-track"><span class="filters__toggle-thumb" /></span>
        <span class="filters__toggle-label">In stock</span>
      </label>
    </div>
  </div>

  <!-- ─── Мобильный drawer ────────────────────────────────────────────────── -->
  <DrawerMenu name="filters">
    <div class="filters-drawer">
      <BaseButton variant="secondary" class="filters-drawer__close" @click="closeDrawer"
        >✕</BaseButton
      >

      <div class="filters-drawer__content">
        <div class="filters__group">
          <label class="filters__label">Search</label>
          <input
            type="search"
            class="filters__input"
            placeholder="Search..."
            :value="localFilters.searchQuery"
            @input="updateLocal('searchQuery', ($event.target as HTMLInputElement).value)"
          />
        </div>

        <div class="filters__group">
          <label class="filters__label">Category</label>
          <select
            class="filters__select"
            :value="localFilters.category"
            @change="updateLocal('category', ($event.target as HTMLSelectElement).value)"
          >
            <option value="">All categories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <div class="filters__group">
          <label class="filters__label">Sort by</label>
          <select
            class="filters__select"
            :value="localFilters.sortBy"
            @change="
              updateLocal(
                'sortBy',
                ($event.target as HTMLSelectElement).value as FiltersType['sortBy'],
              )
            "
          >
            <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>

        <div class="filters__group">
          <div class="filters__price-header">
            <label class="filters__label">Price</label>
            <span class="filters__price-values">
              ${{ localFilters.priceMin }} – ${{ localFilters.priceMax || '∞' }}
            </span>
          </div>
          <Slider
            :value="[localFilters.priceMin, localFilters.priceMax || 10000]"
            :min="0"
            :max="10000"
            :lazy="true"
            @change="
              (val: number[]) => {
                update('priceMin', val[0] ?? 0)
                update('priceMax', val[1] ?? 0)
              }
            "
          />
          <button class="filters__reset-price" @click="resetLocalPrice">Reset price</button>
        </div>

        <div class="filters__group">
          <label class="filters__toggle">
            <input
              type="checkbox"
              class="filters__toggle-input"
              :checked="localFilters.onSale"
              @change="updateLocal('onSale', ($event.target as HTMLInputElement).checked)"
            />
            <span class="filters__toggle-track"><span class="filters__toggle-thumb" /></span>
            <span class="filters__toggle-label">On sale</span>
          </label>
        </div>

        <div class="filters__group">
          <label class="filters__toggle">
            <input
              type="checkbox"
              class="filters__toggle-input"
              :checked="localFilters.inStock"
              @change="updateLocal('inStock', ($event.target as HTMLInputElement).checked)"
            />
            <span class="filters__toggle-track"><span class="filters__toggle-thumb" /></span>
            <span class="filters__toggle-label">In stock</span>
          </label>
        </div>
      </div>
    </div>
  </DrawerMenu>
</template>

<style scoped lang="scss">
  .filters-btn {
    display: none;
    gap: 8px;
    align-items: center;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    background: none;
    border: 1px solid #e0e0e0;
    border-radius: 8px;

    @media (max-width: $bp-sm) {
      display: flex;
    }
  }

  .filters {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    gap: 24px;
    width: 220px;

    @media (max-width: $bp-sm) {
      display: none;
    }
  }

  .filters__group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .filters__label {
    font-size: 13px;
    font-weight: 500;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .filters__input,
  .filters__select {
    box-sizing: border-box;
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    outline: none;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    transition: border-color 0.2s;

    &:focus {
      border-color: #bbb;
    }
  }

  // ─── Price range ──────────────────────────────────────────────────────────

  .filters__price-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .filters__price-values {
    font-size: 13px;
    color: #444;
  }

  .filters__range-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 20px;
  }

  .filters__range {
    width: 100%;
    accent-color: #222;
    cursor: pointer;
  }

  .filters__reset-price {
    align-self: flex-start;
    padding: 0;
    font-size: 12px;
    color: #888;
    text-decoration: underline;
    cursor: pointer;
    background: none;
    border: none;

    &:hover {
      color: #222;
    }
  }

  // ─── Toggle ───────────────────────────────────────────────────────────────

  .filters__toggle {
    display: flex;
    gap: 10px;
    align-items: center;
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
    background: #e0e0e0;
    border-radius: 999px;
    transition: background 0.2s;

    .filters__toggle-input:checked + & {
      background: #222;
    }
  }

  .filters__toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.2s;

    .filters__toggle-input:checked + .filters__toggle-track & {
      transform: translateX(16px);
    }
  }

  .filters__toggle-label {
    font-size: 14px;
  }

  // ─── Drawer ───────────────────────────────────────────────────────────────

  .filters-drawer {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .filters-drawer__close {
    align-self: flex-end;
    margin-bottom: 16px;
  }

  .filters-drawer__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow-y: auto;
  }

  :deep(.slider-connect) {
    background: #222;
  }

  :deep(.slider-handle) {
    box-shadow: 0 0 0 2px #222;
  }
</style>
