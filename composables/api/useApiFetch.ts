import { useFetch, useCookie, useRuntimeConfig } from '#app'
import { computed, isRef } from 'vue'
import type { UseFetchOptions } from 'nuxt/app'

export const useApiFetch = <DataT = unknown>(request: string, options?: UseFetchOptions<DataT>) => {
  const config = useRuntimeConfig()
  const authToken = useCookie<string | null>('authToken')

  if (!config.public.apiBaseUrl) {
    throw new Error('API_BASE_URL is not set')
  }

  const defaults: UseFetchOptions<DataT> = {
    baseURL: config.public.apiBaseUrl,
    key: computed(() => {
      const query = isRef(options?.query) ? options.query.value : options?.query
      return request + JSON.stringify(query)
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken.value ? `Bearer ${authToken.value}` : config.public.apiToken,
    },
  }

  const params = { ...defaults, ...options }

  return useFetch(request, params)
}
