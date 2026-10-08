import { onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isReducedMotion } from '@/lib/motion/motionPresets'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  let ctx: gsap.Context | null = null

  /**
   * Initializes scoped GSAP animations inside a component context
   */
  function createAnimationContext(scope: HTMLElement | string, callback: (context: gsap.Context) => void): gsap.Context | null {
    if (typeof window === 'undefined') return null

    // If reduced motion is preferred, execute callback in safe mode or skip animations
    if (isReducedMotion()) {
      return null
    }

    ctx = gsap.context(callback, scope)
    return ctx
  }

  function refreshScrollTrigger() {
    if (typeof window !== 'undefined') {
      ScrollTrigger.refresh()
    }
  }

  function cleanup() {
    if (ctx) {
      ctx.revert()
      ctx = null
    }
  }

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    createAnimationContext,
    refreshScrollTrigger,
    cleanup,
    gsap,
    ScrollTrigger
  }
}
