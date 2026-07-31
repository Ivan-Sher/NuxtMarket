<script setup lang="ts">
  import ProfileIcon from '~/components/icons/ProfileIcon.vue'
  import LogoutIcon from '~/components/icons/LogoutIcon.vue'

  const navLinksMobile = [
    { label: 'Shop', to: '/shop' },
    { label: 'Blog', to: '/blog' },
    { label: 'Our Story', to: '/our-story' },
    { label: 'Contact', to: '/contact' },
    { label: 'Terms Of Services', to: '/terms-of-services' },
    { label: 'Shipping And Returns', to: '/shipping-and-returns' },
  ]

  const navAccount = [
    { label: 'My Account', to: '/account', icon: ProfileIcon },
    { label: 'Logout', to: '/logout', icon: LogoutIcon },
  ]
</script>
<template>
  <nav class="mobile-nav">
    <NuxtLink v-for="link in navLinksMobile" :key="link.to" :to="link.to" class="mobile-nav__link">
      {{ link.label }}
    </NuxtLink>
    <hr class="mobile-nav__divider" />
    <NuxtLink v-for="link in navAccount" :key="link.to" :to="link.to" class="mobile-nav__link">
      <component :is="link.icon" />
      {{ link.label }}
    </NuxtLink>
  </nav>
</template>
<style scoped lang="scss">
  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 24px;

    &__link {
      display: flex;
      gap: 12px;
      align-items: center;
      font-size: 20px;
      color: inherit;
      text-decoration: none;
    }

    &__divider {
      margin: 0;
      border: none;
      border-top: 1px solid var(--light-gray);
    }
  }
</style>
