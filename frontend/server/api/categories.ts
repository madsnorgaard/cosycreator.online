export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  try {
    const data = await $fetch<{ docs: any[] }>(
      `${config.payloadBaseUrl}/api/categories?limit=50`,
    )
    return data.docs.map(c => ({
      id: c.id as string,
      name: c.name as string,
      slug: c.slug as string,
      count: 0,
    }))
  } catch {
    return []
  }
})
