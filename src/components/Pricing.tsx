'use client';

import { useState } from 'react';

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    desc: 'Perfect for occasional use',
    badge: null,
    color: 'var(--text-muted)',
    features: [
      '5 conversions per day',
      'Max 10 MB per file',
      'All basic tools',
      'Standard processing speed',
      'Ads supported',
      'Files deleted in 2 hours',
    ],
    cta: 'Get Started Free',
    ctaStyle: 'btn-secondary',
    featured: false,
  },
  {
    name: 'Pro',
    price: { monthly: 9.99, yearly: 7.99 },
    desc: 'For professionals & power users',
    badge: 'Most Popular',
    color: 'var(--primary)',
    features: [
      'Unlimited conversions',
      'Max 200 MB per file',
      'All 30+ tools including AI',
      'Priority processing speed',
      'No watermarks or ads',
      'Files stored for 7 days',
      'Google Drive & Dropbox sync',
      'OCR & AI features',
    ],
    cta: 'Start Pro Trial',
    ctaStyle: 'btn-primary',
    featured: true,
  },
  {
    name: 'Team',
    price: { monthly: 24.99, yearly: 19.99 },
    desc: 'For teams & businesses',
    badge: null,
    color: 'var(--secondary)',
    features: [
      'Everything in Pro',
      'Up to 25 team members',
      'Shared workspace & folders',
      'API access (10K calls/mo)',
      'Custom branding & white-label',
      'Priority support & SLA',
      'Usage analytics dashboard',
      'SAML SSO login',
    ],
    cta: 'Start Team Trial',
    ctaStyle: 'btn-secondary',
    featured: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 px-4" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="category-badge mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-xl mx-auto text-base sm:text-lg mb-8" style={{ color: 'var(--text-muted)' }}>
            Start free. Upgrade when you need more power.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl" style={{ background: 'var(--card)', border: '1px solid var(--card-border)' }}>
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                !isYearly ? 'tab-active text-white' : ''
              }`}
              style={!isYearly ? {} : { color: 'var(--text-muted)' }}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                isYearly ? 'tab-active text-white' : ''
              }`}
              style={isYearly ? {} : { color: 'var(--text-muted)' }}
            >
              Yearly
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-green-500 text-white">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card p-8 flex flex-col relative ${plan.featured ? 'featured' : ''}`}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1" style={{ color: plan.featured ? 'var(--primary)' : 'var(--text)' }}>
                  {plan.name}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{plan.desc}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                {plan.price.monthly === 0 ? (
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-extrabold">Free</span>
                  </div>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold mt-1">$</span>
                    <span className="text-5xl font-extrabold">
                      {isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>/mo</span>
                  </div>
                )}
                {isYearly && plan.price.monthly > 0 && (
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    Billed as ${(plan.price.yearly * 12).toFixed(0)}/year · Save ${((plan.price.monthly - plan.price.yearly) * 12).toFixed(0)}
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: plan.featured ? 'var(--primary-glow)' : 'var(--bg)',
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={plan.featured ? 'var(--primary)' : 'var(--text-muted)'} strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <span style={{ color: 'var(--text-muted)' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a href="#" className={`${plan.ctaStyle} w-full py-3 text-sm rounded-xl text-center block`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Trust Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm" style={{ color: 'var(--text-muted)' }}>
          {['✓ No credit card required', '✓ Cancel anytime', '✓ 14-day money-back guarantee', '✓ GDPR compliant'].map((item) => (
            <span key={item} className="flex items-center gap-1">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
