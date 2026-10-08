import { describe, it, expect, beforeEach, vi } from 'vitest'
import { 
  loadDraftFromStorage, 
  saveDraftToStorage, 
  clearDraftFromStorage, 
  STORAGE_KEY 
} from '@/lib/storage/draftStorage'
import { SAMPLE_PORTFOLIO_DRAFT } from '@/data/sampleProfile'

describe('Draft Storage Manager', () => {
  // Mock localStorage for Node/Vitest environment
  let storageMap: Record<string, string> = {}

  beforeEach(() => {
    storageMap = {}
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (key: string) => storageMap[key] || null,
        setItem: (key: string, val: string) => { storageMap[key] = val },
        removeItem: (key: string) => { delete storageMap[key] },
        clear: () => { storageMap = {} },
      }
    })
  })

  it('saves draft to storage and loads it back safely', () => {
    const saveSuccess = saveDraftToStorage(SAMPLE_PORTFOLIO_DRAFT)
    expect(saveSuccess).toBe(true)
    expect(storageMap[STORAGE_KEY]).toBeDefined()

    const loadResult = loadDraftFromStorage()
    expect(loadResult.isFromStorage).toBe(true)
    expect(loadResult.data.profile.fullName).toBe(SAMPLE_PORTFOLIO_DRAFT.profile.fullName)
  })

  it('resets gracefully to initial empty draft when stored JSON is corrupt or invalid', () => {
    storageMap[STORAGE_KEY] = '{"invalidJson": true, "corrupted": [1,2'

    const loadResult = loadDraftFromStorage()
    expect(loadResult.isFromStorage).toBe(false)
    expect(loadResult.data.profile.fullName).toBe('')
  })

  it('clears draft from storage correctly', () => {
    saveDraftToStorage(SAMPLE_PORTFOLIO_DRAFT)
    expect(storageMap[STORAGE_KEY]).toBeDefined()

    const clearSuccess = clearDraftFromStorage()
    expect(clearSuccess).toBe(true)
    expect(storageMap[STORAGE_KEY]).toBeUndefined()
  })
})
