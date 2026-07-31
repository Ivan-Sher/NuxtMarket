<script setup lang="ts">
  import HeaderLine from '~/components/icons/HeaderLine.vue'
  import HeaderLogo from './HeaderLogo.vue'
</script>
<template>
  <div>
    <header class="header">
      <div class="header__inner header-inner">
        <HeaderLogo class="header-inner__logo" />
        <div class="header-inner__content header-inner-content">
          <HeaderNav class="header-inner-content__nav" />
          <span class="header-inner-content__span"><HeaderLine /></span>
          <HeaderActions class="header-inner-content__icons" />
          <HeaderBurger class="header-inner-content__burger" />
        </div>
      </div>
    </header>
    <DrawerMenu name="menu">
      <SearchField />
      <MobileNav />
    </DrawerMenu>
  </div>
</template>

<style scoped lang="scss">
  .header {
    &__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1200px;
      height: 64px;
      padding: 0 24px;
      margin: 0 auto;

      @media (max-width: $bp-md) {
        box-sizing: border-box;
        width: 100%;
        height: 48px;
        padding: 0 16px;
      }
    }

    &-inner-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .header-inner-content__span {
      padding: 0 48px;

      @media (max-width: $bp-md) {
        display: none;
      }
    }
  }
</style>
