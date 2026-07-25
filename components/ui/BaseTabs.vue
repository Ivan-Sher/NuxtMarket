<script setup lang="ts">
  import ProductIcon from '~/components/icons/ProductIcon.vue'

  interface Tab {
    title: string
    content?: string
    badge?: string | number
    tabClass?: string
  }

  const modelValue = defineModel<number>({ default: 0 })
  const expandedAccordion = defineModel<number | null>('expandedAccordion', { default: null })

  withDefaults(
    defineProps<{
      tabs: Tab[]
      isDesktop?: boolean
    }>(),
    {
      isDesktop: true,
    },
  )

  function selectTab(index: number) {
    modelValue.value = index
  }

  function toggleAccordion(index: number) {
    expandedAccordion.value = expandedAccordion.value === index ? null : index
  }
</script>
<template>
  <div class="base-tabs">
    <div v-if="isDesktop" class="tabs-header">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        type="button"
        :class="['tab-btn', { active: modelValue === index }]"
        @click="selectTab(index)"
      >
        {{ tab.title }}
      </button>
    </div>

    <div v-if="isDesktop" class="tabs-content">
      <div
        v-for="(tab, index) in tabs"
        v-show="modelValue === index"
        :key="index"
        :class="tab.tabClass"
      >
        <slot :name="`tab-${index}`">
          {{ tab.content }}
        </slot>
      </div>
    </div>

    <div v-else class="accordion">
      <div v-for="(tab, index) in tabs" :key="index" class="accordion-item">
        <button type="button" class="accordion-header" @click="toggleAccordion(index)">
          {{ tab.title }}
          <span v-if="tab.badge" class="badge">{{ tab.badge }}</span>
          <span class="arrow"><ProductIcon /></span>
        </button>
        <div v-show="expandedAccordion === index" class="accordion-body" :class="tab.tabClass">
          <slot :name="`tab-${index}`">
            {{ tab.content }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .base-tabs {
    width: 100%;
  }

  .tabs-header {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 2px solid #eee;
  }

  .tab-btn {
    position: relative;
    height: max-content;
    padding: 20px 50px;
    margin-bottom: -2px;
    font-size: 20px;
    font-weight: 400;
    line-height: 26px;
    color: #888;
    cursor: pointer;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    transition:
      color 0.2s,
      border-color 0.2s;
  }

  .tab-btn:first-child {
    padding: 20px 30px 20px 0;
  }

  .tab-btn.active {
    color: #000;
    border-bottom-color: #000;
  }

  .tab-btn .badge {
    padding: 1px 8px;
    font-size: 12px;
    color: #000;
  }

  .tabs-content {
    padding: 20px 0;
  }

  .tab-description {
    font-size: 16px;
    font-weight: 400;
    line-height: 27px;
    color: #707070;
  }

  .tab-additional {
    font-size: 16px;
    font-weight: 400;
    line-height: 27px;
    color: #707070;
  }

  .accordion {
    display: none;
  }

  .accordion-item {
    border-bottom: 1px solid #eee;
  }

  .accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px 0;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    background: none;
    border: none;
  }

  .accordion-header .badge {
    padding: 1px 8px;
    margin-left: 6px;
    font-size: 12px;
    color: #fff;
    background: #000;
    border-radius: 50%;
  }

  .accordion-header .arrow {
    font-size: 14px;
    color: #888;
  }

  .accordion-body {
    padding-bottom: 20px;
  }

  @media (width <= 767px) {
    .tabs-header,
    .tabs-content {
      display: none;
    }

    .accordion {
      display: block;
      border-top: 1px solid #d8d8d8;
      border-bottom: 1px solid #d8d8d8;
    }
  }
</style>
