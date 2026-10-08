<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useToast } from '@/composables/useToast'
import { 
  Sparkles, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  Code2, 
  FolderGit2, 
  Palette, 
  ExternalLink,
  ArrowRight,
  ShieldCheck
} from 'lucide-vue-next'

const router = useRouter()
const portfolioStore = usePortfolioStore()
const { showToast } = useToast()

const draft = computed(() => portfolioStore.draft)
const isReady = computed(() => portfolioStore.isWizardReadyForGeneration)

function goToStep(step: number) {
  portfolioStore.currentStep = step
}

function handleGenerate() {
  if (!isReady.value) {
    showToast({
      title: 'Missing Required Fields',
      description: 'Please complete your Name, Headline, and at least 1 Skill before generating.',
      type: 'warning'
    })
    return
  }

  showToast({
    title: 'Prompt Generated Successfully',
    description: 'Your tailored AI prompt is ready to copy and use.',
    type: 'success'
  })
  router.push('/result')
}
</script>

<template>
  <div class="space-y-8 animate-fadeIn">
    <!-- Section Header -->
    <div class="border-b border-slate-200/80 dark:border-slate-800 pb-5">
      <div class="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
        <Sparkles class="w-4 h-4" />
        Step 5 of 5
      </div>
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
        Review Your Information & Generate
      </h2>
      <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
        Review your portfolio profile summary before generating your AI coding prompt.
      </p>
    </div>

    <!-- Ready / Validation Status Banner -->
    <div 
      v-if="isReady" 
      class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3 text-emerald-900 dark:text-emerald-200"
    >
      <CheckCircle2 class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
      <div class="text-xs space-y-0.5">
        <span class="font-bold block text-sm">All core details verified and ready!</span>
        <span>Your structured facts will be formatted deterministically into an actionable AI instruction.</span>
      </div>
    </div>

    <div 
      v-else 
      class="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-start gap-3 text-rose-900 dark:text-rose-200"
    >
      <AlertTriangle class="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
      <div class="text-xs space-y-1">
        <span class="font-bold block text-sm">Some required information is incomplete:</span>
        <ul class="list-disc list-inside space-y-0.5 text-rose-800 dark:text-rose-300">
          <li v-if="!portfolioStore.isProfileValid">Full Name and Headline (Step 1) are required.</li>
          <li v-if="!portfolioStore.isSkillsValid">At least 1 Technical Skill (Step 2) is required.</li>
          <li v-if="!portfolioStore.isProjectsValid">All added projects must have a name and description (Step 3).</li>
        </ul>
      </div>
    </div>

    <!-- Review Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- 1. Profile Summary Card -->
      <div class="card-surface p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div class="flex items-center gap-2">
            <User class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Personal Profile</h3>
          </div>
          <button 
            type="button" 
            @click="goToStep(1)"
            class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 font-medium"
          >
            <Edit3 class="w-3.5 h-3.5" /> Edit
          </button>
        </div>

        <div class="space-y-2 text-xs">
          <div>
            <span class="text-slate-400 block text-[11px]">Full Name:</span>
            <span class="font-semibold text-slate-900 dark:text-white text-sm">
              {{ draft.profile.fullName || '(Not provided)' }}
            </span>
          </div>

          <div>
            <span class="text-slate-400 block text-[11px]">Headline:</span>
            <span class="text-slate-700 dark:text-slate-300">
              {{ draft.profile.headline || '(Not provided)' }}
            </span>
          </div>

          <div v-if="draft.profile.location">
            <span class="text-slate-400 block text-[11px]">Location:</span>
            <span class="text-slate-700 dark:text-slate-300">{{ draft.profile.location }}</span>
          </div>

          <div v-if="draft.profile.about">
            <span class="text-slate-400 block text-[11px]">Biography:</span>
            <p class="text-slate-600 dark:text-slate-300 line-clamp-2 italic">
              "{{ draft.profile.about }}"
            </p>
          </div>

          <div class="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-500">
            <span v-if="draft.profile.email" class="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              ✉️ {{ draft.profile.email }}
            </span>
            <span v-if="draft.profile.githubUrl" class="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              🐙 GitHub linked
            </span>
            <span v-if="draft.profile.linkedinUrl" class="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              💼 LinkedIn linked
            </span>
          </div>
        </div>
      </div>

      <!-- 2. Skills & Education Card -->
      <div class="card-surface p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div class="flex items-center gap-2">
            <Code2 class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Skills & Background</h3>
          </div>
          <button 
            type="button" 
            @click="goToStep(2)"
            class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 font-medium"
          >
            <Edit3 class="w-3.5 h-3.5" /> Edit
          </button>
        </div>

        <div class="space-y-2.5 text-xs">
          <div>
            <span class="text-slate-400 block text-[11px]">Status:</span>
            <span class="font-medium text-slate-800 dark:text-slate-200 capitalize">
              {{ draft.background.status.replace('_', ' ') }}
            </span>
          </div>

          <div>
            <span class="text-slate-400 block text-[11px] mb-1">Skills ({{ draft.background.skills.length }}):</span>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="skill in draft.background.skills" 
                :key="skill"
                class="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium text-[11px]"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div v-if="draft.background.education?.school || draft.background.education?.program">
            <span class="text-slate-400 block text-[11px]">Education:</span>
            <span class="text-slate-700 dark:text-slate-300">
              {{ draft.background.education.program }} — {{ draft.background.education.school }} ({{ draft.background.education.year }})
            </span>
          </div>

          <div v-if="draft.background.experience && draft.background.experience.length > 0">
            <span class="text-slate-400 block text-[11px]">Experience:</span>
            <span class="text-slate-700 dark:text-slate-300">
              {{ draft.background.experience.length }} role(s) listed
            </span>
          </div>
        </div>
      </div>

      <!-- 3. Projects Summary Card -->
      <div class="card-surface p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div class="flex items-center gap-2">
            <FolderGit2 class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Featured Projects</h3>
          </div>
          <button 
            type="button" 
            @click="goToStep(3)"
            class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 font-medium"
          >
            <Edit3 class="w-3.5 h-3.5" /> Edit
          </button>
        </div>

        <div class="space-y-2 text-xs">
          <div v-if="draft.projects.length === 0" class="text-slate-500 italic">
            No projects added. (AI will create an exploratory learning section without fabricating fake work).
          </div>
          <div v-else class="space-y-2">
            <div 
              v-for="(p, idx) in draft.projects" 
              :key="p.id"
              class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
            >
              <div class="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>{{ idx + 1 }}. {{ p.name }}</span>
                <span v-if="p.technologies.length" class="text-[10px] text-slate-400 font-normal">
                  {{ p.technologies.slice(0, 3).join(', ') }}
                </span>
              </div>
              <p class="text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5">{{ p.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Design Summary Card -->
      <div class="card-surface p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div class="flex items-center gap-2">
            <Palette class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Design & Theme</h3>
          </div>
          <button 
            type="button" 
            @click="goToStep(4)"
            class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 font-medium"
          >
            <Edit3 class="w-3.5 h-3.5" /> Edit
          </button>
        </div>

        <div class="space-y-2 text-xs">
          <div class="flex justify-between">
            <span class="text-slate-400">Style:</span>
            <span class="font-medium text-slate-800 dark:text-slate-200 capitalize">{{ draft.preferences.style }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Accent Color:</span>
            <span class="font-medium text-slate-800 dark:text-slate-200 capitalize">{{ draft.preferences.accentColor }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Theme:</span>
            <span class="font-medium text-slate-800 dark:text-slate-200 capitalize">{{ draft.preferences.theme }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Animation:</span>
            <span class="font-medium text-slate-800 dark:text-slate-200 capitalize">{{ draft.preferences.motion }}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[11px] mb-1">Sections ({{ draft.preferences.sections.length }}):</span>
            <span class="text-slate-600 dark:text-slate-300">
              {{ draft.preferences.sections.join(', ') }}
            </span>
          </div>
        </div>
      </div>

    </div>

    <!-- Final Call to Action -->
    <div class="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
        <ShieldCheck class="w-4 h-4 text-emerald-500" />
        No AI API calls. Prompt generated instantly & deterministically in your browser.
      </div>

      <button 
        type="button" 
        @click="handleGenerate"
        :disabled="!isReady"
        class="btn-primary w-full sm:w-auto text-base py-3 px-8 shadow-lg shadow-indigo-500/25"
      >
        <Sparkles class="w-5 h-5 mr-2" />
        Generate My Portfolio Prompt
        <ArrowRight class="w-4 h-4 ml-2" />
      </button>
    </div>
  </div>
</template>
