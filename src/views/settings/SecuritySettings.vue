<script setup lang="ts">
import { ref } from 'vue'
import NxCard from '@/components/data/NxCard.vue'
import NxButton from '@/components/common/NxButton.vue'

const twoFactorEnabled = ref(false)
const sessionTimeout = ref('30')
const loginAlerts = ref(true)

const saveSecurity = () => alert('安全设置已保存')
</script>

<template>
  <div class="settings-page">
    <div class="settings-layout">
      <div class="settings-nav">
        <router-link to="/settings/general" class="settings-nav-item">基本设置</router-link>
        <router-link to="/settings/team" class="settings-nav-item">团队管理</router-link>
        <router-link to="/settings/permissions" class="settings-nav-item">权限管理</router-link>
        <router-link to="/settings/security" class="settings-nav-item active">安全设置</router-link>
      </div>

      <div class="settings-content">
        <NxCard>
          <template #header><h3>账户安全</h3></template>
          <div class="security-section">
            <div class="security-item">
              <div class="security-info">
                <span class="security-title">双因素认证</span>
                <span class="security-desc">启用后登录需要输入手机验证码</span>
              </div>
              <label class="toggle"><input type="checkbox" v-model="twoFactorEnabled" /><span class="toggle-slider"></span></label>
            </div>
            <div class="security-item">
              <div class="security-info">
                <span class="security-title">会话超时</span>
                <span class="security-desc">设置空闲自动退出时间</span>
              </div>
              <select v-model="sessionTimeout" class="settings-select">
                <option value="15">15分钟</option>
                <option value="30">30分钟</option>
                <option value="60">1小时</option>
                <option value="120">2小时</option>
              </select>
            </div>
            <div class="security-item">
              <div class="security-info">
                <span class="security-title">登录提醒</span>
                <span class="security-desc">新设备登录时发送邮件通知</span>
              </div>
              <label class="toggle"><input type="checkbox" v-model="loginAlerts" /><span class="toggle-slider"></span></label>
            </div>
          </div>
          <div class="form-actions">
            <NxButton type="primary" @click="saveSecurity">保存设置</NxButton>
          </div>
        </NxCard>

        <NxCard class="mt-lg">
          <template #header><h3>密码管理</h3></template>
          <div class="password-form">
            <div class="form-group">
              <label>当前密码</label>
              <input type="password" class="settings-input" placeholder="请输入当前密码" />
            </div>
            <div class="form-group">
              <label>新密码</label>
              <input type="password" class="settings-input" placeholder="请输入新密码" />
            </div>
            <div class="form-group">
              <label>确认新密码</label>
              <input type="password" class="settings-input" placeholder="请再次输入新密码" />
            </div>
            <NxButton type="primary">修改密码</NxButton>
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
.security-section { display: flex; flex-direction: column; gap: var(--spacing-lg); margin-bottom: var(--spacing-lg); }
.security-item { display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-md) 0; border-bottom: 1px solid var(--border-light); }
.security-info { display: flex; flex-direction: column; gap: 2px; }
.security-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-primary); }
.security-desc { font-size: var(--font-size-xs); color: var(--text-tertiary); }
.toggle { position: relative; width: 44px; height: 24px; cursor: pointer; }
.toggle input { opacity: 0; width: 0; height: 0; }
.toggle-slider { position: absolute; inset: 0; background: var(--color-gray-300); border-radius: 12px; transition: all var(--transition-fast); }
.toggle-slider::before { content: ''; position: absolute; width: 18px; height: 18px; left: 3px; top: 3px; background: white; border-radius: 50%; transition: all var(--transition-fast); }
.toggle input:checked + .toggle-slider { background: var(--color-primary-500); }
.toggle input:checked + .toggle-slider::before { transform: translateX(20px); }
.settings-select { height: 36px; padding: 0 var(--spacing-md); border: 1px solid var(--border-default); border-radius: var(--radius-lg); font-size: var(--font-size-sm); background: var(--bg-primary); }
.form-actions { padding-top: var(--spacing-lg); border-top: 1px solid var(--border-light); }
.mt-lg { margin-top: var(--spacing-lg); }
.password-form { display: flex; flex-direction: column; gap: var(--spacing-lg); max-width: 400px; }
.form-group { display: flex; flex-direction: column; gap: var(--spacing-sm); }
.form-group label { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-primary); }
.settings-input { height: 36px; padding: 0 var(--spacing-md); border: 1px solid var(--border-default); border-radius: var(--radius-lg); font-size: var(--font-size-sm); background: var(--bg-primary); }
.settings-input:focus { outline: none; border-color: var(--color-primary-500); box-shadow: 0 0 0 3px var(--color-primary-100); }
</style>
