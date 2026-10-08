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
  <div class="space-y-6 animate-fadeIn">
    <!-- Step Header -->
    <div class="border-b border-[#E8E8EF] dark:border-[#232738] pb-4">
      <div class="text-[11px] font-bold text-[#6D4AFF] uppercase tracking-wider mb-1">
        Step 1 of 5
      </div>
      <h2 class="text-xl sm:text-2xl font-bold text-[#181824] dark:text-[#F3F4F8] tracking-tight">
        Personal Profile & Header
      </h2>
      <p class="text-xs sm:text-sm text-[#737385] dark:text-[#9496A8] mt-1">
        Enter the primary details for your portfolio's hero and introduction section.
      </p>
    </div>

    <!-- Compact Privacy Notice -->
    <div class="p-3 rounded-xl bg-[#F2EEFF]/60 dark:bg-brand-950/30 border border-[#E8E8EF] dark:border-[#232738] flex items-center gap-2.5 text-xs text-[#737385] dark:text-[#9496A8]">
      <Info class="w-4 h-4 text-[#6D4AFF] shrink-0" />
      <span>Only add information you are comfortable displaying publicly on your portfolio website.</span>
    </div>

    <!-- Main Form Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      
      <!-- Full Name -->
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
            class="input-base pl-9"
            required
          />
          <User class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      </FormField>

      <!-- Headline -->
      <FormField 
        label="Professional Headline / Target Role" 
        id="headline" 
        required 
        :error="headlineError"
        help="What role are you currently practicing or pursuing?"
      >
        <div class="relative">
          <input 
            id="headline"
            type="text" 
            v-model="profile.headline"
            placeholder="e.g. Aspiring Frontend Developer | CS Student" 
            class="input-base pl-9"
            required
          />
          <Briefcase class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      </FormField>

      <!-- Location -->
      <FormField 
        label="General Location" 
        id="location" 
        optional 
        help="City, State / Region or 'Remote'. Avoid specific street addresses."
      >
        <div class="relative">
          <input 
            id="location"
            type="text" 
            v-model="profile.location"
            placeholder="e.g. Seattle, WA or Remote" 
            class="input-base pl-9"
          />
          <MapPin class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      </FormField>

      <!-- Public Contact Email -->
      <FormField 
        label="Public Contact Email" 
        id="email" 
        optional 
        :error="emailError"
        help="Public email for recruiters and inquiries."
      >
        <div class="relative">
          <input 
            id="email"
            type="email" 
            v-model="profile.email"
            placeholder="e.g. alex.dev@example.com" 
            class="input-base pl-9"
          />
          <Mail class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      </FormField>

      <!-- Biography / About Me -->
      <div class="md:col-span-2">
        <FormField 
          label="Short Introduction / About Me" 
          id="about" 
          optional 
          help="A concise 1-3 paragraph summary of your background, interests, and passion."
        >
          <div class="relative">
            <textarea 
              id="about"
              rows="3" 
              v-model="profile.about"
              maxlength="1000"
              placeholder="e.g. I am a computer science student passionate about building clean, accessible web applications and developer tools." 
              class="input-base resize-y text-xs sm:text-sm"
            ></textarea>
            <div class="text-right text-[10px] text-[#737385] dark:text-[#9496A8] mt-1">
              {{ (profile.about || '').length }} / 1000 characters
            </div>
          </div>
        </FormField>
      </div>

      <!-- Online Presence Section Header -->
      <div class="md:col-span-2 pt-2 border-t border-[#E8E8EF] dark:border-[#232738]">
        <h3 class="text-xs font-bold text-[#181824] dark:text-[#F3F4F8] uppercase tracking-wider">
          Links & Online Profiles
        </h3>
        <p class="text-[11px] text-[#737385] dark:text-[#9496A8] mt-0.5">
          Leave blank any platform you don't actively maintain.
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
            class="input-base pl-9"
          />
          <Github class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
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
            class="input-base pl-9"
          />
          <Linkedin class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
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
            class="input-base pl-9"
          />
          <Globe class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      </FormField>

      <!-- Photo Preference -->
      <FormField 
        label="Profile Photo Slot" 
        id="photoPreference" 
        optional 
        help="How should the generated site structure your avatar?"
      >
        <div class="relative">
          <select 
            id="photoPreference"
            v-model="profile.photoPreference"
            class="input-base pl-9 appearance-none cursor-pointer"
          >
            <option value="placeholder">Include clean avatar placeholder (customizable later)</option>
            <option value="none">No photo slot (clean text & badges)</option>
          </select>
          <ImageIcon class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      </FormField>

    </div>
  </div>
</template>
