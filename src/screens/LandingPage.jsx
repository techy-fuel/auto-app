import React, { useState } from 'react';

export function LandingPage({ onLaunchApp }) {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqs = [
    {
      q: 'How does AI lead scoring work?',
      a: 'Our AI analyzes 50+ behavioral signals including email engagement, website visits, company size, industry fit, and CRM activity history. Each lead receives a score from 0–100 updated in real time, so your reps always know who to call first.',
    },
    {
      q: 'Can I import my existing CRM data?',
      a: 'Yes. AutoPilot CRM supports one-click imports from Salesforce, HubSpot, Pipedrive, and any CSV export. Your data is mapped automatically, and our onboarding team will guide you through the migration at no extra charge.',
    },
    {
      q: 'Is my data secure?',
      a: 'Absolutely. We are SOC 2 Type II certified and GDPR compliant. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We never sell or share your data with third parties.',
    },
    {
      q: 'Do you offer a free trial?',
      a: 'Yes — every plan starts with a 14-day free trial, no credit card required. You get full access to all features on your chosen plan so you can evaluate AutoPilot CRM with real data before committing.',
    },
    {
      q: 'What integrations are available?',
      a: 'AutoPilot CRM integrates with Gmail, Outlook, Slack, Zoom, LinkedIn Sales Navigator, Stripe, Zapier, and 100+ more tools via our native integrations and REST API. Enterprise customers also get custom webhook support.',
    },
  ];

  const features = [
    { icon: '🎯', title: 'AI Lead Scoring', desc: 'Score every lead 0–100 based on 50+ behavioral signals' },
    { icon: '📊', title: 'Pipeline Analytics', desc: 'Real-time visibility into every deal stage and bottleneck' },
    { icon: '✉️', title: 'Email Automation', desc: 'AI-drafted emails personalized to each lead\'s behavior' },
    { icon: '📱', title: 'Mobile CRM', desc: 'Full CRM power on your phone — leads, AI, and pipeline anywhere' },
    { icon: '⚡', title: 'Instant Forecasting', desc: 'Accurate revenue forecasts powered by machine learning' },
    { icon: '🤝', title: 'Team Intelligence', desc: 'See which reps need coaching and where deals get stuck' },
  ];

  // ── Shared style tokens ──────────────────────────────────────────────────
  const btnBase = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-semibold)',
    fontSize: '15px',
    borderRadius: 'var(--radius-pill)',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity .18s, transform .14s, box-shadow .18s',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  };

  const btnEmerald = {
    ...btnBase,
    background: 'var(--gradient-emerald)',
    color: 'var(--white)',
    padding: '13px 28px',
    boxShadow: '0 4px 18px rgba(5,150,105,.35)',
  };

  const btnGhost = {
    ...btnBase,
    background: 'transparent',
    color: 'var(--white)',
    padding: '12px 26px',
    border: '1.5px solid rgba(255,255,255,.35)',
  };

  const btnNavAccent = {
    ...btnBase,
    background: 'var(--gradient-emerald)',
    color: 'var(--white)',
    padding: '9px 20px',
    fontSize: '14px',
    boxShadow: '0 3px 12px rgba(5,150,105,.28)',
  };

  const btnNavGhost = {
    ...btnBase,
    background: 'transparent',
    color: 'var(--navy-800)',
    padding: '9px 18px',
    fontSize: '14px',
    border: '1.5px solid var(--slate-200)',
  };

  return (
    <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)', overflowX: 'hidden' }}>

      {/* ── 1. NAVBAR ──────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--slate-200)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 var(--space-6)',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-8)',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '17px',
              boxShadow: '0 3px 10px rgba(5,150,105,.3)',
            }}>✦</div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-bold)',
              fontSize: '18px',
              color: 'var(--navy-900)',
              letterSpacing: '-.3px',
            }}>AutoPilot CRM</span>
          </div>

          {/* Center nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
            {['Features', 'Pricing', 'About'].map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`} style={{
                fontWeight: 'var(--weight-medium)',
                fontSize: '15px',
                color: 'var(--slate-700)',
                textDecoration: 'none',
                transition: 'color .15s',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--emerald-600)'}
                onMouseLeave={e => e.target.style.color = 'var(--slate-700)'}
              >{label}</a>
            ))}
          </div>

          {/* Right CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <button style={btnNavGhost} onClick={onLaunchApp}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--emerald-500)'; e.currentTarget.style.color = 'var(--emerald-600)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--slate-200)'; e.currentTarget.style.color = 'var(--navy-800)'; }}
            >Sign In</button>
            <button style={btnNavAccent} onClick={onLaunchApp}
              onMouseEnter={e => e.currentTarget.style.opacity = '.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >Get Started Free</button>
          </div>
        </div>
      </nav>

      {/* ── 2. HERO ────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--gradient-brand)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-16) var(--space-6)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(16,185,129,.13) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          background: 'rgba(16,185,129,.15)',
          border: '1px solid rgba(16,185,129,.35)',
          borderRadius: 'var(--radius-pill)',
          padding: '6px 16px',
          fontSize: '13px',
          fontWeight: 'var(--weight-semibold)',
          color: 'var(--emerald-400)',
          letterSpacing: '.3px',
          marginBottom: 'var(--space-8)',
        }}>
          <span>✦</span> AI-Powered Sales Intelligence
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--weight-extra)',
          fontSize: 'clamp(36px, 5.5vw, 68px)',
          lineHeight: '1.08',
          color: 'var(--white)',
          maxWidth: '860px',
          margin: '0 auto var(--space-6)',
          letterSpacing: '-1.5px',
        }}>
          Close More Deals with AI That Thinks Like Your Best Salesperson
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: 'rgba(255,255,255,.72)',
          maxWidth: '600px',
          margin: '0 auto var(--space-10)',
          lineHeight: '1.65',
        }}>
          AutoPilot CRM uses advanced AI to score leads, predict close dates, and tell your team exactly what to do next.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 'var(--space-5)' }}>
          <button style={{ ...btnEmerald, padding: '15px 34px', fontSize: '16px' }} onClick={onLaunchApp}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(5,150,105,.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(5,150,105,.35)'; }}
          >Start Free Trial →</button>
          <button style={{ ...btnGhost, padding: '14px 30px', fontSize: '16px' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >Watch Demo</button>
        </div>

        {/* Trust line */}
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.45)', marginBottom: 'var(--space-16)', letterSpacing: '.1px' }}>
          No credit card required · 14-day free trial · Cancel anytime
        </p>

        {/* Dashboard mockup */}
        <div style={{
          background: 'rgba(255,255,255,.05)',
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6)',
          maxWidth: '780px',
          width: '100%',
          boxShadow: '0 32px 80px rgba(0,0,0,.45)',
          backdropFilter: 'blur(8px)',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Window chrome */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-5)' }}>
            {['#FF5F57', '#FFBD2E', '#28CA42'].map(c => (
              <div key={c} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c }} />
            ))}
            <div style={{ flex: 1, height: '24px', background: 'rgba(255,255,255,.06)', borderRadius: 'var(--radius-sm)', marginLeft: '10px' }} />
          </div>

          {/* Stat row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '14px' }}>
            {[
              { label: 'Open Deals', value: '142', color: 'var(--emerald-600)' },
              { label: 'Revenue (MTD)', value: '$284K', color: '#3B82F6' },
              { label: 'Hot Leads', value: '37', color: '#F59E0B' },
              { label: 'Win Rate', value: '68%', color: 'var(--emerald-500)' },
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'rgba(255,255,255,.07)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                textAlign: 'left',
              }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.45)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '.5px' }}>{stat.label}</div>
                <div style={{ fontSize: '22px', fontWeight: 'var(--weight-bold)', color: stat.color, fontFamily: 'var(--font-display)' }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Fake pipeline bars */}
          <div style={{ background: 'rgba(255,255,255,.05)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)', marginBottom: '12px', fontWeight: 'var(--weight-semibold)', textTransform: 'uppercase', letterSpacing: '.5px' }}>Pipeline by Stage</div>
            {[
              { stage: 'Prospecting', pct: 80, color: '#6366F1' },
              { stage: 'Qualified', pct: 55, color: '#3B82F6' },
              { stage: 'Proposal Sent', pct: 38, color: '#F59E0B' },
              { stage: 'Closing', pct: 22, color: 'var(--emerald-500)' },
            ].map(row => (
              <div key={row.stage} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ width: '110px', fontSize: '12px', color: 'rgba(255,255,255,.55)', textAlign: 'right', flexShrink: 0 }}>{row.stage}</div>
                <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${row.pct}%`, height: '100%', background: row.color, borderRadius: '4px' }} />
                </div>
                <div style={{ width: '36px', fontSize: '12px', color: 'rgba(255,255,255,.45)' }}>{row.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. STATS BAR ──────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--slate-50)', borderBottom: '1px solid var(--slate-200)' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'var(--space-12) var(--space-6)',
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-16)',
          flexWrap: 'wrap',
        }}>
          {[
            { value: '10,000+', label: 'Sales Teams' },
            { value: '$2.4B', label: 'Revenue Tracked' },
            { value: '94%', label: 'Customer Satisfaction' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-extra)',
                fontSize: '44px',
                color: 'var(--navy-900)',
                lineHeight: '1',
                letterSpacing: '-1px',
              }}>{stat.value}</div>
              <div style={{ fontSize: '15px', color: 'var(--slate-500)', marginTop: '6px', fontWeight: 'var(--weight-medium)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. FEATURES ───────────────────────────────────────────────────── */}
      <section id="features" style={{ background: 'var(--white)', padding: 'var(--space-16) var(--space-6)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <div style={{
              display: 'inline-block',
              background: 'var(--emerald-50)',
              color: 'var(--emerald-700)',
              borderRadius: 'var(--radius-pill)',
              padding: '5px 14px',
              fontSize: '13px',
              fontWeight: 'var(--weight-semibold)',
              marginBottom: 'var(--space-5)',
            }}>Features</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-bold)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              color: 'var(--navy-900)',
              letterSpacing: '-1px',
              margin: 0,
            }}>Everything your sales team needs</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--space-6)',
          }}>
            {features.map((f) => (
              <div key={f.title} style={{
                border: '1px solid var(--slate-200)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-8)',
                background: 'var(--white)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'box-shadow .2s, transform .2s, border-color .2s',
                cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--emerald-400)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--slate-200)'; }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'var(--emerald-50)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: 'var(--space-5)',
                }}>{f.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--weight-bold)',
                  fontSize: '18px',
                  color: 'var(--navy-900)',
                  margin: '0 0 8px',
                }}>{f.title}</h3>
                <p style={{ fontSize: '15px', color: 'var(--slate-600)', lineHeight: '1.6', margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. AI DEMO ────────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--gradient-navy)',
        padding: 'var(--space-16) var(--space-6)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-16)',
          alignItems: 'center',
        }}>
          {/* Left text */}
          <div>
            <div style={{
              display: 'inline-block',
              background: 'rgba(16,185,129,.15)',
              border: '1px solid rgba(16,185,129,.3)',
              color: 'var(--emerald-400)',
              borderRadius: 'var(--radius-pill)',
              padding: '5px 14px',
              fontSize: '13px',
              fontWeight: 'var(--weight-semibold)',
              marginBottom: 'var(--space-5)',
            }}>AI Copilot</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-bold)',
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              color: 'var(--white)',
              letterSpacing: '-1px',
              margin: '0 0 var(--space-5)',
              lineHeight: '1.15',
            }}>Meet your AI Sales Copilot</h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.65)', lineHeight: '1.7', marginBottom: 'var(--space-8)' }}>
              Your AI Copilot works 24/7 to surface the deals most likely to close, draft the perfect follow-up, and flag risks before they cost you revenue.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Prioritizes your pipeline by AI-predicted close probability',
                'Drafts personalized outreach in seconds',
                'Alerts you when a deal goes silent',
                'Answers pipeline questions in plain English',
              ].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: 'rgba(255,255,255,.75)' }}>
                  <span style={{ color: 'var(--emerald-400)', fontWeight: 'var(--weight-bold)', flexShrink: 0, marginTop: '1px' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Chat mockup */}
          <div style={{
            background: 'rgba(255,255,255,.05)',
            border: '1px solid rgba(255,255,255,.1)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,.4)',
          }}>
            {/* Chat header */}
            <div style={{
              background: 'rgba(255,255,255,.08)',
              borderBottom: '1px solid rgba(255,255,255,.08)',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--gradient-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
              }}>✦</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 'var(--weight-semibold)', color: 'var(--white)' }}>AutoPilot AI</div>
                <div style={{ fontSize: '11px', color: 'var(--emerald-400)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--emerald-400)', display: 'inline-block' }} />
                  Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* User message */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  background: 'var(--gradient-emerald)',
                  color: 'var(--white)',
                  borderRadius: '16px 16px 4px 16px',
                  padding: '11px 16px',
                  fontSize: '14px',
                  maxWidth: '80%',
                  lineHeight: '1.5',
                }}>Which leads should I focus on today?</div>
              </div>

              {/* AI message */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--gradient-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  flexShrink: 0,
                }}>✦</div>
                <div style={{
                  background: 'rgba(255,255,255,.08)',
                  border: '1px solid rgba(255,255,255,.1)',
                  color: 'rgba(255,255,255,.88)',
                  borderRadius: '4px 16px 16px 16px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  maxWidth: '88%',
                  lineHeight: '1.6',
                }}>
                  Your top 3 leads to contact today:<br /><br />
                  🔥 <strong style={{ color: 'var(--white)' }}>Acme Corp</strong> — Score 94. Opened your proposal 4× yesterday. Strike now.<br />
                  📈 <strong style={{ color: 'var(--white)' }}>FinEdge Ltd</strong> — Score 87. Trial expires in 2 days. Upsell window is open.<br />
                  ⚡ <strong style={{ color: 'var(--white)' }}>Nexgen AI</strong> — Score 82. CEO visited pricing page twice this week.
                </div>
              </div>

              {/* User follow-up */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  background: 'var(--gradient-emerald)',
                  color: 'var(--white)',
                  borderRadius: '16px 16px 4px 16px',
                  padding: '11px 16px',
                  fontSize: '14px',
                  maxWidth: '80%',
                  lineHeight: '1.5',
                }}>Draft a follow-up email for Acme Corp</div>
              </div>

              {/* AI response */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--gradient-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  flexShrink: 0,
                }}>✦</div>
                <div style={{
                  background: 'rgba(255,255,255,.08)',
                  border: '1px solid rgba(255,255,255,.1)',
                  color: 'rgba(255,255,255,.88)',
                  borderRadius: '4px 16px 16px 16px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  maxWidth: '88%',
                  lineHeight: '1.6',
                }}>
                  <em style={{ color: 'rgba(255,255,255,.5)', fontSize: '12px' }}>Subject: Quick question about your review</em><br /><br />
                  Hi Sarah, I noticed your team has been reviewing our proposal — happy to answer any questions or arrange a quick call to walk you through the ROI numbers specific to your use case. What time works best this week?
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    {['Send', 'Edit', 'Regenerate'].map(a => (
                      <button key={a} style={{
                        background: 'rgba(16,185,129,.2)',
                        border: '1px solid rgba(16,185,129,.3)',
                        color: 'var(--emerald-400)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '4px 10px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: 'var(--weight-medium)',
                      }}>{a}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PRICING ────────────────────────────────────────────────────── */}
      <section id="pricing" style={{ background: 'var(--slate-50)', padding: 'var(--space-16) var(--space-6)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <div style={{
              display: 'inline-block',
              background: 'var(--emerald-50)',
              color: 'var(--emerald-700)',
              borderRadius: 'var(--radius-pill)',
              padding: '5px 14px',
              fontSize: '13px',
              fontWeight: 'var(--weight-semibold)',
              marginBottom: 'var(--space-5)',
            }}>Pricing</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-bold)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              color: 'var(--navy-900)',
              letterSpacing: '-1px',
              margin: 0,
            }}>Simple, transparent pricing</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-6)',
            alignItems: 'stretch',
          }}>
            {/* Starter */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--slate-200)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', fontSize: '20px', color: 'var(--navy-900)', margin: '0 0 8px' }}>Starter</h3>
                <p style={{ fontSize: '14px', color: 'var(--slate-500)', margin: '0 0 var(--space-6)' }}>Perfect for small teams getting started</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-extra)', fontSize: '48px', color: 'var(--navy-900)', letterSpacing: '-2px' }}>$49</span>
                  <span style={{ fontSize: '15px', color: 'var(--slate-500)' }}>/month</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-8)', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Up to 5 users', 'AI lead scoring', '1,000 contacts', 'Email integration', 'Basic analytics', 'Email support'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: 'var(--slate-700)' }}>
                    <span style={{ color: 'var(--emerald-600)', fontWeight: 'var(--weight-bold)' }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button style={{
                ...btnBase,
                width: '100%',
                padding: '13px',
                border: '1.5px solid var(--emerald-500)',
                color: 'var(--emerald-600)',
                background: 'var(--white)',
                borderRadius: 'var(--radius-md)',
              }} onClick={onLaunchApp}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--emerald-50)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)'; }}
              >Get Started</button>
            </div>

            {/* Professional (highlighted) */}
            <div style={{
              background: 'var(--navy-900)',
              border: '2px solid var(--emerald-500)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 60px rgba(5,150,105,.22)',
              position: 'relative',
            }}>
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--gradient-emerald)',
                color: 'var(--white)',
                borderRadius: 'var(--radius-pill)',
                padding: '4px 16px',
                fontSize: '12px',
                fontWeight: 'var(--weight-bold)',
                letterSpacing: '.4px',
                whiteSpace: 'nowrap',
              }}>★ Most Popular</div>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', fontSize: '20px', color: 'var(--white)', margin: '0 0 8px' }}>Professional</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.55)', margin: '0 0 var(--space-6)' }}>For growing sales teams that need everything</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-extra)', fontSize: '48px', color: 'var(--white)', letterSpacing: '-2px' }}>$99</span>
                  <span style={{ fontSize: '15px', color: 'rgba(255,255,255,.5)' }}>/month</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-8)', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Up to 25 users', 'Advanced AI scoring', 'Unlimited contacts', 'Email automation', 'Pipeline analytics', 'Forecasting', 'Integrations (100+)', 'Priority support'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: 'rgba(255,255,255,.82)' }}>
                    <span style={{ color: 'var(--emerald-400)', fontWeight: 'var(--weight-bold)' }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button style={{
                ...btnBase,
                width: '100%',
                padding: '13px',
                background: 'var(--gradient-emerald)',
                color: 'var(--white)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 4px 16px rgba(5,150,105,.4)',
              }} onClick={onLaunchApp}
                onMouseEnter={e => e.currentTarget.style.opacity = '.88'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >Get Started</button>
            </div>

            {/* Enterprise */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--slate-200)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', fontSize: '20px', color: 'var(--navy-900)', margin: '0 0 8px' }}>Enterprise</h3>
                <p style={{ fontSize: '14px', color: 'var(--slate-500)', margin: '0 0 var(--space-6)' }}>For large organizations with custom needs</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-extra)', fontSize: '42px', color: 'var(--navy-900)', letterSpacing: '-2px' }}>Custom</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-8)', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Unlimited users', 'Custom AI models', 'Dedicated onboarding', 'SLA guarantees', 'SSO & SAML', 'Custom integrations', 'Audit logs', 'Dedicated CSM'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: 'var(--slate-700)' }}>
                    <span style={{ color: 'var(--emerald-600)', fontWeight: 'var(--weight-bold)' }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button style={{
                ...btnBase,
                width: '100%',
                padding: '13px',
                border: '1.5px solid var(--navy-800)',
                color: 'var(--navy-900)',
                background: 'var(--white)',
                borderRadius: 'var(--radius-md)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy-50)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)'; }}
              >Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ────────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--white)', padding: 'var(--space-16) var(--space-6)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-bold)',
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              color: 'var(--navy-900)',
              letterSpacing: '-1px',
              margin: 0,
            }}>Frequently asked questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                border: '1px solid var(--slate-200)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: faqOpen === i ? 'var(--shadow-sm)' : 'none',
              }}>
                <button
                  onClick={() => toggleFaq(i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-6)',
                    background: faqOpen === i ? 'var(--slate-50)' : 'var(--white)',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: 'var(--space-4)',
                  }}
                >
                  <span style={{ fontWeight: 'var(--weight-semibold)', fontSize: '16px', color: 'var(--navy-900)' }}>{faq.q}</span>
                  <span style={{
                    flexShrink: 0,
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: faqOpen === i ? 'var(--emerald-600)' : 'var(--slate-100)',
                    color: faqOpen === i ? 'var(--white)' : 'var(--slate-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 'var(--weight-bold)',
                    lineHeight: 1,
                  }}>
                    {faqOpen === i ? '−' : '+'}
                  </span>
                </button>
                {faqOpen === i && (
                  <div style={{
                    padding: 'var(--space-5) var(--space-6) var(--space-6)',
                    background: 'var(--slate-50)',
                    fontSize: '15px',
                    color: 'var(--slate-600)',
                    lineHeight: '1.7',
                    borderTop: '1px solid var(--slate-200)',
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA BANNER ─────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--gradient-emerald)',
        padding: 'var(--space-16) var(--space-6)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--weight-extra)',
            fontSize: 'clamp(30px, 4vw, 50px)',
            color: 'var(--white)',
            letterSpacing: '-1.5px',
            margin: '0 0 var(--space-5)',
            lineHeight: '1.1',
          }}>Ready to 10x your sales team's performance?</h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,.82)', margin: '0 0 var(--space-10)', lineHeight: '1.6' }}>
            Join 10,000+ sales teams already using AutoPilot CRM to close more deals, faster. Get started in minutes — no credit card required.
          </p>
          <button style={{
            ...btnBase,
            background: 'var(--white)',
            color: 'var(--emerald-700)',
            padding: '16px 36px',
            fontSize: '17px',
            boxShadow: '0 8px 30px rgba(0,0,0,.18)',
            fontWeight: 'var(--weight-bold)',
          }} onClick={onLaunchApp}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,.24)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,.18)'; }}
          >Start Free Trial →</button>
        </div>
      </section>

      {/* ── 9. FOOTER ─────────────────────────────────────────────────────── */}
      <footer style={{ background: 'var(--navy-900)', padding: 'var(--space-16) var(--space-6) var(--space-8)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'var(--space-10)',
            marginBottom: 'var(--space-12)',
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-4)' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--gradient-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                }}>✦</div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-bold)', fontSize: '16px', color: 'var(--white)' }}>AutoPilot CRM</span>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.42)', lineHeight: '1.65', margin: 0 }}>
                The AI-powered CRM built for modern sales teams who want to close faster.
              </p>
            </div>

            {/* Link columns */}
            {[
              { heading: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap'] },
              { heading: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
              { heading: 'Resources', links: ['Documentation', 'API Reference', 'Help Center', 'Community', 'Webinars'] },
              { heading: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'] },
            ].map(col => (
              <div key={col.heading}>
                <h4 style={{ fontWeight: 'var(--weight-semibold)', fontSize: '13px', color: 'rgba(255,255,255,.9)', letterSpacing: '.5px', textTransform: 'uppercase', margin: '0 0 var(--space-5)' }}>{col.heading}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map(link => (
                    <li key={link}>
                      <span style={{ fontSize: '14px', color: 'rgba(255,255,255,.42)', cursor: 'pointer' }}
                        onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,.8)'}
                        onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.42)'}
                      >{link}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,.08)',
            paddingTop: 'var(--space-8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,.3)' }}>© 2026 AutoPilot CRM. All rights reserved.</span>
            <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
              {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
                <span key={social} style={{ fontSize: '13px', color: 'rgba(255,255,255,.3)', cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,.7)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.3)'}
                >{social}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
