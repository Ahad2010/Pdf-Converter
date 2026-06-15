'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import {
  imagesToPdf,
  mergePdfs,
  splitPdf,
  rotatePdf,
  addWatermark,
  addPageNumbers,
  protectPdf,
  unlockPdf,
  compressPdf,
  pdfToImages,
} from '@/lib/converters';

export interface ToolConfig {
  id: string;
  title: string;
  desc: string;
  accept: string;
  multiple: boolean;
  gradient: string;
  icon: string;
  inputLabel: string;
  options?: ToolOption[];
}

interface ToolOption {
  key: string;
  label: string;
  type: 'text' | 'select' | 'password' | 'range';
  placeholder?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string;
  min?: number;
  max?: number;
}

interface Props {
  tool: ToolConfig;
}

export default function ToolProcessor({ tool }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [optValues, setOptValues] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    tool.options?.forEach((o) => { if (o.defaultValue) defaults[o.key] = o.defaultValue; });
    return defaults;
  });
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(Array.from(e.target.files));
  }

  function addFiles(newFiles: File[]) {
    if (tool.multiple) setFiles((prev) => [...prev, ...newFiles]);
    else setFiles([newFiles[0]]);
  }

  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
  }

  const onProgress = (pct: number, msg: string) => {
    setProgress(pct);
    setMessage(msg);
  };

  async function run() {
    if (!files.length) return;
    setStatus('processing');
    setProgress(0);
    setMessage('Starting…');

    try {
      switch (tool.id) {
        case 'jpg-to-pdf':
        case 'png-to-pdf':
        case 'webp-to-pdf':
        case 'image-to-pdf':
          await imagesToPdf(files, onProgress);
          break;

        case 'merge-pdf':
          await mergePdfs(files, onProgress);
          break;

        case 'split-pdf':
          await splitPdf(files[0], optValues['range'] ?? '', onProgress);
          break;

        case 'rotate-pdf': {
          const angle = Number(optValues['angle'] ?? '90') as 90 | 180 | 270;
          await rotatePdf(files[0], angle, onProgress);
          break;
        }

        case 'watermark': {
          const text = optValues['text'] || 'CONFIDENTIAL';
          await addWatermark(files[0], text, 0.25, onProgress);
          break;
        }

        case 'page-numbers': {
          const pos = (optValues['position'] || 'bottom-center') as 'bottom-center' | 'bottom-right' | 'bottom-left';
          await addPageNumbers(files[0], pos, onProgress);
          break;
        }

        case 'protect-pdf': {
          const pw = optValues['password'];
          if (!pw) throw new Error('Please enter a password.');
          await protectPdf(files[0], pw, onProgress);
          break;
        }

        case 'unlock-pdf': {
          const pw = optValues['password'] ?? '';
          await unlockPdf(files[0], pw, onProgress);
          break;
        }

        case 'compress-pdf':
          await compressPdf(files[0], onProgress);
          break;

        case 'pdf-to-jpg':
          await pdfToImages(files[0], 'jpeg', 0.92, onProgress);
          break;

        case 'pdf-to-png':
          await pdfToImages(files[0], 'png', 1, onProgress);
          break;

        default:
          throw new Error(`Tool "${tool.id}" conversion not yet implemented.`);
      }

      setStatus('done');
      setMessage('File downloaded successfully!');
    } catch (err: unknown) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'An error occurred.');
    }
  }

  function reset() {
    setFiles([]);
    setStatus('idle');
    setProgress(0);
    setMessage('');
  }

  const isProcessing = status === 'processing';

  return (
    <div className="max-w-2xl mx-auto">

      {/* Drop Zone */}
      {status === 'idle' && (
        <div
          className={`upload-zone rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer mb-6 transition-all duration-300 ${isDragging ? 'dragover' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            multiple={tool.multiple}
            accept={tool.accept}
            className="hidden"
            onChange={handleChange}
            onClick={(e) => e.stopPropagation()}
          />

          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-5 transition-transform duration-300 ${isDragging ? 'scale-110' : ''} bg-gradient-to-br ${tool.gradient}`}
          >
            {tool.icon}
          </div>

          {files.length === 0 ? (
            <>
              <p className="text-lg font-semibold mb-1">
                {isDragging ? 'Drop it here!' : tool.inputLabel}
              </p>
              <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
                or drag & drop your file{tool.multiple ? 's' : ''} here
              </p>
              <button
                className="btn-primary px-6 py-2.5 text-sm rounded-xl"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              >
                Choose File{tool.multiple ? 's' : ''}
              </button>
            </>
          ) : (
            <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
              Click or drop to add more files
            </p>
          )}
        </div>
      )}

      {/* File list */}
      {files.length > 0 && status === 'idle' && (
        <div className="space-y-2 mb-5">
          {files.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br ${tool.gradient} flex-shrink-0`}
              >
                {f.name.split('.').pop()?.toUpperCase().slice(0, 3)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{f.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
                  {f.size < 1024 * 1024
                    ? `${(f.size / 1024).toFixed(1)} KB`
                    : `${(f.size / (1024 * 1024)).toFixed(1)} MB`}
                </p>
              </div>
              <button
                onClick={() => removeFile(i)}
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                style={{ color: 'var(--text-subtle)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-subtle)')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tool Options */}
      {files.length > 0 && status === 'idle' && tool.options && tool.options.length > 0 && (
        <div
          className="p-5 rounded-xl mb-5 space-y-4"
          style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
        >
          <p className="text-sm font-semibold">Options</p>
          {tool.options.map((opt) => (
            <div key={opt.key}>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                {opt.label}
              </label>
              {opt.type === 'select' ? (
                <select
                  value={optValues[opt.key] ?? opt.defaultValue ?? ''}
                  onChange={(e) => setOptValues((prev) => ({ ...prev, [opt.key]: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-2"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--card-border)',
                    color: 'var(--text)',
                    ringColor: 'var(--primary)',
                  }}
                >
                  {opt.options?.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={opt.type}
                  placeholder={opt.placeholder}
                  value={optValues[opt.key] ?? opt.defaultValue ?? ''}
                  onChange={(e) => setOptValues((prev) => ({ ...prev, [opt.key]: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-2"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--card-border)',
                    color: 'var(--text)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {files.length > 0 && status === 'idle' && (
        <div className="flex gap-3">
          <button className="btn-primary flex-1 py-3.5 text-sm rounded-xl flex items-center justify-center gap-2" onClick={run}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            {tool.title}
          </button>
          <button className="btn-secondary px-5 py-3.5 text-sm rounded-xl" onClick={reset}>Clear</button>
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div
          className="p-8 rounded-2xl text-center"
          style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
        >
          <div className="relative w-16 h-16 mx-auto mb-5">
            <svg className="animate-spin-slow" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="15" stroke="var(--card-border)" strokeWidth="3"/>
              <path
                d={describeArc(18, 18, 15, 0, progress * 3.6)}
                stroke="url(#pg)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--primary)"/>
                  <stop offset="100%" stopColor="var(--secondary)"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold gradient-text">
              {progress}%
            </span>
          </div>
          <p className="font-semibold mb-1">Processing…</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{message}</p>
        </div>
      )}

      {/* Done State */}
      {status === 'done' && (
        <div
          className="p-8 rounded-2xl text-center"
          style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
        >
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <p className="font-bold text-lg mb-1">File Downloaded!</p>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Check your Downloads folder
          </p>
          <button className="btn-primary px-6 py-2.5 text-sm rounded-xl" onClick={reset}>
            Convert Another File
          </button>
        </div>
      )}

      {/* Error State */}
      {status === 'error' && (
        <div
          className="p-8 rounded-2xl text-center"
          style={{ background: 'var(--card)', border: '1px solid #ef444440' }}
        >
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </div>
          <p className="font-bold text-lg mb-1">Something went wrong</p>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{message}</p>
          <button className="btn-secondary px-6 py-2.5 text-sm rounded-xl" onClick={reset}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

// SVG arc helper for progress ring
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const large = endAngle - startAngle <= 180 ? '0' : '1';
  if (endAngle - startAngle >= 360) endAngle = 359.99;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
