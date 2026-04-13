<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  current: number
  pageSize: number
  total: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  pageSizeOptions?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  showSizeChanger: true,
  showQuickJumper: false,
  pageSizeOptions: () => [10, 20, 50, 100]
})

const emit = defineEmits<{
  'update:current': [value: number]
  'update:pageSize': [value: number]
  'change': [page: number, pageSize: number]
}>()

const currentPage = computed({
  get: () => props.current,
  set: (val) => {
    emit('update:current', val)
    emit('change', val, props.pageSize)
  }
})

const pageSize = computed({
  get: () => props.pageSize,
  set: (val) => {
    emit('update:pageSize', val)
    emit('change', props.current, val)
  }
})

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = props.current
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push('...')
    
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) pages.push(i)
    
    if (current < total - 2) pages.push('...')
    pages.push(total)
  }
  
  return pages
})

const jumpValue = defineModel<string>('jumpValue', { default: '' })

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const handleJump = () => {
  const page = parseInt(jumpValue.value)
  if (!isNaN(page)) {
    handlePageChange(page)
    jumpValue.value = ''
  }
}
</script>

<template>
  <div class="nx-pagination">
    <div class="nx-pagination__info">
      共 <span class="total">{{ total }}</span> 条记录
    </div>
    
    <div class="nx-pagination__controls">
      <!-- Prev Button -->
      <button 
        class="nx-pagination__btn"
        :disabled="current <= 1"
        @click="handlePageChange(current - 1)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15,18 9,12 15,6"/>
        </svg>
      </button>

      <!-- Page Numbers -->
      <template v-for="(page, index) in visiblePages" :key="index">
        <span v-if="page === '...'" class="nx-pagination__ellipsis">...</span>
        <button 
          v-else
          class="nx-pagination__btn nx-pagination__page"
          :class="{ active: page === current }"
          @click="handlePageChange(page as number)"
        >
          {{ page }}
        </button>
      </template>

      <!-- Next Button -->
      <button 
        class="nx-pagination__btn"
        :disabled="current >= totalPages"
        @click="handlePageChange(current + 1)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9,18 15,12 9,6"/>
        </svg>
      </button>
    </div>

    <div class="nx-pagination__options">
      <!-- Size Changer -->
      <select 
        v-if="showSizeChanger" 
        class="nx-pagination__select"
        :value="pageSize"
        @change="pageSize = Number(($event.target as HTMLSelectElement).value)"
      >
        <option v-for="size in pageSizeOptions" :key="size" :value="size">
          {{ size }}/页
        </option>
      </select>

      <!-- Quick Jumper -->
      <div v-if="showQuickJumper" class="nx-pagination__jumper">
        跳至
        <input 
          v-model="jumpValue"
          class="nx-pagination__input"
          type="number"
          min="1"
          :max="totalPages"
          @keyup.enter="handleJump"
        />
        页
      </div>
    </div>
  </div>
</template>

<style scoped>
.nx-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) 0;
}

.nx-pagination__info {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.nx-pagination__info .total {
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
}

.nx-pagination__controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.nx-pagination__btn {
  min-width: 32px;
  height: 32px;
  padding: 0 var(--spacing-sm);
  border: 1px solid var(--border-default);
  background: var(--bg-primary);
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.nx-pagination__btn:hover:not(:disabled) {
  border-color: var(--color-primary-500);
  color: var(--color-primary-500);
}

.nx-pagination__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nx-pagination__btn.active {
  background: var(--color-primary-500);
  border-color: var(--color-primary-500);
  color: white;
}

.nx-pagination__ellipsis {
  color: var(--text-tertiary);
  padding: 0 var(--spacing-xs);
}

.nx-pagination__options {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.nx-pagination__select {
  height: 32px;
  padding: 0 var(--spacing-md);
  padding-right: var(--spacing-xl);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C6573' stroke-width='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6,9 12,15 18,9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
}

.nx-pagination__jumper {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.nx-pagination__input {
  width: 56px;
  height: 32px;
  padding: 0 var(--spacing-sm);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  text-align: center;
}

.nx-pagination__input:focus {
  outline: none;
  border-color: var(--color-primary-500);
}
</style>
