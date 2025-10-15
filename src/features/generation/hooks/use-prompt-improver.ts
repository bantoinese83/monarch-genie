import { useCallback, useState } from 'react'
import { improvePrompt } from '@/features/generation/services/ai'

export function usePromptImprover() {
  const [isImproving, setIsImproving] = useState(false)

  const improve = useCallback(
    async (prompt: string): Promise<string | null> => {
      setIsImproving(true)
      try {
        const improved = await improvePrompt(prompt)
        return improved
      } catch {
        return null
      } finally {
        setIsImproving(false)
      }
    },
    []
  )

  return { isImproving, improve }
}
