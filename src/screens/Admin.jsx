import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { apiUrl } from '../lib/api';
import { Button } from '../components/core/Button';

function timeAgo(iso) {
  if (!iso) return 'Never';
  const diff = Date.now() - new Date(iso);
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

export function Admin() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [acting, setActing] = useState(null);
  const [pushTitle, setPushTitle] = useState('');
  const [pushBody, setPushBody] = useState('');
  const [pushSending, setPushSending] = useState(false);
  const [pushResult, setPushResult] = useState('');

  useEffect(() => { fetchUsers(); }, []);

  async function sendPush() {
    if (!pushTitle.trim() || !pushBody.trim()) return;
    setPushSending(true); setPushResult('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(apiUrl('/api/send-push'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ title: pushTitle, body: pushBody }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setPushResult(data.sent > 0 ? `✓ Sent to ${data.sent} device(s)` : (data.message || 'No devices registered yet'));
      setPushTitle(''); setPushBody('');
    } catch (e) {
      setPushResult(`Error: ${e.message}`);
    }
    setPushSending(false);
  }

  async function fetchUsers() {
    setLoading(true); setError('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const res = await fetch(apiUrl('/api/admin-users'), { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setUsers(data.users);
      setTotal(data.total);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  async function handleBan(userId, currentlyBanned) {
    setActing(userId);
    const { data: { session } } = await supabase.auth.getSession(); const token = session?.access_token;
    await fetch(apiUrl('/api/admin-ban'), {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, action: currentlyBanned ? 'unban' : 'ban' }),
    });
    await fetchUsers();
    setActing(null);
  }

  async function handleDelete(userId, name) {
    if (!confirm(`Delete user "${name}" and all their data? This cannot be undone.`)) return;
    setActing(userId);
    const { data: { session } } = await supabase.auth.getSession(); const token = session?.access_token;
    await fetch(apiUrl('/api/admin-delete'), {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    await fetchUsers();
    setActing(null);
  }

  const totalLeads = users.reduce((s, u) => s + u.leads, 0);
  const activeToday = users.filter(u => u.lastLogin && Date.now() - new Date(u.lastLogin) < 86400000).length;
  const banned = users.filter(u => u.banned).length;

  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <div>
        <h2 style={{ font: 'var(--weight-bold) 20px/1 var(--font-display)', color: 'var(--text-strong)' }}>Admin Dashboard</h2>
        <p style={{ font: '13px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 4 }}>Manage all registered users and their data</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-4)' }}>
        {[
          { label: 'Total Users', value: loading ? '…' : total, color: 'var(--navy-600)' },
          { label: 'Active Today', value: loading ? '…' : activeToday, color: 'var(--emerald-600)' },
          { label: 'Total Leads', value: loading ? '…' : totalLeads, color: 'var(--violet-600)' },
          { label: 'Banned', value: loading ? '…' : banned, color: 'var(--red-500)' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-card)' }}>
            <div style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-muted)', marginBottom: 10 }}>{s.label}</div>
            <div style={{ font: 'var(--weight-extra) 28px/1 var(--font-display)', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {error && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', color: 'var(--red-500)', font: '13px/1.5 var(--font-body)' }}>
          {error === 'Forbidden' ? '⛔ You do not have admin access.' : `Error: ${error}`}
        </div>
      )}

      {/* Send push notification */}
      <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-card)' }}>
        <h3 style={{ font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 4 }}>📢 Send Push Notification</h3>
        <p style={{ font: '12px/1.4 var(--font-body)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>Broadcasts to all registered devices (requires Firebase setup — see MOBILE.md).</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <input value={pushTitle} onChange={e => setPushTitle(e.target.value)} placeholder="Title — e.g. New hot lead!"
            style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', color: 'var(--text-strong)', outline: 'none', boxSizing: 'border-box' }} />
          <input value={pushBody} onChange={e => setPushBody(e.target.value)} placeholder="Message — e.g. Ahmad (score 88) just came in"
            style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', color: 'var(--text-strong)', outline: 'none', boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button size="sm" variant="accent" onClick={sendPush} disabled={pushSending || !pushTitle.trim() || !pushBody.trim()}>
              {pushSending ? 'Sending...' : 'Send Notification'}
            </Button>
            {pushResult && <span style={{ font: '12px/1 var(--font-body)', color: pushResult.startsWith('Error') ? 'var(--red-500)' : 'var(--emerald-600)' }}>{pushResult}</span>}
          </div>
        </div>
      </div>

      {/* Users table */}
      <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
        <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: 'var(--weight-bold) 15px/1 var(--font-display)', color: 'var(--text-strong)' }}>All Users</span>
          <button onClick={fetchUsers} style={{ padding: '6px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', background: 'var(--white)', font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-muted)', cursor: 'pointer' }}>
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-muted)' }}>Loading users...</div>
        ) : (
          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--slate-50)' }}>
                {['User', 'Email', 'Leads', 'Last Login', 'Joined', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-soft)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--divider)', opacity: acting === u.id ? 0.5 : 1 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ font: 'var(--weight-semibold) 13px/1 var(--font-body)', color: 'var(--text-strong)' }}>{u.name}</div>
                  </td>
                  <td style={{ padding: '14px 16px', font: '12px/1 var(--font-body)', color: 'var(--text-muted)' }}>{u.email}</td>
                  <td style={{ padding: '14px 16px', font: 'var(--weight-bold) 14px/1 var(--font-display)', color: 'var(--navy-700)' }}>{u.leads}</td>
                  <td style={{ padding: '14px 16px', font: '12px/1 var(--font-body)', color: 'var(--text-muted)' }}>{timeAgo(u.lastLogin)}</td>
                  <td style={{ padding: '14px 16px', font: '12px/1 var(--font-body)', color: 'var(--text-muted)' }}>{timeAgo(u.createdAt)}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 'var(--radius-pill)', fontSize: 11, fontWeight: 600,
                      background: u.banned ? '#FEF2F2' : '#ECFDF5',
                      color: u.banned ? 'var(--red-500)' : 'var(--emerald-700)',
                    }}>{u.banned ? 'Banned' : 'Active'}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => handleBan(u.id, u.banned)} disabled={acting === u.id} style={{
                        padding: '5px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-soft)',
                        background: 'var(--white)', font: 'var(--weight-semibold) 11px/1 var(--font-display)',
                        color: u.banned ? 'var(--emerald-600)' : 'var(--amber-600)', cursor: 'pointer',
                      }}>{u.banned ? 'Unban' : 'Ban'}</button>
                      <button onClick={() => handleDelete(u.id, u.name)} disabled={acting === u.id} style={{
                        padding: '5px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-soft)',
                        background: 'var(--white)', font: 'var(--weight-semibold) 11px/1 var(--font-display)',
                        color: 'var(--red-500)', cursor: 'pointer',
                      }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && users.length === 0 && !error && (
          <div style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-muted)' }}>No users found.</div>
        )}
      </div>
    </div>
  );
}
