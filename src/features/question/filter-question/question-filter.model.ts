import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { questionTypes } from '@/entities/question'

type State = {
  tabFilter: questionTypes.TabFilter
  selectedTags: string[]
}

type Actions = {
  setTabFilter: (tabFilter: questionTypes.TabFilter) => void
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
  resetTags: () => void
  resetFilters: () => void
}

const defaultFilter: State = {
  tabFilter: 'newest',
  selectedTags: [],
}

export const useFilterStore = create<State & Actions>()(
  devtools((set) => ({
    ...defaultFilter,

    setTabFilter: (tabFilter) => {
      set({ tabFilter })
    },

    addTag: (tag) => {
      set((state) => ({
        selectedTags: state.selectedTags.includes(tag)
          ? state.selectedTags
          : [...state.selectedTags, tag],
      }))
    },

    removeTag: (tag) => {
      set((state) => ({
        selectedTags: state.selectedTags.filter((t) => t !== tag),
      }))
    },

    resetTags: () => {
      set({ selectedTags: [] })
    },

    resetFilters: () => {
      set(defaultFilter)
    },
  })),
)
