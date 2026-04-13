import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))

  const isAuthenticated = computed(() => !!token.value)

  const mockUser: User = {
    id: '1',
    username: '张明远',
    email: 'zhangmingyuan@nexacore.com',
    avatar: '',
    role: 'admin',
    createdAt: '2024-01-15',
    lastLoginAt: new Date().toISOString()
  }

  async function login(credentials: LoginCredentials): Promise<boolean> {
    // 模拟登录
    if (credentials.username && credentials.password) {
      user.value = mockUser
      token.value = 'mock-jwt-token-' + Date.now()
      if (credentials.rememberMe) {
        localStorage.setItem('token', token.value)
      }
      return true
    }
    return false
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }

  function checkAuth(): boolean {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      token.value = storedToken
      user.value = mockUser
      return true
    }
    return false
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
})
