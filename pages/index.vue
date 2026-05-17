<script setup lang="ts">
  import AboutSection from '~/components/AboutSection.vue'
  import { onMounted, onBeforeUnmount } from 'vue'

  onMounted(() => {
    const headerEl = document.querySelector('.header')
    if (headerEl) headerEl.classList.add('no-margin')
  })
  onBeforeUnmount(() => {
    const headerEl = document.querySelector('.header')
    if (headerEl) headerEl.classList.remove('no-margin')
  })
</script>

<template>
  <div class="wrapper">
    <HomeSlider />
    <AboutSection />
  </div>
</template>
<style>
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 16px;
    overflow: hidden;
  }

  .header.no-margin {
    margin-bottom: 0 !important;
    border-bottom: none !important;
  }
</style>
