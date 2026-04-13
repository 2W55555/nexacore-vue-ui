<script setup lang="ts">
</script>

<template>
  <div class="auth-layout">
    <!-- Background Decoration -->
    <div class="auth-bg">
      <div class="bg-gradient"></div>
      <div class="bg-grid"></div>
      <div class="bg-blur-1"></div>
      <div class="bg-blur-2"></div>
    </div>

    <!-- Auth Container -->
    <div class="auth-container">
      <div class="auth-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Background */
.auth-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f7ff 100%);
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(22, 93, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22, 93, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

.bg-blur-1 {
  position: absolute;
  width: 600px;
  height: 600px;
  top: -200px;
  right: -100px;
  background: radial-gradient(circle, rgba(22, 93, 255, 0.15) 0%, transparent 70%);
  filter: blur(60px);
}

.bg-blur-2 {
  position: absolute;
  width: 500px;
  height: 500px;
  bottom: -150px;
  left: -100px;
  background: radial-gradient(circle, rgba(0, 180, 42, 0.1) 0%, transparent 70%);
  filter: blur(60px);
}

/* Container */
.auth-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
  padding: var(--spacing-xl);
}

.auth-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);
  border: 1px solid rgba(255, 255, 255, 0.8);
  padding: var(--spacing-3xl);
  animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
