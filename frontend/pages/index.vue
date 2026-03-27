<template>
  <main>
    <HeroSection />
    <GallerySection />
    <AboutSection />

    <!-- Footer -->
    <footer class="footer section">
      <div class="footer-inner">
        <p class="mono footer-copy">
          © {{ new Date().getFullYear() }} aurora · cosy creator
        </p>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
const { artworks, categories } = usePayload()

// Fetch all data server-side
const [{ data: catData }, { data: artData }] = await Promise.all([
  useAsyncData('categories', () => $fetch<any[]>('/api/categories')),
  useAsyncData('artworks',   () => $fetch<any[]>('/api/portfolio')),
])

if (catData.value)  categories.value = catData.value
if (artData.value)  artworks.value   = artData.value

useHead({
  title: 'Cosy Creator - Icons · Illustrations · Game UI',
  meta: [
    {
      name: 'description',
      content: 'Digital art studio by Aurora. Icons, illustrations, game UI and loading screens - made on iPad.',
    },
    { property: 'og:title',       content: 'Cosy Creator' },
    { property: 'og:description', content: 'Digital art studio. Icons · Illustrations · Game UI.' },
    { property: 'og:type',        content: 'website' },
  ],
})
</script>

<style scoped>
.footer {
  padding: 2rem clamp(1.5rem, 5vw, 4rem);
  border-top: 1px solid var(--border);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-copy {
  color: var(--text-dim);
  font-size: 0.625rem;
  letter-spacing: 0.1em;
}
</style>
