import { ref } from 'vue'

export type AppTheme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'portfolio-launchpad:ui-theme'

function getInitialTheme(): AppTheme {
  if (typeof window === 'undefined') return 'light'
  try {
    const storage = window.localStorage || (typeof localStorage !== 'undefined' ? localStorage : null)
    if (storage) {
      const saved = storage.getItem(THEME_STORAGE_KEY)
      if (saved === 'dark' || saved === 'light') {
        return saved
      }
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
  } catch {
    // Safe fallback if localStorage is blocked
  }
  return 'light'
}

const currentTheme = ref<AppTheme>(getInitialTheme())

// Immediately synchronize root class upon execution in browser
function syncHtmlClass(theme: AppTheme) {
  if (typeof document !== 'undefined' && document.documentElement) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

// Initial sync
syncHtmlClass(currentTheme.value)

export function useTheme() {
  function applyTheme(theme: AppTheme) {
    currentTheme.value = theme
    syncHtmlClass(theme)
    if (typeof window !== 'undefined') {
      try {
        const storage = window.localStorage || (typeof localStorage !== 'undefined' ? localStorage : null)
        if (storage) {
          storage.setItem(THEME_STORAGE_KEY, theme)
        }
      } catch {
        // Safe fallback
      }
    }
  }

  function toggleTheme() {
    applyTheme(currentTheme.value === 'dark' ? 'light' : 'dark')
  }

  return {
    theme: currentTheme,
    toggleTheme,
    applyTheme,
  }
}
