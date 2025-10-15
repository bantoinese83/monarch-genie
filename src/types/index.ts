export interface Project {
  id: string
  title: string
  prompt: string
  blueprint: string
  createdAt: string
}

export interface TreeNode {
  name: string
  path: string
  type: 'file' | 'folder'
  children?: TreeNode[]
  comment?: string
  isExpanded?: boolean
}
