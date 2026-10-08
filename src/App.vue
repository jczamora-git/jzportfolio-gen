<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useTheme } from '@/composables/useTheme'

const portfolioStore = usePortfolioStore()
useTheme()

onMounted(() => {
  portfolioStore.initStore()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
    <AppHeader />
    <div class="flex-1">
      <router-view />
    </div>
    <AppFooter />
    <ToastContainer />
  </div>
</template>
