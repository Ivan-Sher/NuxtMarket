<script setup lang="ts">
  import { useEmailSubscription } from '~/composables/useEmailSubscription'

  import ArrowForm from './icons/ArrowForm.vue'
  import BaseInput from './ui/BaseInput.vue'

  const { email, emailError, submitEmail } = useEmailSubscription()
</script>
<template>
  <div>
    <form class="footer-form" @submit.prevent="submitEmail">
      <BaseInput
        v-model="email"
        :error="emailError"
        placeholder="Give an email, get the newsletter."
        type="text"
        class="footer__input"
      />
      <button type="submit" class="footer-button"><ArrowForm /></button>
    </form>
    <label class="footer-form__checkbox-label">
      <input type="checkbox" class="footer-form__checkbox" />
      i agree to the website's terms and conditions
    </label>
  </div>
</template>
<style scoped lang="scss">
  .footer-button {
    all: unset;
    height: 30px;
    cursor: pointer;
  }

  .footer-button svg {
    @media (max-width: $bp-sm) {
      width: 15px;
    }
  }

  .footer-form {
    display: flex;
    justify-content: end;
    order: 1;
    width: 100%;
    max-width: 396px;
    border-bottom: 1px solid #000;

    @media (max-width: $bp-md) {
      max-width: 280px;
      height: 38px;
    }

    @media (max-width: $bp-sm) {
      box-sizing: border-box;
      justify-content: space-between;
      width: 100%;
      max-width: 383px;
      height: 26px;
      margin: 0 auto;
      font-size: var(--body-sm-fs);
    }
  }

  .footer-form :deep(.input__error) {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    font-size: var(--body-sm-fs);
    color: red;
  }

  .footer-form :deep(.input-wrapper) {
    position: relative;
  }

  .footer-form :deep(.footer__input) {
    width: 370px;
    padding-bottom: 8px;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: 27px;
    color: inherit;
    appearance: none;
    outline: none;
    background: transparent;
    border: none;
    box-shadow: none;

    @media (max-width: $bp-md) {
      max-width: 250px;
    }

    @media (max-width: $bp-sm) {
      max-width: 263px;
    }
  }

  .footer-form__checkbox-label {
    display: none;
    gap: 8px;
    align-items: center;
    margin-top: 24px;

    @media (max-width: $bp-sm) {
      display: flex;
      gap: 0;
      width: 288px;
      font-size: var(--body-sm-fs);
    }
  }
</style>
