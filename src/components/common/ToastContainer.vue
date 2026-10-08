<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-vue-next'

const { toasts, removeToast } = useToast()
</script>

<template>
  <div 
    aria-live="polite" 
    class="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
  >
    <transition-group
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-for="t in toasts" 
        :key="t.id"
        class="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-lg border backdrop-blur-md transition-all duration-200"
        :class="{
          'bg-slate-900/95 text-white border-slate-700': t.type === 'info',
          'bg-emerald-950/95 text-emerald-100 border-emerald-800/80': t.type === 'success',
          'bg-amber-950/95 text-amber-100 border-amber-800/80': t.type === 'warning',
          'bg-rose-950/95 text-rose-100 border-rose-800/80': t.type === 'error'
        }"
      >
        <div class="shrink-0 mt-0.5">
          <CheckCircle2 v-if="t.type === 'success'" class="w-5 h-5 text-emerald-400" />
          <AlertCircle v-else-if="t.type === 'warning'" class="w-5 h-5 text-amber-400" />
          <XCircle v-else-if="t.type === 'error'" class="w-5 h-5 text-rose-400" />
          <Info v-else class="w-5 h-5 text-indigo-400" />
        </div>
        <div class="flex-1 min-w-0">
          <h5 class="text-sm font-semibold leading-tight">{{ t.title }}</h5>
          <p v-if="t.description" class="text-xs opacity-90 mt-1 leading-normal">{{ t.description }}</p>
        </div>
        <button 
          @click="removeToast(t.id)" 
          class="shrink-0 p-1 rounded-lg opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
          aria-label="Dismiss notification"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </transition-group>
  </div>
</template>
