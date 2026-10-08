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
  <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAFAFC]/90 dark:bg-[#0B0D17]/90 border-b border-[#E8E8EF] dark:border-[#232738] transition-colors">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <router-link to="/" class="flex items-center gap-2.5 group focus:outline-none rounded-lg">
        <div class="w-8 h-8 rounded-xl bg-[#6D4AFF] flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
          <Rocket class="w-4 h-4" />
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-sm sm:text-base tracking-tight text-[#181824] dark:text-[#F3F4F8] leading-none">
            Portfolio<span class="text-[#6D4AFF]">Launchpad</span>
          </span>
          <span class="text-[10px] font-medium text-[#737385] dark:text-[#9496A8] tracking-wider uppercase mt-0.5">
            Prompt Builder
          </span>
        </div>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-1">
        <router-link 
          to="/builder" 
          class="px-3.5 py-2 rounded-xl text-sm font-medium transition-colors"
          :class="route.path === '/builder' ? 'text-[#6D4AFF] bg-[#F2EEFF] dark:bg-[#1A2033]' : 'text-[#737385] dark:text-[#9496A8] hover:text-[#181824] dark:hover:text-[#F3F4F8] hover:bg-slate-100/60 dark:hover:bg-[#141827]'"
        >
          <span class="flex items-center gap-1.5">
            <Layers class="w-4 h-4" />
            Prompt Builder
          </span>
        </router-link>

        <router-link 
          to="/learn/deploy" 
          class="px-3.5 py-2 rounded-xl text-sm font-medium transition-colors"
          :class="route.path === '/learn/deploy' ? 'text-[#6D4AFF] bg-[#F2EEFF] dark:bg-[#1A2033]' : 'text-[#737385] dark:text-[#9496A8] hover:text-[#181824] dark:hover:text-[#F3F4F8] hover:bg-slate-100/60 dark:hover:bg-[#141827]'"
        >
          <span class="flex items-center gap-1.5">
            <BookOpen class="w-4 h-4" />
            Deployment Guide
          </span>
        </router-link>
      </nav>

      <!-- Right Action Area -->
      <div class="hidden md:flex items-center gap-3">
        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-xl text-[#737385] hover:text-[#181824] dark:text-[#9496A8] dark:hover:text-[#F3F4F8] hover:bg-slate-100 dark:hover:bg-[#141827] transition-colors focus:outline-none"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="theme === 'dark'" class="w-4 h-4 text-amber-400" />
          <Moon v-else class="w-4 h-4" />
        </button>

        <!-- Primary Start CTA (Hidden if already on builder) -->
        <router-link 
          v-if="route.path !== '/builder'"
          to="/builder" 
          class="btn-primary py-2 px-4 text-xs font-semibold"
        >
          Start Building
          <ArrowRight class="w-3.5 h-3.5 ml-1.5" />
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex items-center gap-2 md:hidden">
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-lg text-[#737385] dark:text-[#9496A8]"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="theme === 'dark'" class="w-4 h-4 text-amber-400" />
          <Moon v-else class="w-4 h-4" />
        </button>

        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="p-2 rounded-lg text-[#181824] dark:text-[#F3F4F8] hover:bg-slate-100 dark:hover:bg-[#141827]"
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
      class="md:hidden border-b border-[#E8E8EF] dark:border-[#232738] bg-white dark:bg-[#141827] px-4 pt-2 pb-5 space-y-2 animate-fadeIn"
    >
      <router-link 
        to="/" 
        @click="mobileMenuOpen = false"
        class="block px-3 py-2 rounded-xl text-sm font-medium text-[#181824] dark:text-[#F3F4F8] hover:bg-[#FAFAFC] dark:hover:bg-[#1A2033]"
      >
        Home
      </router-link>
      <router-link 
        to="/builder" 
        @click="mobileMenuOpen = false"
        class="block px-3 py-2 rounded-xl text-sm font-medium text-[#181824] dark:text-[#F3F4F8] hover:bg-[#FAFAFC] dark:hover:bg-[#1A2033]"
      >
        Prompt Builder
      </router-link>
      <router-link 
        to="/learn/deploy" 
        @click="mobileMenuOpen = false"
        class="block px-3 py-2 rounded-xl text-sm font-medium text-[#181824] dark:text-[#F3F4F8] hover:bg-[#FAFAFC] dark:hover:bg-[#1A2033]"
      >
        Deployment Guide
      </router-link>
      <div class="pt-2 border-t border-[#E8E8EF] dark:border-[#232738]">
        <router-link 
          to="/builder" 
          @click="mobileMenuOpen = false"
          class="btn-primary w-full text-center text-xs"
        >
          Start Building Now
        </router-link>
      </div>
    </div>
  </header>
</template>
