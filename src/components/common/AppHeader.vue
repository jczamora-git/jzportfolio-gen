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
  <header class="sticky top-3 z-50 w-full px-4 sm:px-6 transition-all duration-200">
    <!-- Creatix-Inspired Floating Capsule Nav -->
    <div class="max-w-5xl mx-auto bg-[#12131C]/95 backdrop-blur-md text-[#F1F2F6] border border-[#242738] rounded-full px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between shadow-2xl">
      
      <!-- Left Navigation Links (Desktop) -->
      <nav class="hidden md:flex items-center gap-1">
        <router-link 
          to="/" 
          class="px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors"
          :class="route.path === '/' ? 'text-white bg-white/10 font-semibold' : 'text-[#9496A6] hover:text-white hover:bg-white/5'"
        >
          Overview
        </router-link>

        <router-link 
          to="/builder" 
          class="px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors"
          :class="route.path === '/builder' ? 'text-[#6947FF] bg-[#6947FF]/15 font-semibold' : 'text-[#9496A6] hover:text-white hover:bg-white/5'"
        >
          <span class="flex items-center gap-1.5">
            <Layers class="w-3.5 h-3.5" />
            Prompt Builder
          </span>
        </router-link>
      </nav>

      <!-- Center: Brand Logo -->
      <router-link to="/" class="flex items-center gap-2.5 group focus:outline-none">
        <div class="w-7 h-7 rounded-lg bg-[#6947FF] flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
          <Rocket class="w-3.5 h-3.5" />
        </div>
        <div class="flex items-center gap-1">
          <span class="font-display font-bold text-sm sm:text-base tracking-tight text-white leading-none">
            Portfolio<span class="text-[#6947FF]">Launchpad</span>
          </span>
          <span class="w-1.5 h-1.5 rounded-full bg-[#6947FF]"></span>
        </div>
      </router-link>

      <!-- Right Action Area (Desktop) -->
      <div class="hidden md:flex items-center gap-2.5">
        <router-link 
          to="/learn/deploy" 
          class="px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors"
          :class="route.path === '/learn/deploy' ? 'text-[#6947FF] bg-[#6947FF]/15 font-semibold' : 'text-[#9496A6] hover:text-white hover:bg-white/5'"
        >
          <span class="flex items-center gap-1.5">
            <BookOpen class="w-3.5 h-3.5" />
            Deploy Guide
          </span>
        </router-link>

        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-full text-[#9496A6] hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="theme === 'dark'" class="w-3.5 h-3.5 text-amber-400" />
          <Moon v-else class="w-3.5 h-3.5" />
        </button>

        <!-- Primary Start CTA (Hidden if on builder) -->
        <router-link 
          v-if="route.path !== '/builder'"
          to="/builder" 
          class="btn-primary py-1.5 px-4 text-xs font-semibold"
        >
          <span>Start Building</span>
          <ArrowRight class="w-3 h-3 ml-1" />
        </router-link>
      </div>

      <!-- Mobile Menu Controls -->
      <div class="flex items-center gap-1 md:hidden">
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-full text-[#9496A6] hover:text-white"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="theme === 'dark'" class="w-4 h-4 text-amber-400" />
          <Moon v-else class="w-4 h-4" />
        </button>

        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="p-2 rounded-full text-white hover:bg-white/10"
          aria-label="Toggle navigation menu"
        >
          <X v-if="mobileMenuOpen" class="w-5 h-5" />
          <Menu v-else class="w-5 h-5" />
        </button>
      </div>

    </div>

    <!-- Mobile Dropdown Capsule -->
    <div 
      v-if="mobileMenuOpen" 
      class="md:hidden mt-2 max-w-5xl mx-auto bg-[#12131C]/98 backdrop-blur-lg border border-[#242738] rounded-3xl p-5 space-y-2.5 shadow-2xl text-xs animate-fadeIn"
    >
      <router-link 
        to="/" 
        @click="mobileMenuOpen = false"
        class="block px-4 py-2.5 rounded-2xl text-sm font-medium text-white hover:bg-white/5"
      >
        Overview
      </router-link>
      <router-link 
        to="/builder" 
        @click="mobileMenuOpen = false"
        class="block px-4 py-2.5 rounded-2xl text-sm font-medium text-white hover:bg-white/5"
      >
        Prompt Builder
      </router-link>
      <router-link 
        to="/learn/deploy" 
        @click="mobileMenuOpen = false"
        class="block px-4 py-2.5 rounded-2xl text-sm font-medium text-white hover:bg-white/5"
      >
        Deployment Guide
      </router-link>
      <div class="pt-2 border-t border-[#242738]">
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
