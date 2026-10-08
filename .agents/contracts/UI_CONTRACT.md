# UI Contract — Portfolio Launchpad

## 1. Approved Page Compositions

### A. Landing Page (`/`)
- **Floating Pill Header**: Fixed dark capsule navigation (`bg-[#12131C]/95 dark:bg-[#1A1A24]/95`) floating at top.
- **Upper-Sheet Hero**: White (`#FFFFFF`) in light mode, charcoal (`#20202B`) in dark mode, with bottom rounded corners (`rounded-b-[44px] sm:rounded-b-[72px] lg:rounded-b-[96px]`).
- **Hero Headline**: Bold centered editorial display typography `Your work deserves to be seen.` with purple curved underline svg.
- **Creative Portfolio Brief**: Tactile summary card displayed beside hero copy on tablet/desktop (`md+`), strictly hidden on mobile.
- **Lower Stage**: Soft lavender-gray (`#F1F0F6`) in light mode, deep near-black (`#0F0F15`) in dark mode.
- **Statistics Bar**: 4-column layout (`5+ Starter Personas`, `100% Client-Side & Private`, `0DBs Zero Cloud Tracking`, `CI/CD GitHub Actions Ready`) directly below hero sheet.
- **Process Section (01 // THE PROCESS)**: Label badge, editorial heading, asymmetrical cards (Prompt Builder Purpose + Persona Harness), and 4-step horizontal timeline.
- **Capabilities Showcase (02 // THE BUILDER)**: Interactive left pill tabs + right preview panel with smooth `<Transition name="tab-fade" mode="out-in">` crossfade.
- **Ticker Ribbon**: Full-width scrolling marquee with brand star symbols.
- **Deployment Pipeline (03 // DEPLOYMENT PIPELINE)**: 5 visual workflow step cards (`AI Prompt`, `Source Files`, `Git Commit`, `GitHub Actions`, `Live Site`).
- **Final CTA (04 // START TODAY)**: High-impact gradient card with Build Prompt and Deploy Guide actions.

### B. Guided Wizard (`/builder`)
- **Step 1 — Profile**: Full name, headline/role, bio excerpt, location, contact email, social links (GitHub, LinkedIn, Website).
- **Step 2 — Skills & Background**: Status selector (Student, Fresh Grad, Professional, Freelancer), skill category chips, education, experience, awards.
- **Step 3 — Projects**: Repeatable project cards (up to 6) with problem statement, contribution, tech tags, features, outcome, repo URL, demo URL.
- **Step 4 — Design Preferences**: Visual archetype (Minimal Clean, Dev Terminal, Editorial, Bold), color palette choice, and layout sections.
- **Step 5 — Review & Generate**: Structured brief summary, sample persona loader, validation status, and Generate button.

### C. Prompt Output & Result (`/result`)
- Formatted prompt card with syntax highlighting, one-click Copy with confirmation toast, and Markdown file download.

### D. Deployment Guide (`/learn/deploy`)
- 5 comprehensive chapters with terminal commands, copyable GitHub Actions YAML snippet, and common troubleshooting FAQ.

---

## 2. Inviolable UI Rules
1. **Never make the navbar or mobile menu white**: The floating navbar and mobile dropdown remain permanently dark across both light and dark modes.
2. **Never hide elements with permanent inline opacity**: Use CSS classes and GSAP cleanup (`clearProps: 'transform'`).
3. **Preserve responsive visibility**: The Portfolio Brief must never appear on mobile screens (`<768px`).
