<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './components/layout/MainLayout.vue'
import AuthLayout from './components/layout/AuthLayout.vue'

const route = useRoute()

const isAuthPage = computed(() => {
  return route.meta.layout === 'auth' || route.path === '/login'
})
</script>

<template>
  <div id="nexacore-app">
    <AuthLayout v-if="isAuthPage">
      <router-view />
    </AuthLayout>
    <MainLayout v-else>
      <router-view />
    </MainLayout>
  </div>
</template>

<style>
#nexacore-app {
  min-height: 100vh;
}
</style>
