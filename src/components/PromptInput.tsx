import React, { useState } from 'react'
import { usePromptImprover } from '@/features/generation/hooks/use-prompt-improver'
import { Icon } from '@/components/ui/Icon'
import { FileText, Wand2 } from 'lucide-react'
import { validatePrompt, sanitizeInput } from '@/lib/validation'

interface PromptInputProps {
  onGenerate: () => void
  isLoading: boolean
  prompt: string
  onPromptChange: (newPrompt: string) => void
  isReadOnly: boolean
}

const GenerateIcon = () => (
  <Icon
    icon={FileText}
    size={24}
    className="mr-2 text-blue-200 group-hover:text-white transition-colors duration-200"
  />
)

const ImprovePromptIcon = ({ isImproving }: { isImproving: boolean }) => (
  <Icon
    icon={Wand2}
    size={20}
    className={isImproving ? 'animate-shimmer' : ''}
  />
)

export const PromptInput: React.FC<PromptInputProps> = ({
  onGenerate,
  isLoading,
  prompt,
  onPromptChange,
  isReadOnly,
}) => {
  const { isImproving, improve } = usePromptImprover()
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isReadOnly) return

    const sanitizedPrompt = sanitizeInput(prompt)
    const validation = validatePrompt(sanitizedPrompt)
    
    if (!validation.isValid) {
      setValidationError(validation.error || 'Invalid input')
      return
    }

    setValidationError(null)
    onGenerate()
  }

  const handlePromptChange = (value: string) => {
    const sanitized = sanitizeInput(value)
    onPromptChange(sanitized)
    setValidationError(null)
  }

  const handleImprovePrompt = async () => {
    const improved = await improve(prompt)
    if (improved) onPromptChange(improved)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <textarea
          value={prompt}
          onChange={e => handlePromptChange(e.target.value)}
          placeholder="e.g., A real-time workflow design and automation platform for developers"
          className={`w-full p-4 pr-12 bg-slate-900/70 border rounded-xl focus:outline-none focus:ring-2 resize-none text-gray-100 shadow-inner transition-all duration-200 disabled:bg-slate-800/80 disabled:text-gray-400 text-base sm:text-sm ${
            validationError ? 'border-red-500 focus:ring-red-500/70' : 'border-slate-700 focus:ring-blue-500/70'
          }`}
          rows={4}
          disabled={isLoading || isReadOnly || isImproving}
          aria-label="Application Idea Prompt"
          aria-invalid={!!validationError}
          aria-describedby={validationError ? 'prompt-error' : undefined}
        />
        {!isReadOnly && (
          <button
            type="button"
            onClick={handleImprovePrompt}
            disabled={isLoading || isImproving || !prompt}
            className="absolute top-3 right-3 p-2 rounded-full text-gray-400 hover:text-white hover:bg-slate-700/50 disabled:text-gray-600 disabled:cursor-not-allowed disabled:bg-transparent transition-colors duration-200"
            title="Improve prompt with AI"
            aria-label="Improve prompt with AI"
          >
            <ImprovePromptIcon isImproving={isImproving} />
          </button>
        )}
      </div>
      {validationError && (
        <p id="prompt-error" className="mt-2 text-sm text-red-400" role="alert">
          {validationError}
        </p>
      )}
      {!isReadOnly && (
        <button
          type="submit"
          className="group mt-4 w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 active:from-blue-600 active:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-blue-800 disabled:bg-slate-700 disabled:from-slate-600 disabled:to-slate-800 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] active:translate-y-px min-h-[44px]"
          disabled={isLoading || isImproving}
        >
          <GenerateIcon />
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      )}
    </form>
  )
}
