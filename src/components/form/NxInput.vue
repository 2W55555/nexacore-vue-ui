<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'search'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  error?: string
  size?: 'small' | 'medium' | 'large'
  prefix?: string
  suffix?: string
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  size: 'medium',
  clearable: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
  'clear': []
  'pressEnter': [event: KeyboardEvent]
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val as string | number)
})

const inputClass = computed(() => [
  'nx-input__inner',
  `nx-input--${props.size}`,
  {
    'nx-input--error': props.error,
    'nx-input--disabled': props.disabled,
    'nx-input--with-prefix': props.prefix,
    'nx-input--with-suffix': props.suffix || props.clearable
  }
])

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  inputValue.value = target.value
}

const handleClear = () => {
  inputValue.value = ''
  emit('clear')
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    emit('pressEnter', e)
  }
}
</script>

<template>
  <div class="nx-input" :class="{ 'nx-input--error': error }">
    <div v-if="prefix" class="nx-input__prefix">
      <slot name="prefix">{{ prefix }}</slot>
    </div>
    <input
      v-model="inputValue"
      :type="type"
      :class="inputClass"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="handleInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @keydown="handleKeydown"
    />
    <div class="nx-input__suffix">
      <button 
        v-if="clearable && inputValue" 
        class="nx-input__clear" 
        type="button" 
        @click="handleClear"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <slot name="suffix" />
    </div>
    <div v-if="error" class="nx-input__error">{{ error }}</div>
  </div>
</template>

<style scoped>
.nx-input {
  position: relative;
  display: inline-flex;
  width: 100%;
}

.nx-input__prefix,
.nx-input__suffix {
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  z-index: 1;
}

.nx-input__prefix {
  left: var(--spacing-md);
}

.nx-input__suffix {
  right: var(--spacing-md);
}

.nx-input__inner {
  width: 100%;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
  transition: all var(--transition-fast);
}

.nx-input__inner:hover:not(:disabled) {
  border-color: var(--border-hover);
}

.nx-input__inner:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

/* Sizes */
.nx-input--small {
  height: 28px;
  padding: 0 var(--spacing-sm);
  font-size: var(--font-size-xs);
}

.nx-input--medium {
  height: 36px;
  padding: 0 var(--spacing-md);
  font-size: var(--font-size-sm);
}

.nx-input--large {
  height: 44px;
  padding: 0 var(--spacing-lg);
  font-size: var(--font-size-base);
}

/* With prefix/suffix */
.nx-input--with-prefix .nx-input__inner {
  padding-left: 36px;
}

.nx-input--with-suffix .nx-input__inner {
  padding-right: 36px;
}

/* States */
.nx-input--error .nx-input__inner {
  border-color: var(--color-error);
}

.nx-input--error .nx-input__inner:focus {
  box-shadow: 0 0 0 3px rgba(245, 63, 63, 0.1);
}

.nx-input--disabled .nx-input__inner {
  background: var(--bg-secondary);
  color: var(--text-disabled);
  cursor: not-allowed;
}

.nx-input--disabled .nx-input__inner:hover {
  border-color: var(--border-default);
}

/* Clear button */
.nx-input__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: var(--color-gray-300);
  color: white;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.nx-input__clear:hover {
  background: var(--color-gray-400);
}

/* Error message */
.nx-input__error {
  position: absolute;
  bottom: -20px;
  left: 0;
  font-size: var(--font-size-xs);
  color: var(--color-error);
}
</style>
