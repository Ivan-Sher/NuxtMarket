<script setup>
  import BaseHeader from '@/components/BaseHeader.vue'
  import BaseFooter from '~/components/BaseFooter.vue'
</script>

<template>
  <div>
    <div>
      <BaseHeader />
    </div>
    <main>
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>
