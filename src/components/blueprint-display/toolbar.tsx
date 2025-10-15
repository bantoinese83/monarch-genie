import React from 'react'
import { Icon } from '@/components/ui/Icon'
import { Copy, Download } from 'lucide-react'

interface BlueprintToolbarProps {
  appName: string
  onCopyAll: () => void
  onDownload: () => void
  copied: boolean
}

export function BlueprintToolbar({
  appName,
  onCopyAll,
  onDownload,
  copied,
}: BlueprintToolbarProps) {
  return (
    <div className="sticky top-0 z-10 flex items-center gap-2 justify-between bg-slate-900/70 backdrop-blur px-4 py-3 border-b border-slate-700/70">
      <div className="text-sm text-slate-300 font-medium">
        {appName ? `${appName} - Blueprint` : 'Blueprint'}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onCopyAll}
          className="inline-flex items-center gap-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Copy entire blueprint"
        >
          <Icon icon={Copy} size={16} />
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center gap-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          aria-label="Download blueprint"
        >
          <Icon icon={Download} size={16} />
          Download
        </button>
      </div>
    </div>
  )
}
