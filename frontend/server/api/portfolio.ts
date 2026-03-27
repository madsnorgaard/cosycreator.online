export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  const categoryFilter = query.category
    ? `&where[category][equals]=${query.category}`
    : ''
  const url = `${config.payloadBaseUrl}/api/artworks?limit=100&depth=1&sort=-createdAt${categoryFilter}`

  try {
    const data = await $fetch<{ docs: any[] }>(url)

    return data.docs.map(doc => ({
      id: doc.id as string,
      title: doc.title as string,
      slug: doc.slug as string,
      categoryIds: doc.category ? [doc.category.id as string] : [],
      imageUrl: (doc.image?.url ?? null) as string | null,
      imageAlt: (doc.image?.alt || doc.title) as string,
      width: (doc.image?.width ?? null) as number | null,
      height: (doc.image?.height ?? null) as number | null,
      description: (doc.description ?? null) as string | null,
    }))
  } catch {
    return []
  }
})
