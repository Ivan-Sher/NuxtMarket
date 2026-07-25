<script setup>
  import { ref } from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import 'swiper/css'
  import 'swiper/css/pagination'

  defineProps({
    images: {
      type: Array,
      required: true,
    },
  })

  const activeIndex = ref(0)

  const onSlideChange = (swiper) => {
    activeIndex.value = swiper.activeIndex
  }
</script>
<template>
  <div class="product-gallery">
    <!-- Десктопная версия -->
    <div class="gallery-desktop">
      <div class="thumbnails">
        <img
          v-for="(src, index) in images"
          :key="index"
          :src="src"
          :alt="`Фото ${index + 1}`"
          :class="['thumbnail', { active: activeIndex === index }]"
          @click="activeIndex = index"
        />
      </div>
      <div class="main-image">
        <img :src="images[activeIndex]" alt="Основное изображение" />
      </div>
    </div>

    <!-- Мобильная версия (слайдер) -->
    <div class="gallery-mobile">
      <Swiper
        :slides-per-view="1"
        :space-between="30"
        :pagination="{ clickable: true }"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="(src, index) in images" :key="index">
          <img :src="src" :alt="`Фото ${index + 1}`" class="slide-image" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .product-gallery {
    width: 100%;
  }

  .gallery-desktop {
    display: flex;
    gap: 40px;
  }

  .thumbnails {
    display: flex;
    flex: 0 0 80px;
    flex-direction: column;
    gap: 40px;
  }

  .thumbnail {
    width: 120px;
    height: 120px;
    cursor: pointer;
    object-fit: cover;
    border: 2px solid transparent;
    border-radius: 4px;
    opacity: 0.6;
    transition:
      opacity 0.2s,
      border 0.2s;
  }

  .thumbnail.active {
    border-color: var(--black);
    opacity: 1;
  }

  .main-image {
    flex: 1;
  }

  .main-image img {
    width: 540px;
    height: 100%;
    border-radius: 8px;
  }

  .gallery-mobile {
    display: none;
  }

  @media (max-width: $bp-md) {
    .main-image img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }

  @media (max-width: $bp-sm) {
    .gallery-desktop {
      display: none;
    }

    .gallery-mobile {
      display: block;
      overflow: hidden;
    }

    .product-gallery {
      width: 100%;
      max-width: 100%;
      overflow: hidden;
    }

    .slide-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    :deep(.swiper) {
      width: 100%;
      overflow: hidden;
    }
  }

  @media (max-width: $bp-xs) {
    .gallery-mobile {
      width: 100%;
      max-width: 280px;
    }
  }
</style>
