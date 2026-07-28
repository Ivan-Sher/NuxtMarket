import type { Product } from '~/types/api'

export interface ProductInfoProps {
  product: Product
  rating?: number
  reviewCount?: number
  isMobile?: boolean
  showFullDescription?: boolean
  quantity?: number
}
