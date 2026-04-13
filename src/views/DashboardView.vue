<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import NxCard from '@/components/data/NxCard.vue'
import NxTag from '@/components/common/NxTag.vue'

const router = useRouter()
const appStore = useAppStore()

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return '早上好'
  if (hour < 18) return '下午好'
  return '晚上好'
})

const storagePercentage = computed(() => {
  return (appStore.stats.storageUsed / appStore.stats.storageTotal) * 100
})

const goToPage = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="dashboard">
    <!-- Welcome Section -->
    <div class="welcome-section animate-slideUp">
      <div class="welcome-content">
        <h1 class="welcome-title">{{ greeting }}，创作者 👋</h1>
        <p class="welcome-desc">今天是创作的好日子，让我们一起打造精彩的汽车短视频内容</p>
      </div>
      <NxButton type="primary" size="large" @click="goToPage('/generate')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"/>
        </svg>
        智能生成脚本
      </NxButton>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <NxCard hoverable class="stat-card" @click="goToPage('/history')">
        <div class="stat-icon" style="background: linear-gradient(135deg, #165DFF, #4080FF);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">总脚本数</span>
          <span class="stat-value">{{ appStore.stats.totalScripts.toLocaleString() }}</span>
          <span class="stat-change">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
            </svg>
            今日+{{ appStore.stats.todayScripts }}
          </span>
        </div>
      </NxCard>

      <NxCard hoverable class="stat-card" @click="goToPage('/history')">
        <div class="stat-icon" style="background: linear-gradient(135deg, #00B42A, #23C343);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">本周生成</span>
          <span class="stat-value">{{ appStore.stats.weekScripts }}</span>
          <span class="stat-change success">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
            </svg>
            +12.5%
          </span>
        </div>
      </NxCard>

      <NxCard hoverable class="stat-card" @click="goToPage('/templates')">
        <div class="stat-icon" style="background: linear-gradient(135deg, #FF7D00, #FFA040);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">口播模板</span>
          <span class="stat-value">{{ appStore.stats.totalTemplates }}</span>
          <span class="stat-change">覆盖多场景</span>
        </div>
      </NxCard>

      <NxCard hoverable class="stat-card" @click="goToPage('/knowledge')">
        <div class="stat-icon" style="background: linear-gradient(135deg, #14A9FF, #60C0FF);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
            <ellipse cx="12" cy="5" rx="9" ry="3"/>
            <path d="M21 5v6c0 1.66-4 3-9 3s-9-1.34-9-3V5"/>
            <path d="M21 11v6c0 1.66-4 3-9 3s-9-1.34-9-3v-6"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">车型知识库</span>
          <span class="stat-value">{{ appStore.stats.totalCarModels }}</span>
          <span class="stat-change">持续更新</span>
        </div>
      </NxCard>
    </div>

    <!-- Quick Actions & Storage -->
    <div class="dashboard-grid">
      <!-- Quick Actions -->
      <NxCard class="quick-actions-card">
        <template #header>
          <div class="card-header-custom">
            <h3>快捷操作</h3>
          </div>
        </template>
        <div class="quick-actions">
          <div 
            v-for="action in appStore.quickActions" 
            :key="action.id"
            class="quick-action-item"
            @click="goToPage(action.route)"
          >
            <div class="quick-action-icon" :style="{ background: action.color + '15', color: action.color }">
              <svg v-if="action.icon === 'sparkle'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"/>
              </svg>
              <svg v-else-if="action.icon === 'grid'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              <svg v-else-if="action.icon === 'database'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 5v6c0 1.66-4 3-9 3s-9-1.34-9-3V5"/>
                <path d="M21 11v6c0 1.66-4 3-9 3s-9-1.34-9-3v-6"/>
              </svg>
              <svg v-else-if="action.icon === 'clock'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 7v5l3 3"/>
              </svg>
            </div>
            <div class="quick-action-content">
              <span class="quick-action-title">{{ action.title }}</span>
              <span class="quick-action-desc">{{ action.description }}</span>
            </div>
            <svg class="quick-action-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9,18 15,12 9,6"/>
            </svg>
          </div>
        </div>
      </NxCard>

      <!-- Storage -->
      <NxCard class="storage-card">
        <template #header>
          <div class="card-header-custom">
            <h3>存储空间</h3>
            <span class="storage-usage">{{ appStore.stats.storageUsed.toFixed(1) }} / {{ appStore.stats.storageTotal }} GB</span>
          </div>
        </template>
        <div class="storage-content">
          <div class="storage-ring">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--bg-tertiary)" stroke-width="8"/>
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="var(--color-primary-500)" 
                stroke-width="8"
                stroke-linecap="round"
                :stroke-dasharray="`${storagePercentage * 2.83} 283`"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div class="storage-ring-text">
              <span class="storage-percent">{{ storagePercentage.toFixed(0) }}%</span>
              <span class="storage-label">已使用</span>
            </div>
          </div>
          <div class="storage-info">
            <div class="storage-item">
              <span class="storage-dot" style="background: var(--color-primary-500);"></span>
              <span class="storage-name">脚本文件</span>
              <span class="storage-size">1.8 GB</span>
            </div>
            <div class="storage-item">
              <span class="storage-dot" style="background: var(--color-accent);"></span>
              <span class="storage-name">视频素材</span>
              <span class="storage-size">0.6 GB</span>
            </div>
            <div class="storage-item">
              <span class="storage-dot" style="background: var(--color-warning);"></span>
              <span class="storage-name">其他文件</span>
              <span class="storage-size">0.4 GB</span>
            </div>
          </div>
        </div>
      </NxCard>
    </div>

    <!-- Recent Scripts -->
    <NxCard class="recent-card">
      <template #header>
        <div class="card-header-custom">
          <h3>最近创作</h3>
          <NxButton type="text" size="small" @click="goToPage('/history')">查看全部</NxButton>
        </div>
      </template>
      <div class="recent-list">
        <div 
          v-for="script in appStore.recentScripts" 
          :key="script.id"
          class="recent-item"
        >
          <div class="recent-info">
            <span class="recent-title">{{ script.title }}</span>
            <div class="recent-meta">
              <NxTag size="small">{{ script.type }}</NxTag>
              <span class="recent-model">{{ script.carModel }}</span>
              <span class="recent-time">{{ script.createdAt }}</span>
            </div>
          </div>
          <div class="recent-status">
            <NxTag 
              :type="script.status === '已使用' ? 'success' : script.status === '已生成' ? 'primary' : 'default'"
              size="small"
            >
              {{ script.status }}
            </NxTag>
          </div>
        </div>
      </div>
    </NxCard>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: var(--content-max-width);
  margin: 0 auto;
}

/* Welcome Section */
.welcome-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-2xl);
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  border-radius: var(--radius-2xl);
  margin-bottom: var(--spacing-xl);
}

.welcome-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: white;
  margin: 0 0 var(--spacing-sm);
}

.welcome-desc {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.stat-card {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-lg);
  cursor: pointer;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.stat-change {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  gap: 2px;
}

.stat-change.success {
  color: var(--color-accent);
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

/* Card Header */
.card-header-custom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.card-header-custom h3 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

/* Quick Actions */
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.quick-action-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.quick-action-item:hover {
  background: var(--bg-secondary);
}

.quick-action-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-action-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.quick-action-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.quick-action-desc {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.quick-action-arrow {
  color: var(--text-tertiary);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.quick-action-item:hover .quick-action-arrow {
  opacity: 1;
}

/* Storage */
.storage-usage {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.storage-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-2xl);
}

.storage-ring {
  position: relative;
  width: 120px;
  height: 120px;
}

.storage-ring svg {
  width: 100%;
  height: 100%;
}

.storage-ring-text {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.storage-percent {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.storage-label {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.storage-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.storage-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.storage-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
}

.storage-name {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.storage-size {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

/* Recent Scripts */
.recent-list {
  display: flex;
  flex-direction: column;
}

.recent-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--border-light);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.recent-item:last-child {
  border-bottom: none;
}

.recent-item:hover {
  background: var(--bg-secondary);
  margin: 0 calc(-1 * var(--spacing-lg));
  padding-left: var(--spacing-lg);
  padding-right: var(--spacing-lg);
}

.recent-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.recent-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.recent-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.recent-model,
.recent-time {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

/* Responsive */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .welcome-section {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-lg);
  }
}
</style>
