<script setup lang="ts">
import { computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import type { 
  PortfolioStyle, 
  AccentColor, 
  PortfolioSection 
} from '@/types/portfolio'
import { 
  Palette, 
  Sun, 
  Moon, 
  Monitor, 
  Check, 
  Info
} from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
const preferences = computed(() => portfolioStore.draft.preferences)

const styles: { id: PortfolioStyle; title: string; desc: string; preview: string }[] = [
  {
    id: 'modern',
    title: 'Modern Professional',
    desc: 'Sleek cards, clean typography, subtle gradients, and refined shadows.',
    preview: 'border-l-4 border-indigo-500 bg-slate-50 dark:bg-slate-800/80',
  },
  {
    id: 'minimal',
    title: 'Minimalist Clean',
    desc: 'Elegant monochrome typography, maximum whitespace, and distraction-free layout.',
    preview: 'border-l-4 border-slate-400 bg-white dark:bg-slate-900',
  },
  {
    id: 'creative',
    title: 'Creative & Dynamic',
    desc: 'Vibrant accent flourishes, energetic badge styling, and playful visual rhythm.',
    preview: 'border-l-4 border-purple-500 bg-purple-50/50 dark:bg-purple-950/20',
  },
  {
    id: 'developer',
    title: 'Developer Terminal',
    desc: 'Tech-focused aesthetic with code accents, monospace badges, and dark slate containers.',
    preview: 'border-l-4 border-emerald-500 bg-slate-900 text-emerald-400',
  },
]

const colors: { id: AccentColor; name: string; bgClass: string; borderClass: string }[] = [
  { id: 'blue', name: 'Electric Blue', bgClass: 'bg-blue-500', borderClass: 'border-blue-500' },
  { id: 'purple', name: 'Violet Purple', bgClass: 'bg-purple-500', borderClass: 'border-purple-500' },
  { id: 'green', name: 'Emerald Green', bgClass: 'bg-emerald-500', borderClass: 'border-emerald-500' },
  { id: 'orange', name: 'Sunset Orange', bgClass: 'bg-orange-500', borderClass: 'border-orange-500' },
  { id: 'neutral', name: 'Slate Monochrome', bgClass: 'bg-slate-600', borderClass: 'border-slate-600' },
]

const sectionOptions: { id: PortfolioSection; label: string; desc: string }[] = [
  { id: 'about', label: 'About Me Bio', desc: 'Personal story and engineering philosophy' },
  { id: 'skills', label: 'Skills & Tools', desc: 'Categorized badges of technical abilities' },
  { id: 'projects', label: 'Featured Projects', desc: 'Interactive project cards or learning journey' },
  { id: 'education', label: 'Education & Degree', desc: 'Academic history and universities' },
  { id: 'experience', label: 'Work Experience', desc: 'Professional roles and internships' },
  { id: 'certifications', label: 'Certifications', desc: 'Industry credentials and honors' },
  { id: 'contact', label: 'Contact Section', desc: 'Get in touch form or social links' },
]

function toggleSection(section: PortfolioSection) {
  const current = [...preferences.value.sections]
  const idx = current.indexOf(section)
  if (idx >= 0) {
    if (current.length > 1) { // Keep at least one section
      current.splice(idx, 1)
      portfolioStore.updatePreferences({ sections: current })
    }
  } else {
    current.push(section)
    portfolioStore.updatePreferences({ sections: current })
  }
}
</script>

<template>
  <div class="space-y-8 animate-fadeIn">
    <!-- Section Header -->
    <div class="border-b border-slate-200/80 dark:border-slate-800 pb-5">
      <div class="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
        <Palette class="w-4 h-4" />
        Step 4 of 5
      </div>
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
        Portfolio Design Preferences & Layout
      </h2>
      <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
        Customize the visual tone, color palette, and desired sections for your generated AI prompt.
      </p>
    </div>

    <!-- Product Note -->
    <div class="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 flex items-center gap-2.5 text-xs text-amber-900 dark:text-amber-300">
      <Info class="w-4 h-4 text-amber-600 shrink-0" />
      <span>
        These choices define the aesthetic instructions sent to your AI coding assistant. The assistant will produce matching CSS variables and styles.
      </span>
    </div>

    <!-- 1. Design Style -->
    <div class="space-y-3">
      <label class="block text-sm font-semibold text-slate-900 dark:text-white">
        Aesthetic & Visual Style
      </label>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          v-for="s in styles"
          :key="s.id"
          type="button"
          @click="portfolioStore.updatePreferences({ style: s.id })"
          class="text-left p-4 rounded-xl border transition-all duration-150 flex flex-col justify-between"
          :class="[
            preferences.style === s.id
              ? 'border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/20 bg-white dark:bg-slate-900 shadow-sm'
              : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
          ]"
        >
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-sm font-bold text-slate-900 dark:text-white">{{ s.title }}</span>
              <div 
                class="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                :class="preferences.style === s.id ? 'bg-indigo-600 text-white' : 'border border-slate-300 dark:border-slate-700 text-transparent'"
              >
                <Check class="w-3 h-3" />
              </div>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              {{ s.desc }}
            </p>
          </div>

          <!-- Micro style preview bar -->
          <div class="p-2 rounded-lg text-[10px] font-mono" :class="s.preview">
            <span>&lt;portfolio-theme: {{ s.id }}&gt;</span>
          </div>
        </button>
      </div>
    </div>

    <!-- 2. Color Preset & Theme -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
      <!-- Accent Color -->
      <div class="space-y-3">
        <label class="block text-sm font-semibold text-slate-900 dark:text-white">
          Primary Accent Color
        </label>
        <div class="grid grid-cols-5 gap-2">
          <button
            v-for="c in colors"
            :key="c.id"
            type="button"
            @click="portfolioStore.updatePreferences({ accentColor: c.id })"
            class="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all"
            :class="[
              preferences.accentColor === c.id
                ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
            ]"
          >
            <div class="w-6 h-6 rounded-full shadow-sm flex items-center justify-center text-white" :class="c.bgClass">
              <Check v-if="preferences.accentColor === c.id" class="w-3.5 h-3.5" />
            </div>
            <span class="text-[10px] font-medium text-slate-600 dark:text-slate-400 text-center leading-tight">
              {{ c.name.split(' ')[0] }}
            </span>
          </button>
        </div>
      </div>

      <!-- Theme Mode -->
      <div class="space-y-3">
        <label class="block text-sm font-semibold text-slate-900 dark:text-white">
          Default Website Theme
        </label>
        <div class="grid grid-cols-3 gap-2">
          <button
            type="button"
            @click="portfolioStore.updatePreferences({ theme: 'light' })"
            class="flex flex-col items-center justify-center p-3 rounded-xl border transition-all"
            :class="preferences.theme === 'light' ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'"
          >
            <Sun class="w-5 h-5 text-amber-500 mb-1" />
            <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">Light</span>
          </button>

          <button
            type="button"
            @click="portfolioStore.updatePreferences({ theme: 'dark' })"
            class="flex flex-col items-center justify-center p-3 rounded-xl border transition-all"
            :class="preferences.theme === 'dark' ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'"
          >
            <Moon class="w-5 h-5 text-indigo-400 mb-1" />
            <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">Dark</span>
          </button>

          <button
            type="button"
            @click="portfolioStore.updatePreferences({ theme: 'system' })"
            class="flex flex-col items-center justify-center p-3 rounded-xl border transition-all"
            :class="preferences.theme === 'system' ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'"
          >
            <Monitor class="w-5 h-5 text-slate-500 mb-1" />
            <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">Adaptive</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 3. Sections to Include -->
    <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
      <div class="flex items-center justify-between">
        <div>
          <label class="block text-sm font-semibold text-slate-900 dark:text-white">
            Included Portfolio Sections
          </label>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Select which sections your AI assistant should structure in index.html.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          v-for="sec in sectionOptions"
          :key="sec.id"
          type="button"
          @click="toggleSection(sec.id)"
          class="text-left p-3 rounded-xl border transition-all flex items-start gap-3"
          :class="[
            preferences.sections.includes(sec.id)
              ? 'border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/40 dark:bg-indigo-950/30 text-slate-900 dark:text-white'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 opacity-60'
          ]"
        >
          <div 
            class="w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors"
            :class="preferences.sections.includes(sec.id) ? 'bg-indigo-600 text-white' : 'border border-slate-300 dark:border-slate-700'"
          >
            <Check v-if="preferences.sections.includes(sec.id)" class="w-3.5 h-3.5" />
          </div>
          <div class="min-w-0">
            <span class="text-xs font-bold block">{{ sec.label }}</span>
            <span class="text-[11px] text-slate-500 dark:text-slate-400 leading-tight block">{{ sec.desc }}</span>
          </div>
        </button>
      </div>
    </div>

    <!-- 4. Animation / Motion Level -->
    <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
      <label class="block text-sm font-semibold text-slate-900 dark:text-white">
        Micro-Interactions & Animation Level
      </label>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          @click="portfolioStore.updatePreferences({ motion: 'none' })"
          class="p-3 rounded-xl border text-left transition-all"
          :class="preferences.motion === 'none' ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'"
        >
          <span class="block text-xs font-bold text-slate-900 dark:text-white">None (Static)</span>
          <span class="text-[11px] text-slate-500 dark:text-slate-400">Strictly no transitions; immediate response.</span>
        </button>

        <button
          type="button"
          @click="portfolioStore.updatePreferences({ motion: 'subtle' })"
          class="p-3 rounded-xl border text-left transition-all"
          :class="preferences.motion === 'subtle' ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'"
        >
          <span class="block text-xs font-bold text-indigo-600 dark:text-indigo-400">Subtle (Recommended)</span>
          <span class="text-[11px] text-slate-500 dark:text-slate-400">Smooth hover states, soft anchor scrolling.</span>
        </button>

        <button
          type="button"
          @click="portfolioStore.updatePreferences({ motion: 'moderate' })"
          class="p-3 rounded-xl border text-left transition-all"
          :class="preferences.motion === 'moderate' ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'"
        >
          <span class="block text-xs font-bold text-slate-900 dark:text-white">Dynamic & Smooth</span>
          <span class="text-[11px] text-slate-500 dark:text-slate-400">Modern card elevations and section fade-ins.</span>
        </button>
      </div>
    </div>
  </div>
</template>
