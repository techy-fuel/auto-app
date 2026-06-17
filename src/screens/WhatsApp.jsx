import React, { useState, useEffect } from 'react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/core/Badge';
import { Avatar } from '../components/core/Avatar';
import { AiInsight } from '../components/data/AiInsight';
import { supabase } from '../lib/supabase';


const templates = [
  { label: 'Welcome Message', text: 'Welcome! Thank you for your interest. How can I assist you today?' },
  { label: 'Test Drive Invite', text: 'We\'d love to invite you for a test drive! When would you be available this week?' },
  { label: 'Follow Up',        text: 'Just checking in — have you had a chance to consider our offer? Happy to answer any questions!' },
  { label: 'Special Offer',    text: '🎉 Exclusive offer for you: 0% down payment + free insurance for 1 year on select models. Valid this week only!' },
];

const statusBadge = { hot: 'red', warm: 'amber', cold: 'blue' };

export function WhatsApp({ user }) {
  const [conversations, setConversations] = useState([]);
  const [active, setActive] = useState(null);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    supabase.from('leads').select('id, name, phone, status, stage, notes').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10)
      .then(({ data }) => {
        const mapped = (data || []).map((l, i) => ({
          id: l.id,
          name: l.name,
          phone: l.phone || '—',
          lastMsg: l.notes || 'Interested in a vehicle',
          time: i === 0 ? 'Just now' : `${i + 1}h ago`,
          unread: i < 2 ? 2 - i : 0,
          status: l.stage === 'Negotiation' ? 'hot' : l.stage === 'Proposal' ? 'warm' : 'cold',
          vehicle: '—',
        }));
        setConversations(mapped);
        if (mapped.length) setActive(mapped[0]);
      });
  }, [user?.id]);

  function send(text) {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setMsgs(p => [...p, { role: 'agent', text: msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
  }

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

      {/* Sidebar — Conversations */}
      <div style={{ width: 300, borderRight: '1px solid var(--border-soft)', background: 'var(--white)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--border-soft)' }}>
          <div style={{ font: 'var(--weight-bold) 15px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 10 }}>WhatsApp Inbox</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--slate-50)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-md)', padding: '0 12px', height: 36 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--slate-400)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search conversations..." style={{ border: 'none', outline: 'none', background: 'transparent', font: '13px/1 var(--font-body)', color: 'var(--text-body)', flex: 1 }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {conversations.length === 0 && (
            <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', font: '13px/1.5 var(--font-body)' }}>
              No leads yet.<br/>Add leads to see them here.
            </div>
          )}
          {conversations.map(c => (
            <div key={c.id} onClick={() => setActive(c)} style={{
              display: 'flex', gap: 10, padding: '12px 16px',
              cursor: 'pointer', borderBottom: '1px solid var(--divider)',
              background: active.id === c.id ? 'var(--emerald-50)' : 'transparent',
              borderLeft: active.id === c.id ? '3px solid var(--emerald-500)' : '3px solid transparent',
            }}>
              <Avatar name={c.name} size={38} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ font: 'var(--weight-semibold) 13px/1 var(--font-body)', color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 }}>{c.name}</span>
                  <span style={{ font: '11px/1 var(--font-body)', color: 'var(--text-subtle)', flexShrink: 0 }}>{c.time}</span>
                </div>
                <div style={{ font: '12px/1.3 var(--font-body)', color: 'var(--text-muted)', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.lastMsg}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                  <Badge tone={statusBadge[c.status]} size="sm" dot>{c.status.charAt(0).toUpperCase() + c.status.slice(1)}</Badge>
                  {c.unread > 0 && <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--emerald-500)', color: 'white', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {!active && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', font: '14px/1 var(--font-body)' }}>
            Select a conversation to start chatting
          </div>
        )}
        {active && <>
        {/* Chat header */}
        <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--border-soft)', background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name={active.name} size={38} status="online" />
            <div>
              <div style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)' }}>{active.name}</div>
              <div style={{ font: '12px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 2 }}>{active.phone} · Interested in: {active.vehicle}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button size="sm" variant="secondary">View Lead</Button>
            <Button size="sm" variant="accent">Book Test Drive</Button>
          </div>
        </div>

        {/* AI suggestion */}
        <div style={{ padding: 'var(--space-3) var(--space-5)', borderBottom: '1px solid var(--border-soft)', background: 'var(--emerald-50)' }}>
          <AiInsight title="AI Suggestion" tone="action" style={{ fontSize: 12 }}>
            Ahmed has asked about the Land Cruiser 3 times. AI recommends offering a VIP test drive slot today to accelerate the close.
          </AiInsight>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--slate-50)' }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: m.role === 'customer' ? 'row' : 'row-reverse', alignItems: 'flex-end', gap: 8 }}>
              {m.role === 'customer' && <Avatar name={active.name} size={28} />}
              <div style={{
                maxWidth: '65%',
                background: m.role === 'customer' ? 'var(--white)' : 'var(--emerald-600)',
                color: m.role === 'customer' ? 'var(--text-body)' : 'white',
                borderRadius: m.role === 'customer' ? '12px 12px 12px 2px' : '12px 12px 2px 12px',
                padding: '10px 14px',
                boxShadow: 'var(--shadow-xs)',
              }}>
                <p style={{ font: '13px/1.5 var(--font-body)', margin: 0 }}>{m.text}</p>
                <div style={{ font: '10px/1 var(--font-body)', opacity: 0.6, marginTop: 4, textAlign: 'right' }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Templates */}
        <div style={{ padding: 'var(--space-3) var(--space-5)', borderTop: '1px solid var(--border-soft)', background: 'var(--white)', display: 'flex', gap: 6, overflowX: 'auto' }}>
          {templates.map(t => (
            <button key={t.label} onClick={() => send(t.text)} style={{
              padding: '5px 12px', borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-soft)',
              background: 'var(--white)', color: 'var(--text-body)',
              font: '11px/1 var(--font-body)', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
            }}>{t.label}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: 'var(--space-3) var(--space-5)', borderTop: '1px solid var(--border-soft)', background: 'var(--white)', display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--slate-50)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', padding: '0 14px', height: 44 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message..." style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', font: '14px/1 var(--font-body)', color: 'var(--text-strong)' }} />
          </div>
          <Button variant="accent" onClick={() => send()} disabled={!input.trim()} style={{ height: 44, width: 44, padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </Button>
        </div>
        </>}
      </div>

      {/* Right panel */}
      <div style={{ width: 260, borderLeft: '1px solid var(--border-soft)', background: 'var(--white)', padding: 'var(--space-5)', overflowY: 'auto' }}>
        <h3 style={{ font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-4)' }}>Lead Info</h3>
        {active ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Status', value: <Badge tone={active.status === 'hot' ? 'red' : active.status === 'warm' ? 'amber' : 'blue'} dot>{active.status}</Badge> },
                { label: 'Phone', value: active.phone },
                { label: 'Last Message', value: active.lastMsg },
              ].map(f => (
                <div key={f.label} style={{ borderBottom: '1px solid var(--divider)', paddingBottom: 10 }}>
                  <div style={{ font: '11px/1 var(--font-body)', color: 'var(--text-muted)', marginBottom: 4 }}>{f.label}</div>
                  <div style={{ font: 'var(--weight-medium) 13px/1 var(--font-body)', color: 'var(--text-strong)' }}>{f.value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 'var(--space-5)' }}>
              <Button fullWidth variant="primary" size="sm">View Lead</Button>
            </div>
          </>
        ) : (
          <div style={{ color: 'var(--text-muted)', font: '13px/1.5 var(--font-body)' }}>Select a conversation to see lead details.</div>
        )}
      </div>
    </div>
  );
}
