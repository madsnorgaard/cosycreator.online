<template>
  <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav-inner">
      <!-- Logo -->
      <a href="#" class="nav-logo">
        <span class="nav-logo__cc">cc</span>
        <span class="nav-logo__dot">·</span>
        <span class="nav-logo__full">cosy creator</span>
      </a>

      <a href="#about" class="nav-link">about</a>
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
  background: rgba(253, 248, 243, 0.88);
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
  font-weight: 800;
  color: var(--lavender-dim);
}

.nav-logo__dot {
  color: var(--text-dim);
}

.nav-logo__full {
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;

  @media (max-width: 480px) { display: none; }
}

/* ── Nav link ── */
.nav-link {
  color: var(--text-muted);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-decoration: none;
  transition: color var(--transition);
}

.nav-link:hover {
  color: var(--lavender-dim);
}
</style>
