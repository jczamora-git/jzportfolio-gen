<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useToast } from '@/composables/useToast'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import { 
  ShieldCheck, 
  Trash2, 
  ArrowLeft 
} from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
const { showToast } = useToast()

const showClearModal = ref(false)

function handleConfirmClear() {
  portfolioStore.resetToBlank()
  showClearModal.value = false
  showToast({
    title: 'Storage Cleared',
    description: 'All local drafts and cached data have been deleted from your browser.',
    type: 'success'
  })
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fadeIn">
    
    <!-- Header Modular Frame -->
    <div class="modular-frame p-8 sm:p-10 space-y-3">
      <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-[#F2EEFF] text-[#6947FF] dark:bg-[#1E202E] dark:text-[#B096FF] text-[11px] font-mono uppercase tracking-wider border border-[#E6DCFF] dark:border-[#2A1783]/40">
        <ShieldCheck class="w-3.5 h-3.5" />
        TRANSPARENCY & PRIVACY
      </div>
      <h1 class="font-display text-3xl sm:text-4xl font-bold text-[#14151B] dark:text-[#F1F2F6] tracking-tight">
        Privacy & Data Handling
      </h1>
      <p class="text-xs sm:text-sm text-[#696976] dark:text-[#9496A6]">
        How Portfolio Launchpad manages your personal and technical portfolio details.
      </p>
    </div>

    <!-- Core Principles Modular Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="modular-frame p-5 space-y-2">
        <div class="w-8 h-8 rounded-lg bg-[#F2EEFF] dark:bg-[#1E202E] text-[#6947FF] flex items-center justify-center font-mono text-xs font-bold">
          01
        </div>
        <h3 class="text-xs sm:text-sm font-bold text-[#14151B] dark:text-[#F1F2F6]">100% Client-Side</h3>
        <p class="text-xs text-[#696976] dark:text-[#9496A6] leading-relaxed">
          Your profile, skills, and projects remain strictly on your machine. We operate zero cloud databases and zero tracking cookies.
        </p>
      </div>

      <div class="modular-frame p-5 space-y-2">
        <div class="w-8 h-8 rounded-lg bg-[#F2EEFF] dark:bg-[#1E202E] text-[#6947FF] flex items-center justify-center font-mono text-xs font-bold">
          02
        </div>
        <h3 class="text-xs sm:text-sm font-bold text-[#14151B] dark:text-[#F1F2F6]">No AI API Calls</h3>
        <p class="text-xs text-[#696976] dark:text-[#9496A6] leading-relaxed">
          The app never sends your inputs to OpenAI, Google, Anthropic, or external AI model endpoints automatically.
        </p>
      </div>

      <div class="modular-frame p-5 space-y-2">
        <div class="w-8 h-8 rounded-lg bg-[#F2EEFF] dark:bg-[#1E202E] text-[#6947FF] flex items-center justify-center font-mono text-xs font-bold">
          03
        </div>
        <h3 class="text-xs sm:text-sm font-bold text-[#14151B] dark:text-[#F1F2F6]">Full Local Control</h3>
        <p class="text-xs text-[#696976] dark:text-[#9496A6] leading-relaxed">
          Drafts are saved exclusively in browser <code class="font-mono text-[#6947FF]">localStorage</code>. You can erase everything with one click.
        </p>
      </div>
    </div>

    <!-- Detailed Policies Modular Frame -->
    <div class="modular-frame p-6 sm:p-8 space-y-5 text-xs sm:text-sm text-[#696976] dark:text-[#9496A6] leading-relaxed">
      <div class="space-y-1.5">
        <h3 class="text-sm sm:text-base font-bold text-[#14151B] dark:text-[#F1F2F6]">
          1. Local Storage Usage
        </h3>
        <p>
          Portfolio Launchpad uses browser <code class="bg-[#F8F8F7] dark:bg-[#0E1017] px-1 py-0.5 rounded font-mono text-xs text-[#6947FF]">localStorage</code> under the key <code class="bg-[#F8F8F7] dark:bg-[#0E1017] px-1 py-0.5 rounded font-mono text-xs text-[#6947FF]">portfolio-launchpad:draft:v1</code> to preserve your work in progress across page refreshes.
        </p>
      </div>

      <div class="space-y-1.5">
        <h3 class="text-sm sm:text-base font-bold text-[#14151B] dark:text-[#F1F2F6]">
          2. Third-Party AI Services
        </h3>
        <p>
          When you click <strong>"Copy Prompt"</strong> or <strong>"Download Markdown"</strong>, you manually choose when and where to paste your prompt. If you paste your prompt into an external AI service (such as ChatGPT, Gemini, or Claude), that interaction is governed by the terms and policies of that specific AI platform.
        </p>
      </div>

      <div class="space-y-2 pt-1">
        <h3 class="text-sm sm:text-base font-bold text-[#14151B] dark:text-[#F1F2F6]">
          3. Clear Stored Data
        </h3>
        <p>
          You can immediately erase all stored draft data and restore the application to its default state:
        </p>
        <div>
          <button 
            type="button" 
            @click="showClearModal = true"
            class="btn-secondary text-xs text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            <Trash2 class="w-3.5 h-3.5 mr-1.5" />
            Erase Local Stored Draft
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between pt-1">
      <router-link to="/builder" class="btn-secondary text-xs">
        <ArrowLeft class="w-3.5 h-3.5 mr-1.5" />
        Back to Builder
      </router-link>
      <router-link to="/" class="btn-ghost text-xs">
        Return to Overview
      </router-link>
    </div>

    <!-- Confirmation Modal -->
    <ConfirmModal 
      :show="showClearModal"
      title="Erase All Local Storage?"
      message="This will delete the saved draft from your browser's localStorage. Any unsaved changes will be permanently removed."
      confirm-text="Yes, Erase Everything"
      cancel-text="Cancel"
      :is-destructive="true"
      @confirm="handleConfirmClear"
      @cancel="showClearModal = false"
    />

  </div>
</template>
