import React from 'react'

export function EmptyState() {
  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="text-center text-slate-500">
        <p className="text-2xl font-bold">Your Blueprint Awaits</p>
        <p>
          Enter an idea above or select a project from the sidebar to get
          started.
        </p>
      </div>
    </div>
  )
}
