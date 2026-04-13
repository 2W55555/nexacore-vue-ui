<script setup lang="ts">
import { ref, computed } from 'vue'

interface Column {
  key: string
  title: string
  width?: string | number
  minWidth?: string | number
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  fixed?: 'left' | 'right'
}

interface Props {
  columns: Column[]
  data: any[]
  loading?: boolean
  stripe?: boolean
  border?: boolean
  highlightRow?: boolean
  rowKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  stripe: false,
  border: true,
  highlightRow: true,
  rowKey: 'id'
})

const emit = defineEmits<{
  'row-click': [row: any, index: number]
  'selection-change': [selection: any[]]
}>()

const selectedRows = ref<any[]>([])
const sortKey = ref<string>('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const handleRowClick = (row: any, index: number) => {
  emit('row-click', row, index)
}

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const getCellStyle = (column: Column) => {
  const style: any = {}
  if (column.width) style.width = typeof column.width === 'number' ? `${column.width}px` : column.width
  if (column.minWidth) style.minWidth = typeof column.minWidth === 'number' ? `${column.minWidth}px` : column.minWidth
  if (column.align) style.textAlign = column.align
  return style
}
</script>

<template>
  <div class="nx-table">
    <div class="nx-table__wrapper">
      <table class="nx-table__inner">
        <thead class="nx-table__header">
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.key"
              :style="getCellStyle(column)"
              :class="{ 
                'is-sortable': column.sortable,
                'is-fixed-left': column.fixed === 'left',
                'is-fixed-right': column.fixed === 'right'
              }"
              @click="column.sortable && handleSort(column.key)"
            >
              <div class="cell-content">
                <slot :name="`header-${column.key}`" :column="column">
                  {{ column.title }}
                </slot>
                <span v-if="column.sortable" class="sort-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" :class="{ active: sortKey === column.key }">
                    <path v-if="sortKey !== column.key || sortOrder === 'asc'" d="M12 8l-6 6h12l-6-6z"/>
                    <path v-else d="M12 16l6-6H6l6 6z"/>
                  </svg>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="nx-table__body">
          <template v-if="loading">
            <tr v-for="i in 5" :key="i" class="nx-table__row nx-table__row--loading">
              <td v-for="column in columns" :key="column.key">
                <div class="skeleton" style="height: 20px; width: 80%;"></div>
              </td>
            </tr>
          </template>
          <template v-else-if="data.length === 0">
            <tr>
              <td :colspan="columns.length" class="nx-table__empty">
                <div class="empty-content">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                    <polyline points="13,2 13,9 20,9"/>
                  </svg>
                  <p>暂无数据</p>
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr 
              v-for="(row, index) in data" 
              :key="row[rowKey] || index"
              class="nx-table__row"
              :class="{ 
                'is-stripe': stripe && index % 2 === 1,
                'is-hover': highlightRow
              }"
              @click="handleRowClick(row, index)"
            >
              <td 
                v-for="column in columns" 
                :key="column.key"
                :style="getCellStyle(column)"
              >
                <slot :name="column.key" :row="row" :index="index">
                  {{ row[column.key] }}
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.nx-table {
  width: 100%;
  overflow: hidden;
}

.nx-table__wrapper {
  overflow-x: auto;
}

.nx-table__inner {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

/* Header */
.nx-table__header {
  background: var(--bg-secondary);
}

.nx-table__header th {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-secondary);
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid var(--border-default);
  position: relative;
}

.nx-table__header th.is-sortable {
  cursor: pointer;
  user-select: none;
}

.nx-table__header th.is-sortable:hover {
  color: var(--text-primary);
}

.cell-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.sort-icon {
  color: var(--text-tertiary);
  opacity: 0.5;
}

.sort-icon svg.active {
  opacity: 1;
  color: var(--color-primary-500);
}

/* Body */
.nx-table__body td {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-light);
  vertical-align: middle;
}

.nx-table__row {
  transition: background var(--transition-fast);
}

.nx-table__row.is-hover:hover {
  background: var(--bg-secondary);
}

.nx-table__row.is-stripe {
  background: var(--bg-secondary);
}

.nx-table__row.is-stripe:hover {
  background: var(--bg-tertiary);
}

.nx-table__row--loading td {
  padding: var(--spacing-md) var(--spacing-lg);
}

/* Empty */
.nx-table__empty {
  text-align: center;
  padding: var(--spacing-4xl) !important;
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  color: var(--text-tertiary);
}

.empty-content svg {
  opacity: 0.5;
}

/* Border */
.nx-table__inner {
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
</style>
