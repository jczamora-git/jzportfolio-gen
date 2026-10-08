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
  { number: 2, title: 'Skills', subtitle: 'Tech & Background', icon: Code2 },
  { number: 3, title: 'Projects', subtitle: 'Featured Builds', icon: FolderGit2 },
  { number: 4, title: 'Design', subtitle: 'Aesthetic & Style', icon: Palette },
  { number: 5, title: 'Review', subtitle: 'Prompt Summary', icon: Sparkles },
]

function handleStepClick(stepNumber: number) {
  if (stepNumber <= (props.maxStepAllowed || props.currentStep)) {
    emit('selectStep', stepNumber)
  }
}
</script>

<template>
  <nav aria-label="Wizard Progress" class="w-full">
    <!-- Desktop Minimal Stepper -->
    <div class="hidden md:flex items-center justify-between relative py-2">
      <!-- Progress Track -->
      <div class="absolute left-8 right-8 top-6 h-[2px] bg-[#E8E8EF] dark:bg-[#232738] -z-0">
        <div 
          class="h-full bg-[#6D4AFF] transition-all duration-300 ease-out"
          :style="{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }"
        ></div>
      </div>

      <button 
        v-for="step in steps" 
        :key="step.number" 
        type="button"
        @click="handleStepClick(step.number)"
        class="relative z-10 flex flex-col items-center group focus:outline-none transition-transform"
        :disabled="step.number > (maxStepAllowed || currentStep)"
      >
        <!-- Step Circle -->
        <div 
          class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200"
          :class="[
            currentStep === step.number 
              ? 'bg-[#6D4AFF] text-white shadow-sm ring-4 ring-[#F2EEFF] dark:ring-brand-950/80 scale-110' 
              : currentStep > step.number 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-white dark:bg-[#141827] text-[#737385] dark:text-[#9496A8] border border-[#E8E8EF] dark:border-[#232738]'
          ]"
        >
          <Check v-if="currentStep > step.number" class="w-4 h-4 stroke-[2.5]" />
          <span v-else>{{ step.number }}</span>
        </div>

        <!-- Step Label -->
        <div class="text-center mt-2">
          <span 
            class="block text-xs font-semibold tracking-tight transition-colors"
            :class="currentStep === step.number ? 'text-[#6D4AFF] dark:text-brand-400' : currentStep > step.number ? 'text-[#181824] dark:text-[#F3F4F8]' : 'text-[#737385] dark:text-[#9496A8]'"
          >
            {{ step.title }}
          </span>
          <span class="block text-[10px] text-[#737385] dark:text-[#9496A8] font-normal">
            {{ step.subtitle }}
          </span>
        </div>
      </button>
    </div>

    <!-- Mobile Compact Stepper -->
    <div class="flex md:hidden flex-col gap-2">
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold text-[#6D4AFF] dark:text-brand-400">
          Step {{ currentStep }} of {{ steps.length }}: 
          <span class="text-[#181824] dark:text-[#F3F4F8] font-semibold ml-1">{{ steps[currentStep - 1]?.title }}</span>
        </span>
        <span class="text-[#737385] dark:text-[#9496A8] text-[11px]">
          {{ steps[currentStep - 1]?.subtitle }}
        </span>
      </div>

      <!-- Segmented Bar -->
      <div class="grid grid-cols-5 gap-1.5 h-1">
        <div 
          v-for="step in steps" 
          :key="step.number"
          class="rounded-full transition-all duration-300"
          :class="[
            currentStep === step.number 
              ? 'bg-[#6D4AFF]' 
              : currentStep > step.number 
                ? 'bg-emerald-500' 
                : 'bg-[#E8E8EF] dark:bg-[#232738]'
          ]"
        ></div>
      </div>
    </div>
  </nav>
</template>
