export interface TreeNode {
  name: string
  path: string
  type: 'file' | 'folder'
  children?: TreeNode[]
  comment?: string
  isExpanded?: boolean
}

interface ParsedLine {
  name: string
  depth: number
  isLast: boolean
  comment?: string
}

export function parseTreeStructure(treeText: string): TreeNode[] {
  const lines = treeText.split('\n').filter(line => line.trim())
  
  if (lines.length === 0) return []
  
  const parsedLines: ParsedLine[] = lines.map(line => {
    // Extract comment if present
    const commentMatch = line.match(/\s+#\s+(.+)$/)
    const comment = commentMatch ? commentMatch[1] : undefined
    
    // Remove comment from line
    const cleanLine = comment ? line.replace(/\s+#\s+.+$/, '') : line
    
    // Count indentation depth by counting tree characters
    let depth = 0
    let i = 0
    while (i < cleanLine.length) {
      if (cleanLine[i] === ' ') {
        i++
      } else if (cleanLine[i] === '│') {
        depth++
        i++
      } else if (cleanLine[i] === '├' || cleanLine[i] === '└') {
        break
      } else {
        break
      }
    }
    
    // Extract the actual name
    const nameMatch = cleanLine.match(/[├└]──\s*(.+)$/)
    const name = nameMatch ? nameMatch[1].trim() : cleanLine.trim()
    
    // Determine if this is the last item at this depth
    const isLast = cleanLine.includes('└──')
    
    return {
      name,
      depth,
      isLast,
      comment
    }
  })
  
  return buildTree(parsedLines)
}

function buildTree(lines: ParsedLine[]): TreeNode[] {
  const result: TreeNode[] = []
  const stack: { node: TreeNode; depth: number }[] = []
  
  for (const line of lines) {
    const node: TreeNode = {
      name: line.name,
      path: line.name,
      type: determineType(line.name),
      comment: line.comment,
      isExpanded: true
    }
    
    // Adjust stack to current depth
    while (stack.length > 0 && stack[stack.length - 1].depth >= line.depth) {
      stack.pop()
    }
    
    // Add to parent if exists
    if (stack.length > 0) {
      const parent = stack[stack.length - 1].node
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(node)
      node.path = `${parent.path}/${node.name}`
    } else {
      result.push(node)
    }
    
    // Add to stack if it's a folder
    if (node.type === 'folder') {
      stack.push({ node, depth: line.depth })
    }
  }
  
  return result
}

function determineType(name: string): 'file' | 'folder' {
  // Folders typically end with '/' or have no extension
  if (name.endsWith('/')) {
    return 'folder'
  }
  
  // Check if it has a file extension
  const hasExtension = /\.[a-zA-Z0-9]+$/.test(name)
  
  // If it has an extension, it's likely a file
  if (hasExtension) {
    return 'file'
  }
  
  // Common folder names without extensions
  const commonFolders = [
    'src', 'app', 'components', 'lib', 'utils', 'hooks', 'types', 'styles',
    'public', 'assets', 'images', 'icons', 'docs', 'tests', 'config',
    'migrations', 'db', 'infra', 'api', 'auth', 'dashboard', 'common',
    'store', 'models', 'services', 'middleware', 'mocks', 'unit',
    'integration', 'e2e', 'workflows', 'ci', 'cd', 'github', 'workflows'
  ]
  
  if (commonFolders.includes(name.toLowerCase())) {
    return 'folder'
  }
  
  // Default to file if uncertain
  return 'file'
}
