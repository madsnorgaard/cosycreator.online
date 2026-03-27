import type { Artwork, Category } from '~/types'

export const usePayload = () => {
  const artworks = useState<Artwork[]>('artworks', () => [])
  const categories = useState<Category[]>('categories', () => [])
  const activeCategory = useState<string | null>('activeCategory', () => null)
  const loading = ref(false)

  const filteredArtworks = computed(() => {
    if (!activeCategory.value) return artworks.value
    return artworks.value.filter(a => a.categoryIds.includes(activeCategory.value!))
  })

  const setCategory = (id: string | null) => {
    activeCategory.value = id
  }

  return {
    artworks,
    categories,
    filteredArtworks,
    activeCategory,
    loading,
    setCategory,
  }
}
