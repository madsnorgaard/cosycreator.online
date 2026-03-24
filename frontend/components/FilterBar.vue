<template>
  <div class="filter-wrap">
    <div class="filter-bar" role="tablist" aria-label="Filter by category">
      <button
        class="filter-btn"
        :class="{ 'filter-btn--active': activeCategory === null }"
        role="tab"
        :aria-selected="activeCategory === null"
        data-hover
        @click="setCategory(null)"
      >
        <span class="filter-btn__bracket">[</span>
        ALL
        <span class="filter-btn__count mono">{{ artworks.length }}</span>
        <span class="filter-btn__bracket">]</span>
      </button>

      <button
        v-for="cat in categories"
        :key="cat.id"
        class="filter-btn"
        :class="{ 'filter-btn--active': activeCategory === cat.id }"
        role="tab"
        :aria-selected="activeCategory === cat.id"
        data-hover
        @click="setCategory(cat.id)"
      >
        <span class="filter-btn__bracket">[</span>
        {{ cat.name.toUpperCase() }}
        <span class="filter-btn__count mono">{{ cat.count }}</span>
        <span class="filter-btn__bracket">]</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { categories, artworks, activeCategory, setCategory } = useWordPress()
</script>

<style scoped>
.filter-wrap {
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 2px; /* prevent clipping */
}
.filter-wrap::-webkit-scrollbar { display: none; }

.filter-bar {
  display: flex;
  align-items: center;
  gap: 4px;
  width: max-content;
  min-width: 100%;
}

/* ── Filter button ── */
.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 0.45rem 0.875rem;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  white-space: nowrap;
  transition: all var(--transition);
}

.filter-btn:hover {
  border-color: rgba(168, 85, 247, 0.4);
  color: var(--text);
  background: rgba(168, 85, 247, 0.06);
}

.filter-btn--active {
  border-color: var(--purple);
  color: var(--text);
  background: rgba(168, 85, 247, 0.12);
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.15);
}

.filter-btn--active .filter-btn__bracket {
  color: var(--purple);
}

.filter-btn__bracket {
  color: var(--text-dim);
  transition: color var(--transition);
}

.filter-btn__count {
  font-size: 0.625rem;
  color: var(--text-dim);
  min-width: 1.5ch;
}

.filter-btn--active .filter-btn__count {
  color: var(--text-muted);
}
</style>
