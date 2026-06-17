import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Dashboard } from './screens/Dashboard';
import { Leads } from './screens/Leads';
import { Pipeline } from './screens/Pipeline';
import { Inventory } from './screens/Inventory';
import { Copilot } from './screens/Copilot';
import { WhatsApp } from './screens/WhatsApp';
import { Finance } from './screens/Finance';
import { Reports } from './screens/Reports';
import { LandingPage } from './screens/LandingPage';
import { MobileApp } from './screens/MobileApp';
import { AuthModal } from './components/auth/AuthModal';
import { Admin } from './screens/Admin';
import { Settings } from './screens/Settings';
import { ResetPassword } from './screens/ResetPassword';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const crmScreens = {
  dashboard: Dashboard,
  leads: Leads,
  pipeline: Pipeline,
  inventory: Inventory,
  copilot: Copilot,
  whatsapp: WhatsApp,
  finance: Finance,
  reports: Reports,
  admin: Admin,
  settings: Settings,
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('crm');
  const [page, setPage] = useState('dashboard');
  const [authModal, setAuthModal] = useState(null);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsPasswordRecovery(true);
        setUser(session?.user ?? null);
      } else {
        setIsPasswordRecovery(false);
        setUser(session?.user ?? null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-app)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'var(--gradient-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>✦</div>
          <div style={{ font: 'var(--weight-medium) 14px/1 var(--font-body)', color: 'var(--text-muted)' }}>Loading AutoPilot CRM...</div>
        </div>
      </div>
    );
  }

  if (isPasswordRecovery) {
    return <ResetPassword onDone={() => { setIsPasswordRecovery(false); }} />;
  }

  if (!user) {
    return (
      <>
        <LandingPage
          onLaunchApp={() => setAuthModal('signin')}
          onSignUp={() => setAuthModal('signup')}
        />
        {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onAuth={setUser} />}
      </>
    );
  }

  if (view === 'mobile') {
    return (
      <div style={{ height: '100vh', background: 'var(--slate-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={() => setView('crm')} style={{
          position: 'fixed', top: 20, left: 20,
          padding: '8px 16px', borderRadius: 'var(--radius-md)',
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          color: 'white', font: 'var(--weight-semibold) 13px/1 var(--font-display)', cursor: 'pointer', zIndex: 100,
        }}>← Back to CRM</button>
        <div style={{ width: 390, height: 760, background: 'var(--white)', borderRadius: 44, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 10px #1a1a1a, 0 0 0 12px #333', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 44, background: 'var(--navy-900)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
            <span style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>9:41</span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="white"><rect x="0" y="3" width="3" height="9" rx="1"/><rect x="4" y="2" width="3" height="10" rx="1"/><rect x="8" y="0" width="3" height="12" rx="1"/><rect x="12" y="0" width="3" height="12" rx="1" opacity="0.4"/></svg>
              <div style={{ width: 24, height: 12, borderRadius: 4, border: '1.5px solid rgba(255,255,255,0.4)', padding: '2px', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '80%', height: '100%', background: 'var(--emerald-400)', borderRadius: 2 }} />
              </div>
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <MobileApp user={user} />
          </div>
          <div style={{ height: 34, background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: 120, height: 4, background: 'var(--slate-300)', borderRadius: 99 }} />
          </div>
        </div>
      </div>
    );
  }

  const Screen = crmScreens[page] || Dashboard;
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-app)' }}>
      <Sidebar active={page} onNavigate={setPage} isAdmin={user?.email === ADMIN_EMAIL} user={user} />
      <div style={{ marginLeft: 'var(--sidebar-w)', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar page={page} user={user} onMobilePreview={() => setView('mobile')} onSignOut={signOut} onNavigate={setPage} />
        <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <Screen user={user} />
        </main>
      </div>
    </div>
  );
}
