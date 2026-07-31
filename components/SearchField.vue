<script setup lang="ts">
  import SearchMobileIcon from '~/components/icons/SearchMobileIcon.vue'
</script>
<template>
  <div class="search">
    <SearchMobileIcon class="search__icon" />
    <input type="text" class="search__input" placeholder="Search" />
  </div>
</template>
<style scoped lang="scss">
  .search {
    position: relative;
    display: flex;
    align-items: center;

    &__icon {
      position: absolute;
      top: 15%;
      left: 10px;
      color: #999;
      pointer-events: none;
    }

    &__input {
      width: 100%;
      height: 32px;
      padding-left: 30px;
      margin-bottom: 39px;
      font-size: var(--body-md-fs);
      outline: none;
      background-color: var(--light-gray);
      border: none;
      border-radius: 4px;
    }
  }
</style>
