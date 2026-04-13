<script setup lang="ts">
interface Props {
  hoverable?: boolean
  padding?: 'none' | 'small' | 'medium' | 'large'
  shadow?: 'none' | 'small' | 'medium' | 'large'
  border?: boolean
}

withDefaults(defineProps<Props>(), {
  hoverable: false,
  padding: 'medium',
  shadow: 'small',
  border: true
})
</script>

<template>
  <div 
    class="nx-card"
    :class="[
      `nx-card--padding-${padding}`,
      `nx-card--shadow-${shadow}`,
      {
        'nx-card--hoverable': hoverable,
        'nx-card--bordered': border
      }
    ]"
  >
    <div v-if="$slots.header" class="nx-card__header">
      <slot name="header" />
    </div>
    <div class="nx-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="nx-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.nx-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  transition: all var(--transition-base);
}

.nx-card--bordered {
  border: 1px solid var(--border-light);
}

/* Padding */
.nx-card--padding-none {
  padding: 0;
}

.nx-card--padding-small {
  padding: var(--spacing-md);
}

.nx-card--padding-medium {
  padding: var(--spacing-lg);
}

.nx-card--padding-large {
  padding: var(--spacing-xl);
}

/* Shadow */
.nx-card--shadow-none {
  box-shadow: none;
}

.nx-card--shadow-small {
  box-shadow: var(--shadow-sm);
}

.nx-card--shadow-medium {
  box-shadow: var(--shadow-md);
}

.nx-card--shadow-large {
  box-shadow: var(--shadow-lg);
}

/* Hoverable */
.nx-card--hoverable:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

/* Header */
.nx-card__header {
  padding: var(--spacing-lg) var(--spacing-xl);
  border-bottom: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Body */
.nx-card__body {
  /* Body padding handled by card padding */
}

/* Footer */
.nx-card__footer {
  padding: var(--spacing-lg) var(--spacing-xl);
  border-top: 1px solid var(--border-light);
  background: var(--bg-secondary);
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
}
</style>
