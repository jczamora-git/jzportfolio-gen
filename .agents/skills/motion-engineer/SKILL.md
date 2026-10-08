---
name: motion-engineer
description: GSAP timeline orchestration, ScrollTrigger scoping, Lenis smooth scroll ticker sync, and reduced-motion accessibility.
---

# Skill: Motion Engineer

## Core Responsibilities
1. **Orchestrate Motion Architecture**: Maintain `src/lib/motion/motionPresets.ts`, `src/composables/useSmoothScroll.ts`, and `src/composables/useScrollAnimations.ts`.
2. **Synchronize Lenis & GSAP**: Single RAF ticker driver (`gsap.ticker.add((time) => lenis.raf(time * 1000))`). Prevent duplicate ticker loops.
3. **Scoped Cleanup**: All scroll animations must execute within `gsap.context(..., scope)` and cleanly revert via `ctx.revert()` in `onBeforeUnmount` to prevent memory leaks and duplicate triggers across route transitions.
4. **Accessibility Compliance**: Respect `prefers-reduced-motion: reduce`. Disable smooth scroll and entrance transforms when reduced motion is preferred, ensuring content is immediately visible.

---

## Animation System Specifications

### 1. Hero Load Animation
- Headline editorial reveal (`y: 32px -> 0px`, `opacity: 0 -> 1`, `power3.out`, `0.85s`).
- Supporting description fade-up (`y: 20px -> 0px`, `opacity: 0 -> 1`, `power2.out`, `0.6s`).
- Action buttons staggered entrance (`y: 16px -> 0px`, `0.5s`).
- Creative Portfolio Brief (desktop only, `min-width: 768px`): subtle scale & translation (`scale: 0.98 -> 1`, `y: 24px -> 0px`, `0.75s`).

### 2. ScrollTrigger Section Triggers
- **Statistics**: Fade-up with `0.1s` stagger across metrics (`once: true`). Metric numbers remain static (no fake counter tickers).
- **01 // The Process**: Editorial header reveal + left/right feature cards + 4-step workflow timeline.
- **02 // Builder Capabilities**: Capabilities header + tab controls + preview display.
- **03 // Deployment Pipeline**: Coordinated `0.08s` stagger across 5 workflow steps (`AI Prompt`, `Source Files`, `Git Commit`, `GitHub Actions`, `Live Site`).
- **04 // Final CTA**: Focal reveal with `power3.out` easing.

### 3. Critical Rules
- **No Theme Color Inlines**: Animate only `transform` and `opacity`. Never set inline background colors or text colors via GSAP.
- **No Mobile Brief Leak**: Portfolio brief is `hidden md:block`. Never apply GSAP transforms or inline styles to `.hero-brief` on screens `<768px`.
- **Clear Props**: Use `clearProps: 'transform'` on timeline completion to keep DOM clean.
