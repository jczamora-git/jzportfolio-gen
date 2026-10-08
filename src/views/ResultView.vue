<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useToast } from '@/composables/useToast'
import { 
  downloadPromptMarkdown, 
  downloadBriefMarkdown 
} from '@/lib/prompt/markdownExport'
import PromptOutput from '@/components/prompt/PromptOutput.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import { 
  Download, 
  Edit3, 
  RotateCcw, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  AlertTriangle
} from 'lucide-vue-next'

const router = useRouter()
const portfolioStore = usePortfolioStore()
const { showToast } = useToast()

const showResetModal = ref(false)

onMounted(() => {
  portfolioStore.initStore()
})

const draft = computed(() => portfolioStore.draft)
const promptText = computed(() => portfolioStore.promptText)

// Check if draft has minimum valid required data
const hasValidDraft = computed(() => {
  return (
    draft.value.profile.fullName.trim().length > 0 &&
    draft.value.profile.headline.trim().length > 0 &&
    draft.value.background.skills.length > 0
  )
})

function handleDownloadPrompt() {
  downloadPromptMarkdown(draft.value)
  showToast({
    title: 'Prompt Downloaded',
    description: 'Saved as Markdown (.md) file to your downloads.',
    type: 'success'
  })
}

function handleDownloadBrief() {
  downloadBriefMarkdown(draft.value)
  showToast({
    title: 'Portfolio Brief Downloaded',
    description: 'Saved structured portfolio summary (.md) to your downloads.',
    type: 'success'
  })
}

function handleEdit() {
  portfolioStore.currentStep = 1
  router.push('/builder')
}

function handleRegenerate() {
  showToast({
    title: 'Prompt Refreshed',
    description: 'Re-evaluated deterministic prompt with your latest data.',
    type: 'info'
  })
}

function handleConfirmReset() {
  portfolioStore.resetToBlank()
  showResetModal.value = false
  router.push('/builder')
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-fadeIn">
    
    <!-- Recovery State if User Directly visits /result without data -->
    <div 
      v-if="!hasValidDraft" 
      class="card-surface p-8 sm:p-12 text-center max-w-lg mx-auto space-y-5 border-dashed"
    >
      <div class="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
        <AlertTriangle class="w-6 h-6" />
      </div>
      <div class="space-y-1.5">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">No Portfolio Draft Found</h2>
        <p class="text-xs text-slate-600 dark:text-slate-400">
          It looks like you haven't filled out your profile details yet. Let's create one or try out our sample data!
        </p>
      </div>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <router-link to="/builder" class="btn-primary w-full sm:w-auto text-xs">
          Open Prompt Builder
        </router-link>
        <button 
          @click="portfolioStore.loadSample()" 
          class="btn-secondary w-full sm:w-auto text-xs"
        >
          Load Demo Profile
        </button>
      </div>
    </div>

    <!-- Active Result Content -->
    <template v-else>
      
      <!-- 1. Header Banner -->
      <div class="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-800/80 shadow-xl space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
              <CheckCircle2 class="w-3.5 h-3.5" />
              Generation Complete
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Your Portfolio Prompt Is Ready!
            </h1>
            <p class="text-xs sm:text-sm text-indigo-200 mt-1">
              Deterministic, production-ready AI instructions customized for <span class="font-semibold text-white">{{ draft.profile.fullName }}</span>.
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex flex-wrap items-center gap-2">
            <button 
              @click="handleEdit" 
              class="btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs py-2 px-3.5"
            >
              <Edit3 class="w-3.5 h-3.5 mr-1.5" />
              Edit Data
            </button>
            <button 
              @click="handleRegenerate" 
              class="btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs py-2 px-3.5"
            >
              <RotateCcw class="w-3.5 h-3.5 mr-1.5" />
              Regenerate
            </button>
          </div>
        </div>

        <!-- Mini Stats Bar -->
        <div class="pt-4 border-t border-indigo-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span class="text-indigo-300 block text-[11px]">Role:</span>
            <span class="font-medium text-white line-clamp-1">{{ draft.profile.headline }}</span>
          </div>
          <div>
            <span class="text-indigo-300 block text-[11px]">Skills Included:</span>
            <span class="font-medium text-white">{{ draft.background.skills.length }} verified skills</span>
          </div>
          <div>
            <span class="text-indigo-300 block text-[11px]">Projects:</span>
            <span class="font-medium text-white">{{ draft.projects.length }} project(s)</span>
          </div>
          <div>
            <span class="text-indigo-300 block text-[11px]">Style / Theme:</span>
            <span class="font-medium text-white capitalize">{{ draft.preferences.style }} ({{ draft.preferences.theme }})</span>
          </div>
        </div>
      </div>

      <!-- 2. Export & Action Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-xs">
        <div class="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <FileText class="w-4 h-4 text-indigo-500" />
          <span class="font-semibold text-slate-900 dark:text-white">Export Options</span>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button 
            @click="handleDownloadPrompt" 
            class="btn-secondary text-xs py-1.5 px-3"
          >
            <Download class="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
            Download Prompt (.md)
          </button>

          <button 
            @click="handleDownloadBrief" 
            class="btn-secondary text-xs py-1.5 px-3"
          >
            <Download class="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
            Download Brief (.md)
          </button>

          <button 
            @click="showResetModal = true" 
            class="text-slate-400 hover:text-rose-500 p-1.5 rounded transition-colors"
            title="Start new portfolio"
          >
            Start New
          </button>
        </div>
      </div>

      <!-- 3. Prompt Output Box -->
      <PromptOutput :prompt-text="promptText" />

      <!-- 4. Next Steps: How to Use Your Prompt -->
      <div class="card-surface p-6 sm:p-8 space-y-6">
        <div class="space-y-1">
          <div class="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <BookOpen class="w-4 h-4" />
            What to do next
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">
            From AI Prompt to Live Website
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Follow these simple steps to generate and deploy your portfolio using GitHub Actions.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <!-- Step 1 -->
          <div class="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
              Copy & Paste Prompt
            </div>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              Click <strong>Copy Prompt</strong> above and paste it into ChatGPT, Google Gemini, Claude, or GitHub Copilot.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
              Save Source Files
            </div>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              Create a local project folder and save the AI-generated code as <code class="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-indigo-600 dark:text-indigo-400">index.html</code>, <code class="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-indigo-600 dark:text-indigo-400">styles.css</code>, and <code class="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-indigo-600 dark:text-indigo-400">script.js</code>.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">3</span>
              Preview Locally
            </div>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              Open the project folder in VS Code, launch Live Server, and verify your responsive layout and text.
            </p>
          </div>

          <!-- Step 4 -->
          <div class="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">4</span>
              Push & Deploy with Actions
            </div>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              Initialize Git, push to GitHub, and let GitHub Actions publish your live portfolio on GitHub Pages.
            </p>
          </div>
        </div>

        <!-- Tutorial Link Button -->
        <div class="pt-2">
          <router-link 
            to="/learn/deploy" 
            class="btn-primary inline-flex items-center text-xs"
          >
            <BookOpen class="w-4 h-4 mr-2" />
            Open Step-by-Step Deployment Tutorial
            <ArrowRight class="w-4 h-4 ml-2" />
          </router-link>
        </div>
      </div>

    </template>

    <!-- Confirm Modal for Start New -->
    <ConfirmModal 
      :show="showResetModal"
      title="Start New Portfolio?"
      message="This will reset your current draft so you can build a new one. Ensure you have copied or downloaded your current prompt."
      confirm-text="Start Fresh"
      cancel-text="Keep Current"
      :is-destructive="true"
      @confirm="handleConfirmReset"
      @cancel="showResetModal = false"
    />

  </div>
</template>
