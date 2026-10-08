<script setup lang="ts">
import { Rocket, Shield } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-white dark:bg-[#0B0D17] border-t border-[#E8E8EF] dark:border-[#232738] mt-auto transition-colors">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        <!-- Brand & Mission -->
        <div class="md:col-span-2 space-y-3">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-[#6D4AFF] flex items-center justify-center text-white shadow-sm">
              <Rocket class="w-3.5 h-3.5" />
            </div>
            <span class="font-bold text-base text-[#181824] dark:text-[#F3F4F8]">
              Portfolio<span class="text-[#6D4AFF]">Launchpad</span>
            </span>
          </div>
          <p class="text-xs sm:text-sm text-[#737385] dark:text-[#9496A8] max-w-md leading-relaxed">
            An open educational AI prompt generator for the 
            <span class="font-medium text-[#181824] dark:text-[#F3F4F8]">"Code. Build. Deploy: Launch Your Portfolio with GitHub Actions"</span> 
            webinar. Helping students and developers launch static portfolios.
          </p>
        </div>

        <!-- Quick Navigation -->
        <div>
          <h4 class="text-xs font-semibold text-[#181824] dark:text-[#F3F4F8] uppercase tracking-wider mb-3">
            Navigation
          </h4>
          <ul class="space-y-2 text-xs">
            <li>
              <router-link to="/" class="text-[#737385] dark:text-[#9496A8] hover:text-[#6D4AFF] dark:hover:text-brand-400 transition-colors">
                Home Overview
              </router-link>
            </li>
            <li>
              <router-link to="/builder" class="text-[#737385] dark:text-[#9496A8] hover:text-[#6D4AFF] dark:hover:text-brand-400 transition-colors">
                Prompt Builder
              </router-link>
            </li>
            <li>
              <router-link to="/learn/deploy" class="text-[#737385] dark:text-[#9496A8] hover:text-[#6D4AFF] dark:hover:text-brand-400 transition-colors">
                Deployment Guide
              </router-link>
            </li>
            <li>
              <router-link to="/privacy" class="text-[#737385] dark:text-[#9496A8] hover:text-[#6D4AFF] dark:hover:text-brand-400 transition-colors">
                Privacy Statement
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Privacy & Local Drafts -->
        <div>
          <h4 class="text-xs font-semibold text-[#181824] dark:text-[#F3F4F8] uppercase tracking-wider mb-3">
            Data Privacy
          </h4>
          <p class="text-xs text-[#737385] dark:text-[#9496A8] leading-relaxed mb-2.5">
            100% client-side. Drafts remain in your local browser storage. No accounts, tracking, or AI API calls.
          </p>
          <router-link 
            to="/privacy" 
            class="inline-flex items-center gap-1 text-xs text-[#6D4AFF] dark:text-brand-400 hover:underline font-medium"
          >
            <Shield class="w-3.5 h-3.5" />
            Read Privacy Policy
          </router-link>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-6 border-t border-[#E8E8EF] dark:border-[#232738] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#737385] dark:text-[#9496A8]">
        <p>
          Crafted for students, career shifters, and builders everywhere.
        </p>
        <div class="flex items-center gap-4">
          <router-link to="/learn/deploy" class="hover:text-[#181824] dark:hover:text-[#F3F4F8] transition-colors">
            Deployment Docs
          </router-link>
          <span>•</span>
          <router-link to="/privacy" class="hover:text-[#181824] dark:hover:text-[#F3F4F8] transition-colors">
            Privacy
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>
