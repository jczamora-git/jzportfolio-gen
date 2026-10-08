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
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
  >
    <div 
      class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
    >
      <div class="flex items-start gap-3.5">
        <div 
          class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          :class="isDestructive ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400' : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'"
        >
          <AlertTriangle class="w-5 h-5" />
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-base font-bold text-slate-900 dark:text-white">
            {{ title }}
          </h3>
          <p class="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            {{ message }}
          </p>
        </div>
        <button 
          @click="emit('cancel')" 
          class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <div class="flex items-center justify-end gap-2.5 pt-2">
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
