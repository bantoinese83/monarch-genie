import React from 'react'

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-start flex-grow">
      <div className="w-full max-w-5xl mx-auto">
        <div className="space-y-4">
          <div className="h-8 w-2/3 bg-slate-700/60 rounded-md animate-pulse" />
          <div className="h-4 w-full bg-slate-700/50 rounded-md animate-pulse" />
          <div className="h-4 w-11/12 bg-slate-700/50 rounded-md animate-pulse" />
          <div className="h-4 w-10/12 bg-slate-700/50 rounded-md animate-pulse" />
          <div className="h-4 w-9/12 bg-slate-700/50 rounded-md animate-pulse" />
          <div className="h-64 w-full bg-slate-700/40 rounded-lg animate-pulse" />
        </div>
        <p className="mt-6 text-sm text-slate-400">Generating blueprint…</p>
      </div>
    </div>
  )
}
