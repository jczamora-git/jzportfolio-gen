import { ref, onMounted, onBeforeUnmount } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isReducedMotion, isTouchDevice } from '@/lib/motion/motionPresets'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  const lenisInstance = ref<Lenis | null>(null)
  let tickerCallback: ((time: number) => void) | null = null

  function init() {
    // Respect reduced motion preference and prefer native scrolling on touch/mobile
    if (typeof window === 'undefined' || isReducedMotion() || isTouchDevice()) {
      return
    }

    try {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1.5,
        infinite: false
      })

      lenisInstance.value = lenis

      // Sync Lenis scroll events with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)

      // Drive Lenis RAF with GSAP ticker for single synchronized loop
      tickerCallback = (time: number) => {
        lenis.raf(time * 1000)
      }

      gsap.ticker.add(tickerCallback)
      gsap.ticker.lagSmoothing(0)
    } catch (err) {
      console.warn('Lenis smooth scroll initialization skipped:', err)
    }
  }

  function scrollTo(target: string | HTMLElement, options?: { offset?: number; duration?: number; immediate?: boolean }) {
    if (lenisInstance.value) {
      lenisInstance.value.scrollTo(target, options)
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  function destroy() {
    if (tickerCallback) {
      gsap.ticker.remove(tickerCallback)
      tickerCallback = null
    }

    if (lenisInstance.value) {
      lenisInstance.value.destroy()
      lenisInstance.value = null
    }
  }

  onMounted(() => {
    init()
  })

  onBeforeUnmount(() => {
    destroy()
  })

  return {
    lenis: lenisInstance,
    initSmoothScroll: init,
    scrollTo,
    destroy
  }
}
