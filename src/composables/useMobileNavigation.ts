import { ref } from 'vue'

/**
 * Authoritative mobile navigation state management
 * Enforces a single source of truth for open/close state, deterministic transitions,
 * outside-click containment, keyboard escape, and responsive breakpoint sync.
 */
export function useMobileNavigation() {
  const isMobileMenuOpen = ref(false)

  function openMobileMenu() {
    isMobileMenuOpen.value = true
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false
  }

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  function handleClickOutside(
    target: EventTarget | null,
    boundaryElement: HTMLElement | null,
    composedPath: EventTarget[] = []
  ) {
    if (!isMobileMenuOpen.value || !boundaryElement) return

    // If event originated inside navigation boundary (via composedPath or contains check), ignore
    if (composedPath.includes(boundaryElement)) {
      return
    }

    if (
      (typeof Node !== 'undefined' && target instanceof Node && boundaryElement.contains(target)) ||
      (typeof boundaryElement.contains === 'function' && target && boundaryElement.contains(target as Node))
    ) {
      return
    }

    closeMobileMenu()
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isMobileMenuOpen.value) {
      closeMobileMenu()
    }
  }

  function handleBreakpointChange(matchesDesktop: boolean) {
    if (matchesDesktop && isMobileMenuOpen.value) {
      closeMobileMenu()
    }
  }

  return {
    isOpen: isMobileMenuOpen,
    open: openMobileMenu,
    close: closeMobileMenu,
    toggle: toggleMobileMenu,
    handleClickOutside,
    handleKeydown,
    handleBreakpointChange
  }
}
