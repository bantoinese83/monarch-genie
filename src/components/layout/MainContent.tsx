import React from 'react'
import { PromptInput } from '@/components/PromptInput'
import BlueprintDisplay from '@/components/BlueprintDisplay'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { EmptyState } from '@/components/ui/EmptyState'

interface MainContentProps {
  currentPrompt: string
  currentBlueprint: string
  isLoading: boolean
  error: string | null
  activeProjectId: string | null
  onGenerate: () => void
  onPromptChange: (prompt: string) => void
}

export function MainContent({
  currentPrompt,
  currentBlueprint,
  isLoading,
  error,
  activeProjectId,
  onGenerate,
  onPromptChange,
}: MainContentProps) {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto md:ml-0">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="bg-slate-800/50 p-6 rounded-2xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_4px_6px_rgba(0,0,0,0.2)] border border-slate-700/80 mb-6">
          <PromptInput
            onGenerate={onGenerate}
            isLoading={isLoading}
            prompt={currentPrompt}
            onPromptChange={onPromptChange}
            isReadOnly={!!activeProjectId}
          />
        </div>

        {error && (
          <p className="text-red-400 my-4 text-center bg-red-900/50 p-3 rounded-lg">
            {error}
          </p>
        )}

        <div className="flex-grow flex flex-col min-h-0 relative">
          {isLoading && !currentBlueprint && <LoadingSpinner />}

          {!!currentBlueprint && (
            <div className="transition-opacity duration-300 ease-out opacity-100">
              <BlueprintDisplay
                key={activeProjectId}
                content={currentBlueprint}
              />
            </div>
          )}

          {isLoading && !!currentBlueprint && (
            <ProgressBar className="pointer-events-none absolute left-0 right-0 top-0" />
          )}

          {!isLoading && !currentBlueprint && <EmptyState />}
        </div>
      </div>
    </main>
  )
}
