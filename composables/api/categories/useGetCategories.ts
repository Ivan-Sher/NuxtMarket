import { ref } from 'vue'

export const useGetCategories = () => {
  const data = ref(['rings', 'chains', 'earrings'])
  return { data }
}
