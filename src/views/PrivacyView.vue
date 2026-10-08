<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useToast } from '@/composables/useToast'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import { 
  ShieldCheck, 
  Database, 
  Lock, 
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
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 animate-fadeIn">
    
    <!-- Header -->
    <div class="space-y-2 border-b border-[#E8E8EF] dark:border-[#232738] pb-6">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2EEFF] dark:bg-brand-950/60 border border-[#E8E8EF] dark:border-[#232738] text-[#6D4AFF] dark:text-brand-300 text-xs font-semibold">
        <ShieldCheck class="w-3.5 h-3.5 text-[#6D4AFF]" />
        Privacy Transparency
      </div>
      <h1 class="text-3xl font-extrabold text-[#181824] dark:text-[#F3F4F8] tracking-tight">
        Privacy & Data Handling
      </h1>
      <p class="text-sm text-[#737385] dark:text-[#9496A8]">
        How Portfolio Launchpad manages your personal and technical portfolio details.
      </p>
    </div>

    <!-- Core Principles -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card-surface p-4 space-y-2">
        <div class="w-8 h-8 rounded-lg bg-[#F2EEFF] dark:bg-brand-950/60 text-[#6D4AFF] flex items-center justify-center">
          <Database class="w-4 h-4" />
        </div>
        <h3 class="text-xs sm:text-sm font-bold text-[#181824] dark:text-[#F3F4F8]">100% Client-Side</h3>
        <p class="text-xs text-[#737385] dark:text-[#9496A8] leading-relaxed">
          Your profile, skills, and projects remain strictly on your machine. We operate zero cloud databases and zero tracking cookies.
        </p>
      </div>

      <div class="card-surface p-4 space-y-2">
        <div class="w-8 h-8 rounded-lg bg-[#F2EEFF] dark:bg-brand-950/60 text-[#6D4AFF] flex items-center justify-center">
          <Lock class="w-4 h-4" />
        </div>
        <h3 class="text-xs sm:text-sm font-bold text-[#181824] dark:text-[#F3F4F8]">No AI API Calls</h3>
        <p class="text-xs text-[#737385] dark:text-[#9496A8] leading-relaxed">
          The app never sends your inputs to OpenAI, Google, Anthropic, or external AI model endpoints automatically.
        </p>
      </div>

      <div class="card-surface p-4 space-y-2">
        <div class="w-8 h-8 rounded-lg bg-[#F2EEFF] dark:bg-brand-950/60 text-[#6D4AFF] flex items-center justify-center">
          <Trash2 class="w-4 h-4" />
        </div>
        <h3 class="text-xs sm:text-sm font-bold text-[#181824] dark:text-[#F3F4F8]">Full Local Control</h3>
        <p class="text-xs text-[#737385] dark:text-[#9496A8] leading-relaxed">
          Drafts are saved exclusively in browser <code class="font-mono text-[#6D4AFF]">localStorage</code>. You can delete everything at any time.
        </p>
      </div>
    </div>

    <!-- Detailed Policies -->
    <div class="card-surface p-6 sm:p-7 space-y-5 text-xs sm:text-sm text-[#737385] dark:text-[#9496A8] leading-relaxed">
      <div class="space-y-1.5">
        <h3 class="text-sm sm:text-base font-bold text-[#181824] dark:text-[#F3F4F8]">
          1. Local Storage Usage
        </h3>
        <p>
          Portfolio Launchpad uses browser <code class="bg-[#FAFAFC] dark:bg-[#0B0D17] px-1 py-0.5 rounded font-mono text-xs text-[#6D4AFF]">localStorage</code> under the key <code class="bg-[#FAFAFC] dark:bg-[#0B0D17] px-1 py-0.5 rounded font-mono text-xs text-[#6D4AFF]">portfolio-launchpad:draft:v1</code> to preserve your work in progress across page refreshes.
        </p>
      </div>

      <div class="space-y-1.5">
        <h3 class="text-sm sm:text-base font-bold text-[#181824] dark:text-[#F3F4F8]">
          2. Third-Party AI Services
        </h3>
        <p>
          When you click <strong>"Copy Prompt"</strong> or <strong>"Download Markdown"</strong>, you manually choose when and where to paste your prompt. If you paste your prompt into an external AI service (such as ChatGPT, Gemini, or Claude), that interaction is governed by the terms and policies of that specific AI platform.
        </p>
      </div>

      <div class="space-y-2 pt-1">
        <h3 class="text-sm sm:text-base font-bold text-[#181824] dark:text-[#F3F4F8]">
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
        Return to Home
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
