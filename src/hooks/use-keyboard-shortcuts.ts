import { useEffect, useCallback } from 'react'

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  action: () => void
  description: string
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const matchingShortcut = shortcuts.find(shortcut => {
        return (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          !!event.ctrlKey === !!shortcut.ctrlKey &&
          !!event.metaKey === !!shortcut.metaKey &&
          !!event.shiftKey === !!shortcut.shiftKey &&
          !!event.altKey === !!shortcut.altKey
        )
      })

      if (matchingShortcut) {
        event.preventDefault()
        matchingShortcut.action()
      }
    },
    [shortcuts]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}

// Common keyboard shortcuts for the app
export const createAppShortcuts = (
  onNewProject: () => void,
  onSearch: () => void,
  onCloseModal?: () => void
): KeyboardShortcut[] => [
  {
    key: 'n',
    ctrlKey: true,
    action: onNewProject,
    description: 'Create new project',
  },
  {
    key: 'k',
    ctrlKey: true,
    action: onSearch,
    description: 'Focus search',
  },
  {
    key: 'Escape',
    action: onCloseModal || (() => {}),
    description: 'Close modal',
  },
]
