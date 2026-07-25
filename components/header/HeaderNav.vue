<script setup lang="ts">
  const navLinks = [
    { label: 'Shop', to: '/shop' },
    { label: 'Blog', to: '/blog' },
    { label: 'Our Story', to: '/our-story' },
  ]
</script>
<template>
  <nav class="header-inner-content-nav">
    <NuxtLink
      v-for="link in navLinks"
      :key="link.to"
      :to="link.to"
      class="header-inner-content-nav__link"
    >
      {{ link.label }}
    </NuxtLink>
  </nav>
</template>
<style scoped lang="scss">
  .header-inner-content__nav {
    display: flex;
    gap: 64px;

    @media (max-width: $bp-md) {
      display: none;
    }
  }

  .header-inner-content-nav__link {
    font-size: var(--body-md-fs);
    color: inherit;
    text-decoration: none;
  }
</style>
