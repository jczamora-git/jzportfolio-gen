# Portfolio Launchpad 🚀
**An AI-Assisted Portfolio Prompt Builder**

> Created for the educational webinar: **"Code. Build. Deploy: Launch Your Portfolio with GitHub Actions"**

Portfolio Launchpad is a client-side web application designed to help students, fresh graduates, aspiring developers, and professionals build tailored, high-performance prompts for AI coding assistants (such as ChatGPT, Google Gemini, Claude, and GitHub Copilot). 

Instead of struggling with a blank canvas or vague instructions, users complete a guided 5-step wizard to produce an unambiguous, deterministic prompt that directs the AI to write complete static source code (`index.html`, `styles.css`, `script.js`) ready for deployment with GitHub Actions and GitHub Pages.

---

## 🌟 Key Features

1. **Guided 5-Step Wizard**:
   - **Step 1: Personal Profile** — Full name, target headline, biography, location, public contact info, and social links.
   - **Step 2: Skills & Background** — Student-friendly background categorization, chip-based skill selector across 5 popular technical categories, optional degree/school info, and work experience entries.
   - **Step 3: Projects Showcase** — Add multiple personal projects, coursework, hackathon submissions, tech stacks, and live links.
   - **Step 4: Design & Style Preferences** — Choose from curated aesthetics (*Minimalist*, *Modern Professional*, *Creative & Dynamic*, *Developer Terminal*), custom color palettes, dark/light themes, and animation preferences.
   - **Step 5: Review & Validation** — Comprehensive summary with jump-to-edit links and instant readiness checks.

2. **Deterministic Prompt Generation Engine**:
   - Strictly enforces truthfulness (prevents the AI from fabricating fake work experience, metrics, or credentials).
   - Constrains output to pure static HTML5, modern CSS3, and vanilla JavaScript.
   - Requires relative asset paths compatible with GitHub Pages subpath routing (`username.github.io/repository/`).

3. **Export & Sharing Actions**:
   - **One-Click Copy** to clipboard with fallback and toast feedback.
   - **Download Prompt Markdown** (`<name>-prompt.md`).
   - **Download Portfolio Brief** (`<name>-brief.md`).

4. **10-Stage Deployment Guide**:
   - Step-by-step tutorial explaining how to preview code locally in VS Code, initialize Git, push to GitHub, and deploy with a verified GitHub Actions workflow (`.github/workflows/deploy.yml`).

5. **100% Client-Side & Private**:
   - No backend, no accounts, no tracking cookies, and no direct AI API calls.
   - Autosaves drafts to browser `localStorage` under `portfolio-launchpad:draft:v1`.
   - Complete reset and clear storage tools built-in.

---

## 🛠️ Technology Stack

- **Framework**: Vue 3 (Composition API with `<script setup>`)
- **Build Tool**: Vite
- **Language**: TypeScript (Strict Mode)
- **Routing**: Vue Router 4 (HTML5 History mode with dynamic titles and scroll restoration)
- **State Management**: Pinia 2
- **Validation**: Zod
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Icons**: Lucide Vue Next
- **Testing**: Vitest
- **Hosting**: Vercel Static Deployment (`dist` folder with SPA URL rewrites)

---

## 📂 Project Structure

```
portfolio-launchpad/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppFooter.vue
│   │   │   ├── FormField.vue
│   │   │   ├── ToastContainer.vue
│   │   │   └── ConfirmModal.vue
│   │   ├── wizard/
│   │   │   ├── WizardProgress.vue
│   │   │   ├── StepProfile.vue
│   │   │   ├── StepSkills.vue
│   │   │   ├── StepProjects.vue
│   │   │   ├── StepDesign.vue
│   │   │   └── StepReview.vue
│   │   └── prompt/
│   │       └── PromptOutput.vue
│   ├── composables/
│   │   ├── useTheme.ts
│   │   └── useToast.ts
│   ├── data/
│   │   ├── sampleProfile.ts
│   │   └── skillSuggestions.ts
│   ├── lib/
│   │   ├── prompt/
│   │   │   ├── generatePortfolioPrompt.ts
│   │   │   └── markdownExport.ts
│   │   ├── storage/
│   │   │   └── draftStorage.ts
│   │   └── validation/
│   │       └── portfolioSchema.ts
│   ├── router/
│   │   └── index.ts
│   ├── stores/
│   │   └── portfolioStore.ts
│   ├── styles/
│   │   └── main.css
│   ├── types/
│   │   └── portfolio.ts
│   ├── views/
│   │   ├── LandingView.vue
│   │   ├── WizardView.vue
│   │   ├── ResultView.vue
│   │   ├── DeployGuideView.vue
│   │   └── PrivacyView.vue
│   ├── App.vue
│   └── main.ts
├── tests/
│   ├── prompt-generator.test.ts
│   ├── portfolio-schema.test.ts
│   └── draft-storage.test.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── package.json
└── PORTFOLIO_LAUNCHPAD_BLUEPRINT.md
```

---

## 🚀 Quick Start & Development Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```

### 3. Run Automated Unit Tests
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## ☁️ Vercel Deployment Guide

1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: build Vue portfolio prompt launchpad"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-launchpad.git
   git push -u origin main
   ```
2. Open your [Vercel Dashboard](https://vercel.com/new).
3. Click **"Add New Project"** and import the `portfolio-launchpad` repository.
4. Select the **Vite** preset (default build command: `npm run build`, output directory: `dist`).
5. Click **Deploy**. Vercel will automatically read `vercel.json` for SPA URL rewrites (`/`, `/builder`, `/result`, `/learn/deploy`, `/privacy`).

---

## 🔒 Privacy & Data Architecture

- **No Remote Database**: User inputs remain strictly inside the user's browser.
- **Local Storage Key**: `portfolio-launchpad:draft:v1`
- **Schema Validation**: Recovered data is validated with Zod upon loading to safeguard against corrupted or outdated drafts.
- **External AI Providers**: Copying a prompt to ChatGPT, Gemini, or Claude is a user-initiated action.

---

## 💡 Two Different Deployment Concepts

| Concept | **Portfolio Launchpad** | **Participant Portfolio** |
|---|---|---|
| **What it is** | The prompt builder tool (this repo) | The personal website built by participant |
| **Technology** | Vue 3 + TypeScript + Vite + Tailwind | Static HTML5, CSS3, Vanilla JS |
| **Where it runs** | Vercel SPA | GitHub Pages |
| **Deployment Mechanism** | Vercel Git integration | GitHub Actions workflow (`.github/workflows/deploy.yml`) |

---

## 📄 License & Attribution

Developed for educational purposes in the *"Code. Build. Deploy: Launch Your Portfolio with GitHub Actions"* webinar series.
