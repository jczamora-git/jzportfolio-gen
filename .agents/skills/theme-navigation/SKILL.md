---
name: theme-navigation
description: Light/dark theme synchronization, floating capsule navbar, and mobile navigation safety.
---

# Skill: Theme & Navigation

## Core Responsibilities
1. **Single Source of Truth Theme State**: Guard `src/composables/useTheme.ts`. Ensure reactive `currentTheme`, synchronous root class `.dark` toggle on `document.documentElement`, and `localStorage` persistence.
2. **Permanent Dark Navigation Pill**: `AppHeader.vue` uses a floating dark capsule (`bg-[#12131C]/95 dark:bg-[#1A1A24]/95`) in **both** light and dark modes.
3. **Consistent Dark Mobile Dropdown**: The mobile dropdown menu (`#mobile-nav-menu`) must remain permanently dark (`bg-[#12131C]/98 dark:bg-[#1A1A24]/98 text-white`) across both light and dark themes.
4. **Mobile Menu Lifecycle & Accessibility**:
   - Close on outside click.
   - Close on `Escape` keydown.
   - Close on route navigation / link click.
   - Accessible buttons (`type="button"`, `aria-expanded`, `aria-controls`, `aria-label`).
5. **Seam & Glitch Prevention**: Ensure zero horizontal seams between navbar and hero, and zero rectangular transition cuts during rapid theme switching.

---

## Implementation Rules & Patterns

### 1. Theme Composable Implementation
```ts
// src/composables/useTheme.ts
// Synchronous initialization prevents flash-of-wrong-theme
const currentTheme = ref<AppTheme>(getInitialTheme())
syncHtmlClass(currentTheme.value)

export function useTheme() {
  function applyTheme(theme: AppTheme) {
    currentTheme.value = theme
    syncHtmlClass(theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }
  function toggleTheme() {
    applyTheme(currentTheme.value === 'dark' ? 'light' : 'dark')
  }
  return { theme: currentTheme, toggleTheme, applyTheme }
}
```

### 2. Header / Hero Background Ownership
- In `App.vue`: Root container class is dynamic:
  - On `/` (landing): `bg-white dark:bg-[#20202B]` (matches upper hero sheet exactly).
  - On `/builder`, `/result`, `/learn/deploy`, `/privacy`: `bg-[#F7F7F9] dark:bg-[#101015]` (matches interior view backgrounds).

### 3. Mobile Navigation Dropdown
```html
<Transition name="mobile-menu">
  <div 
    v-if="mobileMenuOpen" 
    id="mobile-nav-menu"
    class="md:hidden mt-2 max-w-5xl mx-auto bg-[#12131C]/98 dark:bg-[#1A1A24]/98 backdrop-blur-lg border border-[#242738] dark:border-[#414151]/80 rounded-3xl p-4 sm:p-5 space-y-2 shadow-2xl text-xs text-white"
  >
    <!-- Navigation Links & Start Building CTA -->
  </div>
</Transition>
```
