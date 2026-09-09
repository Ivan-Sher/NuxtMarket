import type { SliderImage } from '~/types/sliderImages'

export const useGetImages = (limit = 5) => {
  const images: SliderImage[] = Array.from({ length: limit }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/1248/646?random=${i + 1}`,
  }))

  return images
}
