<script setup lang="ts">
  const model = defineModel<string>()

  defineProps<{
    type?: string
    placeholder: string
    error?: string
    class: string
  }>()
</script>
<template>
  <div class="input-wrapper">
    <input v-model="model" :type="type" :placeholder="placeholder" :class="class" />
    <span v-if="error" class="input__error">{{ error }}</span>
  </div>
</template>
