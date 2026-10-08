<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useToast } from '@/composables/useToast'
import { SAMPLE_PROFILES, type SampleProfileMeta } from '@/data/sampleProfiles'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import { 
  Sparkles, 
  X, 
  Check, 
  GraduationCap, 
  Code2, 
  Palette, 
  BarChart3, 
  Briefcase,
  RotateCcw
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

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Student Developer': return GraduationCap
    case 'Fresh Graduate': return Code2
    case 'UI/UX Designer': return Palette
    case 'Data Analyst': return BarChart3
    case 'Freelancer': return Briefcase
    default: return Code2
  }
}

function handleSelectSample(sample: SampleProfileMeta) {
  // If user already has entered data and is not just switching from another sample
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
        class="bg-white dark:bg-[#141827] border border-[#E8E8EF] dark:border-[#232738] rounded-2xl max-w-2xl w-full p-6 shadow-elevated space-y-5 max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between border-b border-[#E8E8EF] dark:border-[#232738] pb-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-[#F2EEFF] dark:bg-brand-950/60 text-[#6D4AFF] flex items-center justify-center">
              <Sparkles class="w-4 h-4" />
            </div>
            <div>
              <h3 class="text-base font-bold text-[#181824] dark:text-[#F3F4F8]">
                Explore Example Profiles
              </h3>
              <p class="text-xs text-[#737385] dark:text-[#9496A8]">
                Select a persona to test the wizard with realistic, pre-configured information.
              </p>
            </div>
          </div>

          <button 
            type="button"
            @click="emit('close')"
            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Sample Profile Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div 
            v-for="sample in SAMPLE_PROFILES"
            :key="sample.id"
            @click="handleSelectSample(sample)"
            class="group p-4 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between text-left"
            :class="[
              portfolioStore.activeSampleId === sample.id
                ? 'border-[#6D4AFF] bg-[#F2EEFF]/50 dark:bg-[#6D4AFF]/10 ring-2 ring-[#6D4AFF]/20'
                : 'border-[#E8E8EF] dark:border-[#232738] bg-white dark:bg-[#141827] hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-subtle'
            ]"
          >
            <div class="space-y-2">
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-[#F2EEFF] dark:bg-[#1A2033] text-[#6D4AFF] dark:text-brand-300 flex items-center justify-center shrink-0">
                    <component :is="getCategoryIcon(sample.category)" class="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 class="text-xs font-bold text-[#181824] dark:text-[#F3F4F8] group-hover:text-[#6D4AFF] transition-colors">
                      {{ sample.name }}
                    </h4>
                    <span class="text-[11px] font-medium text-[#6D4AFF] dark:text-brand-400 block">
                      {{ sample.category }}
                    </span>
                  </div>
                </div>

                <span 
                  v-if="portfolioStore.activeSampleId === sample.id" 
                  class="w-5 h-5 rounded-full bg-[#6D4AFF] text-white flex items-center justify-center text-[10px] shrink-0"
                >
                  <Check class="w-3 h-3 stroke-[2.5]" />
                </span>
              </div>

              <p class="text-xs text-[#737385] dark:text-[#9496A8] leading-relaxed line-clamp-2">
                {{ sample.summary }}
              </p>
            </div>

            <!-- Focus tag -->
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-[#737385] dark:text-[#9496A8]">
              <span class="truncate">{{ sample.focus }}</span>
              <span class="text-[#6D4AFF] dark:text-brand-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                Load &rarr;
              </span>
            </div>
          </div>
        </div>

        <!-- Footer with Blank option -->
        <div class="pt-3 border-t border-[#E8E8EF] dark:border-[#232738] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button 
            type="button"
            @click="handleStartBlank"
            class="text-[#737385] dark:text-[#9496A8] hover:text-[#181824] dark:hover:text-[#F3F4F8] inline-flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw class="w-3.5 h-3.5" />
            Start with Blank Profile
          </button>

          <button 
            type="button"
            @click="emit('close')"
            class="btn-secondary text-xs py-1.5 px-4 w-full sm:w-auto"
          >
            Cancel
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
