<script setup lang="ts">
  type ButtonVariant = 'primary' | 'secondary' | 'transparent'
  withDefaults(
    defineProps<{
      variant?: ButtonVariant
    }>(),
    {
      variant: 'primary',
    },
  )
</script>

<template>
  <button type="button" class="btn" :class="`btn--${variant}`">
    <slot />
  </button>
</template>
<style scoped lang="scss">
  .btn {
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    transition:
      color 0.2s,
      border-color 0.2s;

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
      color: var(--black);
      background: transparent;
      border: 1px solid var(--white);

      &:hover {
        color: #000;
        background: var(--secondary);
      }

      &:active {
        color: var(--black);
        background: var(--accent);
        border-color: var(--accent);
      }
    }

    &--transparent {
      padding: 0;
      cursor: pointer;
      background: transparent;
      border: none;
    }
  }
</style>
