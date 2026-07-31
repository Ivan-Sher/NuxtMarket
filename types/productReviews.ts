import type { Review } from '~/composables/useProductReviews'

export interface ProductReviewsProps {
  reviews: Review[]
  errors: Record<string, string>
  successMessage: string
}
