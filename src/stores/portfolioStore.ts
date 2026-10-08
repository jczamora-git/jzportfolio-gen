import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { 
  PortfolioDraft, 
  UserProfile, 
  BackgroundInfo, 
  PortfolioProject, 
  DesignPreferences,
  ParticipantStatus
} from '@/types/portfolio'
import { 
  loadDraftFromStorage, 
  saveDraftToStorage, 
  clearDraftFromStorage 
} from '@/lib/storage/draftStorage'
import { INITIAL_EMPTY_DRAFT, SAMPLE_PORTFOLIO_DRAFT } from '@/data/sampleProfile'
import { generatePortfolioPrompt } from '@/lib/prompt/generatePortfolioPrompt'

export const usePortfolioStore = defineStore('portfolio', () => {
  const draft = ref<PortfolioDraft>(JSON.parse(JSON.stringify(INITIAL_EMPTY_DRAFT)))
  const currentStep = ref<number>(1)
  const isHydrated = ref<boolean>(false)
  const isUsingSampleData = ref<boolean>(false)
  const lastSavedAt = ref<string | null>(null)
  const saveIndicator = ref<'saved' | 'saving' | 'idle'>('idle')

  // Auto-save debouncer
  let saveTimeout: ReturnType<typeof setTimeout> | null = null

  function triggerAutoSave() {
    if (!isHydrated.value) return
    saveIndicator.value = 'saving'
    if (saveTimeout) clearTimeout(saveTimeout)
    saveTimeout = setTimeout(() => {
      draft.value.updatedAt = new Date().toISOString()
      const success = saveDraftToStorage(draft.value)
      if (success) {
        lastSavedAt.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        saveIndicator.value = 'saved'
      } else {
        saveIndicator.value = 'idle'
      }
    }, 400)
  }

  // Hydrate draft from storage on mount
  function initStore() {
    if (isHydrated.value) return
    const result = loadDraftFromStorage()
    draft.value = result.data
    isHydrated.value = true
    if (result.isFromStorage) {
      lastSavedAt.value = new Date(draft.value.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      saveIndicator.value = 'saved'
    }
  }

  // Step 1: Profile actions
  function updateProfile(payload: Partial<UserProfile>) {
    draft.value.profile = { ...draft.value.profile, ...payload }
    triggerAutoSave()
  }

  // Step 2: Background actions
  function updateStatus(status: ParticipantStatus) {
    draft.value.background.status = status
    triggerAutoSave()
  }

  function addSkill(skill: string) {
    const trimmed = skill.trim()
    if (!trimmed) return
    if (!draft.value.background.skills.includes(trimmed)) {
      draft.value.background.skills.push(trimmed)
      triggerAutoSave()
    }
  }

  function removeSkill(skill: string) {
    draft.value.background.skills = draft.value.background.skills.filter(s => s !== skill)
    triggerAutoSave()
  }

  function updateEducation(school?: string, program?: string, year?: string) {
    draft.value.background.education = {
      school: school ?? draft.value.background.education?.school ?? '',
      program: program ?? draft.value.background.education?.program ?? '',
      year: year ?? draft.value.background.education?.year ?? '',
    }
    triggerAutoSave()
  }

  function addExperience() {
    if (!draft.value.background.experience) {
      draft.value.background.experience = []
    }
    draft.value.background.experience.push({
      id: `exp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      role: '',
      organization: '',
      duration: '',
      summary: '',
    })
    triggerAutoSave()
  }

  function updateExperience(id: string, updates: Partial<{ role: string; organization: string; duration: string; summary: string }>) {
    if (!draft.value.background.experience) return
    const item = draft.value.background.experience.find(e => e.id === id)
    if (item) {
      Object.assign(item, updates)
      triggerAutoSave()
    }
  }

  function removeExperience(id: string) {
    if (!draft.value.background.experience) return
    draft.value.background.experience = draft.value.background.experience.filter(e => e.id !== id)
    triggerAutoSave()
  }

  function addCertification(name: string) {
    const trimmed = name.trim()
    if (!trimmed) return
    if (!draft.value.background.certifications) {
      draft.value.background.certifications = []
    }
    if (!draft.value.background.certifications.includes(trimmed)) {
      draft.value.background.certifications.push(trimmed)
      triggerAutoSave()
    }
  }

  function removeCertification(name: string) {
    if (!draft.value.background.certifications) return
    draft.value.background.certifications = draft.value.background.certifications.filter(c => c !== name)
    triggerAutoSave()
  }

  // Step 3: Projects actions
  function addProject() {
    const newProj: PortfolioProject = {
      id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: '',
      description: '',
      goal: '',
      contribution: '',
      technologies: [],
      keyFeatures: [],
      outcome: '',
      repositoryUrl: '',
      liveUrl: '',
    }
    draft.value.projects.push(newProj)
    triggerAutoSave()
    return newProj.id
  }

  function updateProject(id: string, updates: Partial<PortfolioProject>) {
    const proj = draft.value.projects.find(p => p.id === id)
    if (proj) {
      Object.assign(proj, updates)
      triggerAutoSave()
    }
  }

  function removeProject(id: string) {
    draft.value.projects = draft.value.projects.filter(p => p.id !== id)
    triggerAutoSave()
  }

  // Step 4: Design Preferences
  function updatePreferences(updates: Partial<DesignPreferences>) {
    draft.value.preferences = { ...draft.value.preferences, ...updates }
    triggerAutoSave()
  }

  // Reset & Sample
  function loadSample() {
    draft.value = JSON.parse(JSON.stringify(SAMPLE_PORTFOLIO_DRAFT))
    isUsingSampleData.value = true
    triggerAutoSave()
  }

  function resetToBlank() {
    draft.value = JSON.parse(JSON.stringify(INITIAL_EMPTY_DRAFT))
    isUsingSampleData.value = false
    clearDraftFromStorage()
    lastSavedAt.value = null
    saveIndicator.value = 'idle'
    currentStep.value = 1
  }

  // Validation Statuses
  const isProfileValid = computed(() => {
    return (
      draft.value.profile.fullName.trim().length >= 2 &&
      draft.value.profile.headline.trim().length >= 2
    )
  })

  const isSkillsValid = computed(() => {
    return draft.value.background.skills.length > 0
  })

  const isProjectsValid = computed(() => {
    // Projects are optional, but if present, each must have a name & description
    if (draft.value.projects.length === 0) return true
    return draft.value.projects.every(p => p.name.trim().length > 0 && p.description.trim().length > 0)
  })

  const isWizardReadyForGeneration = computed(() => {
    return isProfileValid.value && isSkillsValid.value && isProjectsValid.value
  })

  const promptText = computed(() => {
    return generatePortfolioPrompt(draft.value)
  })

  return {
    draft,
    currentStep,
    isHydrated,
    isUsingSampleData,
    lastSavedAt,
    saveIndicator,
    initStore,
    updateProfile,
    updateStatus,
    addSkill,
    removeSkill,
    updateEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addCertification,
    removeCertification,
    addProject,
    updateProject,
    removeProject,
    updatePreferences,
    loadSample,
    resetToBlank,
    isProfileValid,
    isSkillsValid,
    isProjectsValid,
    isWizardReadyForGeneration,
    promptText,
  }
})
