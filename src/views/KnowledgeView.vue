<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/store/app'
import type { CarModel } from '@/types'
import NxCard from '@/components/data/NxCard.vue'
import NxButton from '@/components/common/NxButton.vue'
import NxInput from '@/components/form/NxInput.vue'
import NxTag from '@/components/common/NxTag.vue'

const appStore = useAppStore()
const searchKeyword = ref('')
const selectedBrand = ref('全部品牌')
const selectedModel = ref<CarModel | null>(null)
const activeTab = ref('specs')

const filteredModels = computed(() => appStore.searchCarModels(searchKeyword.value, selectedBrand.value))

const selectModel = (model: CarModel) => { selectedModel.value = model }
const getHighlightColor = (level: string) => level === 'high' ? 'primary' : level === 'medium' ? 'success' : 'default'
</script>

<template>
  <div class="knowledge-page">
    <div class="page-header">
      <div class="header-left">
        <h2>车型&卖点知识库</h2>
        <p>覆盖主流新能源车型，提供车型参数、卖点等全方位信息</p>
      </div>
      <NxButton type="primary">添加车型</NxButton>
    </div>

    <div class="knowledge-layout">
      <div class="tree-panel">
        <NxCard padding="none">
          <div class="tree-search">
            <NxInput v-model="searchKeyword" placeholder="搜索车型..." size="medium" />
          </div>
          <div class="brand-filter">
            <select v-model="selectedBrand" class="brand-select">
              <option v-for="brand in appStore.carBrands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
          </div>
          <div class="tree-content">
            <div class="tree-group" v-for="brand in [...new Set(filteredModels.map(m => m.brand))]" :key="brand">
              <div class="tree-group-title">{{ brand }}</div>
              <div class="tree-items">
                <div v-for="model in filteredModels.filter(m => m.brand === brand)" :key="model.id"
                  class="tree-item" :class="{ active: selectedModel?.id === model.id }" @click="selectModel(model)">
                  <span class="tree-item-name">{{ model.name }}</span>
                  <NxTag size="small">{{ model.category }}</NxTag>
                </div>
              </div>
            </div>
          </div>
        </NxCard>
      </div>

      <div class="detail-panel" v-if="selectedModel">
        <NxCard>
          <div class="model-header">
            <div class="model-info">
              <div class="model-brand">{{ selectedModel.brand }}</div>
              <h2 class="model-name">{{ selectedModel.name }}</h2>
              <div class="model-meta">
                <NxTag type="primary">{{ selectedModel.category }}</NxTag>
                <span class="model-price">{{ selectedModel.price }}</span>
              </div>
            </div>
            <NxButton type="primary" @click="$router.push('/generate')">生成脚本</NxButton>
          </div>

          <div class="detail-tabs">
            <button class="detail-tab" :class="{ active: activeTab === 'specs' }" @click="activeTab = 'specs'">参数配置</button>
            <button class="detail-tab" :class="{ active: activeTab === 'selling-points' }" @click="activeTab = 'selling-points'">核心卖点</button>
          </div>

          <div v-if="activeTab === 'specs'" class="specs-grid">
            <div class="spec-item" v-for="(label, key) in { engine: '动力系统', transmission: '变速箱', power: '最大功率', torque: '峰值扭矩', acceleration: '零百加速', fuelConsumption: '油耗/电耗', dimensions: '车身尺寸', wheelbase: '轴距' }" :key="key">
              <span class="spec-label">{{ label }}</span>
              <span class="spec-value">{{ (selectedModel.specs as any)[key] }}</span>
            </div>
          </div>

          <div v-if="activeTab === 'selling-points'" class="selling-points-content">
            <div v-for="(point, index) in selectedModel.sellingPoints" :key="point.id" class="selling-point-item">
              <div class="point-number">{{ index + 1 }}</div>
              <div class="point-content">
                <div class="point-header">
                  <h4 class="point-title">{{ point.title }}</h4>
                  <NxTag :type="getHighlightColor(point.highlightLevel)" size="small">
                    {{ point.highlightLevel === 'high' ? '核心卖点' : '重要卖点' }}
                  </NxTag>
                </div>
                <p class="point-description">{{ point.description }}</p>
              </div>
            </div>
          </div>
        </NxCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.knowledge-page { max-width: var(--content-max-width); margin: 0 auto; }
.page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--spacing-xl); }
.header-left h2 { font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold); margin: 0 0 var(--spacing-xs); }
.header-left p { font-size: var(--font-size-sm); color: var(--text-secondary); margin: 0; }
.knowledge-layout { display: grid; grid-template-columns: 280px 1fr; gap: var(--spacing-xl); }
.tree-panel, .detail-panel { height: calc(100vh - 200px); overflow-y: auto; }
.tree-search, .brand-filter { padding: var(--spacing-md); border-bottom: 1px solid var(--border-light); }
.brand-select { width: 100%; height: 32px; padding: 0 var(--spacing-md); border: 1px solid var(--border-default); border-radius: var(--radius-md); font-size: var(--font-size-sm); }
.tree-content { padding: var(--spacing-sm); max-height: 500px; overflow-y: auto; }
.tree-group { margin-bottom: var(--spacing-md); }
.tree-group-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--text-secondary); padding: var(--spacing-sm); }
.tree-item { display: flex; align-items: center; justify-content: space-between; padding: var(--spacing-sm) var(--spacing-md); border-radius: var(--radius-md); cursor: pointer; transition: all var(--transition-fast); }
.tree-item:hover { background: var(--bg-secondary); }
.tree-item.active { background: var(--color-primary-50); }
.tree-item-name { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); }
.model-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: var(--spacing-xl); }
.model-brand { font-size: var(--font-size-sm); color: var(--color-primary-500); margin-bottom: var(--spacing-xs); }
.model-name { font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin: 0 0 var(--spacing-sm); }
.model-meta { display: flex; align-items: center; gap: var(--spacing-md); }
.model-price { font-size: var(--font-size-base); font-weight: var(--font-weight-semibold); color: var(--color-error); }
.detail-tabs { display: flex; gap: var(--spacing-xs); margin-bottom: var(--spacing-xl); border-bottom: 1px solid var(--border-light); padding-bottom: var(--spacing-sm); }
.detail-tab { padding: var(--spacing-sm) var(--spacing-lg); border: none; background: transparent; font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-secondary); cursor: pointer; border-radius: var(--radius-md); }
.detail-tab.active { background: var(--color-primary-50); color: var(--color-primary-500); }
.specs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--spacing-md); }
.spec-item { display: flex; flex-direction: column; gap: var(--spacing-xs); padding: var(--spacing-lg); background: var(--bg-secondary); border-radius: var(--radius-lg); }
.spec-label { font-size: var(--font-size-xs); color: var(--text-tertiary); }
.spec-value { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-primary); }
.selling-points-content { display: flex; flex-direction: column; gap: var(--spacing-lg); }
.selling-point-item { display: flex; gap: var(--spacing-lg); padding: var(--spacing-lg); background: var(--bg-secondary); border-radius: var(--radius-xl); }
.point-number { width: 36px; height: 36px; background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600)); color: white; font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.point-content { flex: 1; }
.point-header { display: flex; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm); }
.point-title { font-size: var(--font-size-base); font-weight: var(--font-weight-semibold); margin: 0; }
.point-description { font-size: var(--font-size-sm); color: var(--text-secondary); margin: 0; line-height: 1.6; }
</style>
