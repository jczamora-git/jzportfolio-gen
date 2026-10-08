<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useToast } from '@/composables/useToast'
import { SAMPLE_PROFILES, type SampleProfileMeta } from '@/data/sampleProfiles'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import { 
  X, 
  Check, 
  RotateCcw,
  ArrowRight
} from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const portfolioStore = usePortfolioStore()
const { showToast } = useToast()

const pendingSample = ref<SampleProfileMeta | null>(null)
const showConfirmModal = ref(false)

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

function handleSelectSample(sample: SampleProfileMeta) {
  if (portfolioStore.hasUserEnteredData && !portfolioStore.isUsingSampleData) {
    pendingSample.value = sample
    showConfirmModal.value = true
    return
  }
  applySample(sample)
}

function applySample(sample: SampleProfileMeta) {
  portfolioStore.loadSample(sample.id)
  showToast({
    title: `Loaded "${sample.name}" Profile`,
    description: `Populated with ${sample.category} demo details. You can customize any field.`,
    type: 'success'
  })
  emit('close')
}

function confirmReplace() {
  if (pendingSample.value) {
    applySample(pendingSample.value)
    pendingSample.value = null
  }
  showConfirmModal.value = false
}

function handleStartBlank() {
  portfolioStore.resetToBlank()
  showToast({
    title: 'Started Fresh',
    description: 'All fields cleared for a new custom portfolio.',
    type: 'info'
  })
  emit('close')
}
</script>

<template>
  <div>
    <!-- Backdrop & Modal Container -->
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 dark:bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      @click.self="emit('close')"
    >
      <div 
        class="bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] rounded-2xl max-w-xl w-full p-6 shadow-elevated space-y-5 max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between border-b border-[#E5E4EA] dark:border-[#242738] pb-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-[#F2EEFF] dark:bg-[#1E202E] text-[#6947FF] flex items-center justify-center font-mono text-xs font-bold">
              05
            </div>
            <div>
              <h3 class="font-display text-base font-bold text-[#14151B] dark:text-[#F1F2F6]">
                Example Profiles
              </h3>
              <p class="text-xs text-[#696976] dark:text-[#9496A6]">
                Select a verified persona to test the wizard with realistic data.
              </p>
            </div>
          </div>

          <button 
            type="button"
            @click="emit('close')"
            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Compact Persona List -->
        <div class="space-y-2.5">
          <div 
            v-for="sample in SAMPLE_PROFILES"
            :key="sample.id"
            @click="handleSelectSample(sample)"
            class="group p-3.5 rounded-xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 text-left"
            :class="[
              portfolioStore.activeSampleId === sample.id
                ? 'border-[#6947FF] bg-[#F2EEFF]/40 dark:bg-[#6947FF]/10 ring-1 ring-[#6947FF]'
                : 'border-[#E5E4EA] dark:border-[#242738] bg-[#F8F8F7] dark:bg-[#0E1017] hover:border-slate-300 dark:hover:border-slate-700'
            ]"
          >
            <!-- Left: Initials + Info -->
            <div class="flex items-center gap-3 min-w-0">
              <div 
                class="w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors"
                :class="portfolioStore.activeSampleId === sample.id ? 'bg-[#6947FF] text-white' : 'bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] text-[#14151B] dark:text-[#F1F2F6]'"
              >
                {{ getInitials(sample.name) }}
              </div>

              <div class="min-w-0 space-y-0.5">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-xs sm:text-sm text-[#14151B] dark:text-[#F1F2F6] truncate group-hover:text-[#6947FF] transition-colors">
                    {{ sample.name }}
                  </span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] text-[#6947FF] dark:text-brand-300 shrink-0">
                    {{ sample.category }}
                  </span>
                </div>
                <p class="text-xs text-[#696976] dark:text-[#9496A6] truncate">
                  {{ sample.summary }}
                </p>
              </div>
            </div>

            <!-- Right: Action Indicator -->
            <div class="shrink-0 flex items-center gap-1 text-xs">
              <span 
                v-if="portfolioStore.activeSampleId === sample.id" 
                class="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#6947FF]"
              >
                <Check class="w-3.5 h-3.5 stroke-[2.5]" />
                Active
              </span>
              <span 
                v-else 
                class="text-xs font-mono text-[#696976] dark:text-[#9496A6] group-hover:text-[#6947FF] flex items-center gap-1"
              >
                Load
                <ArrowRight class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="pt-3 border-t border-[#E5E4EA] dark:border-[#242738] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button 
            type="button"
            @click="handleStartBlank"
            class="text-[#696976] dark:text-[#9496A6] hover:text-[#14151B] dark:hover:text-[#F1F2F6] inline-flex items-center gap-1.5 transition-colors font-medium"
          >
            <RotateCcw class="w-3.5 h-3.5" />
            Clear to Blank Slate
          </button>

          <button 
            type="button"
            @click="emit('close')"
            class="btn-secondary text-xs py-1.5 px-4 w-full sm:w-auto"
          >
            Close
          </button>
        </div>

      </div>
    </div>

    <!-- Confirm Modal for Replacing Custom User Data -->
    <ConfirmModal 
      :show="showConfirmModal"
      title="Replace Current Information?"
      :message="`Loading '${pendingSample?.name}' will replace your currently entered information with this demo profile. You can modify the details afterward.`"
      confirm-text="Load Example"
      cancel-text="Keep My Data"
      @confirm="confirmReplace"
      @cancel="showConfirmModal = false"
    />
  </div>
</template>
