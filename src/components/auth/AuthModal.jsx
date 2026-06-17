import React, { useState } from 'react';
import { useSignIn, useSignUp } from '@clerk/clerk-react';

export function AuthModal({ mode: initialMode = 'signin', onClose }) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup' | 'verify'
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, setActive: setActiveSignIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, setActive: setActiveSignUp, isLoaded: signUpLoaded } = useSignUp();

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  async function handleSignIn(e) {
    e.preventDefault();
    if (!signInLoaded) return;
    setLoading(true); setError('');
    try {
      const result = await signIn.create({ identifier: form.email, password: form.password });
      if (result.status === 'complete') {
        await setActiveSignIn({ session: result.createdSessionId });
        window.location.reload();
      }
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Sign in failed');
    }
    setLoading(false);
  }

  async function handleSignUp(e) {
    e.preventDefault();
    if (!signUpLoaded) return;
    setLoading(true); setError('');
    try {
      await signUp.create({ emailAddress: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setMode('verify');
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Sign up failed');
    }
    setLoading(false);
  }

  async function handleVerify(e) {
    e.preventDefault();
    if (!signUpLoaded) return;
    setLoading(true); setError('');
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === 'complete') {
        await setActiveSignUp({ session: result.createdSessionId });
        window.location.reload();
      }
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Invalid code');
    }
    setLoading(false);
  }

  async function handleGoogle() {
    if (mode === 'signup' && signUpLoaded) {
      await signUp.authenticateWithRedirect({ strategy: 'oauth_google', redirectUrl: window.location.href, redirectUrlComplete: window.location.href });
    } else if (signInLoaded) {
      await signIn.authenticateWithRedirect({ strategy: 'oauth_google', redirectUrl: window.location.href, redirectUrlComplete: window.location.href });
    }
  }

  const inp = {
    width: '100%', padding: '11px 14px', borderRadius: 10,
    border: '1.5px solid #E2E8F0', font: '14px/1 Inter, sans-serif',
    color: '#0F172A', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }} />

      <div style={{ position: 'relative', background: 'white', borderRadius: 20, width: 420, padding: '36px 40px', boxShadow: '0 24px 64px rgba(0,0,0,0.18)' }}>
        {/* Close */}
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: 8, border: 'none', background: '#F1F5F9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: 18 }}>×</button>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#059669,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 18 }}>✦</div>
          <span style={{ font: '700 17px/1 Inter, sans-serif', color: '#0F172A' }}>AutoPilot CRM</span>
        </div>

        {mode === 'verify' ? (
          <>
            <h2 style={{ font: '700 22px/1.2 Inter, sans-serif', color: '#0F172A', marginBottom: 8 }}>Check your email</h2>
            <p style={{ font: '14px/1.5 Inter, sans-serif', color: '#64748B', marginBottom: 24 }}>
              We sent a 6-digit code to <strong>{form.email}</strong>
            </p>
            <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input value={code} onChange={e => setCode(e.target.value)} placeholder="Enter 6-digit code" maxLength={6}
                style={{ ...inp, textAlign: 'center', fontSize: 22, letterSpacing: 8, fontWeight: 700 }} />
              {error && <p style={{ color: '#EF4444', font: '13px/1 Inter, sans-serif', margin: 0 }}>{error}</p>}
              <button type="submit" disabled={loading || code.length < 6} style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', background: loading ? '#A7F3D0' : 'linear-gradient(135deg,#059669,#10B981)', color: 'white', font: '600 15px/1 Inter, sans-serif', cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 style={{ font: '700 22px/1.2 Inter, sans-serif', color: '#0F172A', marginBottom: 6 }}>
              {mode === 'signin' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p style={{ font: '14px/1 Inter, sans-serif', color: '#64748B', marginBottom: 24 }}>
              {mode === 'signin' ? 'Sign in to your dealership CRM' : 'Start your 14-day free trial'}
            </p>

            {/* Google */}
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ font: '600 12px/1 Inter, sans-serif', color: '#374151', display: 'block', marginBottom: 6 }}>First Name</label>
                    <input value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="Ahmad" style={inp} />
                  </div>
                  <div>
                    <label style={{ font: '600 12px/1 Inter, sans-serif', color: '#374151', display: 'block', marginBottom: 6 }}>Last Name</label>
                    <input value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Al Mansouri" style={inp} />
                  </div>
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
                {loading ? (mode === 'signin' ? 'Signing in...' : 'Creating account...') : (mode === 'signin' ? 'Sign In →' : 'Create Account →')}
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
