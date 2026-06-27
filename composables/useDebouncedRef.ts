import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function useDebouncedRef<T>(source: Ref<T>, delay: number): Ref<T> {
  const debounced = ref<T>(source.value) as Ref<T>

  watch(source, (newValue) => {
    const timer = setTimeout(() => {
      debounced.value = newValue
    }, delay)

    return () => clearTimeout(timer)
  })

  return debounced
}
