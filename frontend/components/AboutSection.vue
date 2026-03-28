<template>
  <section id="about" class="about-section">
    <div class="section about-inner">
      <div class="divider" />

      <div class="about-bio">
        <p class="about-label">about</p>
        <h2 class="about-name">Cosy Creator</h2>
        <p class="about-desc">
          Digital artist. Icons, illustrations, and game UI graphics —
          all made on iPad.
        </p>

        <div class="about-formats">
          <p class="about-formats__label">export formats</p>
          <div class="about-formats__tags">
            <span class="tag tag--lavender">PNG</span>
            <span class="tag tag--blush">SVG</span>
            <span class="tag tag--mint">GIF</span>
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
  color: var(--text-dim);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
}

.about-name {
  font-size: clamp(2.5rem, 6vw, 4rem);
  letter-spacing: -0.01em;
  background: linear-gradient(135deg, var(--lavender-dim) 20%, var(--blush-dim) 100%);
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
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  margin-bottom: 0.5rem;
}

.about-formats__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
