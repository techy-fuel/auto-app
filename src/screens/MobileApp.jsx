import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';

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
  Proposal:    { bg: '#EDE9FE', fg: '#7C3AED' },
  Qualified:   { bg: '#D1FAE5', fg: '#059669' },
  New:         { bg: '#DBEAFE', fg: '#2563EB' },
  Won:         { bg: '#D1FAE5', fg: '#059669' },
};

function initials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

// ---- Screen: Home ----
function HomeScreen({ leads, loading, onSelectLead, onCopilot, user }) {
  const hotLeads = leads.filter(l => (l.score || 0) >= 70).slice(0, 3);
  const displayName = user?.firstName || 'Sales Rep';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', background: 'var(--slate-50)' }}>
      <div style={{ background: 'var(--gradient-navy)', padding: '20px 20px 28px', color: 'var(--white)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 4 }}>Good morning 👋</div>
            <div style={{ font: 'var(--weight-bold) 18px/1 var(--font-display)' }}>{displayName}</div>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--emerald-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: 'var(--weight-bold) 14px/1 var(--font-display)' }}>
            {initials(user?.firstName + ' ' + (user?.lastName || ''))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { label: 'Leads', value: leads.length },
            { label: 'Hot', value: hotLeads.length },
            { label: 'Won', value: leads.filter(l => l.status === 'Won').length },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ font: 'var(--weight-bold) 18px/1 var(--font-display)', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 11, opacity: 0.6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, white 100%)', border: '1px solid var(--emerald-100)', borderRadius: 14, padding: 14, display: 'flex', gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: 'var(--gradient-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16, fontWeight: 700 }}>✦</div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--emerald-700)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>AI INSIGHT</div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-body)' }}>
              {hotLeads.length > 0
                ? `${hotLeads[0].name} (score ${hotLeads[0].score}) is your hottest lead. Follow up today for best results.`
                : leads.length > 0 ? `You have ${leads.length} leads. Focus on moving them to Qualified stage.` : 'Add your first leads to get AI insights.'}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)' }}>Hot Leads</div>
          <div style={{ fontSize: 12, color: 'var(--emerald-700)', fontWeight: 600 }}>See all →</div>
        </div>
        {loading ? (
          <div style={{ fontSize: 13, color: 'var(--text-muted)', padding: '16px 0' }}>Loading leads...</div>
        ) : hotLeads.length === 0 ? (
          <div style={{ fontSize: 13, color: 'var(--text-muted)', padding: '16px 0' }}>No hot leads yet. Add leads with score 70+ to see them here.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {hotLeads.map((lead, i) => {
              const temp = tempFor(lead.score || 50);
              const t = tempColors[temp];
              return (
                <div key={lead.id} onClick={() => onSelectLead(lead)} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 12, padding: '12px 14px', boxShadow: 'var(--shadow-xs)', cursor: 'pointer' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, background: avatarColors[i % avatarColors.length], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 700 }}>
                    {initials(lead.name)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{lead.company}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-strong)' }}>
                      {lead.value ? `AED ${Math.round(lead.value / 1000)}K` : '—'}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 3, padding: '2px 7px', borderRadius: 999, background: t.bg, color: t.fg, fontSize: 10, fontWeight: 700 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.fg }} />
                      {temp.charAt(0).toUpperCase() + temp.slice(1)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Screen: Lead Detail ----
function LeadDetailScreen({ lead, onBack, onCopilot }) {
  const temp = tempFor(lead.score || 50);
  const t = tempColors[temp];
  const sc = statusColors[lead.status] || { bg: 'var(--slate-100)', fg: 'var(--text-muted)' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--slate-50)' }}>
      <div style={{ background: 'var(--gradient-navy)', padding: '16px 20px 24px', color: 'white' }}>
        <button onClick={onBack} style={{ border: 'none', background: 'rgba(255,255,255,0.15)', color: 'white', borderRadius: 8, padding: '6px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}>← Back</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--emerald-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: 'var(--weight-bold) 18px/1 var(--font-display)', border: '2px solid rgba(255,255,255,0.2)' }}>
            {initials(lead.name)}
          </div>
          <div>
            <div style={{ font: 'var(--weight-bold) 18px/1 var(--font-display)', marginBottom: 4 }}>{lead.name}</div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>{lead.company}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
            <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 4 }}>Deal Value</div>
            <div style={{ font: 'var(--weight-bold) 20px/1 var(--font-display)' }}>
              {lead.value ? `AED ${Number(lead.value).toLocaleString()}` : '—'}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
            <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 4 }}>AI Score</div>
            <div style={{ font: 'var(--weight-bold) 20px/1 var(--font-display)', color: (lead.score || 0) >= 80 ? '#34D399' : 'white' }}>{lead.score || 50}/100</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{ padding: '4px 12px', borderRadius: 999, background: sc.bg, color: sc.fg, fontSize: 12, fontWeight: 700 }}>{lead.status || 'New'}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px', borderRadius: 999, background: t.bg, color: t.fg, fontSize: 12, fontWeight: 700 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.fg }} />
            {temp.charAt(0).toUpperCase() + temp.slice(1)} Lead
          </span>
        </div>

        <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, white 100%)', border: '1px solid var(--emerald-100)', borderRadius: 14, padding: 14, marginBottom: 16, display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 20 }}>✦</span>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--emerald-700)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>AI Recommendation</div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-body)' }}>
              {(lead.score || 50) >= 80
                ? `${lead.name} has a ${lead.score}% close probability. Schedule a closing call this week.`
                : `Engagement is building. Send a value-add message to move ${lead.name} to the next stage.`}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
          {[{ icon: '📞', label: 'Call' }, { icon: '✉️', label: 'Email' }, { icon: '📅', label: 'Schedule' }].map(a => (
            <button key={a.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '14px 8px', background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 12, cursor: 'pointer', font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-body)', boxShadow: 'var(--shadow-xs)' }}>
              <span style={{ fontSize: 22 }}>{a.icon}</span>{a.label}
            </button>
          ))}
        </div>

        <button onClick={onCopilot} style={{ width: '100%', padding: 13, background: 'var(--gradient-emerald)', border: 'none', borderRadius: 12, color: 'white', font: 'var(--weight-bold) 14px/1 var(--font-display)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(16,185,129,0.35)' }}>
          <span>✦</span> Ask AI about this lead
        </button>

        {lead.email && <div style={{ marginTop: 16, padding: 14, background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', color: 'var(--text-body)' }}>📧 {lead.email}</div>}
        {lead.phone && <div style={{ marginTop: 8, padding: 14, background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', color: 'var(--text-body)' }}>📱 {lead.phone}</div>}
      </div>
    </div>
  );
}

// ---- Screen: Mobile Copilot ----
function MobileCopilotScreen({ lead, onBack }) {
  const [messages, setMessages] = useState([{
    role: 'ai',
    content: lead
      ? `I can see you're looking at ${lead.name} from ${lead.company}. Deal value: ${lead.value ? `AED ${Number(lead.value).toLocaleString()}` : '—'}, AI score: ${lead.score || 50}/100. What would you like to know?`
      : "Hi! I'm your AI Copilot. Ask me anything about your leads, pipeline, or what to do next.",
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickAsks = lead
    ? ['What\'s their close probability?', 'Draft a follow-up message', 'Best next step?']
    : ['Which leads to call today?', 'Pipeline summary', 'Today\'s priorities'];

  function send(text) {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setMessages(p => [...p, { role: 'user', content: msg }]);
    setLoading(true);
    setTimeout(() => {
      let reply = '';
      if (msg.includes('close') || msg.includes('probability')) {
        reply = `Based on ${lead?.name || 'this lead'}'s profile, close probability is **${lead?.score || 75}%**.\n\nKey signals:\n• Score: ${lead?.score || 75}/100\n• Status: ${lead?.status || 'Active'}\n\nRecommendation: Schedule a closing call this week.`;
      } else if (msg.includes('email') || msg.includes('message') || msg.includes('draft')) {
        reply = `Here's a draft WhatsApp message:\n\nHi ${lead?.name?.split(' ')[0] || 'there'} 👋\n\nJust checking in on your interest in the vehicle we discussed. We have a few similar models available this week.\n\nWould you like to schedule a test drive?\n\nBest regards`;
      } else if (msg.includes('next step') || msg.includes('best')) {
        reply = `Best next step for ${lead?.name || 'this lead'}:\n\n1. **Call today** if score is 80+\n2. Send WhatsApp with vehicle photos\n3. Invite for test drive\n\nAI estimates higher close rate within 24h contact.`;
      } else {
        reply = `Based on your CRM data:\n\nTop priorities for today:\n1. Follow up with high-score leads (70+)\n2. Move Qualified leads to Proposal\n3. Schedule test drives for hot prospects\n\nFocus on speed — leads contacted within 1 hour convert 7× better.`;
      }
      setMessages(p => [...p, { role: 'ai', content: reply }]);
      setLoading(false);
    }, 800);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--slate-50)' }}>
      <div style={{ background: 'var(--gradient-navy)', padding: '16px 20px', color: 'white', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ border: 'none', background: 'rgba(255,255,255,0.15)', color: 'white', borderRadius: 8, padding: '6px 10px', fontSize: 13, cursor: 'pointer' }}>←</button>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--gradient-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 0 0 3px rgba(16,185,129,0.3)' }}>✦</div>
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

      <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: msg.role === 'ai' ? 'row' : 'row-reverse', gap: 8, alignItems: 'flex-start' }}>
            {msg.role === 'ai' && <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--gradient-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, flexShrink: 0 }}>✦</div>}
            <div style={{ maxWidth: '78%', background: msg.role === 'ai' ? 'var(--white)' : 'var(--navy-900)', border: msg.role === 'ai' ? '1px solid var(--border-soft)' : 'none', borderRadius: 12, padding: '10px 13px', font: '13px/1.55 var(--font-body)', color: msg.role === 'ai' ? 'var(--text-body)' : 'white', whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={msg.role === 'ai' ? { __html: msg.content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') } : undefined}>
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

      <div style={{ padding: '8px 14px', display: 'flex', gap: 6, overflowX: 'auto', borderTop: '1px solid var(--border-soft)', background: 'var(--white)' }}>
        {quickAsks.map(q => (
          <button key={q} onClick={() => send(q)} style={{ padding: '6px 12px', borderRadius: 999, border: '1px solid var(--border-soft)', background: 'var(--slate-50)', color: 'var(--text-body)', fontSize: 12, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>{q}</button>
        ))}
      </div>

      <div style={{ padding: '10px 14px', background: 'var(--white)', display: 'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask anything..."
          style={{ flex: 1, height: 42, border: '1px solid var(--border-strong)', borderRadius: 10, padding: '0 14px', outline: 'none', font: '14px/1 var(--font-body)', color: 'var(--text-strong)', background: 'var(--slate-50)' }} />
        <button onClick={() => send()} disabled={!input.trim() || loading} style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--gradient-emerald)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: !input.trim() || loading ? 0.5 : 1, flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

function BottomNav({ screen, onNavigate }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: '⊞' },
    { id: 'leads', label: 'Leads', icon: '👥' },
    { id: 'copilot', label: 'AI', icon: '✦' },
  ];
  return (
    <div style={{ display: 'flex', borderTop: '1px solid var(--border-soft)', background: 'var(--white)', flexShrink: 0 }}>
      {tabs.map(t => {
        const on = screen === t.id || (screen === 'leadDetail' && t.id === 'leads') || (screen === 'mobileCopilot' && t.id === 'copilot');
        return (
          <button key={t.id} onClick={() => onNavigate(t.id)} style={{ flex: 1, padding: '10px 8px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, border: 'none', background: 'transparent', cursor: 'pointer', color: on ? 'var(--emerald-600)' : 'var(--text-muted)', font: `var(--weight-${on ? 'bold' : 'medium'}) 11px/1 var(--font-display)` }}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>{t.label}
          </button>
        );
      })}
    </div>
  );
}

export function MobileApp() {
  const { user } = useUser();
  const [screen, setScreen] = useState('home');
  const [selectedLead, setSelectedLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('leads').select('*').order('score', { ascending: false }).then(({ data }) => {
      setLeads(data || []);
      setLoading(false);
    });
  }, []);

  function handleSelectLead(lead) { setSelectedLead(lead); setScreen('leadDetail'); }
  function handleNav(id) {
    if (id === 'home' || id === 'leads') setScreen('home');
    else if (id === 'copilot') { setSelectedLead(null); setScreen('mobileCopilot'); }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: 'var(--slate-50)', fontFamily: 'var(--font-body)' }}>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {screen === 'home' && <HomeScreen leads={leads} loading={loading} onSelectLead={handleSelectLead} onCopilot={() => { setSelectedLead(null); setScreen('mobileCopilot'); }} user={user} />}
        {screen === 'leadDetail' && selectedLead && <LeadDetailScreen lead={selectedLead} onBack={() => setScreen('home')} onCopilot={() => setScreen('mobileCopilot')} />}
        {screen === 'mobileCopilot' && <MobileCopilotScreen lead={selectedLead} onBack={() => setScreen(selectedLead ? 'leadDetail' : 'home')} />}
      </div>
      <BottomNav screen={screen} onNavigate={handleNav} />
    </div>
  );
}
