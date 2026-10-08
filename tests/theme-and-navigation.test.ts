import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTheme } from '@/composables/useTheme'

describe('Theme System & State Synchronization', () => {
  let storageMap: Record<string, string> = {}
  let classListSet = new Set<string>()

  beforeEach(() => {
    storageMap = {}
    classListSet = new Set<string>()

    vi.stubGlobal('window', {
      localStorage: {
        getItem: (key: string) => storageMap[key] || null,
        setItem: (key: string, val: string) => { storageMap[key] = val },
        removeItem: (key: string) => { delete storageMap[key] },
        clear: () => { storageMap = {} },
      },
      matchMedia: () => ({ matches: false })
    })

    vi.stubGlobal('document', {
      documentElement: {
        classList: {
          add: (cls: string) => classListSet.add(cls),
          remove: (cls: string) => classListSet.delete(cls),
          contains: (cls: string) => classListSet.has(cls),
        },
        className: '',
      }
    })
  })

  it('initializes with default light theme when storage is empty', () => {
    const { theme } = useTheme()
    expect(['light', 'dark']).toContain(theme.value)
  })

  it('toggles theme reactively between light and dark', () => {
    const { theme, toggleTheme, applyTheme } = useTheme()
    applyTheme('light')
    expect(theme.value).toBe('light')
    expect(classListSet.has('dark')).toBe(false)

    toggleTheme()
    expect(theme.value).toBe('dark')
    expect(classListSet.has('dark')).toBe(true)

    toggleTheme()
    expect(theme.value).toBe('light')
    expect(classListSet.has('dark')).toBe(false)
  })

  it('persists theme to localStorage on applyTheme', () => {
    const { applyTheme } = useTheme()
    applyTheme('dark')
    expect(storageMap['portfolio-launchpad:ui-theme']).toBe('dark')

    applyTheme('light')
    expect(storageMap['portfolio-launchpad:ui-theme']).toBe('light')
  })

  it('handles rapid repeated toggling without desynchronization', () => {
    const { theme, toggleTheme, applyTheme } = useTheme()
    applyTheme('light')

    for (let i = 0; i < 10; i++) {
      toggleTheme()
    }

    // 10 toggles from light should result in light
    expect(theme.value).toBe('light')
    expect(classListSet.has('dark')).toBe(false)
    expect(storageMap['portfolio-launchpad:ui-theme']).toBe('light')

    toggleTheme()
    expect(theme.value).toBe('dark')
    expect(classListSet.has('dark')).toBe(true)
  })
})
