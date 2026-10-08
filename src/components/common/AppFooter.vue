<script setup lang="ts">
import { Rocket, ShieldCheck, ArrowUpRight } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-[#0D0E12] text-[#F1F2F6] border-t border-[#242738] mt-auto transition-colors">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        
        <!-- Brand & Editorial Attribution (6 cols) -->
        <div class="md:col-span-6 space-y-4">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-[#6947FF] flex items-center justify-center text-white shadow-sm">
              <Rocket class="w-3.5 h-3.5" />
            </div>
            <span class="font-display font-bold text-base text-white">
              Portfolio<span class="text-[#6947FF]">Launchpad</span>
            </span>
          </div>
          <p class="text-xs sm:text-sm text-[#9496A6] max-w-md leading-relaxed">
            An open educational AI prompt generator crafted for the 
            <span class="font-medium text-white">"Code. Build. Deploy: Launch Your Portfolio with GitHub Actions"</span> 
            webinar. Helping students and developers structure and publish static portfolios.
          </p>
        </div>

        <!-- Navigation (3 cols) -->
        <div class="md:col-span-3 space-y-3">
          <h4 class="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Navigation
          </h4>
          <ul class="space-y-2 text-xs">
            <li>
              <router-link to="/" class="text-[#9496A6] hover:text-[#6947FF] transition-colors">
                Overview & Process
              </router-link>
            </li>
            <li>
              <router-link to="/builder" class="text-[#9496A6] hover:text-[#6947FF] transition-colors">
                Prompt Builder
              </router-link>
            </li>
            <li>
              <router-link to="/learn/deploy" class="text-[#9496A6] hover:text-[#6947FF] transition-colors">
                Deployment Guide
              </router-link>
            </li>
            <li>
              <router-link to="/privacy" class="text-[#9496A6] hover:text-[#6947FF] transition-colors">
                Privacy & Data Handling
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Privacy & Local Drafts (3 cols) -->
        <div class="md:col-span-3 space-y-3">
          <h4 class="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Data Handling
          </h4>
          <p class="text-xs text-[#9496A6] leading-relaxed">
            100% client-side execution. Your drafts stay in browser localStorage. No databases, accounts, or telemetry.
          </p>
          <div>
            <router-link 
              to="/privacy" 
              class="inline-flex items-center gap-1.5 text-xs text-[#6947FF] hover:underline font-medium"
            >
              <ShieldCheck class="w-3.5 h-3.5" />
              <span>Read Privacy Policy</span>
              <ArrowUpRight class="w-3 h-3" />
            </router-link>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-6 border-t border-[#242738] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9496A6]">
        <p>
          Portfolio Launchpad — Educational Open Initiative
        </p>
        <div class="flex items-center gap-4">
          <router-link to="/learn/deploy" class="hover:text-white transition-colors">
            Deployment Docs
          </router-link>
          <span>•</span>
          <router-link to="/privacy" class="hover:text-white transition-colors">
            Privacy
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>
