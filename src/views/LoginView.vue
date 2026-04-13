<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import NxButton from '@/components/common/NxButton.vue'
import NxInput from '@/components/form/NxInput.vue'

const router = useRouter()
const authStore = useAuthStore()

const loginForm = ref({
  username: '',
  password: '',
  rememberMe: false
})

const loading = ref(false)
const error = ref('')

onMounted(() => {
  // 检查是否已登录
  if (authStore.checkAuth()) {
    router.push('/')
  }
})

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    error.value = '请输入用户名和密码'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const success = await authStore.login(loginForm.value)
    if (success) {
      router.push('/')
    } else {
      error.value = '登录失败，请检查用户名和密码'
    }
  } catch (e) {
    error.value = '登录失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const handleEnter = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleLogin()
  }
}
</script>

<template>
  <div class="login-page">
    <!-- Logo Section -->
    <div class="login-header">
      <div class="logo">
        <svg viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="6" fill="url(#logoGrad)"/>
          <path d="M8 10h16M8 16h12M8 22h8" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="24" cy="22" r="3" fill="#60A5FA"/>
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
              <stop stop-color="#165DFF"/>
              <stop offset="1" stop-color="#0D43DB"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h1 class="login-title">NexaCore</h1>
      <p class="login-subtitle">汽车短视频脚本AI创作平台</p>
    </div>

    <!-- Login Form -->
    <div class="login-form">
      <div class="form-title">
        <h2>欢迎回来</h2>
        <p>登录您的账户继续创作</p>
      </div>

      <NxInput
        v-model="loginForm.username"
        placeholder="请输入用户名/邮箱"
        size="large"
        @keyup="handleEnter"
      >
        <template #prefix>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </template>
      </NxInput>

      <NxInput
        v-model="loginForm.password"
        type="password"
        placeholder="请输入密码"
        size="large"
        @keyup="handleEnter"
      >
        <template #prefix>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
        </template>
      </NxInput>

      <div v-if="error" class="error-message">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>{{ error }}</span>
      </div>

      <div class="form-options">
        <label class="checkbox-label">
          <input 
            v-model="loginForm.rememberMe" 
            type="checkbox" 
            class="checkbox"
          />
          <span>记住我</span>
        </label>
        <a href="#" class="forgot-link">忘记密码？</a>
      </div>

      <NxButton 
        type="primary" 
        size="large" 
        block 
        :loading="loading"
        @click="handleLogin"
      >
        登录
      </NxButton>

      <div class="form-footer">
        <span>还没有账户？</span>
        <a href="#" class="register-link">立即注册</a>
      </div>
    </div>

    <!-- Footer -->
    <div class="login-footer">
      <p>© 2024 NexaCore. All rights reserved.</p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  width: 100%;
  max-width: 400px;
}

/* Header */
.login-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.logo {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-lg);
}

.logo svg {
  width: 100%;
  height: 100%;
}

.login-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-sm);
}

.login-subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-title {
  text-align: center;
  margin-bottom: var(--spacing-sm);
}

.form-title h2 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-xs);
}

.form-title p {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

/* Error */
.error-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: #fee2e2;
  color: #dc2626;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

/* Options */
.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.forgot-link {
  font-size: var(--font-size-sm);
  color: var(--color-primary-500);
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

/* Footer */
.form-footer {
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.register-link {
  color: var(--color-primary-500);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.register-link:hover {
  text-decoration: underline;
}

/* Page Footer */
.login-footer {
  text-align: center;
  margin-top: var(--spacing-3xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--border-light);
}

.login-footer p {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin: 0;
}
</style>
