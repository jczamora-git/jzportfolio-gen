export const EASING = {
  power2Out: 'power2.out',
  power3Out: 'power3.out',
  expoOut: 'expo.out',
  smooth: 'cubic-bezier(0.16, 1, 0.3, 1)'
}

export const DURATION = {
  fast: 0.4,
  normal: 0.65,
  slow: 0.85,
  hero: 0.95
}

export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth < 768
}
