<template>
  <Transition name="loading">
    <div v-if="visible" class="loading-screen" aria-hidden="true">
      <div class="loading-inner">
        <div class="loading-dots">
          <span v-for="i in 3" :key="i" class="loading-dot" :style="{ animationDelay: `${(i - 1) * 0.2}s` }" />
        </div>

        <h1 class="loading-title">
          <span class="loading-title__cosy">cosy</span>
          <span class="loading-title__creator">creator</span>
        </h1>

        <div class="loading-bar-wrap">
          <div class="loading-bar">
            <div class="loading-bar__fill" :style="{ width: `${progress}%` }" />
          </div>
        </div>

        <p class="loading-status">{{ statusLabel }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const visible = ref(true)
const progress = ref(0)

const steps = [
  { label: 'getting cosy...',   target: 30,  delay: 0 },
  { label: 'loading artwork...', target: 65,  delay: 400 },
  { label: 'almost ready!',     target: 88,  delay: 750 },
  { label: 'welcome ✦',         target: 100, delay: 1050 },
]

const statusLabel = ref(steps[0].label)

onMounted(() => {
  steps.forEach(({ label, target, delay }) => {
    setTimeout(() => {
      statusLabel.value = label
      const start = progress.value
      const diff  = target - start
      const step  = diff / 12
      let i = 0
      const tick = setInterval(() => {
        progress.value = Math.min(target, start + step * ++i)
        if (progress.value >= target) clearInterval(tick)
      }, 16)
    }, delay)
  })

  setTimeout(() => { visible.value = false }, 1600)
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: linear-gradient(160deg, #fdf0f8 0%, #fdf8f3 55%, #eef0fd 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}

/* ── Bouncing dots ── */
.loading-dots {
  display: flex;
  gap: 8px;
}

.loading-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--lavender);
  animation: dot-bounce 0.8s ease-in-out infinite alternate;
}

.loading-dot:nth-child(2) { background: var(--blush); }
.loading-dot:nth-child(3) { background: var(--mint); }

@keyframes dot-bounce {
  from { transform: translateY(0); opacity: 0.6; }
  to   { transform: translateY(-8px); opacity: 1; }
}

/* ── Title ── */
.loading-title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.04em;
  display: flex;
  gap: 0.3em;
}

.loading-title__cosy {
  color: var(--lavender-dim);
}

.loading-title__creator {
  color: var(--blush-dim);
}

/* ── Progress bar ── */
.loading-bar-wrap {
  width: clamp(200px, 35vw, 320px);
}

.loading-bar {
  width: 100%;
  height: 6px;
  background: var(--border);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.loading-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--lavender), var(--blush));
  border-radius: var(--radius-pill);
  transition: width 0.1s linear;
}

/* ── Status ── */
.loading-status {
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  min-height: 1.4em;
}

/* ── Transition ── */
.loading-enter-active { transition: opacity 0.3s; }
.loading-leave-active { transition: opacity 0.6s 0.1s; }
.loading-enter-from,
.loading-leave-to     { opacity: 0; }
</style>
