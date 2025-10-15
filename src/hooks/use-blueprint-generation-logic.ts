import { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useBlueprintGeneration } from '@/features/generation/hooks/use-blueprint-generation'
import { useProjectsStore } from '@/features/projects/stores/projects-store'
import { useUiStore } from '@/features/projects/stores/ui-store'
import { extractAppName } from '@/features/generation/services/ai'

export function useBlueprintGenerationLogic() {
  const { createFromBlueprint } = useProjectsStore()
  const { startLoading, stopLoading, setError } = useUiStore()
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [currentBlueprint, setCurrentBlueprint] = useState('')

  let finalBlueprintLocal = ''
  const { generate } = useBlueprintGeneration(
    chunk => {
      finalBlueprintLocal += chunk
      setCurrentBlueprint(prev => prev + chunk)
    },
    () => {},
    msg => setError(msg)
  )

  const handleGenerateStream = useCallback(async () => {
    if (!currentPrompt.trim()) {
      setError('Please enter an application idea.')
      return
    }
    startLoading()
    setCurrentBlueprint('')

    const newProjectId = uuidv4()
    finalBlueprintLocal = ''

    try {
      await generate(currentPrompt)

      // Extract AI-generated app name from the blueprint content
      const appName = extractAppName(finalBlueprintLocal)
      const title = appName || currentPrompt.substring(0, 40) + (currentPrompt.length > 40 ? '...' : '')
      
      createFromBlueprint(
        title,
        currentPrompt,
        finalBlueprintLocal,
        newProjectId
      )
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError('An unknown error occurred.')
      }
    } finally {
      stopLoading()
    }
  }, [
    currentPrompt,
    generate,
    createFromBlueprint,
    startLoading,
    stopLoading,
    setError,
  ])

  const updatePrompt = useCallback((prompt: string) => {
    setCurrentPrompt(prompt)
  }, [])

  const updateBlueprint = useCallback((blueprint: string) => {
    setCurrentBlueprint(blueprint)
  }, [])

  return {
    currentPrompt,
    currentBlueprint,
    handleGenerateStream,
    updatePrompt,
    updateBlueprint,
  }
}
