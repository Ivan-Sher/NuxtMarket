<script setup lang="ts">
  import AboutSection from '~/components/AboutSection.vue'
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
</style>
