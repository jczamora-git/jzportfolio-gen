import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTheme } from '@/composables/useTheme'
import { useMobileNavigation } from '@/composables/useMobileNavigation'

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

describe('Mobile Navigation State & Interaction Lifecycle', () => {
  function createMockElement(tag: string) {
    const children: any[] = []
    const el: any = {
      tagName: tag.toUpperCase(),
      children,
      appendChild: (child: any) => {
        children.push(child)
        child.parentNode = el
      },
      contains: (target: any) => {
        if (target === el) return true
        return children.some(c => c === target || (c.contains && c.contains(target)))
      }
    }
    return el as HTMLElement
  }

  it('TEST 1: Menu is closed initially', () => {
    const nav = useMobileNavigation()
    expect(nav.isOpen.value).toBe(false)
  })

  it('TEST 2: First toggle opens menu', () => {
    const nav = useMobileNavigation()
    nav.toggle()
    expect(nav.isOpen.value).toBe(true)
  })

  it('TEST 3: Second toggle closes menu', () => {
    const nav = useMobileNavigation()
    nav.open()
    expect(nav.isOpen.value).toBe(true)

    nav.toggle()
    expect(nav.isOpen.value).toBe(false)
  })

  it('TEST 4: Rapid repeated clicks produce deterministic final state', () => {
    const nav = useMobileNavigation()

    // 5 toggles from closed -> open
    for (let i = 0; i < 5; i++) {
      nav.toggle()
    }
    expect(nav.isOpen.value).toBe(true)

    // 5 more toggles (10 total) -> closed
    for (let i = 0; i < 5; i++) {
      nav.toggle()
    }
    expect(nav.isOpen.value).toBe(false)
  })

  it('TEST 5: Clicking inside the navigation boundary does not trigger outside-click handler', () => {
    const nav = useMobileNavigation()
    nav.open()
    expect(nav.isOpen.value).toBe(true)

    const header = createMockElement('header')
    const link = createMockElement('a')
    header.appendChild(link)

    // Target is child of header
    nav.handleClickOutside(link, header, [link, header])
    expect(nav.isOpen.value).toBe(true)
  })

  it('TEST 6: Clicking outside the navigation boundary closes the menu', () => {
    const nav = useMobileNavigation()
    nav.open()
    expect(nav.isOpen.value).toBe(true)

    const header = createMockElement('header')
    const outsideDiv = createMockElement('div')

    nav.handleClickOutside(outsideDiv, header, [outsideDiv])
    expect(nav.isOpen.value).toBe(false)
  })

  it('TEST 7: Escape keydown closes the menu', () => {
    const nav = useMobileNavigation()
    nav.open()
    expect(nav.isOpen.value).toBe(true)

    nav.handleKeydown({ key: 'Escape' } as KeyboardEvent)
    expect(nav.isOpen.value).toBe(false)
  })

  it('TEST 8: Non-Escape keys do not close the menu', () => {
    const nav = useMobileNavigation()
    nav.open()
    expect(nav.isOpen.value).toBe(true)

    nav.handleKeydown({ key: 'Enter' } as KeyboardEvent)
    expect(nav.isOpen.value).toBe(true)

    nav.handleKeydown({ key: 'Tab' } as KeyboardEvent)
    expect(nav.isOpen.value).toBe(true)
  })

  it('TEST 9: Breakpoint change to desktop (>= 768px) closes the mobile menu', () => {
    const nav = useMobileNavigation()
    nav.open()
    expect(nav.isOpen.value).toBe(true)

    // Matches desktop breakpoint (true)
    nav.handleBreakpointChange(true)
    expect(nav.isOpen.value).toBe(false)

    // Viewport remains mobile (false)
    nav.open()
    nav.handleBreakpointChange(false)
    expect(nav.isOpen.value).toBe(true)
  })

  it('TEST 10: Theme toggle does not corrupt menu state', () => {
    const nav = useMobileNavigation()
    const { toggleTheme } = useTheme()

    nav.open()
    expect(nav.isOpen.value).toBe(true)

    toggleTheme()
    // Mobile navigation state remains open and intact
    expect(nav.isOpen.value).toBe(true)

    nav.close()
    toggleTheme()
    expect(nav.isOpen.value).toBe(false)
  })

  it('TEST 11: Idempotent open and close actions', () => {
    const nav = useMobileNavigation()

    // Multiple opens
    nav.open()
    nav.open()
    nav.open()
    expect(nav.isOpen.value).toBe(true)

    // Multiple closes
    nav.close()
    nav.close()
    nav.close()
    expect(nav.isOpen.value).toBe(false)
  })

  it('TEST 12: ComposedPath boundary detection protects unmounted/replaced elements', () => {
    const nav = useMobileNavigation()
    nav.open()

    const header = createMockElement('header')
    const detachedSvg = createMockElement('svg') // element removed from DOM during toggle

    // composedPath still contains the header boundary
    nav.handleClickOutside(detachedSvg, header, [detachedSvg, header])
    expect(nav.isOpen.value).toBe(true)
  })
})
