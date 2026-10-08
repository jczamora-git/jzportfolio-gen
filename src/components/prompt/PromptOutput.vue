<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '@/composables/useToast'
import { Copy, Check, Terminal } from 'lucide-vue-next'

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
      description: 'Paste it into ChatGPT, Gemini, or Claude to generate your portfolio code.',
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
  <div class="card-surface overflow-hidden border border-[#E5E4EA] dark:border-[#242738] shadow-elevated">
    <!-- Top Bar -->
    <div class="bg-[#F8F8F7] dark:bg-[#12131C] px-4 sm:px-5 py-3 border-b border-[#E5E4EA] dark:border-[#242738] flex items-center justify-between">
      <div class="flex items-center gap-2 text-xs font-mono text-[#696976] dark:text-[#9496A6]">
        <Terminal class="w-3.5 h-3.5 text-[#6947FF]" />
        <span class="font-medium text-[#14151B] dark:text-[#F1F2F6]">generated-prompt.md</span>
        <span class="text-slate-400">({{ promptText.length }} chars)</span>
      </div>

      <button 
        type="button" 
        @click="handleCopy"
        class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm"
        :class="copied ? 'bg-emerald-600 text-white' : 'bg-[#6947FF] hover:bg-[#5736EB] text-white'"
      >
        <Check v-if="copied" class="w-3.5 h-3.5 stroke-[2.5]" />
        <Copy v-else class="w-3.5 h-3.5" />
        {{ copied ? 'Copied to Clipboard!' : 'Copy Prompt' }}
      </button>
    </div>

    <!-- Monospace Prompt Display -->
    <div class="p-5 sm:p-6 max-h-[500px] overflow-y-auto bg-[#0E1017] text-[#F1F2F6] font-mono text-xs leading-relaxed whitespace-pre-wrap selection:bg-[#6947FF] selection:text-white">
      {{ promptText }}
    </div>
  </div>
</template>
