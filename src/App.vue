<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const portfolioStore = usePortfolioStore()
useTheme()

const isLandingPage = computed(() => route.path === '/')

onMounted(() => {
  portfolioStore.initStore()
})
</script>

<template>
  <div 
    class="min-h-screen flex flex-col"
    :class="isLandingPage ? 'bg-white dark:bg-[#20202B] text-[#17171D] dark:text-[#F8F8FA]' : 'bg-[#F7F7F9] dark:bg-[#101015] text-[#17171D] dark:text-[#F8F8FA]'"
  >
    <AppHeader />
    <div class="flex-1">
      <router-view />
    </div>
    <AppFooter />
    <ToastContainer />
  </div>
</template>
