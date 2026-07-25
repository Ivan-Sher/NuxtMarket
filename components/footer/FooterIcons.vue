<script setup lang="ts">
  import TwitterIcon from '~/components/icons/TwitterIcon.vue'
  import FacebookIcon from '~/components/icons/FacebookIcon.vue'
  import InstagramIcon from '~/components/icons/InstagramIcon.vue'

  const footerIcons = [
    { id: 'instagram', icon: InstagramIcon, to: '/instagram' },
    { id: 'facebook', icon: FacebookIcon, to: '/facebook' },
    { id: 'twitter', icon: TwitterIcon, to: '/twitter' },
  ]
</script>
<template>
  <div class="footer-icons">
    <span class="footer-icons__follow">
      Follow us
      <span class="footer-icons__line" />
    </span>
    <NuxtLink v-for="link in footerIcons" :key="link.id" :to="link.to" class="footer__icon-link">
      <component :is="link.icon" />
    </NuxtLink>
  </div>
</template>
<style scoped lang="scss">
  .footer-icons {
    display: flex;
    gap: 30px;

    @media (max-width: $bp-sm) {
      gap: 16px;
    }
  }

  .footer-icons svg {
    @media (max-width: $bp-sm) {
      width: 12px;
      height: 12px;
    }
  }

  .footer-icons__follow {
    display: none;
    gap: 8px;
    align-items: center;
    font-size: var(--body-sm-fs);

    @media (max-width: $bp-sm) {
      display: flex;
    }
  }

  .footer-icons__line {
    display: block;
    width: 47px;
    height: 1px;
    background: #000;
  }
</style>
