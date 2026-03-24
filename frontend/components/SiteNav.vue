<template>
  <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav-inner">
      <!-- Logo -->
      <a href="#" class="nav-logo" data-hover>
        <span class="nav-logo__cc">CC</span>
        <span class="nav-logo__dot">·</span>
        <span class="nav-logo__full mono">COSY CREATOR</span>
      </a>

      <a href="#about" class="nav-link mono" data-hover>ABOUT</a>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { y: scrollY } = useWindowScroll()
const scrolled = computed(() => scrollY.value > 60)
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.25rem clamp(1.5rem, 5vw, 4rem);
  transition: background var(--transition-slow), border-color var(--transition-slow);
  border-bottom: 1px solid transparent;
}

.nav--scrolled {
  background: rgba(12, 10, 20, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom-color: var(--border);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1440px;
  margin: 0 auto;
}

/* ── Logo ── */
.nav-logo {
  display: flex;
  align-items: baseline;
  gap: 6px;
  text-decoration: none;
}

.nav-logo__cc {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--purple);
  text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
}

.nav-logo__dot {
  color: var(--text-dim);
}

.nav-logo__full {
  color: var(--text-muted);
  font-size: 0.6875rem;
  letter-spacing: 0.15em;

  /* Hide on small screens */
  @media (max-width: 480px) { display: none; }
}

/* ── Right side ── */
.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-status {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--text-muted);
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
}

.nav-status__dot {
  color: var(--teal);
  font-size: 0.625rem;
}

.nav-link {
  color: var(--text-muted);
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: color var(--transition);
}

.nav-link:hover {
  color: var(--text);
}
</style>
