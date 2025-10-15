import { useState, useEffect } from 'react'
import { useProjects } from '@/features/projects/hooks/use-projects'
import { useUiStore } from '@/features/projects/stores/ui-store'
import { useProjectManagement } from '@/hooks/use-project-management'
import { useBlueprintGenerationLogic } from '@/hooks/use-blueprint-generation-logic'

export function useAppState() {
  const { projects, activeProjectId } = useProjects()
  const { error, clearError, isLoading } = useUiStore()
  const projectManagement = useProjectManagement()
  const blueprintLogic = useBlueprintGenerationLogic()

  const activeProject = projects.find(p => p.id === activeProjectId) || null
  const editingProject =
    projects.find(p => p.id === projectManagement.editingProjectId) || null

  useEffect(() => {
    if (error) clearError()
  }, [blueprintLogic.currentPrompt, error, clearError])

  const handleNewProject = () => {
    const resetData = projectManagement.handleNewProject()
    blueprintLogic.updatePrompt(resetData.prompt)
    blueprintLogic.updateBlueprint(resetData.blueprint)
  }

  const handleSelectProject = (projectId: string) => {
    const projectData = projectManagement.handleSelectProject(
      projectId,
      projects
    )
    if (projectData) {
      blueprintLogic.updatePrompt(projectData.prompt)
      blueprintLogic.updateBlueprint(projectData.blueprint)
    }
  }

  const handleDeleteProject = (projectId: string) => {
    projectManagement.handleDeleteProject(
      projectId,
      activeProjectId,
      handleNewProject
    )
  }

  return {
    projects,
    activeProjectId,
    activeProject,
    editingProject,
    error,
    isLoading,
    ...blueprintLogic,
    ...projectManagement,
    handleNewProject,
    handleSelectProject,
    handleDeleteProject,
  }
}
