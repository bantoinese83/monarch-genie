import React, { useEffect, useRef } from 'react'
import { Icon } from '@/components/ui/Icon'
import { X, Command, Keyboard } from 'lucide-react'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

const shortcuts = [
  { key: 'Ctrl + N', description: 'Create new project' },
  { key: 'Ctrl + K', description: 'Focus search' },
  { key: 'Escape', description: 'Close modal' },
  { key: 'Enter', description: 'Submit form' },
]

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      modalRef.current?.focus()
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-slate-800 w-full max-w-lg rounded-xl shadow-2xl border border-slate-700 animate-slide-up"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Icon icon={Keyboard} size={20} className="text-blue-400" />
            <h2 id="help-modal-title" className="text-xl font-bold text-gray-100">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Close help"
          >
            <Icon icon={X} size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300">{shortcut.description}</span>
                <kbd className="px-2 py-1 bg-slate-700 text-gray-300 text-sm rounded border border-slate-600 font-mono">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-slate-900/50 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon icon={Command} size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-gray-200 mb-1">Pro Tip</h3>
                <p className="text-sm text-gray-400">
                  Use keyboard shortcuts to navigate faster. Most actions can be performed without using the mouse.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 bg-slate-800/50 border-t border-slate-700 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
