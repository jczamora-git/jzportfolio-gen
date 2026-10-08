---
name: vue-regression
description: Regression review, shared-component change safety, lifecycle verification, and defect prevention for Vue 3.
---

# Skill: Vue Regression Reviewer

## Core Responsibilities
1. **Prevent Recurring Regressions**: Specifically guard against previously identified regression patterns (theme toggle breaking, mobile menu clipping, background seams, missing links, lost drafts).
2. **Shared Component Safety Audit**: Review any proposed changes to `AppHeader.vue`, `AppFooter.vue`, `portfolioStore.ts`, `useTheme.ts`, `FormField.vue`, or `main.css`.
3. **Reactive State & Lifecycle Inspection**: Verify props, emits, computed values, watchers, and event listener cleanups in `onBeforeUnmount`.

---

## The Top 10 Known Regression Traps

| Regression Trap | What Goes Wrong | Prevention Rule |
| :--- | :--- | :--- |
| **1. Theme Desynchronization** | Multiple `onMounted` hooks overwrite `currentTheme` asynchronously. | Keep `useTheme.ts` synchronous with direct `document.documentElement` class update. |
| **2. Background Seam Under Navbar** | Header and hero have different background tokens in dark mode. | Root wrapper on landing route must match upper-sheet background (`#20202B` dark, `white` light). |
| **3. Mobile Menu Clipping / Invisible Links** | Menu rendered white in light mode or clipped by parent container overflow. | Keep mobile dropdown permanently dark in both themes (`bg-[#12131C]/98`) and position fixed/sticky without clipping parents. |
| **4. Mobile Brief Accidental Reveal** | GSAP inline styles set `display: block` on `.hero-brief` on mobile. | Target `.hero-brief` ONLY within `mm.add('(min-width: 768px)')` in GSAP. Responsive CSS is `hidden md:block`. |
| **5. Lost Draft Autosave** | User input changes in wizard steps fail to trigger `saveToStorage`. | `portfolioStore.ts` watches `draft` deep changes and saves to `localStorage`. Never bypass store methods. |
| **6. Stale GSAP / ScrollTrigger Listeners** | Navigating between routes creates duplicate RAF or orphaned ScrollTriggers. | Use `gsap.context()` scoped to component root and execute `ctx.revert()` on `onBeforeUnmount`. |
| **7. Rectangular Theme Transition Flash** | `transition-colors duration-200` on nested layout wrappers causes delayed frame cutoffs. | Do not put transition delays on root structural wrappers (`App.vue`, `landing-stage`, `upper-hero-sheet`, `lower-stage`). |
| **8. Corrupted Draft Crash** | Invalid JSON in `localStorage` crashes store initialization. | `draftStorage.ts` must parse JSON inside `try/catch` and validate with Zod `PortfolioDraftSchema.safeParse()`. |
| **9. Prompt Hallucination** | Prompt generator outputs fake work experience or achievements when fields are empty. | `promptGenerator.ts` must only emit verified input facts and instruct AI to use "Learning Journey" for empty projects. |
| **10. Mobile Headline Shrinking** | Overly conservative font clamps or missing `[text-wrap:balance]` breaks mobile hero. | Fluid typography `text-[clamp(2.5rem,10.6vw,3.25rem)]` ensures bold, centered mobile headline. |

---

## Pre-Change Verification Checklist
- [ ] Have I identified all routes that depend on the modified component?
- [ ] Have I run `npm test` before and after making changes?
- [ ] Does the change maintain responsiveness on mobile (<768px), tablet (768-1023px), and desktop (1024px+)?
- [ ] Does the change work in both Light Mode and Dark Mode?
