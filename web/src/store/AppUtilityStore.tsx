import { create } from 'zustand'

type AppUtilityStore = {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void

  selectedMemberId: number
  setSelectedMemberId: (id: number) => void

  searchQuery: string
  setSearchQuery: (query: string) => void
}

export type ToastType = 'success' | 'error' | 'info' | 'loading' | 'default'

export type Toast = {
  id: string
  type: ToastType
  message: string
  title?: string
  duration?: number
}

export const useAppUtilityStore = create<AppUtilityStore>((set) => ({
  toasts: [],

  //selected member param
  selectedMemberId: null,
  setSelectedMemberId: (id) => set({ selectedMemberId: id }),

  // search state management
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  addToast: (toast) => {
    const id = Math.random().toString(36).substr(2, 9) // Generate unique ID
    set((state) => ({ toasts: [...state.toasts, { id, ...toast }] }))

    // Auto-remove toast after duration
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, toast.duration || 3000)
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
  },
}))
