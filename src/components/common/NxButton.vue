<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  icon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  block: false,
  icon: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClass = computed(() => [
  'nx-btn',
  `nx-btn--${props.type}`,
  `nx-btn--${props.size}`,
  {
    'nx-btn--disabled': props.disabled || props.loading,
    'nx-btn--loading': props.loading,
    'nx-btn--block': props.block,
    'nx-btn--icon': props.icon
  }
])

const handleClick = (e: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', e)
  }
}
</script>

<template>
  <button 
    :class="buttonClass"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="nx-btn__loading">
      <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      </svg>
    </span>
    <span class="nx-btn__content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.nx-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-family: inherit;
  font-weight: var(--font-weight-medium);
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.nx-btn:focus {
  outline: none;
}

.nx-btn:focus-visible {
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

/* Sizes */
.nx-btn--small {
  height: 28px;
  padding: 0 var(--spacing-md);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-md);
}

.nx-btn--medium {
  height: 36px;
  padding: 0 var(--spacing-lg);
  font-size: var(--font-size-sm);
}

.nx-btn--large {
  height: 44px;
  padding: 0 var(--spacing-xl);
  font-size: var(--font-size-base);
}

/* Types */
.nx-btn--primary {
  background: var(--color-primary-500);
  color: white;
  border-color: var(--color-primary-500);
}

.nx-btn--primary:hover:not(:disabled) {
  background: var(--color-primary-600);
  border-color: var(--color-primary-600);
}

.nx-btn--primary:active:not(:disabled) {
  background: var(--color-primary-700);
  border-color: var(--color-primary-700);
}

.nx-btn--secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border-default);
}

.nx-btn--secondary:hover:not(:disabled) {
  background: var(--bg-tertiary);
  border-color: var(--border-hover);
}

.nx-btn--secondary:active:not(:disabled) {
  background: var(--border-default);
}

.nx-btn--outline {
  background: transparent;
  color: var(--color-primary-500);
  border-color: var(--color-primary-500);
}

.nx-btn--outline:hover:not(:disabled) {
  background: var(--color-primary-50);
}

.nx-btn--outline:active:not(:disabled) {
  background: var(--color-primary-100);
}

.nx-btn--text {
  background: transparent;
  color: var(--color-primary-500);
  border-color: transparent;
}

.nx-btn--text:hover:not(:disabled) {
  background: var(--color-primary-50);
}

.nx-btn--danger {
  background: var(--color-error);
  color: white;
  border-color: var(--color-error);
}

.nx-btn--danger:hover:not(:disabled) {
  background: #dc2626;
  border-color: #dc2626;
}

/* States */
.nx-btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nx-btn--loading {
  cursor: wait;
}

.nx-btn--block {
  width: 100%;
}

.nx-btn--icon {
  padding: 0;
  aspect-ratio: 1;
}

.nx-btn--icon.nx-btn--small {
  width: 28px;
}

.nx-btn--icon.nx-btn--medium {
  width: 36px;
}

.nx-btn--icon.nx-btn--large {
  width: 44px;
}

/* Loading */
.nx-btn__loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nx-btn__loading svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.nx-btn__content {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}
</style>
