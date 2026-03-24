<template>
  <section id="gallery" class="gallery-section">
    <div class="section gallery-inner">
      <!-- Section header -->
      <div class="gallery-header">
        <div class="gallery-header__left">
          <h2 class="gallery-heading">
            <span class="gallery-heading__label mono">WORKS</span>
          </h2>
          <p class="gallery-count mono">
            {{ filteredArtworks.length }}&nbsp;
            <span>{{ activeCategory ? 'filtered' : 'total' }}</span>
          </p>
        </div>
        <FilterBar />
      </div>

      <!-- Empty state -->
      <div v-if="!loading && filteredArtworks.length === 0" class="gallery-empty">
        <div class="gallery-empty__inner mono">
          <span class="blink">▓</span>
          <p>NO ASSETS FOUND</p>
          <p class="gallery-empty__sub">Upload artwork via the WP admin panel to populate the gallery.</p>
        </div>
      </div>

      <!-- Loading skeleton -->
      <div v-else-if="loading" class="gallery-grid gallery-grid--loading">
        <div v-for="i in 8" :key="i" class="skeleton" />
      </div>

      <!-- Gallery grid -->
      <TransitionGroup
        v-else
        tag="div"
        class="gallery-grid"
        name="gallery-item"
      >
        <ArtworkCard
          v-for="(artwork, index) in filteredArtworks"
          :key="artwork.id"
          :artwork="artwork"
          :categories="categories"
          :style="{ animationDelay: `${index * 40}ms` }"
          class="gallery-card-enter"
          @open="openModal"
        />
      </TransitionGroup>
    </div>

    <!-- Lightbox -->
    <ArtworkModal
      :artwork="selectedArtwork"
      :categories="categories"
      @close="closeModal"
    />
  </section>
</template>

<script setup lang="ts">
import type { Artwork } from '~/types'

const { filteredArtworks, categories, activeCategory, loading } = useWordPress()

const selectedArtwork = ref<Artwork | null>(null)

const openModal  = (a: Artwork) => { selectedArtwork.value = a }
const closeModal = ()            => { selectedArtwork.value = null }

// ESC key handling from ArtworkModal
onMounted(() => {
  document.addEventListener('modal-close', closeModal)
  onUnmounted(() => document.removeEventListener('modal-close', closeModal))
})
</script>

<style scoped>
.gallery-section {
  padding: 5rem 0 6rem;
}

.gallery-inner {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* ── Header ── */
.gallery-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.gallery-header__left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.gallery-heading {
  line-height: 1;
}

.gallery-heading__label {
  font-size: 0.6875rem;
  letter-spacing: 0.3em;
  color: var(--text-muted);
  font-weight: 500;
}

.gallery-count {
  font-size: 0.625rem;
  color: var(--text-dim);
  letter-spacing: 0.1em;
}

/* ── Grid ── */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr));
  gap: 12px;
}

/* ── Stagger animation via CSS class ── */
.gallery-card-enter {
  animation: card-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
}

/* ── Skeleton ── */
.skeleton {
  aspect-ratio: 1 / 1;
  background: var(--surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.04) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

/* ── Empty state ── */
.gallery-empty {
  padding: 6rem 0;
  display: flex;
  justify-content: center;
}

.gallery-empty__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--text-muted);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-align: center;
}

.gallery-empty__sub {
  color: var(--text-dim);
  font-size: 0.625rem;
  max-width: 36ch;
  line-height: 1.8;
}

/* ── TransitionGroup animations ── */
.gallery-item-enter-active { transition: opacity 0.3s, transform 0.35s; }
.gallery-item-leave-active { transition: opacity 0.2s, transform 0.2s; }
.gallery-item-enter-from   { opacity: 0; transform: scale(0.94) translateY(10px); }
.gallery-item-leave-to     { opacity: 0; transform: scale(0.96); }
</style>
