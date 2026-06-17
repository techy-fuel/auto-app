import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Dashboard } from './screens/Dashboard';
import { Leads } from './screens/Leads';
import { Pipeline } from './screens/Pipeline';
import { Inventory } from './screens/Inventory';
import { Copilot } from './screens/Copilot';

const screens = {
  dashboard: Dashboard,
  leads: Leads,
  pipeline: Pipeline,
  inventory: Inventory,
  copilot: Copilot,
};

export default function App() {
  const [page, setPage] = useState('dashboard');
  const Screen = screens[page] || Dashboard;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-app)' }}>
      <Sidebar active={page} onNavigate={setPage} />
      <div style={{
        marginLeft: 'var(--sidebar-w)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <Topbar page={page} />
        <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <Screen />
        </main>
      </div>
    </div>
  );
}
