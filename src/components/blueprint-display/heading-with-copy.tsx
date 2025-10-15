import React, { useCallback, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Copy } from 'lucide-react'

interface HeadingWithCopyProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export function HeadingWithCopy(props: HeadingWithCopyProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopySection = useCallback(async () => {
    const h = headingRef.current
    if (!h) return
    const parts: string[] = []
    parts.push(h.innerText)
    let el: Element | null = h.nextElementSibling
    while (el && el.tagName !== 'H1') {
      parts.push((el as HTMLElement).innerText)
      el = el.nextElementSibling
    }
    try {
      await navigator.clipboard.writeText(parts.join('\n\n'))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // ignore
    }
  }, [])

  const { children, ...rest } = props

  return (
    <div className="relative group">
      <h1 ref={headingRef} {...rest} className="pr-24">
        {children}
      </h1>
      <button
        type="button"
        aria-label="Copy section"
        onClick={handleCopySection}
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-md bg-slate-700/80 hover:bg-slate-600 text-slate-100 text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 whitespace-nowrap"
      >
        <Icon icon={Copy} size={12} className="inline mr-1" />
        {copied ? 'Copied' : 'Copy section'}
      </button>
    </div>
  )
}
