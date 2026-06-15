'use client';

const features = [
  {
    icon: '🤖',
    title: 'AI PDF Chat',
    desc: 'Upload any PDF and have a conversation with it. Ask questions, get summaries, extract key insights — all powered by cutting-edge AI.',
    gradient: 'from-violet-500 to-purple-600',
    badge: 'GPT-4 Powered',
  },
  {
    icon: '📋',
    title: 'Smart Summarize',
    desc: 'Get a concise, accurate summary of any document in seconds. Perfect for research papers, legal contracts, and long reports.',
    gradient: 'from-sky-500 to-blue-600',
    badge: 'Save 10x Time',
  },
  {
    icon: '👁️',
    title: 'AI-Powered OCR',
    desc: 'Extract searchable text from scanned documents with near-perfect accuracy. Supports 100+ languages automatically.',
    gradient: 'from-emerald-500 to-teal-600',
    badge: '99.8% Accurate',
  },
  {
    icon: '⚡',
    title: 'Smart Split',
    desc: 'Automatically detect chapters, sections, or topics and split your document intelligently — no manual page selection needed.',
    gradient: 'from-orange-500 to-amber-600',
    badge: 'Automatic',
  },
  {
    icon: '🌐',
    title: 'AI Translation',
    desc: 'Translate entire PDF documents to 50+ languages while preserving the original formatting, fonts, and layout perfectly.',
    gradient: 'from-pink-500 to-rose-600',
    badge: '50+ Languages',
  },
  {
    icon: '📝',
    title: 'Form Detection',
    desc: 'Automatically detect and make PDF forms fillable. Identify fields, checkboxes, and signature zones intelligently.',
    gradient: 'from-indigo-500 to-violet-600',
    badge: 'Auto-Detect',
  },
];

export default function AIFeatures() {
  return (
    <section id="ai" className="py-20 px-4 relative overflow-hidden">

      {/* Background Decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, var(--secondary-glow) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <span className="text-lg">🤖</span>
            <span className="text-sm font-semibold gradient-text">Artificial Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            AI That Understands
            <span className="gradient-text"> Your Documents</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg" style={{ color: 'var(--text-muted)' }}>
            Beyond simple PDF tools — our AI reads, understands, and works with your documents
            like a smart assistant by your side.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card p-6 group cursor-pointer transition-all duration-300"
              style={{ '--hover-color': 'var(--secondary-glow)' } as React.CSSProperties}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px var(--secondary-glow)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Icon + Badge Row */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                >
                  {feature.icon}
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: 'var(--secondary-glow)',
                    color: 'var(--secondary)',
                    border: '1px solid var(--secondary)',
                  }}
                >
                  {feature.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {feature.desc}
              </p>

              {/* Learn more link */}
              <div className="flex items-center gap-1 mt-4 text-xs font-semibold transition-all duration-200 opacity-0 group-hover:opacity-100"
                style={{ color: 'var(--secondary)' }}>
                Try it free
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div
            className="inline-block p-px rounded-2xl"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
          >
            <div className="bg-[var(--bg)] rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="text-left">
                <p className="font-bold text-lg">Try AI Tools Free</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  No credit card required · 5 AI uses per day on free plan
                </p>
              </div>
              <a href="#" className="btn-primary px-6 py-3 text-sm rounded-xl flex-shrink-0">
                Start for Free →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
