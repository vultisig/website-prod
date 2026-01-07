"use client"

import ReactMarkdown from 'react-markdown'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="max-w-none font-sans">
      <div className="text-gray-300 leading-relaxed">
        <ReactMarkdown
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
            p: ({ children }) => (
              <p className="mb-4 text-gray-300">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-300">{children}</li>
            ),
            a: ({ href, children }) => (
              <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            code: ({ children }) => (
              <code className="bg-slate-800 px-2 py-1 rounded text-sm text-blue-300">{children}</code>
            ),
            pre: ({ children }) => (
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4">
                {children}
              </blockquote>
            ),
            img: ({ src, alt }) => (
              <img src={src} alt={alt} className="rounded-lg my-4 max-w-full" />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
