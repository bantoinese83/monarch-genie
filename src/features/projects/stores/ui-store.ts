import { create } from 'zustand'

type UiState = {
  isLoading: boolean
  error: string | null
}

type UiActions = {
  startLoading: () => void
  stopLoading: () => void
  setError: (msg: string) => void
  clearError: () => void
}

export const useUiStore = create<UiState & UiActions>(set => ({
  isLoading: false,
  error: null,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
  setError: msg => set({ error: msg }),
  clearError: () => set({ error: null }),
}))
