<template>
  <article
    class="card"
    :class="{ 'card--no-image': !artwork.imageUrl }"
    tabindex="0"
    :aria-label="`${artwork.title} - ${categoryName}`"
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
        <span>✦</span>
      </div>

      <!-- Hover overlay -->
      <div class="card-overlay">
        <div class="card-overlay__inner">
          <span v-if="categoryName" class="card-overlay__cat tag tag--lavender">
            {{ categoryName }}
          </span>
          <p class="card-overlay__title">{{ artwork.title }}</p>
          <span class="card-overlay__cta">view →</span>
        </div>
      </div>
    </div>
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
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--surface);
  aspect-ratio: 1 / 1;
  transition:
    border-color var(--transition),
    box-shadow   var(--transition),
    transform    var(--transition);
  cursor: pointer;
}

.card:focus-visible {
  outline: 2px solid var(--lavender);
  outline-offset: 3px;
}

.card:hover,
.card:focus-visible {
  border-color: rgba(196, 160, 224, 0.6);
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
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
  transform: scale(1.05);
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
  font-size: 1.5rem;
}

/* ── Hover overlay ── */
.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(92, 74, 58, 0.85) 0%,
    rgba(92, 74, 58, 0.4)  40%,
    transparent            70%
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
  color: #fff;
  line-height: 1.2;
}

.card-overlay__cta {
  font-size: 0.6875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.04em;
}
</style>
