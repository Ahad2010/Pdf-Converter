const steps = [
  {
    number: '01',
    title: 'Upload Your File',
    desc: 'Drag & drop your document or click to browse. We accept PDF, Word, Excel, PPT, images, and more.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
    ),
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    title: 'Choose Your Tool',
    desc: 'Select from 30+ tools. Convert, edit, compress, merge, secure — our AI suggests the best action.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    number: '03',
    title: 'Download Your Result',
    desc: 'Processing takes seconds. Download your result instantly or save directly to Google Drive or Dropbox.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
    gradient: 'from-emerald-500 to-teal-600',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="category-badge mb-3">How It Works</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Simple as 1-2-3
          </h2>
          <p className="max-w-xl mx-auto text-base sm:text-lg" style={{ color: 'var(--text-muted)' }}>
            No software to install. No account required to start. Just upload and go.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

          {/* Connector lines — desktop only */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px z-0"
            style={{
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
              opacity: 0.3,
            }}
          />

          {steps.map((step, i) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center text-center">

              {/* Number badge */}
              <div className="relative mb-6">
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${step.gradient} shadow-xl`}
                  style={{ boxShadow: `0 8px 32px rgba(91, 141, 239, 0.3)` }}
                >
                  <div className="text-white">{step.icon}</div>
                </div>
                <div
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white"
                  style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
                >
                  {i + 1}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Features row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: '⚡', label: 'Lightning Fast', desc: 'Avg. 3 second processing' },
            { icon: '🔒', label: '100% Secure', desc: 'End-to-end encryption' },
            { icon: '☁️', label: 'Cloud Ready', desc: 'Drive, Dropbox, OneDrive' },
            { icon: '📱', label: 'Works Anywhere', desc: 'Desktop, tablet, mobile' },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-xl text-center"
              style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-bold mb-1">{item.label}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
