<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { POPULAR_SKILL_CATEGORIES } from '@/data/skillSuggestions'
import type { ParticipantStatus } from '@/types/portfolio'
import FormField from '@/components/common/FormField.vue'
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Plus, 
  X, 
  Trash2, 
  Check
} from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
const background = computed(() => portfolioStore.draft.background)

const newSkillInput = ref('')
const newCertInput = ref('')
const activeCategoryIndex = ref(0)

const statusOptions: { id: ParticipantStatus; label: string; desc: string }[] = [
  { id: 'student', label: 'Student / Undergraduate', desc: 'Showcase coursework, personal builds & learning milestones.' },
  { id: 'fresh_graduate', label: 'Fresh Graduate', desc: 'Highlight degree, internships & capstone systems.' },
  { id: 'professional', label: 'Working Professional', desc: 'Industry experience, project architecture & growth.' },
  { id: 'freelancer', label: 'Freelancer / Contractor', desc: 'Client solutions, independent products & services.' },
  { id: 'other', label: 'Career Shifter / Self-Taught', desc: 'Independent builds & continuous technical learning.' },
]

function handleAddSkill() {
  if (newSkillInput.value.trim()) {
    portfolioStore.addSkill(newSkillInput.value)
    newSkillInput.value = ''
  }
}

function handleAddCert() {
  if (newCertInput.value.trim()) {
    portfolioStore.addCertification(newCertInput.value)
    newCertInput.value = ''
  }
}

function toggleSuggestedSkill(skill: string) {
  if (background.value.skills.includes(skill)) {
    portfolioStore.removeSkill(skill)
  } else {
    portfolioStore.addSkill(skill)
  }
}
</script>

<template>
  <div class="space-y-7 animate-fadeIn">
    <!-- Step Header -->
    <div class="border-b border-[#E8E8EF] dark:border-[#232738] pb-4">
      <div class="text-[11px] font-bold text-[#6D4AFF] uppercase tracking-wider mb-1">
        Step 2 of 5
      </div>
      <h2 class="text-xl sm:text-2xl font-bold text-[#181824] dark:text-[#F3F4F8] tracking-tight">
        Skills & Educational Background
      </h2>
      <p class="text-xs sm:text-sm text-[#737385] dark:text-[#9496A8] mt-1">
        Highlight your technical toolbelt, study background, and any past experience.
      </p>
    </div>

    <!-- 1. Current Journey Status -->
    <div class="space-y-3">
      <label class="block text-xs sm:text-sm font-semibold text-[#181824] dark:text-[#F3F4F8]">
        What best describes your current journey?
      </label>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        <button 
          v-for="opt in statusOptions"
          :key="opt.id"
          type="button"
          @click="portfolioStore.updateStatus(opt.id)"
          class="text-left p-3.5 rounded-xl border transition-all duration-150 flex flex-col justify-between"
          :class="[
            background.status === opt.id 
              ? 'border-[#6D4AFF] bg-[#F2EEFF]/60 dark:bg-[#6D4AFF]/10 text-[#181824] dark:text-[#F3F4F8] ring-1 ring-[#6D4AFF]' 
              : 'border-[#E8E8EF] dark:border-[#232738] bg-white dark:bg-[#141827] hover:border-slate-300 dark:hover:border-slate-700 text-[#737385] dark:text-[#9496A8]'
          ]"
        >
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold tracking-tight text-[#181824] dark:text-[#F3F4F8]">{{ opt.label }}</span>
            <Check v-if="background.status === opt.id" class="w-3.5 h-3.5 text-[#6D4AFF] shrink-0 stroke-[2.5]" />
          </div>
          <span class="text-[11px] text-[#737385] dark:text-[#9496A8] leading-snug">{{ opt.desc }}</span>
        </button>
      </div>
    </div>

    <!-- 2. Skills Management -->
    <div class="space-y-3.5 pt-4 border-t border-[#E8E8EF] dark:border-[#232738]">
      <div class="flex items-center justify-between">
        <div>
          <label class="block text-xs sm:text-sm font-semibold text-[#181824] dark:text-[#F3F4F8]">
            Technical Skills & Technologies <span class="text-rose-500">*</span>
          </label>
          <p class="text-[11px] text-[#737385] dark:text-[#9496A8]">
            Pick from suggestions or enter custom technologies. At least 1 required.
          </p>
        </div>
        <span class="text-xs font-medium text-[#737385] dark:text-[#9496A8]">
          {{ background.skills.length }} selected
        </span>
      </div>

      <!-- Selected Skills Chips -->
      <div class="min-h-12 p-3 rounded-xl border border-[#E8E8EF] dark:border-[#232738] bg-[#FAFAFC] dark:bg-[#0B0D17]/50 flex flex-wrap gap-1.5 items-center">
        <span 
          v-if="background.skills.length === 0" 
          class="text-xs text-rose-500 dark:text-rose-400 italic"
        >
          Please select or add at least one skill to continue.
        </span>
        
        <span 
          v-for="skill in background.skills" 
          :key="skill"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#6D4AFF] text-white shadow-sm"
        >
          {{ skill }}
          <button 
            type="button" 
            @click="portfolioStore.removeSkill(skill)"
            class="hover:bg-[#5938E8] p-0.5 rounded transition-colors focus:outline-none"
            :aria-label="`Remove ${skill}`"
          >
            <X class="w-3 h-3" />
          </button>
        </span>
      </div>

      <!-- Custom Skill Input -->
      <div class="flex gap-2">
        <input 
          type="text" 
          v-model="newSkillInput"
          @keydown.enter.prevent="handleAddSkill"
          placeholder="Add custom skill (e.g. Docker, GraphQL, Figma) and press Enter" 
          class="input-base text-xs"
        />
        <button 
          type="button" 
          @click="handleAddSkill"
          :disabled="!newSkillInput.trim()"
          class="btn-secondary shrink-0 px-3.5 text-xs"
        >
          <Plus class="w-3.5 h-3.5 mr-1" />
          Add
        </button>
      </div>

      <!-- Suggested Skill Tabs & Chips -->
      <div class="bg-white dark:bg-[#141827] rounded-xl border border-[#E8E8EF] dark:border-[#232738] p-3.5 space-y-2.5">
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button 
            v-for="(cat, idx) in POPULAR_SKILL_CATEGORIES"
            :key="cat.category"
            type="button"
            @click="activeCategoryIndex = idx"
            class="px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors"
            :class="activeCategoryIndex === idx ? 'bg-[#181824] text-white dark:bg-[#F3F4F8] dark:text-[#181824]' : 'text-[#737385] dark:text-[#9496A8] hover:bg-slate-100 dark:hover:bg-[#1A2033]'"
          >
            {{ cat.category }}
          </button>
        </div>

        <div class="flex flex-wrap gap-1.5 pt-0.5">
          <button 
            v-for="s in POPULAR_SKILL_CATEGORIES[activeCategoryIndex].skills"
            :key="s"
            type="button"
            @click="toggleSuggestedSkill(s)"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-all"
            :class="[
              background.skills.includes(s)
                ? 'bg-[#F2EEFF] dark:bg-brand-950/60 border-[#6D4AFF] text-[#6D4AFF] dark:text-brand-300'
                : 'bg-[#FAFAFC] dark:bg-[#1A2033] border-[#E8E8EF] dark:border-[#232738] text-[#737385] dark:text-[#9496A8] hover:border-slate-300'
            ]"
          >
            <Check v-if="background.skills.includes(s)" class="w-3 h-3 text-[#6D4AFF] dark:text-brand-400 stroke-[2.5]" />
            <Plus v-else class="w-3 h-3 text-slate-400" />
            {{ s }}
          </button>
        </div>
      </div>
    </div>

    <!-- 3. Education (Optional) -->
    <div class="space-y-3 pt-4 border-t border-[#E8E8EF] dark:border-[#232738]">
      <div class="flex items-center gap-1.5">
        <GraduationCap class="w-4 h-4 text-[#6D4AFF]" />
        <h3 class="text-xs sm:text-sm font-semibold text-[#181824] dark:text-[#F3F4F8]">
          Education & Degree Details
        </h3>
        <span class="text-[11px] text-[#737385] dark:text-[#9496A8] font-normal">(Optional)</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <FormField label="School / University" id="eduSchool" optional>
          <input 
            id="eduSchool"
            type="text" 
            :value="background.education?.school || ''"
            @input="portfolioStore.updateEducation(($event.target as HTMLInputElement).value, undefined, undefined)"
            placeholder="e.g. Pacific Tech University" 
            class="input-base text-xs"
          />
        </FormField>

        <FormField label="Program / Degree" id="eduProgram" optional>
          <input 
            id="eduProgram"
            type="text" 
            :value="background.education?.program || ''"
            @input="portfolioStore.updateEducation(undefined, ($event.target as HTMLInputElement).value, undefined)"
            placeholder="e.g. B.S. in Computer Science" 
            class="input-base text-xs"
          />
        </FormField>

        <FormField label="Year or Status" id="eduYear" optional>
          <input 
            id="eduYear"
            type="text" 
            :value="background.education?.year || ''"
            @input="portfolioStore.updateEducation(undefined, undefined, ($event.target as HTMLInputElement).value)"
            placeholder="e.g. Expected 2026" 
            class="input-base text-xs"
          />
        </FormField>
      </div>
    </div>

    <!-- 4. Experience (Optional) -->
    <div class="space-y-3 pt-4 border-t border-[#E8E8EF] dark:border-[#232738]">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <Briefcase class="w-4 h-4 text-[#6D4AFF]" />
          <h3 class="text-xs sm:text-sm font-semibold text-[#181824] dark:text-[#F3F4F8]">
            Experience & Internships
          </h3>
          <span class="text-[11px] text-[#737385] dark:text-[#9496A8] font-normal">(Optional)</span>
        </div>
        <button 
          type="button" 
          @click="portfolioStore.addExperience"
          class="btn-secondary text-xs py-1.5 px-3"
        >
          <Plus class="w-3.5 h-3.5 mr-1" />
          Add Role
        </button>
      </div>

      <div v-if="!background.experience || background.experience.length === 0" class="p-3.5 rounded-xl border border-dashed border-[#E8E8EF] dark:border-[#232738] bg-[#FAFAFC] dark:bg-[#0B0D17]/40 text-center">
        <p class="text-xs text-[#737385] dark:text-[#9496A8]">
          No formal work experience yet? Students and beginners can skip this without penalty.
        </p>
      </div>

      <div v-else class="space-y-3">
        <div 
          v-for="(exp, idx) in background.experience" 
          :key="exp.id"
          class="p-4 rounded-xl border border-[#E8E8EF] dark:border-[#232738] bg-white dark:bg-[#141827] space-y-3 relative group"
        >
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold text-[#737385] uppercase tracking-wider">
              Experience #{{ idx + 1 }}
            </span>
            <button 
              type="button"
              @click="portfolioStore.removeExperience(exp.id)"
              class="text-slate-400 hover:text-rose-500 p-1 rounded transition-colors"
              title="Remove this role"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-medium text-[#737385] dark:text-[#9496A8] mb-1">
                Role / Title <span class="text-rose-500">*</span>
              </label>
              <input 
                type="text" 
                v-model="exp.role"
                placeholder="e.g. Web Development Intern" 
                class="input-base text-xs"
                required
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-[#737385] dark:text-[#9496A8] mb-1">
                Company / Organization
              </label>
              <input 
                type="text" 
                v-model="exp.organization"
                placeholder="e.g. Digital Media Lab" 
                class="input-base text-xs"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-[#737385] dark:text-[#9496A8] mb-1">
                Duration
              </label>
              <input 
                type="text" 
                v-model="exp.duration"
                placeholder="e.g. Jun 2025 - Aug 2025" 
                class="input-base text-xs"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-[#737385] dark:text-[#9496A8] mb-1">
              Key Contributions
            </label>
            <textarea 
              rows="2" 
              v-model="exp.summary"
              placeholder="e.g. Built interactive dashboard components using Vue.js." 
              class="input-base text-xs"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Certifications & Achievements -->
    <div class="space-y-3 pt-4 border-t border-[#E8E8EF] dark:border-[#232738]">
      <div class="flex items-center gap-1.5">
        <Award class="w-4 h-4 text-[#6D4AFF]" />
        <h3 class="text-xs sm:text-sm font-semibold text-[#181824] dark:text-[#F3F4F8]">
          Certifications & Achievements
        </h3>
        <span class="text-[11px] text-[#737385] dark:text-[#9496A8] font-normal">(Optional)</span>
      </div>

      <div class="flex gap-2">
        <input 
          type="text" 
          v-model="newCertInput"
          @keydown.enter.prevent="handleAddCert"
          placeholder="e.g. AWS Cloud Practitioner or Hackathon 1st Place" 
          class="input-base text-xs"
        />
        <button 
          type="button" 
          @click="handleAddCert"
          :disabled="!newCertInput.trim()"
          class="btn-secondary shrink-0 px-3.5 text-xs"
        >
          <Plus class="w-3.5 h-3.5 mr-1" />
          Add
        </button>
      </div>

      <div v-if="background.certifications && background.certifications.length > 0" class="flex flex-wrap gap-2 pt-1">
        <span 
          v-for="cert in background.certifications" 
          :key="cert"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAFAFC] dark:bg-[#1A2033] text-[#181824] dark:text-[#F3F4F8] border border-[#E8E8EF] dark:border-[#232738]"
        >
          <Award class="w-3 h-3 text-[#6D4AFF]" />
          {{ cert }}
          <button 
            type="button" 
            @click="portfolioStore.removeCertification(cert)"
            class="hover:text-rose-600 p-0.5 rounded transition-colors"
          >
            <X class="w-3 h-3" />
          </button>
        </span>
      </div>
    </div>
  </div>
</template>
