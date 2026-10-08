<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useToast } from '@/composables/useToast'
import WizardProgress from '@/components/wizard/WizardProgress.vue'
import StepProfile from '@/components/wizard/StepProfile.vue'
import StepSkills from '@/components/wizard/StepSkills.vue'
import StepProjects from '@/components/wizard/StepProjects.vue'
import StepDesign from '@/components/wizard/StepDesign.vue'
import StepReview from '@/components/wizard/StepReview.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  RotateCcw
} from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
const { showToast } = useToast()

const showResetModal = ref(false)

onMounted(() => {
  portfolioStore.initStore()
})

const currentStep = computed({
  get: () => portfolioStore.currentStep,
  set: (val: number) => { portfolioStore.currentStep = val }
})

// Validation for proceeding to next step
const canProceedNext = computed(() => {
  if (currentStep.value === 1) {
    return portfolioStore.isProfileValid
  }
  if (currentStep.value === 2) {
    return portfolioStore.isSkillsValid
  }
  if (currentStep.value === 3) {
    return portfolioStore.isProjectsValid
  }
  return true
})

function nextStep() {
  if (!canProceedNext.value) {
    if (currentStep.value === 1) {
      showToast({
        title: 'Required Profile Fields',
        description: 'Please enter your Full Name and Headline before proceeding.',
        type: 'warning'
      })
    } else if (currentStep.value === 2) {
      showToast({
        title: 'Skills Required',
        description: 'Please select or type at least one skill.',
        type: 'warning'
      })
    } else if (currentStep.value === 3) {
      showToast({
        title: 'Incomplete Project Info',
        description: 'All added projects must have a name and description.',
        type: 'warning'
      })
    }
    return
  }

  if (currentStep.value < 5) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function handleSelectStep(step: number) {
  // Only allow jumping forward if prior steps are valid
  if (step > currentStep.value) {
    if (currentStep.value === 1 && !portfolioStore.isProfileValid) return
    if (currentStep.value === 2 && !portfolioStore.isSkillsValid) return
  }
  currentStep.value = step
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function confirmReset() {
  portfolioStore.resetToBlank()
  showResetModal.value = false
  showToast({
    title: 'Draft Cleared',
    description: 'All fields have been reset to blank.',
    type: 'info'
  })
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
    
    <!-- Top Bar: Autosave indicator & draft utilities -->
    <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
      <!-- Autosave status -->
      <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        <span 
          class="w-2 h-2 rounded-full"
          :class="{
            'bg-emerald-500 animate-pulse': portfolioStore.saveIndicator === 'saving',
            'bg-emerald-500': portfolioStore.saveIndicator === 'saved',
            'bg-slate-300 dark:bg-slate-700': portfolioStore.saveIndicator === 'idle'
          }"
        ></span>
        <span v-if="portfolioStore.saveIndicator === 'saving'">Saving draft...</span>
        <span v-else-if="portfolioStore.lastSavedAt">
          Draft saved locally ({{ portfolioStore.lastSavedAt }})
        </span>
        <span v-else>Autosave active</span>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2">
        <button 
          @click="portfolioStore.loadSample"
          type="button"
          class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <Sparkles class="w-3.5 h-3.5 text-indigo-500" />
          Load Sample
        </button>

        <button 
          @click="showResetModal = true"
          type="button"
          class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Clear all fields"
        >
          <RotateCcw class="w-3.5 h-3.5" />
          Reset
        </button>
      </div>
    </div>

    <!-- Stepper Progress Bar -->
    <WizardProgress 
      :current-step="currentStep" 
      :max-step-allowed="5"
      @select-step="handleSelectStep" 
    />

    <!-- Step Content Container -->
    <main class="card-surface p-6 sm:p-8">
      <StepProfile v-if="currentStep === 1" />
      <StepSkills v-else-if="currentStep === 2" />
      <StepProjects v-else-if="currentStep === 3" />
      <StepDesign v-else-if="currentStep === 4" />
      <StepReview v-else-if="currentStep === 5" />
    </main>

    <!-- Bottom Navigation Bar -->
    <div class="flex items-center justify-between gap-4 pt-2">
      <button 
        type="button" 
        @click="prevStep"
        :disabled="currentStep === 1"
        class="btn-secondary"
        :class="{ 'opacity-0 pointer-events-none': currentStep === 1 }"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back
      </button>

      <div class="flex items-center gap-3">
        <button 
          v-if="currentStep < 5"
          type="button" 
          @click="nextStep"
          :disabled="!canProceedNext"
          class="btn-primary"
        >
          Continue
          <ArrowRight class="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>

    <!-- Confirmation Modal for Reset -->
    <ConfirmModal 
      :show="showResetModal"
      title="Reset Portfolio Draft?"
      message="This will clear all entered profile details, skills, and projects from your browser storage. This action cannot be undone."
      confirm-text="Yes, Clear All"
      cancel-text="Keep Editing"
      :is-destructive="true"
      @confirm="confirmReset"
      @cancel="showResetModal = false"
    />

  </div>
</template>
