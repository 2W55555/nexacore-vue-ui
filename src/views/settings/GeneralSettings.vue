<script setup lang="ts">
import { ref } from 'vue'
import NxCard from '@/components/data/NxCard.vue'
import NxButton from '@/components/common/NxButton.vue'
import NxInput from '@/components/form/NxInput.vue'

const siteName = ref('NexaCore')
const siteLogo = ref('')
const language = ref('zh-CN')
const timezone = ref('Asia/Shanghai')

const saveSettings = () => alert('设置已保存')
</script>

<template>
  <div class="settings-page">
    <div class="settings-layout">
      <div class="settings-nav">
        <router-link to="/settings/general" class="settings-nav-item active">基本设置</router-link>
        <router-link to="/settings/team" class="settings-nav-item">团队管理</router-link>
        <router-link to="/settings/permissions" class="settings-nav-item">权限管理</router-link>
        <router-link to="/settings/security" class="settings-nav-item">安全设置</router-link>
      </div>

      <div class="settings-content">
        <NxCard>
          <template #header>
            <h3>基本设置</h3>
          </template>
          
          <div class="settings-form">
            <div class="form-group">
              <label>站点名称</label>
              <NxInput v-model="siteName" placeholder="请输入站点名称" size="large" />
            </div>
            <div class="form-group">
              <label>语言</label>
              <select v-model="language" class="settings-select">
                <option value="zh-CN">简体中文</option>
                <option value="en-US">English</option>
              </select>
            </div>
            <div class="form-group">
              <label>时区</label>
              <select v-model="timezone" class="settings-select">
                <option value="Asia/Shanghai">北京时间 (UTC+8)</option>
                <option value="America/New_York">美东时间 (UTC-5)</option>
                <option value="Europe/London">伦敦时间 (UTC+0)</option>
              </select>
            </div>
            <div class="form-actions">
              <NxButton type="primary" @click="saveSettings">保存设置</NxButton>
              <NxButton type="secondary">重置</NxButton>
            </div>
          </div>
        </NxCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-page { max-width: var(--content-max-width); margin: 0 auto; }
.settings-layout { display: grid; grid-template-columns: 200px 1fr; gap: var(--spacing-xl); }
.settings-nav { display: flex; flex-direction: column; gap: var(--spacing-xs); }
.settings-nav-item { padding: var(--spacing-md) var(--spacing-lg); font-size: var(--font-size-sm); color: var(--text-secondary); border-radius: var(--radius-lg); text-decoration: none; transition: all var(--transition-fast); }
.settings-nav-item:hover { background: var(--bg-secondary); color: var(--text-primary); }
.settings-nav-item.active { background: var(--color-primary-50); color: var(--color-primary-500); font-weight: var(--font-weight-medium); }
.settings-form { display: flex; flex-direction: column; gap: var(--spacing-xl); max-width: 560px; }
.form-group { display: flex; flex-direction: column; gap: var(--spacing-sm); }
.form-group label { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-primary); }
.settings-select { height: 36px; padding: 0 var(--spacing-md); border: 1px solid var(--border-default); border-radius: var(--radius-lg); font-size: var(--font-size-sm); background: var(--bg-primary); }
.form-actions { display: flex; gap: var(--spacing-md); padding-top: var(--spacing-lg); border-top: 1px solid var(--border-light); }
</style>
