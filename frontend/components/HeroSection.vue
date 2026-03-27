<template>
  <section class="hero">
    <!-- Soft background blobs -->
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-blob hero-blob--lavender" />
      <div class="hero-blob hero-blob--blush" />
      <div class="hero-blob hero-blob--mint" />
    </div>

    <!-- Decorative sparkles -->
    <span class="sparkle sparkle--1" aria-hidden="true">✦</span>
    <span class="sparkle sparkle--2" aria-hidden="true">✦</span>
    <span class="sparkle sparkle--3" aria-hidden="true">✧</span>

    <!-- Content -->
    <div class="hero-content">
      <p class="hero-label">digital art studio</p>

      <h1 class="hero-title">
        <span class="hero-title__line1">cosy</span>
        <span class="hero-title__line2">creator</span>
      </h1>

      <p class="hero-tagline">
        icons&nbsp;·&nbsp;illustrations&nbsp;·&nbsp;game ui
      </p>

      <p class="hero-sub">
        iPad artist. Digital worlds, one pixel at a time.
      </p>

      <a href="#gallery" class="hero-cta">
        see my work
        <span class="hero-cta__arrow">↓</span>
      </a>
    </div>

    <!-- Scroll indicator -->
    <div class="hero-scroll" aria-hidden="true">
      <span class="hero-scroll__text">scroll</span>
      <span class="hero-scroll__line" />
    </div>

    <!-- Wavy bottom divider -->
    <div class="hero-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,36 C180,72 360,0 540,36 C720,72 900,8 1080,36 C1260,64 1380,24 1440,36 L1440,72 L0,72 Z" fill="var(--bg)"/>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 5rem;
  background: linear-gradient(160deg, #fdf0f8 0%, #fdf8f3 55%, #eef0fd 100%);
}

/* ── Soft background blobs (no glow, just tinted) ── */
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.22;
  animation: blob-drift 14s ease-in-out infinite alternate;
}

.hero-blob--lavender {
  width: 55vw; height: 55vw;
  max-width: 640px; max-height: 640px;
  top: -15%; left: -8%;
  background: radial-gradient(circle, var(--lavender), transparent 70%);
  animation-delay: 0s;
}

.hero-blob--blush {
  width: 45vw; height: 45vw;
  max-width: 540px; max-height: 540px;
  top: -20%; right: -5%;
  background: radial-gradient(circle, var(--blush), transparent 70%);
  animation-delay: -5s;
}

.hero-blob--mint {
  width: 35vw; height: 35vw;
  max-width: 420px; max-height: 420px;
  bottom: 10%; left: 35%;
  background: radial-gradient(circle, var(--mint), transparent 70%);
  animation-delay: -9s;
  opacity: 0.15;
}

@keyframes blob-drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(2%, 3%) scale(1.06); }
}

/* ── Sparkles ── */
.sparkle {
  position: absolute;
  color: var(--lavender);
  font-size: 1rem;
  pointer-events: none;
  user-select: none;
  animation: float 3s ease-in-out infinite;
}

.sparkle--1 { top: 22%; left: 12%; font-size: 1.25rem; animation-delay: 0s; color: var(--lavender); }
.sparkle--2 { top: 30%; right: 14%; font-size: 0.875rem; animation-delay: -1.5s; color: var(--blush); }
.sparkle--3 { bottom: 28%; left: 22%; font-size: 0.75rem; animation-delay: -0.8s; color: var(--mint); }

/* ── Content ── */
.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
}

.hero-label {
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: lowercase;
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0;
  line-height: 0.92;
}

.hero-title__line1 {
  font-size: clamp(4rem, 17vw, 14rem);
  letter-spacing: 0.06em;
  color: var(--lavender-dim);
  font-weight: 800;
}

.hero-title__line2 {
  font-size: clamp(4rem, 17vw, 14rem);
  letter-spacing: 0.06em;
  color: var(--blush-dim);
  font-weight: 800;
}

.hero-tagline {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.hero-sub {
  font-size: 1rem;
  color: var(--text-muted);
  font-weight: 400;
  max-width: 28ch;
}

/* ── CTA ── */
.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.7rem 2rem;
  background: var(--lavender);
  color: #fff;
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  border-radius: var(--radius-pill);
  transition: all var(--transition);
  box-shadow: var(--shadow-sm);
  margin-top: 0.25rem;
}

.hero-cta:hover {
  background: var(--lavender-dim);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.hero-cta__arrow {
  display: inline-block;
  animation: bob 1.8s ease-in-out infinite;
}

@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(3px); }
}

/* ── Scroll hint ── */
.hero-scroll {
  position: absolute;
  bottom: 4.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--text-dim);
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  z-index: 1;
}

.hero-scroll__text {
  text-transform: lowercase;
}

.hero-scroll__line {
  width: 1px;
  height: 28px;
  background: linear-gradient(to bottom, var(--border), transparent);
  animation: scroll-line 2s ease-in-out infinite;
}

@keyframes scroll-line {
  0%, 100% { opacity: 0.4; transform: scaleY(1); transform-origin: top; }
  50%       { opacity: 0.9; }
}

/* ── Wave divider ── */
.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 0;
  z-index: 2;
}

.hero-wave svg {
  width: 100%;
  height: 72px;
  display: block;
}
</style>
