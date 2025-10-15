import React, { useState, Suspense, lazy } from 'react'
import { Icon } from '@/components/ui/Icon'
import { HelpCircle } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

// Lazy load help modal
const HelpModal = lazy(() => import('@/components/modals/HelpModal').then(m => ({ default: m.HelpModal })))

export const Header: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <>
      <header className="flex-shrink-0 bg-slate-800/60 shadow-[inset_0_-2px_6px_rgba(0,0,0,0.4)] p-4 flex justify-between items-center border-b border-slate-700/80">
        <div className="text-xl font-bold text-gray-200 tracking-wider">
          <span className="text-blue-400">GENIE</span> Blueprint
        </div>
        <button
          onClick={() => setShowHelp(true)}
          className="p-2 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
          aria-label="Show help and keyboard shortcuts"
          title="Help & Shortcuts"
        >
          <Icon icon={HelpCircle} size={20} />
        </button>
      </header>
      {showHelp && (
        <Suspense fallback={<LoadingSpinner />}>
          <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
        </Suspense>
      )}
    </>
  )
}
