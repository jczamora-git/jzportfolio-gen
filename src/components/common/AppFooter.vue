<script setup lang="ts">
import { Rocket, Github, Heart, Shield, BookOpen, Sparkles } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 mt-auto transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        <!-- Brand & Mission -->
        <div class="md:col-span-2 space-y-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Rocket class="w-4 h-4" />
            </div>
            <span class="font-bold text-lg text-slate-900 dark:text-white">
              Portfolio<span class="text-indigo-600 dark:text-indigo-400">Launchpad</span>
            </span>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
            An open educational AI prompt generator crafted for the 
            <span class="font-medium text-slate-800 dark:text-slate-200">"Code. Build. Deploy: Launch Your Portfolio with GitHub Actions"</span> 
            webinar. Helping aspiring developers and students launch production-ready portfolios.
          </p>
          <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <Sparkles class="w-3 h-3" />
              100% Client-Side • No Sign-up Required
            </span>
          </div>
        </div>

        <!-- Quick Navigation -->
        <div>
          <h4 class="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Navigation
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li>
              <router-link to="/" class="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Home / Overview
              </router-link>
            </li>
            <li>
              <router-link to="/builder" class="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Prompt Builder Wizard
              </router-link>
            </li>
            <li>
              <router-link to="/learn/deploy" class="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                GitHub Actions Guide
              </router-link>
            </li>
            <li>
              <router-link to="/privacy" class="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Privacy Statement
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Educational Boundary & Privacy -->
        <div>
          <h4 class="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Product Scope
          </h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
            Portfolio Launchpad creates structured AI prompts from your inputs. It does not call external AI APIs or host websites.
          </p>
          <router-link 
            to="/privacy" 
            class="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            <Shield class="w-3.5 h-3.5" />
            Learn how your draft is saved
          </router-link>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <p>
          Designed for students, career shifters, and developers worldwide.
        </p>
        <div class="flex items-center gap-4">
          <router-link to="/learn/deploy" class="hover:text-slate-900 dark:hover:text-white transition-colors">
            Deployment Documentation
          </router-link>
          <span>•</span>
          <router-link to="/privacy" class="hover:text-slate-900 dark:hover:text-white transition-colors">
            Privacy
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>
