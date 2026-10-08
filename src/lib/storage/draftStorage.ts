import type { PortfolioDraft } from '@/types/portfolio'
import { PortfolioDraftSchema } from '@/lib/validation/portfolioSchema'
import { INITIAL_EMPTY_DRAFT } from '@/data/sampleProfile'

export const STORAGE_KEY = 'portfolio-launchpad:draft:v1'

export interface StorageLoadResult {
  data: PortfolioDraft
  isFromStorage: boolean
  error?: string
}

export function loadDraftFromStorage(): StorageLoadResult {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { data: JSON.parse(JSON.stringify(INITIAL_EMPTY_DRAFT)), isFromStorage: false }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { data: JSON.parse(JSON.stringify(INITIAL_EMPTY_DRAFT)), isFromStorage: false }
    }

    const parsed = JSON.parse(raw)
    const validationResult = PortfolioDraftSchema.safeParse(parsed)

    if (validationResult.success) {
      return {
        data: validationResult.data as PortfolioDraft,
        isFromStorage: true,
      }
    } else {
      console.warn('Storage draft failed schema validation, resetting to clean state:', validationResult.error)
      return {
        data: JSON.parse(JSON.stringify(INITIAL_EMPTY_DRAFT)),
        isFromStorage: false,
        error: 'Saved draft had an outdated or incompatible format and was reset.',
      }
    }
  } catch (err) {
    console.error('Failed to parse draft from localStorage:', err)
    return {
      data: JSON.parse(JSON.stringify(INITIAL_EMPTY_DRAFT)),
      isFromStorage: false,
      error: 'Failed to read draft from browser storage.',
    }
  }
}

export function saveDraftToStorage(draft: PortfolioDraft): boolean {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false
  }

  try {
    const payload = {
      ...draft,
      updatedAt: new Date().toISOString(),
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    return true
  } catch (err) {
    console.error('Failed to save draft to localStorage:', err)
    return false
  }
}

export function clearDraftFromStorage(): boolean {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (err) {
    console.error('Failed to clear draft from localStorage:', err)
    return false
  }
}
