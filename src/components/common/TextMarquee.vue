<script setup lang="ts">
interface Props {
  items?: string[]
  speed?: 'slow' | 'normal' | 'fast'
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [
    'CODE',
    'BUILD',
    'DEPLOY',
    'LAUNCH',
    'NO HALLUCINATIONS',
    'GITHUB ACTIONS',
    'STATIC SITES'
  ],
  speed: 'normal',
  direction: 'left',
  pauseOnHover: true
})

const speedClass = {
  slow: 'duration-[35s]',
  normal: 'duration-[22s]',
  fast: 'duration-[14s]'
}[props.speed]
</script>

<template>
  <div 
    class="marquee-container relative w-full overflow-hidden py-3.5 sm:py-4 bg-white/70 dark:bg-[#15161E]/80 backdrop-blur-md border-y border-[#E2E1EA] dark:border-[#242738]/80 select-none group"
    role="region"
    aria-label="Technology and workflow highlights"
  >
    <!-- Left & Right smooth edge gradients for infinite seamless blend -->
    <div class="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 bg-gradient-to-r from-[#F1F0F6] dark:from-[#0F0F15] to-transparent"></div>
    <div class="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 bg-gradient-to-l from-[#F1F0F6] dark:from-[#0F0F15] to-transparent"></div>

    <div 
      class="marquee-track flex w-fit flex-nowrap items-center will-change-transform"
      :class="[
        direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right',
        speedClass,
        pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
      ]"
    >
      <!-- Set 1 -->
      <div class="flex items-center shrink-0 space-x-6 sm:space-x-8 px-3 sm:px-4" aria-hidden="false">
        <template v-for="(item, index) in items" :key="`item-1-${index}`">
          <span class="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#17171D] dark:text-[#E4E3EC] uppercase whitespace-nowrap">
            {{ item }}
          </span>
          <span class="text-[#6947FF] dark:text-[#805EFF] text-xs sm:text-sm font-bold" aria-hidden="true">
            ✦
          </span>
        </template>
      </div>

      <!-- Set 2 (Duplicate for seamless infinite scroll) -->
      <div class="flex items-center shrink-0 space-x-6 sm:space-x-8 px-3 sm:px-4" aria-hidden="true">
        <template v-for="(item, index) in items" :key="`item-2-${index}`">
          <span class="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#17171D] dark:text-[#E4E3EC] uppercase whitespace-nowrap">
            {{ item }}
          </span>
          <span class="text-[#6947FF] dark:text-[#805EFF] text-xs sm:text-sm font-bold" aria-hidden="true">
            ✦
          </span>
        </template>
      </div>

      <!-- Set 3 (Buffer for ultra-wide screen continuity) -->
      <div class="flex items-center shrink-0 space-x-6 sm:space-x-8 px-3 sm:px-4" aria-hidden="true">
        <template v-for="(item, index) in items" :key="`item-3-${index}`">
          <span class="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#17171D] dark:text-[#E4E3EC] uppercase whitespace-nowrap">
            {{ item }}
          </span>
          <span class="text-[#6947FF] dark:text-[#805EFF] text-xs sm:text-sm font-bold" aria-hidden="true">
            ✦
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
