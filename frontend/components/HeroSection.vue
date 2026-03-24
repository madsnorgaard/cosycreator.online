<template>
  <section class="hero">
    <!-- Aurora background layers -->
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-orb hero-orb--purple" />
      <div class="hero-orb hero-orb--pink" />
      <div class="hero-orb hero-orb--teal" />
      <div class="hero-scanlines" />
    </div>

    <!-- Corner brackets (decorative) -->
    <span class="hcorner hcorner--tl" aria-hidden="true" />
    <span class="hcorner hcorner--br" aria-hidden="true" />

    <!-- Content -->
    <div class="hero-content">
      <p class="hero-label mono">DIGITAL ART STUDIO</p>

      <h1 class="hero-title">
        <span class="hero-title__line1">COSY</span>
        <span class="hero-title__line2">CREATOR</span>
      </h1>

      <p class="hero-tagline mono">
        ICONS&nbsp;&nbsp;·&nbsp;&nbsp;ILLUSTRATIONS&nbsp;&nbsp;·&nbsp;&nbsp;GAME&nbsp;UI
      </p>

      <p class="hero-sub">
        iPad artist. Digital worlds, one pixel at a time.
      </p>

      <div class="hero-actions">
        <a href="#gallery" class="hero-cta" data-hover>
          VIEW WORK
          <span class="hero-cta__arrow">↓</span>
        </a>
        <a href="#about" class="hero-secondary mono" data-hover>
          ABOUT AURORA
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero-scroll" aria-hidden="true">
      <span class="mono">SCROLL</span>
      <span class="hero-scroll__line" />
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
}

/* ── Aurora background ── */
.hero-bg {
  position: absolute;
  inset: 0;
  background: var(--bg);
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.18;
  animation: orb-drift 12s ease-in-out infinite alternate;
}

.hero-orb--purple {
  width: 60vw; height: 60vw;
  max-width: 700px; max-height: 700px;
  top: -15%; left: -10%;
  background: radial-gradient(circle, var(--purple), transparent 70%);
  animation-delay: 0s;
}

.hero-orb--pink {
  width: 50vw; height: 50vw;
  max-width: 600px; max-height: 600px;
  top: -20%; right: -5%;
  background: radial-gradient(circle, var(--pink), transparent 70%);
  animation-delay: -4s;
  opacity: 0.14;
}

.hero-orb--teal {
  width: 40vw; height: 40vw;
  max-width: 500px; max-height: 500px;
  bottom: -10%; left: 30%;
  background: radial-gradient(circle, var(--teal), transparent 70%);
  animation-delay: -8s;
  opacity: 0.1;
}

@keyframes orb-drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(3%, 4%) scale(1.08); }
}

.hero-scanlines {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  pointer-events: none;
}

/* ── Corner brackets ── */
.hcorner {
  position: absolute;
  width: 48px;
  height: 48px;
  opacity: 0.3;
}
.hcorner--tl {
  top: 6rem; left: clamp(1.5rem, 5vw, 4rem);
  border-top: 1px solid var(--purple);
  border-left: 1px solid var(--purple);
}
.hcorner--br {
  bottom: 6rem; right: clamp(1.5rem, 5vw, 4rem);
  border-bottom: 1px solid var(--purple);
  border-right: 1px solid var(--purple);
}

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
  font-size: 0.6875rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0;
  line-height: 0.92;
}

.hero-title__line1 {
  font-size: clamp(4.5rem, 18vw, 16rem);
  letter-spacing: 0.18em;
  color: transparent;
  -webkit-text-stroke: 1.5px var(--purple);
  text-stroke: 1.5px var(--purple);
  text-shadow: 0 0 80px rgba(168, 85, 247, 0.25);
}

.hero-title__line2 {
  font-size: clamp(4.5rem, 18vw, 16rem);
  letter-spacing: 0.18em;
  background: linear-gradient(135deg, var(--purple) 30%, var(--pink) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: none;
  filter: drop-shadow(0 0 40px rgba(244, 114, 182, 0.3));
}

.hero-tagline {
  font-size: 0.6875rem;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.hero-sub {
  font-size: 1rem;
  color: var(--text-muted);
  font-weight: 400;
  max-width: 28ch;
}

/* ── Actions ── */
.hero-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.65rem 1.75rem;
  background: linear-gradient(135deg, var(--purple-dim), var(--purple));
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: var(--radius);
  transition: all var(--transition);
  box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.4), var(--glow-purple);
}

.hero-cta:hover {
  background: linear-gradient(135deg, var(--purple), var(--pink));
  box-shadow: 0 0 0 1px rgba(244, 114, 182, 0.4), var(--glow-pink);
  transform: translateY(-2px);
}

.hero-cta__arrow {
  display: inline-block;
  animation: bob 1.8s ease-in-out infinite;
}

@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(3px); }
}

.hero-secondary {
  color: var(--text-muted);
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-decoration: none;
  border-bottom: 1px solid var(--border);
  padding-bottom: 2px;
  transition: color var(--transition), border-color var(--transition);
}

.hero-secondary:hover {
  color: var(--text);
  border-color: var(--purple);
}

/* ── Scroll hint ── */
.hero-scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-dim);
  font-size: 0.5625rem;
  letter-spacing: 0.2em;
  z-index: 1;
}

.hero-scroll__line {
  width: 1px;
  height: 32px;
  background: linear-gradient(to bottom, var(--text-dim), transparent);
  animation: scroll-line 2s ease-in-out infinite;
}

@keyframes scroll-line {
  0%, 100% { opacity: 0.3; transform: scaleY(1); transform-origin: top; }
  50%       { opacity: 0.8; }
}
</style>
