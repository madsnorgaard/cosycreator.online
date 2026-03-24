<template>
  <article
    class="card"
    :class="{ 'card--no-image': !artwork.imageUrl }"
    data-hover
    tabindex="0"
    :aria-label="`${artwork.title} — ${categoryName}`"
    @click="$emit('open', artwork)"
    @keydown.enter="$emit('open', artwork)"
    @keydown.space.prevent="$emit('open', artwork)"
  >
    <!-- Image -->
    <div class="card-img-wrap">
      <img
        v-if="artwork.imageUrl"
        :src="artwork.imageUrl"
        :alt="artwork.imageAlt"
        class="card-img"
        loading="lazy"
        decoding="async"
      />
      <div v-else class="card-placeholder">
        <span class="mono">NO PREVIEW</span>
      </div>

      <!-- HUD Overlay on hover -->
      <div class="card-overlay">
        <div class="card-overlay__inner">
          <span v-if="categoryName" class="card-overlay__cat tag tag--purple">
            {{ categoryName }}
          </span>
          <p class="card-overlay__title">{{ artwork.title }}</p>
          <span class="card-overlay__cta mono">→ VIEW</span>
        </div>
      </div>
    </div>

    <!-- Corner brackets (CSS) -->
    <span class="card-corner card-corner--tl" aria-hidden="true" />
    <span class="card-corner card-corner--br" aria-hidden="true" />
  </article>
</template>

<script setup lang="ts">
import type { Artwork, WPCategory } from '~/types'

const props = defineProps<{
  artwork: Artwork
  categories: WPCategory[]
}>()

defineEmits<{ open: [artwork: Artwork] }>()

const categoryName = computed(() => {
  if (!props.artwork.categoryIds.length) return ''
  const cat = props.categories.find(c => props.artwork.categoryIds.includes(c.id))
  return cat?.name ?? ''
})
</script>

<style scoped>
.card {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--surface);
  aspect-ratio: 1 / 1;
  transition:
    border-color var(--transition),
    box-shadow   var(--transition),
    transform    var(--transition);
}

.card:focus-visible {
  outline: 2px solid var(--purple);
  outline-offset: 3px;
}

.card:hover,
.card:focus-visible {
  border-color: rgba(168, 85, 247, 0.5);
  box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.15), var(--glow-purple);
  transform: translateY(-3px);
}

/* ── Image ── */
.card-img-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover .card-img {
  transform: scale(1.06);
}

/* ── Placeholder ── */
.card-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-2);
  color: var(--text-dim);
  font-size: 0.625rem;
  letter-spacing: 0.1em;
}

/* ── Hover overlay ── */
.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(8, 6, 18, 0.92) 0%,
    rgba(8, 6, 18, 0.5)  40%,
    transparent          70%
  );
  display: flex;
  align-items: flex-end;
  opacity: 0;
  transition: opacity var(--transition);
}

.card:hover .card-overlay,
.card:focus-visible .card-overlay {
  opacity: 1;
}

.card-overlay__inner {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transform: translateY(6px);
  transition: transform var(--transition);
  width: 100%;
}

.card:hover .card-overlay__inner,
.card:focus-visible .card-overlay__inner {
  transform: translateY(0);
}

.card-overlay__cat {
  align-self: flex-start;
  font-size: 0.5625rem;
}

.card-overlay__title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
  letter-spacing: 0;
}

.card-overlay__cta {
  font-size: 0.625rem;
  color: var(--purple);
  letter-spacing: 0.1em;
}

/* ── Corner brackets ── */
.card-corner {
  position: absolute;
  width: 14px;
  height: 14px;
  opacity: 0;
  transition: opacity var(--transition);
  pointer-events: none;
}

.card:hover .card-corner,
.card:focus-visible .card-corner {
  opacity: 1;
}

.card-corner--tl {
  top: 8px; left: 8px;
  border-top: 1.5px solid var(--purple);
  border-left: 1.5px solid var(--purple);
}
.card-corner--br {
  bottom: 8px; right: 8px;
  border-bottom: 1.5px solid var(--pink);
  border-right: 1.5px solid var(--pink);
}
</style>
