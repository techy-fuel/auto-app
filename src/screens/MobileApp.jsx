import React, { useState } from 'react';

// Mobile App — 3 screens: Home, Lead Detail, AI Copilot
// Shown as a phone mockup within the CRM app

const leads = [
  { id: 1, name: 'Tariq Mehmood', company: 'Pinnacle Group', value: 88000, score: 94, status: 'Negotiation', lastContact: '1h ago', avatar: 'TM' },
  { id: 2, name: 'Sana Sheikh', company: 'Growify Inc', value: 67200, score: 91, status: 'Negotiation', lastContact: '5h ago', avatar: 'SS' },
  { id: 3, name: 'Zara Malik', company: 'TechNova Pvt Ltd', value: 42000, score: 88, status: 'Proposal', lastContact: '2d ago', avatar: 'ZM' },
  { id: 4, name: 'Bilal Ahmed', company: 'InnoTech Corp', value: 55000, score: 79, status: 'Qualified', lastContact: '6h ago', avatar: 'BA' },
  { id: 5, name: 'Ali Hassan', company: 'Digital Ventures', value: 18500, score: 72, status: 'Qualified', lastContact: '1d ago', avatar: 'AH' },
];

const avatarColors = ['#0A2540', '#059669', '#2563EB', '#7C3AED', '#D97706'];

const tempColors = {
  hot:  { bg: '#FEF0F0', fg: '#EF4444' },
  warm: { bg: '#FEF7EA', fg: '#F59E0B' },
  cold: { bg: '#EFF4FE', fg: '#2563EB' },
};
function tempFor(score) {
  if (score >= 70) return 'hot';
  if (score >= 40) return 'warm';
  return 'cold';
}

const statusColors = {
  Negotiation: { bg: '#FEF3C7', fg: '#D97706' },
  Proposal: { bg: '#EDE9FE', fg: '#7C3AED' },
  Qualified: { bg: '#D1FAE5', fg: '#059669' },
  New: { bg: '#DBEAFE', fg: '#2563EB' },
};

// ---- Screen: Home ----
function HomeScreen({ onSelectLead, onCopilot }) {
  const todayTasks = [
    { icon: '📞', text: 'Call Tariq Mehmood', time: '10:00 AM', urgent: true },
    { icon: '✉️', text: 'Email follow-up — Zara Malik', time: '11:30 AM', urgent: false },
    { icon: '📋', text: 'Send proposal — Sana Sheikh', time: '2:00 PM', urgent: false },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', background: 'var(--slate-50)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--gradient-navy)',
        padding: '20px 20px 28px',
        color: 'var(--white)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 4 }}>Good morning 👋</div>
            <div style={{ font: 'var(--weight-bold) 18px/1 var(--font-display)' }}>Sarah Ahmed</div>
          </div>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'var(--emerald-600)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            font: 'var(--weight-bold) 14px/1 var(--font-display)',
          }}>SA</div>
        </div>
        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { label: 'My Leads', value: '24' },
            { label: 'Tasks', value: '7' },
            { label: 'Won Today', value: '$12K' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '10px 8px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{ font: 'var(--weight-bold) 18px/1 var(--font-display)', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 11, opacity: 0.6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insight */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, white 100%)',
          border: '1px solid var(--emerald-100)',
          borderRadius: 14,
          padding: 14,
          display: 'flex', gap: 12,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, flexShrink: 0,
            background: 'var(--gradient-emerald)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 16, fontWeight: 700,
          }}>✦</div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--emerald-700)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>AI INSIGHT</div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-body)' }}>
              Tariq Mehmood deal ($88K) is at risk — 31 days in Negotiation. Call him today.
            </div>
          </div>
        </div>
      </div>

      {/* Today's tasks */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 10 }}>Today's Tasks</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {todayTasks.map((t, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'var(--white)',
              border: `1px solid ${t.urgent ? 'var(--emerald-200)' : 'var(--border-soft)'}`,
              borderRadius: 12,
              padding: '12px 14px',
              boxShadow: 'var(--shadow-xs)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: t.urgent ? 'var(--emerald-50)' : 'var(--slate-50)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>{t.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-strong)' }}>{t.text}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{t.time}</div>
              </div>
              {t.urgent && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald-500)' }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Hot Leads */}
      <div style={{ padding: '16px 16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)' }}>Hot Leads</div>
          <div style={{ fontSize: 12, color: 'var(--emerald-700)', fontWeight: 600 }}>See all →</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {leads.filter(l => l.score >= 70).slice(0, 3).map((lead, i) => {
            const temp = tempFor(lead.score);
            const t = tempColors[temp];
            const sc = statusColors[lead.status] || { bg: 'var(--slate-100)', fg: 'var(--text-muted)' };
            return (
              <div key={lead.id}
                onClick={() => onSelectLead(lead)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'var(--white)',
                  border: '1px solid var(--border-soft)',
                  borderRadius: 12,
                  padding: '12px 14px',
                  boxShadow: 'var(--shadow-xs)',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                  background: avatarColors[i % avatarColors.length],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 13, fontWeight: 700,
                }}>{lead.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.company}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-strong)' }}>${(lead.value/1000).toFixed(0)}K</div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    marginTop: 3, padding: '2px 7px', borderRadius: 999,
                    background: t.bg, color: t.fg,
                    fontSize: 10, fontWeight: 700,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.fg }} />
                    {temp.charAt(0).toUpperCase() + temp.slice(1)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---- Screen: Lead Detail ----
function LeadDetailScreen({ lead, onBack, onCopilot }) {
  const temp = tempFor(lead.score);
  const t = tempColors[temp];
  const sc = statusColors[lead.status] || { bg: 'var(--slate-100)', fg: 'var(--text-muted)' };

  const activities = [
    { icon: '📞', text: 'Call scheduled', time: '10:00 AM today', done: false },
    { icon: '✉️', text: 'Email opened ×3', time: 'Yesterday', done: true },
    { icon: '📋', text: 'Proposal viewed', time: '2 days ago', done: true },
    { icon: '🤝', text: 'Initial meeting', time: '5 days ago', done: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--slate-50)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--gradient-navy)',
        padding: '16px 20px 24px',
        color: 'white',
      }}>
        <button onClick={onBack} style={{
          border: 'none', background: 'rgba(255,255,255,0.15)', color: 'white',
          borderRadius: 8, padding: '6px 12px', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>← Back</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'var(--emerald-600)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            font: 'var(--weight-bold) 18px/1 var(--font-display)',
            border: '2px solid rgba(255,255,255,0.2)',
          }}>{lead.avatar}</div>
          <div>
            <div style={{ font: 'var(--weight-bold) 18px/1 var(--font-display)', marginBottom: 4 }}>{lead.name}</div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>{lead.company}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
            <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 4 }}>Deal Value</div>
            <div style={{ font: 'var(--weight-bold) 20px/1 var(--font-display)' }}>${lead.value.toLocaleString()}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
            <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 4 }}>AI Score</div>
            <div style={{ font: 'var(--weight-bold) 20px/1 var(--font-display)', color: lead.score >= 80 ? '#34D399' : 'white' }}>{lead.score}/100</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {/* Status + temp */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <span style={{ padding: '4px 12px', borderRadius: 999, background: sc.bg, color: sc.fg, fontSize: 12, fontWeight: 700 }}>
            {lead.status}
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '4px 12px', borderRadius: 999,
            background: t.bg, color: t.fg, fontSize: 12, fontWeight: 700,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.fg }} />
            {temp.charAt(0).toUpperCase() + temp.slice(1)} Lead
          </span>
          <span style={{ padding: '4px 12px', borderRadius: 999, background: 'var(--slate-100)', color: 'var(--text-muted)', fontSize: 12 }}>
            Last contact: {lead.lastContact}
          </span>
        </div>

        {/* AI Insight */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, white 100%)',
          border: '1px solid var(--emerald-100)',
          borderRadius: 14,
          padding: 14,
          marginBottom: 16,
          display: 'flex', gap: 10,
        }}>
          <span style={{ fontSize: 20 }}>✦</span>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--emerald-700)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>AI Recommendation</div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-body)' }}>
              {lead.score >= 90
                ? `${lead.name} has a ${lead.score}% close probability. Schedule a closing call this week — they've shown strong buying signals.`
                : `Engagement is good but deal velocity is slow. Send a value-add email with case studies to re-energize this lead.`
              }
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
          {[
            { icon: '📞', label: 'Call' },
            { icon: '✉️', label: 'Email' },
            { icon: '📅', label: 'Schedule' },
          ].map(a => (
            <button key={a.label} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              padding: '14px 8px',
              background: 'var(--white)', border: '1px solid var(--border-soft)',
              borderRadius: 12, cursor: 'pointer',
              font: 'var(--weight-semibold) 12px/1 var(--font-display)',
              color: 'var(--text-body)',
              boxShadow: 'var(--shadow-xs)',
            }}>
              <span style={{ fontSize: 22 }}>{a.icon}</span>
              {a.label}
            </button>
          ))}
        </div>

        {/* Ask AI button */}
        <button onClick={onCopilot} style={{
          width: '100%', padding: '13px',
          background: 'var(--gradient-emerald)',
          border: 'none', borderRadius: 12,
          color: 'white',
          font: 'var(--weight-bold) 14px/1 var(--font-display)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          marginBottom: 16,
          boxShadow: '0 4px 14px rgba(16,185,129,0.35)',
        }}>
          <span>✦</span> Ask AI about this lead
        </button>

        {/* Activity timeline */}
        <div style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 10 }}>Activity Timeline</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {activities.map((a, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              paddingBottom: 14,
              borderLeft: i < activities.length - 1 ? '2px solid var(--border-soft)' : '2px solid transparent',
              marginLeft: 15,
              paddingLeft: 14,
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', left: -11, top: 0,
                width: 22, height: 22, borderRadius: '50%',
                background: a.done ? 'var(--emerald-500)' : 'var(--white)',
                border: `2px solid ${a.done ? 'var(--emerald-500)' : 'var(--border-strong)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11,
              }}>{a.done ? '✓' : ''}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: a.done ? 400 : 600, color: a.done ? 'var(--text-muted)' : 'var(--text-strong)' }}>{a.icon} {a.text}</div>
                <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 2 }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Screen: Mobile Copilot ----
function MobileCopilotScreen({ lead, onBack }) {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: lead
        ? `I can see you're looking at ${lead.name} from ${lead.company}. Their deal value is $${lead.value.toLocaleString()} and AI score is ${lead.score}/100. What would you like to know?`
        : "Hi! I'm your AI Copilot. Ask me anything about your leads, pipeline, or what to do next.",
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickAsks = lead
    ? ['What\'s their close probability?', 'Draft a follow-up email', 'What\'s the best next step?']
    : ['Which leads to call today?', 'Pipeline summary', 'Today\'s tasks'];

  function send(text) {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setMessages(p => [...p, { role: 'user', content: msg }]);
    setLoading(true);
    setTimeout(() => {
      let reply = '';
      if (msg.includes('close probability') || msg.includes('close')) {
        reply = `Based on ${lead?.name || 'this lead'}'s engagement — email opens, meeting attendance, and response time — their close probability is **${lead?.score || 85}%**.\n\nKey signals:\n• Viewed proposal 3 times\n• Responded within 2 hours on last contact\n• Decision timeline: this quarter\n\nRecommendation: Send a closing call invite today.`;
      } else if (msg.includes('email') || msg.includes('draft')) {
        reply = `Here's a draft:\n\nSubject: Quick check-in on your AutoPilot CRM trial\n\nHi ${lead?.name?.split(' ')[0] || 'there'},\n\nI wanted to follow up on our last conversation. Have you had a chance to review the proposal?\n\nI'd love to schedule 20 minutes to walk through any questions and discuss implementation.\n\nAre you free Thursday?\n\nBest,\nSarah`;
      } else if (msg.includes('next step') || msg.includes('best')) {
        reply = `Best next step for ${lead?.name || 'this lead'}:\n\n1. **Call today** — They've been waiting 2 days\n2. Address pricing concern — They paused on the Enterprise tier\n3. Send ROI calculator showing 6-month payback period\n\nAI estimates 73% close probability if contacted within 24 hours.`;
      } else {
        reply = `Based on your CRM data, here's my analysis:\n\nYour top 3 priorities for today:\n1. Call Tariq Mehmood ($88K — urgent)\n2. Follow up with Zara Malik (proposal pending)\n3. Schedule demo with Bilal Ahmed\n\nTotal potential revenue today: $197K`;
      }
      setMessages(p => [...p, { role: 'ai', content: reply }]);
      setLoading(false);
    }, 800);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--slate-50)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--gradient-navy)',
        padding: '16px 20px',
        color: 'white',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button onClick={onBack} style={{
          border: 'none', background: 'rgba(255,255,255,0.15)', color: 'white',
          borderRadius: 8, padding: '6px 10px', fontSize: 13,
          cursor: 'pointer',
        }}>←</button>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'var(--gradient-emerald)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, boxShadow: '0 0 0 3px rgba(16,185,129,0.3)',
        }}>✦</div>
        <div>
          <div style={{ font: 'var(--weight-bold) 15px/1 var(--font-display)' }}>AI Copilot</div>
          <div style={{ fontSize: 11, opacity: 0.65, marginTop: 2 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34D399', display: 'inline-block' }} />
              Online · Context loaded
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: msg.role === 'ai' ? 'row' : 'row-reverse', gap: 8, alignItems: 'flex-start' }}>
            {msg.role === 'ai' && (
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--gradient-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, flexShrink: 0 }}>✦</div>
            )}
            <div style={{
              maxWidth: '78%',
              background: msg.role === 'ai' ? 'var(--white)' : 'var(--navy-900)',
              border: msg.role === 'ai' ? '1px solid var(--border-soft)' : 'none',
              borderRadius: 12,
              padding: '10px 13px',
              boxShadow: msg.role === 'ai' ? 'var(--shadow-xs)' : 'none',
              font: '13px/1.55 var(--font-body)',
              color: msg.role === 'ai' ? 'var(--text-body)' : 'white',
              whiteSpace: 'pre-wrap',
            }}
              dangerouslySetInnerHTML={msg.role === 'ai' ? {
                __html: msg.content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
              } : undefined}
            >
              {msg.role !== 'ai' ? msg.content : undefined}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--gradient-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13 }}>✦</div>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 12, padding: '12px 16px', display: 'flex', gap: 4 }}>
              {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald-400)', animation: `pulse 1.2s ${i*0.2}s infinite` }} />)}
            </div>
          </div>
        )}
      </div>

      {/* Quick asks */}
      <div style={{ padding: '8px 14px', display: 'flex', gap: 6, overflowX: 'auto', borderTop: '1px solid var(--border-soft)', background: 'var(--white)' }}>
        {quickAsks.map(q => (
          <button key={q} onClick={() => send(q)} style={{
            padding: '6px 12px', borderRadius: 999,
            border: '1px solid var(--border-soft)',
            background: 'var(--slate-50)', color: 'var(--text-body)',
            fontSize: 12, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
          }}>{q}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '10px 14px', background: 'var(--white)', display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask anything..."
          style={{
            flex: 1, height: 42,
            border: '1px solid var(--border-strong)', borderRadius: 10,
            padding: '0 14px', outline: 'none',
            font: '14px/1 var(--font-body)', color: 'var(--text-strong)',
            background: 'var(--slate-50)',
          }}
        />
        <button onClick={() => send()} disabled={!input.trim() || loading} style={{
          width: 42, height: 42, borderRadius: 10,
          background: 'var(--gradient-emerald)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: !input.trim() || loading ? 0.5 : 1,
          flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// ---- Mobile Bottom Nav ----
function BottomNav({ screen, onNavigate }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: '⊞' },
    { id: 'leads', label: 'Leads', icon: '👥' },
    { id: 'copilot', label: 'AI', icon: '✦' },
  ];
  return (
    <div style={{
      display: 'flex',
      borderTop: '1px solid var(--border-soft)',
      background: 'var(--white)',
      flexShrink: 0,
    }}>
      {tabs.map(t => {
        const on = screen === t.id || (screen === 'leadDetail' && t.id === 'leads') || (screen === 'mobileCopilot' && t.id === 'copilot');
        return (
          <button key={t.id} onClick={() => onNavigate(t.id)} style={{
            flex: 1, padding: '10px 8px 14px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            border: 'none', background: 'transparent', cursor: 'pointer',
            color: on ? 'var(--emerald-600)' : 'var(--text-muted)',
            font: `var(--weight-${on ? 'bold' : 'medium'}) 11px/1 var(--font-display)`,
          }}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

// ---- Main Mobile App ----
export function MobileApp() {
  const [screen, setScreen] = useState('home');
  const [selectedLead, setSelectedLead] = useState(null);

  function handleSelectLead(lead) {
    setSelectedLead(lead);
    setScreen('leadDetail');
  }

  function handleNav(id) {
    if (id === 'home') setScreen('home');
    else if (id === 'leads') setScreen('home');
    else if (id === 'copilot') { setSelectedLead(null); setScreen('mobileCopilot'); }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      background: 'var(--slate-50)',
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {screen === 'home' && (
          <HomeScreen
            onSelectLead={handleSelectLead}
            onCopilot={() => { setSelectedLead(null); setScreen('mobileCopilot'); }}
          />
        )}
        {screen === 'leadDetail' && selectedLead && (
          <LeadDetailScreen
            lead={selectedLead}
            onBack={() => setScreen('home')}
            onCopilot={() => setScreen('mobileCopilot')}
          />
        )}
        {screen === 'mobileCopilot' && (
          <MobileCopilotScreen
            lead={selectedLead}
            onBack={() => setScreen(selectedLead ? 'leadDetail' : 'home')}
          />
        )}
      </div>
      <BottomNav screen={screen} onNavigate={handleNav} />
    </div>
  );
}
