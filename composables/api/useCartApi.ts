import { useRuntimeConfig, useCookie, useNuxtApp } from '#app'
import type { $Fetch } from 'ofetch'

export const useCartApi = () => {
  const nuxtApp = useNuxtApp()
  const $fetch = nuxtApp.$fetch as $Fetch
  const config = useRuntimeConfig()
  const authToken = useCookie<string | null>('authToken')

  const syncCartToServer = (items: { id: string | number; quantity: number }[]) => {
    return $fetch(`${config.public.apiBaseUrl}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken.value ? `Bearer ${authToken.value}` : config.public.apiToken,
      },
      body: { items },
    })
  }

  return { syncCartToServer }
}
