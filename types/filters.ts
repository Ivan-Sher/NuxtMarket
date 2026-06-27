export enum SortBy {
  PriceAsc = 'price_asc',
  PriceDesc = 'price_desc',
  Name = 'name',
  Default = '',
}

export enum FilterKey {
  SearchQuery = 'searchQuery',
  Category = 'category',
  SortBy = 'sortBy',
  PriceMin = 'priceMin',
  PriceMax = 'priceMax',
  OnSale = 'onSale',
  InStock = 'inStock',
}

export interface FiltersType {
  searchQuery: string
  category: string
  sortBy: SortBy
  priceMin: number
  priceMax: number
  onSale: boolean
  inStock: boolean
}

export const FILTERS_DEFAULTS: FiltersType = {
  searchQuery: '',
  category: '',
  sortBy: SortBy.Default,
  priceMin: 0,
  priceMax: 0,
  onSale: false,
  inStock: false,
}

export const VALID_SORT_VALUES = [
  SortBy.PriceAsc,
  SortBy.PriceDesc,
  SortBy.Name,
  SortBy.Default,
] as const
