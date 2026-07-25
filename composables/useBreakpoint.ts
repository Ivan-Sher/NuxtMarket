import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useBreakpoint(breakpoint = 768) {
  const isDesktop = ref(false)

  function update() {
    if (typeof window !== 'undefined') {
      isDesktop.value = window.innerWidth >= breakpoint
    }
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', update)
  })

  return { isDesktop }
}
