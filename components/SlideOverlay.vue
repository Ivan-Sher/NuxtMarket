<script setup lang="ts">
  import BaseButton from './ui/BaseButton.vue'
</script>

<template>
  <div class="overlay">
    <p class="overlay__title">Gold big hoops</p>
    <p class="overlay__price">$ 68.00</p>
    <BaseButton variant="primary">View Product</BaseButton>
  </div>
</template>
<style scoped lang="scss">
  .overlay {
    position: absolute;
    top: 226px;
    left: 40px;
    z-index: 10;
    color: #fff;

    @media (max-width: $bp-sm) {
      top: 235px;
      left: 8px;
    }
  }

  .overlay__title {
    @include text(h4);

    margin-top: 0;
    margin-bottom: 16px;

    @media (max-width: $bp-sm) {
      margin-bottom: 3px;
      font-size: 20px;
      line-height: 26px;
    }
  }

  .overlay__price {
    @include text(h5);

    margin: 0;

    @media (max-width: $bp-sm) {
      font-size: 14px;
      line-height: 22px;
    }
  }

  .overlay__btn {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 193px;
    height: 53px;
    margin-top: 50px;
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 6px;

    @media (max-width: $bp-sm) {
      width: 92px;
      height: 32px;
      margin-top: 10px;
      font-size: 12px;
    }
  }
</style>
