<script setup lang="ts">
import { ref } from 'vue'
import NxCard from '@/components/data/NxCard.vue'
import NxButton from '@/components/common/NxButton.vue'
import NxTag from '@/components/common/NxTag.vue'

const teamMembers = ref([
  { id: '1', name: '张明远', email: 'zhang@nexacore.com', role: '管理员', avatar: '张', status: 'active' },
  { id: '2', name: '李诗涵', email: 'li@nexacore.com', role: '编辑', avatar: '李', status: 'active' },
  { id: '3', name: '王建国', email: 'wang@nexacore.com', role: '编辑', avatar: '王', status: 'invited' },
  { id: '4', name: '陈雨晴', email: 'chen@nexacore.com', role: '查看者', avatar: '陈', status: 'active' }
])

const getRoleTag = (role: string) => role === '管理员' ? 'primary' : role === '编辑' ? 'success' : 'default'
const getStatusTag = (status: string) => status === 'active' ? 'success' : 'warning'
const inviteMember = () => alert('邀请成员')
</script>

<template>
  <div class="settings-page">
    <div class="settings-layout">
      <div class="settings-nav">
        <router-link to="/settings/general" class="settings-nav-item">基本设置</router-link>
        <router-link to="/settings/team" class="settings-nav-item active">团队管理</router-link>
        <router-link to="/settings/permissions" class="settings-nav-item">权限管理</router-link>
        <router-link to="/settings/security" class="settings-nav-item">安全设置</router-link>
      </div>

      <div class="settings-content">
        <NxCard>
          <template #header>
            <div class="card-header">
              <h3>团队成员</h3>
              <NxButton type="primary" size="small" @click="inviteMember">邀请成员</NxButton>
            </div>
          </template>
          
          <table class="team-table">
            <thead>
              <tr>
                <th>成员</th>
                <th>角色</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in teamMembers" :key="member.id">
                <td>
                  <div class="member-cell">
                    <div class="member-avatar">{{ member.avatar }}</div>
                    <div class="member-info">
                      <span class="member-name">{{ member.name }}</span>
                      <span class="member-email">{{ member.email }}</span>
                    </div>
                  </div>
                </td>
                <td><NxTag :type="getRoleTag(member.role)" size="small">{{ member.role }}</NxTag></td>
                <td><NxTag :type="getStatusTag(member.status)" size="small">{{ member.status === 'active' ? '已激活' : '待激活' }}</NxTag></td>
                <td>
                  <NxButton type="text" size="small">编辑</NxButton>
                  <NxButton type="text" size="small" v-if="member.role !== '管理员'">移除</NxButton>
                </td>
              </tr>
            </tbody>
          </table>
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
.team-table { width: 100%; border-collapse: collapse; }
.team-table th { padding: var(--spacing-md); font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--text-secondary); text-align: left; border-bottom: 1px solid var(--border-light); }
.team-table td { padding: var(--spacing-md); font-size: var(--font-size-sm); border-bottom: 1px solid var(--border-light); }
.member-cell { display: flex; align-items: center; gap: var(--spacing-md); }
.member-avatar { width: 36px; height: 36px; border-radius: var(--radius-full); background: linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600)); color: white; display: flex; align-items: center; justify-content: center; font-weight: var(--font-weight-semibold); }
.member-info { display: flex; flex-direction: column; }
.member-name { font-weight: var(--font-weight-medium); }
.member-email { font-size: var(--font-size-xs); color: var(--text-tertiary); }
</style>
