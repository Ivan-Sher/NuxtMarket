<!-- Тестовый вариант -->
<script setup>
  import { computed } from 'vue'
  import { clearError, useRouter } from '#app'

  const props = defineProps({
    error: {
      type: Object,
      default: () => ({ statusCode: 404 }),
    },
  })

  const errorMessage = computed(() => {
    const code = props.error.statusCode || 404
    const messages = {
      400: 'Bad request; please check your input and try again.',
      401: 'You are not authorized; please log in.',
      403: 'You do not have permission to view this page.',
      404: 'This page not found; back to home and start again.',
      500: 'Internal server error; please try again later.',
      503: "Service unavailable; we'll be back soon.",
    }
    return messages[code] || 'Something went wrong; please try again.'
  })

  const router = useRouter()

  const goHome = async () => {
    await clearError({ redirect: '/' })
    await router.push('/')
  }
</script>
<template>
  <div class="error-page">
    <div class="error-container">
      <h1 class="error-code">{{ error.statusCode || 404 }} ERROR</h1>
      <p class="error-message">
        {{ errorMessage }}
      </p>
      <button class="btn-homepage" @click="goHome">HOMEPAGE</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  .error-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 24px;
    color: #1a1a1a;
    background: #faf9f8;
  }

  .error-container {
    width: 100%;
    max-width: 620px;
    text-align: center;
    animation: fade-up 0.6s ease-out both;
  }

  .error-code {
    margin-bottom: 16px;
    font-size: clamp(48px, 12vw, 96px);
    font-weight: 800;
    line-height: 1.2;
    color: #1a1a1a;
    letter-spacing: 4px;
  }

  .error-message {
    max-width: 480px;
    margin: 0 auto 36px;
    font-size: clamp(18px, 2.4vw, 24px);
    font-weight: 400;
    line-height: 1.6;
    color: #555;
  }

  .btn-homepage {
    display: inline-block;
    padding: 18px 56px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 3px;
    cursor: pointer;
    background: #1a1a1a;
    border: none;
    border-radius: 60px;
    box-shadow: 0 8px 28px rgb(26 26 26 / 15%);
    transition:
      background 0.25s ease,
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  .btn-homepage:hover {
    background: #333;
    box-shadow: 0 14px 36px rgb(26 26 26 / 22%);
    transform: translateY(-3px);
  }

  .btn-homepage:active {
    box-shadow: 0 4px 12px rgb(26 26 26 / 15%);
    transform: translateY(0);
  }

  @keyframes fade-up {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: $bp-sm) {
    .error-container {
      padding: 0 8px;
    }

    .error-code {
      font-size: 40px;
      letter-spacing: 2px;
    }

    .error-message {
      padding: 0 6px;
      margin-bottom: 28px;
      font-size: 16px;
    }

    .btn-homepage {
      width: 100%;
      max-width: 280px;
      padding: 14px 36px;
      font-size: 14px;
      letter-spacing: 2px;
    }
  }

  @media (width <= 400px) {
    .error-code {
      font-size: 32px;
    }

    .error-message {
      font-size: 14px;
    }

    .btn-homepage {
      max-width: 240px;
      padding: 12px 28px;
      font-size: 13px;
    }
  }
</style>
