<script setup lang="ts">
import { useRouter } from 'vue-router'
import { 
  Rocket, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  BookOpen,
  Terminal,
  CheckCircle2,
  Sparkles
} from 'lucide-vue-next'

const router = useRouter()

function handleStartBuilding() {
  router.push('/builder')
}

function scrollToHowItWorks() {
  const el = document.getElementById('how-it-works')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="space-y-20 sm:space-y-28 py-6 sm:py-12">
    
    <!-- 1. Hero Section -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-7">
      
      <!-- Webinar Tag -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2EEFF] dark:bg-brand-950/60 border border-[#E8E8EF] dark:border-[#232738] text-[#6D4AFF] dark:text-brand-300 text-xs font-semibold">
        <Sparkles class="w-3.5 h-3.5 text-[#6D4AFF]" />
        <span>Webinar Companion • Code. Build. Deploy.</span>
      </div>

      <!-- Main Headline -->
      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#181824] dark:text-[#F3F4F8] leading-[1.15]">
        Your Story. Your Skills. <br />
        <span class="text-[#6D4AFF]">
          Your Next Portfolio.
        </span>
      </h1>

      <!-- Supporting Subtext -->
      <p class="text-base sm:text-lg text-[#737385] dark:text-[#9496A8] max-w-2xl mx-auto leading-relaxed">
        Transform your experience, projects, and ideas into a structured AI-ready prompt. Generate complete static source code with your favorite AI coding assistant, then deploy live with GitHub Actions.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button 
          @click="handleStartBuilding"
          class="btn-primary w-full sm:w-auto text-sm sm:text-base py-3 px-8 shadow-sm group"
        >
          Start Building
          <ArrowRight class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </button>

        <button 
          @click="scrollToHowItWorks"
          class="btn-secondary w-full sm:w-auto text-sm sm:text-base py-3 px-6"
        >
          See How It Works
        </button>
      </div>

      <!-- Trust Badges -->
      <div class="pt-2 flex flex-wrap items-center justify-center gap-5 text-xs text-[#737385] dark:text-[#9496A8]">
        <span class="flex items-center gap-1.5">
          <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          No Account Required
        </span>
        <span>•</span>
        <span class="flex items-center gap-1.5">
          <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          100% Client-Side
        </span>
        <span>•</span>
        <span class="flex items-center gap-1.5">
          <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          GitHub Actions Ready
        </span>
      </div>

      <!-- Realistic Product Preview Showcase -->
      <div class="pt-8 max-w-4xl mx-auto">
        <div class="card-surface overflow-hidden border border-[#E8E8EF] dark:border-[#232738] shadow-elevated text-left">
          
          <!-- Mockup Window Header -->
          <div class="bg-[#FAFAFC] dark:bg-[#0B0D17] px-4 py-3 border-b border-[#E8E8EF] dark:border-[#232738] flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-400/80"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
              <span class="ml-2 text-xs font-mono text-[#737385] dark:text-[#9496A8]">portfolio-prompt-generator</span>
            </div>
            <span class="text-[10px] font-semibold text-[#6D4AFF] bg-[#F2EEFF] dark:bg-[#1A2033] px-2 py-0.5 rounded-md">
              AI Output Ready
            </span>
          </div>

          <!-- Mockup Body Content -->
          <div class="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-[#141827]">
            <!-- Left: Structured Inputs -->
            <div class="space-y-3">
              <div class="text-xs font-bold uppercase tracking-wider text-[#6D4AFF]">
                01. Your Verified Profile
              </div>
              <div class="p-3.5 rounded-xl bg-[#FAFAFC] dark:bg-[#0B0D17]/60 border border-[#E8E8EF] dark:border-[#232738] space-y-2 text-xs">
                <div class="flex justify-between">
                  <span class="text-[#737385] dark:text-[#9496A8]">Name:</span>
                  <span class="font-bold text-[#181824] dark:text-[#F3F4F8]">Alex Morgan</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-[#737385] dark:text-[#9496A8]">Role:</span>
                  <span class="font-medium text-[#181824] dark:text-[#F3F4F8]">Frontend Developer</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-[#737385] dark:text-[#9496A8]">Skills:</span>
                  <span class="text-[#6D4AFF] font-medium">Vue.js, TypeScript, Tailwind</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-[#737385] dark:text-[#9496A8]">Projects:</span>
                  <span class="text-[#181824] dark:text-[#F3F4F8]">2 builds documented</span>
                </div>
              </div>
            </div>

            <!-- Right: Deterministic AI Prompt -->
            <div class="space-y-3">
              <div class="text-xs font-bold uppercase tracking-wider text-[#6D4AFF]">
                02. Generated Prompt Output
              </div>
              <div class="p-3.5 rounded-xl bg-[#0B0D17] text-[#F3F4F8] font-mono text-[11px] leading-relaxed space-y-1 overflow-hidden max-h-[140px]">
                <p class="text-[#6D4AFF]">&gt; Act as Senior Frontend Developer</p>
                <p class="text-slate-300">&gt; Build static portfolio for Alex Morgan</p>
                <p class="text-emerald-400">&gt; Constraints: HTML5, CSS3, Vanilla JS</p>
                <p class="text-slate-400">&gt; Strict: No fabricated experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. How It Works Section -->
    <section id="how-it-works" class="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
      <div class="text-center space-y-2 max-w-xl mx-auto">
        <h2 class="text-xs font-bold uppercase tracking-wider text-[#6D4AFF]">
          How It Works
        </h2>
        <p class="text-2xl sm:text-3xl font-extrabold text-[#181824] dark:text-[#F3F4F8] tracking-tight">
          Four Simple Steps to a Live Portfolio
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="card-surface p-5 space-y-2.5">
          <div class="text-xs font-mono font-bold text-[#6D4AFF]">01</div>
          <h3 class="text-sm font-bold text-[#181824] dark:text-[#F3F4F8]">Add Your Details</h3>
          <p class="text-xs text-[#737385] dark:text-[#9496A8] leading-relaxed">
            Enter your name, role, skills, coursework, and personal projects. No previous job experience required.
          </p>
        </div>

        <div class="card-surface p-5 space-y-2.5">
          <div class="text-xs font-mono font-bold text-[#6D4AFF]">02</div>
          <h3 class="text-sm font-bold text-[#181824] dark:text-[#F3F4F8]">Choose Your Style</h3>
          <p class="text-xs text-[#737385] dark:text-[#9496A8] leading-relaxed">
            Select an aesthetic (Minimalist, Modern, Creative, Developer) and your preferred color palette.
          </p>
        </div>

        <div class="card-surface p-5 space-y-2.5">
          <div class="text-xs font-mono font-bold text-[#6D4AFF]">03</div>
          <h3 class="text-sm font-bold text-[#181824] dark:text-[#F3F4F8]">Generate Your Prompt</h3>
          <p class="text-xs text-[#737385] dark:text-[#9496A8] leading-relaxed">
            Receive a deterministic prompt tailored to HTML5/CSS/JS constraints without hallucinated claims.
          </p>
        </div>

        <div class="card-surface p-5 space-y-2.5">
          <div class="text-xs font-mono font-bold text-[#6D4AFF]">04</div>
          <h3 class="text-sm font-bold text-[#181824] dark:text-[#F3F4F8]">Build & Deploy</h3>
          <p class="text-xs text-[#737385] dark:text-[#9496A8] leading-relaxed">
            Paste into ChatGPT/Gemini, save files in VS Code, push to GitHub, and deploy with GitHub Actions.
          </p>
        </div>
      </div>
    </section>

    <!-- 3. Key Feature Highlights -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
      <div class="text-center space-y-2 max-w-xl mx-auto">
        <h2 class="text-xs font-bold uppercase tracking-wider text-[#6D4AFF]">
          Core Capabilities
        </h2>
        <p class="text-2xl sm:text-3xl font-extrabold text-[#181824] dark:text-[#F3F4F8] tracking-tight">
          Everything You Need to Plan and Launch
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="card-surface p-6 space-y-2.5">
          <div class="w-9 h-9 rounded-xl bg-[#F2EEFF] dark:bg-brand-950/60 text-[#6D4AFF] flex items-center justify-center">
            <Layers class="w-4 h-4" />
          </div>
          <h3 class="text-base font-bold text-[#181824] dark:text-[#F3F4F8]">Guided Portfolio Builder</h3>
          <p class="text-xs text-[#737385] dark:text-[#9496A8] leading-relaxed">
            A structured 5-step form experience that validates required fields, saves progress automatically to browser localStorage, and supports instant demo profiles.
          </p>
        </div>

        <div class="card-surface p-6 space-y-2.5">
          <div class="w-9 h-9 rounded-xl bg-[#F2EEFF] dark:bg-brand-950/60 text-[#6D4AFF] flex items-center justify-center">
            <Terminal class="w-4 h-4" />
          </div>
          <h3 class="text-base font-bold text-[#181824] dark:text-[#F3F4F8]">Personalized Prompt Generation</h3>
          <p class="text-xs text-[#737385] dark:text-[#9496A8] leading-relaxed">
            Deterministic prompt compilation that strictly prevents AI hallucinations. Enforces static GitHub Pages compatibility with relative asset links.
          </p>
        </div>

        <div class="card-surface p-6 space-y-2.5">
          <div class="w-9 h-9 rounded-xl bg-[#F2EEFF] dark:bg-brand-950/60 text-[#6D4AFF] flex items-center justify-center">
            <ShieldCheck class="w-4 h-4" />
          </div>
          <h3 class="text-base font-bold text-[#181824] dark:text-[#F3F4F8]">Privacy-Friendly Local Storage</h3>
          <p class="text-xs text-[#737385] dark:text-[#9496A8] leading-relaxed">
            Your inputs never leave your computer. We operate zero cloud databases, zero telemetry tracking, and zero direct AI API requests.
          </p>
        </div>

        <div class="card-surface p-6 space-y-2.5">
          <div class="w-9 h-9 rounded-xl bg-[#F2EEFF] dark:bg-brand-950/60 text-[#6D4AFF] flex items-center justify-center">
            <BookOpen class="w-4 h-4" />
          </div>
          <h3 class="text-base font-bold text-[#181824] dark:text-[#F3F4F8]">Deployment Learning Guide</h3>
          <p class="text-xs text-[#737385] dark:text-[#9496A8] leading-relaxed">
            An interactive 10-step guide complete with ready-to-copy Git commands and verified GitHub Actions CI/CD workflows for automated publishing.
          </p>
        </div>
      </div>
    </section>

    <!-- 4. Final Clean CTA -->
    <section class="max-w-4xl mx-auto px-4 text-center space-y-6">
      <div class="p-8 sm:p-12 rounded-3xl bg-[#F2EEFF]/60 dark:bg-[#141827] border border-[#E8E8EF] dark:border-[#232738] space-y-4">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#181824] dark:text-[#F3F4F8] tracking-tight">
          Ready to Build Your Portfolio Prompt?
        </h2>
        <p class="text-xs sm:text-sm text-[#737385] dark:text-[#9496A8] max-w-md mx-auto leading-relaxed">
          Start for free in 5 minutes. No sign-up required. Your draft is saved locally in your browser.
        </p>
        <div class="pt-2">
          <button 
            @click="handleStartBuilding"
            class="btn-primary text-sm py-3 px-8 shadow-sm"
          >
            <Rocket class="w-4 h-4 mr-2" />
            Start Building Now
          </button>
        </div>
      </div>
    </section>

  </div>
</template>
