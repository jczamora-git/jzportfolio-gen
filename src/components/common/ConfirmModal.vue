<script setup lang="ts">
import { AlertTriangle, X } from 'lucide-vue-next'

defineProps<{
  show: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isDestructive?: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <div 
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 dark:bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
  >
    <div 
      class="bg-white dark:bg-[#141827] border border-[#E8E8EF] dark:border-[#232738] rounded-2xl max-w-md w-full p-6 shadow-elevated space-y-4"
    >
      <div class="flex items-start gap-3.5">
        <div 
          class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          :class="isDestructive ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400' : 'bg-[#F2EEFF] dark:bg-brand-950/60 text-[#6D4AFF] dark:text-brand-300'"
        >
          <AlertTriangle class="w-4 h-4" />
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-sm sm:text-base font-bold text-[#181824] dark:text-[#F3F4F8]">
            {{ title }}
          </h3>
          <p class="text-xs text-[#737385] dark:text-[#9496A8] mt-1 leading-relaxed">
            {{ message }}
          </p>
        </div>
        <button 
          @click="emit('cancel')" 
          class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
          aria-label="Close dialog"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <div class="flex items-center justify-end gap-2 pt-2">
        <button 
          type="button" 
          @click="emit('cancel')"
          class="btn-secondary text-xs"
        >
          {{ cancelText || 'Cancel' }}
        </button>
        <button 
          type="button" 
          @click="emit('confirm')"
          class="text-xs font-semibold px-4 py-2 rounded-xl transition-all"
          :class="isDestructive ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm' : 'btn-primary'"
        >
          {{ confirmText || 'Confirm' }}
        </button>
      </div>
    </div>
  </div>
</template>
