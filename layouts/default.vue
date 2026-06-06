<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'

  const route = useRoute()
  const isHome = computed(() => route.path === '/')
</script>

<template>
  <div>
    <BaseHeader :class="{ 'header--with-margin': !isHome }" />
    <slot />
    <BaseFooter />
  </div>
</template>

<style scoped lang="scss">
  .header--with-margin :deep(.header) {
    margin-bottom: 100px;
    border-bottom: 1px solid #d8d8d8;
  }
</style>
