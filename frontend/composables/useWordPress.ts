import type { Artwork, WPCategory } from '~/types'

export const useWordPress = () => {
  const artworks = useState<Artwork[]>('artworks', () => [])
  const categories = useState<WPCategory[]>('categories', () => [])
  const activeCategory = useState<number | null>('activeCategory', () => null)
  const loading = ref(false)

  const filteredArtworks = computed(() => {
    if (!activeCategory.value) return artworks.value
    return artworks.value.filter(a => a.categoryIds.includes(activeCategory.value!))
  })

  const setCategory = (id: number | null) => {
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
