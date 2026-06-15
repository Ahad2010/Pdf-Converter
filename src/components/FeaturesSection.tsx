'use client';

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Bank-Level Security',
    desc: 'AES-256 encryption, TLS 1.3, auto file deletion. Your documents are yours — we can\'t and don\'t read them.',
    color: 'var(--primary)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Lightning Performance',
    desc: 'Distributed cloud processing means your PDFs are done in 2–5 seconds. No waiting, no queuing, just speed.',
    color: '#F59E0B',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Works Everywhere',
    desc: 'Browser-native. No software to install. Works on Windows, Mac, Linux, iOS, Android — any device with a browser.',
    color: '#10B981',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Team Collaboration',
    desc: 'Share workspaces, comment on documents, and collaborate in real-time with your team across the globe.',
    color: '#8B5CF6',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Developer API',
    desc: 'Full REST API with SDKs for Node.js, Python, and PHP. Process millions of documents programmatically.',
    color: '#06B6D4',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Offline Desktop App',
    desc: 'Download our desktop app for private, offline processing. Your files never leave your computer.',
    color: '#EF4444',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="category-badge mb-3">Why PDFusion</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Built Different.
            <span className="gradient-text"> Built Better.</span>
          </h2>
          <p className="max-w-xl mx-auto text-base sm:text-lg" style={{ color: 'var(--text-muted)' }}>
            We didn&apos;t just build another PDF tool — we reimagined what document processing should feel like.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card p-6 group transition-all duration-300"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `${feature.color}20`,
                  border: `1px solid ${feature.color}40`,
                  color: feature.color,
                }}
              >
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div
          className="mt-16 p-8 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, var(--primary-glow), var(--secondary-glow))',
            border: '1px solid var(--card-border)',
          }}
        >
          <h3 className="text-2xl font-extrabold mb-3">
            Trusted by Teams at
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 mt-4">
            {['Microsoft', 'Deloitte', 'Stanford', 'Amazon', 'Adobe', 'Spotify'].map((company) => (
              <span
                key={company}
                className="text-lg font-black tracking-tight opacity-50 hover:opacity-100 transition-opacity"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
