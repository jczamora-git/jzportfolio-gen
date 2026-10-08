<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
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
import { gsap } from 'gsap'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { useScrollAnimations } from '@/composables/useScrollAnimations'
import { EASING, isReducedMotion } from '@/lib/motion/motionPresets'

const router = useRouter()
const activeTab = ref<'profile' | 'projects' | 'design' | 'output'>('profile')
const landingRef = ref<HTMLElement | null>(null)

const { initSmoothScroll, scrollTo } = useSmoothScroll()
const { createAnimationContext } = useScrollAnimations()

let animCtx: gsap.Context | null = null

function handleStartBuilding() {
  router.push('/builder')
}

function scrollToProcess() {
  scrollTo('#process', { offset: -30, duration: 1.1 })
}

onMounted(() => {
  // Initialize Lenis smooth scrolling (auto-disabled on mobile and reduced-motion)
  initSmoothScroll()

  // Initialize GSAP animations if motion is not reduced
  if (landingRef.value && !isReducedMotion()) {
    animCtx = createAnimationContext(landingRef.value, () => {
      const mm = gsap.matchMedia()

      // ==========================================
      // 1. DESKTOP & TABLET ANIMATIONS (768px+)
      // ==========================================
      mm.add('(min-width: 768px)', () => {
        // Hero Initial Entrance Timeline
        const heroTl = gsap.timeline({
          defaults: { ease: EASING.power3Out }
        })

        heroTl
          .from('.hero-headline', {
            y: 32,
            opacity: 0,
            duration: 0.85,
            clearProps: 'transform'
          })
          .from('.hero-description', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: EASING.power2Out,
            clearProps: 'transform'
          }, '-=0.55')
          .from('.hero-actions', {
            y: 16,
            opacity: 0,
            duration: 0.5,
            ease: EASING.power2Out,
            clearProps: 'transform'
          }, '-=0.45')
          .from('.hero-brief', {
            y: 24,
            scale: 0.98,
            opacity: 0,
            duration: 0.75,
            ease: EASING.power2Out,
            clearProps: 'transform,scale'
          }, '-=0.5')

        // Statistics Reveal on Scroll (Static numbers, no fake counter)
        gsap.from('.stat-item', {
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 85%',
            once: true
          },
          y: 26,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: EASING.power2Out,
          clearProps: 'transform'
        })

        // Process Section Workflow Reveal
        const processTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.process-section',
            start: 'top 80%',
            once: true
          },
          defaults: { ease: EASING.power2Out }
        })

        processTl
          .from('.process-header', {
            y: 24,
            opacity: 0,
            duration: 0.65,
            clearProps: 'transform'
          })
          .from('.process-feature-card', {
            y: 24,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            clearProps: 'transform'
          }, '-=0.35')
          .from('.process-step-card', {
            y: 20,
            opacity: 0,
            duration: 0.55,
            stagger: 0.08,
            clearProps: 'transform'
          }, '-=0.3')

        // Builder Capabilities Section
        const builderTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.builder-showcase-section',
            start: 'top 80%',
            once: true
          },
          defaults: { ease: EASING.power2Out }
        })

        builderTl
          .from('.builder-header', {
            y: 24,
            opacity: 0,
            duration: 0.65,
            clearProps: 'transform'
          })
          .from('.builder-tabs', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            clearProps: 'transform'
          }, '-=0.4')
          .from('.builder-display', {
            y: 24,
            opacity: 0,
            duration: 0.65,
            clearProps: 'transform'
          }, '-=0.45')

        // Deployment Pipeline
        const deployTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.deploy-section',
            start: 'top 80%',
            once: true
          },
          defaults: { ease: EASING.power2Out }
        })

        deployTl
          .from('.deploy-header', {
            y: 24,
            opacity: 0,
            duration: 0.65,
            clearProps: 'transform'
          })
          .from('.deploy-step-card', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            clearProps: 'transform'
          }, '-=0.35')

        // Final CTA Section Reveal
        gsap.from('.cta-card', {
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 85%',
            once: true
          },
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: EASING.power3Out,
          clearProps: 'transform'
        })
      })

      // ==========================================
      // 2. MOBILE ANIMATIONS (<768px)
      // ==========================================
      mm.add('(max-width: 767px)', () => {
        // Lightweight mobile hero reveal (Brief is hidden by responsive CSS, untouched by GSAP)
        const mobileHeroTl = gsap.timeline({
          defaults: { ease: EASING.power2Out }
        })

        mobileHeroTl
          .from('.hero-headline', {
            y: 18,
            opacity: 0,
            duration: 0.6,
            clearProps: 'transform'
          })
          .from('.hero-description', {
            y: 12,
            opacity: 0,
            duration: 0.45,
            clearProps: 'transform'
          }, '-=0.35')
          .from('.hero-actions', {
            y: 10,
            opacity: 0,
            duration: 0.4,
            clearProps: 'transform'
          }, '-=0.25')

        // Mobile Stats (subtle stagger)
        gsap.from('.stat-item', {
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 85%',
            once: true
          },
          y: 16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: EASING.power2Out,
          clearProps: 'transform'
        })

        // Mobile Process
        gsap.from('.process-section', {
          scrollTrigger: {
            trigger: '.process-section',
            start: 'top 85%',
            once: true
          },
          y: 18,
          opacity: 0,
          duration: 0.55,
          ease: EASING.power2Out,
          clearProps: 'transform'
        })

        // Mobile Builder Showcase
        gsap.from('.builder-showcase-section', {
          scrollTrigger: {
            trigger: '.builder-showcase-section',
            start: 'top 85%',
            once: true
          },
          y: 18,
          opacity: 0,
          duration: 0.55,
          ease: EASING.power2Out,
          clearProps: 'transform'
        })

        // Mobile Deployment Section
        gsap.from('.deploy-section', {
          scrollTrigger: {
            trigger: '.deploy-section',
            start: 'top 85%',
            once: true
          },
          y: 18,
          opacity: 0,
          duration: 0.55,
          ease: EASING.power2Out,
          clearProps: 'transform'
        })

        // Mobile CTA
        gsap.from('.cta-card', {
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 85%',
            once: true
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: EASING.power2Out,
          clearProps: 'transform'
        })
      })
    })
  }
})

onBeforeUnmount(() => {
  if (animCtx) {
    animCtx.revert()
  }
})
</script>

<template>
  <div ref="landingRef" class="landing-stage w-full bg-[#F1F0F6] dark:bg-[#0F0F15] text-[#17171D] dark:text-[#F7F6FA] overflow-x-hidden">
    
    <!-- UPPER HERO SHEET: Distinct light stage physically layered above lower stage -->
    <div class="w-full bg-[#F1F0F6] dark:bg-[#0F0F15]">
      <section class="upper-hero-sheet relative z-10 w-full bg-white dark:bg-[#20202B] border-b border-[#E2E1EA] dark:border-[#414151]/70 rounded-b-[44px] sm:rounded-b-[72px] lg:rounded-b-[96px] shadow-sm">
        
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
            <h1 class="hero-headline font-display text-[clamp(2.5rem,10.6vw,3.25rem)] sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#17171D] dark:text-[#F7F6FA] leading-[1.06] sm:leading-[1.05] pt-1 sm:pt-2 max-w-4xl mx-auto [text-wrap:balance]">
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
                <div class="hero-description space-y-2">
                  <span class="text-xs font-mono uppercase text-[#6947FF] dark:text-[#987AFF] font-bold tracking-wider block">
                    The Prompt Builder
                  </span>
                  <p class="text-sm sm:text-base text-[#666675] dark:text-[#C3C0D0] leading-relaxed max-w-xl">
                    Bring your skills, projects, and experience together. We turn them into a clear AI-ready prompt so you can generate and deploy your portfolio with GitHub Actions.
                  </p>
                </div>

                <!-- Primary and Secondary Actions (Responsive full-width on tiny screens, natural inline on larger) -->
                <div class="hero-actions flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
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
                    <ArrowRight class="w-3.5 h-3.5 ml-1 text-[#666675] dark:text-[#C3C0D0] inline" />
                  </button>
                </div>
              </div>

              <!-- Right: Tactile Creative Brief Artifact (Hidden on mobile below md, visible on tablet/desktop md+) -->
              <div class="hero-brief hidden md:block md:col-span-12 lg:col-span-6 min-w-0">
                <div class="p-5 sm:p-6 rounded-3xl bg-[#F8F7FC] dark:bg-[#292936] border border-[#E2E1EA] dark:border-[#414151]/80 shadow-sm space-y-3.5 sm:space-y-4 relative group hover:border-[#6947FF]/40 dark:hover:border-[#805EFF]/50 transition-colors">
                  
                  <div class="flex items-center justify-between border-b border-[#E2E1EA] dark:border-[#414151]/60 pb-3">
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
                        <span class="text-[11px] text-[#666675] dark:text-[#C3C0D0] block">Aspiring Frontend Engineer</span>
                      </div>
                      <div class="flex flex-wrap gap-1">
                        <span class="px-1.5 py-0.5 rounded bg-white dark:bg-[#323241] border border-[#E2E1EA] dark:border-[#414151] text-[10px] font-medium text-[#17171D] dark:text-[#F7F6FA]">Vue.js</span>
                        <span class="px-1.5 py-0.5 rounded bg-white dark:bg-[#323241] border border-[#E2E1EA] dark:border-[#414151] text-[10px] font-medium text-[#17171D] dark:text-[#F7F6FA]">TypeScript</span>
                      </div>
                    </div>
                    
                    <div class="p-2.5 rounded-xl bg-white dark:bg-[#323241] border border-[#E2E1EA] dark:border-[#414151] text-[11px] text-[#666675] dark:text-[#C3C0D0] space-y-1">
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

    <!-- LOWER STAGE: Responsive Full-Width Stage Flowing Beneath the Upper Sheet -->
    <div class="lower-stage w-full bg-[#F1F0F6] dark:bg-[#0F0F15] text-[#17171D] dark:text-[#F1F2F6] pt-10 sm:pt-14 pb-20 sm:pb-28 space-y-16 sm:space-y-24">
      
      <!-- INTEGRATED STATISTICS SECTION: Seamlessly Beginning Lower Stage -->
      <section class="stats-section max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-left border-b border-[#E2E1EA] dark:border-[#242738]/60 pb-12 sm:pb-16">
          
          <!-- Metric 1: 5+ Starter Personas -->
          <div class="stat-item space-y-1 border-r border-[#E2E1EA] dark:border-[#242738]/50 pr-2 last:border-none md:last:border-none">
            <div class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17171D] dark:text-white tracking-tight flex items-baseline gap-1">
              <span>5</span><span class="text-[#6947FF] dark:text-[#805EFF]">+</span>
            </div>
            <p class="text-xs sm:text-sm text-[#666675] dark:text-[#ACACBA] font-medium">Starter Personas</p>
          </div>

          <!-- Metric 2: 100% Client-Side & Private -->
          <div class="stat-item space-y-1 border-r-0 md:border-r md:border-[#E2E1EA] md:dark:border-[#242738]/50 md:pr-2">
            <div class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17171D] dark:text-white tracking-tight flex items-baseline gap-1">
              <span>100</span><span class="text-[#6947FF] dark:text-[#805EFF]">%</span>
            </div>
            <p class="text-xs sm:text-sm text-[#666675] dark:text-[#ACACBA] font-medium">Client-Side & Private</p>
          </div>

          <!-- Metric 3: 0DBs Zero Cloud Tracking -->
          <div class="stat-item space-y-1 border-r border-[#E2E1EA] dark:border-[#242738]/50 pr-2 last:border-none md:last:border-none">
            <div class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17171D] dark:text-white tracking-tight flex items-baseline gap-1">
              <span>0</span><span class="text-[#6947FF] dark:text-[#805EFF]">DBs</span>
            </div>
            <p class="text-xs sm:text-sm text-[#666675] dark:text-[#ACACBA] font-medium">Zero Cloud Tracking</p>
          </div>

          <!-- Metric 4: CI/CD GitHub Actions Ready -->
          <div class="stat-item space-y-1">
            <div class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17171D] dark:text-white tracking-tight flex items-baseline gap-1">
              <span>CI/CD</span>
            </div>
            <p class="text-xs sm:text-sm text-[#666675] dark:text-[#ACACBA] font-medium">GitHub Actions Ready</p>
          </div>

        </div>
      </section>

      <!-- SECTION B — THE PROCESS: Editorial Workflow Narrative -->
      <section id="process" class="process-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Section Header -->
        <div class="process-header flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2E1EA] dark:border-[#242738] pb-8">
          <div class="space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-[#6947FF]/10 dark:bg-[#6947FF]/20 text-[#6947FF] dark:text-[#B096FF] border border-[#6947FF]/20 dark:border-[#6947FF]/30">
              <span>01 // THE PROCESS</span>
            </div>
            <h2 class="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#17171D] dark:text-white leading-tight">
              Turning Ideas Into <br />
              <span class="text-[#6947FF] dark:text-[#805EFF]">Launch-Ready Portfolios</span>
            </h2>
          </div>
          <p class="text-sm text-[#666675] dark:text-[#9496A6] max-w-md leading-relaxed">
            We turn your raw details into structured, hallucination-free AI coding prompts that result in clean HTML5, CSS3, and JavaScript repositories.
          </p>
        </div>

        <!-- Asymmetrical Editorial Showcase (Left Card + Right Card) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Left Big Card: The Prompt Builder Purpose (7 cols) -->
          <div class="process-feature-card lg:col-span-7 bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-sm transition-colors">
            <div class="space-y-3">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-[#F2EEFF] dark:bg-white/5 text-[#6947FF] dark:text-[#B096FF] border border-[#6947FF]/15 dark:border-white/10">
                A PROMPT BUILDER FOR BUILDERS
              </div>
              <h3 class="font-display text-2xl sm:text-3xl font-bold text-[#17171D] dark:text-white">
                No fabrication. Just your verified work.
              </h3>
              <p class="text-xs sm:text-sm text-[#666675] dark:text-[#9496A6] leading-relaxed">
                Standard AI prompts invent claims and create broken build chains. Portfolio Launchpad compiles strict rules for static GitHub Pages compatibility with relative links.
              </p>
            </div>

            <div class="grid grid-cols-3 gap-3 pt-4 border-t border-[#E2E1EA] dark:border-[#242738] text-xs">
              <div class="p-3 rounded-2xl bg-[#F8F7FC] dark:bg-[#0D0E12] border border-[#E2E1EA] dark:border-[#242738]">
                <span class="text-[10px] font-mono text-[#6947FF] dark:text-[#987AFF] block font-bold">01 INPUT</span>
                <span class="font-bold text-[#17171D] dark:text-white">Personal Data</span>
              </div>
              <div class="p-3 rounded-2xl bg-[#F8F7FC] dark:bg-[#0D0E12] border border-[#E2E1EA] dark:border-[#242738]">
                <span class="text-[10px] font-mono text-[#6947FF] dark:text-[#987AFF] block font-bold">02 COMPILE</span>
                <span class="font-bold text-[#17171D] dark:text-white">Brief Specs</span>
              </div>
              <div class="p-3 rounded-2xl bg-[#F8F7FC] dark:bg-[#0D0E12] border border-[#E2E1EA] dark:border-[#242738]">
                <span class="text-[10px] font-mono text-[#6947FF] dark:text-[#987AFF] block font-bold">03 DEPLOY</span>
                <span class="font-bold text-[#17171D] dark:text-white">GitHub Pages</span>
              </div>
            </div>
          </div>

          <!-- Right Card: Editorial Persona Snapshot (5 cols) -->
          <div class="process-feature-card lg:col-span-5 bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-sm transition-colors">
            <div class="space-y-3">
              <span class="text-xs font-mono text-[#6947FF] dark:text-[#987AFF] font-bold block">
                PERSONA HARNESS
              </span>
              <h3 class="font-display text-xl sm:text-2xl font-bold text-[#17171D] dark:text-white">
                5 Preloaded Student Personas
              </h3>
              <p class="text-xs text-[#666675] dark:text-[#9496A6] leading-relaxed">
                Test the workflow instantly with realistic developer, designer, fresh graduate, and analyst fixtures without typing.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-[#F8F7FC] dark:bg-[#0D0E12] border border-[#E2E1EA] dark:border-[#242738] space-y-2 text-xs">
              <div class="flex justify-between items-center text-[#6947FF] dark:text-[#B096FF] font-mono text-[11px] font-semibold">
                <span>SAMPLE FIXTURES</span>
                <span>v1.0</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                <span class="px-2 py-1 rounded-lg bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] text-[11px] text-[#17171D] dark:text-white font-medium">Alex Morgan (CS)</span>
                <span class="px-2 py-1 rounded-lg bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] text-[11px] text-[#17171D] dark:text-white font-medium">Jamie Reyes (Frontend)</span>
                <span class="px-2 py-1 rounded-lg bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] text-[11px] text-[#17171D] dark:text-white font-medium">Taylor Santos (UI/UX)</span>
              </div>
            </div>
          </div>

        </div>

        <!-- 4-Stage Horizontal Progression Timeline -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          
          <div class="process-step-card p-5 rounded-2xl bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] shadow-sm space-y-2 transition-colors">
            <div class="font-display text-2xl font-bold text-[#6947FF] dark:text-[#805EFF]">01</div>
            <h4 class="text-sm font-bold text-[#17171D] dark:text-white">Define Profile</h4>
            <p class="text-xs text-[#666675] dark:text-[#9496A6] leading-relaxed">
              Enter your headline, contact links, verified skills, and coursework.
            </p>
          </div>

          <div class="process-step-card p-5 rounded-2xl bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] shadow-sm space-y-2 transition-colors">
            <div class="font-display text-2xl font-bold text-[#6947FF] dark:text-[#805EFF]">02</div>
            <h4 class="text-sm font-bold text-[#17171D] dark:text-white">Shape Direction</h4>
            <p class="text-xs text-[#666675] dark:text-[#9496A6] leading-relaxed">
              Select aesthetic constraints, color palette, and portfolio sections.
            </p>
          </div>

          <div class="process-step-card p-5 rounded-2xl bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] shadow-sm space-y-2 transition-colors">
            <div class="font-display text-2xl font-bold text-[#6947FF] dark:text-[#805EFF]">03</div>
            <h4 class="text-sm font-bold text-[#17171D] dark:text-white">Generate Prompt</h4>
            <p class="text-xs text-[#666675] dark:text-[#9496A6] leading-relaxed">
              Receive deterministic prompt ready for ChatGPT, Gemini, or Claude.
            </p>
          </div>

          <div class="process-step-card p-5 rounded-2xl bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] shadow-sm space-y-2 transition-colors">
            <div class="font-display text-2xl font-bold text-[#6947FF] dark:text-[#805EFF]">04</div>
            <h4 class="text-sm font-bold text-[#17171D] dark:text-white">Build & Deploy</h4>
            <p class="text-xs text-[#666675] dark:text-[#9496A6] leading-relaxed">
              Save in VS Code, push to GitHub, and deploy with GitHub Actions.
            </p>
          </div>

        </div>

      </section>

      <!-- SECTION C — BUILDER SHOWCASE: Interactive "Our Capabilities" Section -->
      <section class="builder-showcase-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div class="bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] rounded-3xl lg:rounded-[3rem] p-8 sm:p-12 lg:p-14 space-y-8 shadow-sm transition-colors">
          
          <!-- Header -->
          <div class="builder-header flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2E1EA] dark:border-[#242738] pb-6">
            <div class="space-y-3">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-[#6947FF]/10 dark:bg-[#6947FF]/20 text-[#6947FF] dark:text-[#B096FF] border border-[#6947FF]/20 dark:border-[#6947FF]/30">
                <span>02 // THE BUILDER</span>
              </div>
              <h2 class="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#17171D] dark:text-white">
                Our Builder <span class="text-[#6947FF] dark:text-[#805EFF]">Capabilities</span>
              </h2>
            </div>
            <p class="text-xs sm:text-sm text-[#666675] dark:text-[#9496A6] max-w-md leading-relaxed">
              Structured inputs designed to prevent AI hallucinations and enforce static web standards.
            </p>
          </div>

          <!-- 2-Zone Layout: Left Pill Buttons + Right Interactive Card -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <!-- Left: Pill Capabilities List (5 cols) -->
            <div class="builder-tabs lg:col-span-5 space-y-2.5">
              <button 
                type="button"
                @click="activeTab = 'profile'"
                class="w-full text-left px-5 py-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between focus:outline-none"
                :class="activeTab === 'profile' 
                  ? 'border-[#6947FF] bg-[#F0EBFF] dark:bg-[#6947FF]/15 text-[#6947FF] dark:text-white font-semibold shadow-sm' 
                  : 'border-[#E2E1EA] dark:border-[#242738] bg-[#F8F7FC] dark:bg-[#0D0E12] text-[#666675] dark:text-[#9496A6] hover:text-[#17171D] dark:hover:text-white hover:border-[#6947FF]/30 dark:hover:border-slate-700'"
              >
                <span>01 &nbsp; Personal Profile & Bio</span>
                <ArrowRight class="w-4 h-4 text-[#6947FF] dark:text-[#805EFF]" />
              </button>

              <button 
                type="button"
                @click="activeTab = 'projects'"
                class="w-full text-left px-5 py-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between focus:outline-none"
                :class="activeTab === 'projects' 
                  ? 'border-[#6947FF] bg-[#F0EBFF] dark:bg-[#6947FF]/15 text-[#6947FF] dark:text-white font-semibold shadow-sm' 
                  : 'border-[#E2E1EA] dark:border-[#242738] bg-[#F8F7FC] dark:bg-[#0D0E12] text-[#666675] dark:text-[#9496A6] hover:text-[#17171D] dark:hover:text-white hover:border-[#6947FF]/30 dark:hover:border-slate-700'"
              >
                <span>02 &nbsp; Tech Stack & Projects</span>
                <ArrowRight class="w-4 h-4 text-[#6947FF] dark:text-[#805EFF]" />
              </button>

              <button 
                type="button"
                @click="activeTab = 'design'"
                class="w-full text-left px-5 py-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between focus:outline-none"
                :class="activeTab === 'design' 
                  ? 'border-[#6947FF] bg-[#F0EBFF] dark:bg-[#6947FF]/15 text-[#6947FF] dark:text-white font-semibold shadow-sm' 
                  : 'border-[#E2E1EA] dark:border-[#242738] bg-[#F8F7FC] dark:bg-[#0D0E12] text-[#666675] dark:text-[#9496A6] hover:text-[#17171D] dark:hover:text-white hover:border-[#6947FF]/30 dark:hover:border-slate-700'"
              >
                <span>03 &nbsp; Aesthetic Direction</span>
                <ArrowRight class="w-4 h-4 text-[#6947FF] dark:text-[#805EFF]" />
              </button>

              <button 
                type="button"
                @click="activeTab = 'output'"
                class="w-full text-left px-5 py-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between focus:outline-none"
                :class="activeTab === 'output' 
                  ? 'border-[#6947FF] bg-[#F0EBFF] dark:bg-[#6947FF]/15 text-[#6947FF] dark:text-white font-semibold shadow-sm' 
                  : 'border-[#E2E1EA] dark:border-[#242738] bg-[#F8F7FC] dark:bg-[#0D0E12] text-[#666675] dark:text-[#9496A6] hover:text-[#17171D] dark:hover:text-white hover:border-[#6947FF]/30 dark:hover:border-slate-700'"
              >
                <span>04 &nbsp; AI Prompt Deliverable</span>
                <ArrowRight class="w-4 h-4 text-[#6947FF] dark:text-[#805EFF]" />
              </button>
            </div>

            <!-- Right: Interactive Showcase Display with Silky Crossfade (7 cols) -->
            <div class="builder-display lg:col-span-7 bg-[#F8F7FC] dark:bg-[#0D0E12] border border-[#E2E1EA] dark:border-[#242738] rounded-3xl p-6 sm:p-8 space-y-4 min-h-[260px] flex flex-col justify-between transition-colors">
              
              <Transition name="tab-fade" mode="out-in">
                <div v-if="activeTab === 'profile'" key="profile" class="space-y-4">
                  <div class="flex items-center justify-between pb-3 border-b border-[#E2E1EA] dark:border-[#242738]">
                    <span class="text-xs font-mono text-[#6947FF] dark:text-[#B096FF] font-semibold">DIMENSION // PROFILE & IDENTITY</span>
                    <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Zero Hallucinations</span>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div class="p-3.5 rounded-xl bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] space-y-1 shadow-xs">
                      <span class="text-[10px] uppercase font-mono text-[#666675] dark:text-[#9496A6]">Full Name</span>
                      <p class="font-bold text-[#17171D] dark:text-white">Jamie Reyes</p>
                    </div>
                    <div class="p-3.5 rounded-xl bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] space-y-1 shadow-xs">
                      <span class="text-[10px] uppercase font-mono text-[#666675] dark:text-[#9496A6]">Target Role</span>
                      <p class="font-bold text-[#17171D] dark:text-white">Fresh Graduate • CS Major</p>
                    </div>
                  </div>
                  <div class="p-3.5 rounded-xl bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] text-xs space-y-1 shadow-xs">
                    <span class="text-[10px] uppercase font-mono text-[#666675] dark:text-[#9496A6]">Bio Excerpt</span>
                    <p class="text-[#666675] dark:text-[#9496A6] leading-relaxed">
                      Computer Science graduate passionate about full-stack web engineering, algorithms, and building accessible digital tools.
                    </p>
                  </div>
                </div>

                <div v-else-if="activeTab === 'projects'" key="projects" class="space-y-4">
                  <div class="flex items-center justify-between pb-3 border-b border-[#E2E1EA] dark:border-[#242738]">
                    <span class="text-xs font-mono text-[#6947FF] dark:text-[#B096FF] font-semibold">DIMENSION // FEATURED BUILDS</span>
                    <span class="text-xs font-semibold text-[#6947FF] dark:text-[#805EFF]">5 Personas Ready</span>
                  </div>
                  <div class="p-4 rounded-xl bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] space-y-2 text-xs shadow-xs">
                    <div class="flex justify-between items-center">
                      <span class="font-bold text-[#17171D] dark:text-white">EcoTrack Carbon Calculator</span>
                      <span class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Live Web App</span>
                    </div>
                    <p class="text-[#666675] dark:text-[#9496A6]">
                      A responsive web app that computes household carbon footprints with visual analytics charts.
                    </p>
                    <div class="flex gap-1.5 pt-1">
                      <span class="px-2 py-0.5 rounded bg-[#F1F0F6] dark:bg-[#0D0E12] text-[10px] border border-[#E2E1EA] dark:border-[#242738] text-[#17171D] dark:text-white font-medium">Vue 3</span>
                      <span class="px-2 py-0.5 rounded bg-[#F1F0F6] dark:bg-[#0D0E12] text-[10px] border border-[#E2E1EA] dark:border-[#242738] text-[#17171D] dark:text-white font-medium">Chart.js</span>
                      <span class="px-2 py-0.5 rounded bg-[#F1F0F6] dark:bg-[#0D0E12] text-[10px] border border-[#E2E1EA] dark:border-[#242738] text-[#17171D] dark:text-white font-medium">Tailwind</span>
                    </div>
                  </div>
                </div>

                <div v-else-if="activeTab === 'design'" key="design" class="space-y-4">
                  <div class="flex items-center justify-between pb-3 border-b border-[#E2E1EA] dark:border-[#242738]">
                    <span class="text-xs font-mono text-[#6947FF] dark:text-[#B096FF] font-semibold">DIMENSION // AESTHETIC DIRECTION</span>
                    <span class="text-xs font-semibold text-[#6947FF] dark:text-[#805EFF]">4 Archetypes</span>
                  </div>
                  <div class="grid grid-cols-2 gap-3 text-xs">
                    <div class="p-3.5 rounded-xl border border-[#6947FF] bg-[#F0EBFF] dark:bg-[#6947FF]/15">
                      <span class="font-bold block text-[#17171D] dark:text-white">Minimalist Clean</span>
                      <span class="text-[11px] text-[#666675] dark:text-[#9496A6]">Spacious typography & contrast</span>
                    </div>
                    <div class="p-3.5 rounded-xl border border-[#E2E1EA] dark:border-[#242738] bg-white dark:bg-[#161822]">
                      <span class="font-bold block text-[#17171D] dark:text-white">Developer Terminal</span>
                      <span class="text-[11px] text-[#666675] dark:text-[#9496A6]">Dark slate & code badges</span>
                    </div>
                  </div>
                </div>

                <div v-else-if="activeTab === 'output'" key="output" class="space-y-4">
                  <div class="flex items-center justify-between pb-3 border-b border-[#E2E1EA] dark:border-[#242738]">
                    <span class="text-xs font-mono text-[#6947FF] dark:text-[#B096FF] font-semibold">DIMENSION // PROMPT OUTPUT</span>
                    <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Ready for Claude & ChatGPT</span>
                  </div>
                  <div class="p-4 rounded-xl bg-[#1B1B25] text-[#F1F2F6] font-mono text-xs space-y-1.5 border border-[#343442]">
                    <p class="text-[#B096FF]"># PORTFOLIO SPECIFICATION FOR AI CODE GENERATION</p>
                    <p class="text-slate-300">- Architecture: Clean Static HTML5 + CSS3 + JS</p>
                    <p class="text-emerald-400">- Target CI: GitHub Actions Pages Deploy</p>
                  </div>
                </div>
              </Transition>

              <div class="pt-2 flex items-center justify-between border-t border-[#E2E1EA] dark:border-[#242738]/60 mt-auto">
                <span class="text-xs text-[#666675] dark:text-[#9496A6]">Takes ~3 minutes to complete.</span>
                <router-link to="/builder" class="btn-primary text-xs py-2 px-5">
                  Open Builder
                </router-link>
              </div>

            </div>

          </div>

        </div>
      </section>

      <!-- FULL-WIDTH TICKER RIBBON -->
      <div class="w-full bg-white dark:bg-[#161822] border-y border-[#E2E1EA] dark:border-[#242738] py-4 overflow-hidden transition-colors">
        <div class="flex items-center justify-around gap-8 text-xs sm:text-sm font-display font-bold uppercase tracking-widest text-[#17171D]/80 dark:text-white/80 whitespace-nowrap">
          <span>CODE</span>
          <span class="text-[#6947FF] dark:text-[#805EFF]">✦</span>
          <span>BUILD</span>
          <span class="text-[#6947FF] dark:text-[#805EFF]">✦</span>
          <span>DEPLOY</span>
          <span class="text-[#6947FF] dark:text-[#805EFF]">✦</span>
          <span>LAUNCH</span>
          <span class="text-[#6947FF] dark:text-[#805EFF]">✦</span>
          <span>NO HALLUCINATIONS</span>
          <span class="text-[#6947FF] dark:text-[#805EFF]">✦</span>
          <span>GITHUB ACTIONS</span>
          <span class="text-[#6947FF] dark:text-[#805EFF]">✦</span>
          <span>STATIC SITES</span>
        </div>
      </div>

      <!-- SECTION D — DEPLOYMENT STORYTELLING: Code. Build. Deploy. -->
      <section class="deploy-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div class="bg-white dark:bg-[#161822] border border-[#E2E1EA] dark:border-[#242738] rounded-3xl lg:rounded-[3rem] p-8 sm:p-12 space-y-8 shadow-sm transition-colors">
          
          <!-- Header -->
          <div class="deploy-header flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2E1EA] dark:border-[#242738] pb-6">
            <div class="space-y-3">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-[#6947FF]/10 dark:bg-[#6947FF]/20 text-[#6947FF] dark:text-[#B096FF] border border-[#6947FF]/20 dark:border-[#6947FF]/30">
                <span>03 // DEPLOYMENT PIPELINE</span>
              </div>
              <h2 class="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#17171D] dark:text-white">
                Code. Build. Deploy.
              </h2>
              <p class="text-xs sm:text-sm text-[#666675] dark:text-[#9496A6] max-w-lg leading-relaxed">
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
            <div class="deploy-step-card p-4 rounded-2xl bg-[#F8F7FC] dark:bg-[#0D0E12] border border-[#E2E1EA] dark:border-[#242738] space-y-2 transition-colors">
              <div class="text-[10px] font-mono text-[#6947FF] dark:text-[#805EFF] font-bold">STEP 01</div>
              <div class="text-xs font-bold text-[#17171D] dark:text-white flex items-center gap-1.5">
                <Sparkles class="w-3.5 h-3.5 text-[#6947FF] dark:text-[#805EFF]" />
                AI Prompt
              </div>
              <p class="text-[11px] text-[#666675] dark:text-[#9496A6]">Generate prompt from Launchpad</p>
            </div>

            <div class="deploy-step-card p-4 rounded-2xl bg-[#F8F7FC] dark:bg-[#0D0E12] border border-[#E2E1EA] dark:border-[#242738] space-y-2 transition-colors">
              <div class="text-[10px] font-mono text-[#6947FF] dark:text-[#805EFF] font-bold">STEP 02</div>
              <div class="text-xs font-bold text-[#17171D] dark:text-white flex items-center gap-1.5">
                <Code2 class="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                Source Files
              </div>
              <p class="text-[11px] text-[#666675] dark:text-[#9496A6]">Save HTML, CSS, & JS in VS Code</p>
            </div>

            <div class="deploy-step-card p-4 rounded-2xl bg-[#F8F7FC] dark:bg-[#0D0E12] border border-[#E2E1EA] dark:border-[#242738] space-y-2 transition-colors">
              <div class="text-[10px] font-mono text-[#6947FF] dark:text-[#805EFF] font-bold">STEP 03</div>
              <div class="text-xs font-bold text-[#17171D] dark:text-white flex items-center gap-1.5">
                <GitBranch class="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                Git Commit
              </div>
              <p class="text-[11px] text-[#666675] dark:text-[#9496A6]">Push to main on GitHub</p>
            </div>

            <div class="deploy-step-card p-4 rounded-2xl bg-[#F8F7FC] dark:bg-[#0D0E12] border border-[#E2E1EA] dark:border-[#242738] space-y-2 transition-colors">
              <div class="text-[10px] font-mono text-[#6947FF] dark:text-[#805EFF] font-bold">STEP 04</div>
              <div class="text-xs font-bold text-[#17171D] dark:text-white flex items-center gap-1.5">
                <Layers class="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                GitHub Actions
              </div>
              <p class="text-[11px] text-[#666675] dark:text-[#9496A6]">Automated build & packaging</p>
            </div>

            <div class="deploy-step-card p-4 rounded-2xl bg-[#F8F7FC] dark:bg-[#0D0E12] border border-[#E2E1EA] dark:border-[#242738] space-y-2 transition-colors">
              <div class="text-[10px] font-mono text-[#6947FF] dark:text-[#805EFF] font-bold">STEP 05</div>
              <div class="text-xs font-bold text-[#17171D] dark:text-white flex items-center gap-1.5">
                <Rocket class="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                Live Site
              </div>
              <p class="text-[11px] text-[#666675] dark:text-[#9496A6]">Published on GitHub Pages URL</p>
            </div>
          </div>

        </div>
      </section>

      <!-- SECTION E — FINAL CALL TO ACTION (High Impact Stage) -->
      <section class="cta-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="cta-card bg-gradient-to-br from-[#F0EBFF] to-[#E9E4FA] dark:from-[#161822] dark:to-[#12131C] border border-[#E0D7FA] dark:border-[#242738] rounded-3xl lg:rounded-[3rem] p-10 sm:p-16 text-center space-y-6 relative overflow-hidden shadow-sm transition-colors">
          
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-white/80 dark:bg-[#6947FF]/20 text-[#6947FF] dark:text-[#B096FF] border border-[#6947FF]/20 dark:border-[#6947FF]/30 mx-auto shadow-xs">
            <span>START TODAY // 04</span>
          </div>

          <h2 class="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#17171D] dark:text-white max-w-2xl mx-auto leading-tight">
            Your next portfolio <br />
            <span class="text-[#6947FF] dark:text-[#805EFF]">starts here.</span>
          </h2>

          <p class="text-xs sm:text-sm text-[#555566] dark:text-[#9496A6] max-w-md mx-auto leading-relaxed">
            Create a personalized, deterministic brief for your AI assistant in under 5 minutes. Free, client-side, and stored locally in your browser.
          </p>

          <div class="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              @click="handleStartBuilding"
              class="btn-primary py-3.5 px-8 text-sm font-semibold shadow-md group"
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
