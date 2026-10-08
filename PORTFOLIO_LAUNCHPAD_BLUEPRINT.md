# Portfolio Launchpad

**Product Requirements + UX Specification + Technical Architecture**  
**Version:** 1.0 (MVP specification)  
**Use case:** “Code. Build. Deploy: Launch Your Portfolio with GitHub Actions” webinar  
**Status:** Proposed design — not yet implemented

---

## 1. Product definition

**Portfolio Launchpad** is a beginner-friendly, AI-assisted portfolio **prompt builder**. Participants enter real professional and project information, choose design preferences, review a structured summary, and copy or download a high-quality prompt for ChatGPT, Gemini, or another coding assistant. The generated prompt asks the assistant to produce the code for a responsive static portfolio website. Participants then run and customize that website locally and deploy it using GitHub Actions and GitHub Pages.

**Not in scope:** The Launchpad does **not** build websites, host participants' sites, call an AI API, commit code to GitHub, create repositories, or deploy on behalf of users.

### Success criteria

1. A novice can produce a useful portfolio development prompt in **5–10 minutes**.
2. Users can complete the flow **without signing up** or providing payment information.
3. Prompt accurately reflects user-entered facts; it never invents work history, achievements, project metrics, or credentials.
4. Prompt instructs AI to produce **complete HTML/CSS/JS source files** that can be hosted on GitHub Pages without a backend or secret API keys.
5. Users can copy the prompt and download the prompt or portfolio brief as Markdown.
6. Reloading the page does not lose progress in a browser that supports local storage.
7. Works responsively and supports keyboard navigation.

### Personas

- **Student:** few or no professional experiences; school and personal projects are acceptable.
- **Fresh graduate:** showcases education, projects, internships, skills, achievements.
- **Early-career professional / freelancer:** professional profile, selected experience, evidence-based work.

## 2. Page map and navigation

| Route | Name | Main content | Primary action |
|---|---|---|---|
| `/` | Landing | Hero, how it works, what users receive, webinar callout, privacy note | **Start Building** |
| `/builder` | Guided wizard | Steps 1–5, autosave indicator, progression, data-entry help | **Continue** / **Review** |
| `/result` | Generated prompt | Portfolio brief summary, formatted prompt, Copy, Export Markdown, Edit | **Copy Prompt** |
| `/learn/deploy` | Deployment guide | Prompt to code, local file setup, Git basics, Actions, Pages, FAQ | **Follow the Guide** |
| `/privacy` | Privacy explanation | Local storage, what is shared when copying to AI, clear data | **Back to Builder** |

Only `/`, `/builder`, and `/result` are essential for the first demo; `/learn/deploy` is strongly recommended to align with the webinar. Keep `/privacy` concise but available from the footer.

**Navigation:** Logo at left, **Build Portfolio** and **Deployment Guide** at right; simple mobile menu. No authentication UI. Do not use modals for the wizard; each step occupies a full page section.

## 3. Step-by-step wizard UX

### Step 1 — Personal profile

**Required**
- Full name (2–100 characters)
- Portfolio headline / intended role (e.g., `Aspiring Frontend Developer`; 2–100 characters)

**Optional**
- About me / raw introduction (up to 1,000 characters)
- City or general location (avoid street addresses)
- Contact email
- GitHub profile URL
- LinkedIn profile URL
- Personal website URL
- Profile photo preference (`none`, `placeholder`, or a future own-photo slot; **do not upload photos in MVP**)

**UX:** Example text, inline validation, and clear note: “Only add information you're comfortable making public.” Do not ask for phone, birthdate, government ID, home address, or private academic records.

### Step 2 — Skills and background

**Required**
- At least one skill; either select chips or enter a custom skill

**Optional**
- Current status (`student`, `fresh_graduate`, `professional`, `freelancer`, `other`)
- Skill categories: Frontend, Backend, Tools, Design, Other
- Education: program/degree, institution, expected/completed year (optional)
- Professional experience: role, organization, short factual summary (optional)
- Certifications/awards with evidence if relevant (optional)

**UX:** Never require job experience. Provide “I don't have professional experience yet” helper text; let learning and school projects stand on their own merits.

### Step 3 — Projects

**Required:** Zero or more projects; **strongly recommend one** but do not block students without projects.

Each project:
- Project name (required if a project is added)
- One-line description (required if a project is added)
- Problem / goal (optional)
- Personal contribution (optional)
- Technologies used (optional)
- Key features (optional)
- Outcome or what was learned (optional)
- Repository URL (optional)
- Live demo URL (optional)

**UX:** Repeatable project cards, add/remove/reorder. Cap at 6 in MVP. Projects with missing names/descriptions show inline errors. An empty collection yields a prompt instructing the AI to display a **Learning Journey** section, not fictional projects.

### Step 4 — Design preferences

**Required default selections**
- Style: `minimal`, `modern`, or `creative`
- Theme: `light`, `dark`, or `system` (for MVP, choose `light` or `dark` to simplify generated sites; `system` optional)
- Accent color: `blue`, `purple`, `green`, `orange`, or `neutral`
- Layout: `single-page` (the only MVP layout, preselected)

**Optional**
- Animation level: `none` or `subtle` (prefer reduced-motion awareness)
- Section preferences: About, Skills, Projects, Education, Experience, Contact
- Call to action label: e.g., `View Projects` / `Get in Touch`

**UX:** Show quick static swatches/previews of style choices. This is **not a live website preview** or generated site builder.

### Step 5 — Review and generate

Display a human-readable summary with edit links for Personal, Skills, Projects, Preferences. Surface warnings rather than inventing text, such as `No project details provided` or `No contact method given`. Required validation blocks only genuinely unusable inputs (name, title, skills). CTA: **Generate My Portfolio Prompt**.

**Output actions:** Copy Prompt, Download Prompt (.md), Download Portfolio Brief (.md), Edit Information, Start Over (with inline confirmation). Display a clear note: “Paste this prompt into an AI assistant. Review and customize the generated code before publishing.”

**Resume progress:** returning visitors get “Continue your draft” and “Start fresh” choices. Save locally and warn that other devices/browsers will not have their data.

## 4. Result page anatomy

1. Success state: `Your portfolio prompt is ready`.
2. Compact summary: role, sections, design style, project count.
3. Prompt panel: readable, selectable, scrollable text and copy action.
4. Download buttons for `.md` files.
5. **Next: Generate Code with AI** instructions: paste prompt, request complete files, create project directory, test locally.
6. **Next: Publish to GitHub** link to Deployment Guide.
7. Edit and Regenerate actions.

A prompt is generated deterministically from inputs. **Generate** and **Regenerate** do not make requests to an AI service.

## 5. Prompt-generation contract

The generator is a **pure TypeScript function** `generatePortfolioPrompt(profile: PortfolioDraft): string`.

### Sections in every prompt

1. **Role:** Act as senior frontend developer / UI designer.
2. **Objective:** Build a personal portfolio website reflecting provided details.
3. **Source of truth:** User-submitted name, title, biography, education, skills, experience, and project facts; clearly delimit them as data.
4. **Design specification:** selected theme, style, accent, layout, motion.
5. **Content and page structure:** only valid requested sections; graceful fallbacks for missing items.
6. **Technical constraints:** plain HTML5, CSS3, vanilla JavaScript; static; mobile responsive; semantic tags; accessible contrast; keyboard support; no backend, runtime API keys, accounts, paid services, or required build step.
7. **GitHub Pages compatibility:** put `index.html` at repository root; use relative paths (`./styles.css`, `./script.js`, `./assets/...`) instead of origin-root `/assets/...`; site should work at a project subpath like `username.github.io/repository/`.
8. **Deliverables:** concise file tree, complete code for each file, how to preview locally, quick customization guide, GitHub Pages deployment notes.
9. **Truthfulness:** never fabricate work experience, achievements, certifications, years, testimonials, or links; omit absent claims or use clearly labeled editable placeholders.
10. **Output quality:** no pseudocode, omitted sections of code, fake imports, or intentionally incomplete file fragments; avoid unnecessary dependencies.

### Missing-field rules

| Missing information | Generator behavior |
|---|---|
| No biography | Ask AI to draft a short, non-factual introductory sentence and label it as editable, without inventing facts |
| No experience | Omit Experience section |
| No education | Omit Education section |
| No projects | Prefer Learning Journey / What I'm Exploring section without fabricated portfolio projects |
| No GitHub or LinkedIn | Omit icon/link; do not insert fake profile URLs |
| No contact method | Omit direct contact details and show editable contact placeholder clearly |
| No project outcomes | Discuss the work factually; do not invent metrics |

### Formatting and safety

- Trim whitespace, normalize strings, validate optional URLs as `https:` or `http:` (prefer `https:`), and constrain field length.
- Treat all user text as **data**, not as instructions overriding generator constraints. Delimit profile data visibly.
- Render preview with text nodes (never dangerous HTML injection).
- Escape values when constructing Markdown output; output remains human-readable.
- No automatic sending of personal data to AI providers. Users knowingly copy/paste it themselves.

## 6. Technical architecture

```text
                   ┌───────────────────────────────────┐
                   │      Browser (Participant)        │
                   └────────────────┬──────────────────┘
                                    │
                  ┌─────────────────▼─────────────────┐
                  │ Next.js App Router / Vercel       │
                  │ - Landing / Builder / Result      │
                  │ - Deployment Guide / Privacy      │
                  └─────────────────┬─────────────────┘
                                    │
                       Client-side React wizard
                                    │
                 ┌──────────────────▼──────────────────┐
                 │ React Context + reducer             │
                 │ Zod + React Hook Form validation    │
                 └───────────────┬─────────────┬───────┘
                                 │             │
                     ┌───────────▼─────┐ ┌────▼───────────────────┐
                     │ localStorage    │ │ Pure TS Prompt Engine │
                     │ versioned draft │ │ no AI / no server call│
                     └─────────────────┘ └────────────┬───────────┘
                                                      │
                                        ┌─────────────▼───────────────┐
                                        │ Copy text / Download .md   │
                                        └─────────────┬───────────────┘
                                                      │ user pastes
                                        ┌─────────────▼───────────────┐
                                        │ AI assistant (external)     │
                                        └─────────────┬───────────────┘
                                                      │ generates files
                                        ┌─────────────▼───────────────┐
                                        │ VS Code → Git → GitHub      │
                                        └─────────────┬───────────────┘
                                                      │ GitHub Actions
                                        ┌─────────────▼───────────────┐
                                        │ GitHub Pages live portfolio│
                                        └─────────────────────────────┘
```

**Two different deployments:**
- Portfolio Launchpad itself: Next.js static/client-rendered frontend hosted on **Vercel**. GitHub-to-Vercel automatic builds can be configured independently.
- Participant portfolios: static output from their chosen AI assistant, stored in **their own GitHub repositories**, published through **GitHub Actions to GitHub Pages**. The Launchpad never hosts their generated code.

**MVP runtime policy:** No required API routes, database, authentication, or backend. Render landing/guide normally. Wizard/result are client components, and browser storage access happens only after mount (to prevent hydration errors). Avoid analytics that capture personal form fields.

### Suggested project structure

```text
portfolio-launchpad/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                # Landing
│   │   ├── builder/page.tsx       # Full-page wizard
│   │   ├── result/page.tsx        # Prompt + summary
│   │   ├── learn/deploy/page.tsx  # Webinar guide
│   │   ├── privacy/page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   ├── builder/
│   │   │   ├── wizard-shell.tsx
│   │   │   ├── wizard-progress.tsx
│   │   │   ├── profile-step.tsx
│   │   │   ├── skills-step.tsx
│   │   │   ├── projects-step.tsx
│   │   │   ├── design-step.tsx
│   │   │   └── review-step.tsx
│   │   └── result/
│   │       ├── profile-summary.tsx
│   │       └── prompt-output.tsx
│   ├── features/portfolio/
│   │   ├── types.ts
│   │   ├── schema.ts
│   │   ├── defaults.ts
│   │   ├── reducer.ts
│   │   ├── context.tsx
│   │   ├── prompt-generator.ts
│   │   ├── markdown-export.ts
│   │   └── sections.ts
│   ├── lib/
│   │   ├── draft-storage.ts
│   │   └── clipboard.ts
│   └── tests/
│       ├── prompt-generator.test.ts
│       └── draft-storage.test.ts
├── package.json
├── README.md
└── .gitignore
```

### Data model (conceptual)

```ts
type ParticipantStatus = "student" | "fresh_graduate" | "professional" | "freelancer" | "other";
type PortfolioStyle = "minimal" | "modern" | "creative";
type PortfolioTheme = "light" | "dark";
type AccentColor = "blue" | "purple" | "green" | "orange" | "neutral";

type PortfolioProject = {
  id: string;
  name: string;
  description: string;
  goal?: string;
  contribution?: string;
  technologies: string[];
  keyFeatures?: string[];
  outcome?: string;
  repositoryUrl?: string;
  liveUrl?: string;
};

type PortfolioDraft = {
  schemaVersion: 1;
  updatedAt: string;
  profile: {
    fullName: string;
    headline: string;
    about?: string;
    location?: string;
    email?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    websiteUrl?: string;
  };
  background: {
    status: ParticipantStatus;
    skills: string[];
    education?: { program?: string; school?: string; year?: string };
    experience?: { role: string; organization?: string; summary?: string }[];
    certifications?: string[];
  };
  projects: PortfolioProject[];
  preferences: {
    style: PortfolioStyle;
    theme: PortfolioTheme;
    accentColor: AccentColor;
    layout: "single-page";
    motion: "none" | "subtle";
    sections: ("about" | "skills" | "projects" | "education" | "experience" | "contact")[];
  };
};
```

### Draft persistence

- Use `localStorage` key `portfolio-launchpad:draft:v1` with a `schemaVersion` field.
- Hydrate **after mount**, showing a brief loading/skeleton state until storage is resolved.
- Persist debounced updates; do not overwrite existing storage with empty defaults before hydration completes.
- Support explicit Clear Draft with confirmation, and detect invalid/outdated saved data using the Zod schema.
- Catch storage/quota/private-mode errors gracefully; wizard should still work in memory for the current tab.
- Personal data in localStorage is not encrypted; explain that devices and shared computers require care.

## 7. UI / visual direction

**Brand:** Portfolio Launchpad. Use a polished developer-tool aesthetic with navy/blue highlights inspired by webinar branding, large whitespace, subtle borders, and crisp typography. Professional rather than overly playful.

- **Desktop:** Full-page shell with max-width ~960px, a clear top progress indicator, and at most two form columns. Never use a cluttered three-column form.
- **Mobile:** One-column inputs, full-width actions, scrollable stepper where needed, generous touch targets.
- **Wizard:** Current step title, one-line reason for the step, concise example values, Back/Continue navigation, automatic draft save.
- **Review:** Structured cards with Edit links and clear missing-content tips.
- **Results:** Large prompt panel, obvious Copy Prompt, secondary download and edit actions; avoid overly small or truncated prompt text.
- **Motion:** lightweight transitions and reduced-motion support.
- **Accessibility:** proper labels, inline descriptive errors, keyboard navigation, visible focus states, sufficient contrast, success feedback through `aria-live`.

### Landing page sections

1. **Hero:** “Turn your story into your first live portfolio.” Subcopy: “Answer a few questions. Generate an AI-ready prompt. Build, then deploy with GitHub Actions.” Primary CTA **Create My Portfolio Prompt**.
2. **How it works:** Fill profile → Generate prompt → Build with AI → Deploy.
3. **What you can customize:** intro, skills, projects, style.
4. **Webinar callout:** “Created for Code. Build. Deploy.” with a friendly beginner-focused message.
5. **Privacy and FAQ:** no login; data stays in this browser until user copies or exports it; no automatic AI submissions.

## 8. Beginner-friendly deployment guide content

1. **Generate code:** Paste the prompt into an external AI coding assistant. Request complete `index.html`, `styles.css`, and `script.js` files, with assets if necessary.
2. **Save files:** Place `index.html` at the repository root. Use relative `./` asset paths.
3. **Preview:** Open with a local server / VS Code Live Server, inspect on mobile width, verify links and names.
4. **Create GitHub repository:** `my-portfolio` public repository (for free public GitHub Pages hosting).
5. **Push:** `git init`; `git add .`; `git commit`; `git branch -M main`; add remote; `git push -u origin main`. Explain that installed Git and authentication are prerequisites.
6. **Actions workflow:** Supply a tested, version-pinned GitHub Pages Actions YAML that deploys the static root directory; include repository Pages settings instructions for choosing GitHub Actions as the source. Keep exact action versions updated when implementing.
7. **Verify URL:** `https://USERNAME.github.io/REPOSITORY/`; deployment may take time; check Actions logs.
8. **Update:** Edit a visible string, commit, push, watch auto-redeployment.

**Instructor contingency:** Have a previously generated, validated portfolio repository ready in case AI providers rate-limit students or return partial output. This is a fallback for the live demo, not a built-in template generator feature.

## 9. Feature priority and development plan

### P0 — Launch-ready MVP

- Responsive landing page and navigation
- Five-step form wizard with defaults and validation
- Student-friendly optional experience fields
- Repeatable projects
- Review and edit summary
- Deterministic, truthful, GitHub Pages-compatible prompt generator
- Copy to clipboard + Markdown download
- Local draft save / resume / clear
- Deployment guide and basic privacy statement
- Empty states, form errors, accessible controls

### P1 — Post-webinar improvements

- Export/import a local JSON backup
- More curated design presets and dynamic swatch previews
- Multi-language prompt option (English / Filipino)
- `prompt version` metadata and optional prompt-history list (local only)
- Better project guidance and examples for different disciplines
- Anonymous privacy-conscious usage analytics (without form field payloads)

### P2 — Deliberately excluded from MVP

- AI chat or model API integrations
- Actual website generation or downloadable portfolio source code
- In-app browser website preview
- Authentication, profiles, database, cloud sync
- GitHub repository creation or OAuth connection
- One-click GitHub deployment
- PDF resume builder

### Implementation phases

| Phase | Work | Done when |
|---|---|---|
| 1 — Foundation | Next.js TypeScript, Tailwind, shared shell, landing, routing | All pages render cleanly on desktop/mobile |
| 2 — Data & Wizard | Typed schema, form steps, repeatable projects, reducer, validation, local persistence | Refresh resumes correctly; every step works |
| 3 — Prompt Engine | Deterministic generation, missing-data policy, result page, exports | Prompt matches inputs and excludes fabricated data |
| 4 — Webinar Support | Deployment guide, FAQ, example data, instructor walkthrough | Novice can finish the Code/Build/Deploy flow |
| 5 — Quality & Release | Tests, typecheck, lint, build, accessibility checks, Vercel deployment | MVP passes release checklist and is publicly accessible |

## 10. Testing / acceptance checklist

- [ ] First-time visitor can complete every step without an account.
- [ ] Missing required name/title/skills receive inline errors; optional experience is not forced.
- [ ] User can add, edit, reorder, and remove projects without losing unrelated inputs.
- [ ] Invalid URL formats are rejected; optional empty URLs are allowed.
- [ ] Refresh, Back, and Forward preserve a valid draft without default data overwriting it.
- [ ] Full generation is deterministic for the same content and settings (apart from deliberately excluded timestamps).
- [ ] Empty optional sections do not appear as fake claims in the generated prompt.
- [ ] HTML/CSS/JS, relative asset paths, accessibility, GitHub Pages compatibility, and complete-file requirements always appear in the prompt.
- [ ] Copy action works or provides an actionable fallback; download produces a readable `.md` file.
- [ ] Result route without a valid local draft redirects or offers “Start Building” instead of crashing.
- [ ] Storage is never silently sent to an API or third-party analytics.
- [ ] On mobile, all controls remain visible, usable, and keyboard accessible.
- [ ] Run relevant unit tests, TypeScript typecheck, lint, and production build.

## 11. Demo script: 75 minutes

| Minutes | What happens |
|---|---|
| 00–10 | Introduce static portfolios, AI-assisted coding, and deployment |
| 10–22 | Participants fill out Launchpad wizard |
| 22–30 | Review/copy prompt and use AI to request complete code |
| 30–48 | Move output into VS Code, run site locally, customize names/projects |
| 48–60 | Explain Git, create GitHub repositories, push projects |
| 60–70 | Configure GitHub Actions → GitHub Pages and visit URLs |
| 70–75 | Push an edit for redeployment; Q&A |

**Checkpoint goals:** By minute 30 everyone has a prompt; by minute 48 everyone has local code; by minute 70 every participating repository should have a deployment attempt. Allow extra time or a follow-up handout if AI generation or Git setup takes longer.

## 12. Definition of done for MVP

The application is ready for the webinar when a participant can use a responsive, accessible, registration-free wizard; preserve draft data locally; generate a high-quality factual prompt; copy or export it; follow the deployment instructions; and understand clearly that Launchpad does **not** generate or host the final portfolio site. The instructor can demonstrate the whole external AI → local files → Git → Actions → Pages workflow without requiring a paid account.
