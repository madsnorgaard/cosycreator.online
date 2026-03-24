export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  try {
    const data = await $fetch<any[]>(
      `${config.wpBaseUrl}/wp-json/wp/v2/categories?per_page=50&hide_empty=true`,
    )
    return data.map(c => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      count: c.count,
    }))
  } catch {
    return []
  }
})
