<template>
  <div
    v-if="isPointerFine"
    class="cursor"
    :class="{ 'cursor--hover': isHovering, 'cursor--active': isActive }"
    :style="{ transform: `translate(${x - 10}px, ${y - 10}px)` }"
    aria-hidden="true"
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <circle cx="10" cy="10" r="2.5" fill="currentColor"/>
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
  color: var(--lavender-dim);
  transition: color var(--transition), transform 0.06s linear;
  will-change: transform;
}

@media (pointer: fine) {
  :global(html), :global(*) { cursor: none !important; }
}

.cursor--hover {
  color: var(--blush-dim);
}

.cursor svg {
  transition: transform var(--transition);
}

.cursor--active svg {
  transform: scale(0.85);
}

.cursor--hover svg {
  transform: scale(1.3);
}
</style>
