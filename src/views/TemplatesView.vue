<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/store/app'
import NxCard from '@/components/data/NxCard.vue'
import NxButton from '@/components/common/NxButton.vue'
import NxInput from '@/components/form/NxInput.vue'
import NxTag from '@/components/common/NxTag.vue'

const appStore = useAppStore()

const searchKeyword = ref('')
const selectedCategory = ref('全部')
const viewMode = ref<'grid' | 'list'>('grid')
const showFavoritesOnly = ref(false)

const filteredTemplates = computed(() => {
  let templates = appStore.templates
  
  if (showFavoritesOnly.value) {
    templates = templates.filter(t => t.isFavorite)
  }
  
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    templates = templates.filter(t => 
      t.name.toLowerCase().includes(keyword) ||
      t.description.toLowerCase().includes(keyword)
    )
  }
  
  if (selectedCategory.value !== '全部') {
    templates = templates.filter(t => t.category === selectedCategory.value)
  }
  
  return templates
})

const toggleFavorite = (templateId: string) => {
  appStore.toggleFavorite(templateId)
}

const useTemplate = (template: any) => {
  alert(`使用模板: ${template.name}`)
}
</script>

<template>
  <div class="templates-page">
    <!-- Header -->
    <div class="page-header">
      <div class="header-left">
        <h2>口播模板管理</h2>
        <p>精选高质量口播模板，助力高效创作</p>
      </div>
      <NxButton type="primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        创建模板
      </NxButton>
    </div>

    <!-- Toolbar -->
    <div class="toolbar">
      <div class="toolbar-left">
        <NxInput 
          v-model="searchKeyword"
          placeholder="搜索模板名称..."
          size="medium"
          style="width: 240px;"
        >
          <template #prefix>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="7"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </template>
        </NxInput>
        
        <div class="category-tabs">
          <button 
            v-for="category in appStore.templateCategories" 
            :key="category"
            class="category-tab"
            :class="{ active: selectedCategory === category }"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>
      
      <div class="toolbar-right">
        <label class="favorite-toggle">
          <input type="checkbox" v-model="showFavoritesOnly" />
          <span>只看收藏</span>
        </label>
        
        <div class="view-toggle">
          <button 
            class="view-btn" 
            :class="{ active: viewMode === 'grid' }"
            @click="viewMode = 'grid'"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
            </svg>
          </button>
          <button 
            class="view-btn" 
            :class="{ active: viewMode === 'list' }"
            @click="viewMode = 'list'"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="8" y1="6" x2="21" y2="6"/>
              <line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/>
              <line x1="3" y1="12" x2="3.01" y2="12"/>
              <line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="templates-grid">
      <NxCard 
        v-for="template in filteredTemplates" 
        :key="template.id"
        hoverable
        class="template-card"
      >
        <div class="template-header">
          <div class="template-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <button 
            class="favorite-btn"
            :class="{ active: template.isFavorite }"
            @click.stop="toggleFavorite(template.id)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" :fill="template.isFavorite ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </button>
        </div>
        
        <div class="template-content">
          <h4 class="template-name">{{ template.name }}</h4>
          <p class="template-desc">{{ template.description }}</p>
        </div>
        
        <div class="template-tags">
          <NxTag v-for="tag in template.tags" :key="tag" size="small">{{ tag }}</NxTag>
        </div>
        
        <div class="template-footer">
          <div class="template-meta">
            <span class="usage-count">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
              {{ template.usageCount }}次使用
            </span>
          </div>
          <NxButton type="primary" size="small" @click="useTemplate(template)">使用</NxButton>
        </div>
      </NxCard>
    </div>

    <!-- List View -->
    <div v-else class="templates-list">
      <NxCard padding="none">
        <table class="list-table">
          <thead>
            <tr>
              <th>模板名称</th>
              <th>分类</th>
              <th>标签</th>
              <th>使用次数</th>
              <th>更新时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="template in filteredTemplates" :key="template.id">
              <td>
                <div class="template-name-cell">
                  <div class="template-icon-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </div>
                  <div>
                    <span class="name">{{ template.name }}</span>
                    <span class="desc">{{ template.description }}</span>
                  </div>
                </div>
              </td>
              <td><NxTag size="small">{{ template.category }}</NxTag></td>
              <td>
                <div class="tags-cell">
                  <NxTag v-for="tag in template.tags.slice(0, 2)" :key="tag" size="small" type="default">{{ tag }}</NxTag>
                </div>
              </td>
              <td>{{ template.usageCount }}</td>
              <td>{{ template.updatedAt }}</td>
              <td>
                <div class="actions">
                  <NxButton type="text" size="small" @click="useTemplate(template)">使用</NxButton>
                  <NxButton type="text" size="small" @click="toggleFavorite(template.id)">
                    {{ template.isFavorite ? '取消收藏' : '收藏' }}
                  </NxButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </NxCard>
    </div>

    <!-- Empty State -->
    <div v-if="filteredTemplates.length === 0" class="empty-state">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="12" y1="18" x2="12" y2="12"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
      <h3>暂无模板</h3>
      <p>没有找到符合条件的模板，请尝试其他搜索条件</p>
    </div>
  </div>
</template>

<style scoped>
.templates-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

/* Page Header */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-xl);
}

.header-left h2 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-xs);
}

.header-left p {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

/* Toolbar */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-xl);
  gap: var(--spacing-lg);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.category-tabs {
  display: flex;
  gap: var(--spacing-xs);
}

.category-tab {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.category-tab:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.category-tab.active {
  background: var(--color-primary-500);
  color: white;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.favorite-toggle {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  cursor: pointer;
}

.favorite-toggle input {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.view-toggle {
  display: flex;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.view-btn {
  padding: var(--spacing-sm);
  border: none;
  background: var(--bg-primary);
  color: var(--text-tertiary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.view-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.view-btn.active {
  background: var(--color-primary-50);
  color: var(--color-primary-500);
}

/* Grid View */
.templates-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
}

.template-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.template-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.template-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100));
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-500);
}

.favorite-btn {
  border: none;
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.favorite-btn:hover {
  color: var(--color-warning);
}

.favorite-btn.active {
  color: var(--color-warning);
}

.template-content {
  flex: 1;
  margin-bottom: var(--spacing-md);
}

.template-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-sm);
}

.template-desc {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.template-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.template-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-light);
}

.template-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.usage-count {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

/* List View */
.templates-list {
  margin-top: var(--spacing-lg);
}

.list-table {
  width: 100%;
  border-collapse: collapse;
}

.list-table th {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-secondary);
  text-align: left;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
}

.list-table td {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-light);
  vertical-align: middle;
}

.list-table tr:hover {
  background: var(--bg-secondary);
}

.template-name-cell {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.template-icon-sm {
  width: 36px;
  height: 36px;
  background: var(--color-primary-50);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-500);
}

.template-name-cell .name {
  display: block;
  font-weight: var(--font-weight-medium);
}

.template-name-cell .desc {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.tags-cell {
  display: flex;
  gap: var(--spacing-xs);
}

.actions {
  display: flex;
  gap: var(--spacing-sm);
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4xl);
  text-align: center;
  color: var(--text-tertiary);
}

.empty-state svg {
  margin-bottom: var(--spacing-lg);
  opacity: 0.5;
}

.empty-state h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-sm);
}

.empty-state p {
  font-size: var(--font-size-sm);
  margin: 0;
}

/* Responsive */
@media (max-width: 1200px) {
  .templates-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .templates-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .toolbar-left {
    flex-wrap: wrap;
  }

  .category-tabs {
    flex-wrap: wrap;
  }
}

@media (max-width: 600px) {
  .templates-grid {
    grid-template-columns: 1fr;
  }
}
</style>
