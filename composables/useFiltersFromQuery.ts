import type { LocationQuery } from 'vue-router'
import { FILTERS_DEFAULTS, VALID_SORT_VALUES } from '~/types/filters'
import type { FiltersType } from '~/types/filters'
import { SortBy } from '~/types/filters'

function getQueryParam(query: LocationQuery, key: string): string {
  const val = query[key]
  return Array.isArray(val) ? (val[0] ?? '') : (val ?? '')
}

export function useFiltersFromQuery(query: LocationQuery): FiltersType {
  const sortByRaw = getQueryParam(query, 'sortBy')
  const validSortBy = VALID_SORT_VALUES.includes(sortByRaw as SortBy)
    ? (sortByRaw as SortBy)
    : FILTERS_DEFAULTS.sortBy

  return {
    searchQuery: getQueryParam(query, 'searchQuery') || FILTERS_DEFAULTS.searchQuery,
    category: getQueryParam(query, 'category') || FILTERS_DEFAULTS.category,
    sortBy: validSortBy,
    priceMin: Number(getQueryParam(query, 'priceMin')) || FILTERS_DEFAULTS.priceMin,
    priceMax: Number(getQueryParam(query, 'priceMax')) || FILTERS_DEFAULTS.priceMax,
    onSale: getQueryParam(query, 'onSale') === 'true',
    inStock: getQueryParam(query, 'inStock') === 'true',
  }
}
