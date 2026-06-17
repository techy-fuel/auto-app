import React, { useState } from 'react';
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

const crmScreens = {
  dashboard: Dashboard,
  leads: Leads,
  pipeline: Pipeline,
  inventory: Inventory,
  copilot: Copilot,
  whatsapp: WhatsApp,
  finance: Finance,
  reports: Reports,
};

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'crm' | 'mobile'
  const [page, setPage] = useState('dashboard');

  if (view === 'landing') {
    return <LandingPage onLaunchApp={() => setView('crm')} />;
  }

  if (view === 'mobile') {
    return (
      <div style={{ height: '100vh', background: 'var(--slate-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Back button */}
        <button
          onClick={() => setView('crm')}
          style={{
            position: 'fixed', top: 20, left: 20,
            padding: '8px 16px', borderRadius: 'var(--radius-md)',
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            color: 'white', font: 'var(--weight-semibold) 13px/1 var(--font-display)',
            cursor: 'pointer', zIndex: 100,
          }}
        >← Back to CRM</button>

        {/* Phone mockup */}
        <div style={{
          width: 390,
          height: 760,
          background: 'var(--white)',
          borderRadius: 44,
          overflow: 'hidden',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 10px #1a1a1a, 0 0 0 12px #333',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Status bar */}
          <div style={{
            height: 44, background: 'var(--navy-900)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 24px', flexShrink: 0,
          }}>
            <span style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>9:41</span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="white"><rect x="0" y="3" width="3" height="9" rx="1"/><rect x="4" y="2" width="3" height="10" rx="1"/><rect x="8" y="0" width="3" height="12" rx="1"/><rect x="12" y="0" width="3" height="12" rx="1" opacity="0.4"/></svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="white"><path d="M7.5 2.5C9.8 2.5 11.8 3.5 13.2 5L14.5 3.7C12.7 1.9 10.2 0.8 7.5 0.8C4.8 0.8 2.3 1.9 0.5 3.7L1.8 5C3.2 3.5 5.2 2.5 7.5 2.5Z" opacity="0.4"/><path d="M7.5 5.5C9 5.5 10.3 6.1 11.3 7L12.6 5.7C11.2 4.4 9.4 3.6 7.5 3.6C5.6 3.6 3.8 4.4 2.4 5.7L3.7 7C4.7 6.1 6 5.5 7.5 5.5Z" opacity="0.6"/><circle cx="7.5" cy="9.5" r="1.5"/></svg>
              <div style={{ width: 24, height: 12, borderRadius: 4, border: '1.5px solid rgba(255,255,255,0.4)', padding: '2px', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '80%', height: '100%', background: 'var(--emerald-400)', borderRadius: 2 }} />
              </div>
            </div>
          </div>

          {/* App content */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <MobileApp />
          </div>

          {/* Home indicator */}
          <div style={{ height: 34, background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: 120, height: 4, background: 'var(--slate-300)', borderRadius: 99 }} />
          </div>
        </div>
      </div>
    );
  }

  // CRM App
  const Screen = crmScreens[page] || Dashboard;
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-app)' }}>
      <Sidebar active={page} onNavigate={setPage} />
      <div style={{ marginLeft: 'var(--sidebar-w)', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar page={page} onMobilePreview={() => setView('mobile')} onLanding={() => setView('landing')} />
        <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <Screen />
        </main>
      </div>
    </div>
  );
}
