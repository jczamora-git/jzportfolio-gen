<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useTheme } from '@/composables/useTheme'
import { useToast } from '@/composables/useToast'
import { 
  Rocket, 
  Sun, 
  Moon, 
  Sparkles, 
  Menu, 
  X, 
  BookOpen, 
  ShieldCheck, 
  Layers
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const portfolioStore = usePortfolioStore()
const { theme, toggleTheme } = useTheme()
const { showToast } = useToast()

const mobileMenuOpen = ref(false)

function handleLoadSample() {
  portfolioStore.loadSample()
  showToast({
    title: 'Sample Profile Loaded',
    description: 'Fictional demo data has been loaded. You can edit, customize, or reset at any time.',
    type: 'info'
  })
  mobileMenuOpen.value = false
  if (route.path !== '/builder') {
    router.push('/builder')
  }
}
</script>

<template>
  <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <router-link to="/" class="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
          <Rocket class="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-base tracking-tight text-slate-900 dark:text-white leading-none">
            Portfolio<span class="text-indigo-600 dark:text-indigo-400">Launchpad</span>
          </span>
          <span class="text-[10px] font-medium text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-0.5">
            AI Prompt Builder
          </span>
        </div>
      </router-link>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-1 lg:gap-2">
        <router-link 
          to="/builder" 
          class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="route.path === '/builder' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'"
        >
          <span class="flex items-center gap-1.5">
            <Layers class="w-4 h-4" />
            Prompt Builder
          </span>
        </router-link>

        <router-link 
          to="/learn/deploy" 
          class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="route.path === '/learn/deploy' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'"
        >
          <span class="flex items-center gap-1.5">
            <BookOpen class="w-4 h-4" />
            Deployment Guide
          </span>
        </router-link>

        <router-link 
          to="/privacy" 
          class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="route.path === '/privacy' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'"
        >
          <span class="flex items-center gap-1.5">
            <ShieldCheck class="w-4 h-4" />
            Privacy
          </span>
        </router-link>
      </nav>

      <!-- Action Area -->
      <div class="hidden md:flex items-center gap-2.5">
        <!-- Sample Data Quick Button -->
        <button 
          @click="handleLoadSample"
          class="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/30 hover:bg-indigo-100/60 dark:hover:bg-indigo-900/40 transition-colors"
          title="Fill form with sample student profile for instant demo"
        >
          <Sparkles class="w-3.5 h-3.5 text-indigo-500" />
          Try Sample Profile
        </button>

        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="theme === 'dark'" class="w-4 h-4 text-amber-400" />
          <Moon v-else class="w-4 h-4 text-slate-600" />
        </button>

        <!-- Primary Start Building CTA -->
        <router-link 
          v-if="route.path !== '/builder'"
          to="/builder" 
          class="btn-primary py-2 px-4 text-xs font-semibold"
        >
          Start Building
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex items-center gap-2 md:hidden">
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="theme === 'dark'" class="w-4 h-4 text-amber-400" />
          <Moon v-else class="w-4 h-4" />
        </button>

        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Toggle navigation menu"
        >
          <X v-if="mobileMenuOpen" class="w-6 h-6" />
          <Menu v-else class="w-6 h-6" />
        </button>
      </div>

    </div>

    <!-- Mobile Dropdown -->
    <div 
      v-if="mobileMenuOpen" 
      class="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-3"
    >
      <router-link 
        to="/" 
        @click="mobileMenuOpen = false"
        class="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        Home
      </router-link>
      <router-link 
        to="/builder" 
        @click="mobileMenuOpen = false"
        class="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        Prompt Builder
      </router-link>
      <router-link 
        to="/learn/deploy" 
        @click="mobileMenuOpen = false"
        class="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        Deployment Guide
      </router-link>
      <router-link 
        to="/privacy" 
        @click="mobileMenuOpen = false"
        class="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        Privacy Statement
      </router-link>

      <div class="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
        <button 
          @click="handleLoadSample"
          class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 text-sm font-medium"
        >
          <Sparkles class="w-4 h-4 text-indigo-500" />
          Load Sample Profile
        </button>
        <router-link 
          to="/builder" 
          @click="mobileMenuOpen = false"
          class="btn-primary w-full text-center"
        >
          Start Building Now
        </router-link>
      </div>
    </div>
  </header>
</template>
