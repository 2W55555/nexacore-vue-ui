<script setup lang="ts">
import { ref, computed } from 'vue'
import NxCard from '@/components/data/NxCard.vue'
import NxButton from '@/components/common/NxButton.vue'
import NxInput from '@/components/form/NxInput.vue'
import NxSelect from '@/components/form/NxSelect.vue'
import NxTag from '@/components/common/NxTag.vue'
import NxModal from '@/components/feedback/NxModal.vue'

const appStore = useAppStore()

const form = ref({
  carModel: '',
  scriptType: '口播',
  duration: 60,
  tone: '专业热情',
  keyPoints: '',
  includeHashtags: true,
  includeCTA: true
})

const scriptTypeOptions = [
  { label: '口播', value: '口播' },
  { label: '评测', value: '评测' },
  { label: '对比', value: '对比' },
  { label: '科普', value: '科普' }
]

const toneOptions = [
  { label: '专业热情', value: '专业热情' },
  { label: '轻松幽默', value: '轻松幽默' },
  { label: '高端大气', value: '高端大气' },
  { label: '接地气', value: '接地气' }
]

const durationOptions = [
  { label: '30秒', value: 30 },
  { label: '60秒', value: 60 },
  { label: '90秒', value: 90 },
  { label: '120秒', value: 120 },
  { label: '180秒', value: 180 },
  { label: '300秒', value: 300 }
]

const isGenerating = ref(false)
const generatedScript = ref('')
const showPreview = ref(false)

const popularModels = computed(() => appStore.carModels.slice(0, 5))

const generateScript = async () => {
  if (!form.value.carModel) {
    alert('请输入车型名称')
    return
  }
  
  isGenerating.value = true
  
  // 模拟生成过程
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  generatedScript.value = `
【开场 - 5秒】
各位老铁好！今天我们来看看这台${form.value.carModel}，这台车最近可是火遍全网，让我们一起来深度体验一下！

【核心卖点 - ${Math.floor(form.value.duration * 0.6)}秒】
${form.value.tone === '专业热情' ? '首先让我给大家介绍一下它的核心亮点：' : ''}
${form.value.tone === '轻松幽默' ? '这台车有几个点我是真的服气，一起来看看！' : ''}
${form.value.tone === '高端大气' ? '作为同级别中的标杆产品，它的表现究竟如何？' : ''}
${form.value.tone === '接地气' ? '说实话，这台车真的不错，听我给你细细道来！' : ''}

1️⃣ 智能科技配置
这台${form.value.carModel}搭载了最新的智能驾驶辅助系统，支持城市NOA功能，在日常通勤中能够大大减轻驾驶压力。

2️⃣ 动力性能表现
动力输出线性，加速体感优秀，无论是城市道路还是高速巡航，都能给你满满的信心。

3️⃣ 空间舒适性
${form.value.tone === '高端大气' ? '采用Nappa真皮座椅，乘坐舒适度堪称豪华。' : '座椅坐着是真的舒服，长途也不累。' }

${form.value.keyPoints ? `4️⃣ ${form.value.keyPoints}` : ''}

【结尾 - 5秒】
${form.value.includeCTA ? '如果你对这台车感兴趣，欢迎在评论区留言交流，别忘了点赞关注，我们下期再见！' : '以上就是本期内容，喜欢的话点个赞，我们下期再见！' }

${form.value.includeHashtags ? `
#汽车 #${form.value.carModel} #新车 #测评 #新能源汽车` : ''}
`

  isGenerating.value = false
  showPreview.value = true
}

const selectModel = (model: string) => {
  form.value.carModel = model
}

const copyScript = () => {
  navigator.clipboard.writeText(generatedScript.value)
  alert('已复制到剪贴板')
}

const saveToHistory = () => {
  const newItem = {
    id: Date.now().toString(),
    type: 'script' as const,
    title: `${form.value.carModel}脚本`,
    carModel: form.value.carModel,
    scriptType: form.value.scriptType,
    createdAt: new Date().toLocaleString(),
    duration: form.value.duration,
    status: '完成' as const
  }
  appStore.addToHistory(newItem)
  alert('已保存到历史记录')
}
</script>

<script lang="ts">
import { useAppStore } from '@/store/app'
export default { name: 'GenerateView' }
</script>

<template>
  <div class="generate-page">
    <div class="generate-layout">
      <!-- Left Panel - Config -->
      <div class="generate-config">
        <NxCard>
          <template #header>
            <h3>脚本配置</h3>
          </template>
          
          <div class="config-form">
            <!-- Car Model -->
            <div class="form-group">
              <label class="form-label">车型名称 <span class="required">*</span></label>
              <NxInput 
                v-model="form.carModel" 
                placeholder="例如：问界M9、小米SU7"
                size="large"
              />
              <div class="popular-models">
                <span class="popular-label">热门车型：</span>
                <span 
                  v-for="model in popularModels" 
                  :key="model.id"
                  class="popular-item"
                  @click="selectModel(model.name)"
                >
                  {{ model.name }}
                </span>
              </div>
            </div>

            <!-- Script Type -->
            <div class="form-group">
              <label class="form-label">脚本类型</label>
              <NxSelect 
                v-model="form.scriptType" 
                :options="scriptTypeOptions"
                placeholder="选择脚本类型"
              />
            </div>

            <!-- Duration -->
            <div class="form-group">
              <label class="form-label">视频时长</label>
              <NxSelect 
                v-model="form.duration" 
                :options="durationOptions"
                placeholder="选择视频时长"
              />
            </div>

            <!-- Tone -->
            <div class="form-group">
              <label class="form-label">口播风格</label>
              <NxSelect 
                v-model="form.tone" 
                :options="toneOptions"
                placeholder="选择口播风格"
              />
            </div>

            <!-- Key Points -->
            <div class="form-group">
              <label class="form-label">重点强调</label>
              <NxInput 
                v-model="form.keyPoints" 
                placeholder="输入需要重点强调的卖点（选填）"
              />
            </div>

            <!-- Options -->
            <div class="form-group">
              <label class="form-label">附加内容</label>
              <div class="checkbox-group">
                <label class="checkbox-item">
                  <input type="checkbox" v-model="form.includeHashtags" />
                  <span>自动生成话题标签</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="form.includeCTA" />
                  <span>包含引导关注话术</span>
                </label>
              </div>
            </div>

            <!-- Generate Button -->
            <div class="form-actions">
              <NxButton 
                type="primary" 
                size="large" 
                block
                :loading="isGenerating"
                @click="generateScript"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"/>
                </svg>
                {{ isGenerating ? '生成中...' : 'AI智能生成' }}
              </NxButton>
            </div>
          </div>
        </NxCard>
      </div>

      <!-- Right Panel - Preview -->
      <div class="generate-preview">
        <NxCard class="preview-card">
          <template #header>
            <div class="preview-header">
              <h3>脚本预览</h3>
              <div class="preview-actions" v-if="generatedScript">
                <NxButton type="secondary" size="small" @click="copyScript">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                  复制
                </NxButton>
                <NxButton type="primary" size="small" @click="saveToHistory">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                    <polyline points="17,21 17,13 7,13 7,21"/>
                    <polyline points="7,3 7,8 15,8"/>
                  </svg>
                  保存
                </NxButton>
              </div>
            </div>
          </template>

          <div class="preview-content" v-if="generatedScript">
            <pre class="script-text">{{ generatedScript }}</pre>
          </div>

          <div class="preview-empty" v-else>
            <div class="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <h4>等待生成脚本</h4>
            <p>填写左侧配置信息，点击「AI智能生成」按钮开始创作</p>
          </div>
        </NxCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.generate-page {
  height: calc(100vh - var(--header-height) - var(--spacing-xl) * 2);
}

.generate-layout {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: var(--spacing-xl);
  height: 100%;
}

/* Config Panel */
.generate-config {
  height: 100%;
  overflow-y: auto;
}

.config-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.required {
  color: var(--color-error);
}

.popular-models {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);
}

.popular-label {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.popular-item {
  font-size: var(--font-size-xs);
  color: var(--color-primary-500);
  background: var(--color-primary-50);
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.popular-item:hover {
  background: var(--color-primary-100);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.checkbox-item input {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.form-actions {
  margin-top: var(--spacing-md);
}

/* Preview Panel */
.generate-preview {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.preview-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.preview-header h3 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.preview-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.preview-content {
  flex: 1;
  overflow-y: auto;
}

.script-text {
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--text-primary);
  background: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  margin: 0;
}

.preview-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-tertiary);
}

.empty-icon {
  margin-bottom: var(--spacing-lg);
  opacity: 0.5;
}

.preview-empty h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-sm);
}

.preview-empty p {
  font-size: var(--font-size-sm);
  margin: 0;
  max-width: 300px;
}

/* Responsive */
@media (max-width: 1024px) {
  .generate-layout {
    grid-template-columns: 1fr;
  }

  .generate-page {
    height: auto;
  }

  .generate-config {
    height: auto;
  }
}
</style>
