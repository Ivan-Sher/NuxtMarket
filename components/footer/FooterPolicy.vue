<template>
  <div class="footer-policy">
    © 2021 Shelly.
    <NuxtLink to="/terms" class="footer__policy-link">Terms of use</NuxtLink>
    and
    <NuxtLink to="/privacy" class="footer__policy-link">privacy policy.</NuxtLink>
  </div>
</template>
<style scoped lang="scss">
  .footer__policy {
    font-size: var(--body-lg-fs);
    line-height: var(--body-lg-lh);

    @media (max-width: $bp-sm) {
      width: 288px;
      font-size: var(--body-sm-fs);
      color: var(--dark-gray);
    }
  }

  .footer__policy-link {
    color: var(--dark-gray);
    text-decoration: none;
  }
</style>
