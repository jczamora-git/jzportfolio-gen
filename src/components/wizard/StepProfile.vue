<script setup lang="ts">
import { computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import FormField from '@/components/common/FormField.vue'
import { User, Briefcase, Mail, Github, Linkedin, Globe, MapPin, Info, Image as ImageIcon } from 'lucide-vue-next'

const portfolioStore = usePortfolioStore()
const profile = computed(() => portfolioStore.draft.profile)

const nameError = computed(() => {
  if (!profile.value.fullName) return ''
  if (profile.value.fullName.trim().length < 2) return 'Full name must be at least 2 characters'
  return ''
})

const headlineError = computed(() => {
  if (!profile.value.headline) return ''
  if (profile.value.headline.trim().length < 2) return 'Professional headline must be at least 2 characters'
  return ''
})

const emailError = computed(() => {
  if (!profile.value.email) return ''
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.value.email)
  return valid ? '' : 'Please enter a valid email address'
})

const urlError = (url?: string) => {
  if (!url || url.trim() === '') return ''
  try {
    const u = new URL(url)
    return (u.protocol === 'http:' || u.protocol === 'https:') ? '' : 'URL must start with https://'
  } catch {
    return 'Please enter a valid URL (e.g. https://github.com/username)'
  }
}
</script>

<template>
  <div class="space-y-8 animate-fadeIn">
    <!-- Section Header -->
    <div class="border-b border-slate-200/80 dark:border-slate-800 pb-5">
      <div class="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
        <User class="w-4 h-4" />
        Step 1 of 5
      </div>
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
        Personal Profile & Header Details
      </h2>
      <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
        Enter the core information you want prominently featured in your portfolio's hero section.
      </p>
    </div>

    <!-- Public Notice Alert -->
    <div class="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-3 text-xs text-indigo-900 dark:text-indigo-300">
      <Info class="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
      <div>
        <span class="font-semibold">Privacy Reminder:</span> 
        Only enter details you are comfortable displaying publicly on your portfolio website. No private contact info or sensitive documents required.
      </div>
    </div>

    <!-- Main Form Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Full Name (Required) -->
      <FormField 
        label="Full Name" 
        id="fullName" 
        required 
        :error="nameError"
        help="Your real name or preferred professional moniker."
      >
        <div class="relative">
          <input 
            id="fullName"
            type="text" 
            v-model="profile.fullName"
            placeholder="e.g. Alex Morgan" 
            class="input-base pl-10"
            required
          />
          <User class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>
      </FormField>

      <!-- Headline (Required) -->
      <FormField 
        label="Professional Headline / Target Role" 
        id="headline" 
        required 
        :error="headlineError"
        help="What role are you pursuing or currently practicing?"
      >
        <div class="relative">
          <input 
            id="headline"
            type="text" 
            v-model="profile.headline"
            placeholder="e.g. Aspiring Full-Stack Developer | CS Student" 
            class="input-base pl-10"
            required
          />
          <Briefcase class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>
      </FormField>

      <!-- Location (Optional) -->
      <FormField 
        label="General Location" 
        id="location" 
        optional 
        help="City, State / Region or 'Remote'. Avoid street addresses."
      >
        <div class="relative">
          <input 
            id="location"
            type="text" 
            v-model="profile.location"
            placeholder="e.g. Seattle, WA or Remote" 
            class="input-base pl-10"
          />
          <MapPin class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>
      </FormField>

      <!-- Public Contact Email (Optional) -->
      <FormField 
        label="Public Contact Email" 
        id="email" 
        optional 
        :error="emailError"
        help="Email address for potential recruiters and collaborators."
      >
        <div class="relative">
          <input 
            id="email"
            type="email" 
            v-model="profile.email"
            placeholder="e.g. alex.dev@example.com" 
            class="input-base pl-10"
          />
          <Mail class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>
      </FormField>

      <!-- Biography / About Me (Optional) -->
      <div class="md:col-span-2">
        <FormField 
          label="Short Introduction / About Me" 
          id="about" 
          optional 
          help="A brief 1-3 paragraph summary of your background, interests, and what drives you."
        >
          <div class="relative">
            <textarea 
              id="about"
              rows="4" 
              v-model="profile.about"
              maxlength="1000"
              placeholder="e.g. I am a computer science student passionate about building clean, accessible web applications and developer tools. When not coding, I contribute to student hackathons and explore cloud automation." 
              class="input-base resize-y"
            ></textarea>
            <div class="text-right text-[11px] text-slate-400 mt-1">
              {{ (profile.about || '').length }} / 1000 characters
            </div>
          </div>
        </FormField>
      </div>

      <!-- Online Presence / Links Header -->
      <div class="md:col-span-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <h3 class="text-sm font-semibold text-slate-900 dark:text-white">
          Social Links & Online Presence
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Leave blank any platform you don't use.
        </p>
      </div>

      <!-- GitHub URL -->
      <FormField 
        label="GitHub Profile URL" 
        id="githubUrl" 
        optional 
        :error="urlError(profile.githubUrl)"
      >
        <div class="relative">
          <input 
            id="githubUrl"
            type="url" 
            v-model="profile.githubUrl"
            placeholder="https://github.com/yourusername" 
            class="input-base pl-10"
          />
          <Github class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>
      </FormField>

      <!-- LinkedIn URL -->
      <FormField 
        label="LinkedIn Profile URL" 
        id="linkedinUrl" 
        optional 
        :error="urlError(profile.linkedinUrl)"
      >
        <div class="relative">
          <input 
            id="linkedinUrl"
            type="url" 
            v-model="profile.linkedinUrl"
            placeholder="https://linkedin.com/in/yourname" 
            class="input-base pl-10"
          />
          <Linkedin class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>
      </FormField>

      <!-- Personal Website / Blog URL -->
      <FormField 
        label="Personal Website / Blog" 
        id="websiteUrl" 
        optional 
        :error="urlError(profile.websiteUrl)"
      >
        <div class="relative">
          <input 
            id="websiteUrl"
            type="url" 
            v-model="profile.websiteUrl"
            placeholder="https://yourblog.dev" 
            class="input-base pl-10"
          />
          <Globe class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>
      </FormField>

      <!-- Photo Preference -->
      <FormField 
        label="Profile Photo Slot" 
        id="photoPreference" 
        optional 
        help="How should the generated portfolio handle your avatar/headshot?"
      >
        <div class="relative">
          <select 
            id="photoPreference"
            v-model="profile.photoPreference"
            class="input-base pl-10 appearance-none cursor-pointer"
          >
            <option value="placeholder">Include clean avatar placeholder (replace with your photo later)</option>
            <option value="none">No photo slot (text and badges only)</option>
          </select>
          <ImageIcon class="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>
      </FormField>

    </div>
  </div>
</template>
