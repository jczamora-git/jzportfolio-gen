<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '@/composables/useToast'
import { Copy, Check, Terminal, FileText } from 'lucide-vue-next'

const props = defineProps<{
  promptText: string
}>()

const copied = ref(false)
const { showToast } = useToast()

async function handleCopy() {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(props.promptText)
    } else {
      // Fallback for older browsers / iframe contexts
      const textarea = document.createElement('textarea')
      textarea.value = props.promptText
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    copied.value = true
    showToast({
      title: 'Prompt Copied to Clipboard!',
      description: 'Paste it directly into ChatGPT, Gemini, or Claude to generate your portfolio code.',
      type: 'success'
    })
    setTimeout(() => {
      copied.value = false
    }, 2500)
  } catch (err) {
    console.error('Copy failed:', err)
    showToast({
      title: 'Failed to Copy',
      description: 'Please manually select and copy the prompt text below.',
      type: 'error'
    })
  }
}
</script>

<template>
  <div class="card-surface overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
    <!-- Prompt Container Top Bar -->
    <div class="bg-slate-100 dark:bg-slate-950/80 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
      <div class="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
        <Terminal class="w-4 h-4 text-indigo-500" />
        <span>generated-prompt.md</span>
        <span class="text-slate-400 dark:text-slate-600">({{ promptText.length }} chars)</span>
      </div>

      <button 
        type="button" 
        @click="handleCopy"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm"
        :class="copied ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'"
      >
        <Check v-if="copied" class="w-3.5 h-3.5 stroke-[2.5]" />
        <Copy v-else class="w-3.5 h-3.5" />
        {{ copied ? 'Copied!' : 'Copy Prompt' }}
      </button>
    </div>

    <!-- Scrollable Prompt Content -->
    <div class="p-5 max-h-[500px] overflow-y-auto bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap selection:bg-indigo-600 selection:text-white">
      {{ promptText }}
    </div>
  </div>
</template>
