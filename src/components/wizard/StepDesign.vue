<script setup lang="ts">
import { computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import type { 
  PortfolioStyle, 
  AccentColor, 
  PortfolioSection 
} from '@/types/portfolio'
import { 
  Sun, 
  Moon, 
  Monitor, 
  Check, 
  Info
} from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
const preferences = computed(() => portfolioStore.draft.preferences)

const styles: { id: PortfolioStyle; title: string; desc: string }[] = [
  {
    id: 'minimal',
    title: 'Minimalist Clean',
    desc: 'Spacious typography, high contrast, elegant simplicity, and restrained borders.',
  },
  {
    id: 'modern',
    title: 'Modern Professional',
    desc: 'Polished surfaces, crisp alignment, refined shadows, and balanced visual weight.',
  },
  {
    id: 'creative',
    title: 'Creative & Dynamic',
    desc: 'Expressive accent highlights, playful badges, and energetic visual rhythm.',
  },
  {
    id: 'developer',
    title: 'Developer Terminal',
    desc: 'Tech-focused aesthetic with code accents, monospace badges, and dark slate styling.',
  },
]

const colors: { id: AccentColor; name: string; bgClass: string }[] = [
  { id: 'purple', name: 'Purple (Brand)', bgClass: 'bg-[#6D4AFF]' },
  { id: 'blue', name: 'Electric Blue', bgClass: 'bg-blue-500' },
  { id: 'green', name: 'Emerald Green', bgClass: 'bg-emerald-500' },
  { id: 'orange', name: 'Sunset Orange', bgClass: 'bg-orange-500' },
  { id: 'neutral', name: 'Slate Monochrome', bgClass: 'bg-slate-600' },
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
    if (current.length > 1) {
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
  <div class="space-y-6 animate-fadeIn">
    <!-- Step Header -->
    <div class="border-b border-[#E8E8EF] dark:border-[#232738] pb-4">
      <div class="text-[11px] font-bold text-[#6D4AFF] uppercase tracking-wider mb-1">
        Step 4 of 5
      </div>
      <h2 class="text-xl sm:text-2xl font-bold text-[#181824] dark:text-[#F3F4F8] tracking-tight">
        Portfolio Design & Layout Preferences
      </h2>
      <p class="text-xs sm:text-sm text-[#737385] dark:text-[#9496A8] mt-1">
        Configure the aesthetic constraints and sections to include in your AI coding prompt.
      </p>
    </div>

    <!-- Product Note -->
    <div class="p-3 rounded-xl bg-[#F2EEFF]/60 dark:bg-brand-950/30 border border-[#E8E8EF] dark:border-[#232738] flex items-center gap-2.5 text-xs text-[#737385] dark:text-[#9496A8]">
      <Info class="w-4 h-4 text-[#6D4AFF] shrink-0" />
      <span>These choices define the CSS variables and styling instructions generated in your prompt.</span>
    </div>

    <!-- 1. Aesthetic Style -->
    <div class="space-y-2.5">
      <label class="block text-xs sm:text-sm font-semibold text-[#181824] dark:text-[#F3F4F8]">
        Visual Aesthetic
      </label>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          v-for="s in styles"
          :key="s.id"
          type="button"
          @click="portfolioStore.updatePreferences({ style: s.id })"
          class="text-left p-3.5 rounded-xl border transition-all duration-150 flex flex-col justify-between"
          :class="[
            preferences.style === s.id
              ? 'border-[#6D4AFF] bg-[#F2EEFF]/40 dark:bg-[#6D4AFF]/10 ring-1 ring-[#6D4AFF]'
              : 'border-[#E8E8EF] dark:border-[#232738] bg-white dark:bg-[#141827] hover:border-slate-300'
          ]"
        >
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold text-[#181824] dark:text-[#F3F4F8]">{{ s.title }}</span>
            <div 
              class="w-4 h-4 rounded-full flex items-center justify-center text-xs"
              :class="preferences.style === s.id ? 'bg-[#6D4AFF] text-white' : 'border border-slate-300 dark:border-slate-700'"
            >
              <Check v-if="preferences.style === s.id" class="w-2.5 h-2.5 stroke-[3]" />
            </div>
          </div>
          <p class="text-[11px] text-[#737385] dark:text-[#9496A8] leading-relaxed">
            {{ s.desc }}
          </p>
        </button>
      </div>
    </div>

    <!-- 2. Color Palette & Theme -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-[#E8E8EF] dark:border-[#232738]">
      <!-- Accent Color -->
      <div class="space-y-2.5">
        <label class="block text-xs sm:text-sm font-semibold text-[#181824] dark:text-[#F3F4F8]">
          Primary Accent Palette
        </label>
        <div class="grid grid-cols-5 gap-1.5">
          <button
            v-for="c in colors"
            :key="c.id"
            type="button"
            @click="portfolioStore.updatePreferences({ accentColor: c.id })"
            class="flex flex-col items-center gap-1 p-2 rounded-xl border transition-all"
            :class="[
              preferences.accentColor === c.id
                ? 'border-[#6D4AFF] bg-[#F2EEFF]/50 dark:bg-brand-950/40 ring-1 ring-[#6D4AFF]'
                : 'border-[#E8E8EF] dark:border-[#232738] bg-white dark:bg-[#141827] hover:border-slate-300'
            ]"
          >
            <div class="w-5 h-5 rounded-full shadow-sm flex items-center justify-center text-white" :class="c.bgClass">
              <Check v-if="preferences.accentColor === c.id" class="w-3 h-3 stroke-[3]" />
            </div>
            <span class="text-[9px] font-medium text-[#737385] dark:text-[#9496A8] text-center leading-tight">
              {{ c.name.split(' ')[0] }}
            </span>
          </button>
        </div>
      </div>

      <!-- Theme Mode -->
      <div class="space-y-2.5">
        <label class="block text-xs sm:text-sm font-semibold text-[#181824] dark:text-[#F3F4F8]">
          Default Theme Mode
        </label>
        <div class="grid grid-cols-3 gap-2">
          <button
            type="button"
            @click="portfolioStore.updatePreferences({ theme: 'light' })"
            class="flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all"
            :class="preferences.theme === 'light' ? 'border-[#6D4AFF] bg-[#F2EEFF]/50 dark:bg-brand-950/40 ring-1 ring-[#6D4AFF]' : 'border-[#E8E8EF] dark:border-[#232738] bg-white dark:bg-[#141827]'"
          >
            <Sun class="w-4 h-4 text-amber-500 mb-0.5" />
            <span class="text-xs font-semibold text-[#181824] dark:text-[#F3F4F8]">Light</span>
          </button>

          <button
            type="button"
            @click="portfolioStore.updatePreferences({ theme: 'dark' })"
            class="flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all"
            :class="preferences.theme === 'dark' ? 'border-[#6D4AFF] bg-[#F2EEFF]/50 dark:bg-brand-950/40 ring-1 ring-[#6D4AFF]' : 'border-[#E8E8EF] dark:border-[#232738] bg-white dark:bg-[#141827]'"
          >
            <Moon class="w-4 h-4 text-[#6D4AFF] dark:text-brand-300 mb-0.5" />
            <span class="text-xs font-semibold text-[#181824] dark:text-[#F3F4F8]">Dark</span>
          </button>

          <button
            type="button"
            @click="portfolioStore.updatePreferences({ theme: 'system' })"
            class="flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all"
            :class="preferences.theme === 'system' ? 'border-[#6D4AFF] bg-[#F2EEFF]/50 dark:bg-brand-950/40 ring-1 ring-[#6D4AFF]' : 'border-[#E8E8EF] dark:border-[#232738] bg-white dark:bg-[#141827]'"
          >
            <Monitor class="w-4 h-4 text-slate-500 mb-0.5" />
            <span class="text-xs font-semibold text-[#181824] dark:text-[#F3F4F8]">Adaptive</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 3. Sections to Structure -->
    <div class="space-y-2.5 pt-3 border-t border-[#E8E8EF] dark:border-[#232738]">
      <label class="block text-xs sm:text-sm font-semibold text-[#181824] dark:text-[#F3F4F8]">
        Included Portfolio Sections
      </label>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          v-for="sec in sectionOptions"
          :key="sec.id"
          type="button"
          @click="toggleSection(sec.id)"
          class="text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5"
          :class="[
            preferences.sections.includes(sec.id)
              ? 'border-[#6D4AFF]/40 bg-[#F2EEFF]/30 dark:bg-brand-950/20 text-[#181824] dark:text-[#F3F4F8]'
              : 'border-[#E8E8EF] dark:border-[#232738] bg-white dark:bg-[#141827] text-[#737385] opacity-60'
          ]"
        >
          <div 
            class="w-4 h-4 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors"
            :class="preferences.sections.includes(sec.id) ? 'bg-[#6D4AFF] text-white' : 'border border-slate-300 dark:border-slate-700'"
          >
            <Check v-if="preferences.sections.includes(sec.id)" class="w-2.5 h-2.5 stroke-[3]" />
          </div>
          <div class="min-w-0">
            <span class="text-xs font-bold block">{{ sec.label }}</span>
            <span class="text-[10px] text-[#737385] dark:text-[#9496A8] leading-tight block">{{ sec.desc }}</span>
          </div>
        </button>
      </div>
    </div>

    <!-- 4. Animation / Motion Level -->
    <div class="space-y-2.5 pt-3 border-t border-[#E8E8EF] dark:border-[#232738]">
      <label class="block text-xs sm:text-sm font-semibold text-[#181824] dark:text-[#F3F4F8]">
        Micro-Interactions & Animation Level
      </label>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          type="button"
          @click="portfolioStore.updatePreferences({ motion: 'none' })"
          class="p-2.5 rounded-xl border text-left transition-all"
          :class="preferences.motion === 'none' ? 'border-[#6D4AFF] bg-[#F2EEFF]/50 dark:bg-brand-950/40 ring-1 ring-[#6D4AFF]' : 'border-[#E8E8EF] dark:border-[#232738] bg-white dark:bg-[#141827]'"
        >
          <span class="block text-xs font-bold text-[#181824] dark:text-[#F3F4F8]">None</span>
          <span class="text-[10px] text-[#737385] dark:text-[#9496A8]">Zero transitions; instant state changes.</span>
        </button>

        <button
          type="button"
          @click="portfolioStore.updatePreferences({ motion: 'subtle' })"
          class="p-2.5 rounded-xl border text-left transition-all"
          :class="preferences.motion === 'subtle' ? 'border-[#6D4AFF] bg-[#F2EEFF]/50 dark:bg-brand-950/40 ring-1 ring-[#6D4AFF]' : 'border-[#E8E8EF] dark:border-[#232738] bg-white dark:bg-[#141827]'"
        >
          <span class="block text-xs font-bold text-[#6D4AFF] dark:text-brand-400">Subtle</span>
          <span class="text-[10px] text-[#737385] dark:text-[#9496A8]">Smooth hover states & soft anchor scrolling.</span>
        </button>

        <button
          type="button"
          @click="portfolioStore.updatePreferences({ motion: 'moderate' })"
          class="p-2.5 rounded-xl border text-left transition-all"
          :class="preferences.motion === 'moderate' ? 'border-[#6D4AFF] bg-[#F2EEFF]/50 dark:bg-brand-950/40 ring-1 ring-[#6D4AFF]' : 'border-[#E8E8EF] dark:border-[#232738] bg-white dark:bg-[#141827]'"
        >
          <span class="block text-xs font-bold text-[#181824] dark:text-[#F3F4F8]">Dynamic</span>
          <span class="text-[10px] text-[#737385] dark:text-[#9496A8]">Modern card elevation and section fade-ins.</span>
        </button>
      </div>
    </div>
  </div>
</template>
