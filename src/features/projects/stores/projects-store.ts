import { create } from 'zustand'
import type { Project } from '@/types'

type ProjectsState = {
  projects: Project[]
  activeProjectId: string | null
  editingProjectId: string | null
}

type ProjectsActions = {
  setAll: (projects: Project[]) => void
  select: (projectId: string | null) => void
  setEditing: (projectId: string | null) => void
  createFromBlueprint: (
    title: string,
    prompt: string,
    blueprint: string,
    id: string
  ) => void
  rename: (projectId: string, newTitle: string) => void
  remove: (projectId: string) => void
  reset: () => void
}

export const useProjectsStore = create<ProjectsState & ProjectsActions>(
  (set, get) => ({
    projects: [],
    activeProjectId: null,
    editingProjectId: null,

    setAll: projects => set({ projects }),
    select: projectId => set({ activeProjectId: projectId }),
    setEditing: projectId => set({ editingProjectId: projectId }),

    createFromBlueprint: (title, prompt, blueprint, id) => {
      const newProject: Project = {
        id,
        title,
        prompt,
        blueprint,
        createdAt: new Date().toISOString(),
      }
      set({
        projects: [newProject, ...get().projects],
        activeProjectId: id,
      })
    },

    rename: (projectId, newTitle) => {
      set({
        projects: get().projects.map(p =>
          p.id === projectId ? { ...p, title: newTitle.trim() } : p
        ),
      })
    },

    remove: projectId => {
      const { activeProjectId } = get()
      const nextProjects = get().projects.filter(p => p.id !== projectId)
      set({
        projects: nextProjects,
        activeProjectId: activeProjectId === projectId ? null : activeProjectId,
      })
    },

    reset: () => set({ activeProjectId: null }),
  })
)
