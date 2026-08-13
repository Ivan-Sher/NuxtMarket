<script setup lang="ts">
  type ButtonVariant = 'primary' | 'secondary' | 'transparent'
  withDefaults(
    defineProps<{
      variant?: ButtonVariant
      disabled?: boolean
      loading?: boolean
    }>(),
    {
      variant: 'primary',
      disabled: false,
      loading: false,
    },
  )
</script>

<template>
  <button
    type="button"
    class="btn"
    :class="[`btn--${variant}`, { 'btn--loading': loading, 'btn--disabled': disabled || loading }]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="btn__spinner" />
    <span :class="{ 'btn__text--hidden': loading }">
      <slot />
    </span>
  </button>
</template>
<style scoped lang="scss">
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    transition:
      color 0.2s,
      border-color 0.2s,
      opacity 0.2s;

    &--primary {
      color: var(--white);
      background: transparent;
      border: 1px solid var(--white);

      &:hover {
        background: var(--black);
      }

      &:active {
        background: var(--accent);
      }
    }

    &--secondary {
      color: var(--white);
      background: transparent;
      border: 1px solid var(--black);

      &:hover {
        color: #000;
        background: var(--secondary);
      }

      &:active {
        color: var(--white);
        background: transparent;
        border-color: var(--black);
      }
    }

    &--transparent {
      padding: 0;
      cursor: pointer;
      background: transparent;
      border: none;
    }

    &--disabled {
      pointer-events: none;
      cursor: not-allowed;
      opacity: 0.5;
    }

    &--loading {
      cursor: wait;
    }

    &__spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      vertical-align: middle;
      text-align: center;
      border: 2px solid currentcolor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: btn-spin 0.6s linear infinite;
    }

    &__text--hidden {
      display: none;
    }
  }

  @keyframes btn-spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
