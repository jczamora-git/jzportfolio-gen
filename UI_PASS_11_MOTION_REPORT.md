# PORTFOLIO LAUNCHPAD — UI PASS 11 IMPLEMENTATION REPORT
## Premium Motion Design System & Dark Mode Background Continuity

### 1. Motion System Architecture
The motion design system introduces a centralized, component-scoped animation architecture built on the Vue 3 Composition API, GSAP, GSAP ScrollTrigger, and Lenis.

- **`src/lib/motion/motionPresets.ts`**: Centralizes standard easing curves (`power2.out`, `power3.out`, `expo.out`), animation durations, stagger intervals, and runtime capability checks (`isReducedMotion()`, `isTouchDevice()`).
- **`src/composables/useSmoothScroll.ts`**: Manages the Lenis smooth-scroll lifecycle, connects scroll updates to ScrollTrigger, drives Lenis RAF exclusively through the GSAP ticker, provides `scrollTo()` utilities with offsets, and performs complete teardown on unmount.
- **`src/composables/useScrollAnimations.ts`**: Registers the ScrollTrigger plugin, encapsulates `gsap.context()` scoped to the component root container, provides trigger refresh helpers, and ensures complete cleanup on component unmount or route transition.

---

### 2. Libraries & Dependencies
- **GSAP (`v3.12.7`)**: High-performance animation timelines and ticker management.
- **GSAP ScrollTrigger (`v3.12.7`)**: Scroll-linked viewport triggers for entrance animations with `once: true` execution to avoid repetitive distractions.
- **Lenis (`v1.1.20`)**: Frictionless momentum scroll interpolation on desktop, driven directly by `gsap.ticker` to prevent duplicate requestAnimationFrame loops.

---

### 3. Landing Page Motion Choreography

| Section | Trigger / Timing | Animation Choreography |
| :--- | :--- | :--- |
| **Hero Entrance** | Initial Page Load (`0.0s – 0.9s`) | Overlapping sequence: Bold headline editorial reveal (`y: 32px -> 0px`, `opacity: 0 -> 1`), supporting description fade-up (`y: 20px -> 0px`), CTA button entrance (`y: 16px -> 0px`), and desktop Portfolio Brief subtle scale entrance (`scale: 0.98 -> 1.0`, `y: 24px -> 0px`). |
| **Statistics Bar** | ScrollTrigger (`top 85%`) | Subtle fade-up with `0.1s` stagger across the 4 key metrics (`5+`, `100%`, `0DBs`, `CI/CD`). Metric numbers remain static and immediately readable (no fake counting counters). |
| **01 // The Process** | ScrollTrigger (`top 80%`) | Sequence reveal: Section label and header reveal first, followed by left/right editorial cards (`y: 24px -> 0px`, `stagger: 0.12s`), and the 4-step workflow timeline (`01 Define`, `02 Shape`, `03 Generate`, `04 Launch`). |
| **02 // The Builder** | ScrollTrigger (`top 80%`) | Section header and interactive capabilities container entrance. Interactive pill tabs drive smooth `<Transition name="tab-fade" mode="out-in">` crossfades on dimension switching with zero layout jumps. |
| **03 // Deployment Pipeline** | ScrollTrigger (`top 80%`) | Section header reveal followed by a coordinated `0.08s` staggered entrance across the 5 deployment pipeline steps (`AI Prompt`, `Source Files`, `Git Commit`, `GitHub Actions`, `Live Site`). |
| **04 // Final CTA** | ScrollTrigger (`top 85%`) | Coordinated focal reveal (`y: 28px -> 0px`, `opacity: 0 -> 1`) with smooth `power3.out` easing for the headline, value proposition, and primary action buttons. |

---

### 4. Smooth-Scroll Integration & Ticker Sync
- **Single RAF Driver**: Lenis is initialized with `autoRaf: false`. GSAP ticker drives `lenis.raf(time * 1000)` on each frame.
- **ScrollTrigger Synchronization**: `lenis.on('scroll', ScrollTrigger.update)` ensures scroll markers and trigger calculations stay perfectly synchronized with momentum scrolling.
- **Desktop vs. Mobile**: Lenis activates on desktop devices with mouse wheel or trackpad. Native touch scrolling is preserved on mobile and tablet touch devices.
- **Zero Scroll Locking**: No scroll hijacking, artificial resistance, or snapping is applied.

---

### 5. Responsive Motion Strategy (`gsap.matchMedia`)
- **Desktop & Tablet (`min-width: 768px`)**:
  - Full editorial timelines and staggered entrances.
  - Desktop Portfolio Brief enters smoothly with scale and translation.
- **Mobile (`max-width: 767px`)**:
  - Shorter animation durations (`0.4s – 0.6s`) and reduced vertical translation offsets (`10px – 18px`).
  - Portfolio Brief preview remains strictly hidden via responsive CSS (`hidden md:block`), ensuring zero inline display leaks or layout shifts on mobile.
  - Native browser touch scrolling is preserved.

---

### 6. Accessibility & Reduced Motion
- Uses `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- When reduced motion is preferred:
  - Lenis smooth scrolling is completely disabled.
  - GSAP entrance transforms and opacity animations are bypassed.
  - All landing page content and components render immediately with standard visibility.
  - Fallback CSS ensures zero flash-of-invisible-content (FOIC) if scripts fail to run.

---

### 7. Lifecycle & Memory Safety
- GSAP animations are scoped via `gsap.context()` / `gsap.matchMedia()`.
- On component unmount (`onBeforeUnmount`) or route change:
  - `animCtx.revert()` tears down all active timelines and removes DOM inline style remnants.
  - `gsap.ticker.remove(tickerCallback)` removes the Lenis RAF hook.
  - `lenis.destroy()` frees all scroll listeners and event handlers.
  - Navigating to `/builder`, `/result`, `/learn/deploy`, or `/privacy` runs with clean native page behavior and zero residual listeners.

---

### 8. Dark Mode Header / Hero Seam Resolution
- **Root Cause**: `App.vue` applied `dark:bg-[#101015]` to the root viewport wrapper, while `LandingView.vue` started with `dark:bg-[#20202B]`. Because `AppHeader` floats at `top-3 sm:top-4` in document flow, the area behind the floating capsule navbar displayed the `#101015` root background, creating a stark horizontal line where it met the `#20202B` upper sheet.
- **Resolution**:
  - Dynamically bound `App.vue` root background using `isLandingPage = computed(() => route.path === '/')`:
    - On landing page: `bg-white dark:bg-[#20202B]` (matching the upper-hero sheet continuously from `y=0` down to its curved bottom boundary).
    - On other routes: `bg-[#F7F7F9] dark:bg-[#101015]` (matching their native page surfaces).
  - Floating capsule in `AppHeader.vue` maintains its distinct dark pill surface (`bg-[#1A1A24]/95`, border `dark:border-[#414151]/80`) floating seamlessly on the continuous `#20202B` upper sheet.
  - Light mode retains a continuous white upper surface.

---

### 9. Validation Results
- **Vitest Unit Tests**: `15 passed (15)` across portfolio schema, draft storage, sample profiles, and prompt generation.
- **TypeScript Typecheck (`vue-tsc --noEmit`)**: 0 errors.
- **Production Build (`vite build`)**: Succeeded cleanly (`dist/assets/index-Ca5Sk3-f.css` 54.45 kB, `dist/assets/index-Dm2_fmdl.js` 485.19 kB).
