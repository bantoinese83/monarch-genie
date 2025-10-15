import { useState, useCallback } from 'react'
import { useProjectsStore } from '@/features/projects/stores/projects-store'
import { useUiStore } from '@/features/projects/stores/ui-store'

export function useProjectManagement() {
  const { select, rename, remove, createFromBlueprint, reset } =
    useProjectsStore()
  const { clearError } = useUiStore()
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null)

  const handleNewProject = useCallback(() => {
    reset()
    clearError()
    return { prompt: '', blueprint: '' }
  }, [reset, clearError])

  const handleSelectProject = useCallback(
    (projectId: string, projects: any[]) => {
      const project = projects.find(p => p.id === projectId)
      if (project) {
        select(project.id)
        clearError()
        return { prompt: project.prompt, blueprint: project.blueprint }
      }
      return null
    },
    [select, clearError]
  )

  const handleOpenSettings = useCallback((projectId: string) => {
    setEditingProjectId(projectId)
  }, [])

  const handleCloseSettings = useCallback(() => {
    setEditingProjectId(null)
  }, [])

  const handleRenameProject = useCallback(
    (projectId: string, newTitle: string) => {
      rename(projectId, newTitle)
      setEditingProjectId(null)
    },
    [rename]
  )

  const handleDeleteProject = useCallback(
    (
      projectId: string,
      activeProjectId: string | null,
      onNewProject: () => void
    ) => {
      if (
        window.confirm(
          'Are you sure you want to delete this project? This action cannot be undone.'
        )
      ) {
        if (activeProjectId === projectId) {
          onNewProject()
        }
        remove(projectId)
        setEditingProjectId(null)
      }
    },
    [remove]
  )

  return {
    editingProjectId,
    handleNewProject,
    handleSelectProject,
    handleOpenSettings,
    handleCloseSettings,
    handleRenameProject,
    handleDeleteProject,
  }
}
