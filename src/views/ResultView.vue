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
  AlertTriangle,
  ArrowUpRight
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
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 animate-fadeIn">
    
    <!-- Empty State Recovery -->
    <div 
      v-if="!hasValidDraft" 
      class="modular-frame p-8 sm:p-12 text-center max-w-md mx-auto space-y-4 border-dashed"
    >
      <div class="w-10 h-10 rounded-xl bg-[#F2EEFF] dark:bg-[#1E202E] text-[#6947FF] flex items-center justify-center mx-auto">
        <AlertTriangle class="w-5 h-5" />
      </div>
      <div class="space-y-1">
        <h2 class="font-display text-base font-bold text-[#14151B] dark:text-[#F1F2F6]">No Active Draft Found</h2>
        <p class="text-xs text-[#696976] dark:text-[#9496A6]">
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
      
      <!-- 1. Header Modular Banner -->
      <div class="modular-frame p-6 sm:p-8 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E4EA] dark:border-[#242738] pb-5">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F2EEFF] text-[#6947FF] dark:bg-[#1E202E] dark:text-[#B096FF] text-[11px] font-mono uppercase tracking-wider mb-2 border border-[#E6DCFF] dark:border-[#2A1783]/40">
              <CheckCircle2 class="w-3.5 h-3.5" />
              BRIEF READY // 05
            </div>
            <h1 class="font-display text-2xl sm:text-3xl font-bold text-[#14151B] dark:text-[#F1F2F6] tracking-tight">
              Ready to make it yours.
            </h1>
            <p class="text-xs sm:text-sm text-[#696976] dark:text-[#9496A6] mt-1">
              Your portfolio brief is ready for your AI coding assistant.
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <button 
              @click="handleEdit" 
              class="btn-secondary text-xs"
            >
              <Edit3 class="w-3.5 h-3.5 mr-1.5" />
              Edit Details
            </button>
            <button 
              @click="handleRegenerate" 
              class="btn-secondary text-xs"
            >
              <RotateCcw class="w-3.5 h-3.5 mr-1.5" />
              Regenerate
            </button>
          </div>
        </div>

        <!-- Mini Profile Snapshot -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#696976] dark:text-[#9496A6]">
          <div class="p-3 rounded-xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738]">
            <span class="block text-[10px] font-mono uppercase text-slate-400">Developer</span>
            <span class="font-bold text-[#14151B] dark:text-[#F1F2F6] truncate block">{{ draft.profile.fullName }}</span>
          </div>
          <div class="p-3 rounded-xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738]">
            <span class="block text-[10px] font-mono uppercase text-slate-400">Tech Stack</span>
            <span class="font-bold text-[#14151B] dark:text-[#F1F2F6] block">{{ draft.background.skills.length }} verified skills</span>
          </div>
          <div class="p-3 rounded-xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738]">
            <span class="block text-[10px] font-mono uppercase text-slate-400">Projects</span>
            <span class="font-bold text-[#14151B] dark:text-[#F1F2F6] block">{{ draft.projects.length }} showcase build(s)</span>
          </div>
          <div class="p-3 rounded-xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738]">
            <span class="block text-[10px] font-mono uppercase text-slate-400">Aesthetic</span>
            <span class="font-bold text-[#14151B] dark:text-[#F1F2F6] capitalize block">{{ draft.preferences.style }}</span>
          </div>
        </div>
      </div>

      <!-- 2. Export Actions Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] shadow-subtle text-xs">
        <div class="flex items-center gap-2 text-[#696976] dark:text-[#9496A6]">
          <FileText class="w-4 h-4 text-[#6947FF]" />
          <span class="font-semibold text-[#14151B] dark:text-[#F1F2F6]">Download Deliverables</span>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button 
            @click="handleDownloadPrompt" 
            class="btn-secondary text-xs py-1.5 px-3"
          >
            <Download class="w-3.5 h-3.5 mr-1 text-[#6947FF]" />
            Prompt (.md)
          </button>

          <button 
            @click="handleDownloadBrief" 
            class="btn-secondary text-xs py-1.5 px-3"
          >
            <Download class="w-3.5 h-3.5 mr-1 text-[#6947FF]" />
            Portfolio Brief (.md)
          </button>

          <button 
            @click="showResetModal = true" 
            class="text-[#696976] hover:text-rose-600 p-1.5 rounded transition-colors text-xs font-medium"
            title="Start fresh with a new portfolio"
          >
            Start Fresh
          </button>
        </div>
      </div>

      <!-- 3. Prompt Output Container -->
      <PromptOutput :prompt-text="promptText" />

      <!-- 4. Next Steps Walkthrough -->
      <div class="modular-frame p-6 sm:p-8 space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-[#E5E4EA] dark:border-[#242738]">
          <div>
            <span class="text-[10px] font-mono uppercase tracking-wider text-[#6947FF] block">
              EXECUTION PIPELINE
            </span>
            <h3 class="font-display text-base font-bold text-[#14151B] dark:text-[#F1F2F6]">
              Next Steps: Build & Deploy
            </h3>
          </div>
          <router-link 
            to="/learn/deploy" 
            class="text-xs text-[#6947FF] hover:underline font-semibold inline-flex items-center gap-1"
          >
            <span>View Full Docs</span>
            <ArrowUpRight class="w-3.5 h-3.5" />
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-4 rounded-xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738] space-y-1.5">
            <span class="font-bold text-[#14151B] dark:text-[#F1F2F6] flex items-center gap-2">
              <span class="w-4 h-4 rounded-full bg-[#6947FF] text-white flex items-center justify-center text-[10px] font-mono">1</span>
              Paste Prompt into AI
            </span>
            <p class="text-[#696976] dark:text-[#9496A6] leading-relaxed">
              Open ChatGPT, Gemini, or Claude. Paste your copied brief to generate complete static files.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738] space-y-1.5">
            <span class="font-bold text-[#14151B] dark:text-[#F1F2F6] flex items-center gap-2">
              <span class="w-4 h-4 rounded-full bg-[#6947FF] text-white flex items-center justify-center text-[10px] font-mono">2</span>
              Save in VS Code
            </span>
            <p class="text-[#696976] dark:text-[#9496A6] leading-relaxed">
              Save files as <code class="text-[#6947FF] font-mono">index.html</code>, <code class="text-[#6947FF] font-mono">styles.css</code>, and <code class="text-[#6947FF] font-mono">script.js</code>.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738] space-y-1.5">
            <span class="font-bold text-[#14151B] dark:text-[#F1F2F6] flex items-center gap-2">
              <span class="w-4 h-4 rounded-full bg-[#6947FF] text-white flex items-center justify-center text-[10px] font-mono">3</span>
              Push to GitHub
            </span>
            <p class="text-[#696976] dark:text-[#9496A6] leading-relaxed">
              Initialize Git locally, commit your files, and push to your new GitHub repository.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738] space-y-1.5">
            <span class="font-bold text-[#14151B] dark:text-[#F1F2F6] flex items-center gap-2">
              <span class="w-4 h-4 rounded-full bg-[#6947FF] text-white flex items-center justify-center text-[10px] font-mono">4</span>
              Publish via GitHub Actions
            </span>
            <p class="text-[#696976] dark:text-[#9496A6] leading-relaxed">
              Enable GitHub Pages in settings with GitHub Actions source to publish your live URL.
            </p>
          </div>
        </div>

        <div class="pt-2">
          <router-link 
            to="/learn/deploy" 
            class="btn-primary text-xs inline-flex items-center"
          >
            <BookOpen class="w-4 h-4 mr-1.5" />
            Open Deployment Tutorial
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
