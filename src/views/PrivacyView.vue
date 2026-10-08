<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useToast } from '@/composables/useToast'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import { 
  ShieldCheck, 
  Database, 
  Lock, 
  Trash2, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-vue-next'

const router = useRouter()
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
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fadeIn">
    
    <!-- Header -->
    <div class="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
        <ShieldCheck class="w-3.5 h-3.5 text-emerald-500" />
        Privacy & Data Transparency
      </div>
      <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Privacy Statement & Data Handling
      </h1>
      <p class="text-sm text-slate-600 dark:text-slate-400">
        How Portfolio Launchpad processes your personal and professional information.
      </p>
    </div>

    <!-- Core Privacy Principles -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="card-surface p-5 space-y-3">
        <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
          <Database class="w-5 h-5" />
        </div>
        <h3 class="text-sm font-bold text-slate-900 dark:text-white">100% Client-Side</h3>
        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Your profile, skills, and projects never leave your browser. We operate zero servers, zero cloud databases, and zero tracking cookies.
        </p>
      </div>

      <div class="card-surface p-5 space-y-3">
        <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
          <Lock class="w-5 h-5" />
        </div>
        <h3 class="text-sm font-bold text-slate-900 dark:text-white">No AI API Calls</h3>
        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The application does not automatically send your inputs to OpenAI, Google, Anthropic, or any external AI model API.
        </p>
      </div>

      <div class="card-surface p-5 space-y-3">
        <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
          <Trash2 class="w-5 h-5" />
        </div>
        <h3 class="text-sm font-bold text-slate-900 dark:text-white">Full Local Control</h3>
        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Drafts are saved exclusively in your browser's <code class="font-mono text-indigo-500">localStorage</code>. You can erase all data with a single click.
        </p>
      </div>
    </div>

    <!-- Detailed Policies -->
    <div class="card-surface p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
      <div class="space-y-2">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">
          1. Local Storage Usage
        </h3>
        <p>
          Portfolio Launchpad uses browser <code class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">localStorage</code> under the key <code class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">portfolio-launchpad:draft:v1</code> to preserve your work in progress across page refreshes.
        </p>
        <p>
          Note: If you are using a shared or public computer, we recommend clearing your draft before ending your session.
        </p>
      </div>

      <div class="space-y-2">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">
          2. Third-Party AI Services
        </h3>
        <p>
          When you click <strong>"Copy Prompt"</strong> or <strong>"Download Markdown"</strong>, you manually choose when and where to paste your prompt. If you paste your prompt into an external AI service (such as ChatGPT, Gemini, or Claude), that interaction is governed by the terms of service and privacy policies of the respective AI provider.
        </p>
      </div>

      <div class="space-y-2">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">
          3. Clear Stored Data
        </h3>
        <p>
          You can immediately erase all stored draft data and restore the application to its default state at any time:
        </p>
        <div class="pt-1">
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

    <!-- Navigation actions -->
    <div class="flex items-center justify-between pt-2">
      <router-link to="/builder" class="btn-secondary text-xs">
        <ArrowLeft class="w-4 h-4 mr-1.5" />
        Back to Builder
      </router-link>
      <router-link to="/" class="btn-ghost text-xs">
        Return to Home
      </router-link>
    </div>

    <!-- Confirm Modal -->
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
