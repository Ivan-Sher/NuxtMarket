<script setup lang="ts">
  import { useLoginForm } from '@/composables/useLoginForm'

  const { authStore, username, password, usernameError, passwordError, submit } = useLoginForm()
</script>
<template>
  <div class="auth-form">
    <form class="auth-form__fields" @submit.prevent="submit">
      <BaseInput
        v-model="username"
        type="text"
        placeholder="Username"
        class="auth-form__input"
        :error="usernameError"
      />

      <BaseInput
        v-model="password"
        type="password"
        placeholder="Password"
        class="auth-form__input"
        :error="passwordError"
      />
      <div class="auth-form__checkbox">
        <input type="checkbox" class="form-group__checkbox" />
        <p class="checkbox-p">Remember me</p>
      </div>
      <BaseButton
        type="submit"
        variant="primary"
        class="auth-form__submit"
        :disabled="authStore.isLoading"
        :loading="authStore.isLoading"
      >
        SIGN IN
      </BaseButton>
      <NuxtLink to="/reset-password" class="forgot-p">Have you forgotten your password?</NuxtLink>
    </form>
  </div>
</template>

<style scoped lang="scss">
  .auth-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto;

    @media (max-width: $bp-sm) {
      padding: 0;
    }
  }

  .auth-form__title {
    margin: 0 0 40px;
    font-size: var(--h4-fs);
    font-weight: var(--h4-fw);
    line-height: var(--h4-lh);
    color: var(--black);
    text-align: center;

    @media (max-width: $bp-sm) {
      margin-bottom: 32px;
      font-size: var(--h2-fs);
      line-height: var(--h2-lh);
    }
  }

  .auth-form__fields {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
  }

  :deep(.auth-form__input) {
    width: 100%;
    padding: 15px 0;
    margin: 0;
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

  .auth-form__submit {
    width: 100%;
    padding: 14px 24px;
    margin-top: 70px;
    font-size: var(--body-md-fs);
    font-weight: 700;
    color: var(--white);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
    background: var(--black);
    border: none;
    border-radius: 4px;

    @media (max-width: $bp-sm) {
      margin-top: 0;
    }
  }

  .auth-form__checkbox {
    display: flex;
  }

  .checkbox-p {
    margin-left: 10px;
    font-size: 13px;
    font-weight: 400;
    line-height: 30px;
    color: var(--black);
    text-transform: capitalize;
  }

  .forgot-p {
    margin: 0;
    color: var(--black);
    text-align: center;
    text-decoration: none;
  }
</style>
