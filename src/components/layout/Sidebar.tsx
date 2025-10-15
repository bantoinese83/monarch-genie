import React, { useState, useMemo } from 'react'
import type { Project } from '@/types'
import { Icon } from '@/components/ui/Icon'
import { Plus, Settings, Search, X } from 'lucide-react'

interface SidebarProps {
  projects: Project[]
  activeProjectId: string | null
  onSelectProject: (projectId: string) => void
  onNewProject: () => void
  onOpenSettings: (projectId: string) => void
}

const NewProjectIcon = () => (
  <Icon
    icon={Plus}
    size={24}
    className="mr-2 text-blue-200 group-hover:text-white transition-colors duration-200"
  />
)

const SettingsIcon = () => <Icon icon={Settings} size={16} />

export const Sidebar: React.FC<SidebarProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
  onNewProject,
  onOpenSettings,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects
    return projects.filter(project =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [projects, searchQuery])

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800/80 rounded-lg text-white hover:bg-slate-700 transition-colors"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`w-72 bg-slate-800/60 p-4 flex flex-col border-r border-slate-700/80 shadow-[inset_-2px_0_10px_rgba(0,0,0,0.4)] fixed md:relative h-full z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex-shrink-0 mb-6 space-y-4">
          <button
            onClick={onNewProject}
            className="group w-full flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 active:from-blue-600 active:to-blue-800 text-white font-bold py-2.5 px-4 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-blue-800 disabled:bg-gray-600 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] active:translate-y-px"
          >
            <NewProjectIcon />
            New Project
          </button>
          
          {/* Search input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon={Search} size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2 bg-slate-900/70 border border-slate-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <Icon icon={X} size={16} />
              </button>
            )}
          </div>
        </div>

      <h2 className="text-sm font-bold mb-3 text-gray-400 uppercase tracking-wider px-2">
        Project History
      </h2>
      <div className="flex-grow overflow-y-auto pr-1 min-w-0">
        <ul className="space-y-1.5 min-w-0">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <li key={project.id} className="min-w-0">
                <div
                  className={`w-full flex items-center justify-between p-2 rounded-md transition-colors duration-150 group min-w-0 ${
                    activeProjectId === project.id
                      ? 'bg-blue-600/40'
                      : 'hover:bg-slate-700/50'
                  }`}
                >
                  <button
                    onClick={() => onSelectProject(project.id)}
                    className="flex-grow text-left py-0.5 focus:outline-none min-w-0"
                  >
                    <p
                      className={`truncate text-sm font-medium ${activeProjectId === project.id ? 'text-white' : 'text-gray-300'}`}
                      title={project.title}
                    >
                      {project.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {new Date(project.createdAt).toLocaleString()}
                    </p>
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      onOpenSettings(project.id)
                    }}
                    className="ml-2 p-1.5 rounded-md text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-slate-600 hover:text-white focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500/70 transition-opacity duration-150"
                    title="Project Settings"
                    aria-label="Project Settings"
                  >
                    <SettingsIcon />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="p-3 text-center text-sm text-gray-500">
              {searchQuery ? 'No projects found.' : 'No projects yet.'}
            </li>
          )}
        </ul>
      </div>

      <div className="flex-shrink-0 mt-6 pt-6 border-t border-slate-700/80">
        <h2 className="text-lg font-bold mb-4 text-gray-200">Tech Stack</h2>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li>- Next.js (App Router)</li>
          <li>- Supabase</li>
          <li>- Tailwind CSS</li>
        </ul>
      </div>
      </aside>
    </>
  )
}
