<script setup lang="ts">
import NxCard from '@/components/data/NxCard.vue'
import NxButton from '@/components/common/NxButton.vue'
import NxTag from '@/components/common/NxTag.vue'

const roles = [
  { id: '1', name: '管理员', description: '拥有所有权限', permissions: ['脚本生成', '模板管理', '知识库管理', '系统设置', '团队管理'] },
  { id: '2', name: '编辑', description: '可以生成脚本和管理模板', permissions: ['脚本生成', '模板管理', '知识库查看'] },
  { id: '3', name: '查看者', description: '只可以查看内容', permissions: ['知识库查看', '历史记录查看'] }
]
</script>

<template>
  <div class="settings-page">
    <div class="settings-layout">
      <div class="settings-nav">
        <router-link to="/settings/general" class="settings-nav-item">基本设置</router-link>
        <router-link to="/settings/team" class="settings-nav-item">团队管理</router-link>
        <router-link to="/settings/permissions" class="settings-nav-item active">权限管理</router-link>
        <router-link to="/settings/security" class="settings-nav-item">安全设置</router-link>
      </div>

      <div class="settings-content">
        <NxCard>
          <template #header>
            <div class="card-header">
              <h3>角色权限</h3>
              <NxButton type="primary" size="small">新建角色</NxButton>
            </div>
          </template>
          
          <div class="roles-list">
            <div v-for="role in roles" :key="role.id" class="role-item">
              <div class="role-header">
                <div class="role-info">
                  <NxTag :type="role.name === '管理员' ? 'primary' : role.name === '编辑' ? 'success' : 'default'" size="small">{{ role.name }}</NxTag>
                  <span class="role-desc">{{ role.description }}</span>
                </div>
                <NxButton type="secondary" size="small">编辑</NxButton>
              </div>
              <div class="role-permissions">
                <NxTag v-for="p in role.permissions" :key="p" size="small" type="default">{{ p }}</NxTag>
              </div>
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
.card-header { display: flex; justify-content: space-between; align-items: center; width: 100%; }
.card-header h3 { margin: 0; font-size: var(--font-size-base); font-weight: var(--font-weight-semibold); }
.roles-list { display: flex; flex-direction: column; gap: var(--spacing-lg); }
.role-item { padding: var(--spacing-lg); background: var(--bg-secondary); border-radius: var(--radius-xl); }
.role-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-md); }
.role-info { display: flex; align-items: center; gap: var(--spacing-md); }
.role-desc { font-size: var(--font-size-sm); color: var(--text-secondary); }
.role-permissions { display: flex; flex-wrap: wrap; gap: var(--spacing-xs); }
</style>
