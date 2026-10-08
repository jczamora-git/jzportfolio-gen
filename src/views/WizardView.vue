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
import SampleProfileSelector from '@/components/wizard/SampleProfileSelector.vue'
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
const showSampleSelector = ref(false)

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
        description: 'Please select or add at least one technical skill.',
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
    
    <!-- Top Utility Row -->
    <div class="flex items-center justify-between gap-3 text-xs border-b border-[#E5E4EA] dark:border-[#242738] pb-3">
      <!-- Autosave Status Indicator -->
      <div class="flex items-center gap-2 text-[#696976] dark:text-[#9496A6] font-mono text-[11px]">
        <span 
          class="w-2 h-2 rounded-full"
          :class="{
            'bg-emerald-500 animate-pulse': portfolioStore.saveIndicator === 'saving',
            'bg-emerald-500': portfolioStore.saveIndicator === 'saved',
            'bg-slate-300 dark:bg-slate-700': portfolioStore.saveIndicator === 'idle'
          }"
        ></span>
        <span v-if="portfolioStore.saveIndicator === 'saving'">Saving draft...</span>
        <span v-else-if="portfolioStore.lastSavedAt">Saved locally ({{ portfolioStore.lastSavedAt }})</span>
        <span v-else>Saved locally</span>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2">
        <button 
          @click="showSampleSelector = true"
          type="button"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5E4EA] dark:border-[#242738] bg-white dark:bg-[#161822] text-[#14151B] dark:text-[#F1F2F6] hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-subtle text-xs font-medium"
        >
          <Sparkles class="w-3.5 h-3.5 text-[#6947FF]" />
          Explore Examples
        </button>

        <button 
          @click="showResetModal = true"
          type="button"
          class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[#696976] hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-[#1E202E] transition-colors text-xs"
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

    <!-- Main Wizard Form Container -->
    <main class="card-surface p-6 sm:p-8 border border-[#E5E4EA] dark:border-[#242738]">
      <StepProfile v-if="currentStep === 1" />
      <StepSkills v-else-if="currentStep === 2" />
      <StepProjects v-else-if="currentStep === 3" />
      <StepDesign v-else-if="currentStep === 4" />
      <StepReview v-else-if="currentStep === 5" />
    </main>

    <!-- Bottom Navigation Bar -->
    <div class="flex items-center justify-between gap-4 pt-1">
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

    <!-- Sample Profile Selector Modal -->
    <SampleProfileSelector 
      :is-open="showSampleSelector"
      @close="showSampleSelector = false"
    />

    <!-- Reset Confirmation Modal -->
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
