import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { layout: 'auth', title: '登录' }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { title: '控制台', icon: 'dashboard' }
  },
  {
    path: '/generate',
    name: 'Generate',
    component: () => import('@/views/GenerateView.vue'),
    meta: { title: '智能脚本生成', icon: 'generate' }
  },
  {
    path: '/templates',
    name: 'Templates',
    component: () => import('@/views/TemplatesView.vue'),
    meta: { title: '口播模板管理', icon: 'template' }
  },
  {
    path: '/knowledge',
    name: 'Knowledge',
    component: () => import('@/views/KnowledgeView.vue'),
    meta: { title: '车型&卖点知识库', icon: 'knowledge' }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/HistoryView.vue'),
    meta: { title: '生成历史', icon: 'history' }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: { title: '系统设置', icon: 'settings' },
    children: [
      {
        path: '',
        redirect: '/settings/general'
      },
      {
        path: 'general',
        name: 'SettingsGeneral',
        component: () => import('@/views/settings/GeneralSettings.vue'),
        meta: { title: '基本设置' }
      },
      {
        path: 'team',
        name: 'SettingsTeam',
        component: () => import('@/views/settings/TeamSettings.vue'),
        meta: { title: '团队管理' }
      },
      {
        path: 'permissions',
        name: 'SettingsPermissions',
        component: () => import('@/views/settings/PermissionsSettings.vue'),
        meta: { title: '权限管理' }
      },
      {
        path: 'security',
        name: 'SettingsSecurity',
        component: () => import('@/views/settings/SecuritySettings.vue'),
        meta: { title: '安全设置' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'NexaCore'} - NexaCore汽车短视频AI创作平台`
  next()
})

export default router
