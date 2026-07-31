<script setup lang="ts">
  import { computed } from 'vue'
  import BaseButton from '~/components/ui/BaseButton.vue'

  const props = defineProps<{
    currentPage: number
    totalPages: number
  }>()

  const emit = defineEmits<{
    change: [page: number]
  }>()

  const pages = computed(() => {
    const start = Math.max(1, props.currentPage - 1)
    const end = Math.min(props.totalPages, start + 2)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  })
</script>

<template>
  <div class="pagination">
    <BaseButton
      v-if="currentPage > 1"
      variant="transparent"
      class="pagination__arrow"
      @click="emit('change', currentPage - 1)"
    >
      ‹
    </BaseButton>

    <BaseButton
      v-for="page in pages"
      :key="page"
      variant="transparent"
      class="pagination__page"
      :class="{ 'pagination__page--active': page === currentPage }"
      @click="emit('change', page)"
    >
      {{ page }}
    </BaseButton>

    <BaseButton
      v-if="currentPage < totalPages"
      variant="transparent"
      class="pagination__arrow"
      @click="emit('change', currentPage + 1)"
    >
      ›
    </BaseButton>
  </div>
</template>

<style scoped>
  .pagination {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
    margin-top: 32px;
  }

  .pagination__arrow,
  .pagination__page {
    width: 36px;
    height: 36px;
    font-size: 16px;
    cursor: pointer;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    transition: background 0.2s;
  }

  .pagination__arrow:hover,
  .pagination__page:hover {
    background: #f5f5f5;
  }

  .pagination__page--active {
    color: #fff;
    background: #222;
    border-color: #222;
  }
</style>
