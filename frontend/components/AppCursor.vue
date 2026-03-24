<template>
  <div
    v-if="isPointerFine"
    class="cursor"
    :class="{ 'cursor--hover': isHovering, 'cursor--active': isActive }"
    :style="{ transform: `translate(${x - 12}px, ${y - 12}px)` }"
    aria-hidden="true"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <!-- Outer square -->
      <rect x="1.5" y="1.5" width="21" height="21" rx="1"
        stroke="currentColor" stroke-width="1" opacity="0.5" />
      <!-- Cross hairs -->
      <line x1="12" y1="1.5" x2="12" y2="7"   stroke="currentColor" stroke-width="1.5" />
      <line x1="12" y1="17"  x2="12" y2="22.5" stroke="currentColor" stroke-width="1.5" />
      <line x1="1.5" y1="12" x2="7"   y2="12"  stroke="currentColor" stroke-width="1.5" />
      <line x1="17"  y1="12" x2="22.5" y2="12" stroke="currentColor" stroke-width="1.5" />
      <!-- Centre dot -->
      <rect x="10.5" y="10.5" width="3" height="3" fill="currentColor" />
    </svg>
  </div>
</template>

<script setup lang="ts">
const { x, y } = useMouse({ type: 'client' })
const isHovering = ref(false)
const isActive   = ref(false)
const isPointerFine = ref(false)

onMounted(() => {
  isPointerFine.value = window.matchMedia('(pointer: fine)').matches
  if (!isPointerFine.value) return

  const onOver = (e: MouseEvent) => {
    const el = e.target as HTMLElement
    isHovering.value = !!el.closest('a, button, [role="button"], [data-hover]')
  }
  const onDown = () => { isActive.value = true }
  const onUp   = () => { isActive.value = false }

  document.addEventListener('mouseover', onOver)
  document.addEventListener('mousedown', onDown)
  document.addEventListener('mouseup',   onUp)

  onUnmounted(() => {
    document.removeEventListener('mouseover', onOver)
    document.removeEventListener('mousedown', onDown)
    document.removeEventListener('mouseup',   onUp)
  })
})
</script>

<style scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  pointer-events: none;
  color: var(--purple);
  transition: color var(--transition), transform 0.06s linear;
  mix-blend-mode: normal;
  will-change: transform;
}

.cursor--hover {
  color: var(--pink);
}

.cursor svg {
  filter: drop-shadow(0 0 4px currentColor);
  transition: transform var(--transition);
}

.cursor--active svg {
  transform: scale(0.8);
}
</style>
