<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { POPULAR_SKILL_CATEGORIES } from '@/data/skillSuggestions'
import type { ParticipantStatus } from '@/types/portfolio'
import FormField from '@/components/common/FormField.vue'
import { 
  Code2, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Plus, 
  X, 
  Sparkles, 
  Trash2, 
  Check,
  Building,
  Calendar,
  Layers
} from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
const background = computed(() => portfolioStore.draft.background)

const newSkillInput = ref('')
const newCertInput = ref('')
const activeCategoryIndex = ref(0)

const statusOptions: { id: ParticipantStatus; label: string; desc: string }[] = [
  { id: 'student', label: 'Student / Undergraduate', desc: 'Currently enrolled; showcasing coursework & personal builds.' },
  { id: 'fresh_graduate', label: 'Fresh Graduate', desc: 'Recently graduated, eager to launch full-time career.' },
  { id: 'professional', label: 'Working Professional', desc: 'Industry experience looking to showcase projects & growth.' },
  { id: 'freelancer', label: 'Independent Freelancer', desc: 'Client-focused work, contracts, and services.' },
  { id: 'other', label: 'Self-Taught / Career Changer', desc: 'Independent learner transitioning into tech.' },
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
  <div class="space-y-8 animate-fadeIn">
    <!-- Section Header -->
    <div class="border-b border-slate-200/80 dark:border-slate-800 pb-5">
      <div class="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
        <Code2 class="w-4 h-4" />
        Step 2 of 5
      </div>
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
        Skills & Educational Background
      </h2>
      <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
        Highlight your technical toolbelt, study background, and any past experience or certifications.
      </p>
    </div>

    <!-- 1. Current Status -->
    <div class="space-y-3">
      <label class="block text-sm font-semibold text-slate-900 dark:text-white">
        What best describes your current journey?
      </label>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <button 
          v-for="opt in statusOptions"
          :key="opt.id"
          type="button"
          @click="portfolioStore.updateStatus(opt.id)"
          class="text-left p-3.5 rounded-xl border transition-all duration-150 flex flex-col justify-between"
          :class="[
            background.status === opt.id 
              ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 text-slate-900 dark:text-white ring-2 ring-indigo-500/20' 
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
          ]"
        >
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold tracking-tight">{{ opt.label }}</span>
            <Check v-if="background.status === opt.id" class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          </div>
          <span class="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{{ opt.desc }}</span>
        </button>
      </div>
    </div>

    <!-- 2. Skills Management -->
    <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <label class="block text-sm font-semibold text-slate-900 dark:text-white">
            Technical Skills & Technologies <span class="text-rose-500">*</span>
          </label>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Select from suggestions or type your own. At least 1 skill required.
          </p>
        </div>
        <span class="text-xs font-medium text-slate-400">
          {{ background.skills.length }} selected
        </span>
      </div>

      <!-- Selected Skills Chips -->
      <div class="min-h-12 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap gap-2 items-center">
        <span 
          v-if="background.skills.length === 0" 
          class="text-xs text-rose-500 dark:text-rose-400 italic"
        >
          Please select or add at least one skill to continue.
        </span>
        
        <span 
          v-for="skill in background.skills" 
          :key="skill"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
        >
          {{ skill }}
          <button 
            type="button" 
            @click="portfolioStore.removeSkill(skill)"
            class="hover:bg-indigo-700 p-0.5 rounded-full transition-colors focus:outline-none"
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
          placeholder="Type custom skill (e.g. Docker, GraphQL, Figma) and press Enter" 
          class="input-base"
        />
        <button 
          type="button" 
          @click="handleAddSkill"
          :disabled="!newSkillInput.trim()"
          class="btn-secondary shrink-0 px-4"
        >
          <Plus class="w-4 h-4 mr-1" />
          Add Skill
        </button>
      </div>

      <!-- Suggested Skill Tabs & Chips -->
      <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-4 space-y-3">
        <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-thin">
          <button 
            v-for="(cat, idx) in POPULAR_SKILL_CATEGORIES"
            :key="cat.category"
            type="button"
            @click="activeCategoryIndex = idx"
            class="px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors"
            :class="activeCategoryIndex === idx ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            {{ cat.category }}
          </button>
        </div>

        <div class="flex flex-wrap gap-1.5 pt-1">
          <button 
            v-for="s in POPULAR_SKILL_CATEGORIES[activeCategoryIndex].skills"
            :key="s"
            type="button"
            @click="toggleSuggestedSkill(s)"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-all"
            :class="[
              background.skills.includes(s)
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700'
            ]"
          >
            <Check v-if="background.skills.includes(s)" class="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
            <Plus v-else class="w-3 h-3 text-slate-400" />
            {{ s }}
          </button>
        </div>
      </div>
    </div>

    <!-- 3. Education (Optional) -->
    <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
      <div class="flex items-center gap-2">
        <GraduationCap class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        <h3 class="text-sm font-semibold text-slate-900 dark:text-white">
          Education & Degree Details
        </h3>
        <span class="text-xs text-slate-400 font-normal">(Optional)</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField label="School / University" id="eduSchool" optional>
          <input 
            id="eduSchool"
            type="text" 
            :value="background.education?.school || ''"
            @input="portfolioStore.updateEducation(($event.target as HTMLInputElement).value, undefined, undefined)"
            placeholder="e.g. University of Washington" 
            class="input-base"
          />
        </FormField>

        <FormField label="Program / Degree" id="eduProgram" optional>
          <input 
            id="eduProgram"
            type="text" 
            :value="background.education?.program || ''"
            @input="portfolioStore.updateEducation(undefined, ($event.target as HTMLInputElement).value, undefined)"
            placeholder="e.g. B.S. in Computer Science" 
            class="input-base"
          />
        </FormField>

        <FormField label="Year or Status" id="eduYear" optional>
          <input 
            id="eduYear"
            type="text" 
            :value="background.education?.year || ''"
            @input="portfolioStore.updateEducation(undefined, undefined, ($event.target as HTMLInputElement).value)"
            placeholder="e.g. 2022 - 2026 (Expected)" 
            class="input-base"
          />
        </FormField>
      </div>
    </div>

    <!-- 4. Work Experience / Internships (Optional) -->
    <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Briefcase class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 class="text-sm font-semibold text-slate-900 dark:text-white">
            Experience & Internships
          </h3>
          <span class="text-xs text-slate-400 font-normal">(Optional)</span>
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

      <div v-if="!background.experience || background.experience.length === 0" class="p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/30 text-center">
        <p class="text-xs text-slate-500 dark:text-slate-400">
          No formal work experience? No problem! Students and beginners can skip this section entirely.
        </p>
      </div>

      <div v-else class="space-y-4">
        <div 
          v-for="(exp, idx) in background.experience" 
          :key="exp.id"
          class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 relative group"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Experience #{{ idx + 1 }}
            </span>
            <button 
              type="button"
              @click="portfolioStore.removeExperience(exp.id)"
              class="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors"
              title="Remove this experience"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
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
              <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
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
              <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
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
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Key Contributions & Responsibilities
            </label>
            <textarea 
              rows="2" 
              v-model="exp.summary"
              placeholder="e.g. Built interactive dashboard components using Vue.js and helped improve mobile responsiveness across 3 internal portals." 
              class="input-base text-xs"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Certifications & Achievements (Optional) -->
    <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
      <div class="flex items-center gap-2">
        <Award class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        <h3 class="text-sm font-semibold text-slate-900 dark:text-white">
          Certifications & Awards
        </h3>
        <span class="text-xs text-slate-400 font-normal">(Optional)</span>
      </div>

      <div class="flex gap-2">
        <input 
          type="text" 
          v-model="newCertInput"
          @keydown.enter.prevent="handleAddCert"
          placeholder="e.g. AWS Certified Cloud Practitioner or Hackathon 1st Place" 
          class="input-base"
        />
        <button 
          type="button" 
          @click="handleAddCert"
          :disabled="!newCertInput.trim()"
          class="btn-secondary shrink-0 px-4"
        >
          <Plus class="w-4 h-4 mr-1" />
          Add
        </button>
      </div>

      <div v-if="background.certifications && background.certifications.length > 0" class="flex flex-wrap gap-2">
        <span 
          v-for="cert in background.certifications" 
          :key="cert"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800"
        >
          <Award class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
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
