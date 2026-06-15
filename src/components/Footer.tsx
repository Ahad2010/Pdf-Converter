'use client';

const links = {
  Tools: [
    'Merge PDF', 'Split PDF', 'Compress PDF', 'PDF to Word', 'PDF to JPG',
    'Word to PDF', 'Rotate PDF', 'Protect PDF', 'Sign PDF', 'OCR PDF',
  ],
  Company: ['About Us', 'Blog', 'Careers', 'Press Kit', 'Contact'],
  Resources: ['Documentation', 'API Reference', 'Changelog', 'System Status', 'Tutorials'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'],
};

const socials = [
  {
    name: 'Twitter',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--card-border)' }}>
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">

          {/* Brand column */}
          <div className="col-span-2">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 2h8l4 4v10H3V2z" fill="white" fillOpacity="0.9" />
                  <path d="M11 2v4h4" stroke="white" strokeWidth="1.5" fill="none" />
                  <path d="M6 9h6M6 12h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-lg font-bold">PDF<span className="gradient-text">usion</span></span>
            </a>

            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'var(--text-muted)' }}>
              The most powerful AI-powered PDF platform. Process, convert, and manage documents
              with professional-grade tools — all in your browser.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--card-border)',
                    color: 'var(--text-muted)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--card-border)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text)' }}>
                {category}
              </h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--primary)'}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--text-muted)'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App Store Badges */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--card-border)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

            {/* App badges */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium mr-1" style={{ color: 'var(--text-muted)' }}>Get the app:</span>
              {[
                { label: 'App Store', sub: 'Download on the', icon: '🍎' },
                { label: 'Google Play', sub: 'Get it on', icon: '▶' },
              ].map((store) => (
                <a
                  key={store.label}
                  href="#"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-200"
                  style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = 'var(--card-border)'}
                >
                  <span className="text-xl">{store.icon}</span>
                  <div>
                    <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{store.sub}</p>
                    <p className="text-sm font-semibold">{store.label}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Cloud integrations */}
            <div className="flex items-center gap-3">
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Integrates with:</span>
              {['Google Drive', 'Dropbox', 'OneDrive'].map((cloud) => (
                <span
                  key={cloud}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg"
                  style={{ background: 'var(--card)', border: '1px solid var(--card-border)', color: 'var(--text-muted)' }}
                >
                  {cloud}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
            © 2026 PDFusion. All rights reserved. Built with ❤️ for productivity.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-subtle)' }}>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Cookies</a>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
