import { describe, it, expect, beforeEach, vi } from 'vitest'
import { EASING, DURATION, isReducedMotion, isTouchDevice } from '@/lib/motion/motionPresets'

describe('Motion System & Presets', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('exports valid easing and duration tokens', () => {
    expect(EASING.power2Out).toBe('power2.out')
    expect(EASING.power3Out).toBe('power3.out')
    expect(EASING.smooth).toBeDefined()
    expect(DURATION.fast).toBe(0.4)
    expect(DURATION.normal).toBe(0.65)
  })

  it('detects reduced motion accessibility preference', () => {
    vi.stubGlobal('window', {
      matchMedia: (query: string) => ({
        matches: query.includes('prefers-reduced-motion: reduce')
      })
    })

    expect(isReducedMotion()).toBe(true)

    vi.stubGlobal('window', {
      matchMedia: () => ({ matches: false })
    })

    expect(isReducedMotion()).toBe(false)
  })

  it('detects touch devices and narrow mobile viewports', () => {
    vi.stubGlobal('window', {
      innerWidth: 375,
      matchMedia: () => ({ matches: false })
    })
    expect(isTouchDevice()).toBe(true)

    vi.stubGlobal('window', {
      innerWidth: 1200,
      matchMedia: (query: string) => ({
        matches: query.includes('hover: none')
      })
    })
    expect(isTouchDevice()).toBe(true)

    vi.stubGlobal('window', {
      innerWidth: 1440,
      matchMedia: () => ({ matches: false })
    })
    expect(isTouchDevice()).toBe(false)
  })
})
