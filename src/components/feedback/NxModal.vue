<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  size?: 'small' | 'medium' | 'large' | 'full'
  closable?: boolean
  maskClosable?: boolean
  showFooter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  closable: true,
  maskClosable: true,
  showFooter: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const visible = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const handleClose = () => {
  visible.value = false
  emit('update:modelValue', false)
  emit('close')
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

const handleEscKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closable) {
    handleClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="nx-modal">
        <div class="nx-modal__mask" @click="handleMaskClick"></div>
        <div class="nx-modal__container" :class="`nx-modal--${size}`">
          <div class="nx-modal__content">
            <!-- Header -->
            <div v-if="title || closable || $slots.header" class="nx-modal__header">
              <slot name="header">
                <h3 class="nx-modal__title">{{ title }}</h3>
              </slot>
              <button v-if="closable" class="nx-modal__close" @click="handleClose">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="nx-modal__body">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="showFooter && $slots.footer" class="nx-modal__footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.nx-modal {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
}

.nx-modal__mask {
  position: absolute;
  inset: 0;
  background: var(--bg-masked);
  backdrop-filter: blur(4px);
}

.nx-modal__container {
  position: relative;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

/* Sizes */
.nx-modal--small {
  width: 400px;
}

.nx-modal--medium {
  width: 560px;
}

.nx-modal--large {
  width: 720px;
}

.nx-modal--full {
  width: calc(100vw - 80px);
  height: calc(100vh - 80px);
}

.nx-modal__content {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
}

/* Header */
.nx-modal__header {
  padding: var(--spacing-lg) var(--spacing-xl);
  border-bottom: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nx-modal__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.nx-modal__close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--text-tertiary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.nx-modal__close:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

/* Body */
.nx-modal__body {
  padding: var(--spacing-xl);
  overflow-y: auto;
  flex: 1;
}

/* Footer */
.nx-modal__footer {
  padding: var(--spacing-lg) var(--spacing-xl);
  border-top: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-md);
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .nx-modal__content,
.modal-leave-active .nx-modal__content {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .nx-modal__content,
.modal-leave-to .nx-modal__content {
  transform: scale(0.95);
  opacity: 0;
}
</style>
