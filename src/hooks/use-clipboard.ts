import { useCallback, useState } from 'react'

export function useClipboard(timeoutMs: number = 1500) {
  const [copied, setCopied] = useState(false)

  const copyText = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        window.setTimeout(() => setCopied(false), timeoutMs)
        return true
      } catch {
        return false
      }
    },
    [timeoutMs]
  )

  return { copied, copyText }
}
