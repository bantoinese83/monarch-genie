import React from 'react'

interface ProgressBarProps {
  className?: string
}

export function ProgressBar({ className }: ProgressBarProps) {
  return (
    <div className={className}>
      <div className="h-1 w-full bg-slate-700/60 overflow-hidden">
        <div className="h-full w-1/3 bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-500 animate-[progress_1.2s_linear_infinite]" />
      </div>
    </div>
  )
}
