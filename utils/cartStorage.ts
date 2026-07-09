import type { CartItem } from '~/types/cart'

const STORAGE_KEY = 'cart'

export function loadCartFromStorage(): CartItem[] {
  if (import.meta.server) return []

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  if (import.meta.server) return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}
