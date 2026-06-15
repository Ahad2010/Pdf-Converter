'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

const quickTools = [
  { icon: '⚡', label: 'Merge PDF', href: '/tools/merge-pdf', color: '#5B8DEF' },
  { icon: '✂️', label: 'Split PDF', href: '/tools/split-pdf', color: '#7C4DFF' },
  { icon: '🗜️', label: 'Compress', href: '/tools/compress-pdf', color: '#10B981' },
  { icon: '🖼️', label: 'JPG → PDF', href: '/tools/jpg-to-pdf', color: '#F59E0B' },
  { icon: '📸', label: 'PDF → JPG', href: '/tools/pdf-to-jpg', color: '#EF4444' },
  { icon: '🌐', label: 'Web → PDF', href: '/tools/webpage-to-pdf', color: '#8B5CF6' },
];

const ACCEPT = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp';

function guessToolRoute(file: File): string {
  const t = file.type;
  const n = file.name.toLowerCase();
  if (t === 'application/pdf') return '/tools/compress-pdf';
  if (t === 'image/jpeg' || n.endsWith('.jpg') || n.endsWith('.jpeg')) return '/tools/jpg-to-pdf';
  if (t === 'image/png' || n.endsWith('.png')) return '/tools/png-to-pdf';
  if (t === 'image/webp' || n.endsWith('.webp')) return '/tools/webp-to-pdf';
  return '/tools/merge-pdf';
}

export default function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...dropped]);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const picked = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...picked]);
    }
  }

  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  }

  function triggerPick() {
    inputRef.current?.click();
  }

  function goToTool() {
    if (!files.length) return;
    router.push(guessToolRoute(files[0]));
  }

  return (
    <section id="upload" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-10">
          <p className="category-badge mb-3">Quick Upload</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Drop Your File, We&apos;ll Handle the Rest
          </h2>
          <p className="text-base" style={{ color: 'var(--text-muted)' }}>
            Upload a document and choose a tool to instantly process it
          </p>
        </div>

        <div className="glass-card p-2 mb-6">
          {/* Hidden file input — always present */}
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={ACCEPT}
            className="hidden"
            onChange={handleChange}
          />

          {/* Drop Zone for pdf tool*/}
          <div
            className={`upload-zone rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isDragging ? 'dragover' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={triggerPick}
          >
            <div className={`relative mb-6 transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-glow), var(--secondary-glow))',
                  border: '1px solid var(--card-border)',
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <defs>
                    <linearGradient id="ug" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="100%" stopColor="var(--secondary)" />
                    </linearGradient>
                  </defs>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="url(#ug)" />
                  <polyline points="17 8 12 3 7 8" stroke="url(#ug)" />
                  <line x1="12" y1="3" x2="12" y2="15" stroke="url(#ug)" />
                </svg>
              </div>
              {isDragging && (
                <div className="absolute -inset-2 rounded-2xl animate-ping opacity-30" style={{ background: 'var(--primary)' }} />
              )}
            </div>

            {isDragging ? (
              <p className="text-xl font-bold gradient-text">Drop it here!</p>
            ) : (
              <>
                <p className="text-lg font-semibold mb-2">Drag & drop your files here</p>
                <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>or click to browse files</p>
                <button
                  type="button"
                  className="btn-primary px-6 py-3 text-sm rounded-xl"
                  onClick={(e) => { e.stopPropagation(); triggerPick(); }}
                >
                  Choose Files
                </button>
              </>
            )}

            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              {['PDF', 'Word', 'Excel', 'PPT', 'JPG', 'PNG', 'WebP'].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'var(--primary-glow)', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* File Queue */}
          {files.length > 0 && (
            <div className="mt-2 p-4 space-y-2">
              <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
                {files.length} file{files.length > 1 ? 's' : ''} selected
              </p>
              {files.map((file, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--primary-glow)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
                      {file.size < 1024 * 1024
                        ? `${(file.size / 1024).toFixed(1)} KB`
                        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                    </p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ color: 'var(--text-subtle)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-subtle)')}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button onClick={goToTool}
                  className="btn-primary flex-1 py-3 text-sm rounded-xl flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  Continue to Tool
                </button>
                <button onClick={() => setFiles([])} className="btn-secondary px-4 py-3 text-sm rounded-xl">Clear</button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Tool Shortcuts */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {quickTools.map((tool) => (
            <a key={tool.label} href={tool.href}
              className="flex flex-col items-center gap-2 px-3 py-4 rounded-xl transition-all duration-200 no-underline"
              style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = tool.color;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--card-border)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}>
              <span className="text-xl">{tool.icon}</span>
              <span className="text-xs font-medium text-center" style={{ color: 'var(--text-muted)' }}>
                {tool.label}
              </span>
            </a>
          ))}
        </div>

        <p className="text-center text-xs mt-4" style={{ color: 'var(--text-subtle)' }}>
          🔒 Files are processed in your browser — never uploaded to any server.
        </p>
      </div>
    </section>
  );
}
