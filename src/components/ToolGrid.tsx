'use client';

import { useState } from 'react';

interface Tool {
  name: string;
  desc: string;
  icon: string;
  gradient: string;
  badge?: string;
  href?: string;
}

interface Category {
  id: string;
  label: string;
  tools: Tool[];
}

const categories: Category[] = [
  {
    id: 'popular',
    label: 'Popular',
    tools: [
      { name: 'Merge PDF', desc: 'Combine multiple PDFs into one', icon: 'M', gradient: 'from-blue-500 to-blue-600', badge: 'Hot', href: '/tools/merge-pdf' },
      { name: 'Split PDF', desc: 'Extract pages into separate files', icon: 'S', gradient: 'from-violet-500 to-purple-600', href: '/tools/split-pdf' },
      { name: 'Compress PDF', desc: 'Reduce file size without quality loss', icon: 'C', gradient: 'from-emerald-500 to-teal-600', badge: 'Popular', href: '/tools/compress-pdf' },
      { name: 'PDF to JPG', desc: 'Convert PDF pages to images', icon: 'J', gradient: 'from-orange-500 to-amber-600', href: '/tools/pdf-to-jpg' },
      { name: 'PDF to PNG', desc: 'Convert PDF pages to PNG', icon: 'P', gradient: 'from-purple-500 to-violet-600', href: '/tools/pdf-to-png' },
      { name: 'Rotate PDF', desc: 'Rotate pages any angle', icon: '↻', gradient: 'from-indigo-500 to-violet-600', href: '/tools/rotate-pdf' },
    ],
  },
  {
    id: 'convert-to',
    label: 'Convert to PDF',
    tools: [
      { name: 'JPG to PDF', desc: 'Convert JPG images to PDF', icon: '🖼️', gradient: 'from-orange-400 to-yellow-500', href: '/tools/jpg-to-pdf' },
      { name: 'PNG to PDF', desc: 'PNG images to PDF', icon: '🎨', gradient: 'from-purple-500 to-pink-500', href: '/tools/png-to-pdf' },
      { name: 'WebP to PDF', desc: 'WebP images to PDF', icon: 'W', gradient: 'from-teal-500 to-cyan-500', href: '/tools/webp-to-pdf' },
      { name: 'Web Page to PDF', desc: 'Convert any URL to PDF', icon: '🌐', gradient: 'from-yellow-500 to-orange-500', href: '/tools/webpage-to-pdf', badge: 'New' },
      { name: 'Word to PDF', desc: 'DOCX to PDF (coming soon)', icon: 'W', gradient: 'from-blue-600 to-indigo-600' },
      { name: 'Excel to PDF', desc: 'XLSX to PDF (coming soon)', icon: 'E', gradient: 'from-green-500 to-emerald-600' },
      { name: 'PPT to PDF', desc: 'Presentation to PDF (coming soon)', icon: 'P', gradient: 'from-orange-500 to-red-500' },
    ],
  },
  {
    id: 'convert-from',
    label: 'Convert from PDF',
    tools: [
      { name: 'PDF to JPG', desc: 'PDF pages to JPG images', icon: 'J', gradient: 'from-yellow-500 to-orange-500', href: '/tools/pdf-to-jpg' },
      { name: 'PDF to PNG', desc: 'PDF pages to PNG', icon: 'P', gradient: 'from-purple-500 to-violet-600', href: '/tools/pdf-to-png' },
      { name: 'PDF to Word', desc: 'Editable DOCX (coming soon)', icon: 'W', gradient: 'from-blue-500 to-indigo-600' },
      { name: 'PDF to Excel', desc: 'Extract tables (coming soon)', icon: 'E', gradient: 'from-green-500 to-teal-600' },
      { name: 'PDF to PPT', desc: 'PDF to slides (coming soon)', icon: 'P', gradient: 'from-orange-500 to-red-500' },
      { name: 'PDF to TXT', desc: 'Extract plain text (coming soon)', icon: 'T', gradient: 'from-gray-500 to-slate-600' },
    ],
  },
  {
    id: 'organize',
    label: 'Organize',
    tools: [
      { name: 'Merge PDF', desc: 'Combine PDFs in order', icon: 'M', gradient: 'from-blue-500 to-blue-600', href: '/tools/merge-pdf' },
      { name: 'Split PDF', desc: 'Split by pages or ranges', icon: 'S', gradient: 'from-violet-500 to-purple-600', href: '/tools/split-pdf' },
      { name: 'Rotate PDF', desc: 'Rotate pages any angle', icon: '↻', gradient: 'from-indigo-500 to-violet-600', href: '/tools/rotate-pdf' },
      { name: 'Compress PDF', desc: 'Reduce file size', icon: '🗜️', gradient: 'from-emerald-500 to-teal-600', href: '/tools/compress-pdf' },
      { name: 'Page Numbers', desc: 'Auto-number pages', icon: '#', gradient: 'from-pink-500 to-rose-600', href: '/tools/page-numbers' },
      { name: 'Watermark', desc: 'Add branding or stamps', icon: '💧', gradient: 'from-sky-500 to-blue-600', href: '/tools/watermark' },
    ],
  },
  {
    id: 'secure',
    label: 'Security',
    tools: [
      { name: 'Protect PDF', desc: 'Password-lock your PDF', icon: '🔒', gradient: 'from-red-500 to-rose-600', href: '/tools/protect-pdf' },
      { name: 'Unlock PDF', desc: 'Remove password protection', icon: '🔓', gradient: 'from-green-500 to-emerald-600', href: '/tools/unlock-pdf' },
      { name: 'Sign PDF', desc: 'Add e-signatures (coming soon)', icon: '✍️', gradient: 'from-blue-500 to-indigo-600' },
      { name: 'Redact PDF', desc: 'Permanently hide data (coming soon)', icon: '🛡️', gradient: 'from-gray-600 to-zinc-700' },
    ],
  },
  {
    id: 'ai',
    label: 'AI Tools',
    tools: [
      { name: 'AI PDF Chat', desc: 'Ask questions from your PDF', icon: '🤖', gradient: 'from-violet-500 to-purple-600', badge: 'Soon' },
      { name: 'AI Summarize', desc: 'Instant document summaries', icon: '📋', gradient: 'from-sky-500 to-blue-600', badge: 'Soon' },
      { name: 'OCR PDF', desc: 'Extract searchable text', icon: '👁️', gradient: 'from-emerald-500 to-teal-600', badge: 'Soon' },
      { name: 'Smart Split', desc: 'Auto document separation', icon: '⚡', gradient: 'from-yellow-500 to-orange-500', badge: 'Soon' },
      { name: 'AI Translation', desc: 'Translate PDF to any language', icon: '🌐', gradient: 'from-pink-500 to-rose-600', badge: 'Soon' },
      { name: 'Form Detection', desc: 'Detect fillable forms', icon: '📝', gradient: 'from-indigo-500 to-violet-600', badge: 'Soon' },
    ],
  },
];

const badgeColors: Record<string, string> = {
  Hot: 'bg-red-500',
  Popular: 'bg-orange-500',
  New: 'bg-green-500',
  AI: 'bg-violet-500',
  Soon: 'bg-slate-500',
};

export default function ToolGrid() {
  const [activeTab, setActiveTab] = useState('popular');
  const current = categories.find((c) => c.id === activeTab) ?? categories[0];

  return (
    <section id="tools" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="category-badge mb-3">Tools</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            30+ PDF Tools at Your Fingertips
          </h2>
          <p className="max-w-xl mx-auto text-base sm:text-lg" style={{ color: 'var(--text-muted)' }}>
            Everything you need to work with PDFs — organized, fast, and free to start
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-8 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === cat.id ? 'tab-active text-white' : 'btn-secondary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {current.tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <button className="btn-secondary px-8 py-3 text-sm rounded-xl inline-flex items-center gap-2">
            View All Tools
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.href ?? '#'}
      className="tool-card group p-5 flex gap-4 items-start"
    >
      {/* Icon */}
      <div
        className={`relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${tool.gradient} text-white font-bold text-lg shadow-lg`}
      >
        {typeof tool.icon === 'string' && tool.icon.length === 1 ? (
          <span className="text-base font-bold">{tool.icon}</span>
        ) : (
          <span className="text-xl">{tool.icon}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm">{tool.name}</span>
          {tool.badge && (
            <span className={`${badgeColors[tool.badge] ?? 'bg-gray-500'} text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full`}>
              {tool.badge}
            </span>
          )}
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {tool.desc}
        </p>
      </div>

      {/* Arrow */}
      <svg
        width="14" height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1"
        style={{ color: 'var(--primary)' }}
      >
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  );
}
