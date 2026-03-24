<template>
  <section id="about" class="about-section">
    <div class="section about-inner">
      <div class="divider" />

      <div class="about-grid">
        <!-- Left: bio -->
        <div class="about-bio">
          <p class="about-label mono">ABOUT</p>
          <h2 class="about-name">Aurora</h2>
          <p class="about-desc">
            Digital artist creating icons, illustrations, and game UI
            graphics on iPad. Every pixel made with intention.
          </p>

          <div class="about-formats">
            <p class="about-formats__label mono">EXPORT FORMATS</p>
            <div class="about-formats__tags">
              <span class="tag">PNG</span>
              <span class="tag">SVG</span>
              <span class="tag">GIF</span>
              <span class="tag">PDF</span>
              <span class="tag">PSD</span>
            </div>
          </div>
        </div>

        <!-- Right: commission CTA -->
        <div class="about-commission">
          <div class="commission-card">
            <!-- Brackets -->
            <span class="cc-corner cc-corner--tl" aria-hidden="true" />
            <span class="cc-corner cc-corner--br" aria-hidden="true" />

            <p class="commission-status">
              <span class="commission-dot blink">●</span>
              <span class="mono">AVAILABLE FOR COMMISSIONS</span>
            </p>

            <p class="commission-desc">
              Icons · Character art · Game UI
              <br />Loading screens · App graphics
            </p>

            <a
              href="mailto:aurora@cosycreator.online"
              class="commission-cta"
              data-hover
            >
              GET IN TOUCH →
            </a>

            <p class="commission-ipad mono">
              // all work created on iPad
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding-bottom: 6rem;
}

.about-inner {
  display: flex;
  flex-direction: column;
}

/* ── Two-column grid ── */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  padding: 1rem 0;
}

@media (max-width: 700px) {
  .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
}

/* ── Bio ── */
.about-label {
  color: var(--text-muted);
  font-size: 0.6875rem;
  letter-spacing: 0.25em;
  margin-bottom: 0.75rem;
}

.about-name {
  font-size: clamp(2.5rem, 6vw, 4rem);
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--purple), var(--pink));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
  line-height: 1;
}

.about-desc {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.7;
  max-width: 36ch;
  margin-bottom: 2rem;
}

/* ── Formats ── */
.about-formats__label {
  color: var(--text-dim);
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  margin-bottom: 0.75rem;
}

.about-formats__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* ── Commission card ── */
.commission-card {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.cc-corner {
  position: absolute;
  width: 16px;
  height: 16px;
  pointer-events: none;
}
.cc-corner--tl {
  top: 10px; left: 10px;
  border-top: 1px solid var(--purple);
  border-left: 1px solid var(--purple);
}
.cc-corner--br {
  bottom: 10px; right: 10px;
  border-bottom: 1px solid var(--pink);
  border-right: 1px solid var(--pink);
}

.commission-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.commission-dot {
  color: var(--teal);
  font-size: 0.625rem;
}

.commission-desc {
  color: var(--text);
  font-size: 1rem;
  line-height: 1.7;
}

.commission-cta {
  display: inline-block;
  padding: 0.65rem 1.5rem;
  background: linear-gradient(135deg, var(--purple-dim), var(--purple));
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  border-radius: var(--radius);
  align-self: flex-start;
  transition: all var(--transition);
  box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.3);
}

.commission-cta:hover {
  background: linear-gradient(135deg, var(--purple), var(--pink));
  box-shadow: 0 0 0 1px rgba(244, 114, 182, 0.3), var(--glow-pink);
  transform: translateY(-1px);
}

.commission-ipad {
  color: var(--text-dim);
  font-size: 0.625rem;
  letter-spacing: 0.08em;
}
</style>
