<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '@/composables/useToast'
import { 
  BookOpen, 
  Check, 
  Copy, 
  ExternalLink, 
  Info
} from 'lucide-vue-next'

const { showToast } = useToast()
const copiedSnippet = ref<string | null>(null)

async function copyCode(text: string, label: string) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    copiedSnippet.value = label
    showToast({
      title: 'Copied to Clipboard',
      description: `${label} ready to paste.`,
      type: 'success'
    })
    setTimeout(() => {
      if (copiedSnippet.value === label) copiedSnippet.value = null
    }, 2000)
  } catch (err) {
    showToast({
      title: 'Copy Failed',
      description: 'Please manually copy the code block.',
      type: 'error'
    })
  }
}

const gitCommands = `# 1. Initialize local Git repository
git init

# 2. Stage all portfolio files
git add .

# 3. Create initial commit
git commit -m "feat: initial portfolio release"

# 4. Set default branch to main
git branch -M main

# 5. Connect to your GitHub repository (replace USERNAME and REPO)
git remote add origin https://github.com/USERNAME/REPO.git

# 6. Push files to GitHub
git push -u origin main`

const workflowYaml = `name: Deploy Static Portfolio to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup GitHub Pages
        uses: actions/configure-pages@v5

      - name: Upload Static Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 animate-fadeIn">
    
    <!-- Hero Header -->
    <div class="space-y-4 border-b border-[#E5E4EA] dark:border-[#242738] pb-8">
      <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-[#F2EEFF] text-[#6947FF] dark:bg-[#1E202E] dark:text-[#B096FF] text-[11px] font-mono uppercase tracking-wider border border-[#E6DCFF] dark:border-[#2A1783]/40">
        <BookOpen class="w-3.5 h-3.5" />
        TECHNICAL DOCUMENTATION // DEPLOYMENT
      </div>
      <h1 class="font-display text-3xl sm:text-5xl font-bold text-[#14151B] dark:text-[#F1F2F6] tracking-tight">
        From AI Prompt to Live Website
      </h1>
      <p class="text-sm sm:text-base text-[#696976] dark:text-[#9496A6] max-w-3xl leading-relaxed">
        A step-by-step developer tutorial on generating static portfolio source files, setting up local version control, and automating production deployments via GitHub Actions.
      </p>
    </div>

    <!-- Documentation Layout: Sidebar + Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      <!-- Table of Contents Sidebar (3 cols, desktop sticky) -->
      <aside class="hidden lg:block lg:col-span-3 sticky top-24 space-y-3">
        <div class="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6947FF]">
          Table of Contents
        </div>
        <nav class="space-y-1 text-xs text-[#696976] dark:text-[#9496A6] border-l border-[#E5E4EA] dark:border-[#242738] pl-3">
          <a href="#architecture" class="block py-1 hover:text-[#14151B] dark:hover:text-[#F1F2F6] transition-colors">
            01. System Architecture
          </a>
          <a href="#concepts" class="block py-1 hover:text-[#14151B] dark:hover:text-[#F1F2F6] transition-colors">
            02. Core Concepts
          </a>
          <a href="#generation" class="block py-1 hover:text-[#14151B] dark:hover:text-[#F1F2F6] transition-colors">
            03. AI Code Generation
          </a>
          <a href="#workspace" class="block py-1 hover:text-[#14151B] dark:hover:text-[#F1F2F6] transition-colors">
            04. Local Workspace
          </a>
          <a href="#git-setup" class="block py-1 hover:text-[#14151B] dark:hover:text-[#F1F2F6] transition-colors">
            05. Git & GitHub Setup
          </a>
          <a href="#actions" class="block py-1 hover:text-[#14151B] dark:hover:text-[#F1F2F6] transition-colors">
            06. GitHub Actions CI/CD
          </a>
          <a href="#live-url" class="block py-1 hover:text-[#14151B] dark:hover:text-[#F1F2F6] transition-colors">
            07. Verify & Live URL
          </a>
        </nav>

        <div class="pt-4">
          <router-link to="/builder" class="btn-primary text-xs w-full py-2">
            Open Prompt Builder
          </router-link>
        </div>
      </aside>

      <!-- Main Documentation Stream (9 cols) -->
      <div class="lg:col-span-9 space-y-12">
        
        <!-- 01. Architecture Notice -->
        <section id="architecture" class="space-y-4">
          <div class="p-5 rounded-2xl bg-[#F8F8F7] dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] space-y-2">
            <div class="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#14151B] dark:text-[#F1F2F6]">
              <Info class="w-4 h-4 text-[#6947FF] shrink-0" />
              <span>Two Distinct Deployments</span>
            </div>
            <ul class="text-xs text-[#696976] dark:text-[#9496A6] space-y-1.5 list-disc list-inside ml-1 leading-relaxed">
              <li>
                <strong class="text-[#14151B] dark:text-[#F1F2F6]">Portfolio Launchpad (this app):</strong> A client-side Vue 3 SPA deployed on Vercel designed to generate deterministic developer prompts.
              </li>
              <li>
                <strong class="text-[#14151B] dark:text-[#F1F2F6]">Your Personal Portfolio:</strong> A static website (HTML5, CSS3, Vanilla JS) living in your GitHub repository and published automatically via GitHub Actions to GitHub Pages.
              </li>
            </ul>
          </div>
        </section>

        <!-- 02. Essential Concepts -->
        <section id="concepts" class="space-y-4">
          <div class="border-b border-[#E5E4EA] dark:border-[#242738] pb-3 flex items-center justify-between">
            <h2 class="font-display text-xl font-bold text-[#14151B] dark:text-[#F1F2F6]">
              01 // Core Concepts
            </h2>
            <span class="text-[11px] font-mono text-[#696976] dark:text-[#9496A6]">Glossary</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="p-3.5 rounded-xl bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] space-y-1">
              <span class="font-bold text-[#14151B] dark:text-[#F1F2F6] block">Git</span>
              <p class="text-[#696976] dark:text-[#9496A6]">Local version control system tracking source code modifications.</p>
            </div>
            <div class="p-3.5 rounded-xl bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] space-y-1">
              <span class="font-bold text-[#14151B] dark:text-[#F1F2F6] block">GitHub & Repositories</span>
              <p class="text-[#696976] dark:text-[#9496A6]">Remote cloud hosting platform storing your portfolio codebase.</p>
            </div>
            <div class="p-3.5 rounded-xl bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] space-y-1">
              <span class="font-bold text-[#14151B] dark:text-[#F1F2F6] block">GitHub Actions</span>
              <p class="text-[#696976] dark:text-[#9496A6]">CI/CD automation that builds and packages static files on push.</p>
            </div>
            <div class="p-3.5 rounded-xl bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] space-y-1">
              <span class="font-bold text-[#14151B] dark:text-[#F1F2F6] block">GitHub Pages</span>
              <p class="text-[#696976] dark:text-[#9496A6]">High-availability static web hosting with free SSL and public URL.</p>
            </div>
          </div>
        </section>

        <!-- 03. Code Generation -->
        <section id="generation" class="space-y-4">
          <div class="border-b border-[#E5E4EA] dark:border-[#242738] pb-3 flex items-center justify-between">
            <h2 class="font-display text-xl font-bold text-[#14151B] dark:text-[#F1F2F6]">
              02 // AI Code Generation
            </h2>
            <span class="text-[11px] font-mono text-[#696976] dark:text-[#9496A6]">Stage 1</span>
          </div>
          <p class="text-xs sm:text-sm text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Copy the structured prompt generated by Portfolio Launchpad and paste it into <span class="font-semibold text-[#14151B] dark:text-[#F1F2F6]">ChatGPT, Gemini, or Claude</span>. The prompt instructs the assistant to produce pure static files (<code class="font-mono text-[#6947FF]">index.html</code>, <code class="font-mono text-[#6947FF]">styles.css</code>, and <code class="font-mono text-[#6947FF]">script.js</code>) without build-step dependencies.
          </p>
        </section>

        <!-- 04. Local Workspace -->
        <section id="workspace" class="space-y-4">
          <div class="border-b border-[#E5E4EA] dark:border-[#242738] pb-3 flex items-center justify-between">
            <h2 class="font-display text-xl font-bold text-[#14151B] dark:text-[#F1F2F6]">
              03 // Local Workspace & Preview
            </h2>
            <span class="text-[11px] font-mono text-[#696976] dark:text-[#9496A6]">Stages 2-4</span>
          </div>
          <p class="text-xs sm:text-sm text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Create a local directory named <code class="font-mono text-[#6947FF]">my-portfolio</code> and organize the source files:
          </p>
          <div class="p-4 rounded-xl bg-[#0E1017] text-[#F1F2F6] font-mono text-xs border border-[#242738] leading-relaxed">
            my-portfolio/<br/>
            ├── index.html<br/>
            ├── styles.css<br/>
            └── script.js
          </div>
          <p class="text-xs text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Open the folder in <span class="font-semibold text-[#14151B] dark:text-[#F1F2F6]">VS Code</span>, right-click <code class="font-mono text-[#6947FF]">index.html</code>, and select <strong>"Open with Live Server"</strong> to verify layout responsiveness and interactive links in your browser.
          </p>
        </section>

        <!-- 05. Git & GitHub Setup -->
        <section id="git-setup" class="space-y-4">
          <div class="border-b border-[#E5E4EA] dark:border-[#242738] pb-3 flex items-center justify-between">
            <h2 class="font-display text-xl font-bold text-[#14151B] dark:text-[#F1F2F6]">
              04 // Git Initialization & Remote Push
            </h2>
            <button 
              @click="copyCode(gitCommands, 'Git Commands')"
              class="btn-secondary text-xs py-1 px-3"
            >
              <Check v-if="copiedSnippet === 'Git Commands'" class="w-3.5 h-3.5 text-emerald-500 mr-1" />
              <Copy v-else class="w-3.5 h-3.5 mr-1" />
              {{ copiedSnippet === 'Git Commands' ? 'Copied' : 'Copy Commands' }}
            </button>
          </div>
          <p class="text-xs sm:text-sm text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Create a public repository on <a href="https://github.com/new" target="_blank" class="text-[#6947FF] font-semibold underline inline-flex items-center gap-0.5">GitHub.com <ExternalLink class="w-3 h-3" /></a>, then run the following commands in your VS Code Terminal:
          </p>
          <div class="p-4 rounded-xl bg-[#0E1017] text-[#F1F2F6] font-mono text-xs overflow-x-auto leading-relaxed border border-[#242738] whitespace-pre">
{{ gitCommands }}
          </div>
        </section>

        <!-- 06. GitHub Actions CI/CD -->
        <section id="actions" class="space-y-4">
          <div class="border-b border-[#E5E4EA] dark:border-[#242738] pb-3 flex items-center justify-between">
            <h2 class="font-display text-xl font-bold text-[#14151B] dark:text-[#F1F2F6]">
              05 // GitHub Actions Automated Workflow
            </h2>
            <button 
              @click="copyCode(workflowYaml, 'GitHub Actions Workflow')"
              class="btn-secondary text-xs py-1 px-3"
            >
              <Check v-if="copiedSnippet === 'GitHub Actions Workflow'" class="w-3.5 h-3.5 text-emerald-500 mr-1" />
              <Copy v-else class="w-3.5 h-3.5 mr-1" />
              {{ copiedSnippet === 'GitHub Actions Workflow' ? 'Copied' : 'Copy YAML' }}
            </button>
          </div>
          <p class="text-xs sm:text-sm text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Create a file at <code class="font-mono text-[#6947FF]">.github/workflows/deploy.yml</code> in your repository and paste:
          </p>
          <div class="p-4 rounded-xl bg-[#0E1017] text-[#F1F2F6] font-mono text-xs overflow-x-auto leading-relaxed border border-[#242738] whitespace-pre">
{{ workflowYaml }}
          </div>
          <div class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
            <strong>GitHub Settings Requirement:</strong> In your GitHub repository, navigate to <strong>Settings &gt; Pages</strong> and set <strong>Build and deployment &gt; Source</strong> to <strong>"GitHub Actions"</strong>.
          </div>
        </section>

        <!-- 07. Verify & Live URL -->
        <section id="live-url" class="space-y-4">
          <div class="border-b border-[#E5E4EA] dark:border-[#242738] pb-3 flex items-center justify-between">
            <h2 class="font-display text-xl font-bold text-[#14151B] dark:text-[#F1F2F6]">
              06 // Verify Deployment & Live URL
            </h2>
            <span class="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">● Published</span>
          </div>
          <p class="text-xs sm:text-sm text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Monitor the deployment progress under the <strong>Actions</strong> tab on GitHub. Once complete, your portfolio is published at:
          </p>
          <div class="p-3.5 rounded-xl bg-white dark:bg-[#161822] border border-[#E5E4EA] dark:border-[#242738] font-mono text-xs text-[#6947FF]">
            https://&lt;username&gt;.github.io/&lt;repository&gt;/
          </div>
          <p class="text-xs text-[#696976] dark:text-[#9496A6] leading-relaxed">
            Every subsequent commit pushed to <code class="font-mono text-[#6947FF]">main</code> automatically triggers a fresh build and live update.
          </p>
        </section>

      </div>

    </div>

  </div>
</template>
