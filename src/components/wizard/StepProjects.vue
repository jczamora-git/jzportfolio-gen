<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import FormField from '@/components/common/FormField.vue'
import { 
  FolderGit2, 
  Plus, 
  Trash2, 
  Github, 
  ExternalLink, 
  X,
  Code
} from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
const projects = computed(() => portfolioStore.draft.projects)

const techInputState = ref<Record<string, string>>({})
const featureInputState = ref<Record<string, string>>({})

function addTechToProject(projectId: string) {
  const current = techInputState.value[projectId]?.trim()
  if (!current) return
  const proj = projects.value.find(p => p.id === projectId)
  if (proj) {
    if (!proj.technologies.includes(current)) {
      proj.technologies.push(current)
      portfolioStore.updateProject(projectId, { technologies: proj.technologies })
    }
  }
  techInputState.value[projectId] = ''
}

function removeTechFromProject(projectId: string, tech: string) {
  const proj = projects.value.find(p => p.id === projectId)
  if (proj) {
    const updated = proj.technologies.filter(t => t !== tech)
    portfolioStore.updateProject(projectId, { technologies: updated })
  }
}

function addFeatureToProject(projectId: string) {
  const current = featureInputState.value[projectId]?.trim()
  if (!current) return
  const proj = projects.value.find(p => p.id === projectId)
  if (proj) {
    if (!proj.keyFeatures) proj.keyFeatures = []
    proj.keyFeatures.push(current)
    portfolioStore.updateProject(projectId, { keyFeatures: proj.keyFeatures })
  }
  featureInputState.value[projectId] = ''
}

function removeFeatureFromProject(projectId: string, index: number) {
  const proj = projects.value.find(p => p.id === projectId)
  if (proj && proj.keyFeatures) {
    proj.keyFeatures.splice(index, 1)
    portfolioStore.updateProject(projectId, { keyFeatures: proj.keyFeatures })
  }
}

const urlError = (url?: string) => {
  if (!url || url.trim() === '') return ''
  try {
    const u = new URL(url)
    return (u.protocol === 'http:' || u.protocol === 'https:') ? '' : 'URL must start with https://'
  } catch {
    return 'Please enter a valid URL'
  }
}
</script>

<template>
  <div class="space-y-6 animate-fadeIn">
    <!-- Step Header -->
    <div class="border-b border-[#E8E8EF] dark:border-[#232738] pb-4">
      <div class="text-[11px] font-bold text-[#6D4AFF] uppercase tracking-wider mb-1">
        Step 3 of 5
      </div>
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-[#181824] dark:text-[#F3F4F8] tracking-tight">
            Featured Projects & Work
          </h2>
          <p class="text-xs sm:text-sm text-[#737385] dark:text-[#9496A8] mt-1">
            Showcase your builds, coursework, hackathon entries, or personal experiments.
          </p>
        </div>
        
        <button 
          type="button" 
          @click="portfolioStore.addProject"
          class="btn-primary text-xs py-2 px-3.5 shrink-0 self-start sm:self-auto"
        >
          <Plus class="w-3.5 h-3.5 mr-1" />
          Add Project
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div 
      v-if="projects.length === 0" 
      class="p-8 rounded-2xl text-center space-y-3 border border-dashed border-[#E8E8EF] dark:border-[#232738] bg-[#FAFAFC] dark:bg-[#0B0D17]/30"
    >
      <div class="w-10 h-10 rounded-xl bg-[#F2EEFF] dark:bg-brand-950/60 text-[#6D4AFF] flex items-center justify-center mx-auto">
        <FolderGit2 class="w-5 h-5" />
      </div>
      <div class="max-w-sm mx-auto space-y-1">
        <h3 class="text-sm font-bold text-[#181824] dark:text-[#F3F4F8]">
          No projects added yet
        </h3>
        <p class="text-xs text-[#737385] dark:text-[#9496A8] leading-relaxed">
          Coursework, hackathon hacks, practice apps, and open-source experiments are all great to include.
        </p>
      </div>
      <div>
        <button 
          type="button" 
          @click="portfolioStore.addProject"
          class="btn-secondary text-xs"
        >
          <Plus class="w-3.5 h-3.5 mr-1 text-[#6D4AFF]" />
          Add First Project
        </button>
      </div>
    </div>

    <!-- Projects List -->
    <div v-else class="space-y-5">
      <div 
        v-for="(project, index) in projects" 
        :key="project.id"
        class="card-surface p-5 sm:p-6 space-y-4 relative"
      >
        <!-- Card Top Bar -->
        <div class="flex items-center justify-between border-b border-[#E8E8EF] dark:border-[#232738] pb-3">
          <div class="flex items-center gap-2">
            <span class="w-5 h-5 rounded-md bg-[#F2EEFF] dark:bg-[#1A2033] text-[#6D4AFF] text-xs font-bold flex items-center justify-center">
              {{ index + 1 }}
            </span>
            <span class="font-bold text-xs sm:text-sm text-[#181824] dark:text-[#F3F4F8]">
              {{ project.name || `Project #${index + 1}` }}
            </span>
          </div>

          <button 
            type="button" 
            @click="portfolioStore.removeProject(project.id)"
            class="text-[#737385] hover:text-rose-500 p-1 rounded transition-colors"
            title="Delete this project"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>

        <!-- Project Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Project Name -->
          <FormField 
            label="Project Name" 
            :id="`proj-name-${project.id}`" 
            required
            :error="!project.name.trim() ? 'Project name is required' : ''"
          >
            <input 
              :id="`proj-name-${project.id}`"
              type="text" 
              v-model="project.name"
              placeholder="e.g. EcoTracker Dashboard" 
              class="input-base text-xs sm:text-sm"
              required
            />
          </FormField>

          <!-- Short Description -->
          <FormField 
            label="One-Line Description" 
            :id="`proj-desc-${project.id}`" 
            required
            :error="!project.description.trim() ? 'Short description is required' : ''"
          >
            <input 
              :id="`proj-desc-${project.id}`"
              type="text" 
              v-model="project.description"
              placeholder="e.g. A responsive analytics web app visualizing solar usage" 
              class="input-base text-xs sm:text-sm"
              required
            />
          </FormField>

          <!-- Technologies Used (Tags) -->
          <div class="md:col-span-2 space-y-2">
            <label class="block text-xs sm:text-sm font-semibold text-[#181824] dark:text-[#F3F4F8]">
              Technologies Used
            </label>
            <div class="flex gap-2">
              <input 
                type="text" 
                v-model="techInputState[project.id]"
                @keydown.enter.prevent="addTechToProject(project.id)"
                placeholder="e.g. Vue 3, TypeScript, Tailwind (press Enter to add)" 
                class="input-base text-xs"
              />
              <button 
                type="button" 
                @click="addTechToProject(project.id)"
                class="btn-secondary text-xs px-3 shrink-0"
              >
                Add Tech
              </button>
            </div>
            <!-- Tech chips -->
            <div v-if="project.technologies && project.technologies.length > 0" class="flex flex-wrap gap-1.5 pt-0.5">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-[#FAFAFC] dark:bg-[#1A2033] text-[#181824] dark:text-[#F3F4F8] border border-[#E8E8EF] dark:border-[#232738]"
              >
                <Code class="w-3 h-3 text-[#6D4AFF]" />
                {{ tech }}
                <button 
                  type="button" 
                  @click="removeTechFromProject(project.id, tech)"
                  class="hover:text-rose-500 p-0.5 rounded transition-colors"
                >
                  <X class="w-3 h-3" />
                </button>
              </span>
            </div>
          </div>

          <!-- Problem / Goal -->
          <FormField label="Problem or Goal" :id="`proj-goal-${project.id}`" optional>
            <textarea 
              :id="`proj-goal-${project.id}`"
              rows="2" 
              v-model="project.goal"
              placeholder="e.g. Help homeowners visualize power consumption during peak cost periods." 
              class="input-base text-xs resize-y"
            ></textarea>
          </FormField>

          <!-- Personal Contribution -->
          <FormField label="Your Role & Contribution" :id="`proj-contrib-${project.id}`" optional>
            <textarea 
              :id="`proj-contrib-${project.id}`"
              rows="2" 
              v-model="project.contribution"
              placeholder="e.g. Developed responsive UI components and optimized page load speed." 
              class="input-base text-xs resize-y"
            ></textarea>
          </FormField>

          <!-- Key Features Bullet List -->
          <div class="md:col-span-2 space-y-2">
            <label class="block text-xs sm:text-sm font-semibold text-[#181824] dark:text-[#F3F4F8]">
              Key Features
              <span class="text-[11px] text-[#737385] dark:text-[#9496A8] font-normal ml-1">(Optional)</span>
            </label>
            <div class="flex gap-2">
              <input 
                type="text" 
                v-model="featureInputState[project.id]"
                @keydown.enter.prevent="addFeatureToProject(project.id)"
                placeholder="e.g. Real-time data sync, Dark mode, CSV export" 
                class="input-base text-xs"
              />
              <button 
                type="button" 
                @click="addFeatureToProject(project.id)"
                class="btn-secondary text-xs px-3 shrink-0"
              >
                Add Feature
              </button>
            </div>
            <ul v-if="project.keyFeatures && project.keyFeatures.length > 0" class="space-y-1 pt-1">
              <li 
                v-for="(feature, fIndex) in project.keyFeatures" 
                :key="fIndex"
                class="flex items-center justify-between text-xs p-2 rounded-lg bg-[#FAFAFC] dark:bg-[#1A2033] border border-[#E8E8EF] dark:border-[#232738]"
              >
                <span class="flex items-center gap-2 text-[#181824] dark:text-[#F3F4F8]">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#6D4AFF]"></span>
                  {{ feature }}
                </span>
                <button 
                  type="button" 
                  @click="removeFeatureFromProject(project.id, fIndex)"
                  class="text-slate-400 hover:text-rose-500 p-0.5 rounded transition-colors"
                >
                  <X class="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          <!-- Outcome / Learning -->
          <div class="md:col-span-2">
            <FormField label="Outcome or What You Learned" :id="`proj-outcome-${project.id}`" optional>
              <input 
                :id="`proj-outcome-${project.id}`"
                type="text" 
                v-model="project.outcome"
                placeholder="e.g. Mastered asynchronous data caching and improved component reusability." 
                class="input-base text-xs"
              />
            </FormField>
          </div>

          <!-- GitHub Repo URL -->
          <FormField 
            label="GitHub Repository URL" 
            :id="`proj-repo-${project.id}`" 
            optional 
            :error="urlError(project.repositoryUrl)"
          >
            <div class="relative">
              <input 
                :id="`proj-repo-${project.id}`"
                type="url" 
                v-model="project.repositoryUrl"
                placeholder="https://github.com/username/project" 
                class="input-base pl-9 text-xs"
              />
              <Github class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </FormField>

          <!-- Live Demo URL -->
          <FormField 
            label="Live Demo URL" 
            :id="`proj-live-${project.id}`" 
            optional 
            :error="urlError(project.liveUrl)"
          >
            <div class="relative">
              <input 
                :id="`proj-live-${project.id}`"
                type="url" 
                v-model="project.liveUrl"
                placeholder="https://my-demo-app.vercel.app" 
                class="input-base pl-9 text-xs"
              />
              <ExternalLink class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </FormField>
        </div>
      </div>
    </div>
  </div>
</template>
