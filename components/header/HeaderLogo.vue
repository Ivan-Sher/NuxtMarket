<script setup lang="ts">
  import Logo from '~/components/icons/Logo.vue'
</script>
<template>
  <NuxtLink to="/" class="header-inner-logo"><Logo /></NuxtLink>
</template>
<style scoped lang="scss">
  .header-inner-logo {
    font-size: 20px;
    font-weight: 700;
    color: inherit;
    letter-spacing: 0.1em;
    text-decoration: none;

    @media (max-width: $bp-md) {
      height: 36px;
    }
  }

  .header-inner-logo svg {
    width: 120px;
    height: 40px;

    @media (max-width: $bp-md) {
      width: 99px;
      height: 36px;
    }
  }
</style>
