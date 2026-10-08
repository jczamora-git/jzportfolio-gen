<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useMobileNavigation } from '@/composables/useMobileNavigation'
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
const headerRef = ref<HTMLElement | null>(null)

const {
  isOpen: mobileMenuOpen,
  close: closeMobileMenu,
  toggle: toggleMobileMenu,
  handleClickOutside,
  handleKeydown,
  handleBreakpointChange
} = useMobileNavigation()

// Close mobile menu on route navigation
watch(() => route.path, () => {
  closeMobileMenu()
})

function onDocumentClick(event: MouseEvent) {
  const path = event.composedPath ? event.composedPath() : []
  handleClickOutside(event.target, headerRef.value, path)
}

function onDocumentKeydown(event: KeyboardEvent) {
  handleKeydown(event)
}

let mql: MediaQueryList | null = null
function onMediaChange(e: MediaQueryListEvent | MediaQueryList) {
  handleBreakpointChange(e.matches)
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', onDocumentKeydown)
    document.addEventListener('click', onDocumentClick)

    if (window.matchMedia) {
      mql = window.matchMedia('(min-width: 768px)')
      if (mql.addEventListener) {
        mql.addEventListener('change', onMediaChange)
      } else if ('addListener' in mql) {
        // Fallback for older Safari/browsers
        (mql as MediaQueryList).addListener(onMediaChange)
      }
    }
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onDocumentKeydown)
    document.removeEventListener('click', onDocumentClick)

    if (mql) {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', onMediaChange)
      } else if ('removeListener' in mql) {
        (mql as MediaQueryList).removeListener(onMediaChange)
      }
      mql = null
    }
  }
})
</script>

<template>
  <header ref="headerRef" class="sticky top-3 sm:top-4 z-50 w-full px-4 sm:px-6">
    <!-- Creatix-Inspired Floating Capsule Nav (Permanent Dark Appearance in Both Themes) -->
    <div class="max-w-5xl mx-auto bg-[#12131C]/95 dark:bg-[#1A1A24]/95 backdrop-blur-md text-[#F1F2F6] border border-[#242738] dark:border-[#414151]/80 rounded-full px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between shadow-xl">
      
      <!-- Left Navigation Links (Desktop) -->
      <nav class="hidden md:flex items-center gap-1" aria-label="Main Navigation">
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
      <router-link to="/" class="flex items-center gap-2.5 group focus:outline-none" aria-label="Portfolio Launchpad Home">
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

        <!-- Theme Toggle Button -->
        <button 
          type="button"
          @click="toggleTheme" 
          class="p-2 rounded-full text-[#9496A6] hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6947FF]/30"
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
          type="button"
          @click.stop="toggleTheme" 
          class="p-2 rounded-full text-[#9496A6] hover:text-white focus:outline-none"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="theme === 'dark'" class="w-4 h-4 text-amber-400 pointer-events-none" />
          <Moon v-else class="w-4 h-4 pointer-events-none" />
        </button>

        <button 
          type="button"
          @click.stop="toggleMobileMenu"
          class="p-2 rounded-full text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#6947FF]/40 cursor-pointer"
          :aria-label="mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-nav-menu"
        >
          <X v-if="mobileMenuOpen" class="w-5 h-5 pointer-events-none" />
          <Menu v-else class="w-5 h-5 pointer-events-none" />
        </button>
      </div>

    </div>

    <!-- Mobile Dropdown Capsule (Consistent Dark Appearance in BOTH Light & Dark Modes) -->
    <Transition name="mobile-menu">
      <div 
        v-if="mobileMenuOpen" 
        id="mobile-nav-menu"
        class="md:hidden mt-2 max-w-5xl mx-auto bg-[#12131C]/98 dark:bg-[#1A1A24]/98 backdrop-blur-lg border border-[#242738] dark:border-[#414151]/80 rounded-3xl p-4 sm:p-5 space-y-2 shadow-2xl text-xs text-white"
      >
        <nav class="space-y-1" aria-label="Mobile Navigation">
          <router-link 
            to="/" 
            @click="closeMobileMenu"
            class="block px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors"
            :class="route.path === '/' ? 'bg-[#6947FF]/20 text-[#B096FF] font-semibold border border-[#6947FF]/30' : 'text-white hover:bg-white/10'"
          >
            Overview
          </router-link>
          
          <router-link 
            to="/builder" 
            @click="closeMobileMenu"
            class="block px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors"
            :class="route.path === '/builder' ? 'bg-[#6947FF]/20 text-[#B096FF] font-semibold border border-[#6947FF]/30' : 'text-white hover:bg-white/10'"
          >
            Prompt Builder
          </router-link>
          
          <router-link 
            to="/learn/deploy" 
            @click="closeMobileMenu"
            class="block px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors"
            :class="route.path === '/learn/deploy' ? 'bg-[#6947FF]/20 text-[#B096FF] font-semibold border border-[#6947FF]/30' : 'text-white hover:bg-white/10'"
          >
            Deployment Guide
          </router-link>
        </nav>

        <div class="pt-2 border-t border-[#242738] dark:border-[#414151]/60">
          <router-link 
            to="/builder" 
            @click="closeMobileMenu"
            class="btn-primary w-full text-center text-xs py-2.5 font-semibold block"
          >
            Start Building Now
          </router-link>
        </div>
      </div>
    </Transition>
  </header>
</template>
