import React from 'react'
import { useMemo, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BlueprintToolbar } from '@/components/blueprint-display/toolbar'
import { CodeBlock } from '@/components/blueprint-display/code-block'
import { HeadingWithCopy } from '@/components/blueprint-display/heading-with-copy'
import { FileTree } from '@/components/blueprint-display/file-tree'
import { useClipboard } from '@/hooks/use-clipboard'
import { extractAppName } from '@/features/generation/services/ai'
import { parseTreeStructure } from '@/lib/tree-parser'

interface BlueprintDisplayProps {
  content: string
}

const BlueprintDisplay: React.FC<BlueprintDisplayProps> = ({ content }) => {
  const { copied, copyText } = useClipboard()

  const hasContent = content && content.trim().length > 0
  const appName = useMemo(() => extractAppName(content), [content])
  const markdown = useMemo(() => content, [content])

  const handleCopyAll = useCallback(async () => {
    await copyText(markdown || '')
  }, [markdown, copyText])

  const handleDownload = useCallback(() => {
    const blob = new Blob([markdown || ''], {
      type: 'text/markdown;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${appName.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-')}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [markdown, appName])


  // Extract tree structure from content if it exists
  const treeStructure = useMemo(() => {
    if (!content) return null
    
    // Look for tree structure in the content
    const lines = content.split('\n')
    let treeStart = -1
    let treeEnd = -1
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.includes('├──') && line.includes('└──')) {
        treeStart = i
        break
      }
    }
    
    if (treeStart !== -1) {
      // Find the end of the tree structure
      for (let i = treeStart; i < lines.length; i++) {
        const line = lines[i]
        if (line.trim() === '' || (!line.includes('├──') && !line.includes('└──') && !line.includes('│'))) {
          treeEnd = i
          break
        }
      }
      
      if (treeEnd === -1) treeEnd = lines.length
      
      const treeLines = lines.slice(treeStart, treeEnd)
      const treeText = treeLines.join('\n')
      
      try {
        const treeNodes = parseTreeStructure(treeText)
        if (treeNodes.length > 0) {
          return treeNodes
        }
      } catch (error) {
        console.warn('Failed to parse tree structure from content:', error)
      }
    }
    
    return null
  }, [content])

  const renderers = useMemo(
    () => ({
      h1(props: any) {
        return <HeadingWithCopy {...props} />
      },
      code({ inline, className, children, ...props }: any) {
        const match = /language-(\w+)/.exec(className || '')
        const codeString = String(children).replace(/\n$/, '')
        
        if (!inline && match) {
          // Check if this is a file tree structure
          const isTreeStructure = match[1] === 'tree' || 
            (match[1] === 'text' && codeString.includes('├──') && codeString.includes('└──')) ||
            (codeString.includes('├──') && codeString.includes('└──') && codeString.split('\n').length > 5)
          
          if (isTreeStructure) {
            try {
              const treeNodes = parseTreeStructure(codeString)
              if (treeNodes.length > 0) {
                return <FileTree nodes={treeNodes} />
              }
            } catch (error) {
              // Fallback to regular code block if parsing fails
              console.warn('Failed to parse tree structure:', error)
            }
          }
          
          return (
            <CodeBlock code={codeString} language={match[1]} />
          )
        }
        return (
          <code className={className} {...props}>
            {children}
          </code>
        )
      },
    }),
    []
  )

  return (
    <div className="bg-slate-800/50 p-0 rounded-2xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_4px_6px_rgba(0,0,0,0.2)] border border-slate-700/80 flex-grow min-h-0 overflow-hidden flex flex-col">
      <BlueprintToolbar
        appName={appName}
        onCopyAll={handleCopyAll}
        onDownload={handleDownload}
        copied={copied}
      />

      <div className="p-6 overflow-y-auto min-h-0">
        {!hasContent ? (
          <div className="h-full w-full flex items-center justify-center text-center text-slate-400">
            <div>
              <div className="text-lg font-medium mb-1">No blueprint yet</div>
              <p className="text-sm">
                Submit a prompt to generate your blueprint.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {treeStructure && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">
                  Project Structure
                </h2>
                <FileTree nodes={treeStructure} />
              </div>
            )}
            <div className="prose prose-invert max-w-none prose-pre:!bg-transparent">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlueprintDisplay
