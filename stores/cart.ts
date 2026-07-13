// stores/cart.ts
import { ref, computed } from 'vue'
import { defineStore, skipHydrate } from 'pinia'
import { useCartApi } from '~/composables/api/useCartApi'
import { loadCartFromStorage, saveCartToStorage } from '~/utils/cartStorage'
import type { CartItem } from '~/types/cart'

const SYNC_DEBOUNCE_MS = 500

export const useCartStore = defineStore('cart', () => {
  //State
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

  function formatPrice(price: number): string {
    return `$ ${price.toFixed(2).replace('.', ',')}`
  }

  //Синхронизация и хранение
  let syncTimeout: ReturnType<typeof setTimeout> | null = null
  let needsSync = false

  // Загружаем корзину из localStorage при старте (клиент)
  items.value = loadCartFromStorage()

  async function syncWithServer() {
    if (isSyncing.value) return
    isSyncing.value = true
    needsSync = false
    error.value = null

    try {
      const { cartFetch } = useCartApi()
      await cartFetch(`/carts`, {
        method: 'POST',
        body: { items: items.value.map(({ id, quantity }) => ({ id, quantity })) },
      })
      lastSyncedAt.value = Date.now()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sync cart with server'
      error.value = message
    } finally {
      isSyncing.value = false
      if (needsSync) syncWithServer()
    }
  }

  function persist() {
    saveCartToStorage(items.value)
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
    persist()
  }

  function removeItem(id: string | number) {
    const idx = items.value.findIndex((i) => i.id === id)
    if (idx > -1) {
      items.value.splice(idx, 1)
      persist()
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
      persist()
    }
  }

  function clearCart() {
    items.value = []
    persist()
  }

  /* ==============================
           Публичное API
  ============================== */
  return {
    items: skipHydrate(items),
    isSyncing,
    lastSyncedAt,
    error,
    totalItems,
    totalPrice,
    isEmpty,
    formatPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
})
