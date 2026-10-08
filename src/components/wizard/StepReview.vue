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
  <div class="space-y-6 animate-fadeIn">
    <!-- Step Header -->
    <div class="border-b border-[#E8E8EF] dark:border-[#232738] pb-4">
      <div class="text-[11px] font-bold text-[#6D4AFF] uppercase tracking-wider mb-1">
        Step 5 of 5
      </div>
      <h2 class="text-xl sm:text-2xl font-bold text-[#181824] dark:text-[#F3F4F8] tracking-tight">
        Review Information & Generate
      </h2>
      <p class="text-xs sm:text-sm text-[#737385] dark:text-[#9496A8] mt-1">
        Review your structured portfolio summary before creating your AI coding prompt.
      </p>
    </div>

    <!-- Ready / Validation Status Banner -->
    <div 
      v-if="isReady" 
      class="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-2.5 text-emerald-900 dark:text-emerald-200"
    >
      <CheckCircle2 class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
      <div class="text-xs space-y-0.5">
        <span class="font-bold block">All core information verified and ready.</span>
        <span>Your structured facts will be formatted deterministically into an actionable AI instruction.</span>
      </div>
    </div>

    <div 
      v-else 
      class="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/80 flex items-start gap-2.5 text-rose-900 dark:text-rose-200"
    >
      <AlertTriangle class="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
      <div class="text-xs space-y-1">
        <span class="font-bold block">Some required fields are missing:</span>
        <ul class="list-disc list-inside space-y-0.5 text-rose-800 dark:text-rose-300">
          <li v-if="!portfolioStore.isProfileValid">Full Name and Headline (Step 1) are required.</li>
          <li v-if="!portfolioStore.isSkillsValid">At least 1 Technical Skill (Step 2) is required.</li>
          <li v-if="!portfolioStore.isProjectsValid">All added projects must have a name and description (Step 3).</li>
        </ul>
      </div>
    </div>

    <!-- Review Summary Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <!-- 1. Profile Summary -->
      <div class="card-surface p-4 space-y-3">
        <div class="flex items-center justify-between border-b border-[#E8E8EF] dark:border-[#232738] pb-2">
          <div class="flex items-center gap-1.5">
            <User class="w-4 h-4 text-[#6D4AFF]" />
            <h3 class="text-xs font-bold text-[#181824] dark:text-[#F3F4F8]">Personal Profile</h3>
          </div>
          <button 
            type="button" 
            @click="goToStep(1)"
            class="text-[11px] text-[#6D4AFF] dark:text-brand-400 hover:underline inline-flex items-center gap-1 font-medium"
          >
            <Edit3 class="w-3 h-3" /> Edit
          </button>
        </div>

        <div class="space-y-1.5 text-xs">
          <div>
            <span class="text-[#737385] dark:text-[#9496A8] block text-[10px]">Full Name:</span>
            <span class="font-bold text-[#181824] dark:text-[#F3F4F8]">
              {{ draft.profile.fullName || '(Not provided)' }}
            </span>
          </div>

          <div>
            <span class="text-[#737385] dark:text-[#9496A8] block text-[10px]">Headline:</span>
            <span class="text-[#181824] dark:text-[#F3F4F8]">
              {{ draft.profile.headline || '(Not provided)' }}
            </span>
          </div>

          <div v-if="draft.profile.location">
            <span class="text-[#737385] dark:text-[#9496A8] block text-[10px]">Location:</span>
            <span>{{ draft.profile.location }}</span>
          </div>

          <div class="pt-1 flex flex-wrap gap-1.5 text-[10px] text-[#737385] dark:text-[#9496A8]">
            <span v-if="draft.profile.email" class="bg-[#FAFAFC] dark:bg-[#1A2033] border border-[#E8E8EF] dark:border-[#232738] px-2 py-0.5 rounded">
              ✉️ {{ draft.profile.email }}
            </span>
            <span v-if="draft.profile.githubUrl" class="bg-[#FAFAFC] dark:bg-[#1A2033] border border-[#E8E8EF] dark:border-[#232738] px-2 py-0.5 rounded">
              🐙 GitHub linked
            </span>
            <span v-if="draft.profile.linkedinUrl" class="bg-[#FAFAFC] dark:bg-[#1A2033] border border-[#E8E8EF] dark:border-[#232738] px-2 py-0.5 rounded">
              💼 LinkedIn linked
            </span>
          </div>
        </div>
      </div>

      <!-- 2. Skills & Background -->
      <div class="card-surface p-4 space-y-3">
        <div class="flex items-center justify-between border-b border-[#E8E8EF] dark:border-[#232738] pb-2">
          <div class="flex items-center gap-1.5">
            <Code2 class="w-4 h-4 text-[#6D4AFF]" />
            <h3 class="text-xs font-bold text-[#181824] dark:text-[#F3F4F8]">Skills & Background</h3>
          </div>
          <button 
            type="button" 
            @click="goToStep(2)"
            class="text-[11px] text-[#6D4AFF] dark:text-brand-400 hover:underline inline-flex items-center gap-1 font-medium"
          >
            <Edit3 class="w-3 h-3" /> Edit
          </button>
        </div>

        <div class="space-y-2 text-xs">
          <div>
            <span class="text-[#737385] dark:text-[#9496A8] block text-[10px]">Status:</span>
            <span class="font-medium capitalize text-[#181824] dark:text-[#F3F4F8]">
              {{ draft.background.status.replace('_', ' ') }}
            </span>
          </div>

          <div>
            <span class="text-[#737385] dark:text-[#9496A8] block text-[10px] mb-1">Skills ({{ draft.background.skills.length }}):</span>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="skill in draft.background.skills" 
                :key="skill"
                class="px-2 py-0.5 rounded bg-[#F2EEFF] dark:bg-brand-950/60 text-[#6D4AFF] dark:text-brand-300 font-medium text-[10px]"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <div v-if="draft.background.education?.school || draft.background.education?.program">
            <span class="text-[#737385] dark:text-[#9496A8] block text-[10px]">Education:</span>
            <span class="text-[#181824] dark:text-[#F3F4F8]">
              {{ draft.background.education.program }} — {{ draft.background.education.school }} ({{ draft.background.education.year }})
            </span>
          </div>
        </div>
      </div>

      <!-- 3. Projects Summary -->
      <div class="card-surface p-4 space-y-3">
        <div class="flex items-center justify-between border-b border-[#E8E8EF] dark:border-[#232738] pb-2">
          <div class="flex items-center gap-1.5">
            <FolderGit2 class="w-4 h-4 text-[#6D4AFF]" />
            <h3 class="text-xs font-bold text-[#181824] dark:text-[#F3F4F8]">Featured Projects</h3>
          </div>
          <button 
            type="button" 
            @click="goToStep(3)"
            class="text-[11px] text-[#6D4AFF] dark:text-brand-400 hover:underline inline-flex items-center gap-1 font-medium"
          >
            <Edit3 class="w-3 h-3" /> Edit
          </button>
        </div>

        <div class="space-y-1.5 text-xs">
          <div v-if="draft.projects.length === 0" class="text-[#737385] dark:text-[#9496A8] italic">
            No projects added. (AI will structure an exploratory Learning Journey section).
          </div>
          <div v-else class="space-y-1.5">
            <div 
              v-for="(p, idx) in draft.projects" 
              :key="p.id"
              class="p-2 rounded-lg bg-[#FAFAFC] dark:bg-[#1A2033] border border-[#E8E8EF] dark:border-[#232738]"
            >
              <div class="font-bold text-[#181824] dark:text-[#F3F4F8] flex items-center justify-between">
                <span>{{ idx + 1 }}. {{ p.name }}</span>
                <span v-if="p.technologies.length" class="text-[9px] text-[#737385] dark:text-[#9496A8] font-normal">
                  {{ p.technologies.slice(0, 3).join(', ') }}
                </span>
              </div>
              <p class="text-[#737385] dark:text-[#9496A8] line-clamp-1 mt-0.5 text-[11px]">{{ p.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Design & Theme -->
      <div class="card-surface p-4 space-y-3">
        <div class="flex items-center justify-between border-b border-[#E8E8EF] dark:border-[#232738] pb-2">
          <div class="flex items-center gap-1.5">
            <Palette class="w-4 h-4 text-[#6D4AFF]" />
            <h3 class="text-xs font-bold text-[#181824] dark:text-[#F3F4F8]">Design Preferences</h3>
          </div>
          <button 
            type="button" 
            @click="goToStep(4)"
            class="text-[11px] text-[#6D4AFF] dark:text-brand-400 hover:underline inline-flex items-center gap-1 font-medium"
          >
            <Edit3 class="w-3 h-3" /> Edit
          </button>
        </div>

        <div class="space-y-1.5 text-xs">
          <div class="flex justify-between">
            <span class="text-[#737385] dark:text-[#9496A8]">Style:</span>
            <span class="font-medium capitalize text-[#181824] dark:text-[#F3F4F8]">{{ draft.preferences.style }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#737385] dark:text-[#9496A8]">Accent:</span>
            <span class="font-medium capitalize text-[#181824] dark:text-[#F3F4F8]">{{ draft.preferences.accentColor }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-[#737385] dark:text-[#9496A8]">Theme:</span>
            <span class="font-medium capitalize text-[#181824] dark:text-[#F3F4F8]">{{ draft.preferences.theme }}</span>
          </div>
          <div>
            <span class="text-[#737385] dark:text-[#9496A8] block text-[10px] mb-0.5">Sections ({{ draft.preferences.sections.length }}):</span>
            <span class="text-[#181824] dark:text-[#F3F4F8] text-[11px]">
              {{ draft.preferences.sections.join(', ') }}
            </span>
          </div>
        </div>
      </div>

    </div>

    <!-- Final Generation Action Area -->
    <div class="pt-4 border-t border-[#E8E8EF] dark:border-[#232738] flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="text-xs text-[#737385] dark:text-[#9496A8] flex items-center gap-1.5">
        <ShieldCheck class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        No AI API calls. Generated deterministically in browser.
      </div>

      <button 
        type="button" 
        @click="handleGenerate"
        :disabled="!isReady"
        class="btn-primary w-full sm:w-auto text-sm py-2.5 px-6 shadow-sm"
      >
        <Sparkles class="w-4 h-4 mr-2" />
        Generate My Portfolio Prompt
        <ArrowRight class="w-4 h-4 ml-2" />
      </button>
    </div>
  </div>
</template>
