# Feature Contract — Portfolio Launchpad

## 1. Complete Inventory of Implemented Features

### A. 5-Step Guided Prompt Wizard (`/builder`)
- **Step 1: Personal Profile**: Full name (required), headline/intended role (required), bio excerpt, location, contact email, GitHub URL, LinkedIn URL, personal website URL.
- **Step 2: Skills & Background**: Current status (Student, Fresh Grad, Professional, Freelancer), category chips (Frontend, Backend, Tools, Design, Other), custom skill chip input, education fields, experience, awards/certifications.
- **Step 3: Projects**: Dynamic repeatable project cards (up to 6) with project name, one-line description, problem/goal, personal contribution, tech tags, key features, outcome, repo URL, demo URL.
- **Step 4: Design Preferences**: Style archetype (Minimal Clean, Modern Developer, Creative Agency, Editorial), color palette choice, and included sections.
- **Step 5: Review & Generate**: Structured brief summary, sample profile loader (5 personas), Zod validation check, reset draft button with confirmation modal, and compile action.

### B. Sample Personas Harness
- 5 Preloaded student personas (`Alex Morgan`, `Jamie Reyes`, `Taylor Santos`, `Jordan Lee`, `Morgan Chen`) loadable in one click without manual typing.

### C. Deterministic Prompt Compiler & Export (`/result`)
- Compiles a complete, structured prompt instructing an AI coding assistant (ChatGPT, Claude, Gemini) to produce a single-page HTML5/CSS3/JS static portfolio.
- **Zero Hallucinations**: Omits unentered optional facts and includes "Learning Journey" instructions when projects or experience are empty.
- **One-Click Copy**: Copies prompt to clipboard with visual toast confirmation.
- **Markdown Export**: Generates and downloads a `.md` brief file.

### D. Educational Deployment Tutorial (`/learn/deploy`)
- 5 actionable chapters for Git initialization, committing static files, pushing to GitHub, creating `.github/workflows/deploy.yml`, and enabling GitHub Pages.

### E. Privacy & Data Handling (`/privacy`)
- Explicit client-side privacy statement clarifying zero cloud databases, accounts, or telemetry.

---

## 2. Invariants
- No user accounts or login required.
- No third-party AI API key requirements.
- Draft auto-saves to browser `localStorage` on every keystroke.
- Reset draft restores initial empty state with user confirmation.
