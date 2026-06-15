const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Legal Assistant at Morrison & Co.',
    avatar: 'SM',
    rating: 5,
    review: 'PDFusion replaced 3 separate tools we were paying for. The AI chat feature is incredible — I can extract information from 200-page contracts in seconds. Our team saves hours every week.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Aryan Kapoor',
    role: 'Freelance Graphic Designer',
    avatar: 'AK',
    rating: 5,
    review: 'The PDF editor and watermark tools are exactly what I needed for client deliverables. Super clean UI, blazing fast processing, and the dark mode is gorgeous. Switched from SmallPDF and never looked back.',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    name: 'Emma Rodriguez',
    role: 'University Student',
    avatar: 'ER',
    rating: 5,
    review: 'The free plan is actually generous! I merge and split PDFs for my research papers daily. The AI summarize feature helps me review academic papers 5x faster. Absolute game changer for students.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'David Chen',
    role: 'Operations Manager, TechStart Inc.',
    avatar: 'DC',
    rating: 5,
    review: 'We moved our entire document workflow to PDFusion. The team workspace, API integration, and batch processing handle thousands of documents daily without a hitch. ROI was immediate.',
    gradient: 'from-orange-500 to-amber-600',
  },
  {
    name: 'Priya Sharma',
    role: 'Medical Researcher',
    avatar: 'PS',
    rating: 5,
    review: 'The OCR accuracy on scanned medical documents is exceptional. We process hundreds of patient records and the AI extracts text perfectly every time, even from low-quality scans.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    name: 'James Wilson',
    role: 'Real Estate Agent',
    avatar: 'JW',
    rating: 5,
    review: 'Sign PDF and Protect PDF features are essential for my contracts. Having everything in one place — compress, sign, send — has cut my document processing time by 70%. Highly recommend!',
    gradient: 'from-indigo-500 to-violet-600',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="category-badge mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Loved by <span className="gradient-text">2 Million+</span> Users
          </h2>
          <p className="max-w-xl mx-auto text-base sm:text-lg" style={{ color: 'var(--text-muted)' }}>
            From students to enterprise teams — PDFusion works for everyone
          </p>
        </div>

        {/* Overall Rating */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <StarRating count={5} />
            <span className="text-3xl font-extrabold">4.9</span>
          </div>
          <div className="h-8 w-px" style={{ background: 'var(--card-border)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Based on <strong>12,400+ reviews</strong> across Trustpilot & G2
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <StarRating count={t.rating} />

              {/* Review */}
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-muted)' }}>
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold bg-gradient-to-br ${t.gradient} flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-14">
          {[
            { label: 'Trustpilot', score: '4.9/5', stars: '★★★★★' },
            { label: 'G2', score: '4.8/5', stars: '★★★★★' },
            { label: 'Product Hunt', score: '#1 Product', stars: '🏆' },
            { label: 'Capterra', score: '4.9/5', stars: '★★★★★' },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center gap-1 px-6 py-4 rounded-xl"
              style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}
            >
              <span className="text-sm font-bold">{badge.label}</span>
              <span className="text-xs text-yellow-500 font-medium">{badge.stars}</span>
              <span className="text-xs font-bold gradient-text">{badge.score}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
