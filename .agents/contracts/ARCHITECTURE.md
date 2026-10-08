# Architecture Contract — Portfolio Launchpad

## 1. System Overview & Boundaries
Portfolio Launchpad is an educational, client-side AI prompt builder web application. It operates entirely in the browser without server-side APIs, database backends, or cloud telemetry.

```
+------------------------------------------------------------------------+
|                            Browser Client                              |
|                                                                        |
|  +-------------------+   +--------------------+   +-----------------+  |
|  |    Vue Router     |-->|    Views (5)       |-->| Common / Wizard |  |
|  | (5 Static Routes) |   | Landing, Wizard... |   |   Components    |  |
|  +-------------------+   +--------------------+   +-----------------+  |
|                                    |                       |           |
|                                    v                       v           |
|  +-------------------+   +--------------------+   +-----------------+  |
|  |   useTheme.ts     |   |  portfolioStore    |   | promptGenerator |  |
|  |  (HTML dark sync) |   | (Pinia Wizard/Draft|   |  (Deterministic |  |
|  +-------------------+   +--------------------+   | Markdown output)|  |
|                                    |              +-----------------+  |
|                                    v                                   |
|                          +--------------------+                        |
|                          |   localStorage     |                        |
|                          | (Draft Persistence)|                        |
|                          +--------------------+                        |
+------------------------------------------------------------------------+
```

---

## 2. Directory & Component Responsibilities

### Views (`src/views/`)
- `LandingView.vue`: Physical upper-sheet hero, statistics, 4-stage process, capabilities showcase, ticker ribbon, deployment pipeline, and final CTA.
- `WizardView.vue`: 5-step portfolio brief builder (Profile, Skills, Projects, Design, Review) with sample persona picker and reset confirmation modal.
- `ResultView.vue`: Generated prompt display, Markdown copy actions, file download, and edit links.
- `DeployGuideView.vue`: Educational step-by-step GitHub Actions + GitHub Pages deployment tutorial with copyable YAML and terminal commands.
- `PrivacyView.vue`: Client-side privacy statement and local storage data management.

### Shared & Wizard Components (`src/components/`)
- `common/AppHeader.vue`: Sticky floating capsule navigation, theme toggle, brand logo, mobile hamburger, and mobile dropdown.
- `common/AppFooter.vue`: Theme-aware footer with webinar attribution, navigation links, and privacy policy links.
- `common/FormField.vue`: Reusable form field wrapper with validation error display and helper text.
- `common/ConfirmModal.vue`: Modal dialog for draft reset confirmations.
- `common/ToastContainer.vue`: Global transient notification system.
- `wizard/WizardProgress.vue`: 5-step interactive progress bar with step navigation.
- `wizard/SampleProfileSelector.vue`: Carousel/selector for preloaded student personas.
- `wizard/StepProfile.vue`, `StepSkills.vue`, `StepProjects.vue`, `StepDesign.vue`, `StepReview.vue`: Dedicated step form views.
- `prompt/PromptOutput.vue`: Formatted output container with copy feedback.

### Stores & Composables (`src/stores/`, `src/composables/`)
- `portfolioStore.ts`: Central Pinia store managing wizard step index, draft object, validation errors, dirty tracking, and localStorage synchronization.
- `useTheme.ts`: Reactive theme composable managing light/dark state, document element class toggling, and storage persistence.
- `useSmoothScroll.ts`: Encapsulates Lenis smooth scroll lifecycle and connects to GSAP ticker.
- `useScrollAnimations.ts`: Encapsulates GSAP ScrollTrigger creation and scoped context cleanup.
- `useToast.ts`: Reactive toast message dispatcher.

### Libraries & Utilities (`src/lib/`)
- `lib/validation/portfolioSchema.ts`: Zod validation schemas for UserProfile, Background, Project, DesignPreferences, and PortfolioDraft.
- `lib/storage/draftStorage.ts`: Safe serialization, deserialization, and schema validation of drafts in localStorage.
- `lib/prompt/promptGenerator.ts`: Deterministic compilation of user facts into AI prompt specifications.
- `lib/prompt/markdownExport.ts`: Generates downloadable Markdown files representing the user's portfolio brief.
- `lib/motion/motionPresets.ts`: Easing curves, timing constants, media queries, and reduced-motion checks.

---

## 3. High-Impact Shared Files
Changes to these files have global blast radius across the application:
1. `src/App.vue`: Root layout container and route-aware background shell.
2. `src/components/common/AppHeader.vue`: Global navigation pill and mobile dropdown.
3. `src/components/common/AppFooter.vue`: Global footer.
4. `src/composables/useTheme.ts`: Application-wide theme state.
5. `src/styles/main.css`: Design tokens, Tailwind layer definitions, Lenis CSS, and transitions.
6. `src/stores/portfolioStore.ts`: Global wizard and draft data management.
