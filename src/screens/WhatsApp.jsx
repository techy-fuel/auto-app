import React, { useState } from 'react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/core/Badge';
import { Avatar } from '../components/core/Avatar';
import { AiInsight } from '../components/data/AiInsight';

const conversations = [
  { id: 1, name: 'Ahmed Al Rashidi', phone: '+971 50 123 4567', lastMsg: 'Can I get more info on the Land Cruiser?', time: '2m ago', unread: 3, status: 'hot', vehicle: 'Toyota Land Cruiser 2023' },
  { id: 2, name: 'Sara Mohammed',    phone: '+971 55 234 5678', lastMsg: 'What financing options do you have?', time: '15m ago', unread: 1, status: 'warm', vehicle: 'Honda Civic 2022' },
  { id: 3, name: 'Khalid Mansoor',   phone: '+971 52 345 6789', lastMsg: 'I want to book a test drive', time: '1h ago', unread: 0, status: 'hot', vehicle: 'Nissan Patrol 2023' },
  { id: 4, name: 'Fatima Al Zaabi',  phone: '+971 56 456 7890', lastMsg: 'Is the Corolla still available?', time: '3h ago', unread: 0, status: 'warm', vehicle: 'Toyota Corolla 2021' },
  { id: 5, name: 'Omar Bin Saeed',   phone: '+971 54 567 8901', lastMsg: 'Thank you, I will think about it.', time: '1d ago', unread: 0, status: 'cold', vehicle: 'Toyota Camry 2022' },
];

const chatHistory = [
  { role: 'customer', text: 'Hello, I saw your ad for Land Cruiser 2023. Can you share more details?', time: '10:02 AM' },
  { role: 'agent',    text: 'Hello Ahmed! Thank you for reaching out. The Land Cruiser 2023 is available in both petrol and diesel variants. Starting price is AED 185,000. Would you like to schedule a test drive?', time: '10:05 AM' },
  { role: 'customer', text: 'Yes I\'m interested. What colors are available?', time: '10:08 AM' },
  { role: 'agent',    text: 'We currently have Pearl White, Midnight Black, and Desert Sand. All with full warranty and free service for 3 years. Shall I reserve one for you?', time: '10:10 AM' },
  { role: 'customer', text: 'Can I get more info on the Land Cruiser?', time: '10:15 AM' },
];

const templates = [
  { label: 'Welcome Message', text: 'Welcome! Thank you for your interest. How can I assist you today?' },
  { label: 'Test Drive Invite', text: 'We\'d love to invite you for a test drive! When would you be available this week?' },
  { label: 'Follow Up',        text: 'Just checking in — have you had a chance to consider our offer? Happy to answer any questions!' },
  { label: 'Special Offer',    text: '🎉 Exclusive offer for you: 0% down payment + free insurance for 1 year on select models. Valid this week only!' },
];

const statusBadge = { hot: 'red', warm: 'amber', cold: 'blue' };

export function WhatsApp() {
  const [active, setActive] = useState(conversations[0]);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState(chatHistory);

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
      </div>

      {/* Right panel */}
      <div style={{ width: 260, borderLeft: '1px solid var(--border-soft)', background: 'var(--white)', padding: 'var(--space-5)', overflowY: 'auto' }}>
        <h3 style={{ font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-4)' }}>Lead Info</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Status', value: <Badge tone="red" dot>Hot Lead</Badge> },
            { label: 'Vehicle Interest', value: active.vehicle },
            { label: 'Phone', value: active.phone },
            { label: 'Conversations', value: '3 this week' },
            { label: 'Last Contact', value: '2 minutes ago' },
            { label: 'Assigned To', value: 'Rashid M.' },
          ].map(f => (
            <div key={f.label} style={{ borderBottom: '1px solid var(--divider)', paddingBottom: 10 }}>
              <div style={{ font: '11px/1 var(--font-body)', color: 'var(--text-muted)', marginBottom: 4 }}>{f.label}</div>
              <div style={{ font: 'var(--weight-medium) 13px/1 var(--font-body)', color: 'var(--text-strong)' }}>{f.value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-5)' }}>
          <Button fullWidth variant="primary" size="sm">Convert to Deal</Button>
        </div>
      </div>
    </div>
  );
}
