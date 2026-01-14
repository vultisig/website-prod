"use client"

import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // ULTIMATE SIMPLE FIX: Replace empty lines with a marker that creates visible spacing
  // Process line by line and inject spacing markers
  
  const lines = content.split('\n')
  const processed: string[] = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    if (line.trim() === '') {
      // Empty line - inject spacing marker
      processed.push('<!-- SPACING -->')
    } else {
      processed.push(line)
    }
  }
  
  let processedContent = processed.join('\n')
  
  // Replace spacing markers with actual content that will render
  processedContent = processedContent.replace(/<!-- SPACING -->/g, '\n\n&nbsp;\n\n')

  return (
    <div className="max-w-none font-sans">
      <div className="text-gray-300 leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkBreaks]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-bold text-white mt-4 mb-2">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg font-bold text-white mt-3 mb-2">{children}</h4>
            ),
            p: ({ children, ...props }) => {
              // Check if this paragraph only contains &nbsp; (spacing marker)
              const text = typeof children === 'string' ? children : 
                          Array.isArray(children) ? children.join('') : ''
              
              if (text.trim() === '\u00A0' || text.trim() === '') {
                // This is a spacing paragraph - render as visible div
                return <div className="h-6 mb-0" style={{ minHeight: '1.5rem', display: 'block' }} aria-hidden="true"></div>
              }
              
              return <p className="mb-4 text-gray-300 leading-relaxed" {...props}>{children}</p>
            },
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300 ml-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300 ml-4">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-300 mb-1">{children}</li>
            ),
            a: ({ href, children }) => (
              <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            code: ({ children }) => (
              <code className="bg-slate-800 px-2 py-1 rounded text-sm text-blue-300 font-mono">{children}</code>
            ),
            pre: ({ children }) => (
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto mb-4 text-sm">{children}</pre>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4">
                {children}
              </blockquote>
            ),
            img: ({ src, alt }) => (
              <img src={src} alt={alt || ''} className="rounded-lg my-4 max-w-full h-auto" />
            ),
            hr: () => (
              <hr className="my-8 border-slate-700" />
            ),
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>
    </div>
  )
}
