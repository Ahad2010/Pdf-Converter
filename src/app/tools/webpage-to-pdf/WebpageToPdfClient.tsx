'use client';

import { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

type Mode = 'url' | 'html';

export default function WebpageToPdfClient() {
  const [mode, setMode] = useState<Mode>('url');
  const [url, setUrl] = useState('');
  const [html, setHtml] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  function openUrlForPrint() {
    if (!url.trim()) { setMessage('Please enter a URL.'); setStatus('error'); return; }
    let target = url.trim();
    if (!target.startsWith('http')) target = 'https://' + target;

    setStatus('processing');
    setMessage('Opening page…');

    // Open the URL in a new window and print it
    const win = window.open(target, '_blank');
    if (!win) {
      setStatus('error');
      setMessage('Popup blocked. Please allow popups for this site and try again.');
      return;
    }

    setTimeout(() => {
      setStatus('done');
      setMessage('In the new window, press Ctrl+P (or Cmd+P on Mac) and choose "Save as PDF".');
    }, 1500);
  }

  async function convertHtmlToPdf() {
    if (!html.trim()) { setMessage('Please paste some HTML.'); setStatus('error'); return; }
    setStatus('processing');
    setMessage('Creating PDF…');

    try {
      // Strip tags and extract plain text for basic conversion
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      const text = tmp.innerText || tmp.textContent || '';

      const pdf = await PDFDocument.create();
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const fontSize = 11;
      const lineHeight = fontSize * 1.5;
      const margin = 50;
      const pageWidth = 595;
      const pageHeight = 842;
      const maxWidth = pageWidth - margin * 2;

      const words = text.split(/\s+/).filter(Boolean);
      const lines: string[] = [];
      let current = '';

      for (const word of words) {
        const test = current ? current + ' ' + word : word;
        const w = font.widthOfTextAtSize(test, fontSize);
        if (w > maxWidth && current) {
          lines.push(current);
          current = word;
        } else {
          current = test;
        }
      }
      if (current) lines.push(current);

      const linesPerPage = Math.floor((pageHeight - margin * 2) / lineHeight);
      let page = pdf.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;
      let lineCount = 0;

      for (const line of lines) {
        if (lineCount >= linesPerPage) {
          page = pdf.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
          lineCount = 0;
        }
        page.drawText(line, { x: margin, y, size: fontSize, font, color: rgb(0.1, 0.1, 0.1) });
        y -= lineHeight;
        lineCount++;
      }

      const bytes = await pdf.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'webpage.pdf';
      a.click();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

      setStatus('done');
      setMessage('PDF downloaded! (Text extracted from HTML)');
    } catch (e) {
      setStatus('error');
      setMessage(e instanceof Error ? e.message : 'Failed to convert HTML.');
    }
  }

  function reset() { setStatus('idle'); setMessage(''); }

  return (
    <div>
      {/* Mode tabs */}
      <div className="flex gap-2 mb-6">
        {(['url', 'html'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); reset(); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${mode === m ? 'tab-active text-white' : 'btn-secondary'}`}
          >
            {m === 'url' ? '🌐 Convert URL' : '📄 Paste HTML'}
          </button>
        ))}
      </div>

      {status === 'idle' || status === 'error' ? (
        <div className="space-y-4">
          {mode === 'url' ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                  Website URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); reset(); }}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--card-border)',
                    color: 'var(--text)',
                  }}
                />
              </div>
              {status === 'error' && (
                <p className="text-sm text-red-400">{message}</p>
              )}
              <div
                className="p-4 rounded-xl text-sm"
                style={{ background: 'var(--card)', border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}
              >
                <p className="font-semibold mb-1">How it works</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Enter the URL above and click Convert</li>
                  <li>The page opens in a new browser tab</li>
                  <li>Press <kbd className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: 'var(--bg)' }}>Ctrl+P</kbd> and select <strong>Save as PDF</strong></li>
                </ol>
              </div>
              <button className="btn-primary w-full py-3.5 text-sm rounded-xl" onClick={openUrlForPrint}>
                🌐 Open & Convert to PDF
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                  Paste your HTML
                </label>
                <textarea
                  value={html}
                  onChange={(e) => { setHtml(e.target.value); reset(); }}
                  placeholder="<h1>Hello World</h1><p>Your content here...</p>"
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none font-mono resize-y"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--card-border)',
                    color: 'var(--text)',
                  }}
                />
              </div>
              {status === 'error' && (
                <p className="text-sm text-red-400">{message}</p>
              )}
              <button className="btn-primary w-full py-3.5 text-sm rounded-xl" onClick={convertHtmlToPdf}>
                📄 Convert HTML to PDF
              </button>
            </>
          )}
        </div>
      ) : status === 'processing' ? (
        <div className="p-8 rounded-2xl text-center" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
          <div className="w-12 h-12 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
          <p className="font-semibold">Processing…</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{message}</p>
        </div>
      ) : (
        <div className="p-8 rounded-2xl text-center" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <p className="font-bold text-lg mb-2">Done!</p>
          <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>{message}</p>
          <button className="btn-primary px-6 py-2.5 text-sm rounded-xl" onClick={reset}>
            Convert Another
          </button>
        </div>
      )}
    </div>
  );
}
