import type { LocationQuery } from 'vue-router'
import type { FiltersType } from '~/types/filters'
import { FILTERS_DEFAULTS } from '~/types/filters'

function getQueryParam(query: LocationQuery, key: string): string {
  const val = query[key]
  return (Array.isArray(val) ? val[0] : val) ?? ''
}

export function useFiltersFromQuery(query: LocationQuery): FiltersType {
  const sortByRaw = getQueryParam(query, 'sortBy')
  const validSortBy = (['price_asc', 'price_desc', 'name', ''] as const).includes(
    sortByRaw as FiltersType['sortBy'],
  )
    ? (sortByRaw as FiltersType['sortBy'])
    : FILTERS_DEFAULTS.sortBy

  return {
    searchQuery: getQueryParam(query, 'searchQuery') || FILTERS_DEFAULTS.searchQuery,
    category: getQueryParam(query, 'category') || FILTERS_DEFAULTS.category,
    sortBy: validSortBy,
    priceMin: Number(getQueryParam(query, 'priceMin')) || FILTERS_DEFAULTS.priceMin,
    priceMax: Number(getQueryParam(query, 'priceMax')) || FILTERS_DEFAULTS.priceMax,
    onSale: getQueryParam(query, 'onSale') === 'true' || FILTERS_DEFAULTS.onSale,
    inStock: getQueryParam(query, 'inStock') === 'true' || FILTERS_DEFAULTS.inStock,
  }
}
