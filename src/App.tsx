import React, { Suspense, lazy } from 'react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { MainContent } from '@/components/layout/MainContent'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useAppState } from '@/hooks/use-app-state'
import { useKeyboardShortcuts, createAppShortcuts } from '@/hooks/use-keyboard-shortcuts'
import { analytics } from '@/lib/analytics'
import { measureWebVitals, startMemoryMonitoring } from '@/lib/performance-monitor'

// Lazy load modals for better performance
const ProjectSettingsModal = lazy(() => import('@/components/modals/ProjectSettingsModal').then(m => ({ default: m.ProjectSettingsModal })))

const App: React.FC = () => {
  const {
    projects,
    activeProjectId,
    activeProject,
    editingProject,
    error,
    isLoading,
    currentPrompt,
    currentBlueprint,
    handleGenerateStream,
    updatePrompt,
    handleNewProject,
    handleSelectProject,
    handleOpenSettings,
    handleCloseSettings,
    handleRenameProject,
    handleDeleteProject,
  } = useAppState()

  // Set up keyboard shortcuts
  const shortcuts = createAppShortcuts(
    handleNewProject,
    () => {
      // Focus search - we'll need to add a ref to the search input
      const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement
      searchInput?.focus()
    },
    editingProject ? handleCloseSettings : undefined
  )
  
  useKeyboardShortcuts(shortcuts)

  // Track app initialization and start monitoring
  React.useEffect(() => {
    analytics.track('app_initialized')
    measureWebVitals()
    startMemoryMonitoring(30000) // Check memory every 30 seconds
  }, [])

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-[#2a2f3a] text-gray-100 font-sans antialiased bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre-v2.png')]">
        <Sidebar
          projects={projects}
          activeProjectId={activeProjectId}
          onSelectProject={handleSelectProject}
          onNewProject={handleNewProject}
          onOpenSettings={handleOpenSettings}
        />
        <div className="flex flex-col flex-1">
          <Header />
          <MainContent
            currentPrompt={currentPrompt}
            currentBlueprint={currentBlueprint}
            isLoading={isLoading}
            error={error}
            activeProjectId={activeProjectId}
            onGenerate={handleGenerateStream}
            onPromptChange={updatePrompt}
          />
        </div>
        {editingProject && (
          <Suspense fallback={<LoadingSpinner />}>
            <ProjectSettingsModal
              project={editingProject}
              onClose={handleCloseSettings}
              onRename={handleRenameProject}
              onDelete={handleDeleteProject}
            />
          </Suspense>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App
