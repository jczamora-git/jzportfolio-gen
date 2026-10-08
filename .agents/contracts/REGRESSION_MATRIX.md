# Regression Matrix — Portfolio Launchpad

When modifying code in any of the following areas, future agents MUST inspect the corresponding affected subsystems and run the specified verification checks:

| Modified Component / Subsystem | Potentially Affected Subsystems | Mandatory Validation Checks |
| :--- | :--- | :--- |
| **`useTheme.ts`** | All views (`/`, `/builder`, `/result`, `/learn/deploy`, `/privacy`), `AppHeader.vue`, `AppFooter.vue` | • `tests/theme-and-navigation.test.ts`<br>• Verify light/dark toggle on all routes<br>• Verify no rectangular glitch on rapid toggles |
| **`AppHeader.vue`** | Global floating navbar, mobile dropdown, route navigation | • `tests/theme-and-navigation.test.ts`<br>• Verify mobile hamburger open/close<br>• Verify dark dropdown appearance in both themes |
| **`LandingView.vue` (Hero & Upper Sheet)** | Desktop hero, mobile hero, statistics, curvature boundary | • Inspect 320px–430px mobile responsiveness<br>• Verify Portfolio Brief is hidden on mobile<br>• Verify upper sheet bottom curvature is distinct in light and dark |
| **`LandingView.vue` (Motion)** | GSAP ScrollTrigger, Lenis smooth scrolling | • Test with `prefers-reduced-motion`<br>• Verify route navigation leaves no stale triggers |
| **`portfolioStore.ts`** | All 5 wizard steps, result view, sample profiles, localStorage | • `tests/draft-storage.test.ts`<br>• `tests/sample-profiles.test.ts`<br>• Verify draft autosave and reset modal |
| **`promptGenerator.ts` & `markdownExport.ts`** | Result view, prompt copy, Markdown export | • `tests/prompt-generator.test.ts`<br>• Verify empty fields produce no fabricated claims |
| **`portfolioSchema.ts`** | Form validation, store sync, sample profiles | • `tests/portfolio-schema.test.ts`<br>• `tests/sample-profiles.test.ts` |
| **`main.css` / Tailwind Config** | Global typography, layout tokens, transitions | • Run `npm run verify`<br>• Verify both Light and Dark mode styling across all views |
| **`vite.config.ts` / Routing** | Production build, static hosting routing on Vercel | • `npm run build` |
