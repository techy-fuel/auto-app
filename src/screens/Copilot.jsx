import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components/core/Button';
import { AiInsight } from '../components/data/AiInsight';
import { supabase } from '../lib/supabase';

const suggestions = [
  'Which leads should I prioritize today?',
  'Draft a follow-up email for Tariq Mehmood',
  'What\'s blocking our pipeline this month?',
  'Forecast revenue for next quarter',
  'Which deals are at risk of churning?',
];

const initialMessages = [
  {
    role: 'ai',
    content: 'Hello! I\'m your AutoPilot AI Copilot. I have real-time access to your CRM data — leads, pipeline, inventory, and activity history. Ask me anything about your sales, get AI-generated emails, or request a forecast. How can I help today?',
    time: 'Just now',
  }
];

const smartReplies = {
  'which leads should i prioritize today': `Based on your CRM data, here are your **top 3 leads to contact today**:

**1. Tariq Mehmood** — Pinnacle Group ($88K)
- Score: 94/100 · Stage: Negotiation (31 days)
- ⚠️ 14 days above average — closing call needed ASAP
- Suggested action: Call today and offer final pricing proposal

**2. Zara Malik** — TechNova Pvt Ltd ($42K)
- Score: 88/100 · Stage: Proposal (12 days)
- Email opened 3× but no reply — warm follow-up recommended
- Suggested action: Personalized follow-up email today

**3. Sana Sheikh** — Growify Inc ($67K)
- Score: 91/100 · Stage: Negotiation (22 days)
- High engagement, decision pending
- Suggested action: Schedule a final presentation this week

Prioritizing these 3 could unlock **$197K** in revenue this week.`,

  'forecast revenue for next quarter': `**Q3 2026 Revenue Forecast**

Based on your current pipeline, win rate (68%), and historical patterns:

| Scenario | Forecast |
|----------|----------|
| Conservative | $480K |
| Expected | $620K |
| Optimistic | $810K |

**Key drivers:**
- Tariq Mehmood deal ($88K) — 87% close probability
- Sana Sheikh deal ($67K) — 91% close probability
- 5 new enterprise leads expected from upcoming trade show

**Risk factors:**
- 3 deals stalled in Proposal stage for 20+ days
- Q3 typically sees 15% slower velocity

I recommend accelerating your top 4 Negotiation-stage deals to hit the Expected target.`,

  'what\'s blocking our pipeline this month': `**Pipeline Bottleneck Analysis — June 2026**

Your main blockers are:

**1. Proposal Stage Stagnation (35% of pipeline)**
- Average time in Proposal: 18 days (vs 12 days target)
- 2 deals have been in Proposal for 20+ days without a response
- Recommended fix: Follow-up sequences within 48h of sending proposal

**2. Qualification Slow-Down**
- 3 leads in Qualified stage for 10+ days
- Likely cause: No clear next-step defined in the CRM
- Recommended fix: Schedule discovery calls immediately

**3. Contact Gaps**
- 5 leads haven't been contacted in 72+ hours
- Estimated value at risk: ~$95K

**Action plan:**
1. Call Tariq Mehmood today (Negotiation, 31 days)
2. Send follow-up email to Zara Malik (Proposal, no response)
3. Schedule discovery with CloudBase Solutions (Qualified, stalled)`,
};

function getAiResponse(msg) {
  const key = Object.keys(smartReplies).find(k => msg.toLowerCase().includes(k.split(' ')[0]) && msg.toLowerCase().includes(k.split(' ')[2] || k.split(' ')[1]));
  if (key) return smartReplies[key];
  if (msg.toLowerCase().includes('email') || msg.toLowerCase().includes('draft')) {
    return `**Draft Follow-up Email**\n\nSubject: Following up on our proposal — AutoPilot CRM\n\nHi [Name],\n\nI hope this week is going well for you! I wanted to follow up on the proposal I sent over last week for AutoPilot CRM.\n\nBased on your team's goals around lead conversion and pipeline visibility, I believe we can deliver significant ROI within the first 90 days — our similar clients have seen a 35% increase in close rates on average.\n\nI'd love to schedule a 20-minute call to answer any questions and discuss next steps. Are you free Thursday or Friday afternoon?\n\nLooking forward to connecting!\n\nBest regards,\n[Your Name]\n\n---\n*This email was AI-generated based on lead context from your CRM. Review before sending.*`;
  }
  return `I've analyzed your CRM data for: **"${msg}"**\n\nBased on your current pipeline of $3.8M across 247 active leads, here are my key insights:\n\n- Your top opportunity right now is the Negotiation stage with $155K at stake\n- Win rate of 68% is above industry average (52%)\n- AI recommends 3 immediate actions to accelerate deals this week\n\nWould you like me to go deeper on any specific aspect — lead prioritization, email drafts, or a revenue forecast?`;
}

function MessageBubble({ msg }) {
  const isAi = msg.role === 'ai';
  return (
    <div style={{
      display: 'flex',
      flexDirection: isAi ? 'row' : 'row-reverse',
      gap: 12,
      alignItems: 'flex-start',
    }}>
      {isAi && (
        <div style={{
          width: 34, height: 34, borderRadius: 'var(--radius-sm)',
          background: 'var(--gradient-emerald)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--white)', fontSize: 16, flexShrink: 0,
          boxShadow: '0 0 0 3px rgba(16,185,129,0.2)',
        }}>✦</div>
      )}
      <div style={{
        maxWidth: '72%',
        background: isAi ? 'var(--white)' : 'var(--navy-900)',
        border: isAi ? '1px solid var(--border-soft)' : 'none',
        borderRadius: isAi ? 'var(--radius-md)' : 'var(--radius-md)',
        padding: 'var(--space-4)',
        boxShadow: isAi ? 'var(--shadow-sm)' : 'none',
      }}>
        {isAi ? (
          <div style={{
            font: '14px/1.65 var(--font-body)',
            color: 'var(--text-body)',
            whiteSpace: 'pre-wrap',
          }}
            dangerouslySetInnerHTML={{ __html: msg.content
              .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n/g, '<br/>')
              .replace(/- (.+)/g, '• $1')
            }}
          />
        ) : (
          <p style={{ font: '14px/1.5 var(--font-body)', color: 'var(--white)', margin: 0 }}>{msg.content}</p>
        )}
        <div style={{ font: '11px/1 var(--font-body)', color: isAi ? 'var(--text-subtle)' : 'rgba(255,255,255,0.5)', marginTop: 8 }}>{msg.time}</div>
      </div>
    </div>
  );
}

export function Copilot({ user }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text) {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessages = [...messages, { role: 'user', content: msg, time: now }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ messages: newMessages.filter(m => m.role !== 'ai' || m !== initialMessages[0]).slice(-10) }),
      });
      const data = await res.json();
      const reply = data.content || data.error || 'Sorry, I could not get a response.';
      setMessages(prev => [...prev, { role: 'ai', content: reply, time: now }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: 'Connection error. Please try again.', time: now }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          padding: 'var(--space-5) var(--space-6)',
          borderBottom: '1px solid var(--border-soft)',
          background: 'var(--white)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 'var(--radius-md)',
            background: 'var(--gradient-emerald)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--white)', fontSize: 20,
            boxShadow: 'var(--glow-emerald)',
          }}>✦</div>
          <div>
            <div style={{ font: 'var(--weight-bold) 16px/1 var(--font-display)', color: 'var(--text-strong)' }}>AutoPilot AI Copilot</div>
            <div style={{ font: '12px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 3 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald-500)', display: 'inline-block' }} />
                Online · Powered by Claude
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto',
          padding: 'var(--space-6)',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
          background: 'var(--slate-50)',
        }}>
          {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
          {loading && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 34, height: 34, borderRadius: 'var(--radius-sm)',
                background: 'var(--gradient-emerald)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--white)', flexShrink: 0,
              }}>✦</div>
              <div style={{
                background: 'var(--white)', border: '1px solid var(--border-soft)',
                borderRadius: 'var(--radius-md)', padding: '14px 18px',
                display: 'flex', gap: 5, alignItems: 'center',
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: 'var(--emerald-500)',
                    animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div style={{
          padding: 'var(--space-3) var(--space-6)',
          borderTop: '1px solid var(--border-soft)',
          background: 'var(--white)',
          display: 'flex', gap: 8, overflowX: 'auto',
        }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => sendMessage(s)} style={{
              padding: '6px 14px', borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-soft)',
              background: 'var(--white)', color: 'var(--text-body)',
              font: '12px/1 var(--font-body)', cursor: 'pointer',
              whiteSpace: 'nowrap', flexShrink: 0,
              transition: 'all var(--dur-fast)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--slate-50)'; e.currentTarget.style.borderColor = 'var(--emerald-500)'; e.currentTarget.style.color = 'var(--emerald-700)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--border-soft)'; e.currentTarget.style.color = 'var(--text-body)'; }}
            >{s}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{
          padding: 'var(--space-4) var(--space-6)',
          borderTop: '1px solid var(--border-soft)',
          background: 'var(--white)',
          display: 'flex', gap: 10,
        }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--slate-50)', border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-md)', padding: '0 16px', height: 48,
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Ask me anything about your sales, leads, or pipeline..."
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                font: '14px/1 var(--font-body)', color: 'var(--text-strong)',
              }}
            />
          </div>
          <Button variant="accent" onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{ height: 48, width: 48, padding: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </Button>
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        width: 280, borderLeft: '1px solid var(--border-soft)',
        background: 'var(--white)', padding: 'var(--space-5)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
        overflowY: 'auto',
      }}>
        <div>
          <h3 style={{ font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-3)' }}>AI Capabilities</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: '📊', label: 'Revenue Forecasting' },
              { icon: '🎯', label: 'Lead Prioritization' },
              { icon: '✉️', label: 'Email Drafting' },
              { icon: '⚠️', label: 'Risk Detection' },
              { icon: '📈', label: 'Pipeline Analysis' },
              { icon: '🤝', label: 'Deal Coaching' },
            ].map(c => (
              <div key={c.label} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px',
                background: 'var(--slate-50)', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-soft)',
              }}>
                <span style={{ fontSize: 16 }}>{c.icon}</span>
                <span style={{ font: 'var(--weight-medium) 13px/1 var(--font-body)', color: 'var(--text-body)' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-3)' }}>Today's Alerts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <AiInsight title="Urgent" tone="alert" style={{ fontSize: 12 }}>
              Tariq Mehmood deal ($88K) needs attention — 31 days in Negotiation.
            </AiInsight>
            <AiInsight title="Opportunity" tone="opportunity" style={{ fontSize: 12 }}>
              Sana Sheikh (91 score) is ready to close — send final proposal now.
            </AiInsight>
          </div>
        </div>
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
