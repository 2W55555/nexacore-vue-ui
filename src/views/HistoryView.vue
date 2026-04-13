<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/store/app'
import NxCard from '@/components/data/NxCard.vue'
import NxButton from '@/components/common/NxButton.vue'
import NxInput from '@/components/form/NxInput.vue'
import NxSelect from '@/components/form/NxSelect.vue'
import NxTag from '@/components/common/NxTag.vue'
import NxPagination from '@/components/data/NxPagination.vue'

const appStore = useAppStore()
const searchKeyword = ref('')
const filterType = ref('')
const filterStatus = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const typeOptions = [
  { label: '全部类型', value: '' },
  { label: '脚本', value: 'script' },
  { label: '模板', value: 'template' },
  { label: '素材', value: '素材' }
]

const statusOptions = [
  { label: '全部状态', value: '' },
  { label: '已完成', value: '完成' },
  { label: '处理中', value: '处理中' },
  { label: '失败', value: '失败' }
]

const filteredHistory = computed(() => {
  let items = appStore.historyItems
  if (searchKeyword.value) {
    const kw = searchKeyword.value.toLowerCase()
    items = items.filter(i => i.title.toLowerCase().includes(kw) || i.carModel.toLowerCase().includes(kw))
  }
  if (filterType.value) items = items.filter(i => i.type === filterType.value)
  if (filterStatus.value) items = items.filter(i => i.status === filterStatus.value)
  return items
})

const paginatedHistory = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredHistory.value.slice(start, start + pageSize.value)
})

const getTypeTag = (type: string) => {
  if (type === 'script') return { type: 'primary', label: '脚本' }
  if (type === 'template') return { type: 'success', label: '模板' }
  return { type: 'warning', label: '素材' }
}

const getStatusTag = (status: string) => {
  if (status === '完成') return { type: 'success', label: '已完成' }
  if (status === '处理中') return { type: 'warning', label: '处理中' }
  return { type: 'error', label: '失败' }
}

const viewDetail = (item: any) => alert(`查看详情: ${item.title}`)
const downloadItem = (item: any) => alert(`下载: ${item.title}`)
const deleteItem = (item: any) => alert(`删除: ${item.title}`)
</script>

<template>
  <div class="history-page">
    <div class="page-header">
      <div class="header-left">
        <h2>生成历史</h2>
        <p>查看和管理您所有的创作记录</p>
      </div>
      <NxButton type="secondary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
        导出记录
      </NxButton>
    </div>

    <NxCard>
      <div class="toolbar">
        <div class="toolbar-left">
          <NxInput v-model="searchKeyword" placeholder="搜索标题或车型..." size="medium" style="width: 240px;">
            <template #prefix><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg></template>
          </NxInput>
          <NxSelect v-model="filterType" :options="typeOptions" size="medium" style="width: 140px;" />
          <NxSelect v-model="filterStatus" :options="statusOptions" size="medium" style="width: 140px;" />
        </div>
        <div class="toolbar-right">
          <span class="total-count">共 {{ filteredHistory.length }} 条记录</span>
        </div>
      </div>

      <table class="history-table">
        <thead>
          <tr>
            <th style="width: 40px;"><input type="checkbox" /></th>
            <th>标题</th>
            <th style="width: 100px;">类型</th>
            <th style="width: 120px;">车型</th>
            <th style="width: 100px;">脚本类型</th>
            <th style="width: 160px;">创建时间</th>
            <th style="width: 80px;">状态</th>
            <th style="width: 140px;">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedHistory" :key="item.id">
            <td><input type="checkbox" /></td>
            <td>
              <div class="title-cell">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                <span>{{ item.title }}</span>
              </div>
            </td>
            <td><NxTag :type="getTypeTag(item.type).type" size="small">{{ getTypeTag(item.type).label }}</NxTag></td>
            <td>{{ item.carModel }}</td>
            <td>{{ item.scriptType }}</td>
            <td>{{ item.createdAt }}</td>
            <td><NxTag :type="getStatusTag(item.status).type" size="small">{{ getStatusTag(item.status).label }}</NxTag></td>
            <td>
              <div class="actions">
                <NxButton type="text" size="small" @click="viewDetail(item)">查看</NxButton>
                <NxButton type="text" size="small" @click="downloadItem(item)">下载</NxButton>
                <NxButton type="text" size="small" @click="deleteItem(item)">删除</NxButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <NxPagination v-model:current="currentPage" v-model:pageSize="pageSize" :total="filteredHistory.length" />
    </NxCard>
  </div>
</template>

<style scoped>
.history-page { max-width: var(--content-max-width); margin: 0 auto; }
.page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--spacing-xl); }
.header-left h2 { font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold); margin: 0 0 var(--spacing-xs); }
.header-left p { font-size: var(--font-size-sm); color: var(--text-secondary); margin: 0; }
.toolbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--spacing-lg); gap: var(--spacing-lg); }
.toolbar-left { display: flex; gap: var(--spacing-md); }
.total-count { font-size: var(--font-size-sm); color: var(--text-secondary); }
.history-table { width: 100%; border-collapse: collapse; margin-bottom: var(--spacing-lg); }
.history-table th { padding: var(--spacing-md) var(--spacing-lg); font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--text-secondary); text-align: left; background: var(--bg-secondary); border-bottom: 1px solid var(--border-light); }
.history-table td { padding: var(--spacing-md) var(--spacing-lg); font-size: var(--font-size-sm); color: var(--text-primary); border-bottom: 1px solid var(--border-light); vertical-align: middle; }
.history-table tr:hover { background: var(--bg-secondary); }
.title-cell { display: flex; align-items: center; gap: var(--spacing-sm); }
.actions { display: flex; gap: var(--spacing-xs); }
</style>
