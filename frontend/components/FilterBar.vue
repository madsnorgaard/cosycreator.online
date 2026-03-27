<template>
  <div class="filter-wrap">
    <div class="filter-bar" role="tablist" aria-label="Filter by category">
      <button
        class="filter-btn"
        :class="{ 'filter-btn--active': activeCategory === null }"
        role="tab"
        :aria-selected="activeCategory === null"
        @click="setCategory(null)"
      >
        all
        <span class="filter-btn__count">{{ artworks.length }}</span>
      </button>

      <button
        v-for="cat in categories"
        :key="cat.id"
        class="filter-btn"
        :class="{ 'filter-btn--active': activeCategory === cat.id }"
        role="tab"
        :aria-selected="activeCategory === cat.id"
        @click="setCategory(cat.id)"
      >
        {{ cat.name.toLowerCase() }}
        <span class="filter-btn__count">{{ cat.count }}</span>
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
  padding-bottom: 2px;
}
.filter-wrap::-webkit-scrollbar { display: none; }

.filter-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  width: max-content;
  min-width: 100%;
}

/* ── Filter button — pill style ── */
.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.4rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  color: var(--text-muted);
  font-family: var(--font-display);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  transition: all var(--transition);
  cursor: pointer;
}

.filter-btn:hover {
  border-color: var(--lavender);
  color: var(--lavender-dim);
  background: rgba(196, 160, 224, 0.08);
}

.filter-btn--active {
  border-color: var(--lavender);
  color: var(--lavender-dim);
  background: rgba(196, 160, 224, 0.15);
  box-shadow: var(--shadow-sm);
}

.filter-btn__count {
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--text-dim);
  background: var(--bg-2);
  padding: 1px 6px;
  border-radius: var(--radius-pill);
  min-width: 1.5ch;
  text-align: center;
}

.filter-btn--active .filter-btn__count {
  background: rgba(196, 160, 224, 0.2);
  color: var(--lavender-dim);
}
</style>
