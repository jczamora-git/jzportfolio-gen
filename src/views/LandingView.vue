<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowRight, 
  ArrowUpRight,
  Sparkles,
  Layers, 
  CheckCircle2,
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
  <div class="space-y-24 sm:space-y-32 py-4 sm:py-8">
    
    <!-- 1. Hero Section: Asymmetrical Editorial Composition (5-col / 7-col) -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        <!-- Left Column: Editorial Introduction (5 cols) -->
        <div class="lg:col-span-5 space-y-6 text-left">
          
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider bg-[#F2EEFF] text-[#6947FF] dark:bg-[#1E202E] dark:text-[#B096FF] border border-[#E6DCFF] dark:border-[#2A1783]/40">
            <span class="w-1.5 h-1.5 rounded-full bg-[#6947FF] animate-pulse"></span>
            <span>LAUNCHPAD // 01</span>
          </div>

          <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#14151B] dark:text-[#F1F2F6] leading-[1.08]">
            Your story,<br />
            <span class="text-[#6947FF]">ready to build.</span>
          </h1>

          <p class="text-base text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Portfolio Launchpad transforms your verified skills, projects, and background into a deterministic prompt for AI coding assistants. Generate clean static web files and deploy live with GitHub Actions.
          </p>

          <!-- Primary Actions -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button 
              @click="handleStartBuilding"
              class="btn-primary py-3 px-6 text-sm group"
            >
              <span>Build Your Prompt</span>
              <ArrowRight class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </button>

            <button 
              @click="scrollToProcess"
              class="btn-secondary py-3 px-5 text-sm"
            >
              See How It Works
            </button>
          </div>

          <!-- Technical Markers -->
          <div class="pt-4 border-t border-[#E5E4EA] dark:border-[#242738] flex flex-wrap items-center gap-4 text-xs font-mono text-[#696976] dark:text-[#9496A6]">
            <span class="flex items-center gap-1.5">
              <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              100% Client-Side
            </span>
            <span>•</span>
            <span class="flex items-center gap-1.5">
              <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Zero Cloud Databases
            </span>
            <span>•</span>
            <span class="flex items-center gap-1.5">
              <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              GitHub Actions Ready
            </span>
          </div>

        </div>

        <!-- Right Column: Profile-to-Prompt Transformation Visual (7 cols) -->
        <div class="lg:col-span-7">
          <div class="card-surface p-1 sm:p-2 shadow-elevated border border-[#E5E4EA] dark:border-[#242738] overflow-hidden">
            
            <!-- Window Control Header -->
            <div class="px-4 py-3 bg-[#F8F8F7] dark:bg-[#12131C] border-b border-[#E5E4EA] dark:border-[#242738] flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-400/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
                <span class="ml-2 text-xs font-mono text-[#696976] dark:text-[#9496A6]">launchpad-engine // profile-to-prompt</span>
              </div>
              <span class="text-[11px] font-mono font-medium text-[#6947FF] bg-[#F2EEFF] dark:bg-[#1E202E] px-2.5 py-0.5 rounded">
                DETERMINISTIC COMPILER
              </span>
            </div>

            <!-- Transformation Split Composition -->
            <div class="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5 bg-white dark:bg-[#161822]">
              
              <!-- Left Fragment: Structured Profile Data -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold uppercase tracking-wider text-[#6947FF]">
                    01 // INPUT DRAFT
                  </span>
                  <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                    ● Verified
                  </span>
                </div>

                <div class="p-4 rounded-xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738] space-y-3 text-xs">
                  <div>
                    <span class="text-[10px] uppercase font-mono text-[#696976] dark:text-[#9496A6] block">Developer</span>
                    <span class="font-bold text-sm text-[#14151B] dark:text-[#F1F2F6]">Alex Morgan</span>
                    <span class="text-xs text-[#696976] dark:text-[#9496A6] block">Frontend Engineer • CS Student</span>
                  </div>

                  <div class="pt-2 border-t border-[#E5E4EA] dark:border-[#242738]">
                    <span class="text-[10px] uppercase font-mono text-[#696976] dark:text-[#9496A6] block mb-1">Tech Stack</span>
                    <div class="flex flex-wrap gap-1">
                      <span class="px-2 py-0.5 rounded bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] text-[11px] font-medium text-[#14151B] dark:text-[#F1F2F6]">Vue.js</span>
                      <span class="px-2 py-0.5 rounded bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] text-[11px] font-medium text-[#14151B] dark:text-[#F1F2F6]">TypeScript</span>
                      <span class="px-2 py-0.5 rounded bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] text-[11px] font-medium text-[#14151B] dark:text-[#F1F2F6]">Tailwind CSS</span>
                    </div>
                  </div>

                  <div class="pt-2 border-t border-[#E5E4EA] dark:border-[#242738]">
                    <span class="text-[10px] uppercase font-mono text-[#696976] dark:text-[#9496A6] block">Projects</span>
                    <span class="font-medium text-[#14151B] dark:text-[#F1F2F6]">2 Verified Builds with Live URLs</span>
                  </div>
                </div>
              </div>

              <!-- Right Fragment: Formatted AI Prompt Brief -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold uppercase tracking-wider text-[#6947FF]">
                    02 // GENERATED BRIEF
                  </span>
                  <span class="text-[10px] font-mono text-[#696976] dark:text-[#9496A6]">
                    markdown (.md)
                  </span>
                </div>

                <div class="p-4 rounded-xl bg-[#0E1017] text-[#F1F2F6] font-mono text-[11px] leading-relaxed space-y-1.5 border border-[#242738] min-h-[170px] overflow-hidden">
                  <p class="text-[#B096FF]">&gt; Act as Senior Frontend Engineer</p>
                  <p class="text-slate-300">&gt; Target: Static Portfolio for Alex Morgan</p>
                  <p class="text-emerald-400">&gt; Constraints: HTML5, CSS3, Vanilla JS</p>
                  <p class="text-amber-300">&gt; Structure: /index.html, /css/, /js/</p>
                  <p class="text-slate-400">&gt; Strict: No fabricated experience</p>
                  <p class="text-slate-500">&gt; Target CI: GitHub Actions (Pages)</p>
                </div>
              </div>

            </div>

            <!-- Visual Transition Footer -->
            <div class="px-5 py-3 bg-[#F8F8F7] dark:bg-[#12131C] border-t border-[#E5E4EA] dark:border-[#242738] flex items-center justify-between text-xs text-[#696976] dark:text-[#9496A6]">
              <span class="font-mono text-[11px]">Paste directly into ChatGPT, Gemini, or Claude</span>
              <router-link to="/builder" class="text-[#6947FF] hover:underline font-semibold flex items-center gap-1 text-xs">
                Launch Builder
                <ArrowRight class="w-3.5 h-3.5" />
              </router-link>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- 2. The Process Section: Editorial Workflow Sequence (01 / 02 / 03 / 04) -->
    <section id="process" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <div class="border-b border-[#E5E4EA] dark:border-[#242738] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-mono text-[#6947FF] dark:text-brand-300 uppercase tracking-wider mb-2">
            <span>02 // THE PROCESS</span>
          </div>
          <h2 class="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14151B] dark:text-[#F1F2F6]">
            From your story to a live portfolio.
          </h2>
        </div>
        <p class="text-sm text-[#696976] dark:text-[#9496A6] max-w-md">
          A predictable 4-stage pipeline designed for the "Code. Build. Deploy" webinar.
        </p>
      </div>

      <!-- 4 Editorial Steps Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div class="space-y-3">
          <div class="font-display text-4xl font-bold text-[#14151B] dark:text-[#F1F2F6] opacity-30">
            01
          </div>
          <h3 class="text-base font-bold text-[#14151B] dark:text-[#F1F2F6]">
            Define Profile
          </h3>
          <p class="text-xs sm:text-sm text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Enter your headline, contact links, verified skills, coursework, and personal projects. Zero prior job experience required.
          </p>
        </div>

        <div class="space-y-3">
          <div class="font-display text-4xl font-bold text-[#14151B] dark:text-[#F1F2F6] opacity-30">
            02
          </div>
          <h3 class="text-base font-bold text-[#14151B] dark:text-[#F1F2F6]">
            Shape Direction
          </h3>
          <p class="text-xs sm:text-sm text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Select aesthetic constraints (Minimal, Modern, Creative, Developer), color palette, and desired portfolio sections.
          </p>
        </div>

        <div class="space-y-3">
          <div class="font-display text-4xl font-bold text-[#6947FF]">
            03
          </div>
          <h3 class="text-base font-bold text-[#14151B] dark:text-[#F1F2F6]">
            Generate Prompt
          </h3>
          <p class="text-xs sm:text-sm text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Receive a deterministic prompt ready for AI assistants, enforcing valid semantic HTML5, pure CSS, and zero hallucinated claims.
          </p>
        </div>

        <div class="space-y-3">
          <div class="font-display text-4xl font-bold text-[#14151B] dark:text-[#F1F2F6] opacity-30">
            04
          </div>
          <h3 class="text-base font-bold text-[#14151B] dark:text-[#F1F2F6]">
            Build & Deploy
          </h3>
          <p class="text-xs sm:text-sm text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Generate website code with AI, save locally in VS Code, push to GitHub, and automatically publish via GitHub Actions.
          </p>
        </div>

      </div>
    </section>

    <!-- 3. Product Showcase: Real 5-Step Personalization Dimensions -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <div class="border-b border-[#E5E4EA] dark:border-[#242738] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-mono text-[#6947FF] dark:text-brand-300 uppercase tracking-wider mb-2">
            <span>03 // THE BUILDER</span>
          </div>
          <h2 class="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#14151B] dark:text-[#F1F2F6]">
            Structured inputs. Real outputs.
          </h2>
        </div>
        <p class="text-sm text-[#696976] dark:text-[#9496A6] max-w-md">
          Explore the five modular dimensions that produce your launch-ready prompt.
        </p>
      </div>

      <!-- Interactive Modular Showcase -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Feature Navigation Tabs (4 cols) -->
        <div class="lg:col-span-4 space-y-2">
          <button 
            type="button"
            @click="activeTab = 'profile'"
            class="w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm"
            :class="activeTab === 'profile' 
              ? 'border-[#6947FF] bg-white dark:bg-[#161822] shadow-sm ring-1 ring-[#6947FF]' 
              : 'border-[#E5E4EA] dark:border-[#242738] bg-transparent hover:bg-white/60 dark:hover:bg-[#161822]/60'"
          >
            <div class="font-bold text-[#14151B] dark:text-[#F1F2F6] flex items-center justify-between">
              <span>01. Profile & Bio</span>
              <span class="text-[11px] font-mono text-[#6947FF]">Step 1</span>
            </div>
            <p class="text-xs text-[#696976] dark:text-[#9496A6] mt-1">
              Headline, professional bio, avatar URL, and verified social links.
            </p>
          </button>

          <button 
            type="button"
            @click="activeTab = 'projects'"
            class="w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm"
            :class="activeTab === 'projects' 
              ? 'border-[#6947FF] bg-white dark:bg-[#161822] shadow-sm ring-1 ring-[#6947FF]' 
              : 'border-[#E5E4EA] dark:border-[#242738] bg-transparent hover:bg-white/60 dark:hover:bg-[#161822]/60'"
          >
            <div class="font-bold text-[#14151B] dark:text-[#F1F2F6] flex items-center justify-between">
              <span>02. Skills & Projects</span>
              <span class="text-[11px] font-mono text-[#6947FF]">Steps 2 & 3</span>
            </div>
            <p class="text-xs text-[#696976] dark:text-[#9496A6] mt-1">
              Technical tools, education history, and highlighted showcase builds.
            </p>
          </button>

          <button 
            type="button"
            @click="activeTab = 'design'"
            class="w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm"
            :class="activeTab === 'design' 
              ? 'border-[#6947FF] bg-white dark:bg-[#161822] shadow-sm ring-1 ring-[#6947FF]' 
              : 'border-[#E5E4EA] dark:border-[#242738] bg-transparent hover:bg-white/60 dark:hover:bg-[#161822]/60'"
          >
            <div class="font-bold text-[#14151B] dark:text-[#F1F2F6] flex items-center justify-between">
              <span>03. Design Constraints</span>
              <span class="text-[11px] font-mono text-[#6947FF]">Step 4</span>
            </div>
            <p class="text-xs text-[#696976] dark:text-[#9496A6] mt-1">
              Aesthetic direction, color themes, section toggles, and motion level.
            </p>
          </button>

          <button 
            type="button"
            @click="activeTab = 'output'"
            class="w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm"
            :class="activeTab === 'output' 
              ? 'border-[#6947FF] bg-white dark:bg-[#161822] shadow-sm ring-1 ring-[#6947FF]' 
              : 'border-[#E5E4EA] dark:border-[#242738] bg-transparent hover:bg-white/60 dark:hover:bg-[#161822]/60'"
          >
            <div class="font-bold text-[#14151B] dark:text-[#F1F2F6] flex items-center justify-between">
              <span>04. Prompt Deliverable</span>
              <span class="text-[11px] font-mono text-[#6947FF]">Step 5</span>
            </div>
            <p class="text-xs text-[#696976] dark:text-[#9496A6] mt-1">
              Deterministic, copy-ready markdown brief with export options.
            </p>
          </button>
        </div>

        <!-- Live Visual Representation (8 cols) -->
        <div class="lg:col-span-8 card-surface p-6 sm:p-8 space-y-4">
          
          <div v-if="activeTab === 'profile'" class="space-y-4 animate-fadeIn">
            <div class="flex items-center justify-between pb-3 border-b border-[#E5E4EA] dark:border-[#242738]">
              <span class="text-xs font-mono text-[#696976] dark:text-[#9496A6]">DIMENSION // PROFILE & IDENTITY</span>
              <span class="text-xs font-semibold text-[#6947FF]">Zero Hallucination Guarantee</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div class="p-3.5 rounded-xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738] space-y-1">
                <span class="text-[10px] uppercase font-mono text-[#696976] dark:text-[#9496A6]">Full Name</span>
                <p class="font-bold text-[#14151B] dark:text-[#F1F2F6]">Jamie Reyes</p>
              </div>
              <div class="p-3.5 rounded-xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738] space-y-1">
                <span class="text-[10px] uppercase font-mono text-[#696976] dark:text-[#9496A6]">Target Role</span>
                <p class="font-bold text-[#14151B] dark:text-[#F1F2F6]">Fresh Graduate • CS Major</p>
              </div>
            </div>
            <div class="p-3.5 rounded-xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738] space-y-1 text-xs">
              <span class="text-[10px] uppercase font-mono text-[#696976] dark:text-[#9496A6]">Professional Bio</span>
              <p class="text-[#696976] dark:text-[#9496A6] leading-relaxed">
                Computer Science graduate passionate about full-stack web engineering, algorithms, and building accessible digital tools for students.
              </p>
            </div>
          </div>

          <div v-else-if="activeTab === 'projects'" class="space-y-4 animate-fadeIn">
            <div class="flex items-center justify-between pb-3 border-b border-[#E5E4EA] dark:border-[#242738]">
              <span class="text-xs font-mono text-[#696976] dark:text-[#9496A6]">DIMENSION // SKILLS & BUILDS</span>
              <span class="text-xs font-semibold text-[#6947FF]">5 Preloaded Sample Personas</span>
            </div>
            <div class="space-y-3 text-xs">
              <div class="p-3.5 rounded-xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738] space-y-2">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-[#14151B] dark:text-[#F1F2F6]">EcoTrack Carbon Calculator</span>
                  <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Deployed App</span>
                </div>
                <p class="text-[#696976] dark:text-[#9496A6]">
                  A responsive web app that computes daily household carbon footprints with visual analytics charts.
                </p>
                <div class="flex gap-1.5 pt-1">
                  <span class="px-2 py-0.5 rounded bg-white dark:bg-[#161822] text-[10px] border border-[#E5E4EA] dark:border-[#242738]">Vue 3</span>
                  <span class="px-2 py-0.5 rounded bg-white dark:bg-[#161822] text-[10px] border border-[#E5E4EA] dark:border-[#242738]">Chart.js</span>
                  <span class="px-2 py-0.5 rounded bg-white dark:bg-[#161822] text-[10px] border border-[#E5E4EA] dark:border-[#242738]">Tailwind</span>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'design'" class="space-y-4 animate-fadeIn">
            <div class="flex items-center justify-between pb-3 border-b border-[#E5E4EA] dark:border-[#242738]">
              <span class="text-xs font-mono text-[#696976] dark:text-[#9496A6]">DIMENSION // AESTHETIC CONFIGURATION</span>
              <span class="text-xs font-semibold text-[#6947FF]">4 Design Archetypes</span>
            </div>
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-xl border border-[#6947FF] bg-[#F2EEFF]/40 dark:bg-[#6947FF]/10">
                <span class="font-bold block text-[#14151B] dark:text-[#F1F2F6]">Minimalist Clean</span>
                <span class="text-[11px] text-[#696976] dark:text-[#9496A6]">Spacious typography & high contrast</span>
              </div>
              <div class="p-3 rounded-xl border border-[#E5E4EA] dark:border-[#242738] bg-[#F8F8F7] dark:bg-[#0E1017]">
                <span class="font-bold block text-[#14151B] dark:text-[#F1F2F6]">Developer Terminal</span>
                <span class="text-[11px] text-[#696976] dark:text-[#9496A6]">Dark slate & code badge styling</span>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'output'" class="space-y-4 animate-fadeIn">
            <div class="flex items-center justify-between pb-3 border-b border-[#E5E4EA] dark:border-[#242738]">
              <span class="text-xs font-mono text-[#696976] dark:text-[#9496A6]">DIMENSION // PROMPT DELIVERABLE</span>
              <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Ready for ChatGPT / Claude</span>
            </div>
            <div class="p-4 rounded-xl bg-[#0E1017] text-[#F1F2F6] font-mono text-xs space-y-2 border border-[#242738]">
              <p class="text-[#B096FF]"># PORTFOLIO SPECIFICATION FOR AI CODE GENERATION</p>
              <p class="text-slate-300">- Style: Modern Minimalist</p>
              <p class="text-slate-300">- Architecture: Clean Static HTML5 + CSS3 + Vanilla JS</p>
              <p class="text-emerald-400">- Workflow: GitHub Actions Pages Deploy</p>
            </div>
          </div>

          <div class="pt-2 flex items-center justify-between">
            <span class="text-xs text-[#696976] dark:text-[#9496A6]">Takes ~3 minutes to complete.</span>
            <router-link to="/builder" class="btn-primary text-xs py-2 px-4">
              Try It in Builder
            </router-link>
          </div>

        </div>

      </div>
    </section>

    <!-- 4. Deployment Storytelling Section: Code. Build. Deploy. (High Contrast Charcoal) -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl bg-[#14151F] text-[#F1F2F6] p-8 sm:p-12 border border-[#242738] space-y-10">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#242738] pb-8">
          <div class="space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider bg-[#6947FF]/20 text-[#B096FF] border border-[#6947FF]/30">
              <span>04 // DEPLOYMENT PIPELINE</span>
            </div>
            <h2 class="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Code. Build. Deploy.
            </h2>
            <p class="text-sm text-slate-300 max-w-lg leading-relaxed">
              Portfolio Launchpad prepares your structured prompt so you can generate your codebase with AI, commit to GitHub, and let GitHub Actions publish your site automatically.
            </p>
          </div>

          <div>
            <router-link 
              to="/learn/deploy" 
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6947FF] hover:bg-[#5736EB] text-white text-xs sm:text-sm font-medium transition-all"
            >
              <span>Read Deployment Guide</span>
              <ArrowUpRight class="w-4 h-4" />
            </router-link>
          </div>
        </div>

        <!-- Visual Flow Diagram -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div class="p-4 rounded-xl bg-[#1C1E2C] border border-[#2A2D40] space-y-2">
            <div class="text-[10px] font-mono text-[#B096FF]">STEP 01</div>
            <div class="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles class="w-3.5 h-3.5 text-[#6947FF]" />
              AI Prompt
            </div>
            <p class="text-[11px] text-slate-400">Generate prompt brief from Launchpad</p>
          </div>

          <div class="p-4 rounded-xl bg-[#1C1E2C] border border-[#2A2D40] space-y-2">
            <div class="text-[10px] font-mono text-[#B096FF]">STEP 02</div>
            <div class="text-xs font-bold text-white flex items-center gap-1.5">
              <Code2 class="w-3.5 h-3.5 text-blue-400" />
              Source Files
            </div>
            <p class="text-[11px] text-slate-400">Save HTML, CSS, & JS in VS Code</p>
          </div>

          <div class="p-4 rounded-xl bg-[#1C1E2C] border border-[#2A2D40] space-y-2">
            <div class="text-[10px] font-mono text-[#B096FF]">STEP 03</div>
            <div class="text-xs font-bold text-white flex items-center gap-1.5">
              <GitBranch class="w-3.5 h-3.5 text-amber-400" />
              Git Commit
            </div>
            <p class="text-[11px] text-slate-400">Push repo to GitHub on main branch</p>
          </div>

          <div class="p-4 rounded-xl bg-[#1C1E2C] border border-[#2A2D40] space-y-2">
            <div class="text-[10px] font-mono text-[#B096FF]">STEP 04</div>
            <div class="text-xs font-bold text-white flex items-center gap-1.5">
              <Layers class="w-3.5 h-3.5 text-emerald-400" />
              GitHub Actions
            </div>
            <p class="text-[11px] text-slate-400">CI/CD pipeline builds static artifact</p>
          </div>

          <div class="p-4 rounded-xl bg-[#1C1E2C] border border-[#2A2D40] space-y-2">
            <div class="text-[10px] font-mono text-[#B096FF]">STEP 05</div>
            <div class="text-xs font-bold text-white flex items-center gap-1.5">
              <Rocket class="w-3.5 h-3.5 text-rose-400" />
              Live Site
            </div>
            <p class="text-[11px] text-slate-400">Published to GitHub Pages URL</p>
          </div>

        </div>

      </div>
    </section>

    <!-- 5. Final Editorial CTA Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="card-surface p-8 sm:p-14 text-center space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider bg-[#F2EEFF] text-[#6947FF] dark:bg-[#1E202E] dark:text-[#B096FF] border border-[#E6DCFF] dark:border-[#2A1783]/40 mx-auto">
          <span>START CREATING // 05</span>
        </div>

        <h2 class="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#14151B] dark:text-[#F1F2F6]">
          Ready to launch your portfolio?
        </h2>

        <p class="text-sm sm:text-base text-[#696976] dark:text-[#9496A6] max-w-md mx-auto leading-relaxed">
          Create a personalized, deterministic prompt for your AI assistant in under 5 minutes. Free, client-side, and stored locally in your browser.
        </p>

        <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button 
            @click="handleStartBuilding"
            class="btn-primary py-3 px-8 text-sm group"
          >
            <span>Start Building Now</span>
            <ArrowRight class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </button>

          <router-link 
            to="/learn/deploy"
            class="btn-secondary py-3 px-6 text-sm"
          >
            View Deployment Guide
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>
