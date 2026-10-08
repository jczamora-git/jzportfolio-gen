import { ref, onMounted } from 'vue'

export type AppTheme = 'light' | 'dark'

const currentTheme = ref<AppTheme>('light')

export function useTheme() {
  function applyTheme(theme: AppTheme) {
    currentTheme.value = theme
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('portfolio-launchpad:ui-theme', theme)
    }
  }

  function toggleTheme() {
    applyTheme(currentTheme.value === 'dark' ? 'light' : 'dark')
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-launchpad:ui-theme') as AppTheme | null
      if (saved === 'dark' || saved === 'light') {
        applyTheme(saved)
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark')
      } else {
        applyTheme('light')
      }
    }
  })

  return {
    theme: currentTheme,
    toggleTheme,
    applyTheme,
  }
}
