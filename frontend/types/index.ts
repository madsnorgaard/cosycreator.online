export interface Category {
  id: string
  name: string
  slug: string
  count: number
}

export interface Artwork {
  id: string
  title: string
  slug: string
  categoryIds: string[]
  imageUrl: string | null
  imageAlt: string
  width?: number | null
  height?: number | null
}
