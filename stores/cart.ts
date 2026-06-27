import { ref, computed } from 'vue'
import { defineStore, skipHydrate } from 'pinia'

const STORAGE_KEY = 'cart'
const API_URL = 'https://shoppe-api-eleet.amvera.io/carts'
const SYNC_DEBOUNCE_MS = 500

export const useCartStore = defineStore('cart', () => {
  //State

  interface CartItem {
    id: string | number
    quantity: number
    price: number
    name?: string
    title?: string
    image?: string
    color?: string
    size?: string
  }

  const items = ref<CartItem[]>([])
  const isSyncing = ref(false)
  const lastSyncedAt = ref<number | null>(null)
  const error = ref<string | null>(null)

  //Getters

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  const isEmpty = computed(() => items.value.length === 0)

  //Синхронизация и хранение

  let syncTimeout: ReturnType<typeof setTimeout> | null = null
  let needsSync = false

  function loadFromLocalStorage() {
    if (import.meta.server) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        items.value = parsed
      }
    } catch {}
  }

  async function syncWithServer() {
    if (isSyncing.value) return
    isSyncing.value = true
    needsSync = false
    error.value = null

    try {
      const payload = {
        items: items.value.map(({ id, quantity }) => ({ id, quantity })),
      }

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 5000)

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      clearTimeout(timeout)

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? `Sync failed: ${res.status}`)
      }

      lastSyncedAt.value = Date.now()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sync cart with server'
      error.value = message
    } finally {
      isSyncing.value = false
      if (needsSync) syncWithServer()
    }
  }

  function persistCart() {
    if (import.meta.server) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
    needsSync = true
    if (syncTimeout) clearTimeout(syncTimeout)
    syncTimeout = setTimeout(() => syncWithServer(), SYNC_DEBOUNCE_MS)
  }

  //Actions

  function addItem(
    product: { id: string | number; price: number; [key: string]: unknown },
    qty = 1,
  ) {
    const existing = items.value.find((i) => i.id === product.id)
    if (existing) {
      existing.quantity += qty
    } else {
      items.value.push({ ...product, quantity: qty })
    }
    persistCart()
  }

  function removeItem(id: string | number) {
    const idx = items.value.findIndex((i) => i.id === id)
    if (idx > -1) {
      items.value.splice(idx, 1)
      persistCart()
    }
  }

  function updateQuantity(id: string | number, qty: number) {
    if (qty <= 0) {
      removeItem(id)
      return
    }
    const item = items.value.find((i) => i.id === id)
    if (item) {
      item.quantity = qty
      persistCart()
    }
  }

  function clearCart() {
    items.value = []
    persistCart()
  }

  loadFromLocalStorage()

  return {
    items: skipHydrate(items),
    isSyncing,
    lastSyncedAt,
    error,
    // getters
    totalItems,
    totalPrice,
    isEmpty,
    // actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
})
