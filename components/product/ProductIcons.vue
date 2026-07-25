<script setup lang="ts">
  import TwitterIcon from '~/components/icons/TwitterIcon.vue'
  import FacebookIcon from '~/components/icons/FacebookIcon.vue'
  import InstagramIcon from '~/components/icons/InstagramIcon.vue'
  import GmailIcon from '~/components/icons/GmailIcon.vue'

  const productIcons = [
    { id: 'gmail', icon: GmailIcon, to: '/gmail' },
    { id: 'facebook', icon: FacebookIcon, to: '/facebook' },
    { id: 'instagram', icon: InstagramIcon, to: '/instagram' },
    { id: 'twitter', icon: TwitterIcon, to: '/twitter' },
  ]
</script>
<template>
  <div class="product-icons">
    <NuxtLink v-for="link in productIcons" :key="link.id" :to="link.to" class="product__icon-link">
      <component :is="link.icon" />
    </NuxtLink>
  </div>
</template>
<style scoped lang="scss">
  .product-icons {
    display: flex;
    gap: 30px;

    @media (max-width: $bp-sm) {
      gap: 16px;
    }
  }

  .product-icons svg {
    @media (max-width: $bp-sm) {
      width: 12px;
      height: 12px;
    }
  }

  .product-icons__follow {
    display: none;
    gap: 8px;
    align-items: center;
    font-size: var(--body-sm-fs);

    @media (max-width: $bp-sm) {
      display: flex;
    }
  }

  .product-icons__line {
    display: block;
    width: 47px;
    height: 1px;
    background: var(--black);
  }
</style>
