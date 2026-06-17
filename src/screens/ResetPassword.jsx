import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function ResetPassword({ onDone }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase sets the session from the URL hash automatically on SIGNED_IN event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true); setError('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setError(error.message); setLoading(false); return; }
    setSuccess(true);
    setLoading(false);
    setTimeout(() => onDone?.(), 2000);
  }

  const inp = {
    width: '100%', padding: '11px 14px', borderRadius: 10,
    border: '1.5px solid #E2E8F0', font: '14px/1 Inter, sans-serif',
    color: '#0F172A', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
      <div style={{ background: 'white', borderRadius: 20, width: 420, padding: '36px 40px', boxShadow: '0 24px 64px rgba(0,0,0,0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#059669,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 18 }}>✦</div>
          <span style={{ font: '700 17px/1 Inter, sans-serif', color: '#0F172A' }}>AutoPilot CRM</span>
        </div>

        <h2 style={{ font: '700 22px/1.2 Inter, sans-serif', color: '#0F172A', marginBottom: 6 }}>Set new password</h2>
        <p style={{ font: '14px/1 Inter, sans-serif', color: '#64748B', marginBottom: 24 }}>Choose a strong password for your account</p>

        {success ? (
          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 10, padding: '14px 16px', color: '#065F46', font: '14px/1.5 Inter, sans-serif' }}>
            ✅ Password updated! Redirecting to your dashboard...
          </div>
        ) : !ready ? (
          <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 10, padding: '14px 16px', color: '#92400E', font: '14px/1.5 Inter, sans-serif' }}>
            ⏳ Verifying reset link... If this takes too long, please request a new reset email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ font: '600 12px/1 Inter, sans-serif', color: '#374151', display: 'block', marginBottom: 6 }}>New Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inp} />
            </div>
            <div>
              <label style={{ font: '600 12px/1 Inter, sans-serif', color: '#374151', display: 'block', marginBottom: 6 }}>Confirm Password</label>
              <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" style={inp} />
            </div>
            {error && <p style={{ color: '#EF4444', font: '13px/1.4 Inter, sans-serif', margin: 0 }}>{error}</p>}
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', background: loading ? '#A7F3D0' : 'linear-gradient(135deg,#059669,#10B981)', color: 'white', font: '600 15px/1 Inter, sans-serif', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}>
              {loading ? '...' : 'Update Password →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
