<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowRight, 
  ArrowUpRight,
  Sparkles,
  Layers, 
  Code2,
  GitBranch,
  Rocket
} from 'lucide-vue-next'

const router = useRouter()
const activeTab = ref<'profile' | 'projects' | 'design' | 'output'>('profile')

function handleStartBuilding() {
  router.push('/builder')
}

function scrollToProcess() {
  const el = document.getElementById('process')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="landing-stage w-full bg-[#0F0F15] text-[#17171D] dark:text-[#F7F6FA] overflow-x-hidden">
    
    <!-- UPPER HERO SHEET: Distinct light stage physically layered above dark stage -->
    <div class="w-full bg-[#0F0F15]">
      <section class="upper-hero-sheet relative z-10 w-full bg-white dark:bg-[#20202B] border-b border-[#E8E8EF]/80 dark:border-[#414151]/70 rounded-b-[44px] sm:rounded-b-[72px] lg:rounded-b-[96px] shadow-sm transition-colors">
        
        <!-- Decorative Starburst Accent (Hidden on mobile to prevent cluttering headline, top right on sm+) -->
        <div class="absolute top-8 right-8 sm:right-14 text-[#6947FF] dark:text-[#987AFF] hidden sm:block pointer-events-none">
          <svg class="w-6 h-6 animate-spin-slow" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>

        <!-- Hero Sheet Content Container -->
        <div class="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-14 pb-14 sm:pb-20 lg:pb-24">
          
          <div class="max-w-5xl mx-auto text-center space-y-7 sm:space-y-8 relative z-10">

            <!-- Bold Centered Headline with fluid, prominent mobile typography -->
            <h1 class="font-display text-[clamp(2.5rem,10.6vw,3.25rem)] sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#17171D] dark:text-[#F7F6FA] leading-[1.06] sm:leading-[1.05] pt-1 sm:pt-2 max-w-4xl mx-auto [text-wrap:balance]">
              Your work deserves <br class="hidden sm:inline" />
              to be <span class="relative inline-block text-[#6947FF] dark:text-[#805EFF]">
                seen.
                <svg class="absolute -bottom-2 left-0 w-full h-2 text-[#6947FF] dark:text-[#805EFF]" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" />
                </svg>
              </span>
            </h1>

            <!-- Responsive Hero Grid (Centered on Mobile, 2-Column on Tablet/Desktop md+) -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-7 sm:gap-8 lg:gap-12 items-center text-left pt-2">
              
              <!-- Left/Main: Human Intro Paragraph & Actions (Full width on mobile, 6/7 cols on desktop) -->
              <div class="md:col-span-12 lg:col-span-6 space-y-5 sm:space-y-6">
                <div class="space-y-2">
                  <span class="text-xs font-mono uppercase text-[#6947FF] dark:text-[#987AFF] font-bold tracking-wider block">
                    The Prompt Builder
                  </span>
                  <p class="text-sm sm:text-base text-[#6D6D7A] dark:text-[#C3C0D0] leading-relaxed max-w-xl">
                    Bring your skills, projects, and experience together. We turn them into a clear AI-ready prompt so you can generate and deploy your portfolio with GitHub Actions.
                  </p>
                </div>

                <!-- Primary and Secondary Actions (Responsive full-width on tiny screens, natural inline on larger) -->
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                  <button 
                    @click="handleStartBuilding"
                    class="btn-primary py-3 px-6 text-sm font-semibold shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <span>Build Your Prompt</span>
                    <ArrowRight class="w-4 h-4" />
                  </button>
                  <button 
                    @click="scrollToProcess"
                    class="btn-secondary py-3 px-5 text-sm w-full sm:w-auto text-center"
                  >
                    <span>How It Works</span>
                    <ArrowRight class="w-3.5 h-3.5 ml-1 text-[#6D6D7A] dark:text-[#C3C0D0] inline" />
                  </button>
                </div>
              </div>

              <!-- Right: Tactile Creative Brief Artifact (Hidden on mobile below md, visible on tablet/desktop md+) -->
              <div class="hidden md:block md:col-span-12 lg:col-span-6 min-w-0">
                <div class="p-5 sm:p-6 rounded-3xl bg-[#F7F7F9] dark:bg-[#292936] border border-[#E8E8EF] dark:border-[#414151]/80 shadow-sm space-y-3.5 sm:space-y-4 relative group hover:border-[#6947FF]/40 dark:hover:border-[#805EFF]/50 transition-colors">
                  
                  <div class="flex items-center justify-between border-b border-[#E8E8EF] dark:border-[#414151]/60 pb-3">
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded-lg bg-[#6947FF] dark:bg-[#805EFF] text-white flex items-center justify-center">
                        <Rocket class="w-3.5 h-3.5" />
                      </div>
                      <span class="font-mono text-[11px] font-bold text-[#17171D] dark:text-[#F7F6FA]">
                        PORTFOLIO BRIEF // 01
                      </span>
                    </div>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200/50 dark:border-emerald-800/40">
                      AI-Ready
                    </span>
                  </div>

                  <div class="space-y-2.5 text-xs">
                    <div class="flex flex-wrap justify-between items-start gap-2">
                      <div class="min-w-0">
                        <span class="font-bold text-sm text-[#17171D] dark:text-[#F7F6FA] block truncate">Alex Morgan</span>
                        <span class="text-[11px] text-[#6D6D7A] dark:text-[#C3C0D0] block">Aspiring Frontend Engineer</span>
                      </div>
                      <div class="flex flex-wrap gap-1">
                        <span class="px-1.5 py-0.5 rounded bg-white dark:bg-[#323241] border border-[#E8E8EF] dark:border-[#414151] text-[10px] font-medium text-[#17171D] dark:text-[#F7F6FA]">Vue.js</span>
                        <span class="px-1.5 py-0.5 rounded bg-white dark:bg-[#323241] border border-[#E8E8EF] dark:border-[#414151] text-[10px] font-medium text-[#17171D] dark:text-[#F7F6FA]">TypeScript</span>
                      </div>
                    </div>
                    
                    <div class="p-2.5 rounded-xl bg-white dark:bg-[#323241] border border-[#E8E8EF] dark:border-[#414151] text-[11px] text-[#6D6D7A] dark:text-[#C3C0D0] space-y-1">
                      <span class="font-semibold text-[#17171D] dark:text-[#F7F6FA] block">Specification Target:</span>
                      <p class="leading-tight">Static HTML5/CSS3/Vanilla JS • High Contrast • GitHub Pages CI/CD</p>
                    </div>
                  </div>

                  <!-- Subtle supporting interactive caption -->
                  <div class="pt-1 text-center">
                    <span class="text-[11px] font-mono text-[#6947FF] dark:text-[#987AFF]">
                      Deterministic brief generator • Zero hallucinated claims
                    </span>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>

    <!-- DARK LOWER STAGE: Continuous Full-Width Stage Flowing Directly Beneath the Upper Sheet -->
    <div class="lower-stage w-full bg-[#0F0F15] text-[#F1F2F6] pt-10 sm:pt-14 pb-20 sm:pb-28 space-y-16 sm:space-y-24">
      
      <!-- INTEGRATED STATISTICS SECTION: Directly beginning the Dark Lower Stage -->
      <section class="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-left border-b border-[#242738]/60 pb-12 sm:pb-16">
          
          <!-- Metric 1: 5+ Starter Personas -->
          <div class="space-y-1 border-r border-[#242738]/50 pr-2 last:border-none md:last:border-none">
            <div class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight flex items-baseline gap-1">
              <span>5</span><span class="text-[#6947FF]">+</span>
            </div>
            <p class="text-xs sm:text-sm text-[#ACACBA] font-medium">Starter Personas</p>
          </div>

          <!-- Metric 2: 100% Client-Side & Private -->
          <div class="space-y-1 border-r-0 md:border-r md:border-[#242738]/50 md:pr-2">
            <div class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight flex items-baseline gap-1">
              <span>100</span><span class="text-[#6947FF]">%</span>
            </div>
            <p class="text-xs sm:text-sm text-[#ACACBA] font-medium">Client-Side & Private</p>
          </div>

          <!-- Metric 3: 0DBs Zero Cloud Tracking -->
          <div class="space-y-1 border-r border-[#242738]/50 pr-2 last:border-none md:last:border-none">
            <div class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight flex items-baseline gap-1">
              <span>0</span><span class="text-[#6947FF]">DBs</span>
            </div>
            <p class="text-xs sm:text-sm text-[#ACACBA] font-medium">Zero Cloud Tracking</p>
          </div>

          <!-- Metric 4: CI/CD GitHub Actions Ready -->
          <div class="space-y-1">
            <div class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight flex items-baseline gap-1">
              <span>CI/CD</span>
            </div>
            <p class="text-xs sm:text-sm text-[#ACACBA] font-medium">GitHub Actions Ready</p>
          </div>

        </div>
      </section>

    <!-- SECTION B — THE TRANSFORMATION: Dark Editorial Narrative -->
    <section id="process" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#242738] pb-8">
        <div class="space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-[#6947FF]/20 text-[#B096FF] border border-[#6947FF]/30">
            <span>01 // THE PROCESS</span>
          </div>
          <h2 class="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Turning Ideas Into <br />
            <span class="text-[#6947FF]">Launch-Ready Portfolios</span>
          </h2>
        </div>
        <p class="text-sm text-[#9496A6] max-w-md leading-relaxed">
          We turn your raw details into structured, hallucination-free AI coding prompts that result in clean HTML5, CSS3, and JavaScript repositories.
        </p>
      </div>

      <!-- Asymmetrical Editorial Showcase (Left Card + Right Card) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left Big Card: The Prompt Builder Purpose (7 cols) -->
        <div class="lg:col-span-7 bg-[#161822] border border-[#242738] rounded-3xl p-8 space-y-6 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-white/5 text-[#B096FF] border border-white/10">
              A PROMPT BUILDER FOR BUILDERS
            </div>
            <h3 class="font-display text-2xl sm:text-3xl font-bold text-white">
              No fabrication. Just your verified work.
            </h3>
            <p class="text-xs sm:text-sm text-[#9496A6] leading-relaxed">
              Standard AI prompts invent claims and create broken build chains. Portfolio Launchpad compiles strict rules for static GitHub Pages compatibility with relative links.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-3 pt-4 border-t border-[#242738] text-xs">
            <div class="p-3 rounded-2xl bg-[#0D0E12] border border-[#242738]">
              <span class="text-[10px] font-mono text-[#6947FF] block">01 INPUT</span>
              <span class="font-bold text-white">Personal Data</span>
            </div>
            <div class="p-3 rounded-2xl bg-[#0D0E12] border border-[#242738]">
              <span class="text-[10px] font-mono text-[#6947FF] block">02 COMPILE</span>
              <span class="font-bold text-white">Brief Specs</span>
            </div>
            <div class="p-3 rounded-2xl bg-[#0D0E12] border border-[#242738]">
              <span class="text-[10px] font-mono text-[#6947FF] block">03 DEPLOY</span>
              <span class="font-bold text-white">GitHub Pages</span>
            </div>
          </div>
        </div>

        <!-- Right Card: Editorial Persona Snapshot (5 cols) -->
        <div class="lg:col-span-5 bg-[#161822] border border-[#242738] rounded-3xl p-8 space-y-6 flex flex-col justify-between">
          <div class="space-y-3">
            <span class="text-xs font-mono text-[#6947FF] font-bold block">
              PERSONA HARNESS
            </span>
            <h3 class="font-display text-xl sm:text-2xl font-bold text-white">
              5 Preloaded Student Personas
            </h3>
            <p class="text-xs text-[#9496A6] leading-relaxed">
              Test the workflow instantly with realistic developer, designer, fresh graduate, and analyst fixtures without typing.
            </p>
          </div>

          <div class="p-4 rounded-2xl bg-[#0D0E12] border border-[#242738] space-y-2 text-xs">
            <div class="flex justify-between items-center text-[#B096FF] font-mono text-[11px]">
              <span>SAMPLE FIXTURES</span>
              <span>v1.0</span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span class="px-2 py-1 rounded-lg bg-[#161822] border border-[#242738] text-[11px] text-white">Alex Morgan (CS)</span>
              <span class="px-2 py-1 rounded-lg bg-[#161822] border border-[#242738] text-[11px] text-white">Jamie Reyes (Frontend)</span>
              <span class="px-2 py-1 rounded-lg bg-[#161822] border border-[#242738] text-[11px] text-white">Taylor Santos (UI/UX)</span>
            </div>
          </div>
        </div>

      </div>

      <!-- 4-Stage Horizontal Progression Timeline -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        
        <div class="p-5 rounded-2xl bg-[#161822] border border-[#242738] space-y-2">
          <div class="font-display text-2xl font-bold text-[#6947FF]">01</div>
          <h4 class="text-sm font-bold text-white">Define Profile</h4>
          <p class="text-xs text-[#9496A6] leading-relaxed">
            Enter your headline, contact links, verified skills, and coursework.
          </p>
        </div>

        <div class="p-5 rounded-2xl bg-[#161822] border border-[#242738] space-y-2">
          <div class="font-display text-2xl font-bold text-[#6947FF]">02</div>
          <h4 class="text-sm font-bold text-white">Shape Direction</h4>
          <p class="text-xs text-[#9496A6] leading-relaxed">
            Select aesthetic constraints, color palette, and portfolio sections.
          </p>
        </div>

        <div class="p-5 rounded-2xl bg-[#161822] border border-[#242738] space-y-2">
          <div class="font-display text-2xl font-bold text-[#6947FF]">03</div>
          <h4 class="text-sm font-bold text-white">Generate Prompt</h4>
          <p class="text-xs text-[#9496A6] leading-relaxed">
            Receive deterministic prompt ready for ChatGPT, Gemini, or Claude.
          </p>
        </div>

        <div class="p-5 rounded-2xl bg-[#161822] border border-[#242738] space-y-2">
          <div class="font-display text-2xl font-bold text-[#6947FF]">04</div>
          <h4 class="text-sm font-bold text-white">Build & Deploy</h4>
          <p class="text-xs text-[#9496A6] leading-relaxed">
            Save in VS Code, push to GitHub, and deploy with GitHub Actions.
          </p>
        </div>

      </div>

    </section>

    <!-- SECTION C — BUILDER SHOWCASE: Creatix-Inspired "Our Capabilities" Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <div class="bg-[#161822] border border-[#242738] rounded-3xl lg:rounded-[3rem] p-8 sm:p-12 lg:p-14 space-y-8">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#242738] pb-6">
          <div class="space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-[#6947FF]/20 text-[#B096FF] border border-[#6947FF]/30">
              <span>02 // THE BUILDER</span>
            </div>
            <h2 class="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Our Builder <span class="text-[#6947FF]">Capabilities</span>
            </h2>
          </div>
          <p class="text-xs sm:text-sm text-[#9496A6] max-w-md leading-relaxed">
            Structured inputs designed to prevent AI hallucinations and enforce static web standards.
          </p>
        </div>

        <!-- 2-Zone Layout: Left Pill Buttons + Right Interactive Card -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Left: Creatix-Style Pill Capabilities List (5 cols) -->
          <div class="lg:col-span-5 space-y-2.5">
            <button 
              type="button"
              @click="activeTab = 'profile'"
              class="w-full text-left px-5 py-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between"
              :class="activeTab === 'profile' 
                ? 'border-[#6947FF] bg-[#6947FF]/15 text-white font-semibold' 
                : 'border-[#242738] bg-[#0D0E12] text-[#9496A6] hover:text-white hover:border-slate-700'"
            >
              <span>01 &nbsp; Personal Profile & Bio</span>
              <ArrowRight class="w-4 h-4 text-[#6947FF]" />
            </button>

            <button 
              type="button"
              @click="activeTab = 'projects'"
              class="w-full text-left px-5 py-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between"
              :class="activeTab === 'projects' 
                ? 'border-[#6947FF] bg-[#6947FF]/15 text-white font-semibold' 
                : 'border-[#242738] bg-[#0D0E12] text-[#9496A6] hover:text-white hover:border-slate-700'"
            >
              <span>02 &nbsp; Tech Stack & Projects</span>
              <ArrowRight class="w-4 h-4 text-[#6947FF]" />
            </button>

            <button 
              type="button"
              @click="activeTab = 'design'"
              class="w-full text-left px-5 py-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between"
              :class="activeTab === 'design' 
                ? 'border-[#6947FF] bg-[#6947FF]/15 text-white font-semibold' 
                : 'border-[#242738] bg-[#0D0E12] text-[#9496A6] hover:text-white hover:border-slate-700'"
            >
              <span>03 &nbsp; Aesthetic Direction</span>
              <ArrowRight class="w-4 h-4 text-[#6947FF]" />
            </button>

            <button 
              type="button"
              @click="activeTab = 'output'"
              class="w-full text-left px-5 py-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between"
              :class="activeTab === 'output' 
                ? 'border-[#6947FF] bg-[#6947FF]/15 text-white font-semibold' 
                : 'border-[#242738] bg-[#0D0E12] text-[#9496A6] hover:text-white hover:border-slate-700'"
            >
              <span>04 &nbsp; AI Prompt Deliverable</span>
              <ArrowRight class="w-4 h-4 text-[#6947FF]" />
            </button>
          </div>

          <!-- Right: Interactive Showcase Display (7 cols) -->
          <div class="lg:col-span-7 bg-[#0D0E12] border border-[#242738] rounded-3xl p-6 sm:p-8 space-y-4">
            
            <div v-if="activeTab === 'profile'" class="space-y-4 animate-fadeIn">
              <div class="flex items-center justify-between pb-3 border-b border-[#242738]">
                <span class="text-xs font-mono text-[#B096FF]">DIMENSION // PROFILE & IDENTITY</span>
                <span class="text-xs font-semibold text-emerald-400">Zero Hallucinations</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div class="p-3.5 rounded-xl bg-[#161822] border border-[#242738] space-y-1">
                  <span class="text-[10px] uppercase font-mono text-[#9496A6]">Full Name</span>
                  <p class="font-bold text-white">Jamie Reyes</p>
                </div>
                <div class="p-3.5 rounded-xl bg-[#161822] border border-[#242738] space-y-1">
                  <span class="text-[10px] uppercase font-mono text-[#9496A6]">Target Role</span>
                  <p class="font-bold text-white">Fresh Graduate • CS Major</p>
                </div>
              </div>
              <div class="p-3.5 rounded-xl bg-[#161822] border border-[#242738] text-xs space-y-1">
                <span class="text-[10px] uppercase font-mono text-[#9496A6]">Bio Excerpt</span>
                <p class="text-[#9496A6] leading-relaxed">
                  Computer Science graduate passionate about full-stack web engineering, algorithms, and building accessible digital tools.
                </p>
              </div>
            </div>

            <div v-else-if="activeTab === 'projects'" class="space-y-4 animate-fadeIn">
              <div class="flex items-center justify-between pb-3 border-b border-[#242738]">
                <span class="text-xs font-mono text-[#B096FF]">DIMENSION // FEATURED BUILDS</span>
                <span class="text-xs font-semibold text-[#6947FF]">5 Personas Ready</span>
              </div>
              <div class="p-4 rounded-xl bg-[#161822] border border-[#242738] space-y-2 text-xs">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-white">EcoTrack Carbon Calculator</span>
                  <span class="text-[10px] font-mono text-emerald-400">Live Web App</span>
                </div>
                <p class="text-[#9496A6]">
                  A responsive web app that computes household carbon footprints with visual analytics charts.
                </p>
                <div class="flex gap-1.5 pt-1">
                  <span class="px-2 py-0.5 rounded bg-[#0D0E12] text-[10px] border border-[#242738] text-white">Vue 3</span>
                  <span class="px-2 py-0.5 rounded bg-[#0D0E12] text-[10px] border border-[#242738] text-white">Chart.js</span>
                  <span class="px-2 py-0.5 rounded bg-[#0D0E12] text-[10px] border border-[#242738] text-white">Tailwind</span>
                </div>
              </div>
            </div>

            <div v-else-if="activeTab === 'design'" class="space-y-4 animate-fadeIn">
              <div class="flex items-center justify-between pb-3 border-b border-[#242738]">
                <span class="text-xs font-mono text-[#B096FF]">DIMENSION // AESTHETIC DIRECTION</span>
                <span class="text-xs font-semibold text-[#6947FF]">4 Archetypes</span>
              </div>
              <div class="grid grid-cols-2 gap-3 text-xs">
                <div class="p-3.5 rounded-xl border border-[#6947FF] bg-[#6947FF]/15">
                  <span class="font-bold block text-white">Minimalist Clean</span>
                  <span class="text-[11px] text-[#9496A6]">Spacious typography & contrast</span>
                </div>
                <div class="p-3.5 rounded-xl border border-[#242738] bg-[#161822]">
                  <span class="font-bold block text-white">Developer Terminal</span>
                  <span class="text-[11px] text-[#9496A6]">Dark slate & code badges</span>
                </div>
              </div>
            </div>

            <div v-else-if="activeTab === 'output'" class="space-y-4 animate-fadeIn">
              <div class="flex items-center justify-between pb-3 border-b border-[#242738]">
                <span class="text-xs font-mono text-[#B096FF]">DIMENSION // PROMPT OUTPUT</span>
                <span class="text-xs font-semibold text-emerald-400">Ready for Claude & ChatGPT</span>
              </div>
              <div class="p-4 rounded-xl bg-[#161822] text-[#F1F2F6] font-mono text-xs space-y-1.5 border border-[#242738]">
                <p class="text-[#B096FF]"># PORTFOLIO SPECIFICATION FOR AI CODE GENERATION</p>
                <p class="text-slate-300">- Architecture: Clean Static HTML5 + CSS3 + JS</p>
                <p class="text-emerald-400">- Target CI: GitHub Actions Pages Deploy</p>
              </div>
            </div>

            <div class="pt-2 flex items-center justify-between">
              <span class="text-xs text-[#9496A6]">Takes ~3 minutes to complete.</span>
              <router-link to="/builder" class="btn-primary text-xs py-2 px-5">
                Open Builder
              </router-link>
            </div>

          </div>

        </div>

      </div>
    </section>

    <!-- FULL-WIDTH TICKER RIBBON (Creatix Style) -->
    <div class="w-full bg-[#161822] border-y border-[#242738] py-4 overflow-hidden">
      <div class="flex items-center justify-around gap-8 text-xs sm:text-sm font-display font-bold uppercase tracking-widest text-white/80 whitespace-nowrap">
        <span>CODE</span>
        <span class="text-[#6947FF]">✦</span>
        <span>BUILD</span>
        <span class="text-[#6947FF]">✦</span>
        <span>DEPLOY</span>
        <span class="text-[#6947FF]">✦</span>
        <span>LAUNCH</span>
        <span class="text-[#6947FF]">✦</span>
        <span>NO HALLUCINATIONS</span>
        <span class="text-[#6947FF]">✦</span>
        <span>GITHUB ACTIONS</span>
        <span class="text-[#6947FF]">✦</span>
        <span>STATIC SITES</span>
      </div>
    </div>

    <!-- SECTION D — DEPLOYMENT STORYTELLING: Code. Build. Deploy. -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="bg-[#161822] border border-[#242738] rounded-3xl lg:rounded-[3rem] p-8 sm:p-12 space-y-8">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#242738] pb-6">
          <div class="space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-[#6947FF]/20 text-[#B096FF] border border-[#6947FF]/30">
              <span>03 // DEPLOYMENT PIPELINE</span>
            </div>
            <h2 class="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Code. Build. Deploy.
            </h2>
            <p class="text-xs sm:text-sm text-[#9496A6] max-w-lg leading-relaxed">
              Generate static files with AI, commit to GitHub, and let GitHub Actions publish your live URL automatically.
            </p>
          </div>

          <div>
            <router-link 
              to="/learn/deploy" 
              class="btn-primary py-2.5 px-6 text-xs sm:text-sm font-semibold"
            >
              <span>Read Deployment Tutorial</span>
              <ArrowUpRight class="w-4 h-4 ml-1.5" />
            </router-link>
          </div>
        </div>

        <!-- 5-Stage Visual Workflow -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div class="p-4 rounded-2xl bg-[#0D0E12] border border-[#242738] space-y-2">
            <div class="text-[10px] font-mono text-[#6947FF]">STEP 01</div>
            <div class="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles class="w-3.5 h-3.5 text-[#6947FF]" />
              AI Prompt
            </div>
            <p class="text-[11px] text-[#9496A6]">Generate prompt from Launchpad</p>
          </div>

          <div class="p-4 rounded-2xl bg-[#0D0E12] border border-[#242738] space-y-2">
            <div class="text-[10px] font-mono text-[#6947FF]">STEP 02</div>
            <div class="text-xs font-bold text-white flex items-center gap-1.5">
              <Code2 class="w-3.5 h-3.5 text-blue-400" />
              Source Files
            </div>
            <p class="text-[11px] text-[#9496A6]">Save HTML, CSS, & JS in VS Code</p>
          </div>

          <div class="p-4 rounded-2xl bg-[#0D0E12] border border-[#242738] space-y-2">
            <div class="text-[10px] font-mono text-[#6947FF]">STEP 03</div>
            <div class="text-xs font-bold text-white flex items-center gap-1.5">
              <GitBranch class="w-3.5 h-3.5 text-amber-400" />
              Git Commit
            </div>
            <p class="text-[11px] text-[#9496A6]">Push to main on GitHub</p>
          </div>

          <div class="p-4 rounded-2xl bg-[#0D0E12] border border-[#242738] space-y-2">
            <div class="text-[10px] font-mono text-[#6947FF]">STEP 04</div>
            <div class="text-xs font-bold text-white flex items-center gap-1.5">
              <Layers class="w-3.5 h-3.5 text-emerald-400" />
              GitHub Actions
            </div>
            <p class="text-[11px] text-[#9496A6]">Automated build & packaging</p>
          </div>

          <div class="p-4 rounded-2xl bg-[#0D0E12] border border-[#242738] space-y-2">
            <div class="text-[10px] font-mono text-[#6947FF]">STEP 05</div>
            <div class="text-xs font-bold text-white flex items-center gap-1.5">
              <Rocket class="w-3.5 h-3.5 text-rose-400" />
              Live Site
            </div>
            <p class="text-[11px] text-[#9496A6]">Published on GitHub Pages URL</p>
          </div>
        </div>

      </div>
    </section>

    <!-- SECTION E — FINAL CALL TO ACTION (Creatix Inspired High Impact Stage) -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-br from-[#161822] to-[#12131C] border border-[#242738] rounded-3xl lg:rounded-[3rem] p-10 sm:p-16 text-center space-y-6 relative overflow-hidden">
        
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-[#6947FF]/20 text-[#B096FF] border border-[#6947FF]/30 mx-auto">
          <span>START TODAY // 04</span>
        </div>

        <h2 class="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight">
          Your next portfolio <br />
          <span class="text-[#6947FF]">starts here.</span>
        </h2>

        <p class="text-xs sm:text-sm text-[#9496A6] max-w-md mx-auto leading-relaxed">
          Create a personalized, deterministic brief for your AI assistant in under 5 minutes. Free, client-side, and stored locally in your browser.
        </p>

        <div class="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            @click="handleStartBuilding"
            class="btn-primary py-3.5 px-8 text-sm font-semibold shadow-lg group"
          >
            <span>Build Your Prompt</span>
            <ArrowRight class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </button>

          <router-link 
            to="/learn/deploy" 
            class="btn-secondary py-3.5 px-6 text-sm"
          >
            View Deployment Guide
          </router-link>
        </div>

      </div>
    </section>

    </div>
  </div>
</template>
