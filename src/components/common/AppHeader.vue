<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { 
  Rocket, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  BookOpen, 
  Layers,
  ArrowRight
} from 'lucide-vue-next'

const route = useRoute()
const { theme, toggleTheme } = useTheme()

const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-40 w-full bg-[#F8F8F7]/90 dark:bg-[#0E1017]/90 backdrop-blur-md border-b border-[#E5E4EA] dark:border-[#242738] transition-colors">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      
      <!-- Brand Logo & Coordinate Tag -->
      <router-link to="/" class="flex items-center gap-3 group focus:outline-none">
        <div class="w-8 h-8 rounded-xl bg-[#6947FF] flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
          <Rocket class="w-4 h-4" />
        </div>
        <div class="flex flex-col">
          <span class="font-display font-bold text-base tracking-tight text-[#14151B] dark:text-[#F1F2F6] leading-none">
            Portfolio<span class="text-[#6947FF]">Launchpad</span>
          </span>
          <span class="text-[10px] font-mono text-[#696976] dark:text-[#9496A6] tracking-wider uppercase mt-0.5">
            AI Prompt Builder
          </span>
        </div>
      </router-link>

      <!-- Desktop Editorial Navigation -->
      <nav class="hidden md:flex items-center gap-1.5">
        <router-link 
          to="/builder" 
          class="px-3.5 py-2 rounded-xl text-xs font-medium transition-colors"
          :class="route.path === '/builder' ? 'text-[#6947FF] bg-[#F2EEFF] dark:bg-[#1E202E] font-semibold' : 'text-[#696976] dark:text-[#9496A6] hover:text-[#14151B] dark:hover:text-[#F1F2F6] hover:bg-slate-200/50 dark:hover:bg-[#161822]'"
        >
          <span class="flex items-center gap-1.5">
            <Layers class="w-3.5 h-3.5" />
            Prompt Builder
          </span>
        </router-link>

        <router-link 
          to="/learn/deploy" 
          class="px-3.5 py-2 rounded-xl text-xs font-medium transition-colors"
          :class="route.path === '/learn/deploy' ? 'text-[#6947FF] bg-[#F2EEFF] dark:bg-[#1E202E] font-semibold' : 'text-[#696976] dark:text-[#9496A6] hover:text-[#14151B] dark:hover:text-[#F1F2F6] hover:bg-slate-200/50 dark:hover:bg-[#161822]'"
        >
          <span class="flex items-center gap-1.5">
            <BookOpen class="w-3.5 h-3.5" />
            Deployment Guide
          </span>
        </router-link>
      </nav>

      <!-- Right Action Area -->
      <div class="hidden md:flex items-center gap-3">
        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-xl text-[#696976] hover:text-[#14151B] dark:text-[#9496A6] dark:hover:text-[#F1F2F6] hover:bg-slate-200/50 dark:hover:bg-[#161822] transition-colors focus:outline-none"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="theme === 'dark'" class="w-4 h-4 text-amber-400" />
          <Moon v-else class="w-4 h-4" />
        </button>

        <!-- Primary Start CTA (Hidden if already in builder) -->
        <router-link 
          v-if="route.path !== '/builder'"
          to="/builder" 
          class="btn-primary py-2 px-4 text-xs font-semibold"
        >
          Start Building
          <ArrowRight class="w-3.5 h-3.5 ml-1.5" />
        </router-link>
      </div>

      <!-- Mobile Controls -->
      <div class="flex items-center gap-1 md:hidden">
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-lg text-[#696976] dark:text-[#9496A6]"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="theme === 'dark'" class="w-4 h-4 text-amber-400" />
          <Moon v-else class="w-4 h-4" />
        </button>

        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="p-2 rounded-lg text-[#14151B] dark:text-[#F1F2F6] hover:bg-slate-200/50 dark:hover:bg-[#161822]"
          aria-label="Toggle navigation menu"
        >
          <X v-if="mobileMenuOpen" class="w-5 h-5" />
          <Menu v-else class="w-5 h-5" />
        </button>
      </div>

    </div>

    <!-- Mobile Dropdown -->
    <div 
      v-if="mobileMenuOpen" 
      class="md:hidden border-b border-[#E5E4EA] dark:border-[#242738] bg-[#F8F8F7] dark:bg-[#14151F] px-4 pt-2 pb-5 space-y-2 animate-fadeIn"
    >
      <router-link 
        to="/" 
        @click="mobileMenuOpen = false"
        class="block px-3 py-2 rounded-xl text-sm font-medium text-[#14151B] dark:text-[#F1F2F6] hover:bg-white dark:hover:bg-[#1E202E]"
      >
        Overview
      </router-link>
      <router-link 
        to="/builder" 
        @click="mobileMenuOpen = false"
        class="block px-3 py-2 rounded-xl text-sm font-medium text-[#14151B] dark:text-[#F1F2F6] hover:bg-white dark:hover:bg-[#1E202E]"
      >
        Prompt Builder
      </router-link>
      <router-link 
        to="/learn/deploy" 
        @click="mobileMenuOpen = false"
        class="block px-3 py-2 rounded-xl text-sm font-medium text-[#14151B] dark:text-[#F1F2F6] hover:bg-white dark:hover:bg-[#1E202E]"
      >
        Deployment Guide
      </router-link>
      <div class="pt-2 border-t border-[#E5E4EA] dark:border-[#242738]">
        <router-link 
          to="/builder" 
          @click="mobileMenuOpen = false"
          class="btn-primary w-full text-center text-xs py-2.5"
        >
          Start Building Now
        </router-link>
      </div>
    </div>
  </header>
</template>
