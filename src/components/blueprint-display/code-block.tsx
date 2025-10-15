import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useClipboard } from '@/hooks/use-clipboard'
import { Icon } from '@/components/ui/Icon'
import { Copy } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const { copyText } = useClipboard(1200)

  return (
    <div className="relative group">
      <button
        type="button"
        aria-label="Copy code"
        onClick={() => copyText(code)}
        className="absolute right-2 top-2 z-10 rounded-md bg-slate-700/90 hover:bg-slate-600 text-slate-100 text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 whitespace-nowrap"
      >
        <Icon icon={Copy} size={12} className="inline mr-1" />
        Copy
      </button>
      <SyntaxHighlighter
        style={atomDark}
        language={language}
        PreTag="div"
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
