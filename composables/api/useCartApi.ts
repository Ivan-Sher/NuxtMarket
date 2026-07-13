import { useRuntimeConfig, useCookie, useNuxtApp } from '#app'
import type { $Fetch, FetchOptions } from 'ofetch'

export const useCartApi = () => {
  const nuxtApp = useNuxtApp()
  const $fetch = nuxtApp.$fetch as $Fetch
  const config = useRuntimeConfig()
  const authToken = useCookie<string | null>('authToken')

  const cartFetch = (url: string, options?: FetchOptions) => {
    return $fetch(url, {
      baseURL: config.public.apiBaseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken.value ? `Bearer ${authToken.value}` : config.public.apiToken,
        ...options?.headers,
      },
      ...options,
    })
  }

  return { cartFetch }
}
