import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export function AuthModal({ mode: initialMode = 'signin', onClose, onAuth }) {
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  async function handleSignIn(e) {
    e.preventDefault();
    setLoading(true); setError('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) { setError(error.message); setLoading(false); return; }
    onAuth(data.user);
    onClose();
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true); setError('');
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.name } },
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setMessage('Account bana diya! Email check karo verification ke liye.');
    setLoading(false);
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
  }

  const inp = {
    width: '100%', padding: '11px 14px', borderRadius: 10,
    border: '1.5px solid #E2E8F0', font: '14px/1 Inter, sans-serif',
    color: '#0F172A', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'relative', background: 'white', borderRadius: 20, width: 420, padding: '36px 40px', boxShadow: '0 24px 64px rgba(0,0,0,0.18)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: 8, border: 'none', background: '#F1F5F9', cursor: 'pointer', fontSize: 18, color: '#64748B' }}>×</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#059669,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 18 }}>✦</div>
          <span style={{ font: '700 17px/1 Inter, sans-serif', color: '#0F172A' }}>AutoPilot CRM</span>
        </div>

        <h2 style={{ font: '700 22px/1.2 Inter, sans-serif', color: '#0F172A', marginBottom: 6 }}>
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p style={{ font: '14px/1 Inter, sans-serif', color: '#64748B', marginBottom: 24 }}>
          {mode === 'signin' ? 'Sign in to your dealership CRM' : 'Start your 14-day free trial'}
        </p>

        {message ? (
          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 10, padding: '14px 16px', color: '#065F46', font: '14px/1.5 Inter, sans-serif' }}>
            ✅ {message}
          </div>
        ) : (
          <>
            <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {mode === 'signup' && (
                <div>
                  <label style={{ font: '600 12px/1 Inter, sans-serif', color: '#374151', display: 'block', marginBottom: 6 }}>Full Name</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ahmad Al Mansouri" style={inp} />
                </div>
              )}
              <div>
                <label style={{ font: '600 12px/1 Inter, sans-serif', color: '#374151', display: 'block', marginBottom: 6 }}>Email address</label>
                <input type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@dealership.com" style={inp} />
              </div>
              <div>
                <label style={{ font: '600 12px/1 Inter, sans-serif', color: '#374151', display: 'block', marginBottom: 6 }}>Password</label>
                <input type="password" required value={form.password} onChange={e => set('password', e.target.value)} placeholder="••••••••" style={inp} />
              </div>

              {error && <p style={{ color: '#EF4444', font: '13px/1.4 Inter, sans-serif', margin: 0 }}>{error}</p>}

              <button type="submit" disabled={loading} style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', background: loading ? '#A7F3D0' : 'linear-gradient(135deg,#059669,#10B981)', color: 'white', font: '600 15px/1 Inter, sans-serif', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}>
                {loading ? '...' : mode === 'signin' ? 'Sign In →' : 'Create Account →'}
              </button>
            </form>

            <p style={{ font: '13px/1 Inter, sans-serif', color: '#64748B', textAlign: 'center', marginTop: 20 }}>
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}
                style={{ border: 'none', background: 'none', color: '#059669', font: '600 13px/1 Inter, sans-serif', cursor: 'pointer', padding: 0 }}>
                {mode === 'signin' ? 'Sign up free' : 'Sign in'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
