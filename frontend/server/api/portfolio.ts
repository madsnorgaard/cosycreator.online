export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  const categoryParam = query.category ? `&categories=${query.category}` : ''
  const url = `${config.wpBaseUrl}/wp-json/wp/v2/posts?_embed&per_page=100&status=publish&orderby=date&order=desc${categoryParam}`

  try {
    const posts = await $fetch<any[]>(url)

    return posts.map(post => {
      const media = post._embedded?.['wp:featuredmedia']?.[0]
      return {
        id: post.id,
        title: post.title.rendered.replace(/<[^>]+>/g, ''),
        slug: post.slug,
        categoryIds: post.categories ?? [],
        imageUrl: media?.source_url ?? null,
        imageAlt: media?.alt_text || post.title.rendered.replace(/<[^>]+>/g, ''),
        width: media?.media_details?.width ?? null,
        height: media?.media_details?.height ?? null,
      }
    })
  } catch {
    return []
  }
})
