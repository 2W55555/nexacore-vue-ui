<script setup lang="ts">
interface Props {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'small' | 'medium'
  closable?: boolean
  hit?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'medium',
  closable: false,
  hit: false
})

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <span 
    class="nx-tag"
    :class="[
      `nx-tag--${type}`,
      `nx-tag--${size}`,
      { 'nx-tag--hit': hit }
    ]"
  >
    <slot />
    <button v-if="closable" class="nx-tag__close" @click.stop="emit('close')">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  </span>
</template>

<style scoped>
.nx-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

/* Sizes */
.nx-tag--small {
  height: 22px;
  padding: 0 var(--spacing-sm);
  font-size: var(--font-size-xs);
}

.nx-tag--medium {
  height: 26px;
  padding: 0 var(--spacing-md);
  font-size: var(--font-size-sm);
}

/* Types */
.nx-tag--default {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-light);
}

.nx-tag--primary {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
  border: 1px solid var(--color-primary-100);
}

.nx-tag--success {
  background: #dcfce7;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.nx-tag--warning {
  background: #fef3c7;
  color: #d97706;
  border: 1px solid #fde68a;
}

.nx-tag--error {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.nx-tag--info {
  background: #dbeafe;
  color: #2563eb;
  border: 1px solid #bfdbfe;
}

/* Hit */
.nx-tag--hit {
  animation: tag-pulse 0.6s ease;
}

@keyframes tag-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Close button */
.nx-tag__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  margin-left: 2px;
  margin-right: -4px;
  border: none;
  background: transparent;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
}

.nx-tag__close:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
}
</style>
