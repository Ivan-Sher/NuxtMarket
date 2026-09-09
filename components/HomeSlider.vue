<script setup>
  import { useGetImages } from '~/composables/api/images/useGetImages'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Pagination, Autoplay } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/pagination'

  const SLIDES_COUNT = 10
  const photos = useGetImages(SLIDES_COUNT)
</script>

<template>
  <div class="slider-wrapper">
    <Swiper
      :modules="[Pagination, Autoplay]"
      :pagination="{
        type: 'bullets',
        clickable: true,
      }"
      :autoplay="{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }"
      :lazy="true"
      :slides-per-view="1"
      :space-between="50"
    >
      <SwiperSlide v-for="(photo, index) in photos" :key="photo.id">
        <img
          :src="photo.url"
          :alt="`Slide ${photo.id}`"
          :loading="index === 0 ? 'eager' : 'lazy'"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
          width="1248"
          height="646"
          decoding="async"
        />
        <SlideOverlay />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
  .slider-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1248px;
    height: 646px;
    aspect-ratio: 1248 / 646;
    overflow: hidden;
    border-radius: 16px;

    @media (max-width: $bp-sm) {
      height: auto;
      aspect-ratio: 1248 / 354;
    }
  }

  .swiper-slide {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }

  :deep(.swiper-slide img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  :deep(.swiper-pagination) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :deep(.swiper-pagination-bullet) {
    width: 9px;
    height: 9px;
    background: #fff;
    border-radius: 50%;
    opacity: 1;
  }

  :deep(.swiper-pagination-bullet-active) {
    width: 16px;
    height: 16px;
    background: transparent;
    border: 1px solid #fff;
    border-radius: 50%;
    opacity: 1;
  }

  @media (max-width: $bp-sm) {
    :deep(.swiper-pagination-bullet) {
      width: 4px;
      height: 4px;
    }

    :deep(.swiper-pagination-bullet-active) {
      width: 7px;
      height: 7px;
    }
  }
</style>
