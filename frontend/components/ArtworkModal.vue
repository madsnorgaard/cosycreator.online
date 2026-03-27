<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="artwork"
        class="modal-backdrop"
        role="dialog"
        :aria-label="artwork.title"
        aria-modal="true"
        @click.self="$emit('close')"
      >
        <div class="modal-box">
          <!-- Close -->
          <button class="modal-close mono" data-hover @click="$emit('close')" aria-label="Close">
            [ ESC ]
          </button>

          <!-- Corner brackets -->
          <span class="mcorner mcorner--tl" aria-hidden="true" />
          <span class="mcorner mcorner--tr" aria-hidden="true" />
          <span class="mcorner mcorner--bl" aria-hidden="true" />
          <span class="mcorner mcorner--br" aria-hidden="true" />

          <!-- Image -->
          <div class="modal-img-wrap">
            <img
              v-if="artwork.imageUrl"
              :src="artwork.imageUrl"
              :alt="artwork.imageAlt"
              class="modal-img"
            />
            <div v-else class="modal-no-img mono">NO PREVIEW AVAILABLE</div>
          </div>

          <!-- Meta -->
          <div class="modal-meta">
            <span v-if="categoryName" class="tag tag--purple modal-cat">{{ categoryName }}</span>
            <div class="modal-text">
              <h2 class="modal-title">{{ artwork.title }}</h2>
              <p v-if="artwork.description" class="modal-desc">{{ artwork.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Artwork, Category } from '~/types'

const props = defineProps<{
  artwork: Artwork | null
  categories: Category[]
}>()

defineEmits<{ close: [] }>()

const categoryName = computed(() => {
  if (!props.artwork?.categoryIds.length) return ''
  const cat = props.categories.find(c => props.artwork!.categoryIds.includes(c.id))
  return cat?.name ?? ''
})

// Close on ESC
onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.artwork) {
      // emit needs to happen via the component
      document.dispatchEvent(new CustomEvent('modal-close'))
    }
  }
  document.addEventListener('keydown', handler)
  onUnmounted(() => document.removeEventListener('keydown', handler))
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(8, 6, 18, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 4vw, 3rem);
}

.modal-box {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  max-width: min(90vw, 900px);
  max-height: 90svh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--glow-purple), 0 32px 80px rgba(0, 0, 0, 0.7);
}

/* ── Close btn ── */
.modal-close {
  position: absolute;
  top: 12px;
  right: 14px;
  z-index: 2;
  background: rgba(12, 10, 20, 0.8);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-muted);
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  padding: 4px 10px;
  transition: all var(--transition);
}
.modal-close:hover {
  color: var(--text);
  border-color: var(--purple);
  background: rgba(168, 85, 247, 0.1);
}

/* ── Corner brackets ── */
.mcorner {
  position: absolute;
  width: 16px;
  height: 16px;
  z-index: 2;
  pointer-events: none;
}
.mcorner--tl { top: 8px;  left: 8px;  border-top: 1px solid var(--purple); border-left: 1px solid var(--purple); }
.mcorner--tr { top: 8px;  right: 8px; border-top: 1px solid var(--purple); border-right: 1px solid var(--purple); }
.mcorner--bl { bottom: 8px; left: 8px;  border-bottom: 1px solid var(--pink); border-left: 1px solid var(--pink); }
.mcorner--br { bottom: 8px; right: 8px; border-bottom: 1px solid var(--pink); border-right: 1px solid var(--pink); }

/* ── Image ── */
.modal-img-wrap {
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

.modal-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 75svh;
  background: var(--bg);
}

.modal-no-img {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-dim);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  background: var(--bg);
}

/* ── Meta ── */
.modal-meta {
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid var(--border);
  background: var(--surface);
}

.modal-cat {
  flex-shrink: 0;
  font-size: 0.5625rem;
}

.modal-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.modal-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}

.modal-desc {
  font-size: 0.8125rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* ── Transition ── */
.modal-enter-active { transition: opacity 0.2s, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
.modal-leave-active { transition: opacity 0.18s, transform 0.18s; }
.modal-enter-from   { opacity: 0; transform: scale(0.93); }
.modal-leave-to     { opacity: 0; transform: scale(0.96); }
</style>
