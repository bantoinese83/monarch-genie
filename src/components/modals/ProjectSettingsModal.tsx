import React, { useState, useEffect, useRef } from 'react'
import type { Project } from '@/types'
import { Icon } from '@/components/ui/Icon'
import { X, Trash2 } from 'lucide-react'
import { validateProjectTitle, sanitizeProjectTitle } from '@/lib/validation'

interface ProjectSettingsModalProps {
  project: Project
  onClose: () => void
  onRename: (projectId: string, newTitle: string) => void
  onDelete: (projectId: string) => void
}

const CloseIcon = () => <Icon icon={X} size={24} />

const DeleteIcon = () => <Icon icon={Trash2} size={18} />

export const ProjectSettingsModal: React.FC<ProjectSettingsModalProps> = ({
  project,
  onClose,
  onRename,
  onDelete,
}) => {
  const [title, setTitle] = useState(project.title)
  const [validationError, setValidationError] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    inputRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    
    const sanitizedTitle = sanitizeProjectTitle(title)
    const validation = validateProjectTitle(sanitizedTitle)
    
    if (!validation.isValid) {
      setValidationError(validation.error || 'Invalid title')
      return
    }

    if (sanitizedTitle !== project.title) {
      onRename(project.id, sanitizedTitle)
    }
    onClose()
  }

  const handleTitleChange = (value: string) => {
    const sanitized = sanitizeProjectTitle(value)
    setTitle(sanitized)
    setValidationError(null)
  }

  const handleDelete = () => {
    onDelete(project.id)
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        className="bg-slate-800 w-full max-w-lg rounded-xl shadow-2xl border border-slate-700 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 id="modal-title" className="text-xl font-bold text-gray-100">
            Project Settings
          </h2>
          <p id="modal-description" className="sr-only">
            Manage project settings including name and deletion
          </p>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Close settings"
          >
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSave}>
          <div className="p-6 space-y-6">
            <div>
              <label
                htmlFor="project-title"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Project Name
              </label>
              <input
                ref={inputRef}
                id="project-title"
                type="text"
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
                className={`w-full p-2 bg-slate-900 border rounded-md focus:outline-none focus:ring-2 text-gray-100 ${
                  validationError ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500'
                }`}
                autoFocus
                aria-invalid={!!validationError}
                aria-describedby={validationError ? 'title-error' : undefined}
              />
              {validationError && (
                <p id="title-error" className="mt-1 text-sm text-red-400" role="alert">
                  {validationError}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-400">
                Created on:{' '}
                <span className="font-medium text-gray-300">
                  {new Date(project.createdAt).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center p-4 bg-slate-800/50 border-t border-slate-700 rounded-b-xl">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center space-x-2 text-red-400 hover:text-red-300 font-semibold py-2 px-4 rounded-md hover:bg-red-900/40 transition-colors"
            >
              <DeleteIcon />
              <span>Delete Project</span>
            </button>
            <button
              type="submit"
              disabled={!title.trim() || title.trim() === project.title}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-slate-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
