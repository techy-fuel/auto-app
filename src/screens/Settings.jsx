import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/core/Button';
import { useCurrency } from '../context/CurrencyContext';
import { CURRENCIES } from '../lib/currency';

export function Settings({ user }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const { currency, setCurrency } = useCurrency();

  async function changePassword() {
    if (!password || password.length < 6) { setErr('Password must be at least 6 characters'); return; }
    if (password !== confirm) { setErr('Passwords do not match'); return; }
    setSaving(true); setErr(''); setMsg('');
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (error) setErr(error.message);
    else { setMsg('Password updated successfully!'); setPassword(''); setConfirm(''); }
  }

  const field = (label, value, onChange, type = 'text', placeholder = '') => (
    <div>
      <label style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', color: 'var(--text-strong)', outline: 'none', boxSizing: 'border-box', background: 'var(--white)' }} />
    </div>
  );

  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: 600 }}>
      <div>
        <h2 style={{ font: 'var(--weight-bold) 18px/1 var(--font-display)', color: 'var(--text-strong)' }}>Settings</h2>
        <p style={{ font: '13px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 4 }}>Manage your account settings</p>
      </div>

      {/* Account Info */}
      <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
        <h3 style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-4)' }}>Account</h3>
        <div>
          <label style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Email</label>
          <div style={{ padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', color: 'var(--text-muted)', background: 'var(--slate-50)' }}>{user?.email}</div>
        </div>
      </div>

      {/* Currency */}
      <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
        <h3 style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 4 }}>Currency</h3>
        <p style={{ font: '12px/1.4 var(--font-body)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>All prices in the app will be shown in your selected currency.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 'var(--space-2)' }}>
          {Object.entries(CURRENCIES).map(([code, cur]) => (
            <button
              key={code}
              onClick={() => setCurrency(code)}
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: currency === code ? '2px solid var(--accent)' : '1px solid var(--border-soft)',
                background: currency === code ? 'var(--accent-pale)' : 'var(--white)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ font: 'var(--weight-bold) 13px/1 var(--font-display)', color: currency === code ? 'var(--accent)' : 'var(--text-strong)' }}>
                {cur.symbol} {code}
              </div>
              <div style={{ font: '11px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 4 }}>{cur.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Change Password */}
      <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
        <h3 style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-4)' }}>Change Password</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {field('New Password', password, setPassword, 'password', 'Enter new password')}
          {field('Confirm Password', confirm, setConfirm, 'password', 'Confirm new password')}
          {err && <p style={{ color: 'var(--red-500)', font: '12px/1 var(--font-body)', margin: 0 }}>{err}</p>}
          {msg && <p style={{ color: 'var(--emerald-600)', font: '12px/1 var(--font-body)', margin: 0 }}>{msg}</p>}
          <div>
            <Button size="sm" variant="accent" onClick={changePassword} disabled={saving}>{saving ? 'Saving...' : 'Update Password'}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
