<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '~/stores/auth'

  const authStore = useAuthStore()

  const tabs = [{ title: 'Sign In' }, { title: 'Register' }]
  const activeTab = ref(0)
</script>

<template>
  <div class="account-page">
    <div class="account-container">
      <div class="account-container__header">
        <p>My Account</p>
      </div>

      <!-- 1. Если пользователь авторизован — Личный кабинет -->
      <div v-if="authStore.isAuthenticated" class="profile-card">
        <p class="profile-card__welcome">
          Welcome back, <strong>{{ authStore.username || 'User' }}</strong
          >!
        </p>

        <BaseButton
          type="button"
          variant="primary"
          class="profile-card__logout"
          @click="authStore.logout"
        >
          LOG OUT
        </BaseButton>
      </div>

      <!-- 2. Если пользователь не авторизован — Вкладки входа / регистрации -->
      <BaseTabs v-else v-model="activeTab" :tabs="tabs" :is-desktop="true">
        <template #tab-0>
          <AuthForm />
        </template>
        <template #tab-1>
          <!-- Поскольку в auth-server включена авторегистрация, та же форма регистрирует нового пользователя -->
          <AuthForm />
        </template>
      </BaseTabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .account-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    padding: 0 16px;
  }

  .account-container {
    width: 100%;
    max-width: 500px;
  }

  .account-container__header {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;

    @include text(h4);

    @media (max-width: $bp-sm) {
      @include text(h1);
    }
  }

  /* Стили блока личного кабинета */
  .profile-card {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding: 32px 16px;
    background-color: var(--light-gray);
    border-radius: 8px;
  }

  .profile-card__welcome {
    margin: 0;
    font-size: var(--body-md-fs);
    color: var(--black);
    text-align: center;

    strong {
      color: var(--accent);
    }
  }

  .profile-card__logout {
    width: 100%;
    max-width: 240px;
    padding: 12px 24px;
    font-weight: 700;
    cursor: pointer;
  }

  :deep(.tabs-header) {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    background-color: var(--light-gray);
  }

  :deep(.tabs-content) {
    display: block;
  }

  :deep(.tab-btn) {
    width: 100%;
    max-width: 236px;
    padding: 12px 80px;
    color: var(--black);
    border: 1px solid var(--light-gray);
    border-bottom: 130px;

    @media (max-width: $bp-md) {
      padding: 10px 50px;
      font-size: var(--body-md-fs);
    }
  }

  :deep(.tab-btn.active) {
    padding: 12px 80px;
    color: var(--black);
    background-color: var(--white);
    border-bottom: none;
    border-radius: 8px;
    box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 10%);

    @media (max-width: $bp-md) {
      padding: 10px 50px;
    }
  }

  :deep(.tab-btn:first-child) {
    padding: 12px 80px;

    @media (max-width: $bp-md) {
      padding: 10px 50px;
    }
  }

  .coming-soon {
    padding: 40px 0;
    margin: 0;
    font-size: var(--body-md-fs);
    color: var(--dark-gray);
    text-align: center;
  }
</style>
