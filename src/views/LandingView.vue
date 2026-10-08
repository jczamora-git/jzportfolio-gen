<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { 
  Rocket, 
  Sparkles, 
  ArrowRight, 
  Code2, 
  Layers, 
  GitBranch, 
  ShieldCheck, 
  CheckCircle2, 
  Laptop, 
  Terminal,
  FileCode,
  Palette,
  HelpCircle,
  ExternalLink,
  BookOpen
} from 'lucide-vue-next'

const router = useRouter()
const portfolioStore = usePortfolioStore()

function handleStartBuilding() {
  router.push('/builder')
}

function handleTrySample() {
  portfolioStore.loadSample()
  router.push('/builder')
}
</script>

<template>
  <div class="space-y-24 py-6 sm:py-10">
    
    <!-- 1. Hero Section -->
    <section class="relative overflow-hidden pt-6 sm:pt-12">
      <!-- Background Ambient Glow -->
      <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-blue-500/10 blur-3xl pointer-events-none -z-10"></div>

      <div class="max-w-4xl mx-auto text-center space-y-6 px-4">
        <!-- Webinar Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-sm">
          <Sparkles class="w-3.5 h-3.5 text-indigo-500" />
          <span>Code. Build. Deploy: Webinar Companion</span>
        </div>

        <!-- Main Headline -->
        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          Your Portfolio <br class="hidden sm:inline" />
          <span class="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Starts Here.
          </span>
        </h1>

        <!-- Supporting Subtext -->
        <p class="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Turn your skills, projects, and educational journey into a precise, high-performance <span class="font-semibold text-slate-900 dark:text-white">AI coding prompt</span>. Generate a static site with your favorite AI assistant, then deploy live with GitHub Actions.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button 
            @click="handleStartBuilding"
            class="btn-primary w-full sm:w-auto text-base py-3 px-8 shadow-lg shadow-indigo-500/25 group"
          >
            Create My Portfolio Prompt
            <ArrowRight class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </button>

          <button 
            @click="handleTrySample"
            class="btn-secondary w-full sm:w-auto text-sm py-3 px-6"
          >
            <Sparkles class="w-4 h-4 mr-2 text-indigo-500" />
            Try Sample Profile
          </button>
        </div>

        <!-- Trust Badges -->
        <div class="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          <span class="flex items-center gap-1.5">
            <CheckCircle2 class="w-4 h-4 text-emerald-500" />
            100% Free & Open
          </span>
          <span class="flex items-center gap-1.5">
            <CheckCircle2 class="w-4 h-4 text-emerald-500" />
            No Account Needed
          </span>
          <span class="flex items-center gap-1.5">
            <CheckCircle2 class="w-4 h-4 text-emerald-500" />
            Local Browser Storage
          </span>
        </div>
      </div>

      <!-- Hero Visual Workflow Demonstration -->
      <div class="mt-14 max-w-5xl mx-auto px-4">
        <div class="card-surface p-4 sm:p-6 bg-gradient-to-b from-slate-900 to-slate-950 text-white border-slate-800 shadow-2xl overflow-hidden relative">
          <!-- Window Header Bar -->
          <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs font-mono text-slate-400">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span class="ml-2 text-slate-300 font-semibold">portfolio-launchpad-workflow.sh</span>
            </div>
            <span class="text-indigo-400">Deterministic Engine</span>
          </div>

          <!-- 3-Column Diagram Mockup -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <!-- Step A: User Data -->
            <div class="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2">
              <div class="flex items-center gap-2 text-indigo-400 font-semibold text-xs">
                <Layers class="w-4 h-4" />
                1. Your Real Details
              </div>
              <p class="text-slate-400 text-[11px] leading-relaxed">
                Enter your bio, skills, coursework, and personal projects into the guided 5-step wizard.
              </p>
              <div class="font-mono text-[10px] bg-slate-950 p-2 rounded text-slate-300">
                name: "Alex Morgan"<br/>
                skills: ["TypeScript", "Vue", "Tailwind"]<br/>
                projects: [2 items]
              </div>
            </div>

            <!-- Step B: Prompt Generation -->
            <div class="bg-slate-900/90 rounded-xl p-4 border border-indigo-500/40 space-y-2 ring-1 ring-indigo-500/30">
              <div class="flex items-center gap-2 text-indigo-300 font-semibold text-xs">
                <Terminal class="w-4 h-4 text-indigo-400" />
                2. AI Prompt Engine
              </div>
              <p class="text-slate-400 text-[11px] leading-relaxed">
                Deterministic prompt generated locally. Includes HTML/CSS constraints and prevents hallucinated facts.
              </p>
              <div class="font-mono text-[10px] bg-slate-950 p-2 rounded text-emerald-400">
                &gt; Copy structured prompt<br/>
                &gt; Paste into ChatGPT / Gemini<br/>
                &gt; Receive complete source files
              </div>
            </div>

            <!-- Step C: Deploy Live -->
            <div class="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2">
              <div class="flex items-center gap-2 text-purple-400 font-semibold text-xs">
                <GitBranch class="w-4 h-4" />
                3. Push & Deploy Live
              </div>
              <p class="text-slate-400 text-[11px] leading-relaxed">
                Put files in VS Code, push to GitHub, and deploy with our ready-to-use GitHub Actions workflow.
              </p>
              <div class="font-mono text-[10px] bg-slate-950 p-2 rounded text-purple-300">
                git push origin main<br/>
                GitHub Actions ➔ Pages<br/>
                Live at username.github.io/portfolio
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. How It Works Section -->
    <section id="how-it-works" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="text-center space-y-3 max-w-2xl mx-auto">
        <h2 class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          How It Works
        </h2>
        <p class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Four Simple Steps to a Live Portfolio
        </p>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Designed specifically for students, fresh grads, and developers preparing for the job market.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Step 1 -->
        <div class="card-surface p-6 space-y-3 relative">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base shadow-sm">
            1
          </div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Tell Us About Yourself</h3>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Fill in your name, target role, education, technical skills, and any projects. No prior job experience required.
          </p>
        </div>

        <!-- Step 2 -->
        <div class="card-surface p-6 space-y-3 relative">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base shadow-sm">
            2
          </div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Customize Design</h3>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Pick your preferred visual aesthetic (Modern, Minimal, Creative, Developer), color palette, and desired sections.
          </p>
        </div>

        <!-- Step 3 -->
        <div class="card-surface p-6 space-y-3 relative">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base shadow-sm">
            3
          </div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Generate Your Prompt</h3>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Get a structured AI prompt engineered to output static HTML5, CSS3, and JavaScript without hallucinating fake work history.
          </p>
        </div>

        <!-- Step 4 -->
        <div class="card-surface p-6 space-y-3 relative">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base shadow-sm">
            4
          </div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Build & Deploy</h3>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Paste into ChatGPT/Gemini, save the files locally in VS Code, push to GitHub, and deploy with GitHub Actions.
          </p>
        </div>
      </div>
    </section>

    <!-- 3. Key Features Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="text-center space-y-3 max-w-2xl mx-auto">
        <h2 class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Key Features
        </h2>
        <p class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Everything You Need to Plan Your Portfolio
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card-surface p-6 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Layers class="w-5 h-5" />
          </div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Guided 5-Step Wizard</h3>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Structured form that validates required fields, prevents loss of progress, and saves your draft to localStorage automatically.
          </p>
        </div>

        <div class="card-surface p-6 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <ShieldCheck class="w-5 h-5" />
          </div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Truthfulness Guardrails</h3>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            The prompt generator enforces strict anti-hallucination rules so AI assistants never invent fake jobs, metrics, or credentials.
          </p>
        </div>

        <div class="card-surface p-6 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Code2 class="w-5 h-5" />
          </div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">GitHub Pages Ready</h3>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Prompts explicitly constrain the code to static HTML5/CSS/JS with relative asset paths suitable for GitHub Pages hosting.
          </p>
        </div>

        <div class="card-surface p-6 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Palette class="w-5 h-5" />
          </div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Design Customization</h3>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Choose from curated style archetypes (Minimal, Modern, Creative, Developer), color presets, and dark/light themes.
          </p>
        </div>

        <div class="card-surface p-6 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <FileCode class="w-5 h-5" />
          </div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Markdown Export</h3>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Copy to clipboard in one click or download the generated prompt and portfolio brief directly as clean .md files.
          </p>
        </div>

        <div class="card-surface p-6 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <BookOpen class="w-5 h-5" />
          </div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Deployment Walkthrough</h3>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Includes a 10-step educational guide covering Git initialization, repository setup, and GitHub Actions configuration.
          </p>
        </div>
      </div>
    </section>

    <!-- 4. Webinar Callout Box -->
    <section class="max-w-5xl mx-auto px-4">
      <div class="p-8 sm:p-10 rounded-3xl bg-gradient-to-tr from-indigo-900 via-indigo-950 to-slate-900 text-white border border-indigo-800/80 shadow-xl relative overflow-hidden">
        <div class="relative z-10 max-w-2xl space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-indigo-400">Webinar Focus</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            "Code. Build. Deploy: Launch Your Portfolio with GitHub Actions"
          </h2>
          <p class="text-xs sm:text-sm text-indigo-200 leading-relaxed">
            This tool eliminates the blank-canvas syndrome for students and aspiring developers. After generating your prompt, follow our in-app guide to set up a free CI/CD deployment pipeline with GitHub Actions.
          </p>
          <div class="pt-2 flex flex-wrap items-center gap-3">
            <router-link to="/learn/deploy" class="btn-secondary bg-white text-slate-900 hover:bg-slate-100 text-xs font-semibold py-2.5 px-5">
              Read Deployment Guide
            </router-link>
            <router-link to="/builder" class="btn-primary text-xs font-semibold py-2.5 px-5">
              Launch Builder
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Final CTA -->
    <section class="max-w-4xl mx-auto px-4 text-center space-y-6 pt-6">
      <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Ready to Launch Your Personal Portfolio?
      </h2>
      <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
        No account required. Your information stays private on your machine until you copy it.
      </p>
      <div>
        <button 
          @click="handleStartBuilding"
          class="btn-primary text-base py-3.5 px-8 shadow-xl shadow-indigo-500/30"
        >
          <Rocket class="w-5 h-5 mr-2" />
          Start Building Your Prompt
        </button>
      </div>
    </section>

  </div>
</template>
