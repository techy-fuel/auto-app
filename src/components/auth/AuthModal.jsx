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
            <button onClick={handleGoogle} style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1.5px solid #E2E8F0', background: 'white', font: '600 14px/1 Inter, sans-serif', color: '#0F172A', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/><path fill="#FBBC05" d="M3.964 10.706c-.18-.54-.282-1.117-.282-1.706s.102-1.166.282-1.706V4.962H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.038l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
              Continue with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
              <span style={{ font: '12px/1 Inter, sans-serif', color: '#94A3B8' }}>or</span>
              <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
            </div>

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
