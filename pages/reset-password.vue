<script setup lang="ts">
  import { useResetPassword } from '@/composables/useResetPassword'

  const { email, emailError, submit } = useResetPassword()
</script>

<template>
  <div class="reset-password">
    <form class="reset-password__form" @submit.prevent="submit">
      <h1 class="reset-password__title">Have you Forgotten Your Password ?</h1>
      <p class="reset-password__title-mobile">Lost password ?</p>
      <p class="reset-password__description">
        If you've forgotten your password, enter your e-mail address and we'll send you an e-mail
      </p>

      <BaseInput
        v-model="email"
        type="email"
        placeholder="Email"
        class="reset-password__input"
        :error="emailError"
      />

      <BaseButton
        type="submit"
        variant="primary"
        class="reset-password__submit"
        @submit.prevent="submit"
      >
        RESET PASSWORD
      </BaseButton>
    </form>
  </div>
</template>

<style scoped lang="scss">
  .reset-password {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    @media (max-width: $bp-sm) {
      padding: 40px 16px;
    }
  }

  .reset-password__form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .reset-password__title {
    margin: 0 0 12px;
    font-size: var(--h4-fs);
    font-weight: var(--h4-fw);
    line-height: var(--h4-lh);
    color: var(--black);
    text-align: center;
    letter-spacing: 0%;

    @media (max-width: $bp-sm) {
      display: none;
    }
  }

  .reset-password__title-mobile {
    display: none;

    @media (max-width: $bp-sm) {
      display: block;
      font-size: var(--h1-fs);
      line-height: var(--h3-lh);
      text-align: center;
    }
  }

  .reset-password__description {
    max-width: 500px;
    margin: 0 auto;
    margin-bottom: 40px;
    font-size: var(--h3-fs);
    font-weight: var(--h3-fw);
    line-height: var(--h3-lh);
    color: var(--black);
    text-align: center;
    letter-spacing: 0%;
  }

  :deep(.input-wrapper) {
    display: flex;
  }

  :deep(.reset-password__input) {
    width: 100%;
    max-width: 500px;
    padding: 15px 0;
    margin: 0 auto;
    margin-bottom: 60px;
    outline: none;
    border: none;
    border-bottom: 1px solid var(--gray);

    &::placeholder {
      color: var(--dark-gray);
    }

    &:focus {
      border-color: var(--accent);
    }

    &.input--error {
      border-color: var(--error);
    }
  }

  .reset-password__submit {
    width: 100%;
    max-width: 500px;
    height: 53px;
    padding: 14px 24px;
    margin: 0 auto;
    font-family: var(--font-family);
    font-size: var(--body-md-fs);
    font-weight: var(--body-md-fw);
    line-height: 100%;
    color: var(--white);
    text-transform: uppercase;
    letter-spacing: 0;
    cursor: pointer;
    background: var(--black);
    border: none;
    border-radius: 8px;
    transition: background 0.2s;

    &:hover:not(:disabled) {
      background: var(--accent);
    }

    &:active:not(:disabled) {
      opacity: 0.85;
    }
  }
</style>
