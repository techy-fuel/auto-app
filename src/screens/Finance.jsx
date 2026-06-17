import React, { useState, useEffect } from 'react';
import { Button } from '../components/core/Button';
import { Badge } from '../components/core/Badge';
import { StatCard } from '../components/data/StatCard';
import { Tabs } from '../components/navigation/Tabs';
import { AiInsight } from '../components/data/AiInsight';
import { supabase } from '../lib/supabase';

const BANKS = ['Emirates NBD', 'ADCB', 'FAB', 'Mashreq', 'DIB'];
const STATUSES = ['Approved', 'Pending', 'Under Review', 'Rejected'];

const banks = [
  { name: 'Emirates NBD', rate: '2.49%', maxTenure: '60m', maxFinance: '500K', status: 'active' },
  { name: 'ADCB',         rate: '2.59%', maxTenure: '48m', maxFinance: '400K', status: 'active' },
  { name: 'FAB',          rate: '2.39%', maxTenure: '60m', maxFinance: '600K', status: 'active' },
  { name: 'Mashreq Bank', rate: '2.69%', maxTenure: '48m', maxFinance: '350K', status: 'active' },
  { name: 'DIB',          rate: '2.45%', maxTenure: '60m', maxFinance: '450K', status: 'inactive' },
];

const statusTone = { Approved: 'emerald', Pending: 'amber', Rejected: 'red', 'Under Review': 'blue' };
const tabs = [
  { value: 'applications', label: 'Applications', count: applications.length },
  { value: 'banks', label: 'Bank Partners', count: banks.length },
  { value: 'calculator', label: 'EMI Calculator' },
];

function EmiCalculator() {
  const [price, setPrice] = useState(185000);
  const [down, setDown] = useState(37000);
  const [tenure, setTenure] = useState(48);
  const [rate, setRate] = useState(2.49);

  const loan = price - down;
  const monthly = loan > 0
    ? (loan * (rate / 100 / 12)) / (1 - Math.pow(1 + rate / 100 / 12, -tenure))
    : 0;
  const total = monthly * tenure;
  const interest = total - loan;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 'var(--space-6)' }}>
      <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
        <h3 style={{ font: 'var(--weight-bold) 16px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-6)' }}>EMI Calculator</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          {[
            { label: 'Vehicle Price (AED)', value: price, setter: setPrice },
            { label: 'Down Payment (AED)', value: down, setter: setDown },
            { label: 'Tenure (months)', value: tenure, setter: setTenure },
            { label: 'Interest Rate (%)', value: rate, setter: setRate },
          ].map(f => (
            <label key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ font: 'var(--weight-semibold) 13px/1 var(--font-display)', color: 'var(--text-body)' }}>{f.label}</span>
              <input type="number" value={f.value} onChange={e => f.setter(Number(e.target.value))} style={{
                height: 44, border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)',
                padding: '0 14px', font: '14px/1 var(--font-body)', color: 'var(--text-strong)',
                outline: 'none',
              }} />
            </label>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-6)', background: 'var(--gradient-navy)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)', color: 'white' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 6 }}>Monthly EMI</div>
              <div style={{ font: 'var(--weight-extra) 28px/1 var(--font-display)', color: 'var(--emerald-400)' }}>AED {Math.round(monthly).toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 6 }}>Total Amount</div>
              <div style={{ font: 'var(--weight-bold) 22px/1 var(--font-display)' }}>AED {Math.round(total).toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 6 }}>Total Interest</div>
              <div style={{ font: 'var(--weight-bold) 22px/1 var(--font-display)', color: '#FCA5A5' }}>AED {Math.round(interest).toLocaleString()}</div>
            </div>
          </div>
        </div>
        <Button fullWidth variant="accent" style={{ marginTop: 'var(--space-4)' }}>Share with Customer via WhatsApp</Button>
      </div>
    </div>
  );
}

export function Finance({ user }) {
  const [tab, setTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    supabase.from('leads').select('id, name, value, stage, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20)
      .then(({ data }) => {
        setApplications((data || []).map((l, i) => ({
          id: `FIN-${String(i + 1).padStart(3, '0')}`,
          customer: l.name,
          vehicle: '—',
          amount: l.value || 0,
          down: Math.round((l.value || 0) * 0.2),
          monthly: Math.round(((l.value || 0) * 0.8 * (2.49 / 100 / 12)) / (1 - Math.pow(1 + 2.49 / 100 / 12, -48))),
          tenure: '48 months',
          bank: BANKS[i % BANKS.length],
          status: STATUSES[i % STATUSES.length],
          date: new Date(l.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        })));
        setLoading(false);
      });
  }, [user?.id]);

  const approved = applications.filter(a => a.status === 'Approved').length;
  const totalFinanced = applications.filter(a => a.status === 'Approved').reduce((s, a) => s + a.amount, 0);

  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', height: '100%', overflow: 'auto' }}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        <StatCard label="Total Applications" value={applications.length} accent="navy" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>} />
        <StatCard label="Approved" value={approved} delta={`${Math.round(approved/applications.length*100)}% rate`} trend="up" accent="emerald" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>} />
        <StatCard label="Total Financed" value={`AED ${(totalFinanced/1000).toFixed(0)}K`} delta="+22%" trend="up" accent="blue" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>} />
        <StatCard label="Bank Partners" value={banks.filter(b=>b.status==='active').length} accent="violet" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>} />
      </div>

      <AiInsight title="Finance AI" tone="opportunity">
        FAB bank currently offers the lowest rate (2.39%). Applying Sara Mohammed's application through FAB instead of ADCB saves her AED 2,400 over 48 months — recommend switching.
      </AiInsight>

      {/* Table */}
      <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', overflow: 'hidden', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-soft)' }}>
          <Tabs tabs={tabs} value={tab} onChange={setTab} />
          {tab === 'applications' && <Button size="sm" variant="accent" iconLeft={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}>New Application</Button>}
        </div>

        {tab === 'applications' && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--slate-50)' }}>
                {['ID', 'Customer', 'Vehicle', 'Loan Amt', 'Monthly', 'Bank', 'Status', 'Date', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-soft)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.map(a => (
                <tr key={a.id} style={{ borderBottom: '1px solid var(--divider)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '13px 16px', font: 'var(--type-mono)', color: 'var(--text-muted)', fontSize: 12 }}>{a.id}</td>
                  <td style={{ padding: '13px 16px', font: 'var(--weight-semibold) 13px/1 var(--font-body)', color: 'var(--text-strong)' }}>{a.customer}</td>
                  <td style={{ padding: '13px 16px', font: '12px/1 var(--font-body)', color: 'var(--text-muted)' }}>{a.vehicle}</td>
                  <td style={{ padding: '13px 16px', font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-strong)' }}>AED {a.amount.toLocaleString()}</td>
                  <td style={{ padding: '13px 16px', font: 'var(--weight-semibold) 13px/1 var(--font-display)', color: 'var(--emerald-700)' }}>AED {a.monthly.toLocaleString()}/mo</td>
                  <td style={{ padding: '13px 16px', font: '12px/1 var(--font-body)', color: 'var(--text-body)' }}>{a.bank}</td>
                  <td style={{ padding: '13px 16px' }}><Badge tone={statusTone[a.status] || 'slate'} dot>{a.status}</Badge></td>
                  <td style={{ padding: '13px 16px', font: '12px/1 var(--font-body)', color: 'var(--text-muted)' }}>{a.date}</td>
                  <td style={{ padding: '13px 16px' }}><button style={{ padding: '4px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-soft)', background: 'var(--white)', font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--text-body)', cursor: 'pointer' }}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'banks' && (
          <div style={{ padding: 'var(--space-6)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
              {banks.map(b => (
                <div key={b.name} style={{ background: b.status === 'active' ? 'var(--white)' : 'var(--slate-50)', border: `1px solid ${b.status === 'active' ? 'var(--border-soft)' : 'var(--border-soft)'}`, borderRadius: 'var(--radius-md)', padding: 'var(--space-5)', boxShadow: b.status === 'active' ? 'var(--shadow-card)' : 'none', opacity: b.status === 'active' ? 1 : 0.6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)' }}>{b.name}</div>
                    <Badge tone={b.status === 'active' ? 'emerald' : 'slate'} dot>{b.status}</Badge>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center' }}>
                    {[{ l: 'Rate', v: b.rate }, { l: 'Tenure', v: b.maxTenure }, { l: 'Max Finance', v: `AED ${b.maxFinance}` }].map(f => (
                      <div key={f.l} style={{ background: 'var(--slate-50)', borderRadius: 8, padding: 8 }}>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>{f.l}</div>
                        <div style={{ font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-strong)' }}>{f.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'calculator' && <EmiCalculator />}
      </div>
    </div>
  );
}
