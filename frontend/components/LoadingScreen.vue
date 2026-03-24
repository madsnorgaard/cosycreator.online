<template>
  <Transition name="loading">
    <div v-if="visible" class="loading-screen" aria-hidden="true">
      <!-- Corner brackets -->
      <span class="corner corner--tl" />
      <span class="corner corner--tr" />
      <span class="corner corner--bl" />
      <span class="corner corner--br" />

      <div class="loading-inner">
        <p class="loading-studio mono">// STUDIO ASSETS</p>

        <h1 class="loading-title">
          <span class="loading-title__cc">COSY</span>
          <span class="loading-title__sep"> </span>
          <span class="loading-title__creator">CREATOR</span>
        </h1>

        <div class="loading-bar-wrap">
          <div class="loading-bar">
            <div class="loading-bar__fill" :style="{ width: `${progress}%` }" />
          </div>
          <span class="mono loading-percent">{{ Math.floor(progress) }}%</span>
        </div>

        <p class="loading-status mono">
          <span class="blink">█</span>&nbsp;{{ statusLabel }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const visible = ref(true)
const progress = ref(0)

const steps = [
  { label: 'INITIALISING_CANVAS...', target: 30,  delay: 0 },
  { label: 'LOADING_ASSETS...',      target: 65,  delay: 400 },
  { label: 'RENDERING_PIXELS...',    target: 88,  delay: 750 },
  { label: 'STUDIO_READY',           target: 100, delay: 1050 },
]

const statusLabel = ref(steps[0].label)

onMounted(() => {
  steps.forEach(({ label, target, delay }) => {
    setTimeout(() => {
      statusLabel.value = label
      // Animate progress to target over ~200ms
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

  // Hide after bar completes + brief pause
  setTimeout(() => { visible.value = false }, 1600)
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ── Animated corner brackets ── */
.corner {
  position: absolute;
  width: 32px;
  height: 32px;
}
.corner--tl { top: 24px; left: 24px;  border-top: 1px solid var(--purple); border-left: 1px solid var(--purple); }
.corner--tr { top: 24px; right: 24px; border-top: 1px solid var(--purple); border-right: 1px solid var(--purple); }
.corner--bl { bottom: 24px; left: 24px;  border-bottom: 1px solid var(--purple); border-left: 1px solid var(--purple); }
.corner--br { bottom: 24px; right: 24px; border-bottom: 1px solid var(--purple); border-right: 1px solid var(--purple); }

/* ── Inner content ── */
.loading-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}

.loading-studio {
  color: var(--text-muted);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
}

.loading-title {
  font-size: clamp(2.5rem, 8vw, 5.5rem);
  letter-spacing: 0.25em;
  text-transform: uppercase;
  line-height: 1;
}

.loading-title__cc {
  color: var(--purple);
  text-shadow: 0 0 60px rgba(168, 85, 247, 0.7), 0 0 120px rgba(168, 85, 247, 0.3);
}

.loading-title__creator {
  color: var(--pink);
  text-shadow: 0 0 60px rgba(244, 114, 182, 0.7), 0 0 120px rgba(244, 114, 182, 0.3);
}

/* ── Progress bar ── */
.loading-bar-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  width: clamp(240px, 40vw, 400px);
}

.loading-bar {
  flex: 1;
  height: 3px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.loading-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--purple), var(--pink));
  border-radius: 2px;
  transition: width 0.1s linear;
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.6);
}

.loading-percent {
  color: var(--text-muted);
  font-size: 0.75rem;
  min-width: 3ch;
  text-align: right;
}

/* ── Status label ── */
.loading-status {
  color: var(--text-muted);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  min-height: 1.2em;
}

/* ── Transition ── */
.loading-enter-active { transition: opacity 0.3s; }
.loading-leave-active { transition: opacity 0.6s 0.1s; }
.loading-enter-from,
.loading-leave-to     { opacity: 0; }
</style>
