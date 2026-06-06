export interface FiltersType {
  searchQuery: string
  category: string
  sortBy: 'price_asc' | 'price_desc' | 'name' | ''
  priceMin: number
  priceMax: number
  onSale: boolean
  inStock: boolean
}

export const FILTERS_DEFAULTS: FiltersType = {
  searchQuery: '',
  category: '',
  sortBy: '',
  priceMin: 0,
  priceMax: 0,
  onSale: false,
  inStock: false,
}
