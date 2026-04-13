<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

interface Props {
  modelValue: string | number
  options: Option[]
  placeholder?: string
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择',
  disabled: false,
  size: 'medium'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
}>()

const selectedValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

const selectedLabel = computed(() => {
  const option = props.options.find(opt => opt.value === props.modelValue)
  return option?.label || props.placeholder
})
</script>

<template>
  <div class="nx-select" :class="{ 'nx-select--error': error }">
    <select
      v-model="selectedValue"
      class="nx-select__inner"
      :class="[`nx-select--${size}`, { 'nx-select--disabled': disabled }]"
      :disabled="disabled"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    <div class="nx-select__arrow">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6,9 12,15 18,9"/>
      </svg>
    </div>
    <div v-if="error" class="nx-select__error">{{ error }}</div>
  </div>
</template>

<style scoped>
.nx-select {
  position: relative;
  display: inline-flex;
  width: 100%;
}

.nx-select__inner {
  width: 100%;
  appearance: none;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition-fast);
  padding-right: 36px;
}

.nx-select__inner:hover:not(:disabled) {
  border-color: var(--border-hover);
}

.nx-select__inner:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

/* Sizes */
.nx-select--small .nx-select__inner {
  height: 28px;
  padding: 0 var(--spacing-sm);
  font-size: var(--font-size-xs);
}

.nx-select--medium .nx-select__inner {
  height: 36px;
  padding: 0 var(--spacing-md);
  font-size: var(--font-size-sm);
}

.nx-select--large .nx-select__inner {
  height: 44px;
  padding: 0 var(--spacing-lg);
  font-size: var(--font-size-base);
}

/* Arrow */
.nx-select__arrow {
  position: absolute;
  right: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  pointer-events: none;
  display: flex;
  align-items: center;
}

/* States */
.nx-select--error .nx-select__inner {
  border-color: var(--color-error);
}

.nx-select--disabled .nx-select__inner {
  background: var(--bg-secondary);
  color: var(--text-disabled);
  cursor: not-allowed;
}

.nx-select--disabled .nx-select__inner:hover {
  border-color: var(--border-default);
}

/* Error message */
.nx-select__error {
  position: absolute;
  bottom: -20px;
  left: 0;
  font-size: var(--font-size-xs);
  color: var(--color-error);
}
</style>
