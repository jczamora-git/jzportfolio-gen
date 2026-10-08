<script setup lang="ts">
import { Check, User, Code2, FolderGit2, Palette, Sparkles } from 'lucide-vue-next'

const props = defineProps<{
  currentStep: number
  maxStepAllowed?: number
}>()

const emit = defineEmits<{
  (e: 'selectStep', step: number): void
}>()

const steps = [
  { number: 1, title: 'Profile', subtitle: 'Personal Details', icon: User },
  { number: 2, title: 'Background', subtitle: 'Skills & Education', icon: Code2 },
  { number: 3, title: 'Projects', subtitle: 'Showcase Work', icon: FolderGit2 },
  { number: 4, title: 'Design', subtitle: 'Theme & Style', icon: Palette },
  { number: 5, title: 'Review', subtitle: 'Generate Prompt', icon: Sparkles },
]

function handleStepClick(stepNumber: number) {
  // Allow clicking on any already visited or current step
  if (stepNumber <= (props.maxStepAllowed || props.currentStep)) {
    emit('selectStep', stepNumber)
  }
}
</script>

<template>
  <div class="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-sm">
    <!-- Desktop Horizontal Stepper -->
    <div class="hidden md:flex items-center justify-between relative">
      <!-- Progress Track Behind -->
      <div class="absolute left-6 right-6 top-5 h-0.5 bg-slate-200 dark:bg-slate-800 -z-0">
        <div 
          class="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300"
          :style="{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }"
        ></div>
      </div>

      <div 
        v-for="step in steps" 
        :key="step.number" 
        class="relative z-10 flex flex-col items-center group cursor-pointer"
        @click="handleStepClick(step.number)"
      >
        <!-- Step Bubble -->
        <div 
          class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200"
          :class="[
            currentStep === step.number 
              ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950/80 shadow-md shadow-indigo-500/30 scale-105' 
              : currentStep > step.number 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'
          ]"
        >
          <Check v-if="currentStep > step.number" class="w-5 h-5 stroke-[2.5]" />
          <component v-else :is="step.icon" class="w-4 h-4" />
        </div>

        <!-- Step Label -->
        <div class="text-center mt-2">
          <span 
            class="block text-xs font-semibold tracking-tight transition-colors"
            :class="currentStep === step.number ? 'text-indigo-600 dark:text-indigo-400' : currentStep > step.number ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'"
          >
            {{ step.title }}
          </span>
          <span class="block text-[11px] text-slate-400 dark:text-slate-500">
            {{ step.subtitle }}
          </span>
        </div>
      </div>
    </div>

    <!-- Mobile Compact Stepper -->
    <div class="flex md:hidden flex-col gap-2.5">
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
          Step {{ currentStep }} of {{ steps.length }}:
          <span class="text-slate-900 dark:text-white font-semibold">{{ steps[currentStep - 1]?.title }}</span>
        </span>
        <span class="text-slate-500 text-[11px]">
          {{ steps[currentStep - 1]?.subtitle }}
        </span>
      </div>

      <!-- Segmented Bar -->
      <div class="grid grid-cols-5 gap-1.5 h-1.5">
        <div 
          v-for="step in steps" 
          :key="step.number"
          class="rounded-full transition-all duration-300"
          :class="[
            currentStep === step.number 
              ? 'bg-indigo-600' 
              : currentStep > step.number 
                ? 'bg-emerald-500' 
                : 'bg-slate-200 dark:bg-slate-800'
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>
