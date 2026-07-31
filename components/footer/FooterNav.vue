<script setup lang="ts">
  const footerLinks = [
    { label: 'CONTACT', to: '/shop' },
    { label: 'TERMS OF SERVICES', to: '/blog' },
    { label: 'SHIPPING AND RETURNS', to: '/our-story' },
  ]
</script>
<template>
  <nav class="footer-nav">
    <NuxtLink v-for="link in footerLinks" :key="link.to" :to="link.to" class="footer-nav-link">
      {{ link.label }}
    </NuxtLink>
  </nav>
</template>
<style scoped lang="scss">
  .footer-nav {
    display: flex;
    gap: 40px;

    @media (max-width: $bp-md) {
      gap: 10px;
    }

    @media (max-width: $bp-sm) {
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 40px;
    }
  }

  .footer-nav-link {
    font-size: var(--body-lg-fs);
    line-height: var(--body-lg-lh);
    color: var(--dark-gray);
    text-decoration: none;

    @media (max-width: $bp-md) {
      font-size: var(--body-md-fs);
    }

    @media (max-width: $bp-sm) {
      width: 250px;
      font-size: var(--body-sm-fs);
      line-height: 20px;
    }
  }
</style>
