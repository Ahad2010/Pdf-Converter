'use client';

import { useEffect, useRef } from 'react';

const stats = [
  { value: '50M+', label: 'Files Processed' },
  { value: '2M+', label: 'Happy Users' },
  { value: '30+', label: 'PDF Tools' },
  { value: '99.9%', label: 'Uptime' },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--mouse-x', `${x}%`);
      hero.style.setProperty('--mouse-y', `${y}%`);
    };
    hero.addEventListener('mousemove', onMouseMove);
    return () => hero.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-bg relative min-h-screen flex flex-col items-center justify-center pt-16 pb-0 overflow-hidden"
    >
      {/* Animated Mesh Background */}
      <div className="hero-mesh absolute inset-0 pointer-events-none" />

      {/* Grid Pattern */}
      <div className="grid-pattern absolute inset-0 pointer-events-none" />

      {/* Floating Orbs */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none animate-orb-1"
        style={{
          background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
          top: '10%',
          left: '5%',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none animate-orb-2"
        style={{
          background: 'radial-gradient(circle, var(--secondary-glow) 0%, transparent 70%)',
          top: '20%',
          right: '5%',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full pointer-events-none animate-orb-3"
        style={{
          background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-slide-up">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            AI-Powered · Secure · Lightning Fast
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
            NEW
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none mb-6">
          <span className="block mb-2">All Your PDF Tools.</span>
          <span className="block gradient-text">One Powerful Platform.</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl mb-10 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Convert, edit, compress, sign, and manage PDF documents with cutting-edge AI.
          No installation needed — works directly in your browser.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#upload" className="btn-primary flex items-center gap-2 px-8 py-4 text-base rounded-xl w-full sm:w-auto justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload a File
          </a>
          <a href="#tools" className="btn-secondary flex items-center gap-2 px-8 py-4 text-base rounded-xl w-full sm:w-auto justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
            </svg>
            Explore All Tools
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card px-4 py-5 flex flex-col items-center"
            >
              <span className="text-2xl sm:text-3xl font-extrabold gradient-text">{stat.value}</span>
              <span className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>Scroll to explore</span>
        <div
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1"
          style={{ borderColor: 'var(--card-border)' }}
        >
          <div
            className="w-1 h-2 rounded-full animate-bounce"
            style={{ background: 'var(--primary)' }}
          />
        </div>
      </div>
    </section>
  );
}
