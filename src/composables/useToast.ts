import { ref } from 'vue'

export interface ToastMessage {
  id: string
  title: string
  description?: string
  type: 'success' | 'info' | 'warning' | 'error'
  duration?: number
}

const toasts = ref<ToastMessage[]>([])

export function useToast() {
  function showToast(toast: Omit<ToastMessage, 'id'>) {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    const duration = toast.duration ?? 3500
    const newToast: ToastMessage = { ...toast, id, duration }
    
    toasts.value.push(newToast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  function removeToast(id: string) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    showToast,
    removeToast,
  }
}
