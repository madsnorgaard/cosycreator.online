<template>
  <section id="about" class="about-section">
    <div class="section about-inner">
      <div class="divider" />

      <div class="about-bio">
        <p class="about-label mono">ABOUT</p>
        <h2 class="about-name">Aurora</h2>
        <p class="about-desc">
          Digital artist. Icons, illustrations, and game UI graphics —
          all made on iPad.
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

.about-bio {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 480px;
}

.about-label {
  color: var(--text-muted);
  font-size: 0.6875rem;
  letter-spacing: 0.25em;
}

.about-name {
  font-size: clamp(2.5rem, 6vw, 4rem);
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--purple), var(--pink));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
}

.about-desc {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.7;
}

.about-formats__label {
  color: var(--text-dim);
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;
}

.about-formats__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
