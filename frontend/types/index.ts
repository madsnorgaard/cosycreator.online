export interface WPCategory {
  id: number
  name: string
  slug: string
  count: number
}

export interface Artwork {
  id: number
  title: string
  slug: string
  categoryIds: number[]
  imageUrl: string | null
  imageAlt: string
  width?: number
  height?: number
}
