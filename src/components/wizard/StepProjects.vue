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

// State for active tag input within project cards
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
  <div class="space-y-8 animate-fadeIn">
    <!-- Section Header -->
    <div class="border-b border-slate-200/80 dark:border-slate-800 pb-5">
      <div class="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
        <FolderGit2 class="w-4 h-4" />
        Step 3 of 5
      </div>
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Featured Projects & Portfolio Work
          </h2>
          <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Showcase your best builds, academic assignments, hackathon projects, or personal experiments.
          </p>
        </div>
        
        <button 
          type="button" 
          @click="portfolioStore.addProject"
          class="btn-primary shrink-0 self-start sm:self-auto"
        >
          <Plus class="w-4 h-4 mr-1.5" />
          Add Project
        </button>
      </div>
    </div>

    <!-- Empty State Guidance -->
    <div 
      v-if="projects.length === 0" 
      class="card-surface p-8 text-center space-y-4 border-dashed border-2 border-slate-300 dark:border-slate-800"
    >
      <div class="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-sm">
        <FolderGit2 class="w-6 h-6" />
      </div>
      <div class="max-w-md mx-auto space-y-1.5">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">
          No projects added yet
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          School projects, capstone assignments, practice apps, and open-source experiments are all great to include!
        </p>
        <p class="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
          If you don't have projects yet, you can continue anyway — the AI prompt will generate a "Learning Journey & Tech Stack" section instead of fabricating fake repositories.
        </p>
      </div>
      <div>
        <button 
          type="button" 
          @click="portfolioStore.addProject"
          class="btn-primary text-xs"
        >
          <Plus class="w-4 h-4 mr-1.5" />
          Add My First Project
        </button>
      </div>
    </div>

    <!-- Project List -->
    <div v-else class="space-y-6">
      <div 
        v-for="(project, index) in projects" 
        :key="project.id"
        class="card-surface p-5 sm:p-6 space-y-5 relative group"
      >
        <!-- Card Header -->
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center">
              {{ index + 1 }}
            </span>
            <span class="font-bold text-sm text-slate-900 dark:text-white">
              {{ project.name || `Untitled Project #${index + 1}` }}
            </span>
          </div>

          <button 
            type="button" 
            @click="portfolioStore.removeProject(project.id)"
            class="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
            title="Delete this project"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>

        <!-- Project Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Project Name (Required for added project) -->
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
              class="input-base"
              required
            />
          </FormField>

          <!-- Short Description (Required for added project) -->
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
              placeholder="e.g. A responsive analytics web app visualizing solar energy usage" 
              class="input-base"
              required
            />
          </FormField>

          <!-- Technologies Used (Tags) -->
          <div class="md:col-span-2 space-y-2">
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Technologies & Tools Used
            </label>
            <div class="flex gap-2">
              <input 
                type="text" 
                v-model="techInputState[project.id]"
                @keydown.enter.prevent="addTechToProject(project.id)"
                placeholder="e.g. React, TypeScript, Tailwind, Chart.js (press Enter to add)" 
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
            <div v-if="project.technologies && project.technologies.length > 0" class="flex flex-wrap gap-1.5 pt-1">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                <Code class="w-3 h-3 text-indigo-500" />
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

          <!-- Problem / Goal (Optional) -->
          <FormField label="Problem or Goal" :id="`proj-goal-${project.id}`" optional help="What problem does this project address?">
            <textarea 
              :id="`proj-goal-${project.id}`"
              rows="2" 
              v-model="project.goal"
              placeholder="e.g. Help homeowners visualize their power consumption to identify peak energy cost periods." 
              class="input-base text-xs resize-y"
            ></textarea>
          </FormField>

          <!-- Personal Contribution (Optional) -->
          <FormField label="Your Role & Contribution" :id="`proj-contrib-${project.id}`" optional help="What parts of this project did you personally build?">
            <textarea 
              :id="`proj-contrib-${project.id}`"
              rows="2" 
              v-model="project.contribution"
              placeholder="e.g. Developed responsive UI components, integrated open weather API, and optimized page load speed." 
              class="input-base text-xs resize-y"
            ></textarea>
          </FormField>

          <!-- Key Features Bullet List (Optional) -->
          <div class="md:col-span-2 space-y-2">
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Key Features
              <span class="text-xs text-slate-400 font-normal ml-1">(Optional)</span>
            </label>
            <div class="flex gap-2">
              <input 
                type="text" 
                v-model="featureInputState[project.id]"
                @keydown.enter.prevent="addFeatureToProject(project.id)"
                placeholder="e.g. Real-time data sync, Dark mode support, CSV export" 
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
            <ul v-if="project.keyFeatures && project.keyFeatures.length > 0" class="space-y-1.5 pt-1">
              <li 
                v-for="(feature, fIndex) in project.keyFeatures" 
                :key="fIndex"
                class="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
              >
                <span class="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
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

          <!-- Outcome / Learning (Optional) -->
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
