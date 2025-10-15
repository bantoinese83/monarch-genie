import { useCallback, useRef } from 'react'
import { generateBlueprintStream } from '@/features/generation/services/ai'

export function useBlueprintGeneration(
  onChunk: (c: string) => void,
  onDone: (full: string) => void,
  onError: (err: string) => void
) {
  const controllerRef = useRef<AbortController | null>(null)

  const generate = useCallback(
    async (prompt: string) => {
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
      controllerRef.current = new AbortController()
      let final = ''
      try {
        await generateBlueprintStream(prompt, chunk => {
          final += chunk
          onChunk(chunk)
        })
        onDone(final)
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error'
        onError(message)
      } finally {
        controllerRef.current = null
      }
    },
    [onChunk, onDone, onError]
  )

  const cancel = useCallback(() => {
    controllerRef.current?.abort()
    controllerRef.current = null
  }, [])

  return { generate, cancel }
}
