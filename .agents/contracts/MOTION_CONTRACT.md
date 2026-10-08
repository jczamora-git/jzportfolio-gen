# Motion & Animation Contract — Portfolio Launchpad

## 1. Libraries & Integration
- **GSAP (`v3.12.7`)**: Drives animation timelines and ticker synchronization.
- **GSAP ScrollTrigger (`v3.12.7`)**: Coordinates viewport entrance triggers.
- **Lenis (`v1.1.20`)**: Smooth scrolling on desktop wheel/trackpad.

---

## 2. Animation Rules & Lifecycles
1. **Single RAF Driver**: Lenis is initialized with `autoRaf: false`. The GSAP ticker drives Lenis via `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
2. **Component-Scoped Context**: All GSAP timelines must be wrapped in `gsap.context(..., scope)` and reverted with `ctx.revert()` in `onBeforeUnmount`.
3. **Trigger Execution**: ScrollTrigger instances on the landing page use `once: true` to avoid repetitive animations when scrolling back and forth.
4. **Reduced-Motion Preference**: When `prefers-reduced-motion: reduce` is active:
   - Lenis smooth scroll is disabled.
   - GSAP entrance transforms are bypassed.
   - All elements remain immediately visible at default opacity.
5. **No Style Leaks**: GSAP must only animate `transform` and `opacity`. GSAP must never set inline background colors or text colors.
6. **Mobile Brief Protection**: GSAP media query `mm.add('(min-width: 768px)')` wraps `.hero-brief` animations. Never animate or add inline display styles to `.hero-brief` on screens `< 768px`.
