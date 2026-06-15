'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Is PDFusion really free to use?',
    a: 'Yes! Our free plan includes 5 file operations per day with a 10MB limit per file. No credit card required. Upgrade to Pro for unlimited use, larger files, and advanced AI features.',
  },
  {
    q: 'Are my files safe and private?',
    a: 'Absolutely. All files are encrypted in transit using TLS 1.3 and at rest using AES-256. Files are automatically deleted from our servers after 2 hours on the free plan and 7 days on Pro. We never share or sell your data.',
  },
  {
    q: 'What file formats are supported?',
    a: 'PDFusion supports PDF, Word (DOC/DOCX), Excel (XLS/XLSX), PowerPoint (PPT/PPTX), images (JPG, PNG, WebP, TIFF), HTML, TXT, EPUB, and more. You can convert to and from most of these formats.',
  },
  {
    q: 'How accurate is the OCR feature?',
    a: 'Our AI-powered OCR achieves 99.8% accuracy on clearly scanned documents and supports 100+ languages. It handles skewed pages, mixed languages, and low-quality scans better than traditional OCR tools.',
  },
  {
    q: 'Can I use PDFusion on mobile devices?',
    a: 'Yes! PDFusion is fully responsive and works on all modern smartphones and tablets through your browser. We also have dedicated iOS and Android apps available for download.',
  },
  {
    q: 'Is there an API available for developers?',
    a: 'Yes, our REST API is available on the Team plan with 10,000 API calls per month. It supports all PDF operations programmatically with comprehensive documentation and SDKs for Python, Node.js, and PHP.',
  },
  {
    q: 'Can I integrate with Google Drive or Dropbox?',
    a: 'Yes! Pro and Team users can directly import files from Google Drive, Dropbox, and OneDrive, and save results back to these services without downloading to your device.',
  },
  {
    q: 'What is the maximum file size allowed?',
    a: 'Free plan supports up to 10MB per file. Pro plan supports up to 200MB. Team plan supports up to 500MB. For even larger files, contact us for an enterprise arrangement.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 px-4" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="category-badge mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base" style={{ color: 'var(--text-muted)' }}>
            Everything you need to know about PDFusion
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-sm sm:text-base pr-4">{faq.q}</span>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    open === i ? 'rotate-45' : ''
                  }`}
                  style={{
                    background: open === i ? 'var(--primary)' : 'var(--bg)',
                    color: open === i ? 'white' : 'var(--text-muted)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out`}
                style={{ maxHeight: open === i ? '500px' : '0px' }}
              >
                <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div
          className="mt-10 p-6 rounded-2xl text-center"
          style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
        >
          <p className="font-bold mb-1">Still have questions?</p>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            Our support team typically replies within 2 hours on business days.
          </p>
          <a href="#" className="btn-primary px-6 py-2.5 text-sm rounded-xl inline-block">
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
