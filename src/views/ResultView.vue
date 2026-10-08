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
    description: 'Saved as Markdown (.md) to your downloads.',
    type: 'success'
  })
}

function handleDownloadBrief() {
  downloadBriefMarkdown(draft.value)
  showToast({
    title: 'Portfolio Brief Downloaded',
    description: 'Saved portfolio brief (.md) to your downloads.',
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
    description: 'Deterministic prompt re-evaluated with your latest data.',
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
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
    
    <!-- Empty State Recovery -->
    <div 
      v-if="!hasValidDraft" 
      class="card-surface p-8 sm:p-12 text-center max-w-md mx-auto space-y-4 border-dashed"
    >
      <div class="w-10 h-10 rounded-xl bg-[#F2EEFF] dark:bg-brand-950/60 text-[#6D4AFF] flex items-center justify-center mx-auto">
        <AlertTriangle class="w-5 h-5" />
      </div>
      <div class="space-y-1">
        <h2 class="text-base font-bold text-[#181824] dark:text-[#F3F4F8]">No Active Draft Found</h2>
        <p class="text-xs text-[#737385] dark:text-[#9496A8]">
          You haven't entered your profile details yet. Let's start building your customized portfolio prompt!
        </p>
      </div>
      <div class="pt-2">
        <router-link to="/builder" class="btn-primary text-xs">
          Open Prompt Builder
        </router-link>
      </div>
    </div>

    <!-- Active Result View -->
    <template v-else>
      
      <!-- 1. Header Banner -->
      <div class="space-y-4 border-b border-[#E8E8EF] dark:border-[#232738] pb-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-1.5 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 class="w-3.5 h-3.5" />
              Prompt Ready
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-[#181824] dark:text-[#F3F4F8] tracking-tight">
              Your Portfolio Prompt Is Ready
            </h1>
            <p class="text-xs sm:text-sm text-[#737385] dark:text-[#9496A8] mt-1">
              Review, copy, and bring your portfolio to life with ChatGPT, Gemini, or Claude.
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <button 
              @click="handleEdit" 
              class="btn-secondary text-xs"
            >
              <Edit3 class="w-3.5 h-3.5 mr-1.5" />
              Edit Data
            </button>
            <button 
              @click="handleRegenerate" 
              class="btn-secondary text-xs"
            >
              <RotateCcw class="w-3.5 h-3.5 mr-1.5" />
              Refresh
            </button>
          </div>
        </div>

        <!-- Mini Stats Summary -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs text-[#737385] dark:text-[#9496A8]">
          <div class="p-2.5 rounded-xl bg-[#FAFAFC] dark:bg-[#141827] border border-[#E8E8EF] dark:border-[#232738]">
            <span class="block text-[10px] text-slate-400">Name / Role</span>
            <span class="font-bold text-[#181824] dark:text-[#F3F4F8] truncate block">{{ draft.profile.fullName }}</span>
          </div>
          <div class="p-2.5 rounded-xl bg-[#FAFAFC] dark:bg-[#141827] border border-[#E8E8EF] dark:border-[#232738]">
            <span class="block text-[10px] text-slate-400">Skills</span>
            <span class="font-bold text-[#181824] dark:text-[#F3F4F8] block">{{ draft.background.skills.length }} verified skills</span>
          </div>
          <div class="p-2.5 rounded-xl bg-[#FAFAFC] dark:bg-[#141827] border border-[#E8E8EF] dark:border-[#232738]">
            <span class="block text-[10px] text-slate-400">Projects</span>
            <span class="font-bold text-[#181824] dark:text-[#F3F4F8] block">{{ draft.projects.length }} showcase build(s)</span>
          </div>
          <div class="p-2.5 rounded-xl bg-[#FAFAFC] dark:bg-[#141827] border border-[#E8E8EF] dark:border-[#232738]">
            <span class="block text-[10px] text-slate-400">Aesthetic</span>
            <span class="font-bold text-[#181824] dark:text-[#F3F4F8] capitalize block">{{ draft.preferences.style }} ({{ draft.preferences.theme }})</span>
          </div>
        </div>
      </div>

      <!-- 2. Export Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#141827] border border-[#E8E8EF] dark:border-[#232738] shadow-subtle text-xs">
        <div class="flex items-center gap-2 text-[#737385] dark:text-[#9496A8]">
          <FileText class="w-4 h-4 text-[#6D4AFF]" />
          <span class="font-semibold text-[#181824] dark:text-[#F3F4F8]">Download Files</span>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button 
            @click="handleDownloadPrompt" 
            class="btn-secondary text-xs py-1.5 px-3"
          >
            <Download class="w-3.5 h-3.5 mr-1 text-[#6D4AFF]" />
            Prompt (.md)
          </button>

          <button 
            @click="handleDownloadBrief" 
            class="btn-secondary text-xs py-1.5 px-3"
          >
            <Download class="w-3.5 h-3.5 mr-1 text-[#6D4AFF]" />
            Portfolio Brief (.md)
          </button>

          <button 
            @click="showResetModal = true" 
            class="text-[#737385] hover:text-rose-600 p-1.5 rounded transition-colors text-xs"
            title="Start fresh with a new portfolio"
          >
            Start Fresh
          </button>
        </div>
      </div>

      <!-- 3. Prompt Container Component -->
      <PromptOutput :prompt-text="promptText" />

      <!-- 4. Next Steps Walkthrough -->
      <div class="card-surface p-6 space-y-4">
        <div class="space-y-0.5">
          <div class="text-[11px] font-bold text-[#6D4AFF] uppercase tracking-wider">
            Execution Steps
          </div>
          <h3 class="text-base font-bold text-[#181824] dark:text-[#F3F4F8]">
            What to do next?
          </h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3.5 rounded-xl bg-[#FAFAFC] dark:bg-[#0B0D17]/50 border border-[#E8E8EF] dark:border-[#232738] space-y-1">
            <span class="font-bold text-[#181824] dark:text-[#F3F4F8] flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-[#6D4AFF] text-white flex items-center justify-center text-[10px]">1</span>
              Paste Prompt into AI
            </span>
            <p class="text-[#737385] dark:text-[#9496A8] leading-relaxed">
              Open ChatGPT, Gemini, or Claude. Paste the copied prompt and request complete source code files.
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-[#FAFAFC] dark:bg-[#0B0D17]/50 border border-[#E8E8EF] dark:border-[#232738] space-y-1">
            <span class="font-bold text-[#181824] dark:text-[#F3F4F8] flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-[#6D4AFF] text-white flex items-center justify-center text-[10px]">2</span>
              Save Files in VS Code
            </span>
            <p class="text-[#737385] dark:text-[#9496A8] leading-relaxed">
              Save the generated output as <code class="text-[#6D4AFF]">index.html</code>, <code class="text-[#6D4AFF]">styles.css</code>, and <code class="text-[#6D4AFF]">script.js</code>.
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-[#FAFAFC] dark:bg-[#0B0D17]/50 border border-[#E8E8EF] dark:border-[#232738] space-y-1">
            <span class="font-bold text-[#181824] dark:text-[#F3F4F8] flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-[#6D4AFF] text-white flex items-center justify-center text-[10px]">3</span>
              Preview with Live Server
            </span>
            <p class="text-[#737385] dark:text-[#9496A8] leading-relaxed">
              Open with VS Code Live Server and test responsiveness and your project links.
            </p>
          </div>

          <div class="p-3.5 rounded-xl bg-[#FAFAFC] dark:bg-[#0B0D17]/50 border border-[#E8E8EF] dark:border-[#232738] space-y-1">
            <span class="font-bold text-[#181824] dark:text-[#F3F4F8] flex items-center gap-1.5">
              <span class="w-4 h-4 rounded-full bg-[#6D4AFF] text-white flex items-center justify-center text-[10px]">4</span>
              Deploy with GitHub Actions
            </span>
            <p class="text-[#737385] dark:text-[#9496A8] leading-relaxed">
              Push your repository to GitHub and follow our guide to deploy to GitHub Pages.
            </p>
          </div>
        </div>

        <div class="pt-2">
          <router-link 
            to="/learn/deploy" 
            class="btn-primary text-xs inline-flex items-center"
          >
            <BookOpen class="w-4 h-4 mr-1.5" />
            Open Full Deployment Tutorial
            <ArrowRight class="w-3.5 h-3.5 ml-1.5" />
          </router-link>
        </div>
      </div>

    </template>

    <!-- Reset Confirm Modal -->
    <ConfirmModal 
      :show="showResetModal"
      title="Start a New Portfolio?"
      message="This will reset your current draft so you can begin fresh. Ensure you have copied or downloaded your current prompt."
      confirm-text="Start Fresh"
      cancel-text="Keep Current"
      :is-destructive="true"
      @confirm="handleConfirmReset"
      @cancel="showResetModal = false"
    />

  </div>
</template>
