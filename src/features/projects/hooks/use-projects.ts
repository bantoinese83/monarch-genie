import { useEffect } from 'react'
import type { Project } from '@/types'
import { useProjectsStore } from '@/features/projects/stores/projects-store'
import { loadAllProjects, saveProjects } from '@/lib/storage'
import { STREAM_CONFIG } from '@/config/constants'

export function useProjects() {
  const { projects, activeProjectId, editingProjectId, setAll } =
    useProjectsStore()

  useEffect(() => {
    let mounted = true
    loadAllProjects<Project>().then(loaded => {
      if (mounted) setAll(loaded)
    })
    return () => {
      mounted = false
    }
  }, [setAll])

  useEffect(() => {
    const id = setTimeout(() => {
      void saveProjects<Project>(projects)
    }, STREAM_CONFIG.saveDebounceMs)
    return () => clearTimeout(id)
  }, [projects])

  return { projects, activeProjectId, editingProjectId }
}
