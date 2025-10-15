import React, { useState, useCallback } from 'react'
import { ChevronRight, ChevronDown, Folder, FolderOpen, File } from 'lucide-react'
import { TreeNode } from '@/types'

interface FileTreeProps {
  nodes: TreeNode[]
  className?: string
}

interface TreeNodeProps {
  node: TreeNode
  level: number
  isLast: boolean
  parentPrefix: string
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, level, isLast, parentPrefix }) => {
  const [isExpanded, setIsExpanded] = useState(node.isExpanded ?? true)
  
  const hasChildren = node.children && node.children.length > 0
  const isFolder = node.type === 'folder'
  
  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (hasChildren) {
      setIsExpanded(!isExpanded)
    }
  }, [hasChildren, isExpanded])
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (hasChildren) {
        setIsExpanded(!isExpanded)
      }
    }
  }, [hasChildren, isExpanded])
  
  const getIcon = () => {
    if (!isFolder) {
      return <File className="w-4 h-4 text-slate-400" />
    }
    
    if (hasChildren) {
      return isExpanded ? 
        <FolderOpen className="w-4 h-4 text-blue-400" /> : 
        <Folder className="w-4 h-4 text-blue-400" />
    }
    
    return <Folder className="w-4 h-4 text-slate-400" />
  }
  
  const getExpandIcon = () => {
    if (!hasChildren) return null
    
    return isExpanded ? 
      <ChevronDown className="w-3 h-3 text-slate-500" /> : 
      <ChevronRight className="w-3 h-3 text-slate-500" />
  }
  
  const getConnectorPrefix = () => {
    if (level === 0) return ''
    
    const connector = isLast ? '└── ' : '├── '
    return parentPrefix + connector
  }
  
  const getChildPrefix = () => {
    if (level === 0) return ''
    
    const connector = isLast ? '    ' : '│   '
    return parentPrefix + connector
  }
  
  return (
    <div className="select-none">
      <div
        className={`
          file-tree-node flex items-center py-1 px-2 rounded-md cursor-pointer
          hover:bg-slate-700/50 transition-colors duration-150
          ${isFolder ? 'font-medium' : 'font-normal'}
        `}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-label={`${isFolder ? 'Folder' : 'File'}: ${node.name}`}
      >
        <span className="file-tree-connector mr-2">
          {getConnectorPrefix()}
        </span>
        
        <div className="flex items-center flex-1 min-w-0">
          <div className="flex items-center mr-2">
            <div className={`file-tree-expand-icon ${isExpanded ? 'file-tree-expanded' : ''}`}>
              {getExpandIcon()}
            </div>
            <div className="w-4 h-4 flex items-center justify-center ml-1 file-tree-icon">
              {getIcon()}
            </div>
          </div>
          
          <span className={`
            truncate
            ${isFolder ? 'file-tree-folder' : 'file-tree-file'}
            ${node.comment ? 'mr-2' : ''}
          `}>
            {node.name}
          </span>
          
          {node.comment && (
            <span className="file-tree-comment text-sm ml-2 truncate">
              # {node.comment}
            </span>
          )}
        </div>
      </div>
      
      {hasChildren && (
        <div className={`file-tree-children ${isExpanded ? 'file-tree-expanded' : 'file-tree-collapsed'}`}>
          <div className="ml-0">
            {node.children!.map((child, index) => (
              <TreeNodeComponent
                key={child.path}
                node={child}
                level={level + 1}
                isLast={index === node.children!.length - 1}
                parentPrefix={getChildPrefix()}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const FileTree: React.FC<FileTreeProps> = ({ nodes, className = '' }) => {
  if (!nodes || nodes.length === 0) {
    return (
      <div className={`text-slate-500 text-sm p-4 ${className}`}>
        No files to display
      </div>
    )
  }
  
  return (
    <div className={`
      file-tree bg-slate-800/30 rounded-lg border border-slate-700/50
      font-mono text-sm overflow-y-auto max-h-[70vh] min-h-[300px]
      font-medium tracking-wide
      ${className}
    `}>
      <div className="p-4">
        {nodes.map((node, index) => (
          <TreeNodeComponent
            key={node.path}
            node={node}
            level={0}
            isLast={index === nodes.length - 1}
            parentPrefix=""
          />
        ))}
      </div>
    </div>
  )
}
