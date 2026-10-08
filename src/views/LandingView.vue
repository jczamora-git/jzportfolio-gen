<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowRight, 
  ArrowDown,
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
  <div class="space-y-12 sm:space-y-16 py-4 sm:py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <!-- 1. Hero Section: Modular Framed Creative Experience -->
    <section class="modular-frame p-8 sm:p-12 lg:p-14">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        <!-- Left Column: Editorial Headline & Actions (6 cols) -->
        <div class="lg:col-span-6 space-y-6 text-left">
          
          <!-- Category Marker -->
          <div class="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#6947FF] dark:text-[#B096FF] uppercase">
            <span class="w-1.5 h-1.5 rounded-full bg-[#6947FF]"></span>
            <span>PORTFOLIO LAUNCHPAD // 01</span>
          </div>

          <!-- Confident Editorial Headline -->
          <h1 class="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight text-[#14151B] dark:text-[#F1F2F6] leading-[1.06]">
            You did the work.<br />
            <span class="relative inline-block text-[#14151B] dark:text-[#F1F2F6]">
              Now show it.
              <span class="absolute left-0 bottom-1 sm:bottom-1.5 w-full h-[3.5px] bg-[#6947FF] rounded-full"></span>
            </span>
          </h1>

          <!-- Concise Supporting Copy -->
          <p class="text-base sm:text-lg text-[#696976] dark:text-[#9496A6] max-w-xl leading-relaxed">
            Bring your skills, projects, and experience together. We'll turn them into a clear prompt to help you build your next portfolio.
          </p>

          <!-- Primary Actions -->
          <div class="space-y-3 pt-2">
            <div class="flex flex-col sm:flex-row sm:items-center gap-4">
              <button 
                @click="handleStartBuilding"
                class="btn-primary py-3.5 px-7 text-sm sm:text-base font-semibold group"
              >
                <span>Build Your Prompt</span>
                <ArrowRight class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>

              <button 
                @click="scrollToProcess"
                class="inline-flex items-center text-sm font-medium text-[#696976] dark:text-[#9496A6] hover:text-[#14151B] dark:hover:text-[#F1F2F6] transition-colors group px-1 py-2"
              >
                <span>How It Works</span>
                <ArrowDown class="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>

            <!-- Understated Reassurance -->
            <p class="text-xs text-[#696976] dark:text-[#9496A6] font-mono">
              No account needed. Start with your story.
            </p>
          </div>

        </div>

        <!-- Right Column: Tactile "Portfolio Brief" Creative Document (6 cols) -->
        <div class="lg:col-span-6">
          <div class="p-6 sm:p-8 bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738] rounded-2xl sm:rounded-3xl space-y-5 relative">
            
            <!-- Document Header -->
            <div class="flex items-start justify-between border-b border-[#E5E4EA] dark:border-[#242738] pb-4">
              <div class="space-y-0.5">
                <span class="text-[10px] font-mono uppercase tracking-wider text-[#6947FF] font-bold">
                  PORTFOLIO BRIEF // 01
                </span>
                <h3 class="font-display text-base sm:text-lg font-bold text-[#14151B] dark:text-[#F1F2F6]">
                  Personal Portfolio Specification
                </h3>
                <p class="text-xs text-[#696976] dark:text-[#9496A6]">
                  Prepared from your personal background & projects
                </p>
              </div>

              <div class="w-7 h-7 rounded-lg bg-[#F2EEFF] dark:bg-[#1E202E] text-[#6947FF] flex items-center justify-center shrink-0">
                <Rocket class="w-3.5 h-3.5" />
              </div>
            </div>

            <!-- Profile Summary Strip -->
            <div class="p-3.5 rounded-xl bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] grid grid-cols-2 gap-3 text-xs">
              <div>
                <span class="text-[10px] font-mono uppercase text-[#696976] dark:text-[#9496A6] block">Developer</span>
                <span class="font-bold text-[#14151B] dark:text-[#F1F2F6]">Alex Morgan</span>
                <span class="text-[11px] text-[#696976] dark:text-[#9496A6] block">Aspiring Frontend Engineer</span>
              </div>
              <div>
                <span class="text-[10px] font-mono uppercase text-[#696976] dark:text-[#9496A6] block">Stack</span>
                <span class="font-medium text-[#14151B] dark:text-[#F1F2F6]">Vue.js, TypeScript, CSS</span>
                <span class="text-[11px] text-[#696976] dark:text-[#9496A6] block">2 Highlighted Builds</span>
              </div>
            </div>

            <!-- Brief Requirements Excerpt -->
            <div class="space-y-3 text-xs leading-relaxed">
              <div class="space-y-1">
                <span class="font-mono text-[11px] font-bold uppercase tracking-wider text-[#14151B] dark:text-[#F1F2F6] block">
                  Core Objective
                </span>
                <p class="text-[#696976] dark:text-[#9496A6]">
                  Build a responsive single-page personal portfolio highlighting frontend engineering coursework, open-source builds, and technical proficiency.
                </p>
              </div>

              <div class="grid grid-cols-2 gap-3 pt-2 border-t border-[#E5E4EA] dark:border-[#242738]">
                <div class="space-y-1">
                  <span class="font-mono text-[10px] uppercase text-[#696976] dark:text-[#9496A6] block">Aesthetic Direction</span>
                  <p class="font-medium text-[#14151B] dark:text-[#F1F2F6]">Minimalist Clean • High Contrast</p>
                </div>
                <div class="space-y-1">
                  <span class="font-mono text-[10px] uppercase text-[#696976] dark:text-[#9496A6] block">Architecture</span>
                  <p class="font-medium text-[#14151B] dark:text-[#F1F2F6]">HTML5 • CSS3 • Vanilla JS</p>
                </div>
              </div>
            </div>

            <!-- Footer Action Connector -->
            <div class="pt-3 border-t border-[#E5E4EA] dark:border-[#242738] flex items-center justify-between text-xs">
              <span class="text-[11px] font-mono text-[#696976] dark:text-[#9496A6]">
                Ready to paste into ChatGPT, Gemini, or Claude
              </span>
              <router-link 
                to="/builder" 
                class="text-[#6947FF] hover:underline font-semibold inline-flex items-center gap-1 text-xs"
              >
                <span>Create Yours</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </router-link>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- 2. The Process Section: Modular Framed Timeline (01 / 02 / 03 / 04) -->
    <section id="process" class="modular-frame p-8 sm:p-12 space-y-8">
      
      <div class="border-b border-[#E5E4EA] dark:border-[#242738] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-mono text-[#6947FF] dark:text-brand-300 uppercase tracking-wider mb-2">
            <span>02 // THE PROCESS</span>
          </div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14151B] dark:text-[#F1F2F6]">
            From your story to a live portfolio.
          </h2>
        </div>
        <p class="text-xs sm:text-sm text-[#696976] dark:text-[#9496A6] max-w-md">
          A predictable 4-stage pipeline designed for the "Code. Build. Deploy" webinar.
        </p>
      </div>

      <!-- 4 Modular Step Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div class="p-5 rounded-2xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738] space-y-3">
          <div class="font-display text-3xl font-bold text-[#6947FF]">
            01
          </div>
          <h3 class="text-sm font-bold text-[#14151B] dark:text-[#F1F2F6]">
            Define Profile
          </h3>
          <p class="text-xs text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Enter your headline, contact links, verified skills, coursework, and personal projects. Zero prior job experience required.
          </p>
        </div>

        <div class="p-5 rounded-2xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738] space-y-3">
          <div class="font-display text-3xl font-bold text-[#6947FF]">
            02
          </div>
          <h3 class="text-sm font-bold text-[#14151B] dark:text-[#F1F2F6]">
            Shape Direction
          </h3>
          <p class="text-xs text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Select aesthetic constraints (Minimal, Modern, Creative, Developer), color palette, and desired portfolio sections.
          </p>
        </div>

        <div class="p-5 rounded-2xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738] space-y-3">
          <div class="font-display text-3xl font-bold text-[#6947FF]">
            03
          </div>
          <h3 class="text-sm font-bold text-[#14151B] dark:text-[#F1F2F6]">
            Generate Prompt
          </h3>
          <p class="text-xs text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Receive a deterministic prompt ready for AI assistants, enforcing valid semantic HTML5, pure CSS, and zero hallucinated claims.
          </p>
        </div>

        <div class="p-5 rounded-2xl bg-[#F8F8F7] dark:bg-[#0E1017] border border-[#E5E4EA] dark:border-[#242738] space-y-3">
          <div class="font-display text-3xl font-bold text-[#6947FF]">
            04
          </div>
          <h3 class="text-sm font-bold text-[#14151B] dark:text-[#F1F2F6]">
            Build & Deploy
          </h3>
          <p class="text-xs text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Generate website code with AI, save locally in VS Code, push to GitHub, and automatically publish via GitHub Actions.
          </p>
        </div>

      </div>
    </section>

    <!-- 3. Product Showcase: Modular Split Showcase -->
    <section class="modular-frame p-8 sm:p-12 space-y-8">
      
      <div class="border-b border-[#E5E4EA] dark:border-[#242738] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-mono text-[#6947FF] dark:text-brand-300 uppercase tracking-wider mb-2">
            <span>03 // THE BUILDER</span>
          </div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#14151B] dark:text-[#F1F2F6]">
            Structured inputs. Real outputs.
          </h2>
        </div>
        <p class="text-xs sm:text-sm text-[#696976] dark:text-[#9496A6] max-w-md">
          Explore the five modular dimensions that produce your launch-ready prompt.
        </p>
      </div>

      <!-- Interactive Modular Showcase Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Feature Navigation Tabs (4 cols) -->
        <div class="lg:col-span-4 space-y-2">
          <button 
            type="button"
            @click="activeTab = 'profile'"
            class="w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm"
            :class="activeTab === 'profile' 
              ? 'border-[#6947FF] bg-[#F8F8F7] dark:bg-[#0E1017] shadow-sm ring-1 ring-[#6947FF]' 
              : 'border-[#E5E4EA] dark:border-[#242738] bg-transparent hover:bg-[#F8F8F7]/60 dark:hover:bg-[#0E1017]/60'"
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
            class="w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm"
            :class="activeTab === 'projects' 
              ? 'border-[#6947FF] bg-[#F8F8F7] dark:bg-[#0E1017] shadow-sm ring-1 ring-[#6947FF]' 
              : 'border-[#E5E4EA] dark:border-[#242738] bg-transparent hover:bg-[#F8F8F7]/60 dark:hover:bg-[#0E1017]/60'"
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
            class="w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm"
            :class="activeTab === 'design' 
              ? 'border-[#6947FF] bg-[#F8F8F7] dark:bg-[#0E1017] shadow-sm ring-1 ring-[#6947FF]' 
              : 'border-[#E5E4EA] dark:border-[#242738] bg-transparent hover:bg-[#F8F8F7]/60 dark:hover:bg-[#0E1017]/60'"
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
            class="w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm"
            :class="activeTab === 'output' 
              ? 'border-[#6947FF] bg-[#F8F8F7] dark:bg-[#0E1017] shadow-sm ring-1 ring-[#6947FF]' 
              : 'border-[#E5E4EA] dark:border-[#242738] bg-transparent hover:bg-[#F8F8F7]/60 dark:hover:bg-[#0E1017]/60'"
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
        <div class="lg:col-span-8 p-6 sm:p-8 bg-[#F8F8F7] dark:bg-[#0E1017] rounded-2xl sm:rounded-3xl border border-[#E5E4EA] dark:border-[#242738] space-y-4">
          
          <div v-if="activeTab === 'profile'" class="space-y-4 animate-fadeIn">
            <div class="flex items-center justify-between pb-3 border-b border-[#E5E4EA] dark:border-[#242738]">
              <span class="text-xs font-mono text-[#696976] dark:text-[#9496A6]">DIMENSION // PROFILE & IDENTITY</span>
              <span class="text-xs font-semibold text-[#6947FF]">Zero Hallucination Guarantee</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div class="p-3.5 rounded-xl bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] space-y-1">
                <span class="text-[10px] uppercase font-mono text-[#696976] dark:text-[#9496A6]">Full Name</span>
                <p class="font-bold text-[#14151B] dark:text-[#F1F2F6]">Jamie Reyes</p>
              </div>
              <div class="p-3.5 rounded-xl bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] space-y-1">
                <span class="text-[10px] uppercase font-mono text-[#696976] dark:text-[#9496A6]">Target Role</span>
                <p class="font-bold text-[#14151B] dark:text-[#F1F2F6]">Fresh Graduate • CS Major</p>
              </div>
            </div>
            <div class="p-3.5 rounded-xl bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] space-y-1 text-xs">
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
              <div class="p-3.5 rounded-xl bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] space-y-2">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-[#14151B] dark:text-[#F1F2F6]">EcoTrack Carbon Calculator</span>
                  <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Deployed App</span>
                </div>
                <p class="text-[#696976] dark:text-[#9496A6]">
                  A responsive web app that computes daily household carbon footprints with visual analytics charts.
                </p>
                <div class="flex gap-1.5 pt-1">
                  <span class="px-2 py-0.5 rounded bg-[#F8F8F7] dark:bg-[#0E1017] text-[10px] border border-[#E5E4EA] dark:border-[#242738]">Vue 3</span>
                  <span class="px-2 py-0.5 rounded bg-[#F8F8F7] dark:bg-[#0E1017] text-[10px] border border-[#E5E4EA] dark:border-[#242738]">Chart.js</span>
                  <span class="px-2 py-0.5 rounded bg-[#F8F8F7] dark:bg-[#0E1017] text-[10px] border border-[#E5E4EA] dark:border-[#242738]">Tailwind</span>
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
              <div class="p-3 rounded-xl border border-[#E5E4EA] dark:border-[#242738] bg-white dark:bg-[#161822]">
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

    <!-- 4. Deployment Storytelling Section: Code. Build. Deploy. (High Contrast Dark Modular Frame) -->
    <section class="modular-frame-dark p-8 sm:p-12 lg:p-14 space-y-8">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#242738] pb-6">
        <div class="space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono tracking-wider bg-[#6947FF]/20 text-[#B096FF] border border-[#6947FF]/30">
            <span>04 // DEPLOYMENT PIPELINE</span>
          </div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Code. Build. Deploy.
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        <div class="p-4 rounded-2xl bg-[#1C1E2C] border border-[#2A2D40] space-y-2">
          <div class="text-[10px] font-mono text-[#B096FF]">STEP 01</div>
          <div class="text-xs font-bold text-white flex items-center gap-1.5">
            <Sparkles class="w-3.5 h-3.5 text-[#6947FF]" />
            AI Prompt
          </div>
          <p class="text-[11px] text-slate-400">Generate prompt brief from Launchpad</p>
        </div>

        <div class="p-4 rounded-2xl bg-[#1C1E2C] border border-[#2A2D40] space-y-2">
          <div class="text-[10px] font-mono text-[#B096FF]">STEP 02</div>
          <div class="text-xs font-bold text-white flex items-center gap-1.5">
            <Code2 class="w-3.5 h-3.5 text-blue-400" />
            Source Files
          </div>
          <p class="text-[11px] text-slate-400">Save HTML, CSS, & JS in VS Code</p>
        </div>

        <div class="p-4 rounded-2xl bg-[#1C1E2C] border border-[#2A2D40] space-y-2">
          <div class="text-[10px] font-mono text-[#B096FF]">STEP 03</div>
          <div class="text-xs font-bold text-white flex items-center gap-1.5">
            <GitBranch class="w-3.5 h-3.5 text-amber-400" />
            Git Commit
          </div>
          <p class="text-[11px] text-slate-400">Push repo to GitHub on main branch</p>
        </div>

        <div class="p-4 rounded-2xl bg-[#1C1E2C] border border-[#2A2D40] space-y-2">
          <div class="text-[10px] font-mono text-[#B096FF]">STEP 04</div>
          <div class="text-xs font-bold text-white flex items-center gap-1.5">
            <Layers class="w-3.5 h-3.5 text-emerald-400" />
            GitHub Actions
          </div>
          <p class="text-[11px] text-slate-400">CI/CD pipeline builds static artifact</p>
        </div>

        <div class="p-4 rounded-2xl bg-[#1C1E2C] border border-[#2A2D40] space-y-2">
          <div class="text-[10px] font-mono text-[#B096FF]">STEP 05</div>
          <div class="text-xs font-bold text-white flex items-center gap-1.5">
            <Rocket class="w-3.5 h-3.5 text-rose-400" />
            Live Site
          </div>
          <p class="text-[11px] text-slate-400">Published to GitHub Pages URL</p>
        </div>

      </div>

    </section>

    <!-- 5. Final Modular CTA Section -->
    <section class="modular-frame p-8 sm:p-14 text-center space-y-6">
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
          class="btn-primary py-3.5 px-8 text-sm group"
        >
          <span>Start Building Now</span>
          <ArrowRight class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </button>

        <router-link 
          to="/learn/deploy" 
          class="btn-secondary py-3.5 px-6 text-sm"
        >
          View Deployment Guide
        </router-link>
      </div>
    </section>

  </div>
</template>
